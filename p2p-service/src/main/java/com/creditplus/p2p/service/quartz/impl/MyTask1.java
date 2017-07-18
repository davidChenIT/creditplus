package com.creditplus.p2p.service.quartz.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 使用MethodInvokeJobDetailFactoryBean方式创建定时任务，此类不需要继承任何类
 * @author Administrator
 *
 */
public class MyTask1 {
	
	private final Logger logger = LogManager.getLogger(MyTask1.class);
	
	public void printMessage(){
		Date date=new Date();
		SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		logger.info("MyTask1任务执行时间："+sf.format(date));
	}
}
