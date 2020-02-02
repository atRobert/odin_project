function loadAbout(){
    let content = document.getElementById('content')
    let div = document.createElement('div')
    div.setAttribute('id','loadAbout')
    div.style.cssText = `width:50%;
                            margin-left: 10%;
                            font-family: 'Cabin Sketch', cursive;`
    content.appendChild(div)
    let h1 = document.createElement('h1')
    h1.style['font-size'] = '100px'
    h1.textContent = "Here at Big Burger..."
    div.appendChild(h1)
    let h2 = document.createElement('h2')
    h2.style['font-size'] = '40px'
    h2.textContent = `We believe burgers should come in all
                        sizes...if that size is BIG. Established
                        in 1989, we have been proudly serving not
                        just the burger you want. But the burger 
                        you NEED. Our meats are never frozen, always
                        fresh, and ready for to put a smile on your face.`

    div.appendChild(h2)
    
}

export {loadAbout}