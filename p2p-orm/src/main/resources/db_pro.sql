-- MySQL dump 10.13  Distrib 5.6.24, for Win32 (x86)
--
-- Host: localhost    Database: p2p
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `approve_log_t`
--

DROP TABLE IF EXISTS `approve_log_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approve_log_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) NOT NULL,
  `assign_user` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '审批人名称',
  `approve_content` varchar(1024) COLLATE utf8_unicode_ci NOT NULL COMMENT '审核内容',
  `state` int(11) NOT NULL COMMENT '1 开始初审 2 开始复审 3 发标审核',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='审批日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approve_log_t`
--

LOCK TABLES `approve_log_t` WRITE;
/*!40000 ALTER TABLE `approve_log_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `approve_log_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalog_t`
--

DROP TABLE IF EXISTS `catalog_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalog_t` (
  `catalog_id` int(11) NOT NULL AUTO_INCREMENT,
  `catalog_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '栏目名称',
  `parent_id` int(11) NOT NULL,
  `url` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_number` int(11) NOT NULL,
  `remark` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`catalog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='栏目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalog_t`
--

LOCK TABLES `catalog_t` WRITE;
/*!40000 ALTER TABLE `catalog_t` DISABLE KEYS */;
INSERT INTO `catalog_t` VALUES (1,'首页',0,'/page/index.jsp',0,'首页','test','2015-10-14 13:26:38','test','2015-10-30 13:18:18'),(2,'系统管理',0,'#',2,'系统管理','test','2015-10-14 21:28:02','test','2015-10-30 13:18:18'),(3,'风控管理',0,'#',1,'风控管理','test','2015-10-14 21:28:02','test','2015-10-30 13:18:18'),(5,'投标',3,'/page/makeTenderList.jsp',3,'投标','test','2015-10-17 05:35:17','test','2015-10-17 13:37:51'),(6,'标的管理',3,'/page/tenderMngList.jsp',2,'标的管理','test','2015-10-17 05:35:17','test','2015-10-17 13:37:51'),(7,'信用复审',3,'/page/reviewList.jsp',1,'信用复审','test','2015-10-17 05:35:17','test','2015-10-17 13:37:51'),(8,'信用初审',3,'/page/firstTrialList.jsp',0,'信用初审','test','2015-10-17 05:35:17','test','2015-10-17 13:37:51'),(9,'字典管理',2,'/page/systemmng/dictList.jsp',0,'数据字典','test','2015-10-16 21:43:10','test','2015-11-06 19:37:47'),(10,'栏目管理',2,'/page/systemmng/catalogList.jsp',1,'栏目管理','test','2015-10-16 21:43:10','test','2015-11-06 19:37:47'),(11,'用户管理',2,'/page/systemmng/userList.jsp',2,'用户管理','test','2015-10-16 21:43:10','test','2015-11-06 19:37:47'),(12,'角色管理',2,'/page/systemmng/roleList.jsp',3,'角色管理','test','2015-10-16 21:43:10','test','2015-11-06 19:37:47'),(13,'规则管理',2,'/page/systemmng/ruleList.jsp',4,'规则管理','test','2015-10-16 21:43:10','test','2015-11-06 19:37:47'),(14,'修改密码',2,'/page/systemmng/changePassword.jsp',6,'修改密码','test','2015-10-16 21:43:10','test','2015-11-06 19:37:47'),(15,'信用评分',2,'/page/systemmng/creditScoreList.jsp',5,'','test','2015-11-06 19:37:48','test','2015-11-06 19:37:47');
/*!40000 ALTER TABLE `catalog_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cheat_intercept_t`
--

DROP TABLE IF EXISTS `cheat_intercept_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cheat_intercept_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '申请单编号',
  `intercept_source` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '拦截来源',
  `check_item` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '检查项',
  `intercept_cause` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '拦截原因',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='欺诈用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheat_intercept_t`
--

LOCK TABLES `cheat_intercept_t` WRITE;
/*!40000 ALTER TABLE `cheat_intercept_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `cheat_intercept_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_score_item_t`
--

DROP TABLE IF EXISTS `credit_score_item_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_score_item_t` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `score_id` int(11) NOT NULL COMMENT '信用评分id',
  `sequence_num` int(11) DEFAULT NULL COMMENT '序号',
  `arithmetic` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '运算符',
  `dimension_value` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '维度列值',
  `score` int(11) NOT NULL COMMENT '得分',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='信用评分项';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_score_item_t`
--

LOCK TABLES `credit_score_item_t` WRITE;
/*!40000 ALTER TABLE `credit_score_item_t` DISABLE KEYS */;
INSERT INTO `credit_score_item_t` VALUES (11,5,1,'>','10000',100,'test','2015-11-16 15:41:22','test','2015-11-16 15:41:22',NULL),(12,5,2,'>','8000',90,'test','2015-11-16 15:41:22','test','2015-11-16 15:41:22',NULL),(13,5,3,'>','6000',80,'test','2015-11-16 15:41:22','test','2015-11-16 15:41:22',NULL),(14,5,4,'>','4000',70,'test','2015-11-16 15:41:22','test','2015-11-16 15:41:22',NULL),(15,5,5,'>','2000',60,'test','2015-11-16 15:41:22','test','2015-11-16 15:41:22',NULL),(16,5,6,'<','2000',0,'test','2015-11-16 15:41:22','test','2015-11-16 15:41:22',NULL),(17,6,10,'==','10',10,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(18,6,9,'==','9',20,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(19,6,8,'==','8',30,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(20,6,7,'==','7',40,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(21,6,6,'==','6',50,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(22,6,5,'==','5',60,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(23,6,4,'==','4',70,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(24,6,3,'==','3',80,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(25,6,2,'==','2',90,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(26,6,1,'==','1',100,'test','2015-11-27 13:05:24','test','2015-11-16 15:43:54',NULL),(38,7,1,'==','1',100,'test','2015-11-27 13:05:24','test','2015-11-16 15:50:31',NULL),(39,7,2,'==','2',90,'test','2015-11-27 13:05:24','test','2015-11-16 15:50:31',NULL),(40,7,3,'==','3',80,'test','2015-11-27 13:05:24','test','2015-11-16 15:50:31',NULL),(41,7,4,'==','4',70,'test','2015-11-27 13:05:24','test','2015-11-16 15:50:31',NULL),(42,7,5,'=','5',60,'test','2015-11-16 15:50:31','test','2015-11-16 15:50:31',NULL),(43,8,7,'>','0.25',40,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(44,8,6,'>','0.5',50,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(45,8,5,'>','1',60,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(46,8,4,'>','2',70,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(47,8,3,'>','3',80,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(48,8,2,'>','4',90,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(49,8,1,'>','5',100,'test','2015-11-16 15:53:04','test','2015-11-16 15:53:04',NULL),(50,9,9,'<','350',20,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(51,9,8,'>','350',30,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(52,9,7,'>','400',40,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(53,9,6,'>','450',50,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(54,9,5,'>','500',60,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(55,9,4,'>','550',70,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(56,9,3,'>','600',80,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(57,9,2,'>','650',90,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(58,9,1,'>','700',100,'test','2015-11-16 15:56:07','test','2015-11-16 15:56:07',NULL),(64,10,1,'==','1',100,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:00',NULL),(65,10,2,'==','2',90,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:00',NULL),(66,10,3,'==','3',70,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:00',NULL),(67,10,4,'==','4',80,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:00',NULL),(68,10,5,'==','5',60,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:00',NULL),(69,11,2,'==','0',90,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:50',NULL),(70,11,1,'==','1',100,'test','2015-11-27 13:05:24','test','2015-11-16 15:58:50',NULL),(73,12,1,'==','1',100,'test','2015-11-27 13:05:24','test','2015-11-27 12:58:25',NULL),(74,12,2,'==','0',90,'test','2015-11-27 13:05:24','test','2015-11-27 12:58:25',NULL);
/*!40000 ALTER TABLE `credit_score_item_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_score_t`
--

DROP TABLE IF EXISTS `credit_score_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_score_t` (
  `score_id` int(11) NOT NULL AUTO_INCREMENT,
  `dimension_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '维度名',
  `proportion` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '权重',
  `model_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '模型名称',
  `dimension_table` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '维表',
  `dimension_column` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '维表列',
  `fact_table` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '事实表',
  `fact_column` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '事实表字段',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`score_id`),
  UNIQUE KEY `model_dimension_name_unique` (`model_name`,`dimension_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='信用评分';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_score_t`
--

LOCK TABLES `credit_score_t` WRITE;
/*!40000 ALTER TABLE `credit_score_t` DISABLE KEYS */;
INSERT INTO `credit_score_t` VALUES (5,'income','20%','1','1','1','user_info','income','test','2015-11-16 15:41:22','test','2015-11-16 15:41:22','收入评分维度'),(6,'degree','15%','1','2','2','customer_info_t','highest_degree_v','test','2015-11-16 15:43:54','test','2015-11-16 15:43:54','学历维度'),(7,'certificate','15%','1','3','3','customer_info_t','certificate_type_v','test','2015-11-16 15:50:31','test','2015-11-16 15:50:31','证书维度'),(8,'mobile','20%','1','4','4','customer_info_t','mobile_age','test','2015-11-16 15:53:04','test','2015-11-16 15:53:04','电话号码维度'),(9,'seasame_score','5%','1','5','5','customer_info_t','seasame_score_v','test','2015-11-16 15:56:07','test','2015-11-16 15:56:07','芝麻信用维度'),(10,'registered','5%','1','6','6','customer_info_t','registered_city_level','test','2015-11-16 15:58:00','test','2015-11-16 15:58:00','户口信息评分维度'),(11,'work','5%','1','7','7','customer_info_t','work_verify','test','2015-11-16 15:58:50','test','2015-11-16 15:58:50','工作维度'),(12,'sex','5%','1','8','8','customer_info_t','sex','test','2015-11-27 12:58:25','test','2015-11-27 12:58:25','性别维度');
/*!40000 ALTER TABLE `credit_score_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_info_t`
--

DROP TABLE IF EXISTS `customer_info_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_info_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `thnic_v` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '名族',
  `registered_place_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '户口所在地',
  `registered_place_city_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '户口所在地城市',
  `address_phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '住址电话',
  `address_phone_v` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '住址验证电话',
  `current_province_v` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '当前居住身份',
  `current_city_v` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '当前居住城市',
  `current_address_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '当前居住详址',
  `id_num_name_v` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '身份证验证姓名',
  `id_num_v` char(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '身份证验证号码',
  `mobile_place_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '电话属地',
  `mobile_place_city_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '电话属地所在城市',
  `company_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '工作验证全称',
  `work_tel_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '工作验证电话',
  `work_tel_place_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '公司电话属地',
  `work_tel_place_city_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '公司电话属地城市',
  `work_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '工作验证姓名',
  `work_position_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '工作职位验证',
  `income_v` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '收入验证',
  `income_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '收入验证姓名',
  `seasame_score_v` int(11) DEFAULT NULL COMMENT '芝麻评分',
  `tencent_credit_v` int(11) DEFAULT NULL COMMENT '腾讯征信',
  `certificate_type_v` int(11) DEFAULT NULL COMMENT '证书类型',
  `certificate_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '证书验证姓名',
  `profession_grade_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '证书等级',
  `mobile_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机验证姓名',
  `mobile_online_time_v` float DEFAULT NULL COMMENT '手机在网时长',
  `profession_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '证书编号',
  `profession_img_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '证书网站抓图',
  `degree_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '学历验证姓名',
  `school_name_v` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '学校验证全称',
  `highest_degree_v` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '最高学历',
  `grad_school_level_v` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '毕业学校等级',
  `sex` char(2) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '性别',
  `mobile_age` float DEFAULT NULL COMMENT '电话年限',
  `work_verify` int(11) DEFAULT NULL COMMENT '工作是否验证 1可验证，0不可验证',
  `current_city_level` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '地址信息城市级别',
  `registered_city_level` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '户口城市级别',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='客户表审批补全字段';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_info_t`
--

LOCK TABLES `customer_info_t` WRITE;
/*!40000 ALTER TABLE `customer_info_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_info_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dict_t`
--

DROP TABLE IF EXISTS `dict_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dict_t` (
  `dict_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '字典编码',
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '名称',
  `type` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '类型',
  `state` int(11) DEFAULT NULL COMMENT '状态  1有效 0 无效',
  `parent_id` int(11) NOT NULL,
  `order_number` int(11) NOT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '字典描述',
  PRIMARY KEY (`dict_id`)
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='数据字典表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dict_t`
--

LOCK TABLES `dict_t` WRITE;
/*!40000 ALTER TABLE `dict_t` DISABLE KEYS */;
INSERT INTO `dict_t` VALUES (1,'1','提单','apply_state',1,0,1,'test','2015-10-20 05:53:02','test','2015-11-27 12:51:21',''),(2,'5','复审完成','apply_state',1,0,5,'test','2015-10-20 22:52:27','test','2015-11-27 12:51:21',''),(3,'4','开始复审','apply_state',1,0,4,'test','2015-10-20 22:52:27','test','2015-11-27 12:51:21',''),(4,'3','初审完成','apply_state',1,0,3,'test','2015-10-20 22:52:27','test','2015-11-27 12:51:21',''),(5,'2','开始初审','apply_state',1,0,2,'test','2015-10-20 22:52:27','test','2015-11-27 12:51:21',''),(6,'11','黑名单','apply_state',1,0,11,'test','2015-10-22 14:55:58','test','2015-11-13 16:34:10',''),(7,'10','关闭','apply_state',1,0,10,'test','2015-10-21 22:55:58','test','2015-11-27 12:51:21',''),(8,'9','生成合同','apply_state',1,0,9,'test','2015-10-21 06:55:58','test','2015-11-27 12:51:21',''),(9,'8','撤标','apply_state',1,0,8,'test','2015-10-21 06:55:58','test','2015-11-27 12:51:21',''),(10,'7','发标','apply_state',1,0,7,'test','2015-10-21 06:55:58','test','2015-11-27 12:51:21',''),(11,'6','停止','apply_state',1,0,6,'test','2015-10-21 06:55:58','test','2015-11-27 12:51:21',''),(12,'维吾尔族','维吾尔族','thnic',1,16,2,'test','2015-10-31 14:01:36','test','2015-10-31 14:01:36',''),(13,'汉族','汉族','thnic',1,16,1,'test','2015-10-31 14:01:36','test','2015-10-31 14:01:36',''),(14,'5','护士证','certificate',1,0,5,'test','2015-10-30 14:05:17','test','2015-11-25 15:07:47',''),(15,'4','教师证','certificate',1,0,4,'test','2015-10-30 14:05:17','test','2015-11-25 15:07:47',''),(16,'3','行驶证','certificate',1,0,3,'test','2015-10-30 14:05:17','test','2015-11-25 15:07:47',''),(17,'2','驾照','certificate',1,0,2,'test','2015-10-30 14:05:17','test','2015-11-25 15:07:47',''),(18,'1','会计证','certificate',1,0,1,'test','2015-10-30 14:05:17','test','2015-11-25 15:07:47',''),(23,'user_info','用户表','table_name',1,0,1,'test','2015-10-28 18:18:23','test','2015-11-26 14:16:56','规则维度中的业务对象'),(24,'customer_info_t	','客户表','table_name',1,0,2,'test','2015-10-29 18:20:57','test','2015-11-26 14:16:56','规则维度中的业务对象'),(25,'province','省份','column_name',1,23,1,'test','2015-10-31 02:29:59','test','2015-10-31 10:30:06','维度中的某个业务对象下的字段'),(26,'city','城市','column_name',1,23,2,'test','2015-10-31 02:29:59','test','2015-10-31 10:30:06','维度中的某个业务对象下的字段'),(27,'address','住址','column_name',1,23,3,'test','2015-10-31 02:29:59','test','2015-10-31 10:30:06','维度中的某个业务对象下的字段'),(28,'registered_place_v','户口所在地','column_name',1,24,2,'test','2015-10-30 10:33:09','test','2015-11-26 14:20:23','维度下业务对象客户表中的字段'),(29,'thnic_v','名族','column_name',1,24,1,'test','2015-10-30 10:33:09','test','2015-11-26 14:20:23','维度下业务对象客户表中的字段'),(30,'loan_money','借款金额','column_name',1,27,1,'test','2015-10-31 10:36:18','test','2015-10-31 10:36:17','维度中的申请表的字段'),(31,'loan_day','借款天数','column_name',1,27,2,'test','2015-10-31 10:36:18','test','2015-10-31 10:36:17','维度中的申请表的字段'),(33,'<','小于','semanteme_dic',1,0,3,'test','2015-10-29 18:39:56','test','2015-11-27 12:42:43','维度配置中的语义'),(34,'>','大于','semanteme_dic',1,0,2,'test','2015-10-29 18:39:56','test','2015-11-27 12:42:43','维度配置中的语义'),(35,'=','等于','semanteme_dic',1,0,1,'test','2015-10-29 18:39:56','test','2015-11-27 12:42:43','维度配置中的语义'),(36,'and','且','arithmetic_dic',1,0,1,'test','2015-10-30 10:42:00','test','2015-11-13 16:34:10','维度中的与或运算符'),(37,'or','或','arithmetic_dic',1,0,2,'test','2015-10-30 10:42:00','test','2015-11-13 16:34:10','维度中的与或运算符'),(38,'0','不可用','enable',1,0,2,'test','2015-10-31 03:36:21','test','2015-11-13 16:34:10','系统中是否可用的下拉框需要的字典'),(39,'1','可用','enable',1,0,1,'test','2015-10-31 03:36:21','test','2015-11-13 16:34:10','系统中是否可用的下拉框需要的字典'),(40,'1','有效','valid_state',1,0,3,'test','2015-10-31 10:20:57','test','2015-10-31 23:42:06',''),(41,'0','无效','valid_state',1,0,4,'test','2015-10-31 10:20:57','test','2015-10-31 23:42:06',''),(42,'1','研究生及以上','highest_degree',1,0,1,'test','2015-10-30 02:20:57','test','2015-11-25 15:02:34',''),(43,'2','985或211','highest_degree',1,0,2,'test','2015-10-30 02:20:57','test','2015-11-25 15:02:34',''),(44,'3','其他一本','highest_degree',1,0,3,'test','2015-10-30 02:20:57','test','2015-11-25 15:02:34',''),(45,'4','二本','highest_degree',1,0,4,'test','2015-10-30 02:20:57','test','2015-11-25 15:02:34',''),(46,'5','三本','highest_degree',1,0,5,'test','2015-10-30 02:20:57','test','2015-11-25 15:02:34',''),(47,'985','985','school_level',1,0,3,'test','2015-10-31 10:20:57','test','2015-10-31 23:42:06',''),(48,'211','211','school_level',1,0,4,'test','2015-10-31 10:20:57','test','2015-10-31 23:42:06',''),(49,'0','女','id_sex',1,0,1,'test','2015-11-13 08:31:59','test','2015-11-13 16:34:10',''),(50,'1','男','id_sex',1,0,2,'test','2015-11-13 16:31:59','test','2015-11-13 16:31:58',''),(61,'0','无效','id_state',1,0,2,'test','2015-11-13 16:34:10','test','2015-11-13 16:34:10',''),(62,'1','有效','id_state',1,0,1,'test','2015-11-13 16:34:10','test','2015-11-13 16:34:10',''),(123,'income','收入','dimension_name',1,0,1,'test','2015-11-13 07:12:23','test','2015-11-16 15:19:39','信用评分中的维度名'),(134,'seasame_score','芝麻信用','dimension_name',1,0,5,'test','2015-11-13 15:13:41','test','2015-11-16 15:19:39','信用评分中的维度名'),(135,'mobile','电话号码','dimension_name',1,0,4,'test','2015-11-13 15:13:41','test','2015-11-16 15:19:39','信用评分中的维度名'),(136,'certificate','其他证书','dimension_name',1,0,3,'test','2015-11-13 15:13:41','test','2015-11-16 15:19:39','信用评分中的维度名'),(137,'degree','学历','dimension_name',1,0,2,'test','2015-11-13 15:13:41','test','2015-11-16 15:19:39','信用评分中的维度名'),(139,'address','地址信息','dimension_name',1,0,6,'test','2015-11-13 23:15:18','test','2015-11-16 15:19:39','信用评分中的维度名'),(140,'registered','户口信息','dimension_name',1,0,7,'test','2015-11-13 23:15:18','test','2015-11-16 15:19:39','信用评分中的维度名'),(141,'work','工作信息','dimension_name',1,0,8,'test','2015-11-13 23:15:18','test','2015-11-16 15:19:39','信用评分中的维度名'),(142,'sex','性别','dimension_name',1,0,9,'test','2015-11-13 23:15:18','test','2015-11-16 15:19:39','信用评分中的维度名'),(143,'urgent_contactor','紧急联系人','dimension_name',1,0,10,'test','2015-11-13 23:15:18','test','2015-11-16 15:19:39','信用评分中的维度名'),(149,'1','信用评分1','model_name',1,0,1,'test','2015-11-14 07:16:46','test','2015-11-14 07:16:46','信用评分中的信用评分模型'),(150,'2','信用评分2','model_name',1,0,2,'test','2015-11-14 07:16:46','test','2015-11-14 07:16:46','信用评分中的信用评分模型'),(151,'1','收入维表','dimension_table',1,0,1,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(152,'2','学历维表','dimension_table',1,0,2,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(153,'3','证书维表','dimension_table',1,0,3,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(154,'4','年限维','dimension_table',1,0,4,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(155,'5','三方信用维','dimension_table',1,0,5,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(156,'6','户口维','dimension_table',1,0,6,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(157,'7','工作维','dimension_table',1,0,7,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(158,'8','性别维','dimension_table',1,0,8,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(159,'9','紧急联络人','dimension_table',1,0,9,'test','2015-11-14 07:25:13','test','2015-11-14 07:25:12','信用评分中的维表数据字典'),(160,'1','收入区间','dimension_column',1,151,1,'test','2015-11-14 07:26:59','test','2015-11-14 07:26:58','信用评分中的维表刻度列'),(161,'2','学历Code','dimension_column',1,152,2,'test','2015-11-14 07:29:21','test','2015-11-14 07:29:21','信用评分中的维表刻度列'),(162,'3','证书Code','dimension_column',1,153,3,'test','2015-11-14 07:30:40','test','2015-11-14 07:30:39','信用评分中的维表刻度列'),(163,'4','区间下限','dimension_column',1,154,4,'test','2015-11-14 07:31:36','test','2015-11-14 07:31:35','信用评分中的维表刻度列'),(164,'5','区间下限','dimension_column',1,155,5,'test','2015-11-14 07:32:29','test','2015-11-14 07:32:29','信用评分中的维表刻度列'),(165,'6','户口Code','dimension_column',1,156,6,'test','2015-11-14 07:33:18','test','2015-11-14 07:33:18','信用评分中的维表刻度列'),(166,'7','工作code','dimension_column',1,157,7,'test','2015-11-14 07:34:39','test','2015-11-14 07:34:39','信用评分中的维表刻度列'),(167,'8','性别code','dimension_column',1,158,8,'test','2015-11-14 07:35:20','test','2015-11-14 07:35:20','信用评分中的维表刻度列'),(168,'9','联络人Code','dimension_column',1,159,9,'test','2015-11-14 07:36:04','test','2015-11-14 07:36:04','信用评分中的维表刻度列'),(169,'user_info','用户表','fact_table',1,0,1,'test','2015-11-14 07:38:57','test','2015-11-14 07:38:56','信用评分中的事实表'),(170,'customer_info_t','客户表','fact_table',1,0,2,'test','2015-11-14 07:38:57','test','2015-11-14 07:38:56','信用评分中的事实表'),(171,'income','收入字段','fact_column',1,169,1,'test','2015-11-14 07:40:26','test','2015-11-14 07:40:25','信用评分中的事实表度量字段'),(172,'highest_degree_v','学历','fact_column',1,170,1,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(173,'certificate_type_v','证书类型','fact_column',1,170,2,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(174,'mobile_age','电话号码年限','fact_column',1,170,3,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(175,'seasame_score_v','芝麻信用','fact_column',1,170,4,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(176,'current_city_level','地址信息','fact_column',1,170,5,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(177,'registered_city_level','户口信息','fact_column',1,170,6,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(178,'work_verify','工作信息','fact_column',1,170,7,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(179,'sex','性别','fact_column',1,170,8,'test','2015-11-14 07:44:33','test','2015-11-14 07:44:32','信用评分中的事实表度量字段'),(180,'10000','10000以上','dimension_value',1,160,1,'test','2015-11-14 07:51:43','test','2015-11-14 07:51:43','信用评分中的刻度配置信息中的刻度值'),(181,'8000','8000-10000','dimension_value',1,160,2,'test','2015-11-14 07:51:43','test','2015-11-14 07:51:43','信用评分中的刻度配置信息中的刻度值'),(182,'6000','6000-8000','dimension_value',1,160,3,'test','2015-11-14 07:51:43','test','2015-11-14 07:51:43','信用评分中的刻度配置信息中的刻度值'),(183,'4000','4000-6000','dimension_value',1,160,4,'test','2015-11-14 07:51:43','test','2015-11-14 07:51:43','信用评分中的刻度配置信息中的刻度值'),(184,'2000','2000-4000','dimension_value',1,160,5,'test','2015-11-14 07:51:43','test','2015-11-14 07:51:43','信用评分中的刻度配置信息中的刻度值'),(185,'2000','2000以下','dimension_value',1,160,6,'test','2015-11-14 07:51:43','test','2015-11-14 07:51:43','信用评分中的刻度配置信息中的刻度值'),(186,'1','研究生及以上','dimension_value',1,161,1,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(187,'2','985或211','dimension_value',1,161,2,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(188,'3','其他一本','dimension_value',1,161,3,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(189,'4','二本','dimension_value',1,161,4,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(190,'5','三本','dimension_value',1,161,5,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(191,'6','大专','dimension_value',1,161,6,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(192,'7','中专、高中','dimension_value',1,161,7,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(193,'8','初中及以下','dimension_value',1,161,8,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(194,'9','CET-4','dimension_value',1,161,9,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(195,'10','CET-6','dimension_value',1,161,10,'test','2015-11-13 23:55:42','test','2015-11-16 15:25:46','信用评分中的刻度配置信息中的刻度值'),(196,'1','会计证','dimension_value',1,162,1,'test','2015-11-13 23:57:36','test','2015-11-16 15:32:20','信用评分中的刻度配置信息中的刻度值'),(197,'2','驾照','dimension_value',1,162,2,'test','2015-11-13 23:57:36','test','2015-11-16 15:32:20','信用评分中的刻度配置信息中的刻度值'),(198,'3','行驶证','dimension_value',1,162,3,'test','2015-11-13 23:57:36','test','2015-11-16 15:32:20','信用评分中的刻度配置信息中的刻度值'),(199,'4','教师证','dimension_value',1,162,4,'test','2015-11-13 23:57:36','test','2015-11-16 15:32:20','信用评分中的刻度配置信息中的刻度值'),(200,'5','护士证','dimension_value',1,162,5,'test','2015-11-13 23:57:36','test','2015-11-16 15:32:20','信用评分中的刻度配置信息中的刻度值'),(201,'5','5年以上','dimension_value',1,163,1,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(202,'4','4-5年','dimension_value',1,163,2,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(203,'3','3-4年','dimension_value',1,163,3,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(204,'2','2-3年','dimension_value',1,163,4,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(205,'1','1-2年','dimension_value',1,163,5,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(206,'0.5','0.5-1年','dimension_value',1,163,6,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(207,'0.25','0.25-1年','dimension_value',1,163,7,'test','2015-11-14 08:01:03','test','2015-11-14 08:01:02','信用评分中的刻度配置信息中的刻度值'),(208,'700','700以上','dimension_value',1,164,1,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(209,'650','650-700','dimension_value',1,164,2,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(210,'600','600-650','dimension_value',1,164,3,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(211,'550','550-600','dimension_value',1,164,4,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(212,'500','500-550','dimension_value',1,164,5,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(213,'450','450-500','dimension_value',1,164,6,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(214,'400','400-450','dimension_value',1,164,7,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(215,'350','350-400','dimension_value',1,164,8,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(216,'350','350以下','dimension_value',1,164,9,'test','2015-11-14 08:07:06','test','2015-11-14 08:07:05','信用评分中的刻度配置信息中的刻度值'),(217,'1','一线城市','dimension_value',1,165,1,'test','2015-11-13 16:08:57','test','2015-11-16 15:36:12','信用评分中的刻度配置信息中的刻度值'),(218,'2','二线城市','dimension_value',1,165,2,'test','2015-11-13 16:08:57','test','2015-11-16 15:36:12','信用评分中的刻度配置信息中的刻度值'),(219,'4','珠长三角','dimension_value',1,165,4,'test','2015-11-13 16:08:57','test','2015-11-16 15:36:12','信用评分中的刻度配置信息中的刻度值'),(220,'3','三线城市','dimension_value',1,165,3,'test','2015-11-13 16:08:57','test','2015-11-16 15:36:12','信用评分中的刻度配置信息中的刻度值'),(221,'5','其他地区','dimension_value',1,165,5,'test','2015-11-13 16:08:57','test','2015-11-16 15:36:12','信用评分中的刻度配置信息中的刻度值'),(222,'1','可验证','dimension_value',1,166,1,'test','2015-11-14 00:09:57','test','2015-11-16 15:33:12','信用评分中的刻度配置信息中的刻度值'),(223,'0','无验证','dimension_value',1,166,2,'test','2015-11-14 00:09:57','test','2015-11-16 15:33:12','信用评分中的刻度配置信息中的刻度值'),(224,'1','男','dimension_value',1,167,1,'test','2015-11-14 00:11:04','test','2015-11-16 15:33:27','信用评分中的刻度配置信息中的刻度值'),(225,'0','女','dimension_value',1,167,2,'test','2015-11-14 00:11:04','test','2015-11-16 15:33:27','信用评分中的刻度配置信息中的刻度值'),(226,'父母','父母','dimension_value',1,168,1,'test','2015-11-14 08:12:02','test','2015-11-14 08:12:01','信用评分中的刻度配置信息中的刻度值'),(227,'兄弟','兄弟','dimension_value',1,168,2,'test','2015-11-14 08:12:02','test','2015-11-14 08:12:01','信用评分中的刻度配置信息中的刻度值'),(228,'7','中专、高中','highest_degree',1,0,7,'test','2015-11-24 23:01:40','test','2015-11-25 15:02:34',''),(229,'6','大专','highest_degree',1,0,6,'test','2015-11-24 23:01:40','test','2015-11-25 15:02:34',''),(235,'10','CET-6','highest_degree',1,0,10,'test','2015-11-25 07:02:27','test','2015-11-25 15:02:34',''),(236,'9','CET-4','highest_degree',1,0,9,'test','2015-11-25 07:02:27','test','2015-11-25 15:02:34',''),(237,'8','初中及以下','highest_degree',1,0,8,'test','2015-11-25 07:02:27','test','2015-11-25 15:02:34',''),(248,'income_v','收入验证','column_name',1,24,3,'test','2015-11-25 22:18:45','test','2015-11-26 14:20:23','维度下业务对象客户表中的字段'),(251,'seasame_score_v','芝麻评分','column_name',1,24,4,'test','2015-11-26 14:20:23','test','2015-11-26 14:20:23','维度下业务对象客户表中的字段'),(252,'<','小于','score_semanteme_dic',1,0,3,'test','2015-11-27 12:51:21','test','2015-11-27 12:51:21','信用评分配置中的语义'),(253,'>','大于','score_semanteme_dic',1,0,2,'test','2015-11-27 12:51:21','test','2015-11-27 12:51:21','信用评分配置中的语义'),(254,'==','等于','score_semanteme_dic',1,0,1,'test','2015-11-27 12:51:21','test','2015-11-27 12:51:21','信用评分配置中的语义');
/*!40000 ALTER TABLE `dict_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimension_t`
--

DROP TABLE IF EXISTS `dimension_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dimension_t` (
  `dis_id` int(11) NOT NULL AUTO_INCREMENT,
  `rule_id` int(11) NOT NULL COMMENT '规则id',
  `table_name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '表名',
  `column_name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '字段名',
  `semanteme` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '语义',
  `dis_value` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '匹配值',
  `arithmetic` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '运算',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '维度描述',
  PRIMARY KEY (`dis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='维度配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimension_t`
--

LOCK TABLES `dimension_t` WRITE;
/*!40000 ALTER TABLE `dimension_t` DISABLE KEYS */;
INSERT INTO `dimension_t` VALUES (23,1,'customer_info_t	','income_v','<','5000','or','test','2015-11-27 13:00:09','test','2015-11-27 13:00:09',NULL),(24,1,'customer_info_t	','thnic_v','=','维吾尔族','and','test','2015-11-27 13:00:09','test','2015-11-27 13:00:09',NULL);
/*!40000 ALTER TABLE `dimension_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_apply_t`
--

DROP TABLE IF EXISTS `loan_apply_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loan_apply_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) NOT NULL,
  `version` double(3,1) NOT NULL COMMENT '版本',
  `apply_state` int(11) NOT NULL COMMENT '借款单状态',
  `first_assign_user` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '初审人',
  `review_assign_user` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '复审人',
  `credit_score1` int(11) DEFAULT NULL COMMENT '信用分1',
  `credit_score2` int(11) DEFAULT NULL COMMENT '信用分2',
  `credit_score_total` int(11) DEFAULT NULL COMMENT '信用总分',
  `modifytime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='借款申请后台表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_apply_t`
--

LOCK TABLES `loan_apply_t` WRITE;
/*!40000 ALTER TABLE `loan_apply_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_apply_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource_t`
--

DROP TABLE IF EXISTS `resource_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resource_t` (
  `resource_id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `priority` int(11) DEFAULT NULL,
  `resource_type` int(11) DEFAULT NULL,
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource_t`
--

LOCK TABLES `resource_t` WRITE;
/*!40000 ALTER TABLE `resource_t` DISABLE KEYS */;
INSERT INTO `resource_t` VALUES (1,'index','/page/index.html',1,1,'index page','system','2015-11-08 22:37:38','system','2015-11-08 22:37:38'),(2,'firstTrial','/page/firstTrial.html',1,1,'first trial page','system','2015-11-08 22:37:38','system','2015-11-08 22:37:38');
/*!40000 ALTER TABLE `resource_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_resource_t`
--

DROP TABLE IF EXISTS `role_resource_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_resource_t` (
  `rr_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`rr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_resource_t`
--

LOCK TABLES `role_resource_t` WRITE;
/*!40000 ALTER TABLE `role_resource_t` DISABLE KEYS */;
INSERT INTO `role_resource_t` VALUES (1,1,1,'system','2015-11-08 22:37:38','system','2015-11-08 22:37:38'),(2,1,2,'system','2015-11-08 22:37:38','system','2015-11-08 22:37:38'),(3,2,1,'system','2015-11-08 22:37:38','system','2015-11-08 22:37:38');
/*!40000 ALTER TABLE `role_resource_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_t`
--

DROP TABLE IF EXISTS `role_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_t` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `enable` int(11) NOT NULL DEFAULT '1',
  `role_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_t`
--

LOCK TABLES `role_t` WRITE;
/*!40000 ALTER TABLE `role_t` DISABLE KEYS */;
INSERT INTO `role_t` VALUES (1,1,'admin','administrator','system','2015-11-08 22:37:38','system','2015-11-08 22:37:38'),(2,1,'RC-Assistant','RC-Assistant','system','2015-11-08 22:37:38','system','2015-11-08 22:37:38');
/*!40000 ALTER TABLE `role_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rule_t`
--

DROP TABLE IF EXISTS `rule_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rule_t` (
  `rule_id` int(11) NOT NULL AUTO_INCREMENT,
  `rule_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '规则名称',
  `state` int(11) NOT NULL DEFAULT '1' COMMENT '规则状态',
  `rule_sql` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '规则sql',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '创建人',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '规则描述',
  PRIMARY KEY (`rule_id`),
  UNIQUE KEY `rule_name_UNIQUE` (`rule_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='规则配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule_t`
--

LOCK TABLES `rule_t` WRITE;
/*!40000 ALTER TABLE `rule_t` DISABLE KEYS */;
INSERT INTO `rule_t` VALUES (1,' 名族校验',1,'','test2','2015-11-27 13:00:09','test','2015-11-27 13:00:09','名族校验拦截'),(2,'信用积分校验',1,'select count(1) as total_record from loan_list t left join customer_info_t c on t.user_id=c.user_id where t.loan_id=#{loan_id} and t.user_id=#{user_id} and c.seasame_score_v<500','test','2015-11-27 13:03:36','test','2015-11-27 13:03:36','');
/*!40000 ALTER TABLE `rule_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urgent_contactor_t`
--

DROP TABLE IF EXISTS `urgent_contactor_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `urgent_contactor_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '姓名',
  `relation` varchar(200) COLLATE utf8_unicode_ci NOT NULL COMMENT '关系',
  `mobile` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '电话',
  `mobile_province` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系人电话所在省份',
  `mobile_city` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系人电话所在城市',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='紧急联系人';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urgent_contactor_t`
--

LOCK TABLES `urgent_contactor_t` WRITE;
/*!40000 ALTER TABLE `urgent_contactor_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `urgent_contactor_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_t`
--

DROP TABLE IF EXISTS `user_role_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_t` (
  `ur_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`ur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_t`
--

LOCK TABLES `user_role_t` WRITE;
/*!40000 ALTER TABLE `user_role_t` DISABLE KEYS */;
INSERT INTO `user_role_t` VALUES (1,1,1,'2015-11-08','2016-11-08','system','2015-11-08 22:37:38','system','2015-11-08 22:37:38');
/*!40000 ALTER TABLE `user_role_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_t` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `enable` int(11) NOT NULL DEFAULT '1',
  `username` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `remark` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_t`
--

LOCK TABLES `user_t` WRITE;
/*!40000 ALTER TABLE `user_t` DISABLE KEYS */;
INSERT INTO `user_t` VALUES (1,1,'test','$2a$10$G5O/PkXx8LD5YV7jnujF7OokBiqKYCKQeitYMcNGbLWumV.RXR3hq','test remark','system','2015-11-08 22:37:38','system','2015-11-08 22:37:38');
/*!40000 ALTER TABLE `user_t` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-29 10:04:06
