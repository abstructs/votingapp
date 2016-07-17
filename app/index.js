var React = require('react');
var ReactDOM = require('react-dom');
require('./style.css');

var Navbar = require('./views/Navbar.js');
var Home = require('./views/Home.js');
var Poll = require('./views/Poll.js')

var Router = require('react-router').Router;
var Route = require('react-router').Route;

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

// module.exports = Site;

ReactDOM.render(
  <Router>
      <Route path="/" component={Site}>
      </Route>
      <Route path="/polls" component={Poll}>
      </Route>
      <Route path="/poll/:id" component={Poll}>
      </Route>
    </Router>,
  document.getElementById('app')
)
