import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class HelloWorld extends React.Component {
    render() {
      return (
        <p>Hello World!</p>
      );
    }
  }

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('root')
  );