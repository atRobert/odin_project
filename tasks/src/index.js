import {addWelcomeTab, makeExistingBoardFunctional} from './pageStart.js'
import {clearBoard} from './clearBoard.js'



function makeProjectCompletable(element){
    let titleTab = document.getElementsByClassName('title-tab')
    for (let x = 0; x < titleTab.length; x++){
        titleTab[x].classList.remove('active')
    }
    element.classList.add('active')
    console.log(checkTitleExists(element))
    if (checkTitleExists(element)){
        clearBoard()
        generatePage(element)
    }
}

function checkTitleExists(element){
    let titleName = element.childNodes[1].textContent
    if (window.localStorage.getItem(titleName)){
        return true
    }
    return false
}

function makeTitlesCompletable(element){
    let currentTab = element.parentNode.childNodes[1].textContent
    let currentProject = JSON.parse(window.localStorage.getItem(currentTab))
    let taskCheck = element.childNodes[0]
    let taskParent = element.parentNode
    if (taskCheck.classList.length  == 3){
        taskCheck.classList.remove('taskComplete')
        taskParent.childNodes[1].style['color'] = 'black'
        currentProject.complete = false
    } else {
        taskCheck.classList.add('taskComplete')
        taskParent.childNodes[1].style['color'] = 'green'
        currentProject.complete = true
    }
    window.localStorage.setItem(currentProject.title, JSON.stringify(currentProject))
}

function makeTasksHoverable(noteID){
    let notes = document.getElementsByClassName('note') 
    let taskID = document.getElementsByClassName('noteID' + noteID)[0]
    for (let x = 0; x < notes.length; x++){
        notes[x].classList.remove('active-note')
    }
    taskID.classList.add('active-note')
}

function makeTasksCompletable(element){
    let taskCheck = element.childNodes[0]
    let currentProject = getCurrentProject()
    let taskParent = element.parentNode
    let taskName = taskParent.childNodes[1].textContent
    if (taskCheck.classList.length  == 3){
        taskCheck.classList.remove('taskComplete')
        taskParent.childNodes[1].style['color'] = 'black'
        currentProject.tasks[taskName].complete = false
    } else {
        taskCheck.classList.add('taskComplete')
        taskParent.childNodes[1].style['color'] = 'green'
        currentProject.tasks[taskName].complete = true
    }
    window.localStorage.setItem(currentProject.title, JSON.stringify(currentProject))
}





function addTaskButton(){
    let addTask = document.getElementsByClassName('add-task')[0]
    addTask.addEventListener('click', function(e){
        showMask()
        document.getElementById('add-task').style.display = 'block'
    })
}

function addTitleButton(){
    let addTask = document.getElementsByClassName('add-title')[0]
    addTask.addEventListener('click', function(e){
        if (window.localStorage.length < 8){
            showMask()
            document.getElementById('add-title').style.display = 'block'
        } else {
            alert('You have too many active projects already!')
        }
    })
}

function closeFormWindow(){
    let windowCloseButtons = document.getElementsByClassName('fa-window-close')
    let windowCheckButtons = document.getElementsByClassName('fa-check-square')
    let windowMask = document.getElementById('page-mask')  
    for (let i = 0; i < windowCloseButtons.length; i++){
        windowCloseButtons[i].addEventListener('click',function(e){
            hideForm(this)
        })
    }
    for (let i = 0; i < windowCheckButtons.length; i++){
        windowCheckButtons[i].addEventListener('click',function(e){
            let formTitle = this.parentNode.parentNode.childNodes[3].childNodes[1].value
            let formText = this.parentNode.parentNode.childNodes[3].childNodes[3].value
            let formType = this.parentNode.parentNode.getAttribute('id')
            let formPriority
            if (formType == 'add-task'){
                formPriority = this.parentNode.parentNode.childNodes[3].childNodes[7].value || "!"
            }
            determineForm(formTitle,formText,formType, formPriority)
            hideForm(this)
        })
    }
    windowMask.addEventListener('click', function(e){
        hideMask()
        document.getElementById('add-task').style.display = 'none'
        document.getElementById('add-title').style.display = 'none'
        document.getElementById('add-task').childNodes[3].reset()
        document.getElementById('add-title').childNodes[3].reset()
    })
}

function determineForm(formTitle,formText,formType, formPriority){
    if (formType == 'add-task'){
        addTask(formTitle, formText, formType, formPriority)
    } else {
        addTitleTab(formTitle, formText, formType)
    }
}

function addTitleTab(formTitle, formText){
    let newTitleTab = {
        title : formTitle,
        text : formText,
        complete: false,
        tasks : {}
    }
    window.localStorage.setItem(formTitle, JSON.stringify(newTitleTab))
    buildTitleTab(formTitle)
}

function buildTitleTab(formTitle){
    let tabContent = document.getElementById('tab-holder')
    let titleTab = document.createElement('div')
    titleTab.classList.add('title-tab')
    titleTab.addEventListener('click',function(e){
        makeProjectCompletable(this)
    })
    
    let checkboxDiv = document.createElement('div')
    checkboxDiv.classList.add('checkbox-div')
    checkboxDiv.addEventListener('click',function(e){
        makeTitlesCompletable(this)
    })
    checkboxDiv.innerHTML = '<i class="fas fa-check"></i>'

    
    let titleTabSpan = document.createElement('span')
    titleTabSpan.classList.add('title-tab-span')
    titleTabSpan.textContent = formTitle
    let xIcon = document.createElement('i')
    xIcon.classList.add('far')
    xIcon.classList.add('fa-times-circle')
    xIcon.addEventListener('click',function(e){
            removeTitle(this)
            clearBoard()
            buildFirstTab()        
    })
    tabContent.appendChild(titleTab)
    titleTab.appendChild(checkboxDiv)
    titleTab.appendChild(titleTabSpan)
    titleTab.appendChild(xIcon)
    let currentTitle = window.localStorage.getItem(formTitle)
    let currentProject = JSON.parse(currentTitle)
    if (currentProject.complete) {
        titleTab.style['color'] = 'green'
        checkboxDiv.firstChild.classList.add('taskComplete')
    }
}

