import React from "react";

function getCurrentProject(projectTitle) {
  let currentProject = window.localStorage.getItem(projectTitle);
  currentProject = JSON.parse(currentProject);
  return currentProject;
}

class ProjectTask extends React.Component {
  constructor(props){
    super(props)
    this.state = {isHover:false}

    this.mouseEnterHandler = this.mouseEnterHandler.bind(this)
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this)
  }

  mouseEnterHandler(){
    this.setState({isHover:true})
  }

  mouseLeaveHandler(){
    this.setState({isHover:false})
  }

  render(){

    let hoveringTask 
    if (this.state.isHover){
      hoveringTask = (
        <div className="task-detail">
          this is some description for the task above.
        </div>
      )
    }

    return(
      <div className="task-container"
        onMouseEnter = {this.mouseEnterHandler}
        onMouseLeave = {this.mouseLeaveHandler}
      >
          <div>
            <div className="task-quick">
              <div className='task-check-container'>
              </div>
              <div className="task-title-container">
                This is task description
              </div>
              <div className='task-remove-container'>
                X
              </div>
            </div>
          </div>
          {hoveringTask}
      </div>
    )
  }
}

class ProjectTaskList extends React.Component {
  constructor(props){
    super(props)
    this.state = {isHover:false}
  }

  render(){
    return(
      <div>
        <ProjectTask />
        <ProjectTask />
      </div>
    )
  }
}


class ProjectDescription extends React.Component {
  render() {
    return (
      <div>
        <h2 className="project-description">{this.props.description}</h2>
        <ProjectTaskList />
      </div>
    );
  }
}

class ProjectTitle extends React.Component {
  render() {
    return (
      <div className="project-title">
        <h1>{this.props.title}</h1>
        <hr></hr>
      </div>
    );
  }
}

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    console.log(getCurrentProject(this.props.selectedProject).title);
    return (
      <div className="projectDetailFrame">
        <ProjectTitle
          title={getCurrentProject(this.props.selectedProject).title}
        />
        <ProjectDescription
          description={
            getCurrentProject(this.props.selectedProject).description
          }
        />
      </div>
    );
  }
}

export { ProjectDetail };
