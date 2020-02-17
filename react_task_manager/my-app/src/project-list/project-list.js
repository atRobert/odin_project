import React from 'react'


function removeProject(project){
    window.localStorage.removeItem(project)
}

class ProjectList extends React.Component {
    constructor(props){
      super(props);
      this.state = ({
            data: null})
    }
    
    deleteProjectHandler = (index, projectID) =>{
      removeProject(projectID)
      const projects = [...this.props.data]
      projects.splice(index, 1)
      this.setState({data:projects});
    }
  
    render() { 
      return (
        <div className="projectListFrame">
          <CreateProject 
            click = {this.props.addProjectHandler}
            />
          {this.props.data.map((project, index) => (
            <ProjectListItem 
              project = {project.title}
              description = {project.description}
              complete = {project.complete}
              tasks = {project.tasks}
              key = {project.id}
              selectedProject = {this.props.selectedProject}
              click = {() => this.deleteProjectHandler(index, project.title)}
              updateSelectedProject = {this.props.updateSelectedProjectHandler}
              />
          ))}
        </div>
      );
    }
  }
  
  
  
  class ProjectListItem extends React.Component {
    constructor(props){
      super(props)
      this.state = null
    }
  
    render(){
      return (
        <div
        className={this.props.selectedProject === this.props.project ? 'project-item active-project': 'project-item'} 
        onClick = {() => this.props.updateSelectedProject(this.props.project)}>{this.props.project}</div>
      )
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

  export {ProjectList}