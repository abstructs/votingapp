var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');
var titleStyle = {
  textAlign: "left",
  marginBottom: "15px"
},
dropStyle = {
  marginTop: "10px",
  height: "40px",
  width: "200px"
},
btnStyle = {
  marginTop: "10px",
  height: "40px",
  width: "200px"
}
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
        <div className="jumbotron">
          <div className="container">
            <div>
              <h3 style={titleStyle}>{this.props.params}</h3>
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
          <p>I would like to vote...</p>
          <select className="form-control" style={dropStyle}>
            {this.props.poll.Poll.options.map(function(obj){
              for (var key in obj) {
                return <option>{key}</option>
              }
            })}
          </select>
          <button className="btn btn-success" type="submit" style={btnStyle}>Submit</button>
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
