package com.creditplus.p2p.common.jedis;

import java.io.Closeable;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * 对象序列化与反序列化抽象类
 * @author Administrator
 */
public abstract class SerializeTranscoder {

	private static final Logger logger = LogManager.getLogger(SerializeTranscoder.class);

	public abstract byte[] serialize(Object value);

	public abstract Object deserialize(byte[] in);

	public void close(Closeable closeable) {
		if (closeable != null) {
			try {
				closeable.close();
			} catch (Exception e) {
				logger.info("Unable to close " + closeable, e);
			}
		}
	}
}
