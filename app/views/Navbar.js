var React = require('react');

var Navbar = React.createClass({
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
                <li className={this.props.homeNav || ""}><a href="#">Home</a></li>
                <li className={this.props.pollNav || ""}><a href="#polls">Polls</a></li>
                <li className={this.props.signNav || ""}><a href="#signin">Sign In</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = Navbar;
