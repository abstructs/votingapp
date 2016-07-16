var React = require('react');
var ReactDOM = require('react-dom');
require('../style.css')
var divStyle = {
    padding: "40px 15px",
    textAlign: "center"
},
textStyle = {
  textAlign: "center"
}

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Voting App</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home</a></li>
                <li><a href="#about">Polls</a></li>
                <li><a href="#contact">Sign In</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">

          <div style={divStyle}>
            <h1>Free Code Camp Voting</h1>
            <p className="lead"> Below are polls! {"\n"} Select a poll to see the results and vote, or sign-in to make a new poll.</p>
          </div>
          {/* TODO: Add polls */}
          {this.props.polls.map(function(poll){
            return <Poll poll={poll}/>
          })}
        </div>
      </div>
    )
  }
});

// var Poll = React.createClass({
//   render: function(){
//     return (
//       <div>
//
//       </div>
//     )
//   };
// });

module.exports = Home;
