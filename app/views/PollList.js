var React = require('react'),
Link = require('react-router').Link,
$ = require('jQuery');

var count = 0;

var textStyle = {
  textAlign: "center"
};

var PollList = React.createClass({
  render: function(){
    if (this.props.pollData.Polls) {
      return (
        <div>
          {this.props.pollData.Polls.map(function(poll){
            return <Link className="list-group-item" style={textStyle} to={'/poll/' + poll._id.toString()} key={count++}>{poll.title}</Link>
          })}
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


module.exports = PollList;
