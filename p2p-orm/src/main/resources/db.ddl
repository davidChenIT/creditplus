drop table if exists user_t;
drop table if exists resource_t;
drop table if exists role_t;
drop table if exists user_role_t;
drop table if exists role_resource_t;

create table user_t(
     user_id int not null auto_increment,
     enable int not null default 1,
     username varchar(128) not null,
     password varchar(128) not null,
     remark varchar(1024),
     created_by varchar(200) not null,
     created_date datetime not null,
     last_updated_by varchar(200) not null,
     last_updated_date datetime not null,   
     PRIMARY KEY(user_id));
insert into user_t values(1,1,'test','test','test remark','system',now(),'system',now());

create table role_t(
	role_id int not null auto_increment,
	enable int not null default 1,
	role_name varchar(128) not null,
	remark varchar(1024),
    created_by varchar(200) not null,
    created_date datetime not null,
    last_updated_by varchar(200) not null,
    last_updated_date datetime not null, 	
	PRIMARY KEY(role_id));
	
insert into role_t values(1,1,'admin','administrator','system',now(),'system',now());
insert into role_t values(2,1,'RC-Assistant','RC-Assistant','system',now(),'system',now());
		
create table resource_t(
	resource_id int not null auto_increment,
	resource_name varchar(128) not null,	
	url varchar(512) not null,
	priority int,
	resource_type int,
	remark varchar(1024),
    created_by varchar(200) not null,
    created_date datetime not null,
    last_updated_by varchar(200) not null,
    last_updated_date datetime not null,   	
	primary key(resource_id));
insert into resource_t values(1,'index','/page/index.html',1,1,'index page','system',now(),'system',now());
insert into resource_t values(2,'firstTrial','/page/firstTrial.html',1,1,'first trial page','system',now(),'system',now());	

create table user_role_t(
	ur_id 	int not null auto_increment,
	user_id int not null,
	role_id int not null,
    created_by varchar(200) not null,
    created_date datetime not null,
    last_updated_by varchar(200) not null,
    last_updated_date datetime not null, 		
	PRIMARY KEY(ur_id));	
insert into user_role_t values(1,1,1,'system',now(),'system',now());
	

create table role_resource_t(
	rr_id int not null auto_increment,
	role_id int not null,
	resource_id int not null,
    created_by varchar(200) not null,
    created_date datetime not null,
    last_updated_by varchar(200) not null,
    last_updated_date datetime not null, 		
	PRIMARY KEY(rr_id));
insert into role_resource_t values(1,1,1,'system',now(),'system',now());
insert into role_resource_t values(2,1,2,'system',now(),'system',now());
insert into role_resource_t values(3,2,1,'system',now(),'system',now());

	
	