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
    cookieSesh   = require('./config/cookiesesh.js');

mongoose.connect(configDB.url); // connect to our database
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser(cookieSesh.cookieSesh)); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(session({
    secret: cookieSesh.cookieSesh,
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.options('/isauth', cors());
app.options('/delete/', cors()); // allow use of .delete for XMLhttpRequests

require('./routes.js')(app, passport);
require('./config/passport')(passport)
app.listen(8000, function(){console.log("Server is running on port 8000...")});
