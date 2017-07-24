package com.creditplus.p2p.test.jms;

import javax.jms.JMSException;

public class ReceiveTest {
	
	public static void main(String[] args) {
		MsgConsumer msgConsumer=new MsgConsumer();
		MsgConsumer msgConsumer2=new MsgConsumer();
		try {
			msgConsumer.receiveMessage();
			System.out.println("****************************2*********");
			msgConsumer2.receiveMessage();
		} catch (JMSException e) {
			e.printStackTrace();
		}
		
		
	}

}
