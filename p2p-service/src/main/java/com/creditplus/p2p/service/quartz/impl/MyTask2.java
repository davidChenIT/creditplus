package com.creditplus.p2p.service.quartz.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * 使用JobDetailBean方式配置定时任务
 * @author Administrator
 *
 */
public class MyTask2 extends QuartzJobBean{

	private final Logger logger = LogManager.getLogger(MyTask2.class);
	
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		
		Date date=new Date();
		SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		logger.info("MyTask2任务执行时间："+sf.format(date));
		
	}

}
