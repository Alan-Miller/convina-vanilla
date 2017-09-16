import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [{API: 'one'}, {API: 'two'}, {API: 'three'}],
      filtered: [{API: 'one'}, {API: 'two'}, {API: 'three'}]
    }
    this.filter = this.filter.bind(this)
  }

  componentWillMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dev.userlite.com/apps/userlitestoreapps/devprojects/v999/sample.htp?v=2');
    xhr.onload = () => {
      const data = JSON.parse(xhr.response).entries;
      this.setState({ data, filtered: data })
    };
    xhr.send();
  }

  filter(e) {
    let filtered = this.state.data.filter((item, i) => (
      item.API.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    ));
    this.setState({filtered});
  }

  render() {
    const { data, filtered } = this.state;

    return (
      React.createElement('div', {className: 'main'}, 
        React.createElement('div', {className: 'data'}, 
          data.length 
          ? 
          React.createElement('div', {}, 
            React.createElement(FilterInput, {filter: this.filter}), 
            React.createElement(DataList, {className: 'data', filtered})
          )
          : 
          React.createElement('h2', {}, 'Loading...')
        )
      )
    )
  }
}

const FilterInput = React.createClass({
  render() {
    return React.createElement('input', {type: 'text', onChange: this.props.filter});
  }
});

const DataList = React.createClass({
  render: function() {
    return React.createElement('ul', {},
      this.props.filtered.map((item, i) => React.createElement('li', {key: i}, item.API))
    );
  }
})

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root')
);