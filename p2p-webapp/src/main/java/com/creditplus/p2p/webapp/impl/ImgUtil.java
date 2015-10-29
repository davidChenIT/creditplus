/**
 * 
 */
package com.creditplus.p2p.webapp.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

public class ImgUtil {

	public static final String JPG = "jpg";
	public static final String PNG = "png";
	public static final String BMP = "bmp";
	public static final String GIF = "gif";


	/**
	 * 在servlet中调用该方法, jsp页面中img标签的src指向该servlet, 则会显示图片
	 * 
	 * @param response
	 * @param data
	 * @param isResponseClose
	 */
	public static void showImage(HttpServletResponse response,String imgType, byte[] data, boolean isResponseClose) {
		try {
			ServletOutputStream outStream = response.getOutputStream();//得到向客户端输出二进制数据的对象
			//读数据
			outStream.write(data);
			response.setContentType("image/" + imgType);//设置返回的文件类型
			outStream.write(data); //输出数据
			if (isResponseClose) {
				outStream.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 在servlet中调用该方法, jsp页面中img标签的src指向该servlet, 则会显示图片
	 * @param response
	 * @param image
	 * @param imgType
	 * @param isResponseClose
	 */
	public static void showImage(HttpServletResponse response, String filePath, String imgType, boolean isResponseClose) {
		try {			
			File file = new File(filePath);
			BufferedImage image = ImageIO.read(file);
			OutputStream outStream = response.getOutputStream();
			response.setContentType("image/" + imgType);
			ImageIO.write(image,imgType,outStream);
			
			if (isResponseClose) {
				outStream.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

