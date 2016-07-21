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

var polls = [
  {
    title: "Food",
    options: [
      {
        apples: 3
      },
      {
        pears: 4
      },
      {
        oranges: 2
      }
    ]
  },
  {
    title: "Places",
    options: [
      {
        newYork: 4
      },
      {
        Florida: 2
      },
      {
        Paris: 0
      }
    ]
  }
];

var PollListPage = React.createClass({
  getInitialState: function() {
    return {
      polls: polls
    }
  },
  render: function() {
    return (
      <div>
        <Navbar pollNav={"active"}/>
        <Home polls={polls}/>
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
        <Poll polls={polls} params={this.props.params.id}/>
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
