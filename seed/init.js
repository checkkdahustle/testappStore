var faker = require('faker');
var async = require('async');

// Dot Env File Loader
if (!process.env.PORT) dotenv = require('dotenv').load();

// Include all the models to inject seed info into
var user = require('../src/models/user.js');
var app = require('../src/models/app.js');
var list = require('../src/models/list.js');

// Custom utility handlers
var util = require('../lib/util');

var config = {
  genTotal: 10,
};

// Use Faker to generate a unique User Object
function genSeedUser() {
  var userSeed = {
    dispName: faker.name.findName(),
    email: faker.internet.email(),
    password: "unhashed",
    phone: faker.phone.phoneNumber()
  };
  return userSeed;
}

// Use Faker to generate a unique App Object
function genSeedApp(input) {
  var appSeed = {
    title: faker.commerce.productName(),
    description: faker.company.catchPhrase(),
    user_id: input.user_id || users[0].id,
    readme: faker.internet.url(),
    sourceLink: faker.internet.url(),
    exeLink: faker.internet.url(),
    iOSAppStoreLink: faker.internet.url(),
    releaseDate: faker.date.future(),
  };
  return appSeed;
}

// Use Faker to generate a unique List Object
function genSeedList(input) {
  var listSeed = {
    title: faker.company.companyName(),
    user_id: input.user_id || users[0].id
  };
  return listSeed;
}

// Completion of each cycle of the loop,
function done(err, result) {
  util.debug('Cycle Completed','results or error available');
}


// Start of each cycle of the loop
function genEach() {
  // Prevent callback hell, use async
  async.waterfall([

    // Async Wrapper
    function(callback) {
      // Call the User model to add
      user.create(genSeedUser(), (err) => {
        util.debug("User Error", err);
      }, (data) => {
        util.debug('DB User: Success', data.id);
        callback(null, data);
      });
    },

    // Async Wrapper
    function(createdUser, callback) {
      // Call the App model to add
      app.create(genSeedApp({
        user_id: createdUser.id
      }), (err) => {
        util.debug("App Error", err);
      }, (data) => {
        util.debug('DB App: Success', data.id);
        callback(null, data);
      });
    },

    // Async Wrapper
    function(createdUser, callback) {
      // Call the List model to add
      list.create(genSeedList({
        user_id: createdUser.user_id
      }), (err) => {
        util.debug("List Error", err);
      }, (data) => {
        util.debug('DB List: Success', data.id);
        callback(null, data);
      });
    },

  ], done);
}

// To generate more than a single async cycle loop
for(var i = 0; i < config.genTotal; i++){
  // Run the Async Waterfall
  genEach();
}
