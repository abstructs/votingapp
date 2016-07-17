var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');

var Poll = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar pollNav={"active"}/>
        <h1>{this.props.params.id}</h1>
      </div>
    )
  }
});

module.exports = Poll;
