module.exports = function(express) {
  var router = express.Router();
  var voting = require('../../models/voting.js');
  var util = require('../../../lib/util');

  // Read One
  router.get('/voter/:voter_id', function(req, res) {
    req.body.id = req.params.voter_id;
    voting.find(req.body, function(err) { //Finds ID in DB
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/voters', function(req, res) {
    voting.findAll(function(err) { //Finds all in DB under voting
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/vote/:vote_id/voter', function(req, res) {
    req.body.vote_id = req.params.vote_id;
    voting.create(req.body, function(err) {

      // Error Encountered, try removing id and try again.
      // TODO: Impliment this on other Creates, improve logic and error handling
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
  router.put('/vote/:vote_id/voter/:voter_id', function(req, res) {
    req.body.vote_id = req.params.vote_id; // Updates the vote
    req.body.id = req.params.voter_id; // Updates the ID of new vote
    util.debug('Voting Update Route Request Body', req.body);
    voting.update(req.body, function(err) {
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/vote/:id/voter/:voter_id', function(req, res) {
    req.body.id = req.params.voter_id; // Deletes User ID 
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
