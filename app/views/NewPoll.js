var React = require('react');

var divStyle = {
    padding: "40px 15px",
    textAlign: "center"
},
textStyle = {
  textAlign: "center"
},
btnStyle = {
  marginTop: "25px"
};

var NewPoll = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      options: ""
    }
  },
  handleChange: function() {
    console.log(this.target.e)
  },
  render: function() {
    return (
      <div>
        <div>
          <div className="container">
            <div>
              <h1 style={divStyle}>Create a New Poll</h1>
              <form>
                <fieldset className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" placeholder="Enter title"/>
              </fieldset>
              <fieldset className="form-group">
                <label>Options</label>
                <textarea className="form-control" rows="3" placeholder="Options seperated by commas"></textarea>
              </fieldset>
              <button className="btn btn-info" style={btnStyle} type="submit">Create!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = NewPoll;
