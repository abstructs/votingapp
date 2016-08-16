var React = require('react');
var url = require('../config/urls').ServerURL;
var isAuth = function(callback) {
  return $.ajax({
    url: url + '/isauth',
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
var Navbar = React.createClass({
  getInitialState: function(){
    return {
      isLoggedIn: undefined
    }
  },
  componentDidMount: function(){
    var that = this;
    if (this.props.loggedIn === undefined) {
      isAuth().then(function(r){
        that.setState({
          isLoggedIn: true
        })
      }).fail(function(r){
        that.setState({
          isLoggedIn: false
        })
      })
    }
  },
  render: function() {
    if (this.state.isLoggedIn === true || this.props.loggedIn === true) {
      return (
        <div>
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">

              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Voticon</a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className={this.props.homeNav || ""}><a href="#">Home</a></li>
                  <li className={this.props.pollNav || ""}><a href="#polls">Polls</a></li>
                  <li className={this.props.myPollsNav || ""}><a href="#mypolls">My Polls</a></li>
                  <li className={""}><a href="#logout">Log Out</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )
    }
    else if (this.state.isLoggedIn === false || this.props.loggedIn === false) {
      return (
        <div>
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">

              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Voticon</a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className={this.props.homeNav || ""}><a href="#">Home</a></li>
                  <li className={this.props.pollNav || ""}><a href="#polls">Polls</a></li>
                  <li className={this.props.signNav || ""}><a href="#signup">Sign Up</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )
    }
    else {
      return (
        <div>
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">

              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Voticon</a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )
    }
  }
});

module.exports = Navbar;
