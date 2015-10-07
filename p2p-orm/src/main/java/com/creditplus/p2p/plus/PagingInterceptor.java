package com.creditplus.p2p.plus;

import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;

import com.creditplus.p2p.model.PageVO;
import com.creditplus.p2p.page.PageUtil;

import java.sql.*;
import java.util.List;
import java.util.Properties;

@Intercepts({ @Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }),
		@Signature(type = ResultSetHandler.class, method = "handleResultSets", args = { Statement.class }) })
public class PagingInterceptor implements Interceptor {
	public Object intercept(Invocation invocation) throws Throwable {
		PageVO page = PageUtil.getPageInfo();
		if (page == null) {
			return invocation.proceed();
		}
		System.out.println("start interceptor");
		if (invocation.getTarget() instanceof StatementHandler) {
			System.out.println("start interceptor");
			StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
			MetaObject metaStatementHandler = SystemMetaObject.forObject(statementHandler);
			// 分离代理对象链(由于目标类可能被多个拦截器拦截，从而形成多次代理，通过下面的两次循环
			// 可以分离出最原始的的目标类)
			while (metaStatementHandler.hasGetter("h")) {
				Object object = metaStatementHandler.getValue("h");
				metaStatementHandler = SystemMetaObject.forObject(object);
			}
			// 分离最后一个代理对象的目标类
			while (metaStatementHandler.hasGetter("target")) {
				Object object = metaStatementHandler.getValue("target");
				metaStatementHandler = SystemMetaObject.forObject(object);
			}
			MappedStatement mappedStatement = (MappedStatement) metaStatementHandler
					.getValue("delegate.mappedStatement");
			// 分页信息if (localPage.get() != null) {
			BoundSql boundSql = (BoundSql) metaStatementHandler.getValue("delegate.boundSql");
			// 分页参数作为参数对象parameterObject的一个属性
			String sql = boundSql.getSql();
			// 重写sql
			String pageSql = buildPageSql(sql, page);
			String countSql = buildCountSql(sql);
			// 重写分页sql
			metaStatementHandler.setValue("delegate.boundSql.sql", pageSql);
			Connection connection = (Connection) invocation.getArgs()[0];

			ParameterHandler parameterHandler = (ParameterHandler) metaStatementHandler
					.getValue("delegate.parameterHandler");
			PreparedStatement ps = connection.prepareStatement(countSql);
			parameterHandler.setParameters(ps);
			ResultSet resultSet = ps.executeQuery();
			int total_record = 0;
			if (resultSet.next()) {
				total_record = resultSet.getInt(1);
			}
			page.setTotalrecords(total_record);
			int totalPage = total_record / page.getRowNum() + ((total_record % page.getRowNum() == 0) ? 0 : 1);
			page.setTotalpages(totalPage);
			// 将执行权交给下一个拦截器
			return invocation.proceed();
		} else if (invocation.getTarget() instanceof ResultSetHandler) {
			Object result = invocation.proceed();
			page.setGriddata((List) result);
			return result;
		}
		return null;
	}

	/**
	 * 只拦截这两种类型的 <br>
	 * StatementHandler <br>
	 * ResultSetHandler
	 * 
	 * @param target
	 * @return
	 */
	public Object plugin(Object target) {
		if (target instanceof StatementHandler || target instanceof ResultSetHandler) {
			return Plugin.wrap(target, this);
		} else {
			return target;
		}
	}

	public void setProperties(Properties properties) {

	}

	/**
	 * 修改原SQL为分页SQL
	 * 
	 * @param sql
	 * @param page
	 * @return
	 */
	private String buildPageSql(String sql, PageVO page) {
		StringBuilder pageSql = new StringBuilder(sql).append(" limit ").append(page.getStartRow()).append(",")
				.append(page.getRowNum());
		return pageSql.toString();
	}

	private String buildCountSql(String sql) {
		return new StringBuilder("select count(*) as total_record from (").append(sql).append(") t").toString();
	}

}
