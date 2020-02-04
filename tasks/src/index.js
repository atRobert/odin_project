function clickableTabs(){
    let titleTab = document.getElementsByClassName('title-tab')
    for (let i = 0; i < titleTab.length; i++){
        titleTab[i].addEventListener('click',function(e){
            for (let x = 0; x < titleTab.length; x++){
                titleTab[x].classList.remove('active')
            }
            this.classList.add('active')
        })
    }
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



clickableTabs()
clickableTasks()
completableTasks()
completableTitles()
