!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){r(1)()},function(t,e,r){const n=r(2)();console.log(n.placedShips),console.log(n.bufferCoords);let o=document.getElementById("board-display");t.exports=()=>{const t=t=>{let e=document.getElementsByClassName(t);console.log(e);for(let t=0;t<e.length;t++)e[t].style.background="rgb(17, 84, 0)"};for(let e=0;e<11;e++){let r=document.createElement("div");r.classList.add("row"),r.setAttribute("row",e);for(let l=0;l<11;l++){let i=document.createElement("div");i.classList.add("row"),i.setAttribute("row",e),i.setAttribute("col",l),i.style.cssText="height:50px;\n                                    width:50px;\n                                    border:1px solid black;\n                                    display:inline-block",i.addEventListener("mouseenter",(function(e){let r=n.receiveAttack(`${this.getAttribute("row")},${this.getAttribute("col")}`);r[0]?(i.classList.add("_"+r[2]),i.style.background="rgb(17, 244, 0)",!r[1]||t("_"+r[2])):i.style.background="red"})),r.appendChild(i),o.appendChild(r)}}}},function(t,e,r){const n=r(3);t.exports=()=>{const t=[],e=[4,3,3,2,2,2,1,1,1],r=new Set,o=t=>Math.floor(Math.random()*Math.floor(t)),l=t=>{let e=[o(10),o(10-t)],r=[e],n=e[1];for(;r.length<t;){let t=r.slice(0,1);t=[t[0][0],++n],r.unshift(t)}return r},i=t=>{let e=[o(10-t),o(10)],r=[e],n=e[0];for(;r.length<t;){let t=r.slice(0,1);t=[++n,t[0][1]],r.unshift(t)}return r},d=(e,d)=>{let s,u=!0;for(;!0===u;){let t=o(2);s=[l(d),i(d)][t],a=s,u=[...a].map(t=>t.toString()).some(t=>r.has(t)),1!=u||(s="")}var a;(t=>{for(let e=0;e<t.length;e++){let n=t[e][0],o=t[e][1];r.add([n,o].toString()),r.add([n+1,o+1].toString()),r.add([n+1,o].toString()),r.add([n+1,o-1].toString()),r.add([n,o-1].toString()),r.add([n,o+1].toString()),r.add([n-1,o-1].toString()),r.add([n-1,o+1].toString()),r.add([n-1,o].toString())}})(s),t[e]=n(d,s)};for(let t=0;t<e.length;t++)d(t,e[t]);return{placedShips:t,receiveAttack:e=>{const r=(e=>{let r=-1;for(let n=0;n<t.length;n++)t[n].shipCoords.includes(e)&&(r=n);return r})(e);if(-1!=r){let n=t[r].shipCoords.indexOf(e);return t[r].hit(n),[!0,t[r].getSunk(),r]}return[!1,!1,-1]},bufferCoords:r}}},function(t,e){t.exports=(t,e)=>{let r=[...Array(t)].map(t=>!1),n=[...e].map(t=>t.toString()),o=!1;return{getSunk:()=>o,hit:t=>{r[t]="hit",(t=>{o=t.every(t=>"hit"===t)})(r)},shipCoords:n}}}]);