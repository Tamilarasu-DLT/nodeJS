const express = require('express');
const Router = express.Router();

const mysqlConnection = require('../connection');

Router.get('/', (req, res) => {
    let query = "SELECT * from people";

    mysqlConnection.querying(mysqlConnection, query)
    .then((rows) => {
        res.json({success: true, count: rows.length, data: rows});
    })
    .catch((err) => {
        res.json({success: false, errCode: err.code, msg: err.sqlMessage});
        console.log("Error!", err);
    });
});

Router.get('/:name', (req, res) => {
    let query = "SELECT * from people WHERE name = ?";
    console.log(query);

    mysqlConnection.querying(mysqlConnection, query, [req.params.name])
    .then((rows) => {
        res.json({success: true, count: rows.length, data: rows});
    })
    .catch((err) => {
        res.json({success: false, errCode: err.code, msg: err.sqlMessage});
        console.log("Error!", err);
    });

});

Router.post('/', (req, res) => {
    let bodyData = req.body;
    let query = "INSERT INTO people (name, age, city, pincode) VALUES (?,?,?,?)";
    console.log(bodyData, query);

    mysqlConnection.querying(mysqlConnection, query, [bodyData.name, bodyData.age, bodyData.city, bodyData.pincode])
    .then((rows) => {
        res.json({success: true, msg: "Record added!"});
    })
    .catch((err) => {
        res.json({success: false, errCode: err.code, msg: err.sqlMessage});
        console.log("Error!", err);
    });

});

Router.put('/:name', (req, res) => {
    let bodyData = req.body;
    let query = "UPDATE people SET city = ?, pincode = ?, age = ? WHERE name = ?";
    console.log(bodyData, query);

    mysqlConnection.querying(mysqlConnection, query, [bodyData.city, bodyData.pincode, bodyData.age, req.params.name])
    .then((rows) => {
        res.json({success: true, msg: "Record updated!"});
    })
    .catch((err) => {
        res.json({success: false, errCode: err.code, msg: err.sqlMessage});
        console.log("Error!", err);
    });

});

Router.delete('/:name', (req, res) => {
    let bodyData = req.body;
    let query = `DELETE FROM people WHERE (name = "${req.params.name}")`;
    console.log(query);

    mysqlConnection.querying(mysqlConnection, query)
    .then((rows) => {
        res.json({success: true, msg: "Record deleted!"});
    })
    .catch((err) => {
        res.json({success: false, errCode: err.code, msg: err.sqlMessage});
        console.log("Error!", err);
    });

});

module.exports = Router;