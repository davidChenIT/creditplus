drop table user_t;
create table user_t(id int not null,enable int not null default 1,username varchar(128) not null,password varchar(128) not null,remark varchar(1024),PRIMARY KEY(id));
insert into user_t values(1,1,'test','test','test remark');

create table resource_t(id int not null,url varchar(512) not null,priority int,type int,name varchar(128) not null,memo varchar(1024),primary key(id));

create table role_t(id int not null,enable int not null default 1,name varchar(128) not null,remark varchar(1024),PRIMARY KEY(id));
