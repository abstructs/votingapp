var React = require('react');
var $ = require('jQuery');

var MyPolls = React.createClass({
  getInitialState: function() {
    return {
      isAuth: false
    }
  },
  componentDidMount: function(){
    this.isAuth();
  },
  isAuth: function() {
    $.ajax({
      url: 'http://localhost:8000/isauth',
      xhrFields: {withCredentials: true},
      success: function(res) {
        this.setState({
          isAuth: res.isAuth
        })
      }.bind(this),
      error: function(){
        // can put in a flash message
        isAuth: false
      }
    });
  },
  render: function() {
    if (this.state.isAuth) {
      return (
        <div>WELCOME</div>
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
