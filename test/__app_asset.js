var expect = require('chai').expect;
var faker = require('faker');
var util = require('../lib/util.js');

var app_asset = require('../src/models/app_asset');
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

var appAssetData = {
  link: faker.internet.url()
};

describe('Model: App Assets ', function() {
  // User Create One
  it('Creating a User as Owner for the App Assets', function(done) {
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
      appData.user_id = userData.id;
      expect(data.dispName).to.be.equal(data.dispName);
      done();
    });
  });


  // App  Create One
  it('Create One App', function(done) {
    app.create(appData,

    // On Error
    (err) => {
      util.debug('App Create Error', err);
      throw new Error('App Create Error');
    },

    // On Success
    (data) => {
      util.debug('App Create Success', data);

      // Overwrite the returned obj to appAssetData
      expect(data.title).to.be.equal(appData.title);
      appData = data;
      appAssetData.app_id = data.id;
      done();
    });
  });

  // App Assets Create One
  it('Create App Asset', function(done) {
    app_asset.create(appAssetData,

    // On Error
    (err) => {
      util.debug('App Create Error', err);
      throw new Error('App Create Error');
    },

    // On Success
    (data) => {
      util.debug('App Create Success', data);

      // Overwrite the returned obj to appAssetData
      expect(data.link).to.be.equal(appAssetData.link);
      appAssetData = data;
      done();
    });
  });

  // App Assets Read One
  it('Read One', function(done) {
    app_asset.find(appAssetData,

    // On Error
    (err) => {
      util.debug('App Assets Read One Error', err);
      throw new Error('App Assets Read One Error');
    },

    // On Success
    (data) => {
      util.debug('App Assets Read One Success', data);
      expect(data.link).to.be.equal(appAssetData.link);
      done();
    });
  });

  // App Assets Read All
  it('Read All', function(done) {
    app_asset.findAll(

    // On Error
    (err) => {
      util.debug('App Assets Read All Error', err);
      throw new Error('App Assets Read All Error');
    },

    // On Success
    (data) => {
      util.debug('App Assets Read All Success', data);
      expect(data.length).to.be.above(0);
      done();
    });
  });

  // App Assets Update One
  it('Update One', function(done) {
    var updateInfo = {id: appAssetData.id, title: 'xx Force Update xx'};
    app_asset.update(updateInfo,

    // On Error
    (err) => {
      util.debug('App Assets Update One Error', err);
      throw new Error('App Assets Update One Error');
    },

    // On Success
    (data) => {
      // Overwrite the returned obj to appAssetData
      appAssetData = data;

      util.debug('App Assets Update One Success', data);
      expect(data.dispName).to.be.equal(updateInfo.dispName);
      done();
    });
  });

  // App Assets Delete
  it('Delete One', function(done) {

    appAssetData.force = true;
    app_asset.destroy(appAssetData,

    // On Error
    (err) => {
      util.debug('App Assets Delete One Error', err);
      throw new Error('App Assets Delete One Error');
    },

    // On Success
    (data) => {
      util.debug('App Assets Delete One Success', data);
      //Successfully deleting a record results in a bool response of 1
      expect(data).to.be.equal(1);
      done();
    });
  });
});
