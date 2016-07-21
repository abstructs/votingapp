var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

var Navbar = require('./views/Navbar.js');
var Home = require('./views/Home.js');
var Poll = require('./views/Poll.js');
var SignIn = require('./views/SignIn.js');
var NewPoll = require('./views/NewPoll.js');

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

var SignInPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar signNav={"active"}/>
        <SignIn />
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

ReactDOM.render(
  <Router history={hashHistory}>
    <Redirect from="/" to="/polls" />
      <Route path="/polls" component={PollListPage}>
      </Route>
      <Route path="/poll/:id" component={PollPage}>
      </Route>
      <Route path="/signin" component={SignInPage}>
      </Route>
      <Route path="/new" component={CreatePollPage}>
      </Route>
    </Router>,
  document.getElementById('app')
);