function uniqueId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addTask(formTitle, formText, formType, formPriority){
    let taskDict = {
        title : formTitle,
        text : formText,
        complete: false,
        id : uniqueId(),
        priority: formPriority
    }
    let currentProject = document.getElementsByClassName('active')[0].childNodes[1].textContent
    let currentProjectString= window.localStorage.getItem(currentProject)
    let currentProjectJSON = JSON.parse(currentProjectString)
    currentProjectJSON['tasks'][formTitle] = taskDict
    window.localStorage.setItem(currentProject, JSON.stringify(currentProjectJSON))
    
    buildTask(taskDict.title, taskDict.text, taskDict.id, taskDict.priority)

}

function getCurrentProject(){
    let currentProject = document.getElementsByClassName('active')[0]
    currentProject = currentProject.childNodes[1].textContent
    return JSON.parse(window.localStorage.getItem(currentProject))
}

function buildTask(formTitle, formText, noteID, priority){
    let taskList = document.getElementById('task-border')
    let taskNoteBorder = document.getElementById('task-note-border')
    let taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    taskDiv.setAttribute('taskID',noteID)
    
    let checkDiv = document.createElement('div')
    checkDiv.classList.add('checkbox-div')
    checkDiv.addEventListener('click',function(e){
        
        makeTasksCompletable(this)
    })
    checkDiv.innerHTML = '<i class="fas fa-check"></i>'
    
    let currentProject = getCurrentProject()
    let taskComplete = currentProject.tasks[formTitle].complete
    if (taskComplete) {
        taskDiv.style['color'] = 'green'
        checkDiv.firstChild.classList.add('taskComplete')
    }
    let textDiv = document.createElement('div')
    textDiv.classList.add('text-div')
    textDiv.textContent = formTitle
    let xIcon = document.createElement('i')
    xIcon.classList.add('far')
    xIcon.classList.add('fa-times-circle')
    xIcon.addEventListener('click',function(e){
        removeTask(this)
    })
    let taskPriority = document.createElement('div')
    taskPriority.classList.add('priority')
    taskPriority.textContent = priority
    taskList.appendChild(taskDiv)
    taskDiv.appendChild(checkDiv)
    taskDiv.appendChild(textDiv)
    taskDiv.appendChild(xIcon)
    taskDiv.appendChild(taskPriority)
    taskDiv.addEventListener('mouseover',function(e){
        makeTasksHoverable(noteID)
    })
    let note = document.createElement('div')
    note.classList.add('note')
    note.classList.add('noteID'+noteID)
    note.textContent = formText
    taskNoteBorder.appendChild(note)
}


function hideForm(element){
    hideMask()
    element.parentNode.parentNode.childNodes[3].reset()
    element.parentNode.parentNode.style.display = 'none' 
}

function hideMask(){
    document.getElementById('page-mask').style.display = 'none'
}

function showMask(){
    document.getElementById('page-mask').style.display = 'block'
}

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



function generatePage(element){
    generateTitle(element)
    generateDescription(element)
    generateTasks(element)
}

function generateTitle(element){
    let elementTitle = element.textContent
    let elementInfo = window.localStorage.getItem(elementTitle)
    let elementInfoParse = JSON.parse(elementInfo)
    document.getElementById('title-body').firstChild.textContent = elementInfoParse['title']
}

function generateDescription(element){
    let elementTitle = element.textContent
    let elementInfo = window.localStorage.getItem(elementTitle)
    let elementInfoParse = JSON.parse(elementInfo)
    document.getElementById('description-body').firstChild.textContent = elementInfoParse['text']
}

function generateTasks(element){
    let elementTitle = element.textContent
    let elementInfo = window.localStorage.getItem(elementTitle)
    let elementInfoParse = JSON.parse(elementInfo)
    
    let elementTasks = elementInfoParse['tasks']
     
    for (let task in elementTasks){
        buildTask(elementTasks[task].title,elementTasks[task].text,elementTasks[task].id, elementTasks[task].priority)
        
    }
}

function loadTabs(){
    let projects = Object.entries(window.localStorage)
    for (let i = 0; i < projects.length ; i++){
        projects[i] === undefined ? {} : buildTitleTab(projects[i][0])
    }

}

function resetProjects(){
    if (confirm('Are you sure you want to clear all projects?')){
        window.localStorage.clear()
        location.reload()
    }
}

function buildFirstTab(){
    let firstTab = document.getElementsByClassName('title-tab')[0]
    firstTab.classList.add('active')
    generatePage(firstTab.childNodes[1])  
}

function initiatePage(){
    document.getElementById('tab-holder').removeChild(document.getElementById('tab-holder').childNodes[1])  
    addWelcomeTab()
    makeExistingBoardFunctional()
    addTaskButton()
    addTitleButton()
    closeFormWindow()
    makeRemovableTitltesAndTasks()
    loadTabs()
    buildFirstTab()
    document.getElementById('resetButton').addEventListener('click',resetProjects)
}


initiatePage()
