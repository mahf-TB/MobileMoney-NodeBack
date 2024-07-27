const express = require('express');
const cors = require('cors');
require('dotenv').config();


const routerAuth = require('./routes/auth.routes');
const routerTrans = require('./routes/trans.routes');
const routerTaux = require('./routes/taux.routes');


const app = express();

// middleware bodyParser
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router  
app.use('/auth', routerAuth); 
app.use('/transaction', routerTrans); 
app.use('/taux', routerTaux); 

module.exports = app 