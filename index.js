const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");


// Creating connection with database
const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Farkhanda7861!", // To enter your MySQL password here.
        database: "employees_db" // employee database 
    },
    console.log(`Connected to the courses_db database.`)
);

// Once connection is made, display the following 
connection.connect(function(err) {
    if (err) {
        console.log(err);
    }
    //console.log("Connected as ID: " + connection.threadId);
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
                viewAllDepartments();
            break;

            
             // ** View all ROLES **
            case "View All Roles":
                viewAllRoles();
            break;
               
            
            // ** View all EMPLOYEES BY DEPARTMENT **
            case "View All Employees by Department":
                viewEmployeesByDepartment();
            break;

            
            // ** View all EMPLOYEES BY ROLE **
            case "View All Employees by Role":
                viewEmployeesByRole();
            break;

            /*
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
            break;*/

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

// For when the user wants to view all employees 
function viewAllEmployees() {
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title, role.salary AS Salary, department.name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employees INNER JOIN role on role.id = employees.roleID INNER JOIN department on department.id = role.departmentID LEFT JOIN employees e on employees.managerID = e.id;", 
    function(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(""); 
        console.log("** EMPLOYEES LIST **");
        console.log(""); 
        console.table(results)
        runEmployeeDB()
    }) 
    /*connection.query("SELECT * FROM employees", function (err, results, fields) {
        console.table(results);
        //process.exit(0); 
        //console.log(fields);  
    });*/ 
}

// For when the user wants to view all employee departments departments 
function viewAllDepartments() {
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department", 
    function(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(""); 
        console.log("** DEPARTMENT LIST **");
        console.log(""); 
        console.table(results)
        runEmployeeDB()
    }) 
}

// For when the user wants to view all the employee roles 
function viewAllRoles() {
    connection.query("SELECT role.id AS Deptartment_ID, role.title AS Title FROM role", 
    function(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(""); 
        console.log("** ROLE LIST **");
        console.log(""); 
        console.table(results)
        runEmployeeDB()
    }) 
}

// For when the user wants to view employees by department 
function viewEmployeesByDepartment() {
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, department.name AS Department FROM employees JOIN role ON employees.roleID = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;", 
    function(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(""); 
        console.log("** EMPLOYEES BY DEPARTMENT LIST **");
        console.log(""); 
        console.table(results)
        runEmployeeDB()
    }) 
}

// For when the user wants to view employees by role 
function viewEmployeesByRole() {
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title FROM employees JOIN role ON employees.roleID = role.id ORDER BY role.id;", 
    function(err, results) {
        if (err) {
            console.log(err);
        }
        console.log(""); 
        console.log("** EMPLOYEES BY DEPARTMENT LIST **");
        console.log(""); 
        console.table(results)
        runEmployeeDB()
    }) 
}