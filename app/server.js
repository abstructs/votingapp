var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    url = 'mongodb://localhost:27017/votingapp',
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/api', cors(), function(req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('polls');

    collection.find().toArray(function(err, poll){
      res.json({Type: poll})
    });
    db.close();
  });
});

app.post('/api', cors(), function(req, res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('polls');
    collection.insert({"Random": "Stuff"});

    // collection.insert({ title: req.body.title, options: req.body.options });

    res.json({Type: "POST"});
    db.close();
  });
});

app.put('/api', cors(), function(req, res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    res.json({Type: "POST"});
    db.close();
  });
});

app.delete('/api', cors(), function(req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    res.json({Type: "POST"});
    db.close();
  });
});


app.listen(8000, function(){console.log("Server is running on port 8000...")});
