function removeTitle(e){
    let title = e.parentNode.childNodes[1].textContent
    window.localStorage.removeItem(title)
    e.parentNode.parentNode.removeChild(e.parentNode)
    
}

function removeTask(e){
    let title = e.parentNode.childNodes[1].textContent
    let currentProject = getCurrentProject()
    delete currentProject.tasks[title]
    window.localStorage.setItem(currentProject.title, JSON.stringify(currentProject))
    e.parentNode.parentNode.removeChild(e.parentNode)
}


function makeRemovableTitltesAndTasks(){
    let xIcon = document.getElementsByClassName('fa-times-circle')
    for (let i = 0; i < xIcon.length; i++){
        xIcon[i].addEventListener('click',function(e){
            let title = this.parentNode.childNodes[1].textContent
            this.parentNode.classList[0] == 'title-tab' ? removeTitle(title) : {}
            this.parentNode.classList[0] == 'task' ? removeTask(title): {}
        })
    }
}

function getCurrentProject(){
    let currentProject = document.getElementsByClassName('active')[0]
    currentProject = currentProject.childNodes[1].textContent
    return JSON.parse(window.localStorage.getItem(currentProject))
}

export {removeTitle, removeTask, makeRemovableTitltesAndTasks, getCurrentProject}