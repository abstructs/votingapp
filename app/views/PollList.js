var React = require('react')
var Link = require('react-router').Link;

var textStyle = {
  textAlign: "center"
}

var PollList = React.createClass({
  render: function(){
    return (
      <Link className="list-group-item" style={textStyle} to={`/poll/${this.props.poll}`}>{this.props.poll}</Link>
    )
  }
});


module.exports = PollList;
