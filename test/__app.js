var expect = require('chai').expect;
var faker = require('faker');
var util = require('../lib/util.js');

var app = require('../src/models/app');
var user = require('../src/models/user');

var userData = {
  dispName: faker.name.findName(),
  email: faker.internet.email(),
  password: 'unhash',
  phone: faker.phone.phoneNumber()
};

var appData = {
  title: faker.commerce.productName()
};

describe('Model: App ', function() {
  // User Create One
  it('Creating a User as Owner for the App', function(done) {
    user.create(userData,

    // On Error
    (err) => {
      util.debug('User Create Error', err);
      throw new Error('User Create Error');
    },

    // On Success
    (data) => {
      util.debug('User Create Success', data);

      // Overwrite the returned obj to userData
      userData = data;
      appData.user_id = userData.id;
      expect(data.dispName).to.be.equal(userData.dispName);
      done();
    });
  });


  // App Create One
  it('Create One', function(done) {
    app.create(appData,

    // On Error
    (err) => {
      util.debug('App Create Error', err);
      throw new Error('App Create Error');
    },

    // On Success
    (data) => {
      util.debug('App Create Success', data);

      // Overwrite the returned obj to appData
      appData = data;
      expect(data.dispName).to.be.equal(appData.dispName);
      done();
    });
  });

  // App Read One
  it('Read One', function(done) {
    app.find(appData,

    // On Error
    (err) => {
      util.debug('App Read One Error', err);
      throw new Error('App Read One Error');
    },

    // On Success
    (data) => {
      util.debug('App Read One Success', data);
      expect(data.dispName).to.be.equal(appData.dispName);
      done();
    });
  });

  // App Read All
  it('Read All', function(done) {
    app.findAll(

    // On Error
    (err) => {
      util.debug('App Read All Error', err);
      throw new Error('App Read All Error');
    },

    // On Success
    (data) => {
      util.debug('App Read All Success', data);
      expect(data.length).to.be.above(0);
      done();
    });
  });

  // App Update One
  it('Update One', function(done) {
    var updateInfo = {id: appData.id, title: 'xx Force Update xx'};
    app.update(updateInfo,

    // On Error
    (err) => {
      util.debug('App Update One Error', err);
      throw new Error('App Update One Error');
    },

    // On Success
    (data) => {
      // Overwrite the returned obj to appData
      appData = data;

      util.debug('App Update One Success', data);
      expect(data.dispName).to.be.equal(updateInfo.dispName);
      done();
    });
  });

  // App Delete
  it('Delete One', function(done) {

    appData.force = true;
    app.destroy(appData,

    // On Error
    (err) => {
      util.debug('App Delete One Error', err);
      throw new Error('App Delete One Error');
    },

    // On Success
    (data) => {
      util.debug('App Delete One Success', data);
      //Successfully deleting a record results in a bool response of 1
      expect(data).to.be.equal(1);
      done();
    });
  });
});
