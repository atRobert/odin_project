function clearBoard(){
    clearTitle()
    clearDescription()
    clearNotes('task-border')
    clearNotes('task-note-border')
}

function clearTitle(){
    let titleBody = document.getElementById('title-body')
    titleBody.childNodes[0].textContent = ''
}

function clearDescription(){
    let titleDescription = document.getElementById('description-body')
    titleDescription.childNodes[0].textContent = ''
}


function clearNotes(idName){
    let noteList = document.getElementById(idName)
    while (noteList.firstChild) {
        noteList.removeChild(noteList.firstChild);
    }
}

export {clearBoard}