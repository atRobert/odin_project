!function(e){var t={};function o(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,o),l.l=!0,l.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(n,l,function(t){return e[t]}.bind(null,l));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t,o){const n=o(2);e.exports=e=>{const t=[],o=[4,3,2,2,1,1,1],l=new Set,r=e=>Math.floor(Math.random()*Math.floor(e)),i=(e,t)=>{let o;o=t?t.split(","):[r(8),r(8-e)];let n=[o],l=o[1];for(;n.length<e;){let e=n.slice(0,1);e=[e[0][0],++l],n.unshift(e)}return n},d=(e,t)=>{let o;o=t?t.split(","):[r(7-e),r(7)];let n=[o],l=o[0];for(;n.length<e;){let e=n.slice(0,1);e=[++l,e[0][1]],n.unshift(e)}return n},s=(e,o,s)=>{let c,u=!0;if(s)console.log("ship info given"),1==s.horizontal?(console.log("ship is horizontal"),c=i(o,s.coord),t[e]=n(o,c)):(console.log("ship is vertical"),c=d(o,s.coords),t[e]=n(o,c));else{for(console.log("ship info not defined.");!0===u;){let e=r(2);c=[i(o),d(o)][e],a=c,u=[...a].map(e=>e.toString()).some(e=>l.has(e)),1!=u||(c="")}(e=>{for(let t=0;t<e.length;t++){let o=e[t][0],n=e[t][1];l.add([o,n].toString()),l.add([o+1,n+1].toString()),l.add([o+1,n].toString()),l.add([o+1,n-1].toString()),l.add([o,n-1].toString()),l.add([o,n+1].toString()),l.add([o-1,n-1].toString()),l.add([o-1,n+1].toString()),l.add([o-1,n].toString())}})(c),t[e]=n(o,c)}var a};for(let t=0;t<o.length;t++){let n;try{n=e[t],console.log(n)}catch{}s(t,o[t],n)}return console.log(t),{placedShips:t,receiveAttack:e=>{const o=(e=>{let o=-1;for(let n=0;n<t.length;n++)t[n].shipCoords.includes(e)&&(o=n);return o})(e);if(-1!=o){let n=t[o].shipCoords.indexOf(e);return t[o].hit(n),[!0,t[o].getSunk(),o]}return[!1,!1,-1]},bufferCoords:l,checkLost:()=>t.every(e=>1==e.getSunk())}}},function(e,t,o){const n=o(0),l=o(3),r=o(4);let i,d,s=document.getElementById("play"),c=r();function u(){document.getElementById("set-ship-board").innerHTML="",document.getElementById("set-ship-display").style.display="none",document.getElementById("board-display").style.display="block",console.log(c.getShipPoints()),document.getElementById("text").style.visibility="hidden",computerBoard=n(c.getShipPoints()),playerBoard=n(),l(playerBoard,computerBoard),document.getElementById("door-right").style.width="0",document.getElementById("door-left").style.width="0"}s.addEventListener("click",(function(e){document.getElementById("ships-placed").addEventListener("click",u),document.getElementById("text").style.visibility="hidden",this.style.visibility="hidden",this.style.opacity="0",document.getElementById("board-display").style.display="none",document.getElementById("door-right").style.width="0",document.getElementById("door-left").style.width="0"})),document.getElementById("reset").addEventListener("click",(function(e){document.getElementById("text").style.visibility="visible",document.getElementById("door-right").style.width="50vw",document.getElementById("door-left").style.width="50vw",setTimeout((function(){l(i,d),s.style.visibility="visible",s.style.opacity="1",document.getElementById("player-display").innerHTML="",document.getElementById("computer-display").innerHTML="",document.getElementById("winner-display").textContent="",i=n(),d=n()}),1200)}))},function(e,t){e.exports=(e,t)=>{let o=[...Array(e)].map(e=>!1),n=[...t].map(e=>e.toString()),l=!1;return{getSunk:()=>l,hit:e=>{o[e]="hit",(e=>{l=e.every(e=>"hit"===e)})(o)},shipCoords:n}}},function(e,t,o){o(0);e.exports=(e,t)=>{let o=document.getElementById("player-display"),n=document.getElementById("computer-display"),l=!0,r=[],i=!1;const d=e=>Math.floor(Math.random()*Math.floor(e)),s=()=>{l=!l},c=()=>{if(!l){let e=(()=>{let e=!1;for(;0==e;){let t=d(8),o=d(8);coords=`${t},${o}`,e=!r.includes(coords)}return r.push(coords),coords})(),o=t.receiveAttack(e),n=e.split(",")[0],i=e.split(",")[1],s=document.querySelector(`[owner="computer"][row="${n}"][col="${i}"]`);u(o,s,t,"B"),l||c()}},u=(e,t,o,n)=>{e[0]?(t.classList.add(n+e[2]),t.style.background="rgb(17, 244, 0)",e[1]&&((e=>{let t=document.getElementsByClassName(e);for(let e=0;e<t.length;e++)t[e].style.background="rgb(17, 84, 0)"})(n+e[2]),!o.checkLost()||(()=>{let e=1==l?"YOU WIN!":"YOU LOSE!";document.getElementById("winner-display").textContent=e,i=!0})()),s()):t.style.background="red",s()},a=e=>{let t=document.createElement("div");return t.classList.add("row"),t.style.cssText="height:40px;",t.setAttribute("row",e),t},p=(e,t)=>{let o=document.createElement("div");return o.classList.add("row"),o.setAttribute("row",e),o.setAttribute("col",t),o.style.cssText="height:40px;\n                                    width:40px;\n                                    background:rgba(3, 223, 252, 0.31);\n                                    border:1px solid black;\n                                    display:inline-block",o};(()=>{for(let t=0;t<8;t++){let n=a(t);for(let r=0;r<8;r++){let d=p(t,r);d.addEventListener("click",(function(t){if(l=!i){let t=e.receiveAttack(`${this.getAttribute("row")},${this.getAttribute("col")}`);this.removeEventListener("click",arguments.callee),u(t,d,e,"A"),c()}})),n.appendChild(d),o.appendChild(n)}}})(),(()=>{for(let e=0;e<8;e++){let t=a(e);for(let o=0;o<8;o++){let n=p(e,o);n.setAttribute("owner","computer"),n.setAttribute("boat","false"),t.appendChild(n)}n.appendChild(t)}})()}},function(e,t){e.exports=()=>{let e=[4,3,2,2,1,1,1],t=0,o=[],n=[],l=!0,r=!0;document.getElementById("flip").addEventListener("click",(function(o){l=!l,document.getElementById("set-ship-board").innerHTML="",console.log(e),c(e[t])}));const i=e=>{let t=document.createElement("div");return t.classList.add("row"),t.style.cssText="height:40px;",t.setAttribute("row",e),t},d=(l,i,d,s,u)=>{u?(l.addEventListener("mouseenter",(function(e){for(let e=s;e<s+i&&e<10;e++)console.log(e),console.log(document.querySelector(`[row="${d}"][col="${e}"][boat="false"]`).style.background="rgba(115, 16, 16, 0.66)")})),l.addEventListener("mouseleave",(function(e){for(let e=s;e<s+i;e++)console.log(e),console.log(document.querySelector(`[row="${d}"][col="${e}"][boat="false"]`).style.background="rgba(3, 223, 252, 0.31)")})),l.addEventListener("click",(function(l){let u=[],a=[];for(let e=s;e<s+i&&e<10;e++)a.push(document.querySelector(`[row="${d}"][col="${e}"][owner="computer"]`)),u.push(`${d},${e}`);if(a.every(e=>"false"==e.getAttribute("boat"))&&r){for(let e=0;e<a.length;e++){a[e].style.background="black",a[e].setAttribute("boat","true");let t=a[e],o=t.cloneNode(!0);t.parentNode.replaceChild(o,t)}u.every(e=>o.push(e)),n.push({coord:`${d},${s}`,horizontal:!0}),document.getElementById("set-ship-board").innerHTML="",console.log(e),console.log(n),6!=t||(r=!1),c(e[++t])}}))):(l.addEventListener("mouseenter",(function(e){for(let e=d;e<d+i&&e<10;e++)console.log(e),console.log(document.querySelector(`[row="${e}"][col="${s}"][boat="false"]`).style.background="rgba(115, 16, 16, 0.66)")})),l.addEventListener("mouseleave",(function(e){for(let e=d;e<d+i&&e<10;e++)console.log(e),console.log(document.querySelector(`[row="${e}"][col="${s}"][boat="false"]`).style.background="rgba(3, 223, 252, 0.31)")})),l.addEventListener("click",(function(l){let u=[],a=[];for(let e=d;e<d+i&&e<10;e++)a.push(document.querySelector(`[row="${e}"][col="${s}"][owner="computer"]`)),u.push(`${e},${s}`);if(a.every(e=>"false"==e.getAttribute("boat"))&&r){for(let e=0;e<a.length;e++){a[e].style.background="black",a[e].setAttribute("boat","true");let t=a[e],o=t.cloneNode(!0);t.parentNode.replaceChild(o,t)}u.every(e=>o.push(e)),n.push({coord:`${d},${s}`,horizontal:!1}),document.getElementById("set-ship-board").innerHTML="",console.log(n),6!=t||(r=!1),c(e[++t])}})))},s=(e,t)=>{let o=document.createElement("div");return o.classList.add("row"),o.setAttribute("row",e),o.setAttribute("col",t),o.style.cssText="height:40px;\n                                        width:40px;\n                                        background:rgba(3, 223, 252, 0.31);\n                                        border:1px solid black;\n                                        display:inline-block",o},c=e=>{let t=document.getElementById("set-ship-board");for(let n=0;n<8;n++){let r=i(n);for(let t=0;t<8;t++){let i=s(n,t);i.setAttribute("owner","computer"),o.includes(`${n},${t}`)?(i.style.background="black",i.setAttribute("boat","true")):(i.setAttribute("boat","false"),d(i,e,n,t,l)),r.appendChild(i)}t.appendChild(r)}};return c(e[t]),{getShipPoints:()=>{if(!r)return document.getElementById("set-ship-display").innerHTML="",n}}}}]);