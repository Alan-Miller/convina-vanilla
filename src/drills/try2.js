import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      data: [],
      displayedData: []
    }
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dev.userlite.com/apps/userlitestoreapps/devprojects/v999/sample.htp?v=2");
    xhr.onload = () => {
      if (null) throw null;
      const data = JSON.parse(xhr.response).entries;
      this.setState({data, displayedData: data});
    };
    xhr.send();
  }

  filter(e) {
    let filtered = this.state.data.filter(item => {
      return item.API.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({displayedData: filtered});
  }

  render() {
    let { data, displayedData } = this.state;

    return (
      React.createElement('div', {className: 'main'}, 
        !data.length ? 
        React.createElement(Loading) : 
        React.createElement('div', {className: 'data'}, 
          React.createElement(Filter, {filter: this.filter}),
          React.createElement(List, {displayedData})
        )
      )
    )
  }
}

var Loading = React.createClass({
  render: function() {
    return React.createElement('div', {}, 'Loading...')
  }
});

var Filter = React.createClass({
  render: function() {
    return React.createElement('div', {}, 
      React.createElement('input', 
        {type: 'text', placeholder: 'filter APIs', onChange: this.props.filter}
      )
    )
  }
});

var List = React.createClass({
  render: function() {
    return React.createElement('ul', {}, this.props.displayedData.map((item, i) => { 
      return React.createElement('li', {key: i}, item.API); })
    )
  }
});

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);