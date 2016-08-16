var React = require('react');
var $ = require('jQuery');
var PollList = require('../PollList.js');
var divStyle = {
    padding: "40px 15px",
    textAlign: "center"
};
var url = require('../../config/urls').ServerURL;
var MyPolls = React.createClass({
  getInitialState: function() {
    return {
      isAuth: false,
      userEmail: "",
      userPollData: []
    }
  },
  componentDidMount: function(){
    this.isAuth();
  },
  isAuth: function() {
    $.ajax({
      url: url + '/isauth',
      xhrFields: {withCredentials: true},
      success: function(res) {
        this.setState({
          isAuth: true,
          userEmail: res.username
        })
        this.getUserPolls();
      }.bind(this),
      error: function(){
        // can put in a flash message
        isAuth: false
      }
    });
  },
  getUserPolls: function(){
    var that = this;
    $.ajax({
      url: url + '/mypolls/',
      xhrFields: {withCredentials: true},
      data: {username: that.state.userEmail},
      type: 'POST',
      success: function(res) {
        that.setState({
          userPollData: res
        })
      }
    });
  },
  render: function() {
    if (this.state.isAuth === true && this.state.userPollData !== undefined) {
      return (
        <div>
          <div className="container">
            <div style={divStyle}>
              <h1>Your Polls</h1>
              <p className="lead">Here{"\'"}s a list of polls that you own!</p>
            </div>
            <div className="list-group">
              <PollList pollData={this.state.userPollData} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>404</div>
      )
    }
  }
})

module.exports = MyPolls;
