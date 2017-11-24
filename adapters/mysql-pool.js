var mysql = require('mysql');
var fs = require('fs');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'kimokjujo_schema',
    debug: false
});

module.exports = pool;