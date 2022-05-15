-- Adding values to DEPARTMENT table 
-- id = INT(11) ** primary key **
-- name = VARCHAR(30)
INSERT INTO department (id, name) VALUES (1, 'Engineering');
INSERT INTO department (id, name) VALUES (2, 'Sales');
INSERT INTO department (id, name) VALUES (3, 'Finance');
INSERT INTO department (id, name) VALUES (4, 'Legal');
INSERT INTO department (id, name) VALUES (10, 'Human Resources');

-- Adding values to ROLE table 
-- id = INT(11) ** primary key **
-- title = VARCHAR(30) 
-- salary = DECIMAL(9,2)
-- departmentID = INT 
INSERT INTO role (title, salary, departmentID) VALUES ("Lead Engineer", 160000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Engineer", 152000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Sales Mgr.", 111800, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Online Sales Rep.", 119000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Print Sales Rep.", 256000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Comptroller", 182000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Accountant", 238000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Billing Coordinator", 152000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Lawyer", 320000, 4);
INSERT INTO role (title, salary, departmentID) VALUES ("Operations Mgr.", 250000, 5);
INSERT INTO role (title, salary, departmentID) VALUES ("HR Coordinator", 120000, 10);

-- Adding values to EMPLOYEE table 
-- id = INT(11) ** primary key **
-- firstName = VARCHAR(30) 
-- lastName = VARCHAR(30) 
-- roleID = INT 
-- managerID = INT --> maybe NULL if no manager 
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('John', 'Coltrane',1, null );
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Lester', 'Young', 2, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Ella', 'Fitzgerald', 3, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('William', 'Basie', 4, 3);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Benny', 'Goodman',5, 3);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Charlie', 'Parker', 6, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Sarah', 'Vaughn', 7, 6);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Sonny', 'Rollins', 8, 6);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Clark', 'Terry', 9, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Carmen', 'McRae', 10, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Edward', 'Ellington', 2, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Thomas', 'Waller', 11, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('John', 'Gillespie', 7, 6);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Shirley', 'Horn', 2, 1);