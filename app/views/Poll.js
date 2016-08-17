var React = require('react');
var Navbar = require('./Navbar.js');
var Chart = require('chart.js');
var hashHistory = require('react-router').hashHistory;
var url = require('../config/urls').ServerURL;
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
    var getURL = url + '/onepoll/' + this.props.params
    $.ajax({
      url: getURL,
      cache: false,
      type: 'GET',
      success: function(res){
      this.setState({
        pollData: res,
        selection: ""
      })}.bind(this)
    })
  },
  render: function() {
    if (this.state.pollData.Poll) {
      return (
        <div>
          <div className="jumbotron">
            <div className="container">
              <div className="col-sm-6" style={optionsStyle}>
                <h2 style={titleStyle}>{this.state.pollData.Poll.title}</h2>
                <RenderOptions poll={this.state.pollData} userLoggedIn={this.props.userLoggedIn} pollId={this.props.params} loggedIn={this.props.loggedIn}/>
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
  getInitialState: function(){
    return {
      customOption: false
    }
  },
  handleSubmit: function() {
    if (this.state.customOption === false) {
      var optionSelected = $('#allOptions').find(":selected").text();
      var votedFor = {
        id: this.props.pollId,
        vote: optionSelected
      }
      $.post( url + '/addvote/' + this.props.poll.Poll._id, votedFor, function(){
        location.reload();
      });
    }
    else if (this.state.customOption === true) {
      var optionSelected = $('#customOption').val();
      if (optionSelected.length !== 0) {
        var voteAdded = {
          id: this.props.pollId,
          newOption: optionSelected
        }

        $.post( url + '/addoption/' + this.props.poll.Poll._id, voteAdded, function(){
          location.reload();
        });
      }
    }
  },
  change: function(e){
    var optionSelected = $('#allOptions option:last-child').val();
    if (optionSelected === "I'd like a custom option...") {
      this.setState({
        customOption: true
      })
    }
    else {
      this.setState({
        customOption: false
      })
    }
  },
  handleDelete: function() {
    var that = this;
    $.ajax({
      url: url + '/delete/',
      cache: false,
      data: that.props.poll.Poll,
      type: 'DELETE',
      success: function(res) {
        hashHistory.push('/polls');
      }
    });
  },
  handleShare: function(){
    var uri = this.props.poll.Poll.title + " | " + url + "/#/poll/" + this.props.poll.Poll._id.toString();
    return "https://twitter.com/intent/tweet/?text=" + encodeURIComponent(uri);
  },
  render: function() {
    if (this.props.poll.Poll !== undefined && this.props.loggedIn === true) {
      return (
        <div>
          {this.props.title}
          <p>I would like to vote...</p>
          <select className="form-control" id="allOptions" style={selectStyle} onChange={this.change}>
            {this.props.poll.Poll.options.map(function(obj){
              return <option>{obj.optionName}</option>
            })}
            <CusOption loggedIn={true}/>
          </select>
          <CustomOption selected={this.state.customOption} loggedIn={true} />
          <div style={divBtnStyle}>
            <button className="btn btn-success" type="submit" onClick={this.handleSubmit} style={btnStyle}>Submit</button>
          </div>
          <div style={divBtnStyle}>
            <a className="btn btn-info" target="_blank" style={btnStyle} href={this.handleShare()}>Share On Twitter</a>
          </div>
          <DeleteBtn userLoggedIn={this.props.userLoggedIn} pollUsername={this.props.poll.Poll.username} handleDelete={this.handleDelete}/>
        </div>
      )
    }
    else if (this.props.poll.Poll !== undefined && this.props.loggedIn === false) {
      return (
        <div>
          {this.props.title}
          <p>I would like to vote...</p>
          <select className="form-control" id="allOptions" style={selectStyle} onChange={this.change}>
            {this.props.poll.Poll.options.map(function(obj){
              return <option>{obj.optionName}</option>
            })}
          </select>
          <div style={divBtnStyle}>
            <button className="btn btn-success" type="submit" onClick={this.handleSubmit} style={btnStyle}>Submit</button>
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

var CusOption = React.createClass({
  render: function() {
    if (this.props.loggedIn === true)
    return (
      <option>I{"\'"}d like a custom option...</option>
    )
    else {
      return (
        <option></option>
      )
    }
  }
})

var CustomOption = React.createClass({
  render: function() {
    if (this.props.selected === true && this.props.loggedIn === true) {
      return (
        <div>
          <input type="text" placeholder="Custom Option..." id="customOption"/>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
})

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
