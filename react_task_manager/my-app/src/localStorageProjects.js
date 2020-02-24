import {welcomeJSON} from './welcome.js'


function getCurrentProject(projectTitle) {
let currentProject = window.localStorage.getItem(projectTitle);
currentProject = JSON.parse(currentProject);
return currentProject;
}

function getFirstProject() {
return window.localStorage.key(0);
}

function buildWelcomeProject() {
let projectDetail = JSON.stringify(welcomeJSON)
window.localStorage.setItem("Welcome!", projectDetail);
return getFirstProject();
}

function initiateFirstProject() {
if (window.localStorage.length > 0) {
    return getFirstProject();
}
return buildWelcomeProject();
}

function saveCurrentProject(project) {
let projectTitle = project.title;
let projectDetail = JSON.stringify(project);
window.localStorage.setItem(projectTitle, projectDetail);
}

function getProjectList() {
let localStorageEntries = Object.entries(window.localStorage);
let projectTitles = localStorageEntries.map(entry => entry[0]);
return projectTitles;
}

function buildProjectInfo() {
let projectList = getProjectList();
let projectInfo = [];
for (let i = 0; i < projectList.length; i++) {
    projectInfo.push(getCurrentProject(projectList[i]));
}
return projectInfo;
}

function removeProject(project) {
window.localStorage.removeItem(project);
}

export {
getCurrentProject,
initiateFirstProject,
saveCurrentProject,
buildProjectInfo,
removeProject
};