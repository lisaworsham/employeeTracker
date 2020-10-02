require('dotenv').config()
var mysql = require("mysql");
var inquirer = require("inquirer");
var seeTable = require("console.table");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASS,
  database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View departments",
                "View roles",
                "View employees",
                "Update an employee",
                "Just kidding... bye!"
            ]
        })
        .then(function(answers) {
            switch (answers.options) {
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "View departments":
                    viewDepartments();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Update an employee":
                    updateEmployee();
                    break;
                default: connection.end();
            }
        })
}

function addDepartment(){
    inquirer
        .prompt({
            name: "addDepartment",
            type: "input",
            message: "What would you like to name your new department?"
        })
        .then(function(answer){
            var query = "INSERT INTO department (name) VALUES (?)"; 
            connection.query(query, answer.addDepartment,
                function(err, res) {
                    if (err) throw err;
                    console.log("Department created successfully!")
                    viewDepartments();
                })
        })
};

function addRole(){
    inquirer
        .prompt([
            {
                name: "addTitle",
                type: "input",
                message: "What title would you like to give for this role?"
            },
            {
                name: "addSalary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "departmentId",
                type: "input",
                message: "Please input the Department ID for what department they are in:"
            }
            ])
        .then(function(answer) {
            var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)"
            connection.query(query, 
                [answer.addTitle, answer.addSalary, answer.departmentId],
                // {
                //   title: answer.addTitle, 
                //   salary: answer.addSalary, 
                //   department_id: answer.departmentId
                // },
                function(err, res) {
                  if (err) throw err;
                  console.log("Role created successfully!")
                  viewRoles();
                })
        })
};

function addEmployee(){
    inquirer
        .prompt([
            {
                name: "addFirstName",
                type: "input",
                message: "What is the new employee's first name?"
            },
            {
                name: "addLastName",
                type: "input",
                message: "What is the new employee's last name?"
            },
            {
                name: "addRole",
                type: "input",
                message: "What is the employee's role ID?"
            },
            {
                name: "addManager",
                type: "input",
                message: "Input the manager ID on who will they report to, if any? If they are a manager, input 'null':"
            }
        ])
        .then(function(answer) {
            var query = "INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
            connection.query(query,
                [answer.addFirstName, answer.addLastName, answer.addRole, answer.addManager], 
                function(err, res) {
                    if (err) throw err;
                    console.log("Employee created successfully!")
                    viewEmployees();
                });
        });
};

function viewDepartments(){
    var query = "SELECT * FROM department"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewRoles(){
    var query = "SELECT * FROM role "
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewEmployees(){
    var query = "SELECT first_name, last_name, title, salary, department_name FROM employee_db.employee e LEFT JOIN employee_db.role r ON e.role_id = r.id LEFT JOIN employee_db.department d ON d.id = r.department_id"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function updateEmployee(){
// run update query and then set it.
    inquirer
        .prompt([
            {
                name: "updateName",
                type: "input",
                message: "Please input the first name of the employee:"
            },
            {
                name: "updateRole",
                type: "input",
                message: "Please input the updated Role ID for this employee:"
            }
        ])
        .then(function(answer) {
            var query = "UPDATE employee SET role_id = ? WHERE first_name = ?"
            connection.query(query, 
                [answer.updateRole, answer.updateName],
                function(err, res) {
                    if (err) throw err;
                    console.log("Employee successfully updated!");
                    viewEmployees();
                });
        });
};
