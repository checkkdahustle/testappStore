var expect = require('chai').expect;
var faker = require('faker');
var util = require('../lib/util.js');

var user = require('../src/models/user');

var userData = {
  dispName: faker.name.findName(),
  email: faker.internet.email(),
  password: 'unhash',
  phone: faker.phone.phoneNumber()
};

describe('Model: User ', function() {

  // User Create One
  it('Create One', function(done) {
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
      expect(data.dispName).to.be.equal(userData.dispName);
      done();
    });
  });

  // User Read One
  it('Read One', function(done) {
    user.find(userData,

    // On Error
    (err) => {
      util.debug('User Read One Error', err);
      throw new Error('User Read One Error');
    },

    // On Success
    (data) => {
      util.debug('User Read One Success', data);
      expect(data.dispName).to.be.equal(userData.dispName);
      done();
    });
  });

  // User Read All
  it('Read All', function(done) {
    user.findAll(

    // On Error
    (err) => {
      util.debug('User Read All Error', err);
      throw new Error('User Read All Error');
    },

    // On Success
    (data) => {
      util.debug('User Read All Success', data);
      expect(data.length).to.be.above(0);
      done();
    });
  });

  // User Update One
  it('Update One', function(done) {
    var updateInfo = {id: userData.id, dispName: 'xx Force Update xx'};
    user.update(updateInfo,

    // On Error
    (err) => {
      util.debug('User Update One Error', err);
      throw new Error('User Update One Error');
    },

    // On Success
    (data) => {
      // Overwrite the returned obj to userData
      userData = data;

      util.debug('User Update One Success', data);
      expect(data.dispName).to.be.equal(updateInfo.dispName);
      done();
    });
  });

  // User Delete
  it('Delete One', function(done) {

    userData.force = true;
    user.destroy(userData,

    // On Error
    (err) => {
      util.debug('User Delete One Error', err);
      throw new Error('User Delete One Error');
    },

    // On Success
    (data) => {
      util.debug('User Delete One Success', data);
      //Successfully deleting a record results in a bool response of 1
      expect(data).to.be.equal(1);
      done();
    });
  });
});
