var React = require('react');
var $ = require('jQuery');

var Profile = React.createClass({
  componentDidMount: function(){
    this.isAuth();
  },
  isAuth: function() {
    $.get('http://localhost:8000/isauth', function(res){
      console.log(res)
    });
  },
  render: function() {
    return (
      <div></div>
    )
  }
})

module.exports = Profile;
