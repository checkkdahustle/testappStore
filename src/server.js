var express = require('express'); // Sets variable express to express module
var body_parser = require('body-parser'); // Sets variable body_parser to body-parser module

var app = express(); // Sets variable app to express function

// Dot Env File Loader
if (!process.env.PORT) dotenv = require('dotenv').load(); // If

// Config
var port = process.env.PORT || 3000; // Sets variable port to .env file PORT variable OR 3000 if the file doesn't exist.

// Enable body-parser
app.use(body_parser.json()); // Tells app to use the body_parser.json File.

// Routes
app.use('/', require('./routes')(express)); // Tells app to look for routes in the routes folder

// Start up the Server
var server = app.listen(port, function() {
  if (process.env.DEBUG) console.log('Server Active On', port);
});

module.exports = server;
