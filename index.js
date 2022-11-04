const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');
db.connect();

console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
);

function initialPrompt(){
    inquirer.prompt([
    {
      type: 'list',
      name:'userOptions',
      message: 'What would you like to do?',
      choices: [
      'View All Employees',
      'View All Departments',
      'View All Roles',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit'
      ]  
    }
    ]).then((res)=>{
      console.log(res.userOptions);
      switch(res.userOptions){
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Exit':
          db.end();
          break;
        }
        
      }).catch((err)=>{
    if(err)throw err;
    });
  };
  // GET ALL EMPLOYEES
  function viewAllEmployees() {
    const sql = 
        `SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        roles.title, 
        department_name AS department, 
        roles.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN roles
        ON employee.role_id = roles.id
        LEFT JOIN department
        ON department.id = roles.department_id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id`;
  
    db.query(sql, (err, res)=>{
      if (err) throw err;
      console.table(res);
      initialPrompt();
    });
};

    //VIEW DEPARTMENTS
    function viewDepartments(){
        const sql = 
        `SELECT * FROM department`;
  
        db.query(sql, (err, res)=>{
        if(err) throw err;
          console.table(res);
          initialPrompt();
        });
    };
    //VIEW ROLES
    function viewRoles(){
        const sql = 
        `SELECT * FROM roles`;
  
        db.query(sql, (err, res)=>{
        if(err) throw err;
          console.table(res);
          initialPrompt();
        });
    };

    //ADD EMPLOYEES
    function addEmployee(){
        inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "Employee First Name: "
        },
        {
          type: "input",
          name: "last_name",
          message: "Employee Last Name: "
        },
        {
          type: "input",
          name: "role_id",
          message: "Employee Role ID: "
        },
        {
            type: "input",
            name: "manager_id",
            message: "Manager ID: "
        }
        ]).then((body)=>{
            sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    
            db.query(sql, params, (err, res)=>{
                if(err) throw err;
                  console.table(res);
                  initialPrompt();
                });
        })
    };      

    //ADD ROLE
    function addRole(){
        inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Role title: "
        },
        {
          type: "input",
          name: "salary",
          message: "Salary: "
        },
        {
          type: "input",
          name: "department_id",
          message: "Employee department ID: "
        }
        ]).then((body)=>{
            sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            const params = [body.title, body.salary, body.department_id];
    
            db.query(sql, params, (err, res)=>{
                if(err) throw err;
                  console.table(res);
                  initialPrompt();
                });
        })
    };  
    
    //ADD DEPARTMENT
    function addDepartment(){
        inquirer.prompt([
        {
          type: "input",
          name: "department_name",
          message: "Department: "
        }
        
        ]).then((body)=>{
            sql = `INSERT INTO department (department_name) VALUES (?)`;
            const params = [body.department_name];
    
            db.query(sql, params, (err, res)=>{
                if(err) throw err;
                  console.table(res);
                  initialPrompt();
                });
        })
    };     
    
    function updateEmployeeRole(employee){
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Employee First Name: "
              },
              {
                type: "input",
                name: "last_name",
                message: "Employee Last Name: "
              },
            {
                type: "input",
                name: "role_id",
                message: "New employee role id: "
              },
        ]).then((body, res)=>{
            sql = `UPDATE employee 
            SET  
            first_name = REPLACE(first_name, ?)
            last_name = REPLACE(last_name, ?)
            role_id = REPLACE(role_id, ?)
            WHERE id = ?`;
            const params = [body.first_name, body.last_name, body.role_id,];
    
            db.query(sql, params, (err, res)=>{
                if(err) throw err;
                  console.table(res);
                  initialPrompt();
                });
        })
    };  

initialPrompt();