const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'todo',
    password: 'V4nd4lPL',
    database: 'todo_list'
});

module.exports = connection;