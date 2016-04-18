module.exports = function(express) {
  var router = express.Router();
  var appAsset = require('../../models/app_asset.js');
  var util = require('../../../lib/util');
  
  // Read One
  router.get('/asset/:asset_id', function(req, res) {
    req.body.id = req.params.asset_id;
    appAsset.find(req.body, function(err) {
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Read All
  router.get('/assets', function(req, res) {
    appAsset.findAll(function(err) {
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Create
  router.put('/app/:app_id/asset', function(req, res) {
    req.body.app_id = req.params.app_id;
    appAsset.create(req.body, function(err) {

      // Error Encountered, try removing id and try again.
      // TODO: Impliment this on other Creates, improve logic and error handling
      delete req.body.id;
      appAsset.create(req.body, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data);
      });
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Update
  router.put('/app/:app_id/asset/:asset_id', function(req, res) {
    req.body.app_id = req.params.app_id;
    req.body.id = req.params.asset_id;
    util.debug('App Asset Update Route Request Body', req.body);
    appAsset.update(req.body, function(err) {
      // Error Encountered
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  });

  // Delete One
  router.delete('/app/:id/asset/:asset_id', function(req, res) {
    req.body.id = req.params.asset_id;
    appAsset.destroy(req.body, function(err) {
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
