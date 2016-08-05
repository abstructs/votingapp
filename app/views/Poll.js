var React = require('react');
var Navbar = require('./Navbar.js');
var Chart = require('chart.js');
var hashHistory = require('react-router').hashHistory;
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
deleteStyle = {
  marginTop: "10px",
  height: "35px",
  width: "200px"
},
divBtnStyle = {
  width: "100%"
}

var Poll = React.createClass({
  getInitialState: function(){
    return {
      pollData: {title: "", options: []}
    }
  },
  componentDidMount: function() {
    $.get('http://localhost:8000/onepoll/' + this.props.params, function(res){
      this.setState({
        pollData: res,
        selection: ""
      })
    }.bind(this))
  },
  render: function() {
    if (this.state.pollData.Poll) {
      return (
        <div>
          <div className="jumbotron">
            <div className="container">
              <div className="col-sm-6" style={optionsStyle}>
                <h2 style={titleStyle}>{this.state.pollData.Poll.title}</h2>
                <RenderOptions poll={this.state.pollData} userLoggedIn={this.props.userLoggedIn}/>
              </div>
              <div className="col-lg-3">
                <RenderResults poll={this.state.pollData} />
              </div>
            </div>
          </div>
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

var RenderOptions = React.createClass({
  handleSubmit: function() {
    var optionSelected = $('#allOptions').find(":selected").text();
    if (typeof(optionSelected) === "string") {
      var votedFor = {
        vote: optionSelected
      }
      $.post('http://localhost:8000/addvote/' + this.props.poll.Poll.title, votedFor, function(res){
        location.reload();
      });
    }
  },
  handleDelete: function() {
    var that = this;
    $.ajax({
      url: 'http://localhost:8000/delete/',
      data: that.props.poll.Poll,
      type: 'DELETE',
      success: function(res) {
        hashHistory.push('/polls');
      }
    });
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
          <div style={divBtnStyle}>
            <button className="btn btn-success" type="submit" onClick={this.handleSubmit} style={btnStyle}>Submit</button>
          </div>
          <DeleteBtn userLoggedIn={this.props.userLoggedIn} pollUsername={this.props.poll.Poll.username} handleDelete={this.handleDelete}/>
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

var DeleteBtn = React.createClass({
  render: function(){
    if (this.props.pollUsername === this.props.userLoggedIn) {
      return (
        <div style={divBtnStyle}>
          <button className="btn btn-danger" type="submit" onClick={this.props.handleDelete} style={btnStyle}>Delete This Poll...</button>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
})

var RenderResults = React.createClass({
  componentDidMount: function() {
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
            <canvas id="myChart" height="300px"></canvas>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>Loading chart...</div>
      )
    }
  }
});

module.exports = Poll;
