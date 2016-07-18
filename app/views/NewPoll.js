var React = require('react');

var divStyle = {
    padding: "40px 15px",
    textAlign: "center"
},
textStyle = {
  textAlign: "center"
},
btnStyle = {
  marginBottom: "40px",
  float: "right"
};

var NewPoll = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <div className="container">
            <div style={divStyle}>
              <h1>Create a New Poll!</h1>
            </div>
            <button className="btn btn-default">Create!</button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = NewPoll;
