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
                    viewDepartments();
                })
        })
};

function addRole(){

};

function addEmployee(){

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
    var query = "SELECT * FROM role"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewEmployees(){
    var query = "SELECT * FROM employee"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function updateEmployee(){
// run update query and then set it.
};
