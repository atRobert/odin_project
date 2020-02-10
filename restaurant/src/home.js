function loadHome(){
    let content = document.getElementById('content')
    let body = document.body
    body.style['background-image'] = "url('burger_background.jpg')"
    body.style['background-size'] = "cover"
    body.style['background-repeat'] = "no-repeat"
    let div = document.createElement('div')
    div.setAttribute('id','loadHome')
    div.style.cssText = "width:50%;"
    let h1 = document.createElement('h1')
    h1.style.cssText = "font-family: 'Cabin Sketch', cursive; font-size:100px; margin-top:20%; margin-left:5%;"
    h1.innerHTML = 'Food for Friends.<br>Food for Family.<br> Food for You.'
    content.appendChild(div)
    div.appendChild(h1)
}

export {loadHome}