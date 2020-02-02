function createNavBar(){
    document.body.style.margin = '0px'
    let nav = document.getElementById('nav')
    let navBar = document.createElement('ul')
    nav.appendChild(navBar)
    let navLinks = ['Home','Menu','Contact','About']
    for (let i = 0; i < navLinks.length; i++){
        let navBarLine = document.createElement('li')
        navBarLine.style['float'] = "left"
        navBarLine.classList.add('navBarLine')
        let navBarLink = document.createElement('a')
        navBarLink.classList.add('navBarLink')
        navBarLink.addEventListener("click", function(e){
            var elems = document.querySelector(".active");
            if(elems !==null){
                elems.classList.remove("active");
            }
            e.target.classList.add('active');
            clearContent()
            document.getElementById('load'+navLinks[i]).style['display'] = ''
        })
        
        
        if (navLinks[i] == 'Home'){
            navBarLink.innerHTML = '<i class="fas fa-hamburger"> </i> Home'
            navBarLink.href = '#'
            navBarLink.classList.add('active')
        } else {
            navBarLink.textContent = navLinks[i]
            navBarLink.href = "#" + navLinks[i]
        }
        navBar.appendChild(navBarLine)
        navBarLine.appendChild(navBarLink)
    }
}

function clearContent(){
    let content = document.getElementById('content')
    let contentChildren = content.childNodes
    for (let i = 0; i < contentChildren.length; i++){
        contentChildren[i].style['display'] = 'none'
    }
}

export {createNavBar, clearContent}