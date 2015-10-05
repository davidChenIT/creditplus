/**user_info   用户表
loan_list  借款申请表
cheat_intercept_t  欺诈拦截
urgent_contact_p 紧急联系人

attach_pic_t     附件照片
province_city  省份城市配置表
origin_place_t  籍贯配置表
tel_area_code_t  区号配置表
high_school_t  学校配置表
bank_data_t  银行配置表
data_dict_code_t  数据字典编码配置表
data_dict_item_t  数据字典项配置
resource_t   资源
role_t       角色
role_resource_t 资源角色关系表
user_t  登录表
user_role_t   用户角色关系表**/

DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS loan_list;
DROP TABLE IF EXISTS cheat_intercept_t;
DROP TABLE IF EXISTS approve_log_t;

DROP TABLE IF EXISTS dict_code_t;
DROP TABLE IF EXISTS dict_item_t;
DROP TABLE IF EXISTS high_school_t;
DROP TABLE IF EXISTS origin_place_t;
DROP TABLE IF EXISTS province_city_t;
DROP TABLE IF EXISTS attach_pic_t;
DROP TABLE IF EXISTS tel_area_code_t;
DROP TABLE IF EXISTS bank_data_t;
DROP TABLE IF EXISTS urgent_contactor_p;

DROP TABLE IF EXISTS resource_t;
DROP TABLE IF EXISTS role_resource_t;
DROP TABLE IF EXISTS role_t;
DROP TABLE IF EXISTS user_t;
DROP TABLE IF EXISTS user_role_t;




create table user_info
(
   user_id              int not null auto_increment,
   login_type           int comment '登录类型',
   login_key            varchar(200) comment '登录票据',
   name                 varchar(100) comment '姓名',
   mobile               char(12) comment '电话',
   id_num               char(20) comment '身份证号码',
   province             varchar(50) comment '省份',
   city                 varchar(50) comment '城市',
   address              varchar(200) comment '地址',
   card_bank            varchar(100) comment '银行卡银行',
   card_no              char(50) comment '银行卡号',
   card_tel             char(12) comment '银行卡电话',
   company              varchar(100) comment '单位',
   income               varchar(100) comment '收入',
   company_address      varchar(200) comment '单位地址',
   work_province        varchar(50) comment '单位省份',
   work_city            varchar(50) comment '单位城市',
   work_tel             char(12) comment '工作电话',
   degree               varchar(50) comment '学历',
   school               varchar(100) comment '学校',
   seasame_score        int comment '芝麻评分',
   mobile_ser_code      varchar(50) comment '服务密码',
   state                int,
   modifytime           timestamp,
   is_done 				enum('Y','N'),
   primary key (user_id)
);

create table loan_list
(
   loan_id              int not null,
   user_id              int,
   loan_full_id         varchar(50) comment '外部id',
   loan_money           float comment '借款金额',
   start_day			varchar(100) DEFAULT NULL,
   loan_day             int comment '借款天数',
   expire_day           varchar(100) comment '到期时间',
   pay_fee              float comment '借款手续费',
   act_money            float comment '实际到账',
   Interest             float comment '利息',
   overdue_fee          float comment '逾期费用',
   bank_type            varchar(50) comment '银行类型',
   bank_card            char(20) comment '银行卡号',
   state                int comment '状态',
   modifytime           timestamp,
   primary key (loan_id)
);

CREATE TABLE approve_log_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  loan_id int(11) NOT NULL,
  first_approve varchar(200)  COMMENT '初审人',
  two_approve  varchar(200) COMMENT '复审人',
  three_approve  varchar(200) COMMENT '发标审核人',
  approve_content varchar(200) COMMENT '审核内容',
  state int(11)  not null COMMENT '审核状态',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL , 
   primary key (id)
  )COMMENT='审批日志';

CREATE TABLE cheat_intercept_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  loan_id varchar(50)  COMMENT '申请单编号',
  state int(11) NOT NULL COMMENT '状态',
  intercept_source varchar(200)  COMMENT '拦截来源',
  check_item varchar(200)  COMMENT '检查项',
  intercept_cause varchar(200)  COMMENT '拦截原因',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,  
  PRIMARY KEY (id)
)  COMMENT='欺诈用户表';


