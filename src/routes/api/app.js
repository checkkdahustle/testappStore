module.exports = function (express) { // Setting module.exports to a new function that excepts express as a paramater of express.

  /**@namespace*/

  /**
  *@example {variable}
  *Variable router points to express
  */

  var router = express.Router(); // Sets variable router to express.Router() function
  var app = require('../../models/app.js'); // Sets app to imported app.js file
  var util = require('../../../lib/util'); // Sets util to util.js file


/*
  The following are all routes that will either display an error with status 500,
  Or the proper data with a status of 200.

*/

  // Read One
  router.get('/app/:id', function(req, res) {
    req.body.id = req.params.id;
    app.find(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/apps', function(req, res) {
    app.findAll(function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/app', function(req, res) {
    app.create(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/app/:id', function(req, res) {
    req.body.id = req.params.id;
    app.update(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/app/:id', function(req, res) {
    req.body.id = req.params.id;
    app.destroy(req.body,function(err){
      // Error Encountered
      res.status(500).json(err);
    },function(data) {
      res.status(200).json({success:data});
    });
  });

  return router; // This returns the router to where ever it is called with the appropriate data.
};
