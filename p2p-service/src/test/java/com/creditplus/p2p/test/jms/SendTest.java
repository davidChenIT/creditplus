package com.creditplus.p2p.test.jms;

import javax.jms.JMSException;

public class SendTest {
	public static void main(String[] args) {
		MsgProducer msgProducer=new MsgProducer();
		try {
			msgProducer.sendMessage();
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
