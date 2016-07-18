var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');

var Poll = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.id}</h1>
      </div>
    )
  }
});

module.exports = Poll;
