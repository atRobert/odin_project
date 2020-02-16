
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class ProjectList extends React.Component {
  render() {
    return (
      <div className="projectListFrame">
        <p>Ooops lolol</p>
      </div>
    );
  }
}

class ProjectDetail extends React.Component {
  render(){
    return (
      <div className="projectDetailFrame">
            <p>Hello world!</p>
          </div>
    );
  }
}

class App extends React.Component{
  render(){
    return (
      <div>
        <div className="headerFrame">
          <h1>To Do List!</h1>
        </div>
        <div className="windowFrame">
          <ProjectList />
          <ProjectDetail />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

serviceWorker.unregister();

