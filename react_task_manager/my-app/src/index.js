import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  buildProjectInfo,
} from "./localStorageProjects.js";

import "./project-description/project-description.css";
import { ProjectDetail } from "./project-description/ProjectDescription.js";

import { ProjectList } from "./project-list/project-list.js";
import "./project-list/project-list.css";

var randomID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};



class WindowFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: buildProjectInfo(),
      selectedProject: "robert",
      selectedProjectInfo: null
    };

    this.updateSelectedProjectHandler = this.updateSelectedProjectHandler.bind(
      this
    );
  }

  updateSelectedProjectHandler(projectID) {
    this.setState({ selectedProject: projectID });
  }

  addProjectHandler = (projectTitle, projectDescription) => {
    const objMap = {
      title: projectTitle,
      description: projectDescription,
      id: randomID()
    };
    const projects = [...this.state.data];
    projects.push(objMap);
    window.localStorage.setItem(projectTitle, JSON.stringify(objMap));
    this.setState({ data: projects });
  };

  addTaskToProjectHandler = (projectTitle, projectDetails) => {
    const projects = [...this.state.data];
    var index = projects.findIndex(project => project.title == projectTitle)
    projects[index] = projectDetails
    window.localStorage.setItem(projectTitle, JSON.stringify(projectDetails))
  }


  render() {
    return (
      <div className="windowFrame">
        <ProjectList
          data={this.state.data}
          selectedProject={this.state.selectedProject}
          updateSelectedProjectHandler={this.updateSelectedProjectHandler}
          addProjectHandler={this.addProjectHandler}
        />
        <ProjectDetail 
          selectedProject={this.state.selectedProject}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="headerFrame">
          <h1>To Do Projects</h1>
        </div>
        <WindowFrame />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));




