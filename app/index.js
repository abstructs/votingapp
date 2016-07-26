var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
require('./style.css');

var Navbar = require('./views/Navbar.js');
var Home = require('./views/Home.js');
var Poll = require('./views/Poll.js');
var SignUp = require('./views/SignUp.js');
var NewPoll = require('./views/NewPoll.js');
var LogIn = require('./views/LogIn.js');
var Profile = require('./views/Profile.js');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;

var PollListPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar pollNav={"active"}/>
        <Home />
      </div>
    )
  }
});

var SignUpPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar signNav={"active"}/>
        <SignUp />
      </div>
    )
  }
});
var LogInPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar signNav={"active"}/>
        <LogIn />
      </div>
    )
  }
});

var PollPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar pollNav={"active"}/>
        <Poll params={this.props.params.id}/>
      </div>
    )
  }
});

var CreatePollPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar pollNav={"active"}/>
        <NewPoll />
      </div>
    )
  }
});

var ProfilePage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar pollNav={"active"}/>
        <Profile />
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={hashHistory}>
    <Redirect from="/" to="/polls" />
      <Route path="/polls" component={PollListPage}>
      </Route>
      <Route path="/poll/:id" component={PollPage}>
      </Route>
      <Route path="/signup" component={SignUpPage}>
      </Route>
      <Route path="/new" component={CreatePollPage}>
      </Route>
      <Route path="/profile" component={ProfilePage}>
      </Route>
      <Route path="/login" component={LogInPage}>
      </Route>
    </Router>,
  document.getElementById('app')
);
