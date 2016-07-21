var React = require('react'),
Link = require('react-router').Link,
$ = require('jQuery');

var textStyle = {
  textAlign: "center"
}

var PollList = React.createClass({
  componentDidMount: function() {
    $.get('http://localhost:8080/api', function(polls){
      console.log(polls)
    });
  },
  render: function(){
    return (
      <Link className="list-group-item" style={textStyle} to={`/poll/${this.props.title}`}>{this.props.title}</Link>
    )
  }
});


module.exports = PollList;
