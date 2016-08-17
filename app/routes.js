var express = require('express'),
    app = express()
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    cors = require('cors'),
    express = require('express'),
    url = require('./config/database.js').url,
    ObjectId = require('mongodb').ObjectID,
    path = require('path'),
    serverURL = require('./config/urls').ServerURL;


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
        collection.findOne({_id: ObjectId(req.params.id)}).then(function(p){
          res.json({Poll: p});
        });
        db.close();
      });
    });

    app.post('/addpoll', cors(), function(req, res){
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('polls');
        var options = req.body.options;

        options.map(function(o){
          o.value = parseInt(o.value);
        })

        collection.insert({username: req.body.username, title: req.body.title, options: options });
        res.json({Success: true});
        db.close();
      });
    });

    app.post('/addoption/:id', cors(), function(req, res){
      MongoClient.connect(url, function(err, db){
        if (err) throw err;
        if (req.body.newOption !== "I'd like a custom option...") {
          var collection = db.collection('polls');
          collection.update(
          {_id: ObjectId(req.body.id) },
          {$push: {"options": {"optionName": req.body.newOption}}});
          res.json({Success: true});
        }
        else {
          res.json({Success: false});
        }
      })
    });

    app.post('/addvote/:id', cors(), function(req, res){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('polls');
        collection.update(
        { _id: ObjectId(req.body.id), "options.optionName": req.body.vote },
        { $inc: { "options.$.value": 1 }});

        res.json({Success: true});
        db.close();
      });
    });

    app.put('/api', cors(), function(req, res) {
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
        collection.deleteOne({_id: ObjectId(req.body._id)});
        res.json({status: 'success'})
        db.close();
      });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.send(req.user)
    });

    app.get('/logout', isLoggedIn, function(req, res) {
      req.session.destroy();
      res.send('Success')
    });

    app.get('/isauth', isLoggedIn, function(req, res) {
      res.json({username: req.user.local.email})
    });

    app.post('/mypolls', isLoggedIn, function(req, res){
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('polls');
        collection.find({username: req.body.username}).toArray(function(err, poll) {
          res.json({Polls: poll});
        });
        db.close();
      });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '#/mypolls', // redirect to the secure profile section
        failureRedirect : '#/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '#/mypolls', // redirect to the secure profile section
        failureRedirect : '#/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      res.sendStatus(403);
    }
}
