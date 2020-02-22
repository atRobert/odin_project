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
      isHover:false
    }

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
          {this.props.taskDescription}
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
                {this.props.taskTitle}
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
    this.state = {adding_task:false,
                  tasks: getCurrentProject(this.props.title).tasks
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
      id: randomID()
    };

    const taskList = [...getCurrentProject(this.props.title).tasks]
    taskList.push(objMap)
    const projectDetails = getCurrentProject(this.props.title)
    projectDetails.tasks = taskList
    this.setState({tasks:taskList})
    this.props.addTaskToProjectHandler(this.props.title, projectDetails)
    this.taskFormHandler()
    event.preventDefault();
  };

  taskFormHandler() {
    const showForm = this.state.adding_task;
    this.setState({ adding_task: !showForm });
  }

  render(){
    console.log("tasks::")
    console.log(this.state.tasks)
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
    
    let projectTasks
    if (this.props.tasks){
      projectTasks = this.state.tasks.map((task,index) =>(
        <ProjectTask 
          taskTitle = {task.title}
          taskDescription = {task.description}
          key = {task.id}
        />
      ))
    }


    console.log(this.state.tasks)
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
  }
  render() {
    return (
      <div>
        <h2 className="project-description">{this.props.description}</h2>
        <ProjectTaskList
          selectedProjectDetail={this.props.selectedProjectDetail} 
          tasks = {this.props.tasks}
          addTaskToProjectHandler = {this.props.addTaskToProjectHandler}
          title = {this.props.title}
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
    this.state = null
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
          tasks={ getCurrentProject(this.props.selectedProject).tasks }
          addTaskToProjectHandler = {this.props.addTaskToProjectHandler}
          title={getCurrentProject(this.props.selectedProject).title}
        />
      </div>
    );
  }
}

export { ProjectDetail };
