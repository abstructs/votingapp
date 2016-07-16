var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

var Home = require('./views/home.js')
// TODO: use routes to render pages
var Site = React.createClass({
  render: function(){
    return (
      <Home />
    )
  }
})

ReactDOM.render(
  <Site />,
  document.getElementById('app')
)
