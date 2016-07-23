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
optionsStyle = {
  paddingLeft: "60px"
}
chartStyle = {
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
            <div className="col-sm-6" style={optionsStyle}>
              <h2 style={titleStyle}>{this.props.params}</h2>
              <RenderOptions poll={this.state.pollData} />
            </div>
            <div className="col-sm-4">
              <RenderResults poll={this.state.pollData} />
            </div>
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
        var pollData = {
          values: [],
          labels: []
        };
        {this.props.poll.Poll.options.map(function(obj){
          pollData.labels.push(obj.optionName);
          pollData.values.push(obj.value);
        })}
        var ctx = $('#myChart').get(0).getContext("2d"),
        data = {
          labels: pollData.labels,
          datasets: [
            {
              data: pollData.values,
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
      }.bind(this));
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
