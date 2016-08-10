var MongoClient  = require('mongodb').MongoClient,
    assert       = require('assert'),
    cors         = require('cors'),
    express      = require('express'),
    app          = express(),
    url          = 'mongodb://localhost:27017/votingapp',
    bodyParser   = require('body-parser'),
    passport     = require('passport'),
    mongoose     = require('mongoose'),
    flash        = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    configDB     = require('./config/database.js'),
    cookieSesh   = require('./config/cookiesesh.js'),
    connect      = require('connect'),
    flash        = require('connect-flash'),
    http         = require('http');

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
if ('OPTIONS' == req.method) {
     res.send(200);
 } else {
     next();
 }
});

mongoose.connect(process.env.MONGOLAB_URI || configDB.url); // connect to our database
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.options('/delete/', cors()); // allow use of .delete for XMLhttpRequests

require('./routes.js')(app, passport);
require('./config/passport')(passport);

http.createServer(app).listen(process.env.PORT || 8000);
