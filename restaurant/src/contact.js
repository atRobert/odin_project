function loadContact(){
    let content = document.getElementById('content')
    let div = document.createElement('div')
    div.setAttribute('id','loadContact')
    div.style.cssText = `font-family: 'Cabin Sketch', cursive;
                            width: 50%;
                            background: green;
                            margin-left: 10%;
                            height: 100%;
                            background:#58340475;
                            border-radius: 5px;
                            text-align:center;`

    content.appendChild(div)
    
    let innerDiv = document.createElement('div')
    innerDiv.style['color'] = '#fee39f'
    
    

    let h1 = document.createElement('h1')
    h1.style.cssText = `font-family: 'Cabin Sketch', cursive;
                            font-size:100px;
                            margin: auto;
                            margin-top:20%;`
    h1.innerHTML = 'Contact Us'

    let h3 = document.createElement('h3')
    h3.style.cssText = `font-size:40px; margin: auto;
                            margin-top:2px;`
    h3.textContent = 'Open seven days a week, 8AM - 11PM'

    
    div.appendChild(h1)
    div.appendChild(innerDiv)
    innerDiv.appendChild(h3)

    let contactInfo = {"Phone":"(909)-663-8281",
                            "eMail":"bbSupport@bigBurger.com",
                            "Address":"17940 S Avalon Blvd, Carson, CA 90746"
    }

    

    for (let key in contactInfo){
        let p = document.createElement('p')
        p.style.cssText = `font-family: 'Londrina Sketch', cursive;
                            font-size:30px; margin: auto;
                            margin-top:15px;`
        p.textContent = key + ' : ' + contactInfo[key]
        innerDiv.appendChild(p)
    }
    
}

export {loadContact}