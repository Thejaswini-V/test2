// import React from 'react';
// import "./Web.css";
// function Web(){
//     return(
//         <body>
//             <div className='box'>
//                 <input type='text' onChange={handlechange} minLength={3} maxLength={10} />
//                 {/* <input type='password' />
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: 'root', // Change this to your MySQL password
    database: 'test',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/forms', (req, res) => {
    const { name, options } = req.body;
    console.log('Received data:', name, options);

    const sql = 'INSERT INTO form_data(name, options) VALUES (?, ?)';
    const values = [name, options];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error' });
        }
        console.log('Registration success');
        res.status(200).json({ message: 'Registration success' });
    });
});

app.get('/forms', (req, res) => {
    const sql = 'SELECT * FROM form_data';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Error' });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});