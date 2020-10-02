INSERT INTO department (department_name)
VALUES ("Engineering"),("Sales"),("Accounting"),("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", "150000", "1"), ("Software Engineer", "120000", "1"), ("Sales Lead", "100000", "2"), ("Salesperson", "80000", "2"), ("Account Manager", "160000", "3"), ("Accountant", "125000", "3"), ("Legal Team Lead", "250000", "4"), ("Lawyer", "190000", "4");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Deaghan", "Crowe", "1", null), ("Theodore", "Blackburn", "1", "1"), ("Skyler", "Nash", "2", null), ("Lincoln", "Booth", "2", "3"),
("Geoffrey", "Steel", "3", null), ("Aiden", "McCormick", "3", "5"), ("Ashley", "Henry", "4", null), ("Katherine", "van der Smit", "4", "7");