var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    url = 'mongodb://localhost:27017/polls';

app.get('/api', cors(), function(req, res) {
 var stuff;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    db.polls.insert({
      "food": 1
    });

    res.json('hello world');
    db.close();

  });

});
app.listen(8000, function(){console.log("Server is running on port 8000...")});
