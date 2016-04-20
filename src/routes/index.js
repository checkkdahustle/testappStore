module.exports = function(express) {
<<<<<<< HEAD
  var history = require('../models/history');
=======
  var express = require('express');
  var histories = require('../models/histories');
  var db = require('../models/db');
  var path = require('path');
  var recommend = require('../models/recommend');
>>>>>>> 08c30129059c225dcdcae5d55f5af210324c38af
  var db = require('../models/db');
  var router = express.Router();

// NOTES
  // made a variable point to history.js in model folder.
  // middleware function is placed after the route.get
  // ^^ because middleware won’t execute for GET requests
  // will fire on every route that comes thru express
  //created a homepage view to test bootstrap and routing connection

  /*  ******************************************************** */
  // Standard Routes
  router.get('/', function(req, res) {
    res.status(200).json({
      msg: 'Hello World',
      healthy: true
    });
  });

  router.get('/status', function(req, res) {

    res.status(200).json({
      healthy: true
    });
  });


<<<<<<< HEAD

// Routes
  router.use('/jsdoc', express.static(__dirname + './../../build/jsdocs')); // JSdoc route
=======
// Routes
  router.use('/jsdoc', express.static(path.join(__dirname + './../../build/JSdocs'))); // JSdoc route
>>>>>>> 08c30129059c225dcdcae5d55f5af210324c38af
  router.use('/api/', require('./api/user')(express));
  router.use('/api/', require('./api/app')(express));
  router.use('/api/', require('./api/app_assets')(express));
  router.use('/api/', require('./api/list')(express));
  router.use('/api/', require('./api/listed_apps')(express));
<<<<<<< HEAD
  router.use('/api/', require('./api/voting')(express));
  // router.use('/api/', require('./api/recommend')(express));

  // MIDDLE-WARE
=======
  router.use('/api/', require('./api/recommend')(express));


  // MIDDLE-WARE FOR HISTORIES
>>>>>>> 08c30129059c225dcdcae5d55f5af210324c38af
  // used the existing module on index.js to add track user browsering in the url.
  // this middleware function has no mount path.
  // this code is executed for every request to the router.
  // rawRoute of url is stored in database.
  router.use(function (req, res, next) {
    var payload = req.body;
    //rawRoute is db name
    // create full rawRoute of the url and store in db
<<<<<<< HEAD
    payload.rawRoute = req.protocol + '://' + req.get('host') + req.originalUrl;
    history.create(payload,function(err){
=======
    payload.rawRoute = path.join(req.protocol + '://' + req.get('host') + req.originalUrl);
    histories.create(payload,function(err){
>>>>>>> 08c30129059c225dcdcae5d55f5af210324c38af
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
      next(); // end the request
    });
  });
  return router;
};
