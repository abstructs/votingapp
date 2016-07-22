var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');
var titleStyle = {
  marginTop: '50px'
}
var Poll = React.createClass({
  getInitialState: function(){
    return {
      pollData: {}
    }
  },
  componentDidMount: function() {
    $.get('http://localhost:8000/onepoll/' + this.props.params, function(polls){
      console.log(polls)
    })
  },
  render: function() {
    return (
      <div>
        <div>
          <div className="container">
            <div>
              <p style={titleStyle}>{this.props.params}</p>
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
            All Options
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>Hello</li>
          </ul>
        </div>
      </div>
    )
  }
});
module.exports = Poll;
