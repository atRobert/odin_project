!function(e){var t={};function n(l){if(t[l])return t[l].exports;var d=t[l]={i:l,l:!1,exports:{}};return e[l].call(d.exports,d,d.exports,n),d.l=!0,d.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var d in e)n.d(l,d,function(t){return e[t]}.bind(null,d));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e){let t=document.getElementsByClassName("title-tab");for(let e=0;e<t.length;e++)t[e].classList.remove("active");e.classList.add("active"),document.getElementById("title-body").childNodes[0].textContent="",document.getElementById("description-body").childNodes[0].textContent="",r("task-border"),r("task-note-border"),function(e){(function(e){let t=e.textContent,n=window.localStorage.getItem(t),l=JSON.parse(n);document.getElementById("title-body").firstChild.textContent=l.title})(e),function(e){let t=e.textContent,n=window.localStorage.getItem(t),l=JSON.parse(n);document.getElementById("description-body").firstChild.textContent=l.text}(e)}(e)}function l(e){let t=e.childNodes[0],n=e.parentNode;3==t.classList.length?(t.classList.remove("taskComplete"),n.childNodes[1].style.color="black"):(t.classList.add("taskComplete"),n.childNodes[1].style.color="green")}function d(e,t,n){"add-task"==n?function(e,t,n){let d={title:e,text:t,complete:!1};window.localStorage.setItem(e,JSON.stringify(d));let o=document.getElementById("task-list"),s=document.getElementById("task-note-border"),i=document.createElement("div");i.classList.add("task"),i.setAttribute("taskID","5");let c=document.createElement("div");c.classList.add("checkbox-div"),c.addEventListener("click",(function(e){l(this)})),c.innerHTML='<i class="fas fa-check"></i>';let r=document.createElement("div");r.classList.add("text-div"),r.textContent=e;let m=document.createElement("i");m.classList.add("far"),m.classList.add("fa-times-circle"),m.addEventListener("click",(function(e){a(this)})),o.appendChild(i),i.appendChild(c),i.appendChild(r),i.appendChild(m),i.addEventListener("mouseover",(function(e){let t=document.getElementsByClassName("note"),n=this.getAttribute("taskID"),l=document.getElementsByClassName("noteID"+n)[0];for(let e=0;e<t.length;e++)t[e].classList.remove("active-note");l.classList.add("active-note")}));let u=document.createElement("div");u.classList.add("note"),u.classList.add("noteID5"),u.textContent=t,s.appendChild(u)}(e,t):function(e,t,n){let l={title:e,text:t,complete:!1};window.localStorage.setItem(e,JSON.stringify(l)),o(e)}(e,t)}function o(e){let t=document.getElementById("tab-holder"),d=document.createElement("div");d.classList.add("title-tab"),d.addEventListener("click",(function(e){n(this)}));let o=document.createElement("div");o.classList.add("checkbox-div"),o.addEventListener("click",(function(e){l(this)})),o.innerHTML='<i class="fas fa-check"></i>';let s=document.createElement("span");s.classList.add("title-tab-span"),s.textContent=e;let i=document.createElement("i");i.classList.add("far"),i.classList.add("fa-times-circle"),i.addEventListener("click",(function(e){a(this)})),t.appendChild(d),d.appendChild(o),d.appendChild(s),d.appendChild(i)}function s(e){i(),e.parentNode.parentNode.childNodes[3].reset(),e.parentNode.parentNode.style.display="none",console.log(document.getElementById("add-title").childNodes)}function i(){document.getElementById("page-mask").style.display="none"}function c(){document.getElementById("page-mask").style.display="block"}function a(e){e.parentNode.parentNode.removeChild(e.parentNode)}function r(e){let t=document.getElementById(e);for(;t.firstChild;)t.removeChild(t.firstChild)}!function(){let e=document.getElementsByClassName("title-tab");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(e){n(this)}))}(),function(){let e=document.getElementsByClassName("task"),t=document.getElementsByClassName("note");for(let n=0;n<e.length;n++)e[n].addEventListener("mouseover",(function(e){let n=this.getAttribute("taskID"),l=document.getElementsByClassName("noteID"+n)[0];for(let e=0;e<t.length;e++)t[e].classList.remove("active-note");l.classList.add("active-note")}))}(),function(){let e=document.getElementsByClassName("task");for(let t=0;t<e.length;t++)e[t].childNodes[0].addEventListener("click",(function(e){let t=this.childNodes[0],n=this.parentNode;3==t.classList.length?(t.classList.remove("taskComplete"),n.childNodes[1].style.color="black"):(t.classList.add("taskComplete"),n.childNodes[1].style.color="green")}))}(),function(){let e=document.getElementsByClassName("title-tab");for(let t=0;t<e.length;t++)e[t].childNodes[0].addEventListener("click",(function(e){l(this)}))}(),document.getElementsByClassName("add-task")[0].addEventListener("click",(function(e){c(),document.getElementById("add-task").style.display="block"})),function(){let e=document.getElementsByClassName("fa-window-close"),t=document.getElementsByClassName("fa-check-square"),n=document.getElementById("page-mask");console.log(e);for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(e){s(this)}));for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(e){let t=this.parentNode.parentNode.childNodes[3].childNodes[1].value,n=this.parentNode.parentNode.childNodes[3].childNodes[3].value,l=this.parentNode.parentNode.getAttribute("id");console.log(l),d(t,n,l),s(this)}));n.addEventListener("click",(function(e){i(),document.getElementById("add-task").style.display="none",document.getElementById("add-title").style.display="none",document.getElementById("add-task").childNodes[3].reset(),document.getElementById("add-title").childNodes[3].reset()}))}(),document.getElementsByClassName("add-title")[0].addEventListener("click",(function(e){c(),document.getElementById("add-title").style.display="block"})),function(){let e=document.getElementsByClassName("fa-times-circle");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(e){a(this)}))}(),function(){let e=Object.entries(window.localStorage);for(let t=0;t<e.length;t++)void 0===e[t]||o(e[t][0])}()}]);