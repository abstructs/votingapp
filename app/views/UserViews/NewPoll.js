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
      userEmail: "",
      title: "",
      options: ""
    }
  },
  componentDidMount: function(){
    var that = this;
    $.ajax({
      url: 'http://localhost:8000/isauth',
      xhrFields: {withCredentials: true},
      success: function(res) {
        this.setState({
          isAuth: true,
          userEmail: res.username
        })
      }.bind(this),
      error: function(){
        that.setState({
          isAuth: false,
          userEmail: undefined
        })
      }
    });
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
      username: this.state.userEmail,
      title: this.state.title,
      options: allOptions
    }
    if (data.title && data.options.length > 1 && data.username.length) {
      $.post('http://localhost:8000/addpoll', data);
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
