(()=>{"use strict";var e,t,a,n,r,s={517:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>l});var n=a(598),r=a(832),s=a(137),i=a(648),o=a(435),c=a(549),d=e([r,s,n,i,o,c]);[r,s,n,i,o,c]=d.then?await d:d;const l={async mainRoute(){const e=document.querySelector(".burger-link_active");e&&e.classList.remove("burger-link_active"),c.Z.activeCategory={name:"",id:0},c.Z.cards=[],c.Z.page="main",o.Z.renderMainPage(),document.getElementById("burger-link-main").classList.add("burger-link_active")},async categoryRoute(){i.Z.renderCategoryPage()},async statisticsRoute(){document.getElementById("main-container").innerHTML="СТРАНИЦА СТАТИСТИКИ <br> ЕЩЁ ДОДЕЛЫВАЮ ("},async initControlls(){n.Z.initBurger(),s.Z.initSwitch(),r.Z.initMainContainerControls()}}}))},598:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>o});var n=a(268),r=a(549),s=a(755),i=e([r]);r=(i.then?await i:i)[0];const o={burgerBtn:document.getElementById("burger-menu_button"),burgerMenu:document.getElementById("burger-menu"),burgerLinks:document.getElementById("burger-links"),coverElement:document.getElementById("cover"),bodyElement:document.getElementById("body"),async initBurger(){this.burgerBtn=document.getElementById("burger-menu_button"),this.burgerMenu=document.getElementById("burger-menu"),this.coverElement=document.getElementById("cover"),this.bodyElement=document.getElementById("body"),this.burgerLinks=document.getElementById("burger-links");const e=await n.Z.getCategories();this.burgerLinks.innerHTML=s.Z.renderBurger(e),this.burgerBtn.addEventListener("click",(e=>this.burgerBtnHandler(e))),this.coverElement.addEventListener("click",this.handleBurger.bind(this)),this.burgerLinks.addEventListener("click",(e=>this.handleBurgerLinks(e)))},burgerBtnHandler(e){e.preventDefault(),this.handleBurger()},handleBurger(){this.bodyElement.classList.toggle("notScrollable"),this.coverElement.classList.toggle("hidden"),this.burgerMenu.classList.toggle("burger-menu_active")},async handleBurgerLinks(e){e.preventDefault();const t=e.target;if(t.classList.contains("burger-link")&&!t.classList.contains("burger-link_active")){const e=document.querySelector(".burger-link_active");e&&e.classList.remove("burger-link_active"),t.classList.add("burger-link_active"),"main"===t.dataset.type&&(r.Z.page="main",window.location.hash="main",this.handleBurger()),"category"===t.dataset.type&&(r.Z.page="category",r.Z.activeCategory.name=t.dataset.link,r.Z.cards=await n.Z.getCardsOfCategory(r.Z.activeCategory.name),window.location.hash=" ",window.location.hash="category",this.handleBurger()),"statistics"===t.dataset.type&&(r.Z.page="statistics",window.location.hash="statistics",this.handleBurger())}}}}))},832:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>o});var n=a(268),r=a(549),s=a(701),i=e([r]);r=(i.then?await i:i)[0];const o={mainContainer:document.getElementById("main-container"),async initMainContainerControls(){this.mainContainer=document.getElementById("main-container"),this.mainContainer.addEventListener("click",(e=>this.mainHandler(e)))},async mainHandler(e){e.preventDefault();const t=e.target;let a=t.closest(".main-card");a&&async function(e){const t=document.querySelector(".burger-link_active");t&&t.classList.remove("burger-link_active"),document.getElementById(`burger-link-${e.dataset.id}`).classList.add("burger-link_active"),r.Z.activeCategory={name:String(e.dataset.category),id:Number(e.dataset.id)},r.Z.cards=await n.Z.getCardsOfCategory(String(e.dataset.category)),r.Z.page="category",window.location.hash="category"}(a),a=t.closest(".card"),a&&"train"===r.Z.applicationMode&&async function(e){const t=e.closest(".card");t.classList.contains("translate")||e.classList.contains("rotate")||"train"!==r.Z.applicationMode||s.Z.playAudio(`./assets/resource/${String(t.dataset.audiosrc)}`)}(e.target),a&&"game"===r.Z.applicationMode&&r.Z.activeGame&&async function(e){const t=e.closest(".card"),a=document.getElementById("rating");if(t.dataset.word===r.Z.cardsForGame[r.Z.correctWordsCounter].word)if(t.classList.add("inactive"),r.Z.correctWordsCounter++,a.appendChild(s.Z.createDOMElement("div",["star-success"])),s.Z.playAudio("./assets/resource/control-audio/correct.mp3"),r.Z.correctWordsCounter>=r.Z.wordsCounter)0===r.Z.errorWordsCounter?s.Z.popup("win",r.Z.errorWordsCounter):s.Z.popup("lose",r.Z.errorWordsCounter),r.Z.initGameState(!1),document.getElementById("rating").innerHTML="",window.location.hash="main";else{const e=`./assets/resource/${r.Z.cardsForGame[r.Z.correctWordsCounter].audio}`;setTimeout((()=>s.Z.playAudio(e)),500)}else t.classList.contains("inactive")||(r.Z.errorWordsCounter++,a.appendChild(s.Z.createDOMElement("div",["star-error"])),s.Z.playAudio("./assets/resource/control-audio/error.mp3"))}(e.target),t.classList.contains("rotate")&&"train"===r.Z.applicationMode&&async function(e){const t=e.closest(".card");t.classList.add("translate"),t.addEventListener("mouseleave",(()=>{t.classList.remove("translate"),t.removeEventListener("mouseleave",(()=>{t.classList.remove("translate")}))}))}(t),t.classList.contains("btn")&&"game"===r.Z.applicationMode&&(document.getElementById("rating").classList.remove("none"),t.classList.contains("repeat")||(r.Z.initGameState(),t.classList.add("repeat")),s.Z.playAudio(`./assets/resource/${r.Z.cardsForGame[r.Z.correctWordsCounter].audio}`))}}}))},137:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>i});var n=a(549),r=a(598),s=e([n,r]);[n,r]=s.then?await s:s;const i={switchInput:document.getElementById("switch-input"),initSwitch(){this.switchInput=document.getElementById("switch-input"),this.switchInput.addEventListener("change",this.switchHandler.bind(this))},switchHandler(){r.Z.burgerMenu.classList.toggle("green"),this.switchInput.checked?n.Z.applicationMode="train":n.Z.applicationMode="game","main"!==n.Z.page&&"category"!==n.Z.page||(window.location.hash=" ",window.location.hash=n.Z.page)}}}))},303:(e,t,a)=>{a.a(e,(async e=>{var t=a(755),n=a(911),r=a(517),s=a(549),i=e([r,n,s]);[r,n,s]=i.then?await i:i,await s.Z.tempInitStore(),await t.Z.renderBaseTemplate(),n.Z.init(),r.Z.initControlls(),e()}),1)},268:(e,t,a)=>{a.d(t,{Z:()=>r});const n="./assets/resource/data.json",r={async getCategories(){const e=await fetch(n),[t]=await e.json();return t.map((e=>({id:t.indexOf(e),name:e})))},async getCardsOfCategory(e){const t=await fetch(n),[a,...r]=await t.json();return r[a.indexOf(e)].filter((t=>t.category===e)).map((t=>({word:t.word,translation:t.translation,image:t.image,audio:t.audioSrc,category:{name:t.category,id:a.indexOf(e)}})))},async getAllCards(){const e=await fetch(n),[t,...a]=await e.json();return a},updateStatistics(e){const t=`EFK-${e.word}`;localStorage.setItem(t,JSON.stringify(e))},getStatistics(){const e=[],t=Object.keys(localStorage);for(let a=0;a<t.length;a++)-1!==t[a].indexOf("EFK-",0)&&e.push(JSON.parse(localStorage.getItem(t[a])));return e},clearStistics(){let e;const t=Object.keys(localStorage);for(let a=0;a<t.length;a++)-1!==t[a].indexOf("EFK-",0)&&(e=Object.assign(Object.assign({},JSON.parse(localStorage.getItem(t[a]))),{trainClicks:0,gameCorrectClicks:0,gameErrorClicks:0,gameCorrectPercent:0}),localStorage.setItem(t[a],JSON.stringify(e)))},deleteStistics(){const e=Object.keys(localStorage);for(let t=0;t<e.length;t++)-1!==e[t].indexOf("EFK-",0)&&localStorage.removeItem(e[t])},initStatistics(e){let t;this.deleteStistics();for(let a=0;a<e.length;a++)t=`EFK-${e[a].word}`,localStorage.setItem(t,JSON.stringify(e[a]))}}},648:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>i});var n=a(549),r=a(755),s=e([n]);n=(s.then?await s:s)[0];const i={renderCategoryPage(){document.getElementById("main-container").innerHTML=r.Z.renderCardsForCategoryPage(n.Z.cards,n.Z.applicationMode)}}}))},435:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>i});var n=a(549),r=a(755),s=e([n]);n=(s.then?await s:s)[0];const i={renderMainPage(){document.getElementById("main-container").innerHTML=r.Z.renderCardsForMainPage(n.Z.cardsForMainPage,n.Z.applicationMode)}}}))},911:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>i});var n=a(517),r=e([n]);function s(){const e=function(){const e=window.location.hash?window.location.hash.slice(1):"",[t]=e.split("/");return t}();e&&("main"===e&&n.Z.mainRoute(),"category"===e&&n.Z.categoryRoute(),"statistics"===e&&n.Z.statisticsRoute())}n=(r.then?await r:r)[0];const i={async init(){window.addEventListener("hashchange",s),window.location.hash="main",s()}}}))},549:(e,t,a)=>{a.a(e,(async e=>{a.d(t,{Z:()=>s});var n=a(268),r=a(701);const s={categories:await n.Z.getCategories(),activeCategory:{name:"",id:-1},cards:[],cardsForMainPage:[],page:"main",applicationMode:"train",statistics:[],gameErrors:0,cardsForGame:[],wordsCounter:0,correctWordsCounter:0,errorWordsCounter:0,activeGame:!1,async statInit(){const e=n.Z.getStatistics();0===e.length?this.statistics=await r.Z.initStatistics():this.statistics=e},async tempInitStore(){this.categories=await n.Z.getCategories(),[this.activeCategory]=this.categories,this.cards=await n.Z.getCardsOfCategory(this.activeCategory.name),this.cardsForGame=this.cards.slice(),this.cardsForMainPage=await r.Z.getFirstCardOfEachCategory(),this.page="main",this.applicationMode="train"},initGameState(e=!0){this.gameErrors=0,this.cardsForGame=this.cards.slice(),this.cardsForGame=r.Z.shuffle(this.cardsForGame),this.wordsCounter=this.cardsForGame.length,this.correctWordsCounter=0,this.errorWordsCounter=0,this.activeGame=e}};e()}),1)},701:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(268);const r={async initStatistics(){const e=[],t=await n.Z.getAllCards(),a={word:"",translation:"",category:{name:"",id:0},trainClicks:0,gameCorrectClicks:0,gameErrorClicks:0,gameCorrectPercent:0};for(let n=0;n<t.length;n++)a.word=t[n].word,a.translation=t[n].translation,a.category=t[n].category,e.push(a);return e},async getFirstCardOfEachCategory(){const e=[],t=await n.Z.getCategories();return[e[0]]=await n.Z.getCardsOfCategory(t[0].name),[e[1]]=await n.Z.getCardsOfCategory(t[1].name),[e[2]]=await n.Z.getCardsOfCategory(t[2].name),[e[3]]=await n.Z.getCardsOfCategory(t[3].name),[e[4]]=await n.Z.getCardsOfCategory(t[4].name),[e[5]]=await n.Z.getCardsOfCategory(t[5].name),[e[6]]=await n.Z.getCardsOfCategory(t[6].name),[e[7]]=await n.Z.getCardsOfCategory(t[7].name),e},playAudio(e){const t=new Audio;t.src=e,t.currentTime=0,t.play()},shuffle(e){let t;for(let a=e.length-1;a>0;a--)t=Math.floor(Math.random()*(a+1)),[e[a],e[t]]=[e[t],e[a]];return e},createDOMElement(e="div",t=[],a=""){const n=document.createElement(e);return n.classList.add(...t),n.innerHTML=a,n},popup(e,t){let a,n,r;"win"===e?(a="./assets/resource/control-audio/win.mp3",r="./assets/resource/control-img/success.jpg",n="Win!!!"):(a="./assets/resource/control-audio/failure.mp3",r="./assets/resource/control-img/failure.jpg",n=`Lose...(${t} errors)`);const s=`\n      <div>${n}</div>\n      <img src="${r}" alt="game result">\n    `,i=document.getElementById("body"),o=document.getElementById("cover"),c=this.createDOMElement("div",["popup"],s);i.append(c),this.playAudio(a),i.classList.toggle("notScrollable"),o.classList.toggle("hidden"),setTimeout((()=>{i.classList.toggle("notScrollable"),o.classList.toggle("hidden"),i.removeChild(c)}),3e3)}}},755:(e,t,a)=>{a.d(t,{Z:()=>n});const n={async renderBaseTemplate(){document.getElementById("body").innerHTML='\n    <div class="wrapper">\n      <header class="header">\n\n        <h1 id="invisible" class = "invisible">English for kids</h1>\n\n        <nav id="burger-menu" class="burger-menu green">\n          <a href id="burger-menu_button" class="burger-menu_button">\n            <span class="burger-menu_lines"></span>\n          </a>\n          <ul id="burger-links" class="burger-links green">\n          </ul>\n        </nav>\n\n        <div class="switch-container" id="switch-container">\n          <label for="switch-input" class="switch">\n            <input\n              id = "switch-input"\n              class="switch-input"\n              type="checkbox"\n              checked\n            >\n            <span id="switch-label" class="switch-label" data-on="train" data-off="play"></span>\n            <span id="switch-handle" class="switch-handle"></span>\n          </label>\n        </div>\n      </header>\n      <div id="main-container" class="main-container">\n        <div id="rating" class="rating none"> </div>\n        \n        ТУТ БУДУТ КАРТОЧКИ\n        <br>\n        ДО КОНЦА КРОССЧЕКА ПОСТАРАЮСЬ ДОДЕЛАТЬ ФУНКЦИОНАЛ\n\n      </div>\n      <footer class="footer">\n        <a href="https://rs.school/js/" "rsschool-href"> \n          <img class="rsschool-logo" src="./assets/resource/control-img/rs_school_js.svg" alt="School logo">\n        </a>\n        <a href="https://github.com/drunich-z/" target="_blank"> \n            <img class="github-logo" src="./assets/resource/control-img/github-logo.png" alt="Git logo">\n        </a>\n        <div id="student" class="student">\n          drunich-z, 2021\n        </div>\n\n      </footer>\n      <div id="cover" class="cover hidden"></div>\n    </div>\n    '},renderBurger(e){let t="";t='<a id="burger-link-main" href="#main" class="burger-link burger-link_active" data-type="main">MAIN</a>';for(let a=0;a<e.length;a++)t+=`<a id="burger-link-${e[a].id}" href="#category"class="burger-link" data-type="category" data-id="${e[a].id}"data-link="${e[a].name}">${e[a].name}</a>`;return t+='<a href="#statistics" class="burger-link" data-type="statistics" data-link="statistics">STATISTICS</a>',t},renderCardsForCategoryPage(e,t="train"){const a="train"===t?"":"none",n="train"===t?"":"card-cover";let r='<div id="rating" class="rating none"></div>';for(let t=0;t<e.length;t++)r+=`\n        <div class="card-container">\n          <div id="card-${e[t].word}" \n               class="card ${n}" \n               data-word=${e[t].word}\n               data-audiosrc=${e[t].audio}>\n            <div class="front" style="background-image: url('./assets/resource/${e[t].image}')">\n              <div class="card-header ${a}">${e[t].word}</div>\n\n            </div>\n            <div class="back ${a}" style="background-image: url('./assets/resource/${e[t].image}')">\n              <div class="card-header ${a}">${e[t].translation}</div>\n            </div>\n            <div class="rotate ${a}" \n                 style="background-image: url('./assets/resource/control-img/rotate.svg')"\n                 data-word="${e[t].word}">\n            </div>\n          </div>\n        </div>\n      `;return r+=`\n      <div id="btns" class="btns"> \n        <button id="button-start" \n                class="btn ${"train"===t?"none":""}"> \n          Start game\n        </button>\n              \n      </div>\n      `,r},renderCardsForMainPage(e,t="train"){const a="train"===t?"green":"";let n="";for(let t=0;t<e.length;t++)n+=`\n      <a href="#category" class="main-card ${a}" \n                          data-category="${e[t].category.name}" \n                          data-id="${e[t].category.id}">\n        <img src="./assets/resource/${e[t].image}" alt="category-picture" class="pict">\n        ${e[t].category.name}\n      </a>\n      `;return n}}}},i={};function o(e){var t=i[e];if(void 0!==t)return t.exports;var a=i[e]={exports:{}};return s[e](a,a.exports,o),a.exports}e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",a=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},n=e=>!--e.r&&e(),r=(e,t)=>e?e.push(t):n(t),o.a=(s,i,o)=>{var c,d,l,g=o&&[],u=s.exports,m=!0,h=!1,y=(t,a,n)=>{h||(h=!0,a.r+=t.length,t.map(((t,r)=>t[e](a,n))),h=!1)},p=new Promise(((e,t)=>{l=t,d=()=>(e(u),a(g),g=0)}));p[t]=u,p[e]=(e,t)=>{if(m)return n(e);c&&y(c,e,t),r(g,e),p.catch(t)},s.exports=p,i((s=>{if(!s)return d();var i,o;c=(s=>s.map((s=>{if(null!==s&&"object"==typeof s){if(s[e])return s;if(s.then){var i=[];s.then((e=>{o[t]=e,a(i),i=0}));var o={[e]:(e,t)=>(r(i,e),s.catch(t))};return o}}return{[e]:e=>n(e),[t]:s}})))(s);var l=new Promise(((e,a)=>{(i=()=>e(o=c.map((e=>e[t])))).r=0,y(c,i,a)}));return i.r?l:o})).then(d,l),m=!1},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o(303)})();