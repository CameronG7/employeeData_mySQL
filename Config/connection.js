require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost', // database name
  user: process.env.DB_USER, // database user to be logged in as
  password: process.env.DB_PASSWORD, // database user password 
  database: 'module11CG_db' // database name
}).promise();

module.exports = connection;