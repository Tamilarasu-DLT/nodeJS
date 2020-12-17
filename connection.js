const mysql = require('mysql');

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'TaskManager',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("Database Connected");
    }
    else{
        console.log("Connection failed to database");
    }
});

module.exports = mysqlConnection;