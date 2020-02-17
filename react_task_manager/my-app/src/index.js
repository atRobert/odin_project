
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {getProjectList, buildProjectInfo, removeProject, getCurrentProject} from './localStorageProjects.js'

import './project-description/project-description.css';
import {ProjectDetail} from  './project-description/ProjectDescription.js';

import {ProjectList} from './project-list/project-list.js';
import "./project-list/project-list.css";

getProjectList()


class ProjectTasks extends React.Component{
}

class WindowFrame extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
          data: buildProjectInfo(),
          selectedProject: "robert",
          selectedProjectInfo: null})
    
    this.updateSelectedProjectHandler = this.updateSelectedProjectHandler.bind(this)
  }

  updateSelectedProjectHandler(projectID){
    this.setState({selectedProject:projectID})
  }

  addProjectHandler = () => {
    console.log('adding joe')
    window.localStorage.setItem('joe','{"title":"joe","id":"j"}')
    const projects = [...this.state.data]
    projects.push({"title":"joe","id":"j"})
    this.setState({data:projects})
  }

  render(){
    return(
      <div className="windowFrame">
          <ProjectList
            data = {this.state.data}
            selectedProject = {this.state.selectedProject}
            updateSelectedProjectHandler = {this.updateSelectedProjectHandler}
            addProjectHandler = {this.addProjectHandler} />
          <ProjectDetail
            selectedProject = {this.state.selectedProject} />
      </div>
    )
  }
}



class App extends React.Component{
  render(){
    return (
      <div>
        <div className="headerFrame">
          <h1>To Do List!</h1>
        </div>
        <WindowFrame />
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

serviceWorker.unregister();



