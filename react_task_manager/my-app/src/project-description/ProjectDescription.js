import React from 'react';

function getCurrentProject(projectTitle){
  let currentProject = window.localStorage.getItem(projectTitle)
  currentProject = JSON.parse(currentProject)
  return currentProject
}

class ProjectDescription extends React.Component{
    render(){
      return (
        <div className="project-description">   
          {this.props.description}
        </div>
      )
    }
  }

  class ProjectTitle extends React.Component {
    render(){
      return (
        <div className="project-title">   
          <h1>{this.props.title}</h1>
          <hr></hr>
        </div>
      )
    }
  }

  class ProjectDetail extends React.Component {
    constructor(props){
      super(props)
      this.state = null
    }
  
    render(){
      console.log(getCurrentProject(this.props.selectedProject).title)
      return (
        <div className="projectDetailFrame">   
          <ProjectTitle
            title = {getCurrentProject(this.props.selectedProject).title} />
          <ProjectDescription 
            description = {getCurrentProject(this.props.selectedProject).description} />
        </div>
      );
    }
  }


export {ProjectDetail}