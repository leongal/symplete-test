const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();
const server = express();
server.use(cors());

server.use(bodyparser.urlencoded({extended:false}))
server.use(bodyparser.json());

const PORT = process.env.PORT || 3001;
const DB_NAME = process.env.DB_NAME || "symplete";
const TABLE_NAME = process.env.TABLE_NAME || "categories";

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PWD || "",
});

connection.connect( (err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');

    console.log("ENV: ", process.env.MYSQL_USER)

    let createDBQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME};`;
    connection.query(createDBQuery, (err, result) => {
        if (err) throw err;
        console.log("Database created!");
    });

    connection.query(`USE ${DB_NAME}`, (err) => {
        if (err) throw err;
        console.log("Using Database...");
    })

    let createTableQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INT AUTO_INCREMENT PRIMARY KEY, category VARCHAR(255)NOT NULL, priority INT)`;
    connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Table created!");
    })

    connection.query(`SELECT * FROM ${TABLE_NAME}`, (err, res) => {
        if (err) throw err;
        if (res.length < 1) {
            let insertQuery = `INSERT INTO ${TABLE_NAME} (category, priority) VALUES ?`;
            let values = [
                ["Offers", 1],
                ["Leads", 2],
                ["Transactions", 3],
                ["Clients", 4],
                ["Showings", 5],
            ]
            connection.query(insertQuery, [values], (err) => {
                if (err) throw err;
                console.log("Data recorded!")
            });
        } else {
            console.log("You recorded already!");
        }
    })
});

server.get('/categories', (req, res) => {
    let sql = 'SELECT category, priority FROM categories';
    connection.query(sql, (err, result, fields) => {
        if (err) {
            return console.error('error: ' + err.message);
        }
        return res.json(result);
    })
})

server.post('/update', async (req, res) => {
    let data = req.body.list;
    
    let prefix = `UPDATE categories SET priority = CASE category `;
    let sub = '';
    let end = 'ELSE priority END';

    data.forEach((item, index) => {
        sub += `WHEN '${item.category}' THEN ${index + 1} `;
    });

    let finalQuery = prefix + sub + end;

    console.log("Query: ", finalQuery);

    connection.query(finalQuery, (err, res) => {
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log('result: ', res);
    });
    
    res.send(data);
})

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})