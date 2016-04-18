module.exports = function(express) {

  var router = express.Router();
  var g = require('ger');
  var esm = new g.MemESM();//Event Store Manager
  var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json

//change test parameters
//might use .put for postman
var person='jeff';
var sports='sports';
var thing='swimming';

//ger will produce a confidence amount which represents what to recommend to subject user.
//the higher the confidence the higher the thing/game will be recommended

var sports_bucket = ger.initialize_namespace('sports')//bucket of events with name sport. other buckets will be made
.then( function() {
  return ger.events([
    {
      namespace: 'sports',
      person: 'bob',
      action: 'likes',
      thing: 'soccer',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'bob',
      action: 'likes',
      thing: 'swimming',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'bob',
      action: 'likes',
      thing: 'baseball',
      expires_at: '2020-06-06'
    }
    ,{
      namespace: 'sports',
      person: 'jeff',
      action: 'likes',
      thing: 'swimming',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'jeff',
      action: 'likes',
      thing: 'basketball',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'sports',
      person: 'alice',
      action: 'likes',
      thing: 'soccer',
      expires_at: '2020-06-06'
    }
    ,{
      namespace: 'sports',
      person: 'alice',
      action: 'likes',
      thing: 'voleyball',
      expires_at: '2020-06-06'
    }
    // {
    // namespace: 'sports',
    // person: 'alice',
    // action: 'likes',
    // things: 'basketball',
    // expires_at: '2020-06-06'
    // }
  ])
});

return sports_bucket;
}
