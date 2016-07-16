var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

var Home = require('./views/home.js')
// TODO: use routes to render pages
var Site = React.createClass({
  getInitialState: function(){
    return {
      polls: [1, 2, 3, 4, 5]
    }
  },
  render: function(){
    return (
      <Home polls={this.state.polls}/>
    )
  }
})

ReactDOM.render(
  <Site />,
  document.getElementById('app')
)
