!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(){!function(){let e=document.getElementsByClassName("title-tab");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(e){makeTabClickable(this)}))}(),function(){let e=document.getElementsByClassName("task"),t=document.getElementsByClassName("note");for(let n=0;n<e.length;n++)e[n].addEventListener("mouseover",(function(e){let n=this.getAttribute("taskID"),o=document.getElementsByClassName("noteID"+n)[0];for(let e=0;e<t.length;e++)t[e].classList.remove("active-note");o.classList.add("active-note")}))}(),function(){let e=document.getElementsByClassName("task");for(let t=0;t<e.length;t++)e[t].childNodes[0].addEventListener("click",(function(e){let t=this.childNodes[0],n=this.parentNode;3==t.classList.length?(t.classList.remove("taskComplete"),n.childNodes[1].style.color="black"):(t.classList.add("taskComplete"),n.childNodes[1].style.color="green")}))}(),function(){let e=document.getElementsByClassName("title-tab");for(let t=0;t<e.length;t++)e[t].childNodes[0].addEventListener("click",(function(e){makeTitlesCompletable(this)}))}()}function l(){document.getElementById("title-body").childNodes[0].textContent="",document.getElementById("description-body").childNodes[0].textContent="",a("task-border"),a("task-note-border")}function a(e){let t=document.getElementById(e);for(;t.firstChild;)t.removeChild(t.firstChild)}function i(e){let t=document.getElementsByClassName("title-tab");for(let e=0;e<t.length;e++)t[e].classList.remove("active");e.classList.add("active"),console.log(d(e)),d(e)?(l(),y(e)):document.getElementsByClassName("title-tab")[0].classList.add("active")}function d(e){let t=e.childNodes[1].textContent;return!!window.localStorage.getItem(t)}function s(e,t,n,o){"add-task"==n?function(e,t,n,o){let l={title:e,text:t,complete:!1,id:"_"+Math.random().toString(36).substr(2,9),priority:o},a=document.getElementsByClassName("active")[0].childNodes[1].textContent,i=window.localStorage.getItem(a),d=JSON.parse(i);d.tasks[e]=l,window.localStorage.setItem(a,JSON.stringify(d)),m(l.title,l.text,l.id,l.priority)}(e,t,0,o):function(e,t){let n={title:e,text:t,complete:!1,tasks:{}};window.localStorage.setItem(e,JSON.stringify(n)),c(e)}(e,t)}function c(e){let t=document.getElementById("tab-holder"),n=document.createElement("div");n.classList.add("title-tab"),n.addEventListener("click",(function(e){i(this)}));let o=document.createElement("div");o.classList.add("checkbox-div"),o.addEventListener("click",(function(e){!function(e){let t=e.parentNode.childNodes[1].textContent,n=JSON.parse(window.localStorage.getItem(t)),o=e.childNodes[0],l=e.parentNode;3==o.classList.length?(o.classList.remove("taskComplete"),l.childNodes[1].style.color="black",n.complete=!1):(o.classList.add("taskComplete"),l.childNodes[1].style.color="green",n.complete=!0),window.localStorage.setItem(n.title,JSON.stringify(n))}(this)})),o.innerHTML='<i class="fas fa-check"></i>';let a=document.createElement("span");a.classList.add("title-tab-span"),a.textContent=e;let d=document.createElement("i");d.classList.add("far"),d.classList.add("fa-times-circle"),d.addEventListener("click",(function(e){h(this),l(),N()})),t.appendChild(n),n.appendChild(o),n.appendChild(a),n.appendChild(d);let s=window.localStorage.getItem(e);JSON.parse(s).complete&&(n.style.color="green",o.firstChild.classList.add("taskComplete"))}function r(){let e=document.getElementsByClassName("active")[0];return e=e.childNodes[1].textContent,JSON.parse(window.localStorage.getItem(e))}function m(e,t,n,o){let l=document.getElementById("task-border"),a=document.getElementById("task-note-border"),i=document.createElement("div");i.classList.add("task"),i.setAttribute("taskID",n);let d=document.createElement("div");d.classList.add("checkbox-div"),d.addEventListener("click",(function(e){!function(e){let t=e.childNodes[0],n=r(),o=e.parentNode,l=o.childNodes[1].textContent;3==t.classList.length?(t.classList.remove("taskComplete"),o.childNodes[1].style.color="black",n.tasks[l].complete=!1):(t.classList.add("taskComplete"),o.childNodes[1].style.color="green",n.tasks[l].complete=!0),window.localStorage.setItem(n.title,JSON.stringify(n))}(this)})),d.innerHTML='<i class="fas fa-check"></i>',r().tasks[e].complete&&(i.style.color="green",d.firstChild.classList.add("taskComplete"));let s=document.createElement("div");s.classList.add("text-div"),s.textContent=e;let c=document.createElement("i");c.classList.add("far"),c.classList.add("fa-times-circle"),c.addEventListener("click",(function(e){g(this)}));let m=document.createElement("div");m.classList.add("priority"),m.textContent=o,l.appendChild(i),i.appendChild(d),i.appendChild(s),i.appendChild(c),i.appendChild(m),i.addEventListener("mouseover",(function(e){!function(e){let t=document.getElementsByClassName("note"),n=document.getElementsByClassName("noteID"+e)[0];for(let e=0;e<t.length;e++)t[e].classList.remove("active-note");n.classList.add("active-note")}(n)}));let u=document.createElement("div");u.classList.add("note"),u.classList.add("noteID"+n),u.textContent=t,a.appendChild(u)}function u(e){p(),e.parentNode.parentNode.childNodes[3].reset(),e.parentNode.parentNode.style.display="none"}function p(){document.getElementById("page-mask").style.display="none"}function f(){document.getElementById("page-mask").style.display="block"}function h(e){let t=e.parentNode.childNodes[1].textContent;window.localStorage.removeItem(t),e.parentNode.parentNode.removeChild(e.parentNode)}function g(e){let t=e.parentNode.childNodes[1].textContent,n=r();delete n.tasks[t],window.localStorage.setItem(n.title,JSON.stringify(n)),e.parentNode.parentNode.removeChild(e.parentNode)}function y(e){!function(e){let t=e.textContent,n=window.localStorage.getItem(t),o=JSON.parse(n);document.getElementById("title-body").firstChild.textContent=o.title}(e),function(e){let t=e.textContent,n=window.localStorage.getItem(t),o=JSON.parse(n);document.getElementById("description-body").firstChild.textContent=o.text}(e),function(e){let t=e.textContent,n=window.localStorage.getItem(t),o=JSON.parse(n).tasks;for(let e in o)m(o[e].title,o[e].text,o[e].id,o[e].priority)}(e)}function k(){confirm("Are you sure you want to clear all projects?")&&(window.localStorage.clear(),location.reload())}function N(){let e=document.getElementsByClassName("title-tab")[0];e.classList.add("active"),y(e.childNodes[1])}n.r(t),document.getElementById("tab-holder").removeChild(document.getElementById("tab-holder").childNodes[1]),function(){if(0==window.localStorage.length){let e={title:"Welcome!",text:"Each project you create will have it's own tab! You can add projects by clicking the green plus at the top! Each project can\n                            have its own tasks to be added below. Each tasks can have notes to give you a more specific look. Done with a task? Check it off! Don't need a task? Click it off.\n                            You can do the same thing with projects. If you've complete it, check it off. Don't need it anymore? Remove it. What are you waiting for? Start managing!",complete:!1,tasks:{"Add a project":{title:"Add a project",text:"To add a project, click the green plus at the top of display!",complete:!1,priority:"!",id:"jskdhtfaCXWE"},"Add a task":{title:"Add a task",text:"To add a task, click the green plus in the task section to the left!",complete:!1,priority:"!",id:"seljkhrkjhDFSDF"},"Complete a task":{title:"Complete a task",text:"To mark a task completed, click the circle to the left of it! \n                                The same can be done with projects, by clicking in the top left\n                                corner of their tab!",complete:!1,priority:"!",id:"seljkhrkdfdfjhDFSDF"},"Clearing all projects":{title:"Clearing all projects",text:'If at any point you\'d like to clear all your projects, click the "clear all" \n                                button in the top left corner of the page. But be careful, your projects \n                                and progress will be permanently removed!',complete:!1,priority:"!",id:"dfklhjdfjhfe"}}};window.localStorage.setItem("Welcome!",JSON.stringify(e))}else console.log("Welcome Back!")}(),o(),document.getElementsByClassName("add-task")[0].addEventListener("click",(function(e){f(),document.getElementById("add-task").style.display="block"})),document.getElementsByClassName("add-title")[0].addEventListener("click",(function(e){window.localStorage.length<8?(f(),document.getElementById("add-title").style.display="block"):alert("You have too many active projects already!")})),function(){let e=document.getElementsByClassName("fa-window-close"),t=document.getElementsByClassName("fa-check-square"),n=document.getElementById("page-mask");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(e){u(this)}));for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(e){let t,n=this.parentNode.parentNode.childNodes[3].childNodes[1].value,o=this.parentNode.parentNode.childNodes[3].childNodes[3].value,l=this.parentNode.parentNode.getAttribute("id");"add-task"==l&&(t=this.parentNode.parentNode.childNodes[3].childNodes[7].value||"!"),s(n,o,l,t),u(this)}));n.addEventListener("click",(function(e){p(),document.getElementById("add-task").style.display="none",document.getElementById("add-title").style.display="none",document.getElementById("add-task").childNodes[3].reset(),document.getElementById("add-title").childNodes[3].reset()}))}(),function(){let e=document.getElementsByClassName("fa-times-circle");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(e){let t=this.parentNode.childNodes[1].textContent;"title-tab"!=this.parentNode.classList[0]||h(t),"task"!=this.parentNode.classList[0]||g(t)}))}(),function(){let e=Object.entries(window.localStorage);for(let t=0;t<e.length;t++)void 0===e[t]||c(e[t][0])}(),N(),document.getElementById("resetButton").addEventListener("click",k)}]);