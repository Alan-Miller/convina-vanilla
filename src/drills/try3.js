import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      data: [], 
      displayed: [{API: 'one'}, {API: 'two'}]
    }
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dev.userlite.com/apps/userlitestoreapps/devprojects/v999/sample.htp?v=2');
    xhr.onload = () => {
      if (null) throw null;
      const data = JSON.parse(xhr.response).entries;
      this.setState({data, displayed: data});
    }
    xhr.send();
  }

  filter(e) {
    let filtered = this.state.data.filter(item => (
      item.API.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
    )
    this.setState({displayed: filtered})
  }

  render() {
    let { data, displayed } = this.state;

    return (
      React.createElement('div', {className: 'main'},
        data.length ? 

        React.createElement('div', {className: 'data'}, 
          React.createElement(Filter, {filter: this.filter}),
          React.createElement(List, {displayed})
        )
        : React.createElement('div', {className: 'loading'}, 'Loading...')
      )
    )
  }
}

var List = React.createClass({
  render: function() {
    return React.createElement('ul', {}, 
      this.props.displayed.map((item, i) => React.createElement('li', {key: i}, item.API))
    )
  }
});

var Filter = React.createClass({
  render() {
    return React.createElement('input', {type: 'text', placeholder: 'Filter data', onChange: this.props.filter});
  }
});

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);