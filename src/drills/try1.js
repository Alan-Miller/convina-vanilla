import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App_start extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.makeReq("GET", "https://dev.userlite.com/apps/userlitestoreapps/devprojects/v999/sample.htp?v=2", 
      (err, response) => {
        if (err) {throw err;}
        const data = JSON.parse(response).entries;
        this.setState({data})
      }
    );
  }

  makeReq(method, url, done) {
    var req = new XMLHttpRequest();
    req.open(method, url);
    req.onload = function() { done(null, req.response); }
    req.send();
  }

  filter(e) {
    let filtered = this.state.data.filter(item => {
      return item.API.indexOf(e.target.value) !== -1;
    });

    this.setState({data: filtered});
  }

  render() {
    let data = this.state.data;

    return (
      React.createElement('div', {}, 
        React.createElement(Api_filter, {filter: this.filter}),
        React.createElement( 'div', {}, 
          !data.length 
          ? 
          React.createElement(App_loading) 
          : 
          React.createElement(Api_list, {data: this.state.data}) 
        )
      )
    )
  }

}

var Api_filter = React.createClass({
  render: function() {
    return React.createElement('input', { placeholder: 'filter', type: 'text', onChange: this.props.filter}); 
    
  }
})

var App_loading = React.createClass({
  render: function() {
    return React.createElement('div', {}, 'Loading...');
  }
})

var Api_list = React.createClass({
  render: function() {
    return React.createElement('ul', {}, this.props.data.map((item, i) => {
      return React.createElement('li', {key: i}, item.API)
    }))
  }
})

ReactDOM.render(
  React.createElement(App_start),
  document.getElementById('root')
);




// var req = new XMLHttpRequest();

// req.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//       // res = JSON.parse(req.responseText).entries;
//       res = [...data, 'doe'];
//       // console.log(res);
//     }
// };