import React from "react";

function getCurrentProject(projectTitle) {
  let currentProject = window.localStorage.getItem(projectTitle);
  currentProject = JSON.parse(currentProject);
  return currentProject;
}

var randomID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class ProjectTask extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isHover:false,
      isHoveringComplete:false
    }

    this.mouseHoverTaskContainerHandler = this.mouseHoverTaskContainerHandler.bind(this)
    this.mouseHoverTaskCheckHandler = this.mouseHoverTaskCheckHandler.bind(this)
    this.removeTaskFromProject = this.removeTaskFromProject.bind(this)
  }

  mouseHoverTaskContainerHandler(){
    const hovering = this.state.isHover
    this.setState({isHover:!hovering})
  }

  mouseHoverTaskCheckHandler(){
    const hovering = this.state.isHoveringComplete
    this.setState({isHoveringComplete: !hovering})
  }

  removeTaskFromProject(){
    const projectDetails = getCurrentProject(this.props.projectTitle)
    const currentProjectTasks = projectDetails.tasks
    const index = currentProjectTasks.findIndex(task => task.title === this.props.taskTitle)
    currentProjectTasks.splice(index,1)
    projectDetails.tasks = currentProjectTasks
    this.props.addTaskToProjectHandler(this.props.title, projectDetails)
    this.props.updateSelectedTasksHandler(this.props.projectTitle)
  }

  render(){
    let hoveringTask 
    if (this.state.isHover){
      hoveringTask = (
        <div className="task-detail">
          {this.props.taskDescription}
        </div>
      )
    }

    let taskComplete 
    if (this.props.taskComplete){
      taskComplete = (
        <div>
          X
        </div>
      )
    }

    return(
      <div className="task-container"
        onMouseEnter = {this.mouseHoverTaskContainerHandler}
        onMouseLeave = {this.mouseHoverTaskContainerHandler}
      >
          <div>
            <div className="task-quick">
              <div className='task-check-container'
                onMouseEnter = {this.mouseHoverTaskCheckHandler}
                onMouseLeave = {this.mouseHoverTaskCheckHandler}
              >{taskComplete}
              </div>
              <div className="task-title-container">
                {this.props.taskTitle}
              </div>
              <div className='task-remove-container'
                onClick = {this.removeTaskFromProject}
              >
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
    this.state = {adding_task:false,
                  current_project: this.props.title,
                  tasks: this.props.selectedTasks
    }
    this.taskFormHandler = this.taskFormHandler.bind(this);
    this.addTaskHandler = this.addTaskHandler.bind(this);
  }


  addTaskHandler = (event) => {
    let taskTitle = document.getElementById("new-task-title").value
    let taskDescription = document.getElementById("new-task-description").value
    let taskPriority = document.getElementById("new-task-priority").value

    const objMap = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      id: randomID(),
      complete: false
    };

    const taskList = [...getCurrentProject(this.props.title).tasks]
    event.preventDefault();
    taskList.push(objMap)
    const projectDetails = getCurrentProject(this.props.title)
    projectDetails.tasks = taskList
    this.setState({tasks:taskList})
    this.props.addTaskToProjectHandler(this.props.title, projectDetails)
    this.props.updateSelectedTasksHandler(this.props.title)
    this.taskFormHandler()
    
  };

  taskFormHandler() {
    const showForm = this.state.adding_task;
    this.setState({ adding_task: !showForm });
  }

  render(){
    let addTask;
    if (this.state.adding_task) {
      addTask = (
        <div>
          <div id="page-mask" onClick={this.taskFormHandler}></div>
          <div id="add-project-form">
            <form>
              <ul>
                <li>
                  <label>Task Title:</label>
                </li>
                <li>
                  <input type="text" id="new-task-title"></input>
                </li>
                <li>
                  <label>Task Note:</label>
                </li>
                <li>
                  <textarea rows={8} id="new-task-description"></textarea>
                </li>
                <li>
                  <label>Task Priority:</label>
                </li>
                <li>
                  <select id="new-task-priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </li>
                <li id="submit-btn-container">
                  <input
                    type="submit"
                    value="Create"
                    onClick={this.addTaskHandler}
                  ></input>
                  <input
                    type="submit"
                    value="Cancel"
                    onClick={this.taskFormHandler}
                  ></input>
                </li>
              </ul>
            </form>
          </div>
        </div>
      );
    }
    console.log("task list:")
    console.log(this.state.tasks)
    let projectTasks
    if (this.props.selectedTasks){
      projectTasks = this.props.selectedTasks.map((task,index) =>(
        <ProjectTask 
          updateSelectedTasksHandler = {this.props.updateSelectedTasksHandler}
          projectTitle = {this.props.title}
          taskTitle = {task.title}
          taskDescription = {task.description}
          taskComplete = {task.complete}
          addTaskToProjectHandler = {this.props.addTaskToProjectHandler}
          key = {task.id}
        />
      ))
    }

    return(
      <div id='task-list-container'>
        <h3>Tasks </h3>
        <div className="add-task" onClick={this.taskFormHandler}>
          Add Task
        </div>
        {projectTasks}
        {addTask}
      </div>
    )
  }
}


class ProjectDescription extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current_project:this.props.title
    }
  }
  render() {
    return (
      <div>
        <h2 className="project-description">{this.props.description}</h2>
        <ProjectTaskList
          selectedProjectDetail={this.props.selectedProjectDetail} 
          addTaskToProjectHandler = {this.props.addTaskToProjectHandler}
          title = {this.props.title}
          selectedTasks={this.props.selectedTasks}
          updateSelectedTasksHandler={this.props.updateSelectedTasksHandler}
        />
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
    this.state = {
      current_project: getCurrentProject(this.props.selectedProject).title
    }
  }

  render() {
    console.log("ProjectDetailTitle")
    console.log(this.props.selectedTasks)
    return (
      <div className="projectDetailFrame">
        <ProjectTitle
          title={getCurrentProject(this.props.selectedProject).title}
        />
        <ProjectDescription
          description={
            getCurrentProject(this.props.selectedProject).description
          }
          addTaskToProjectHandler = {this.props.addTaskToProjectHandler}
          title={getCurrentProject(this.props.selectedProject).title}
          selectedTasks={this.props.selectedTasks}
          updateSelectedTasksHandler={this.props.updateSelectedTasksHandler}
        />
      </div>
    );
  }
}

export { ProjectDetail };
