package com.creditplus.p2p.common.constant;

public class Constant {

	public static final String CURRPAGE="currpage";      //当前页
	public static final String ROWNUM="rowNum";			 //每页条数
	
	/*<!-- 审批状态 1 提单  2 开始初审 3 初审完成  4 开始复审 5 复审完成 6停止状态 7 发标 8撤标 9生成合同 10 关闭 11 黑名单 -->*/
	public static final int S_LADING=1;			//提单
	public static final int S_TRIAL_START=2;	//开始初审
	public static final int S_TRIAL_FINISH=3;	//初审完成
	public static final int S_REVIEW_START=4;	//开始复审
	public static final int S_REVIEW_FINISH=5;  //复审完
	public static final int S_STOP=6;			//停止状态
	public static final int S_FABIAO=7;			//发标
	public static final int S_CHEBIAO=8;		//撤标
	public static final int S_CONTRACT=9;		//合同
	public static final int S_CLOSE=10;			//关闭
	public static final int S_BLACKLIST=11;		//黑名单
	
	
	public static final String LOAN_ID="loan_id";
	public static final String USER_ID="user_id";
	public static final String APPLY_STATE="apply_state";
	public static final String APPROVE_CONTENT="approve_content";
	public static final String FIRST_ASSIGN_USER="first_assign_user";
	public static final String REVIEW_ASSIGN_USER="review_assign_user";
	public static final String VERSION="version";
	public static final String ID_NUM="id_num";
	
}
