const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Barley12345!.',
        database: 'employeeDatabase'
    },
    console.log('Connected to the employeeDatabase database.')
);

module.exports = db;