var React = require('react')

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

var SignIn = React.createClass({
  render: function(){
    return (
      <div>
        <h1 style={divStyle}>Sign In</h1>
        <form>
          <fieldset className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" placeholder="Username"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Options</label>
            <input type="password" className="form-control" placeholder="Password"/>
        </fieldset>
        <button className="btn btn-info" style={btnStyle} type="submit">Create!</button>
        </form>
      </div>
    )
  }
});


module.exports = SignIn;
