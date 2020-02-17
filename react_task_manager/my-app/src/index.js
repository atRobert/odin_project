
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {getProjectList, buildProjectInfo, removeProject} from './localStorageProjects.js'

getProjectList()

class ProjectList extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
          data: buildProjectInfo(),
          selectedProject: "michael"})
  }
  
  deleteProjectHandler = (index, projectID) =>{
    removeProject(projectID)
    console.log(projectID)
    const projects = [...this.state.data]
    projects.splice(index, 1)
    this.setState({data:projects});
  }

  addProjectHandler = () => {
    console.log('adding joe')
    window.localStorage.setItem('joe','{"title":"joe","id":"j"}')
    const projects = [...this.state.data]
    projects.push({"title":"joe","id":"j"})
    this.setState({data:projects})
  }

  updateSlectedProject = (projectID) =>{
    this.setState({selectedProject:projectID})
  }

  render() { 
    return (
      <div className="projectListFrame">
        <CreateProject 
          click = {this.addProjectHandler}
          />
        {this.state.data.map((project, index) => (
          <ProjectListItem 
            project = {project.title}
            description = {project.description}
            complete = {project.complete}
            tasks = {project.tasks}
            key = {project.id}
            selectedProject = {this.state.selectedProject}
            click = {() => this.deleteProjectHandler(index, project.title)}
            selectProject = {() => this.updateSlectedProject(project.title)}
            />
        ))}
        
      </div>
    );
  }
}

class CreateProject extends React.Component{
  constructor(props){
    super(props)
    this.state = null
  }
  render(){
    return(
      <div className='add-project' onClick = {this.props.click}>Add Project</div>
    ) 
  }
}

class ProjectListItem extends React.Component {
  constructor(props){
    super(props)
    this.state = null
  }

  render(){
    console.log(this.props.selectedProject)
    console.log(this.props.project)
    return (
      <div
      className={this.props.selectedProject === this.props.project ? 'project-item active-project': 'project-item'} 
      onClick = {this.props.selectProject}>{this.props.project}</div>
    )
  }
}


class ProjectDetail extends React.Component {
  render(){
    return (
      <div className="projectDetailFrame">   
      g 
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



