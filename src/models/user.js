module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload, err, success) {
    var cleanData = payload;
    var cryptedData;

    // Hash the user's password
    util.hash(cleanData.password, function(err, hash){
      cleanData.password = hash;
      var cryptedData = cleanData;

      // Save the user with crypted hash
      db.user.create(cryptedData).then(success).catch(err);
    });
  }

  function _update(payload, err, success) {
    var cleanData = payload;
    db.user.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matcheduser) {
      matcheduser.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
  }

  function _find(payload, err, success) {
    var cleanData = payload;
    db.user.find({
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
    db.user.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.user.destroy({
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
