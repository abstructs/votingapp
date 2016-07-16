var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

var Navbar = require('./views/Navbar.js')
var Home = require('./views/Home.js')

// TODO: use routes to render pages
var Site = React.createClass({
  getInitialState: function(){
    return {
      polls: [1, 2, 3, 4, 5]
    }
  },
  render: function(){
    return (
      <div>
        <Navbar homeNav={"active"}/>
        <Home polls={this.state.polls}/>
      </div>
    )
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('app')
)
