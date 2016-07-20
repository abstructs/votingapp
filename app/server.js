var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cors = require('cors'),
    express = require('express'),
    app = express();

app.get('/api', cors(), function(req, res) {
  var stuff = {
    hello: "World",
    world: "hello"
  }
  res.json(stuff);
});
app.listen(8000, function(){console.log("Server is running on port 8000...")});
