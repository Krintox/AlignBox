const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database_host',
    user: 'database_user',
    password: 'database_password',
    database: 'database_name',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;
