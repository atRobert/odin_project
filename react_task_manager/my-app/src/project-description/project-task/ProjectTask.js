import React from "react";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

function getCurrentProject(projectTitle) {
    let currentProject = window.localStorage.getItem(projectTitle);
    currentProject = JSON.parse(currentProject);
    return currentProject;
  }

class ProjectTask extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isHover: false,
        isHoveringComplete: false
      };
  
      this.mouseHoverTaskContainerHandler = this.mouseHoverTaskContainerHandler.bind(
        this
      );
      this.mouseHoverTaskCheckHandler = this.mouseHoverTaskCheckHandler.bind(
        this
      );
      this.removeTaskFromProject = this.removeTaskFromProject.bind(this);
      this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
    }
  
    mouseHoverTaskContainerHandler() {
      const hovering = this.state.isHover;
      this.setState({ isHover: !hovering });
    }

    mouseHoverTaskCheckHandler() {
      const hovering = this.state.isHoveringComplete;
      this.setState({ isHoveringComplete: !hovering });
    }
  
    toggleTaskComplete() {
      const projectDetails = getCurrentProject(this.props.projectTitle);
      const currentProjectTasks = projectDetails.tasks;
      const index = currentProjectTasks.findIndex(
        task => task.title === this.props.taskTitle
      );
      const currentProjectTaskComplete = currentProjectTasks[index].complete;
      currentProjectTasks[index].complete = !currentProjectTaskComplete;
      projectDetails.tasks = currentProjectTasks;
      this.props.addTaskToProjectHandler(this.props.title, projectDetails);
      this.sendUpdatedTaskList(projectDetails);
    }
  
    removeTaskFromProject() {
      const projectDetails = getCurrentProject(this.props.projectTitle);
      const currentProjectTasks = projectDetails.tasks;
      const index = currentProjectTasks.findIndex(
        task => task.title === this.props.taskTitle
      );
      currentProjectTasks.splice(index, 1);
      projectDetails.tasks = currentProjectTasks;
      this.sendUpdatedTaskList(projectDetails);
    }
  
    sendUpdatedTaskList(projectDetails) {
      this.props.addTaskToProjectHandler(this.props.title, projectDetails);
      this.props.updateSelectedTasksHandler(this.props.projectTitle);
    }
  
    render() {
      let hoveringTask;
      if (this.state.isHover) {
        hoveringTask = (
          <div className="task-detail">{this.props.taskDescription}</div>
        );
      }
  
      let taskComplete;
      if (this.props.taskComplete) {
        taskComplete = (
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        );
      }
  
      return (
        <div
          className="task-container"
          onMouseEnter={this.mouseHoverTaskContainerHandler}
          onMouseLeave={this.mouseHoverTaskContainerHandler}
        >
          <div>
            <div className="task-quick">
              <div
                className={
                  this.props.taskComplete
                    ? "task-check-container complete-task"
                    : "task-check-container"
                }
                onClick={this.toggleTaskComplete}
                onMouseEnter={this.mouseHoverTaskCheckHandler}
                onMouseLeave={this.mouseHoverTaskCheckHandler}
              >
                {taskComplete}
              </div>
              <div className="task-title-container">(Priority: {this.props.taskPriority}) {this.props.taskTitle}</div>
              <div
                className="task-remove-container"
                onClick={this.removeTaskFromProject}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          </div>
          {hoveringTask}
        </div>
      );
    }
  }

  export {ProjectTask}