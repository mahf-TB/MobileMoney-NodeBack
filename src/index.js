const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware bodyParser
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

module.exports = app