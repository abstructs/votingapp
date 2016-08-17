var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('./style.css');

var Navbar = require('./views/Navbar');
var Home = require('./views/Home');
var Poll = require('./views/Poll');
var SignUp = require('./views/SignUp');
var NewPoll = require('./views/UserViews/NewPoll');
var LogIn = require('./views/LogIn');
var MyPolls = require('./views/UserViews/MyPolls');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;
var url = require('./config/urls').ServerURL;

var isAuth = function() {
  return $.ajax({
    url: url + '/isauth',
    xhrFields: {withCredentials: true},
    cache: false
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
  getInitialState: function() {
    return {
      isLoggedIn: undefined
    }
  },
  componentDidMount: function(){
    var that = this;
    isAuth().then(function(r){
      that.setState({
        isLoggedIn: true,
        userLoggedIn: r.username
      })
    }).fail(function(){
      that.setState({
        isLoggedIn: false
      })
    })
  },
  render: function() {
    if (this.state.isLoggedIn === true && this.state.userLoggedIn !== undefined) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={true}/>
          <Poll params={this.props.params.id} loggedIn={true} userLoggedIn={this.state.userLoggedIn}/>
        </div>
      )
    }
    else if (this.state.isLoggedIn === false) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={false}/>
          <Poll params={this.props.params.id} userLoggedIn={false} loggedIn={false}/>
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
          <NewPoll />
        </div>
      )
    }
    else if (this.state.isLoggedIn === false) {
      return (
        <div>
          <Navbar pollNav={"active"} loggedIn={false}/>
          <NewPoll />
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
});

var MyPollsPage = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar myPollsNav={"active"} />
        <MyPolls />
      </div>
    )
  }
});

var LogOut = React.createClass({
  componentDidMount: function(){
    $.get( url + '/logout', function(res){
      hashHistory
    });
  },
  render: function(){
    return (
      <div></div>
    )
  }
});

var handleLogOut = function(nextState, replace, callback){
  $.ajax({
    url:  url + '/logout',
    xhrFields: {withCredentials: true},
    type: "GET",
    success: function() {
      location.hash = "";
      location.reload();
    },
    error: function(){
      location.hash = "";
      location.reload();
    }
  });
};

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
      <Route path="/logout" onEnter={handleLogOut}>
      </Route>
    </Router>,
  document.getElementById('app')
);
