var expect = require('chai').expect;
var faker = require('faker');
var util = require('../lib/util.js');

var app = require('../src/models/app');
var list = require('../src/models/list');
var listed_apps = require('../src/models/listed_apps');
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

var listData = {
  title: faker.commerce.productName()
};

var listedAppData = {};

describe('Model: List ', function() {
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
      listData.user_id = data.id;
      expect(data.dispName).to.be.equal(userData.dispName);
      done();
    });
  });


  // App Create One
  it('Creating an App to be placed in the List', function(done) {
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

  // List Create One
  it('Create One', function(done) {
    list.create(listData,

    // On Error
    (err) => {
      util.debug('List Create Error', err);
      throw new Error('List Create Error');
    },

    // On Success
    (data) => {
      util.debug('List Create Success', data);

      // Overwrite the returned obj to listData
      listData = data;
      expect(data.dispName).to.be.equal(listData.dispName);
      done();
    });
  });

  // Add App to List
  it('Add App to List', function(done) {
    listed_apps.create({
      appId: appData.id,
      listId: listData.id
    },

    // On Error
    (err) => {
      util.debug('Add App to List Error', err);
      throw new Error('Add App to List Error');
    },

    // On Success
    (data) => {
      util.debug('Add App to List Success', data);

      // Overwrite the returned obj to listData
      listedAppData = data;
      expect(data.appId).to.be.equal(listedAppData.appId);
      done();
    });
  });

  // List Read One
  it('Read One', function(done) {
    list.find(listData,

    // On Error
    (err) => {
      util.debug('List Read One Error', err);
      throw new Error('List Read One Error');
    },

    // On Success
    (data) => {
      util.debug('List Read One Success', data);
      expect(data.dispName).to.be.equal(listData.dispName);
      done();
    });
  });

  // List Read All
  it('Read All', function(done) {
    list.findAll(

    // On Error
    (err) => {
      util.debug('List Read All Error', err);
      throw new Error('List Read All Error');
    },

    // On Success
    (data) => {
      util.debug('List Read All Success', data);
      expect(data.length).to.be.above(0);
      done();
    });
  });

  // List Update One
  it('Update One', function(done) {
    var updateInfo = {id: listData.id, title: 'xx Force Update xx'};
    list.update(updateInfo,

    // On Error
    (err) => {
      util.debug('List Update One Error', err);
      throw new Error('List Update One Error');
    },

    // On Success
    (data) => {
      // Overwrite the returned obj to listData
      listData = data;

      util.debug('List Update One Success', data);
      expect(data.dispName).to.be.equal(updateInfo.dispName);
      done();
    });
  });


  // Listed App Delete
  it('Delete List App Relation', function(done) {

    listedAppData.force = true;
    listed_apps.destroy({appId: appData.id, listId: listData.id},

    // On Error
    (err) => {
      util.debug('List Delete One Error', err);
      throw new Error('List Delete One Error');
    },

    // On Success
    (data) => {
      util.debug('List Delete One Success', data);
      //Successfully deleting a record results in a bool response of 1
      expect(data).to.be.equal(1);
      done();
    });

    // List Delete
    it('Delete List', function(done) {

      listData.force = true;
      list.destroy(listData,

      // On Error
      (err) => {
        util.debug('List Delete One Error', err);
        throw new Error('List Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('List Delete One Success', data);
        //Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
    });

    // List Delete
    it('Delete User', function(done) {

      userData.force = true;
      user.destroy(userData,

      // On Error
      (err) => {
        util.debug('List Delete One Error', err);
        throw new Error('List Delete One Error');
      },

      // On Success
      (data) => {
        util.debug('List Delete One Success', data);
        //Successfully deleting a record results in a bool response of 1
        expect(data).to.be.equal(1);
        done();
      });
    });

  });
});
