import React from "react";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlusCircle,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

import {ProjectTask} from "./project-task/ProjectTask.js"

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



class ProjectTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding_task: false,
      current_project: this.props.title,
      tasks: this.props.selectedTasks
    };
    this.taskFormHandler = this.taskFormHandler.bind(this);
    this.addTaskHandler = this.addTaskHandler.bind(this);
  }

  addTaskHandler = event => {
    let taskTitle = document.getElementById("new-task-title").value;
    let taskDescription = document.getElementById("new-task-description").value;
    let taskPriority = document.getElementById("new-task-priority").value;

    const objMap = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      id: randomID(),
      complete: false
    };

    const taskList = [...getCurrentProject(this.props.title).tasks];
    event.preventDefault();
    taskList.push(objMap);
    const projectDetails = getCurrentProject(this.props.title);
    projectDetails.tasks = taskList;
    this.setState({ tasks: taskList });
    this.props.addTaskToProjectHandler(this.props.title, projectDetails);
    this.props.updateSelectedTasksHandler(this.props.title);
    this.taskFormHandler();
  };

  taskFormHandler() {
    const showForm = this.state.adding_task;
    this.setState({ adding_task: !showForm });
  }

  render() {
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
    console.log("task list:");
    console.log(this.state.tasks);
    let projectTasks;
    if (this.props.selectedTasks) {
      projectTasks = this.props.selectedTasks.map((task, index) => (
        <ProjectTask
          updateSelectedTasksHandler={this.props.updateSelectedTasksHandler}
          projectTitle={this.props.title}
          taskTitle={task.title}
          taskPriority={task.priority}
          taskDescription={task.description}
          taskComplete={task.complete}
          addTaskToProjectHandler={this.props.addTaskToProjectHandler}
          key={task.id}
          taskID = {task.id}
        />
      ));
    }

    return (
      <div id="task-list-container">
        <h3>
          <div className="add-task" onClick={this.taskFormHandler}>
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon className="circleIcon" icon={faCircle} />
              <FontAwesomeIcon className="plusIcon" icon={faPlusCircle} />
            </span>
          </div>{" "}
          Tasks
        </h3>
        {projectTasks}
        {addTask}
      </div>
    );
  }
}

class ProjectDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_project: this.props.title
    };
  }
  render() {
    return (
      <div>
        <h2 className="project-description">{this.props.description}</h2>
        <ProjectTaskList
          selectedProjectDetail={this.props.selectedProjectDetail}
          addTaskToProjectHandler={this.props.addTaskToProjectHandler}
          title={this.props.title}
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
    };
  }

  toggleProjectComplete = () => {
    const project = getCurrentProject(this.props.selectedProject);
    const isProjectComplete = project.complete;
    project.complete = !isProjectComplete;
    this.props.toggleProjectComplete(this.props.selectedProject, project);
  };

  render() {
    console.log("ProjectDetailTitle");
    console.log(this.props.selectedTasks);

    let projectComplete;
    if (getCurrentProject(this.props.selectedProject).complete) {
      projectComplete = (
        <div>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      );
    }

    return (
      <div className="projectDetailFrame">
        <div
          className={
            getCurrentProject(this.props.selectedProject).complete
              ? "project-complete-container complete-project"
              : "project-complete-container"
          }
          onClick={this.toggleProjectComplete}
        >
          {projectComplete}
        </div>
        <ProjectTitle
          title={getCurrentProject(this.props.selectedProject).title}
        />
        <ProjectDescription
          description={
            getCurrentProject(this.props.selectedProject).description
          }
          addTaskToProjectHandler={this.props.addTaskToProjectHandler}
          title={getCurrentProject(this.props.selectedProject).title}
          selectedTasks={this.props.selectedTasks}
          updateSelectedTasksHandler={this.props.updateSelectedTasksHandler}
        />
      </div>
    );
  }
}

export { ProjectDetail };
