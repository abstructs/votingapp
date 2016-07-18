var React = require('react');
var Link = require('react-router').Link;
var Navbar = require('./Navbar.js')
var PollList = require('./PollList.js');
require('../style.css')
var count = 0;
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
  render: function() {
    return (
      <div>
        <div className="container">
          <div style={divStyle}>
            <Link className="btn btn-success" style={btnStyle} to={`/new`}>Create New Poll</Link>
            <h1>Free Code Camp Voting</h1>
            <p className="lead"> Below are polls! {"\n"} Select a poll to see the results and vote, or sign-in to make a new poll.</p>
          </div>
          {/* TODO: Add polls */}
          <div className="list-group">
          {this.props.polls.map(function(poll){
            return <PollList title={poll.title} key={count++}/>
          })}
          </div>
        </div>
      </div>
    )
  }
});


module.exports = Home;
