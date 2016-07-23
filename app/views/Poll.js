var React = require('react');
var Navbar = require('./Navbar.js')
require('../style.css');
var titleStyle = {
  textAlign: "left",
  marginBottom: "15px"
},
selectStyle = {
  marginTop: "10px",
  height: "40px",
  width: "200px"
},
btnStyle = {
  marginTop: "10px",
  height: "40px",
  width: "200px"
},
chartStyle = {
  textAlign: "center"
};
var Poll = React.createClass({
  getInitialState: function(){
    return {
      pollData: {title: "", options: []}
    }
  },
  componentDidMount: function() {
    $.get('http://localhost:8000/onepoll/' + this.props.params, function(poll){
      this.setState({
        pollData: poll,
        selection: ""
      })
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <div>
              <h2 style={titleStyle}>{this.props.params}</h2>
            </div>
            <RenderOptions poll={this.state.pollData} />
            <RenderResults poll={this.state.pollData} />
          </div>
        </div>
      </div>
    )
  }
});

var RenderOptions = React.createClass({
  handleClick: function() {
    var optionSelected = $('#allOptions').find(":selected").text();
    if (typeof(optionSelected) === "string") {
      var votedFor = {
        vote: optionSelected
      }
      $.post('http://localhost:8000/addvote/' + this.props.poll.Poll.title, votedFor, function(res){
        console.log(res);
      });
    }
  },
  render: function() {
    if (this.props.poll.Poll !== undefined) {
      return (
        <div>
          {this.props.title}
          <p>I would like to vote...</p>
          <select className="form-control" id="allOptions" style={selectStyle}>
            {this.props.poll.Poll.options.map(function(obj){
              return <option>{obj.optionName}</option>
            })}
          </select>
          <button className="btn btn-success" type="submit" onClick={this.handleClick} style={btnStyle}>Submit</button>
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

var RenderResults = React.createClass({
  render: function() {
    if (this.props.poll.Poll !== undefined) {
      return (
        <div>
          {this.props.poll.Poll.options.map(function(obj){
            for (var key in obj) {
              return <h4 style={chartStyle}>Option: {obj.optionName}<br/> Votes: {obj.value}</h4>
            }
          })}
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
});

module.exports = Poll;
