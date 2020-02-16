function checkFirstTime(){
    let firstTime
    let local_storage = window.localStorage
    firstTime = local_storage.length == 0 ? true : false
    return firstTime
}



export {firstTime}
