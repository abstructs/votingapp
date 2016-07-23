var React = require('react'),
    $ = require('jquery'),
    hashHistory = require('react-router').hashHistory;


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
  handleTitleChange: function(e) {
    this.setState({
      title: e.target.value
    });
  },
  handleOptionsChange: function(e) {
    this.setState({
      options: e.target.value
    });
  },
  handleSubmit: function() {
    var allOptions = [];
    var count = 0;
    this.state.options.split("\n").map(function(option){
      var newObj = { optionName: option, value: 0 };
      allOptions.push(newObj);
    });

    var data = {
      title: this.state.title,
      options: allOptions
    }
    console.log(data)
    if (data.title && data.options.length > 1) {
      $.post('http://localhost:8000/addpoll', data, function(res) { console.log(res) });
      hashHistory.push('/polls');
    }
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
                <input type="text" className="form-control" placeholder="Enter title" onChange={this.handleTitleChange} value={this.state.title}/>
              </fieldset>
              <fieldset className="form-group">
                <label>Options</label>
                <textarea className="form-control" rows="3" placeholder="Options seperated by line breaks" onChange={this.handleOptionsChange}></textarea>
              </fieldset>
              <button className="btn btn-info" style={btnStyle} type="submit" onClick={this.handleSubmit}>Create!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = NewPoll;
