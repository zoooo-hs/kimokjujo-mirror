var mysql = require('mysql');
var fs = require('fs');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '210.107.197.176',
    port: '3306',
    user: 'heeeee',
    password: '12345678!',
    database: 'kimokjujo_service',
    debug: false
});

module.exports = pool;