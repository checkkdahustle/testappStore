module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload, err, success) {
    var cleanData = util.scrubData(payload);
    db.app.create(cleanData).then(success).catch(err);
  }

  function _update(payload, err, success) {
    var cleanData = util.scrubData(payload);
    db.app.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedapp) {
      matchedapp.updateAttributes(cleanData).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
    var cleanData = util.scrubData(payload);
    db.app.find({
      where: {
        id: cleanData.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _findAll(err, success) {
    db.app.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.app.destroy({
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
