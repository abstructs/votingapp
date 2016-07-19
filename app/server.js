var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var express = require('express'),
    app = express();

app.get('/api', function(req, res) {
  res.send('hello world');
});
app.listen(8000, function(){"server is running..."});
