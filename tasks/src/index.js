function clickableTabs(){
    let titleTab = document.getElementsByClassName('title-tab')
    for (let i = 0; i < titleTab.length; i++){
        titleTab[i].addEventListener('click',function(e){
            addingClickableTabs(this)
        })
    }
}

function addingClickableTabs(element){
    let titleTab = document.getElementsByClassName('title-tab')
    for (let x = 0; x < titleTab.length; x++){
        titleTab[x].classList.remove('active')
    }
    element.classList.add('active')   
}

function clickableTasks(){
    let tasks = document.getElementsByClassName('task')
    let notes = document.getElementsByClassName('note')
    for (let i = 0; i < tasks.length; i++){
        tasks[i].addEventListener('mouseover',function(e){
            let taskID = this.getAttribute('taskID')
            let noteID = document.getElementsByClassName('noteID' + taskID)[0]
            for (let x = 0; x < notes.length; x++){
                notes[x].classList.remove('active-note')
            }
            noteID.classList.add('active-note')
        })
    }
}

function completableTasks(){
    let tasks = document.getElementsByClassName('task')
    for (let i = 0; i < tasks.length; i++){
        tasks[i].childNodes[0].addEventListener('click',function(e){
            let taskCheck = this.childNodes[0]
            let taskParent = this.parentNode
            if (taskCheck.classList.length  == 3){
                taskCheck.classList.remove('taskComplete')
                taskParent.childNodes[1].style['color'] = 'black'
            } else {
                taskCheck.classList.add('taskComplete')
                taskParent.childNodes[1].style['color'] = 'green'
            }
        })
    }
}

function completableTitles(){
    let tasks = document.getElementsByClassName('title-tab')
    for (let i = 0; i < tasks.length; i++){
        tasks[i].childNodes[0].addEventListener('click',function(e){
            let taskCheck = this.childNodes[0]
            let taskParent = this.parentNode
            if (taskCheck.classList.length  == 3){
                taskCheck.classList.remove('taskComplete')
                taskParent.childNodes[1].style['color'] = 'black'
            } else {
                taskCheck.classList.add('taskComplete')
                taskParent.childNodes[1].style['color'] = 'green'
            }
        })
    }
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
        showMask()
        document.getElementById('add-title').style.display = 'block'
    })
}

function windowCloseForm(){
    let windowCloseButtons = document.getElementsByClassName('fa-window-close')
    let windowCheckButtons = document.getElementsByClassName('fa-check-square')
    let windowMask = document.getElementById('page-mask')
    console.log(windowCloseButtons)
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
            console.log(formType)
            determineForm(formTitle,formText,formType)
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

function determineForm(formTitle,formText,formType){
    if (formType == 'add-task'){
        addTask(formTitle, formText)
    } else {
        addTitleTab(formTitle, formText)
    }
}

function addTitleTab(formTitle, formText){
    let tabContent = document.getElementById('tab-holder')
    let titleTab = document.createElement('div')
    titleTab.classList.add('title-tab')
    titleTab.addEventListener('click',function(e){
        addingClickableTabs(this)
    })
    let checkboxDiv = document.createElement('div')
    checkboxDiv.classList.add('checkbox-div')
    checkboxDiv.innerHTML = '<i class="fas fa-check"></i>'
    let titleTabSpan = document.createElement('span')
    titleTabSpan.classList.add('title-tab-span')
    titleTabSpan.textContent = formTitle
    let xIcon = document.createElement('i')
    xIcon.classList.add('far')
    xIcon.classList.add('fa-times-circle')
    xIcon.addEventListener('click',function(e){
        removeE(this)
    })
    tabContent.appendChild(titleTab)
    titleTab.appendChild(checkboxDiv)
    titleTab.appendChild(titleTabSpan)
    titleTab.appendChild(xIcon)

}

function addTask(formTitle, formText){
    let taskList = document.getElementById('task-list')
    let taskNoteBorder = document.getElementById('task-note-border')
    let taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    taskDiv.setAttribute('taskID','5')
    let checkDiv = document.createElement('div')
    checkDiv.classList.add('checkbox-div')
    checkDiv.innerHTML = '<i class="fas fa-check"></i>'
    let textDiv = document.createElement('div')
    textDiv.classList.add('text-div')
    textDiv.textContent = formTitle
    let xIcon = document.createElement('i')
    xIcon.classList.add('far')
    xIcon.classList.add('fa-times-circle')
    xIcon.addEventListener('click',function(e){
        removeE(this)
    })
    taskList.appendChild(taskDiv)
    taskDiv.appendChild(checkDiv)
    taskDiv.appendChild(textDiv)
    taskDiv.appendChild(xIcon)
    taskDiv.addEventListener('mouseover',function(e){
        let notes = document.getElementsByClassName('note')
        let taskID = this.getAttribute('taskID')
        let noteID = document.getElementsByClassName('noteID' + taskID)[0]
        for (let x = 0; x < notes.length; x++){
            notes[x].classList.remove('active-note')
        }
        noteID.classList.add('active-note')
    })
    let note = document.createElement('div')
    note.classList.add('note')
    note.classList.add('noteID'+'5')
    note.textContent = formText
    
    taskNoteBorder.appendChild(note)

}

function hideForm(element){
    hideMask()
    element.parentNode.parentNode.childNodes[3].reset()
    element.parentNode.parentNode.style.display = 'none'
    console.log(document.getElementById('add-title').childNodes)
    
}

function hideMask(){
    document.getElementById('page-mask').style.display = 'none'
}

function showMask(){
    document.getElementById('page-mask').style.display = 'block'
}

function removeE(e){
    let tgt = e
    console.log(tgt)
    tgt.parentNode.parentNode.removeChild(tgt.parentNode)
}


clickableTabs()
clickableTasks()
completableTasks()
completableTitles()
addTaskButton()
windowCloseForm()
addTitleButton()