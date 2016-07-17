var React = require('react');
var Link = require('react-router').Link;

require('../style.css')
var divStyle = {
    padding: "40px 15px",
    textAlign: "center"
},
textStyle = {
  textAlign: "center"
}

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <div className="container">
          <div style={divStyle}>
            <h1>Free Code Camp Voting</h1>
            <p className="lead"> Below are polls! {"\n"} Select a poll to see the results and vote, or sign-in to make a new poll.</p>
          </div>
          {/* TODO: Add polls */}
          <ul>
          {this.props.polls.map(function(poll){
            return <PollList poll={poll} key={poll}/>
          })}
          </ul>
        </div>
      </div>
    )
  }
});

var PollList = React.createClass({
  render: function(){
    return (
      <li className="list-group-item" style={textStyle}><Link to={`/poll/${this.props.poll}`}>{this.props.poll}</Link></li>
    )
  }
});

module.exports = Home;
