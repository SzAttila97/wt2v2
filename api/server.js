// Initialization
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to db
mongoose.connect('mongodb://localhost:27017').then(async () => {
    console.log("Connected to mongo");
});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(express.static('public'));

// Routes registration
const routes = require('./routes');
app.use(routes);

 // Start
app.listen(8080, () => {
     console.log('App is listening on port 8080');
});

module.exports = app;