const welcomeJSON = {
    "title": "Welcome!",
    "id": "SddsfdFds",
    "complete": false,
    "active": false,
    "description": "Welcome to my React Task Manager!",
    "tasks": [
        {
            "title": "Hover over me!",
            "description": "You can hover over tasks to see more notes about the specific task!",
            "priority": "High",
            "id": "hoverTaskID"
            },
        {
        "title": "Add a project!",
        "description": "Click the add project button to add a project! Projects should have a simple title, with a more in depth description. Each project can have several tasks associated with them. Each project can also be marked complete when you're finished!",
        "priority": "High",
        "id": "addProjectID"
        },
        {
            "title": "Add Task",
            "priority": "High",
            "description": "To add a task to your project, click the plus to the left of 'Task'. Each task can have it's own set of notes, that can be seen when the task is hovered. Tasks can also be marked completed as well removed if they're no longe necessary.",
            "id": "addTaskID"
        }
    ]
}

export {welcomeJSON}
