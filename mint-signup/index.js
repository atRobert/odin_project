let otherServices = [...document.getElementsByClassName('hide-animation')]

let waitTime = 1200

otherServices.every(x => setTimeout(function(){
    x.style.opacity = '1'
    x.style.transform = 'translate(0,0)'
    document.getElementById('int-logo').style.opacity = '1'
}, waitTime += 300))


        
  
    
