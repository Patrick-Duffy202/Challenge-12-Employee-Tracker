INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Jones', 1, null),
    ('Tim', 'Rosberg', 2, 1),
    ('Frank', 'Murphy', 2, 1),
    ('Taylor', 'Sharp', 3, 1),
    ('Karen', 'Connors', 4, 1),
    ('Sherry', 'Davis', 5, 2),
    ('Don', 'Johnson', 6, null);

INSERT INTO department (department_name)
VALUES 
    ('Management'),
    ('Sales'),
    ('Accounting'),
    ('Customer Service'),
    ('Human Resources');


INSERT INTO roles (title, salary, department_id)
VALUES 
    ('General Manager', 120000, 1),
    ('Salesman', 80000, 2),
    ('Accountant', 90000, 4),
    ('CS Representative', 40000, 3),
    ('Human Resource Manager', 75000, 5),
    ('CEO', 250000, null);