const startUpAnimation = () =>{
    let otherServices = [...document.getElementsByClassName('hide-animation')]
    let waitTime = 1200
    otherServices.every(x => setTimeout(function(){
        x.style.opacity = '1'
        x.style.transform = 'translate(0,0)'
        document.getElementById('int-logo').style.opacity = '1'
    }, waitTime += 200))
}

startUpAnimation()




const checkEmail = element =>{
    if (!element.checkValidity() || element.value == ''){
        element.classList.add('error')
        element.parentNode.childNodes[7].style.visibility = 'visible'
    } else{
        element.classList.remove('error')
        element.parentNode.childNodes[7].style.visibility = 'hidden'
    }
}

const checkPhone = element =>{
    if (element.value == ''){
        element.parentNode.childNodes[7].style.display = 'block'
        element.parentNode.childNodes[9].style.display = 'none'
        element.parentNode.childNodes[11].style.display = 'none'
        element.parentNode.childNodes[11].style.visibility = 'hidden'
        element.classList.remove('error')
    }
}




function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}





const passWordCheck = string =>{
    
    const hasLowerCase = string =>{
        let array = string.split('')
        return array.some(x => x === x.toLowerCase())
    }
    
    const hasUpperCase = string =>{
        let array = string.split('')
        return array.some(x => x === x.toUpperCase())
    }
    
    const specialChar = string =>{
        const specialChars = '!@#$%^&*()_+{}[]'
        let array = string.split('')
        return array.some(x => specialChars.includes(x))
    }
    
    const numCheck = string =>{
        let array = string.split('')
        return array.some(x => !isNaN(x))
    }

    let length = string.length > 7
    let charCase = (hasLowerCase(string) && hasUpperCase(string))
    let special = specialChar(string)
    let number = numCheck(string)

    const allTrue = [length, charCase, special, number].every(x => x === true)


    return {length, charCase, special, number, allTrue}
}

const passwordValidationManager = (passwordObj, passColor, failColor) =>{
   if (passwordObj.length){
    document.getElementById('length').style.color= passColor 
   } else{
    document.getElementById('length').style.color= failColor
   } 
    passwordObj.charCase? document.getElementById('capital').style.color= passColor  : document.getElementById('capital').style.color= failColor
    passwordObj.special ? document.getElementById('special').style.color= passColor  : document.getElementById('special').style.color= failColor
    passwordObj.number ? document.getElementById('number').style.color= passColor  : document.getElementById('number').style.color= failColor
}


let checkPassword = element =>{
    element.value == '' ? document.getElementById('password-req').style.display = 'block' : {}
    let passwordObj = passWordCheck(element.value)
    passwordValidationManager(passwordObj, 'green', 'red')
    let validationList = [passwordObj.length, passwordObj.charCase, passwordObj.special, passwordObj.number]
    if (validationList.every(x => x == true)){
        element.classList.remove('error')  
    } else{
        element.classList.add('error')
    }
}
    


const checkPasswordMatch = (element) =>{
    let pass1 = document.getElementById('password-input').value
    let pass2 = element.value
    if (pass1 == pass2){
        element.classList.remove('error')
        element.parentNode.childNodes[7].style.visibility = 'hidden'
    } else {
        element.classList.add('error')
        element.parentNode.childNodes[7].style.visibility = 'visible'
    }
}


document.getElementById('password-confirm').addEventListener('blur',function(e){
    let pass1 = document.getElementById('password-input').value
    let pass2 = this.value
    
    if (pass1 != pass2 || pass2 == ''){
        this.classList.add('error')
        this.parentNode.childNodes[7].style.visibility = 'visible'
    } else{
        this.classList.remove('error')
        this.parentNode.childNodes[7].style.visibility = 'hidden'
    }
})

document.getElementById('password-input').addEventListener('blur',function(e){
    checkPassword(this)
})
  
document.getElementById('password-confirm').addEventListener('keyup',function(e){
    checkPasswordMatch(this)
})

document.getElementById('password-input').addEventListener('keyup',function(e){
    let passwordObj = passWordCheck(this.value)
    console.log(e)
    passwordValidationManager(passwordObj, 'green', '#7c7c7c')
    console.log(passwordObj.allTrue)
    if (passwordObj.allTrue){
        console.log('good')
        document.getElementById('password-req').style.display = 'none'
        document.getElementById('password-good').style.display = 'block'
    } else {
        document.getElementById('password-req').style.display = 'block'
        document.getElementById('password-good').style.display = 'none'
    }
    checkPasswordMatch(document.getElementById('password-confirm'))
})

document.getElementById('phone-input').addEventListener('blur', function(e){
    if (this.value == ''){
        this.parentNode.childNodes[7].style.display = 'block'
        this.parentNode.childNodes[9].style.display = 'none'
        this.parentNode.childNodes[11].style.display = 'none'
        this.parentNode.childNodes[11].style.visibility = 'hidden'
        this.classList.remove('error')
    } else if(!this.checkValidity()){
        this.classList.add('error')
        this.parentNode.childNodes[11].style.display = 'block'
        this.parentNode.childNodes[11].style.visibility = 'visible'
        this.parentNode.childNodes[7].style.display = 'none'
        this.parentNode.childNodes[9].style.display = 'none'
    }
    else{
        this.parentNode.childNodes[7].style.display = 'none'
        this.parentNode.childNodes[9].style.display = 'block'
        this.parentNode.childNodes[11].style.display = 'none'
        this.parentNode.childNodes[11].style.visibility = 'hidden'
        this.classList.remove('error')
    }
})
    
document.getElementById('new-password').addEventListener('click', function(e){
    document.getElementById('account-create').style.transform = 'translate(0,0)'
    document.getElementById('hidden-password').style.overflow = 'visible'
    document.getElementById('hidden-password').style.height = '100%'
    let passwordInput = document.getElementById('password-input').value.length
    passwordInput === 0 ? document.getElementById('password-req').style.display = 'block' : {}
    
})

document.getElementById('account-create').addEventListener('click',function(e){
    e.preventDefault()
    let email = document.getElementById('email-input')
    let phone = document.getElementById('phone-input')
    let password1 = document.getElementById('password-input')
    checkEmail(email)
    checkPhone(phone)
    checkPassword(password1)
})

document.getElementById('email-input').addEventListener('blur', function(e){
    checkEmail(this)
})

document.getElementById('phone-input').addEventListener('keyup',function(e){
    let oldVal = this.value
    let array = oldVal.split('')
    if (array.length > 2 && array[0] != '('){
        array.unshift('(')
        array.splice(4,0,')-')
    }
    if (array.length > 9 && array[9] != '-'){
        array.splice(9,0,'-')
    }
    oldVal = array.join('')
    this.value = ''
    this.value = oldVal
})

