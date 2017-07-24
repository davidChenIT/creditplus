package com.creditplus.p2p.test.jms;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnectionFactory;

public class MsgProducer {

	private static final String URL="tcp://127.0.0.1:61616";
	private static final String QUEUE_NAME="testQueue";
	
	
	/**
	 * 使用队列发送消息
	 * @throws JMSException
	 */
	public void sendMessage() throws JMSException{
		//创建连接
		Connection connection = createConnection(URL);
		//4.创建会话
		Session session=connection.createSession(false,Session.AUTO_ACKNOWLEDGE);
		
		//5.创建一个目标（队列）
		Destination destination=session.createTopic("topic1");
		
		//6.创建一个生产者
		MessageProducer producer= session.createProducer(destination);
		
		for(int i=0;i<10;i++){
			//7.创建消息
			TextMessage textMessage=session.createTextMessage("消息内容"+i);
			//8.发送消息到队列
			producer.send(textMessage);
			System.out.println("发送消息"+i+"成功!");
		}
		connection.close();
	}


	
	/**
	 * 创建连接
	 * @return
	 * @throws JMSException
	 */
	private Connection createConnection(String url) throws JMSException {
		//1.创建链接工厂
		ConnectionFactory  connectionFactory=new ActiveMQConnectionFactory(url);
		
		//2.创建链接
		Connection connection=connectionFactory.createConnection();
		
		//3.启动链接
		connection.start();
		
		return connection;
	}
}
