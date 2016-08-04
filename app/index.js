var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');
require('./style.css');

var Navbar = require('./views/Navbar.js');
var Home = require('./views/Home.js');
var Poll = require('./views/Poll.js');
var SignUp = require('./views/SignUp.js');
var NewPoll = require('./views/UserViews/NewPoll.js');
var LogIn = require('./views/LogIn.js');
var MyPolls = require('./views/UserViews/MyPolls.js');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;

var isAuth = function(callback) {
  return $.ajax({
    url: 'http://localhost:8000/isauth',
    xhrFields: {withCredentials: true},
    success: function() {
      if (callback) {
        callback(true);
      }
    },
    error: function() {
      if (callback) {
        callback(false);
      }
    }
  });
};

var PollListPage = React.createClass({
  getInitialState: function(){
    return {
      isLoggedIn: undefined
    }
  },
  componentDidMount: function(){
    var that = this;
    isAuth().then(function(r){
      that.setState({
        isLoggedIn: true
      })
    }).fail(function(r){
      that.setState({
        isLoggedIn: false
      })
    })
  },
  render: function() {
    if (this.state.isLoggedIn !== undefined && this.state.isLoggedIn === true) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={true}/>
          <Home loggedIn={true} />
        </div>
      )
    }
    else if (this.state.isLoggedIn !== undefined && this.state.isLoggedIn === false) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={false}/>
          <Home loggedIn={false} />
        </div>
      )
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
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
  getInitialState: function(){
    return {
      isLoggedIn: undefined
    }
  },
  componentDidMount: function(){
    var that = this;
    isAuth().then(function(r){
      that.setState({
        isLoggedIn: true
      })
    }).fail(function(r){
      that.setState({
        isLoggedIn: false
      })
    })
  },
  render: function() {
    if (this.state.isLoggedIn === true) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={true}/>
          <Poll params={this.props.params.id} loggedIn={true}/>
        </div>
      )
    }
    else if (this.state.isLoggedIn === false) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={false}/>
          <Poll params={this.props.params.id} loggedIn={false}/>
        </div>
      )
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
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

var MyPollsPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar myPollsNav={"active"}/>
        <MyPolls />
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
      <Route path="/mypolls" component={MyPollsPage}>
      </Route>
      <Route path="/login" component={LogInPage}>
      </Route>
    </Router>,
  document.getElementById('app')
);