CREATE TABLE dict_code_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  code varchar(200)  NOT NULL COMMENT '字典编码',
  name varchar(200)  NOT NULL COMMENT '名称',
  type varchar(200)  NOT NULL COMMENT '类型',
  state int(11) COMMENT '状态  1有效 0 无效',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  descript varchar(1024)  COMMENT '字典描述',
  PRIMARY KEY (id)
)  COMMENT='数据字典code表';

CREATE TABLE dict_item_t (
  id int(11)  NOT NULL AUTO_INCREMENT,
  code_id int(11)  NOT NULL COMMENT 'dict_code_t id',
  item_code varchar(100)  NOT NULL COMMENT '项编码',
  item_name varchar(200)  NOT NULL COMMENT '项名称',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  PRIMARY KEY (id)
)  COMMENT='数据字典item表';

CREATE TABLE high_school_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  full_name varchar(200)  NOT NULL COMMENT '学习全程',
  is_985 int(11)  COMMENT '是否是985',
  is_211 int(11)  COMMENT '是否是211',
  level varchar(50)  COMMENT '等级',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  PRIMARY KEY (id)
)  COMMENT='学校基础数据配置表';

CREATE TABLE origin_place_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_last_num char(6)  NOT NULL COMMENT '身份证前六位',
  province varchar(200)  NOT NULL COMMENT '籍贯省份',
  city varchar(200)  NOT NULL COMMENT '籍贯城市',
  district varchar(200)  NOT NULL COMMENT '籍贯区县',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  PRIMARY KEY (id)
)  COMMENT='籍贯基础数据配置表';


CREATE TABLE province_city_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  province varchar(200)  NOT NULL COMMENT '省份',
  city varchar(200)  NOT NULL COMMENT '城市',
  city_level varchar(50)  COMMENT '城市级别',
  city_att1 varchar(200)  COMMENT '城市属性一',
  city_att2 varchar(200)  COMMENT '城市属性二',
   created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  PRIMARY KEY (id)
)  COMMENT='身份城市基础数据表';

CREATE TABLE attach_pic_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  type int(11) COMMENT '附件类型',
  url varchar(1000)  NOT NULL COMMENT 'url',
  user_id int(11)  NOT NULL COMMENT '用户id',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  PRIMARY KEY (id)
)  COMMENT='附件照片';


CREATE TABLE tel_area_code_t (
  id int(11) NOT NULL  AUTO_INCREMENT,
  area varchar(20)  NOT NULL COMMENT '区号',
  province varchar(200)  NOT NULL COMMENT '区号省份',
  city varchar(200)  NOT NULL COMMENT '区号城市',
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL ,
  PRIMARY KEY (id)
)  COMMENT='区号基础数据表';

CREATE TABLE bank_data_t (
  id int(11) NOT NULL AUTO_INCREMENT,
  bank_name varchar(200)  NOT NULL,
  created_by varchar(200)  NOT NULL COMMENT '创建人',
  created_date timestamp NOT NULL COMMENT  '创建时间',
  last_updated_by  varchar(200)  NOT NULL,
  last_updated_date timestamp NOT NULL,
  PRIMARY KEY (id)
)  COMMENT='银行配置表';

CREATE TABLE resource_t (
  resource_id int(11) NOT NULL AUTO_INCREMENT,
  resource_name varchar(128) NOT NULL,
  url varchar(512) NOT NULL,
  priority int(11) DEFAULT NULL,
  resource_type int(11) DEFAULT NULL,
  remark varchar(1024) DEFAULT NULL,
  created_by varchar(200) NOT NULL,
  created_date datetime NOT NULL,
  last_updated_by varchar(200) NOT NULL,
  last_updated_date datetime NOT NULL,
  PRIMARY KEY (resource_id)
);

