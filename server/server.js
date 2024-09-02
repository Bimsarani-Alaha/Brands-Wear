const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const conDatabase = require('./database')

const app = express();
app.use(cors());
app.use(express.json());
conDatabase()
.then(data =>{
    console.log('Database Connected...');
    const server = app.listen(3001, () =>{
        console.log('Server Started at 3001');

    }).on('error', err => {
        console.log('Server not started', err);
    });

    module.exports = server;
})
.catch(err => console.log('Database connection error:', err));