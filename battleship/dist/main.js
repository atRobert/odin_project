!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){r(3)()},function(t,e,r){const n=r(2);t.exports=()=>{const t=[],e=[3,3,2,2,2,1,1],r=[],o=t=>Math.floor(Math.random()*Math.floor(t)),i=t=>{let e=[o(10),o(10-t)],r=[e],n=e[1];for(;r.length<t;){let t=r.slice(0,1);t=[t[0][0],++n],r.unshift(t)}return r},l=t=>{let e=[o(10-t),o(10)],r=[e],n=e[0];for(;r.length<t;){let t=r.slice(0,1);t=[++n,t[0][1]],r.unshift(t)}return r},s=e=>{let n=[...e].map(t=>t.toString()),o=t.some(t=>t.shipCoords.some(t=>n.includes(t))),i=r.some(t=>n.includes(t));return o||i},u=(e,u)=>{let c,d,f=!0,p=0,a=[i(u),l(u)];for(;!0===f&&p<50;)d=o(2),c=a[d],f=s(c),p++;console.log(c),(t=>{for(let e=0;e<t.length;e++){let n=t[e][0],o=t[e][1];r.push([n+1,o+1].toString()),r.push([n+1,o].toString()),r.push([n+1,o-1].toString()),r.push([n,o-1].toString()),r.push([n,o+1].toString()),r.push([n-1,o-1].toString()),r.push([n-1,o+1].toString()),r.push([n-1,o].toString())}})(c),t[e]=n(u,c)};for(let t=0;t<e.length;t++)u(t,e[t]);return{placedShips:t,receiveAttack:e=>{const r=(e=>{let r=-1;for(let n=0;n<t.length;n++)t[n].shipCoords.includes(e)&&(r=n);return r})(e);if(-1!=r){let n=t[r].shipCoords.indexOf(e);return t[r].hit(n),[!0,t[r].getSunk(),"hit!"]}return[!1,!1,"You Missed!"]},bufferCoords:r}}},function(t,e){t.exports=(t,e)=>{let r=[...Array(t)].map(t=>!1),n=[...e].map(t=>t.toString()),o=!1;return{getSunk:()=>o,hit:t=>{r[t]="hit",(t=>{o=t.every(t=>"hit"===t)})(r)},shipCoords:n}}},function(t,e,r){const n=r(1)();console.log(n.placedShips),console.log(n.bufferCoords);let o=document.getElementById("board-display");t.exports=()=>{for(let t=0;t<11;t++){let e=document.createElement("div");e.classList.add("row"),e.setAttribute("row",t);for(let r=0;r<11;r++){let i=document.createElement("div");i.classList.add("row"),i.setAttribute("row",t),i.setAttribute("col",r),i.style.cssText="height:50px;\n                                    width:50px;\n                                    border:1px solid black;\n                                    display:inline-block",i.textContent=`${t},${r}`,i.addEventListener("mouseenter",(function(t){n.receiveAttack(`${this.getAttribute("row")},${this.getAttribute("col")}`)[0]?(i.textContent="X",i.style.background="green"):(i.textContent="Miss",i.style.background="red")})),e.appendChild(i),o.appendChild(e)}}}}]);