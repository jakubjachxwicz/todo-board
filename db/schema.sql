CREATE DATABASE `todo_list`;
USE `todo_list`;
CREATE TABLE `tasks`(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
content VARCHAR(1000),
creation_date DATETIME,
completed TINYINT(1),
completion_date DATETIME
);

CREATE USER IF NOT EXISTS 'todo'@'localhost' IDENTIFIED BY 'V4nd4lPL';
GRANT SELECT, INSERT, UPDATE, DELETE ON `todo_list`.`tasks` TO 'todo'@'localhost';