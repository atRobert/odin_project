function addWelcomeTab(){
    if (window.localStorage.length == 0) {
        let welcome = {
            title : 'Welcome!',
            text : `Each project you create will have it's own tab! You can add projects by clicking the green plus at the top! Each project can
                            have its own tasks to be added below. Each tasks can have notes to give you a more specific look. Done with a task? Check it off! Don't need a task? Click it off.
                            You can do the same thing with projects. If you've complete it, check it off. Don't need it anymore? Remove it. What are you waiting for? Start managing!`,
            complete: false,
            tasks : {
                'Add a project' : {
                    title : 'Add a project',
                    text : 'To add a project, click the green plus at the top of display!',
                    complete : false,
                    priority: "!",
                    id : 'jskdhtfaCXWE'

                },
                'Add a task' : {
                    title : 'Add a task',
                    text : 'To add a task, click the green plus in the task section to the left!',
                    complete : false,
                    priority: "!",
                    id : 'seljkhrkjhDFSDF'
                },
                'Complete a task' : {
                    title : 'Complete a task',
                    text : `To mark a task completed, click the circle to the left of it! 
                                The same can be done with projects, by clicking in the top left
                                corner of their tab!`,
                    complete : false,
                    priority: "!",
                    id : 'seljkhrkdfdfjhDFSDF'
                },
                'Clearing all projects' : {
                    title : 'Clearing all projects',
                    text : `If at any point you'd like to clear all your projects, click the "clear all" 
                                button in the top left corner of the page. But be careful, your projects 
                                and progress will be permanently removed!`,
                    complete : false,
                    priority: "!",
                    id : 'dfklhjdfjhfe'
                }
                }
            }
        
        window.localStorage.setItem('Welcome!',JSON.stringify(welcome))
        
        } else {
            console.log('Welcome Back!')
        }
} 

function makeExistingTabsClickable(){
    let titleTab = document.getElementsByClassName('title-tab')
    for (let i = 0; i < titleTab.length; i++){
        titleTab[i].addEventListener('click',function(e){
            makeTabClickable(this)
        })
    }
}

function makeExistingTitlesCompleteable(){
    let tasks = document.getElementsByClassName('title-tab')
    for (let i = 0; i < tasks.length; i++){
        tasks[i].childNodes[0].addEventListener('click',function(e){
            makeTitlesCompletable(this)
        })
    }
}

function makeExistingTasksHoverable(){
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

function makeExistingTasksCompleteable(){
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

function makeExistingBoardFunctional(){
    makeExistingTabsClickable()
    makeExistingTasksHoverable() 
    makeExistingTasksCompleteable() 
    makeExistingTitlesCompleteable()
}

export {addWelcomeTab, makeExistingBoardFunctional}