function loadMenu(){
    let content = document.getElementById('content')
    let div = document.createElement('div')
    div.setAttribute('id','loadMenu')
    content.appendChild(div)

    let menuItems = {
        "Big Burger":["bigburger.png",
                        "Single."],
        "Bigger Burger": ["biggerburger.png",
                        "Tiple patty."],
        "Biggest Burger":["biggestburger.png",
                        "You decide."]
    }

    let cardStyle = `background: #58340475;
                        width: 300px;
                        height: 500px; 
                        border-radius:10px;
                        margin: 30px;
                        margin-top: 30px;
                        display: inline-block;
                        text-align: center;`

    for (let item in menuItems){
        let card = document.createElement('div')
        card.style.cssText = cardStyle
        div.appendChild(card)
        let h1 = document.createElement('h1')
        h1.textContent = item
        h1.style.cssText = `font-family: 'Cabin Sketch', cursive;
                                text-align:center; 
                                font-size: 40px;`
        card.appendChild(h1)
        let hr = document.createElement('hr')
        card.appendChild(hr)
        let img = document.createElement('img')
        img.src = menuItems[item][0]
        img.style.cssText = "height:280px;width:280px;"
        card.appendChild(img)
        let h2 = document.createElement('h2')
        h2.textContent = menuItems[item][1]
        h2.style.cssText = "font-family: 'Cabin Sketch', cursive;"
        card.appendChild(h2)
    }
}


export {loadMenu}