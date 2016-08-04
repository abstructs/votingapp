var React = require('react');

var textStyle = {
  textAlign: "center"
},
btnStyle = {
  marginTop: "25px"
},
divStyle = {
    padding: "40px 15px",
    textAlign: "center"
};

var LogIn = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1 style={divStyle}>Log In</h1>
        <form action="http://localhost:8000/login" method="post">
          <fieldset className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
            <input type="password" className="form-control" name="password"/>
        </fieldset>
        <p>Don{'\''}t have an account yet? <a href="/#/signup">Sign Up</a></p>
        <button className="btn btn-info" style={btnStyle} type="submit">Log In!</button>
        </form>
      </div>
    )
  }
});

module.exports = LogIn;
