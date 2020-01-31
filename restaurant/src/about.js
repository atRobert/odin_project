function loadAbout(){
    let content = document.getElementById('content')
    let div = document.createElement('div')
    div.setAttribute('id','loadAbout')
    div.style.cssText = "width:50%;"
    let h1 = document.createElement('h1')
    h1.style.cssText = "font-family: 'Cabin Sketch', cursive; font-size:100px; margin-top:20%; margin-left:5%;"
    h1.innerHTML = 'Oh yeah it works. Nice.'
    content.appendChild(div)
    div.appendChild(h1)
    
}

export {loadAbout}