var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');
var titleStyle = {
  marginTop: '50px'
},
count = 0;
var Poll = React.createClass({
  getInitialState: function(){
    return {
      pollData: {title: "", options: []}
    }
  },
  componentDidMount: function() {
    $.get('http://localhost:8000/onepoll/' + this.props.params, function(poll){
      this.setState({
        pollData: poll
      })
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <div>
          <div className="container">
            <div>
              <p style={titleStyle}>{this.props.params}</p>
            </div>
            <RenderOptions poll={this.state.pollData} key={count++} />
          </div>
        </div>
      </div>
    )
  }
});

var RenderOptions = React.createClass({
  render: function() {
    if (this.props.poll.Poll !== undefined) {
      return (
        <div>
          {this.props.title}
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              All Options
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {this.props.poll.Poll.options.map(function(obj){
                for (var key in obj) {
                  return <li><a href="#">{key}</a></li>
                }
              })}
            </ul>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>Loading...</div>
      )
    }
  }
});
module.exports = Poll;
