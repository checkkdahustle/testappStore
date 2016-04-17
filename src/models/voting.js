module.exports = function() {
  var db = require('./db.js'); // Sets db to imported file db.js
  var sequelize = db.connection; // Sets sequelize to db.connection
  var util = require('../../lib/util'); // Sets util to imported util.js


  /*
    New function _create accepts 3 parameters, payload, err, and success
    Sets in scope variable cleanData to passed paramaeter payload.
    todo's, research line 15 and explain
  */
  function _create(payload, err, success)
  {
    var cleanData = payload;
    db.voting.create(cleanData).then(success).catch(err);
  }

  /*
   New function _update accepts 3 parameters, payload, err, and success
   Sets in scope variable cleanData to passed parameter payload
   todo's research lines 26 through 32 and explain
  */

  function _update(payload, err, success) {
    var cleanData = payload;
    db.voting.find({
      where: {
        id: cleanData.id
      }
    }).then(function(matchedvoting) {
      matchedvoting.updateAttributes(payload).then(success).catch(err);
    }).catch(err);
  }

  /*
    New function _find accepts 3 parameters, payload, err, and success
    Sets in scope variable cleanData to passed parameter Payload
    todos' research line 41 and lines 43 - 51
  */
  function _find(payload, err, success) {
    util.debug('Voting Model _Find Payload', payload)
    var cleanData = payload;
    db.voting.find({
      where: {
        id: cleanData.id
      },
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  /*
    New function _findAll accepts 2 parameters, error and success
    todo's research lines 59 - 64
  */
  function _findAll(err, success) {
    db.voting.findAll({
      include: [{
        all: true,
        nested: true
      }]
    }).then(success).catch(err);
  }

  /*
    New function _destroy accepts 3 paramaters, palyoad, err, and success
    Sets in scope variable cleanData to passed paramater paylaod
    todo's research lines 75 - 80
  */

  function _destroy(payload, err, success) {
    var cleanData = payload;
    db.voting.destroy({
      where: {
        id: cleanData.id
      },
      force: payload.force
    }).then(success).catch(err);
  }


  /*
    Returns an object with the functions?
    todo's look more into this return
  */
  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy,
  }
}();
