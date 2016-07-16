var React = require('react');
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
            return <Poll poll={poll}/>
          })}
          </ul>
        </div>
      </div>
    )
  }
});

var Poll = React.createClass({
  render: function(){
    return (
      <li className="list-group-item" style={textStyle}>{this.props.poll}</li>
    )
  }
});

module.exports = Home;
