const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Creating connection with database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "", // To enter your MySQL password here.
    database: "employees_db" // employee database 
  });

// Once connection is made, display the following 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    console.clear();
    console.log ("********************************************");
    console.log ("");
    console.log ("   YOU ARE VIEWING THE EMPLOYEE DATABASE!   ");
    console.log ("");
    console.log ("********************************************");
    runEmployeeDB();
});

// Options displayed to users 
function runEmployeeDB() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
            "View All Employees", 
            "View All Departments",
            "View All Roles",
            "View All Employees by Department",
            "View All Employees by Role",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
            ]
    }
]).then(function(answers) {
        switch (answers.action) {

            // ** View all EMPLOYEES **
            case "View All Employees":
                viewAllEmployees();
            break;

            // ** View all DEPARTMENTS **
            case "View All Departments":
                viewAllDepts();
            break;

             // ** View all ROLES **
            case "View All Roles":
                viewAllRoles();
            break;
                
            // ** View all EMPLOYEES BY DEPARTMENT **
            case "View All Employees by Department":
                viewEmployeesByDept();
            break;

            // ** View all EMPLOYEES BY ROLE **
            case "View All Employees by Role":
                viewEmployeesByRole();
            break;

            // ** Add a DEPARTMENT **
            case "Add Department":
                addDept();
            break;

            // ** Add a ROLE **
            case "Add Role":
                addRole();
            break;

            // ** Add an EMPLOYEE **
            case "Add Employee":
                addEmployee();
            break;

            // ** Update EMPLOYEE ROLE **
            case "Update Employee Role":
                updateEmployeeRole();
            break;

            // ** EXIT the application ** 
            case "Exit":
                console.log ("***********************************************");
                console.log ("");
                console.log ("   YOU ARE EXITING THE EMPLOYEE DATABASE. THANK YOU!   ");
                console.log ("");
                console.log ("***********************************************");
                connection.end();
            break;
            }
    })
};
