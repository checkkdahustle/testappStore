module.exports = function(express) {
  var router = express.Router();
  var voting = require('../../models/voter.js');
  var util = require('../../../lib/util');

  // Read One
  router.get('/vote/:vote_id', function(req, res) {
    req.body.id = req.params.vote_id;
    voting.find(req.body, function(err) { //Finds ID in DB using _find in model
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/votes', function(req, res) {
    voting.findAll(function(err) { //Finds all in DB using _findAll in model
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/app/:app_id/vote', function(req, res) {
    req.body.app_id = req.params.app_id;
    voting.create(req.body, function(err) { // Runs _create in models to clean data and add to DB from app

      // Error Encountered, try removing id and try again.
      delete req.body.id;
      voting.create(req.body, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data);
      });
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/app/:app_id/vote/:vote_id', function(req, res) { // varifies that app id and body.id match and runs _update in models
    req.body.app_id = req.params.app_id; 
    req.body.id = req.params.vote_id; 
    util.debug('Voting Update Route Request Body', req.body);
    voting.update(req.body, function(err) { 
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/app/:id/vote/:vote_id', function(req, res) {
    req.body.id = req.params.vote_id; // Deletes User ID using _destroy in models
    voting.destroy(req.body, function(err) {
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({
        success: data
      });
    });
  });

  return router;
};