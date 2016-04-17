module.exports = function() {
  var db = require('./db.js');
  var sequelize = db.connection;
  var util = require('../../lib/util');

  function _create(payload, err, success) {
    var cleanData = payload;
    db.listedApp.create(cleanData).then(success).catch(err);
  }

  function _destroy(payload, err, success) {
    var cleanData = payload;
    util.debug('Listed Apps Model Destroy Payload', cleanData);
    db.listedApp.destroy({
      where: cleanData,
      force: payload.force
    }).then(success).catch(err);
  }

  return {
    create: _create,
    destroy: _destroy,
  };
}();
