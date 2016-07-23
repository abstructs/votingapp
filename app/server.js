var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    url = 'mongodb://localhost:27017/votingapp',
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/allpolls', cors(), function(req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('polls');
    collection.find().toArray(function(err, poll){
      res.json({Polls: poll});
    });
    db.close();
  });
});

app.get('/onepoll/:id', cors(), function(req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('polls');
    collection.findOne({title: req.params.id}).then(function(p){
      res.json({Poll: p});
    });
    db.close();
  });
});

app.post('/addpoll', cors(), function(req, res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('polls');

    collection.insert({ title: req.body.title, options: req.body.options });
    console.log("Successfully inserted: " + req.body.options)
    res.json({Success: true});
    db.close();
  });
});

app.post('/addvote/:id', cors(), function(req, res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('polls');

    // collection.update({title: req.params.id},
    // { $set:
    //     {
    //       options: {}
    //     }
    //   }
    // )
    console.log(req.body.votedFor);
    res.json({Success: true});
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
