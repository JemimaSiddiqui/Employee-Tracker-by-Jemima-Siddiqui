-- Creating employee database 
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db; 
USE employees_db; 

-- Creating EMPLOYEE table 
CREATE TABLE employees (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    firstName VARCHAR(30), 
    lastName VARCHAR(30), 
    roleID INT, 
    managerID INT 
); 

-- Creating DEPARTMENT table 
CREATE TABLE department (
    id INT(11) PRIMARY KEY, 
    name VARCHAR(30)
); 

-- Creating ROLE table 
CREATE TABLE role (
    id INT(11) AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30), 
    salary DECIMAL(9,2), 
    departmentID INT 
); 