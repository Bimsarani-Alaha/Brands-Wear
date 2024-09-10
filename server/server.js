const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const conDatabase = require('./database');

// Local imports
const SUPPLIER = require('./controllers/SupplierRegController');
const ADMIN = require('./controllers/AdminController');
const PRODUCT = require('./controllers/SupplierProductController');
const ITEM = require('./controllers/AdminAddController');

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Routing
app.use('/', SUPPLIER); // This should work if SUPPLIER is a router object
app.use('/', ADMIN);
app.use('/', PRODUCT);
app.use('/', ITEM);

// Connect to the database
conDatabase()
    .then(() => {
        console.log('Database Connected...');
        const server = app.listen(3001, () => {
            console.log('Server Started at port 3001');
        }).on('error', err => {
            console.log('Server not started', err);
        });

        module.exports = server;
    })
    .catch(err => console.log('Database connection error:', err));
