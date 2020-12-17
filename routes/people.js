const express = require('express');
const Router = express.Router();

const mysqlConnection = require('../connection');

Router.get('/', (req, res) => {
    let query = "SELECT * from people";
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({success: true, count: rows.length, data: rows});
        }
        else{
            res.json({success: false, errCode: err.code, msg: err.sqlMessage});
            console.log("Error!", err);
        }
    });

});

Router.get('/:name', (req, res) => {
    let query = "SELECT * from people WHERE name = \""+req.params.name+"\"";
    console.log(query);
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({success: true, count: rows.length, data: rows});
        }
        else{
            rres.json({success: false, errCode: err.code, msg: err.sqlMessage});
            console.log("Error!", err);
        }
    });

});

Router.post('/', (req, res) => {
    let bodyData = req.body;
    let query = "INSERT INTO people (name, age, city, pincode) VALUES (\""+bodyData.name+"\", \""+bodyData.age+"\", \""+bodyData.city+"\", \""+bodyData.pincode+"\")";
    console.log(bodyData, query);
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({success: true, msg: "Record added!"});
        }
        else{
            res.json({success: false, errCode: err.code, msg: err.sqlMessage});
            console.log("Error!", err);
        }
    });

});

Router.put('/:name', (req, res) => {
    let bodyData = req.body;
    let query = "UPDATE people SET city = \""+bodyData.city+"\", pincode = \""+bodyData.pincode+"\", age = \""+bodyData.age+"\" WHERE name = \""+req.params.name+"\"";
    console.log(bodyData, query);
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({success: true, msg: "Record updated!"});
        }
        else{
            res.json({success: false, errCode: err.code, msg: err.sqlMessage});
            console.log("Error!", err);
        }
    });
});

Router.delete('/:name', (req, res) => {
    let bodyData = req.body;
    let query = "DELETE FROM people WHERE (name = \""+req.params.name+"\")";
    console.log(query);
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json({success: true, msg: "Record deleted!"});
        }
        else{
            res.json({success: false, errCode: err.code, msg: err.sqlMessage});
            console.log("Error!", err);
        }
    });
});

module.exports = Router;