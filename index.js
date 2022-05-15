const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Creating connection with local host 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "", // To enter your MySQL password here.
    database: "employees_db" // employee database 
  });