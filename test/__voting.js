
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////



// In Progress DO NOT touch this file Thank You -Carson


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////














// var request = require('supertest');
// var faker = require('faker');
// var util = require('../lib/util.js');

// describe('API: Voting Routes', function() {
//   var server;
//   var testingObjData = {
//     vote_id: '075d3674-e0b4-47f2-9428-d28fb1d53604',
//     link: faker.image.imageUrl(), // Also a column in DB holding the URL to image
//     type: 'image' // Column in DB image
//   }

//   var testingObj;

//   // Before / After each test create / destroy the express server to fully simulate unique requests.
//   // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//   beforeEach(function() {
//     server = require('../src/server.js');
//   });
//   afterEach(function() {
//     server.close();
//   });

//   // Create One
//   it('Voting Create One', function(done) {
//     request(server)
//       .put('/api/vote/' + testingObjData.vote_id + '/voter')
//       .set('Accept', 'application/json')
//       .send(testingObjData)
//       .expect('Content-Type', /json/)
//       .expect(function(res) {
//         util.debug('Voting Create Route Request Data', testingObjData);
//         util.debug('Voting Create Route Response', res.body);

//         if (!util.hayTest(testingObjData, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');

//         // Save info about the created as our Testing Object
//         testingObj = res.body;
//       })
//       .expect(200, done);
//   });

//   // Update One
//   it('Voting Update', function(done) {
//     var payload = testingObj;
//     payload.link = faker.image.imageUrl() + '?update=true';
//     request(server)
//       .put('/api/vote/' + testingObjData.vote_id + '/voter/' + payload.id.toString())
//       .set('Accept', 'application/json')
//       .send(payload)
//       .expect('Content-Type', /json/)
//       .expect(function(res) {
//         util.debug('Voting Update Payload', payload);
//         util.debug('Voting Update Route Response', res.body);

//         if (!util.hayTest(payload, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
//       })
//       .expect(200, done);
//   });

//   // Read One
//   it('Voting Read One', function(done) {
//     request(server)
//       .get('/api/voter/' + testingObj.id.toString())
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(function(res) {
//         util.debug('Voting Read Testing Data', testingObj);
//         util.debug('Voting Read Route Response', res.body);

//         if (!util.hayTest(testingObj, res.body)) throw new Error('hayTest has concluded that data sent to and received from the server does not match.');
//       })
//       .expect(200, done);
//   });

//   // Read All
//   it('Voting Read All', function(done) {
//     request(server)
//       .get('/api/votes')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(function(res) {
//         util.debug('Voting Read All Route Response', res.body);

//         if (res.body.length < 1) throw new Error('Less than 1 entry in the Voting Table');
//       })
//       .expect(200, done);
//   });

//   // Destroy
//   it('Voting Destroy', function(done) {
//     request(server)
//       .delete('/api/vote/' + testingObjData.vote_id + '/voter/' + testingObj.id.toString())
//       .set('Accept', 'application/json')
//       .send({
//         force: true
//       })
//       .expect('Content-Type', /json/)
//       .expect(function(res) {
//         util.debug('Voting Delete App Asset Data', testingObj);
//         util.debug('Voting Delete Route Response', res.body);

//         if (!res.body.success) throw new Error('Destroy did not correctly work');
//       })
//       .expect(200, done);
//   });

// });
