const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.dbdatabase
});

connection.connect();

module.exports = connection;