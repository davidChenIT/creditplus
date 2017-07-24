package com.creditplus.p2p.test.jms;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnectionFactory;

public class MsgConsumer {
	
	private static final String URL="tcp://127.0.0.1:61616";
	private static final String QUEUE_NAME="testQueue";
	
	public void receiveMessage() throws JMSException{
		//1.创建链接工厂
		ConnectionFactory  connectionFactory=new ActiveMQConnectionFactory(URL);
		
		//2.创建链接
		Connection connection=connectionFactory.createConnection();
		
		//3.启动链接
		connection.start();
		
		//4.创建会话
		Session session=connection.createSession(false,Session.AUTO_ACKNOWLEDGE);
		
		//5.创建一个目标（队列）
		Destination destination=session.createTopic("topic1");
		
		//6.创建一个监听者
		MessageConsumer consumer= session.createConsumer(destination);
		
		//7.创建一个监听
		MessageListener messageListener=new MessageListener() {
			public void onMessage(Message message) {
				TextMessage textMessage=(TextMessage)message;
				try {
					System.out.println(textMessage.getText());
				} catch (JMSException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		};
		
		//8.启动监听
		consumer.setMessageListener(messageListener);
	}
	
	
	

}
