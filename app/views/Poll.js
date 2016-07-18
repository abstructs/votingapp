var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');

var Poll = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <div className="container">
            <div>
              <h1>{this.props.params}</h1>
            </div>
            <RenderOptions options={this.props.polls} />
          </div>
        </div>
      </div>
    )
  }
});

var RenderOptions = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.title}
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Vote:
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          </ul>
        </div>
      </div>
    )
  }
});
module.exports = Poll;
