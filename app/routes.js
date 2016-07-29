var express = require('express'),
    app = express()
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cors = require('cors'),
    express = require('express'),
    url = 'mongodb://localhost:27017/votingapp';


module.exports = function(app, passport) {
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
        var title = req.body.title;
        var options = req.body.options;

        options.map(function(o){
          o.value = parseInt(o.value);
        })

        collection.insert({ title: req.body.title, options: options });
        res.json({Success: true});
        db.close();
      });
    });

    app.post('/addvote/:id', cors(), function(req, res){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('polls');

        collection.update(
        {"options.optionName": req.body.vote },
        { $inc: { "options.$.value": 1 }});

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
    app.delete('/delete/', cors(), function(req, res) {
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        var collection = db.collection('polls');

        collection.deleteOne({title: req.body.title});

        db.close();
      });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.send(req.user)
    });

    app.get('/logout', cors(), function(req, res) {
      req.logout();
    });

    app.get('/isauth', function(req, res){
      console.log(req.cookies);
      res.send('hello');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : 'http://localhost:8080/#/profile', // redirect to the secure profile section
        failureRedirect : 'http://localhost:8080/#/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : 'http://localhost:8080/#/profile', // redirect to the secure profile section
        failureRedirect : 'http://localhost:8080/#/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.isAuthenticated())
      return next();
    }
    else {
      res.sendStatus(403);
    }
}
