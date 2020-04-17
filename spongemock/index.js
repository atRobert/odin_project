mockButton = document.getElementById('make-mock');
copyButton = document.getElementById('copy-button');

mockButton.addEventListener('click', function(e){
    e.preventDefault()
    let result = ''
    let sentence = document.getElementById('mock-string').value
    for (let i = 0; i < sentence.length; i++){
        i % 2 == 0 ? result += sentence[i].toUpperCase() : result += sentence[i].toLowerCase()
    }
    console.log(result)
    document.getElementById('mock-results').innerText = result
    document.getElementById('copy-button').style['display'] = 'block'
    document.getElementById('copy-button').innerText = 'Copy'
})


copyButton.addEventListener('click', function(e){
    let range = document.createRange();
    range.selectNode(document.getElementById("mock-results"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
    document.getElementById('copy-button').innerText = 'Copied!'
})







