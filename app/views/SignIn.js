var React = require('react')

var textStyle = {
  textAlign: "center"
}

var SignIn = React.createClass({
  render: function(){
    return (
      <h1 style={textStyle}>Sign In</h1>
    )
  }
});


module.exports = SignIn;
