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

            
            // ** Add a DEPARTMENT **
            case "Add Department":
                addDepartment();
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
    connection.query("SELECT role.id AS Deptartment_ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON role.departmentID = department.id ORDER by department.id", 

    //, department.name AS Department FROM department JOIN role ON department.id = role.departmentID"
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

// Creating role array for when the user wants to add a new role 
let roleArray = [];                                            
function selectRole() {
  connection.query("SELECT * FROM role", function(err, results) {
    if (err) {
        console.log(err);
    }
    for (var i = 0; i < results.length; i++) {
      roleArray.push(results[i].title);
    }
  })
  return roleArray;
}

// 
let managerArray = [];
function selectManager() {
  connection.query("SELECT firstName, lastName FROM employees", function(err, results) {
    if (err) {
        console.log(err);
    }
    for (var i = 0; i < results.length; i++) {
        managerArray.push(results[i].firstName);
    }
  })
  return managerArray;
}

//
var departmentArray = [];
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) {
        console.log(err);
    }
    for (var i = 0; i < results.length; i++) {
        departmentArray.push(results[i].name);
    }
})
return departmentArray;
}

// For when the user wants to add a department 
function addDepartment() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the department?"
        },
        {
            name: "id",
            type: "input",
            message: "What is the department ID number?"
          }

    ]).then(function(answers) {
        connection.query("INSERT INTO department SET ? ",
            {
              name: answers.name,
              id: answers.id
            },
            function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Added " + answers.name + " to the database.");
                runEmployeeDB();
            }
        )
    })
}

// For when user wants to add a new role 
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
          } ,
          {
            name: "department",
            type: "rawlist",
            message: "Which department does the role belong to?",
            choices: selectDepartment()
          }
      ]).then(function(answers) {
          var deptId = selectDepartment().indexOf(answers.choice) + 1
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                departmentID: deptId
              },
              function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Added " + answers.title + " to the database.");
                runEmployeeDB();
              }
          )     
      });
    });
}

// For when the user wants to add a new employee to the database 
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name? "
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name? "
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Who is the employee's manager? ",
            choices: selectManager()
        }

    ]).then(function (answers) {
      var roleId = selectRole().indexOf(answers.role) + 1
      var managerId = selectManager().indexOf(answers.choice) + 1
      connection.query("INSERT INTO employees SET ?", 
      {
          firstName: answers.firstName,
          lastName: answers.lastName,
          managerID: managerId,
          roleID: roleId
          
      }, 
      function(err){
        if (err) {
            console.log(err);
        }
        console.log("Added " + answers.firstName + " " + answers.lastName + " to the database.")
        runEmployeeDB()
      })

  })
 }

 // For when user wants to update employee role 
 function updateEmployeeRole() {
    connection.query("SELECT employees.lastName, role.title FROM employees JOIN role ON employees.roleID = role.id;", 
    (err, res) => {
        if (err) {
            console.log(err);
        }
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "rawlist",
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].lastName);
                        }
                        return lastName;
                    },
                    message: "Which employees role do you want to update? Please select their last name. ",
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "Which role do you want to assign the selected employee? ",
                    choices: selectRole()
                },
            ]).then(function (answers) {
                var roleId = selectRole().indexOf(answers.role) + 1;
                console.log(answers); 
                connection.query("UPDATE employees SET roleID = ? WHERE lastName = ?",
                    [
                        roleId, 
                        answers.lastName
                    ],
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Updated employee's role");
                        runEmployeeDB();
                    });
            });
        });
  }
