!function(e){var t={};function n(l){if(t[l])return t[l].exports;var o=t[l]={i:l,l:!1,exports:{}};return e[l].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(l,o,function(t){return e[t]}.bind(null,o));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){!function(){let e=document.getElementsByClassName("title-tab");for(let t=0;t<e.length;t++)e[t].addEventListener("click",(function(t){for(let t=0;t<e.length;t++)e[t].classList.remove("active");this.classList.add("active")}))}(),function(){let e=document.getElementsByClassName("task"),t=document.getElementsByClassName("note");for(let n=0;n<e.length;n++)e[n].addEventListener("mouseover",(function(e){let n=this.getAttribute("taskID"),l=document.getElementsByClassName("noteID"+n)[0];for(let e=0;e<t.length;e++)t[e].classList.remove("active-note");l.classList.add("active-note")}))}(),function(){let e=document.getElementsByClassName("task");for(let t=0;t<e.length;t++)e[t].childNodes[0].addEventListener("click",(function(e){let t=this.childNodes[0],n=this.parentNode;3==t.classList.length?(t.classList.remove("taskComplete"),n.childNodes[1].style.color="black"):(t.classList.add("taskComplete"),n.childNodes[1].style.color="green")}))}(),function(){let e=document.getElementsByClassName("title-tab");for(let t=0;t<e.length;t++)e[t].childNodes[0].addEventListener("click",(function(e){let t=this.childNodes[0],n=this.parentNode;3==t.classList.length?(t.classList.remove("taskComplete"),n.childNodes[1].style.color="black"):(t.classList.add("taskComplete"),n.childNodes[1].style.color="green")}))}()}]);