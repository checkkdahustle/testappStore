var express = require('express');
var body_parser = require('body-parser');

var app = express();

// Dot Env File Loader

if (!process.env.PORT) dotenv = require('dotenv').load();

// Config
var port = process.env.PORT || 3000;

// Enable body-parser
app.use(body_parser.json());

// Routes
app.use('/', require('./routes')(express));

// Start up the Server
var server = app.listen(port, function() {
  if (process.env.DEBUG) console.log('Server Active On', port);
});

module.exports = server;
