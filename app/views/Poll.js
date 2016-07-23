var React = require('react');
var Navbar = require('./Navbar.js');
var Chart = require('chart.js')
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
  width: "500px",
  height: "500px"
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
  componentDidUpdate: function() {
    if (this.props.poll.Poll !== undefined) {
      $(function(){
        var ctx = $('#myChart').get(0).getContext("2d"),
        data = {
          labels: [
            "Red",
            "Blue",
            "Yellow"
          ],
          datasets: [
            {
              data: [300, 50, 100],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }]
        },
        options = {
          maintainAspectRatio: true,
          responsive: false
        },
        myPieChart = new Chart(ctx,{
          type: 'pie',
          data: data,
          options: options
        })
        return true;
      });
    }
    else {
      return false;
    }
  },
  render: function() {
    if (this.props.poll.Poll !== undefined) {
      return (
        <div>
          <div>
            <canvas id="myChart" height="300px" style={chartStyle}></canvas>
          </div>

          {/* {this.props.poll.Poll.options.map(function(obj){
            for (var key in obj) {
              return <h4 style={chartStyle}>Option: {obj.optionName}<br/> Votes: {obj.value}</h4>
            }
          })} */}
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
