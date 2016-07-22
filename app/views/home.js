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
  float: "right"
};

var Home = React.createClass({
  getInitialState: function() {
    return {
      pollData: {}
    }
  },
  componentDidMount: function() {
    this.serverRequest = $.get('http://localhost:8000/allpolls', function(polls){
      this.setState({
        pollData: polls
      })
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <div className="container">
          <div style={divStyle}>
            <Link className="btn btn-success" style={btnStyle} to={`/new`}>Create New Poll</Link>
            <h1>Free Code Camp Voting</h1>
            <p className="lead"> Below are polls! {"\n"} Select a poll to see the results and vote, or sign-in to make a new poll.</p>
          </div>
          <div className="list-group">

          <PollList pollData={this.state.pollData} />

          </div>
        </div>
      </div>
    )
  }
});


module.exports = Home;
