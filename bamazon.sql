create database bamazonDB;

use bamazonDB; 

create table produccts ( 
	item_id int not null AUTO_INCREMENT, 
	product_name varchar(100) NULL,
	department_name varchar(100) NULL, 
	price decimal (10,2) NULL, 
	stock_qty int NULL, 
	primary key (item_id)
)