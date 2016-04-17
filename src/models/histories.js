module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

// Create
  function _create(payload, err, success) {
    var cleanData = util.scrubData(payload);
    db.histories.create(cleanData).then(success).catch(err);
  }
// Update
  function _update(payload, err, success) {
    var cleanData = util.scrubData(payload);
    db.histories.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedhistories) {
      matchedhistories.updateAttributes(cleanData).then(success).catch(err);
    }).catch(err);
  }
// Find
  function _find(payload, err, success) {
    var cleanData = util.scrubData(payload);
    db.histories.find({
      where: {
        id: cleanData.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }
// Find All
  function _findAll(err, success) {
    db.histories.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }
// Delete
  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.histories.destroy({
      where: {
        id: cleanData.id
      },
      force: payload.force
    }).then(success).catch(err);
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy,
  }
}();
