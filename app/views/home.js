var React = require('react');
var Link = require('react-router').Link;
var Navbar = require('./Navbar.js')
var PollList = require('./PollList.js');
var $ = require('jQuery');
require('../style.css');
var divStyle = {
    padding: "40px 15px",
    textAlign: "center"
},
textStyle = {
  textAlign: "center"
},
btnStyle = {
  marginBottom: "40px",
  position: "absolute",
  left: "80%"
};

var Home = React.createClass({
  getInitialState: function() {
    return {
      pollData: {},
      loggedIn: undefined
    }
  },
  componentDidMount: function() {
    $.get('http://localhost:8000/allpolls', function(res){
      this.setState({
        pollData: res
      })
    }.bind(this))
  },
  render: function() {
    if (this.props.loggedIn === true) {
      return (
        <div>
          <div className="container">
            <div style={divStyle}>
              <Link className="btn btn-success" style={btnStyle} to={'/new'}>Create New Poll</Link>
              <h1>Voticon!</h1>
              <p className="lead"> Make your vote known... <br></br> Select a poll to from below to view results and vote, or sign-in to make a new poll.</p>
            </div>
            <div className="list-group">
              <PollList pollData={this.state.pollData} />
            </div>
          </div>
        </div>
      )
    }
    else if (this.props.loggedIn === false) {
      return (
        <div>
          <div className="container">
            <div style={divStyle}>
              <h1>Voticon!</h1>
              <p className="lead"> Make your vote known... <br></br> Select a poll to from below to view results and vote, or sign-in to make a new poll.</p>
            </div>
            <div className="list-group">
              <PollList pollData={this.state.pollData} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>

          Loading...

        </div>
      )
    }
  }
});


module.exports = Home;
