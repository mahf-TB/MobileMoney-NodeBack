const express = require('express');
const cors = require('cors');
require('dotenv').config();


const routerAuth = require('./routes/auth.routes');

const app = express();

// middleware bodyParser
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router  
app.use('/auth', routerAuth); 

module.exports = app 