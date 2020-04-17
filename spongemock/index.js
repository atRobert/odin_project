mockButton = document.getElementById('make-mock');

mockButton.addEventListener('click', function(e){
    e.preventDefault()
    let result = ''
    let sentence = document.getElementById('mock-string').value
    for (let i = 0; i < sentence.length; i++){
        i % 2 == 0 ? result += sentence[i].toUpperCase() : result += sentence[i].toLowerCase()
    }
    console.log(result)
    document.getElementById('mock-results').innerText = result
})