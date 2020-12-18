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

mysqlConnection.querying = (con, q, vars = []) => {
    return new Promise((resolve, reject) => {
        con.query(q, vars, function(err, result) {
            if (err) {
                console.log(err.stack);

                return reject(err);
            }
            resolve(result)
        })
    })
}

module.exports = mysqlConnection;