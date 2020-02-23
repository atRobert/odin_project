import React from "react";
import { getCurrentProject } from "../localStorageProjects";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function removeProject(project) {
  window.localStorage.removeItem(project);
}

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  deleteProjectHandler = (index, projectID) => {
    removeProject(projectID);
    const projects = [...this.props.data];
    projects.splice(index, 1);
    this.setState({ data: projects });
  };

  render() {
    return (
      <div className="projectListFrame">
        <CreateProject addNewProject={this.props.addProjectHandler} />
        {this.props.data.map((project, index) => (
          <ProjectListItem
            project={project.title}
            description={project.description}
            complete={project.complete}
            tasks={project.tasks}
            key={project.id}
            removeProjectHandler={this.props.removeProjectHandler}
            selectedProject={this.props.selectedProject}
            updateSelectedProject={this.props.updateSelectedProjectHandler}
            updateSelectedTasksHandler={this.props.updateSelectedTasksHandler}
          />
        ))}
      </div>
    );
  }
}

class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    let projectStatus = "project-item";
    if (this.props.selectedProject === this.props.project) {
      projectStatus += " active-project";
    } else if (getCurrentProject(this.props.project).complete) {
      projectStatus += " project-tab-complete";
    }

    return (
      <div>
        <div className={projectStatus}>
          <div
            className="remove-project-button"
            onClick={() => this.props.removeProjectHandler(this.props.project)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div
            className="project-item-text"
            onClick={() => {
              this.props.updateSelectedProject(this.props.project);
              this.props.updateSelectedTasksHandler(this.props.project);
            }}
          >
            {this.props.project}
          </div>
        </div>
      </div>
    );
  }
}

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { adding_project: false };
    this.projectFormHandler = this.projectFormHandler.bind(this);
    this.projectAddHandler = this.projectAddHandler.bind(this);
  }

  projectFormHandler() {
    const showForm = this.state.adding_project;
    this.setState({ adding_project: !showForm });
  }

  projectAddHandler(event) {
    const newProjectTitle = document.getElementById("new-project-title").value;
    const newProjectDescription = document.getElementById(
      "new-project-description"
    ).value;
    this.projectFormHandler();
    this.props.addNewProject(newProjectTitle, newProjectDescription);
    event.preventDefault();
  }

  render() {
    let addProject;
    if (this.state.adding_project) {
      addProject = (
        <div>
          <div id="page-mask" onClick={this.projectFormHandler}></div>
          <div id="add-project-form">
            <form>
              <ul>
                <li>
                  <label>Project Title:</label>
                </li>
                <li>
                  <input type="text" id="new-project-title"></input>
                </li>
                <li>
                  <label>Project Description:</label>
                </li>
                <li>
                  <textarea rows={8} id="new-project-description"></textarea>
                </li>
                <li id="submit-btn-container">
                  <input
                    type="submit"
                    value="Create"
                    onClick={this.projectAddHandler}
                  ></input>
                  <input
                    type="submit"
                    value="Cancel"
                    onClick={this.projectFormHandler}
                  ></input>
                </li>
              </ul>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* <div className='add-project' onClick = {this.props.click}>Add Project</div> */}
        <div className="add-project" onClick={this.projectFormHandler}>
          Add Project
        </div>
        {addProject}
      </div>
    );
  }
}

export { ProjectList };