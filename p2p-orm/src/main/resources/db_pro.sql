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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='审批日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approve_log_t`
--

LOCK TABLES `approve_log_t` WRITE;
/*!40000 ALTER TABLE `approve_log_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `approve_log_t` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='欺诈用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheat_intercept_t`
--

LOCK TABLES `cheat_intercept_t` WRITE;
/*!40000 ALTER TABLE `cheat_intercept_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `cheat_intercept_t` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='客户表审批补全字段';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_info_t`
--

LOCK TABLES `customer_info_t` WRITE;
/*!40000 ALTER TABLE `customer_info_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_info_t` ENABLE KEYS */;
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
  `sn` int(11) NOT NULL COMMENT '外键id',
  `mobile_province` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系人电话所在省份',
  `mobile_city` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系人电话所在城市',
  `created_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `last_updated_by` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='紧急联系人';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urgent_contactor_t`
--

LOCK TABLES `urgent_contactor_t` WRITE;
/*!40000 ALTER TABLE `urgent_contactor_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `urgent_contactor_t` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-29 13:11:20
