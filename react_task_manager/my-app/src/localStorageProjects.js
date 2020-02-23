function getLocalStorage(){
    console.log(window.localStorage)
    return window.localStorage
}

function getCurrentProject(projectTitle){
    let currentProject = window.localStorage.getItem(projectTitle)
    currentProject = JSON.parse(currentProject)
    return currentProject
}

function getFirstProject(){
    return window.localStorage.key(0)
}

function buildWelcomeProject(){
    let  projectDetail = '{"title":"Welcome","id":"SddsfdFds","active":false, "description":"Welcome to my React Task Manager!","tasks":[{"title":"Add a project!","description":"Click the add project button to add a project!","id":"addProjectID"},{"title":"Add Task","description":"To add a task to your project, click add task.","id":"addTaskID"}]}'
    window.localStorage.setItem('Welcome', projectDetail)
    return getFirstProject()
}

function initiateFirstProject(){
    if (window.localStorage.length > 0){
        return getFirstProject()
    }
    return buildWelcomeProject()
}

function saveCurrentProject(project){
    let projectTitle = project.title
    let projectDetail = JSON.stringify(project)
    window.localStorage.setItem(projectTitle, projectDetail)
}

function getProjectList(){
    let localStorageEntries = Object.entries(window.localStorage)
    let projectTitles = localStorageEntries.map(entry => entry[0])
    return projectTitles
}

function buildProjectInfo(){
    let projectList = getProjectList()
    let projectInfo = []
    for (let i = 0; i < projectList.length; i++){
        projectInfo.push(getCurrentProject(projectList[i]))
    }
    return projectInfo
}

function removeProject(project){
    window.localStorage.removeItem(project)
}



export {getLocalStorage, getCurrentProject, initiateFirstProject, saveCurrentProject, getProjectList, buildProjectInfo, removeProject}