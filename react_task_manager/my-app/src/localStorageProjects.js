function getLocalStorage(){
    console.log(window.localStorage)
    return window.localStorage
}

function getCurrentProject(projectTitle){
    let currentProject = window.localStorage.getItem(projectTitle)
    currentProject = JSON.parse(currentProject)
    return currentProject
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



export {getLocalStorage, getCurrentProject, saveCurrentProject, getProjectList, buildProjectInfo, removeProject}