CREATE TABLE role_resource_t (
  rr_id int(11) NOT NULL AUTO_INCREMENT,
  role_id int(11) NOT NULL,
  resource_id int(11) NOT NULL,
  created_by varchar(200) NOT NULL,
  created_date datetime NOT NULL,
  last_updated_by varchar(200) NOT NULL,
  last_updated_date datetime NOT NULL,
  PRIMARY KEY (rr_id)
);

CREATE TABLE role_t (
  role_id int(11) NOT NULL AUTO_INCREMENT,
  enable int(11) NOT NULL DEFAULT '1',
  role_name varchar(128) NOT NULL,
  remark varchar(1024) DEFAULT NULL,
  created_by varchar(200) NOT NULL,
  created_date datetime NOT NULL,
  last_updated_by varchar(200) NOT NULL,
  last_updated_date datetime NOT NULL,
  PRIMARY KEY (role_id)
) ;

CREATE TABLE user_t (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  enable int(11) NOT NULL DEFAULT '1',
  username varchar(128) NOT NULL,
  password varchar(128) NOT NULL,
  remark varchar(1024) DEFAULT NULL,
  created_by varchar(200) NOT NULL,
  created_date datetime NOT NULL,
  last_updated_by varchar(200) NOT NULL,
  last_updated_date datetime NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE user_role_t (
  ur_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  role_id int(11) NOT NULL,
  created_by varchar(200) NOT NULL,
  created_date datetime NOT NULL,
  last_updated_by varchar(200) NOT NULL,
  last_updated_date datetime NOT NULL,
  PRIMARY KEY (ur_id)
) ;

CREATE TABLE urgent_contactor_p (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL COMMENT '用户id',
  name varchar(200)  NOT NULL COMMENT '姓名',
  relation varchar(200)  NOT NULL COMMENT '关系',
  phone varchar(20)  NOT NULL COMMENT '电话',
  created_by varchar(200) NOT NULL,
  created_date datetime NOT NULL,
  last_updated_by varchar(200) NOT NULL,
  last_updated_date datetime NOT NULL,
  PRIMARY KEY (id)
)  COMMENT='紧急联系人';

insert into user_t values(1,1,'test','test','test remark','system',now(),'system',now());
insert into role_t values(1,1,'admin','administrator','system',now(),'system',now());
insert into role_t values(2,1,'RC-Assistant','RC-Assistant','system',now(),'system',now());
insert into resource_t values(1,'index','/page/index.html',1,1,'index page','system',now(),'system',now());
insert into resource_t values(2,'firstTrial','/page/firstTrial.html',1,1,'first trial page','system',now(),'system',now());	
insert into user_role_t values(1,1,1,'system',now(),'system',now());
insert into role_resource_t values(1,1,1,'system',now(),'system',now());
insert into role_resource_t values(2,1,2,'system',now(),'system',now());
insert into role_resource_t values(3,2,1,'system',now(),'system',now());


INSERT INTO user_info VALUES (4,1,'o8EeQw_voTztu6J-jPttrk7LBGSA','朱胜','18923880749',NULL,NULL,NULL,NULL,'中国工商银行','1234','18923880749','1234','10000以上','Qwer','北京','北京','18923880749','博士','1234',NULL,NULL,7,'Y','2015-10-04 10:34:02');

INSERT INTO urgent_contactor_p VALUES (5,4,'1','配偶','18923880749','sysdate','2015-10-04 09:33:20','sysdate','2015-10-04 09:33:20');
INSERT INTO urgent_contactor_p VALUES (6,4,'18923880749','姐妹','18923880749','sysdate','2015-10-04 09:33:20','sysdate','2015-10-04 09:33:20');
INSERT INTO urgent_contactor_p VALUES (7,4,'1','配偶','18923880749','sysdate','2015-10-04 09:33:20','sysdate','2015-10-04 09:33:20');
INSERT INTO urgent_contactor_p VALUES (8,4,'2','情侣','18923880749','sysdate','2015-10-04 09:33:20','sysdate','2015-10-04 09:33:20');

INSERT INTO `loan_list` VALUES (11,4,NULL,5000,'2015-10-04 17:53:55',90,'2016-01-02',0,5000,0,0,NULL,'1234',1,'2015-10-04 09:53:55');