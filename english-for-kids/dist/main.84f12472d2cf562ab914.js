(()=>{"use strict";var e,t,n,a,i,r={732:(e,t,n)=>{n.d(t,{G:()=>i});class a{constructor(e="div",t=[]){this.element=document.createElement(e),this.element.classList.add(...t)}removeAllChilds(){for(;this.element.firstChild;)this.element.lastChild&&this.element.removeChild(this.element.lastChild)}addChild(e="div",t=[],n=""){const a=document.createElement(e);a.classList.add(...t),a.innerHTML=n,this.element.appendChild(a)}show(){this.element.classList.remove("hidden")}hide(){this.element.classList.add("hidden")}}class i extends a{constructor(e,t=!0,n=!0){super("div",["popup-wrapper","hidden"]),this.coverElement=document.getElementById("cover"),this.bodyElement=document.body,this.popupTextContainer=new a("div",["popup-text-contaier"]),this.okButton=new a("div",["popup-ok-button"]),this.popupTextContainer.element.innerText=e,this.okButton.element.innerText="OK",this.removeCover=t,this.removeNotSrollable=n,document.body.appendChild(this.element),this.element.appendChild(this.popupTextContainer.element),this.element.appendChild(this.okButton.element)}show(){this.bodyElement.classList.add("notScrollable"),this.coverElement&&this.coverElement.classList.remove("hidden"),this.element.classList.remove("hidden"),this.okButton.element.addEventListener("click",(()=>{this.removeAllChilds(),document.body.removeChild(this.element),this.removeNotSrollable&&this.bodyElement.classList.remove("notScrollable"),this.removeCover&&this.coverElement&&this.coverElement.classList.add("hidden")}))}}},517:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>h});var a=n(598),i=n(832),r=n(137),s=n(401),o=n(447),d=n(162),c=n(445),l=n(549),g=n(701),u=e([r,a,c,l,i,o,d,s]);[r,a,c,l,i,o,d,s]=u.then?await u:u;const m=()=>{i.Z.switchOffMainContainerControls(),s.Z.switchOffAdminContainerControls(),i.Z.initMainContainerControls()},h={async mainRoute(){const e=document.querySelector(".burger-link_active");e&&e.classList.remove("burger-link_active"),l.Z.activeCategory={name:"",id:-1,description:""},l.Z.cards=[],l.Z.page="main",l.Z.cardsForCategories=await g.Z.getCardsForCategories(),d.Z.renderMainPage();const t=document.getElementById("burger-link-main");t&&t.classList.add("burger-link_active"),m()},async categoryRoute(){o.Z.renderGameCardsPage(),m()},async statisticsRoute(){document.getElementById("main-container").innerHTML="СТРАНИЦА СТАТИСТИКИ <br> НЕ ГОТОВА (",i.Z.switchOffMainContainerControls()},async adminRoute(){const e=document.querySelector(".burger-link_active");e&&e.classList.remove("burger-link_active"),l.Z.activeCategory={name:"",id:-1,description:""},l.Z.cards=[],l.Z.page="admin",l.Z.cardsForCategories=await g.Z.getCardsForCategories(),c.Z.renderAdminPage(),i.Z.switchOffMainContainerControls(),s.Z.switchOffAdminContainerControls(),s.Z.initAdminContainerControls()},async initControlls(){a.Z.initBurger(),r.Z.initSwitch()}}}))},401:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>s});var a=n(268),i=n(598),r=e([i]);i=(r.then?await r:r)[0];const s={adminContainer:document.getElementById("main-container"),initAdminContainerControls(){this.adminContainer=document.getElementById("main-container"),this.adminContainer.addEventListener("click",this.adminHandler)},switchOffAdminContainerControls(){this.adminContainer=document.getElementById("main-container"),this.adminContainer.removeEventListener("click",this.adminHandler)},adminHandler(e){e.preventDefault();const t=e.target;var n;t.classList.contains("btn-delete-category")&&(async e=>{await a.Z.deleteCategory(Number(e.dataset.id)),i.Z.initBurgerLinks(),window.location.hash=" ",window.location.hash="admin"})(t),t.classList.contains("btn-add-word-category")&&(n=t,console.log(`add word-${n.dataset.id}`)),t.classList.contains("btn-update-category")&&(e=>{document.getElementById(`input-category-${e.dataset.id}`).classList.add("input-active"),e.classList.toggle("hidden"),document.getElementById(`btnCatSave-${e.dataset.id}`).classList.toggle("hidden")})(t),t.classList.contains("btn-save-category")&&(async e=>{const t=document.getElementById(`input-category-${e.dataset.id}`);if(!t.value)return;t.classList.remove("input-active"),e.classList.toggle("hidden"),document.getElementById(`btnCatUpd-${e.dataset.id}`).classList.toggle("hidden");const n={id:Number(e.dataset.id),name:t.value,description:""};await a.Z.UpdateCategory(n.id,n),i.Z.initBurgerLinks()})(t),t.classList.contains("category-words")&&(e=>{console.log(`shows words of category-${e.dataset.id}`)})(t),t.classList.contains("new-category")&&console.log("create category")}}}))},598:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>c});var a=n(268),i=n(549),r=n(755),s=n(832),o=n(732),d=e([i,s]);[i,s]=d.then?await d:d;const c={burgerBtn:document.getElementById("burger-menu_button"),burgerMenu:document.getElementById("burger-menu"),burgerLinks:document.getElementById("burger-links"),coverElement:document.getElementById("cover"),bodyElement:document.getElementById("body"),adminPanel:document.getElementById("burger-link-admin"),login:document.getElementById("burger-link-login"),logout:document.getElementById("burger-link-logout"),reset:document.getElementById("burger-link-reset"),async initBurger(){this.burgerBtn=document.getElementById("burger-menu_button"),this.burgerMenu=document.getElementById("burger-menu"),this.coverElement=document.getElementById("cover"),this.bodyElement=document.getElementById("body"),this.burgerLinks=document.getElementById("burger-links");const e=await a.Z.getCategories();this.burgerLinks.innerHTML=r.Z.renderBurger(e,i.Z.authorized),this.adminPanel=document.getElementById("burger-link-admin"),this.login=document.getElementById("burger-link-login"),this.logout=document.getElementById("burger-link-logout"),this.reset=document.getElementById("burger-link-reset"),this.burgerBtn.addEventListener("click",(e=>this.burgerBtnHandler(e))),this.coverElement.addEventListener("click",this.handleBurger.bind(this)),this.burgerLinks.addEventListener("click",(e=>this.handleBurgerLinks(e)))},async initBurgerLinks(){const e=await a.Z.getCategories();this.burgerLinks.innerHTML=r.Z.renderBurger(e,i.Z.authorized)},burgerBtnHandler(e){e.preventDefault(),this.handleBurger()},handleBurger(){this.bodyElement.classList.toggle("notScrollable"),this.coverElement.classList.toggle("hidden"),this.burgerMenu.classList.toggle("burger-menu_active")},async handleBurgerLinks(e){e.preventDefault();const t=e.target;if(t.classList.contains("burger-link")&&!t.classList.contains("burger-link_active")){i.Z.activeGame=!1;const e=document.querySelector(".burger-link_active");!e||t.classList.contains("burger-link-login")||t.classList.contains("burger-link-logout")||t.classList.contains("burger-link-reset")||e.classList.remove("burger-link_active"),t.classList.contains("burger-link-login")||t.classList.contains("burger-link-logout")||t.classList.contains("burger-link-reset")||t.classList.add("burger-link_active"),"main"===t.dataset.type&&(i.Z.page="main",window.location.hash="main",this.handleBurger()),"category"===t.dataset.type&&(i.Z.page="category",i.Z.activeCategory=await a.Z.getCategoryById(Number(t.dataset.id)),i.Z.cards=await a.Z.getCardsOfCategoryById(Number(t.dataset.id)),window.location.hash=" ",window.location.hash="category",this.handleBurger()),"statistics"===t.dataset.type&&(i.Z.page="statistics",window.location.hash="statistics",this.handleBurger()),"login"===t.dataset.type&&this.handleLogin(),"logout"===t.dataset.type&&this.handleLogout(),"reset"===t.dataset.type&&(a.Z.resetBDToInitialState(),this.initBurgerLinks(),window.location.hash=" ",window.location.hash="main",this.handleBurger()),"admin"===t.dataset.type&&(i.Z.page="admin",window.location.hash="admin",this.handleBurger())}},handleLogout(){i.Z.authorized=!1,this.adminPanel.classList.toggle("hidden"),this.logout.classList.toggle("hidden"),this.login.classList.toggle("hidden"),this.reset.classList.toggle("hidden"),this.handleBurger(),i.Z.page="main",window.location.hash="main"},handleLogin(){s.Z.switchOffMainContainerControls();const e=document.createElement("div");e.innerHTML=r.Z.renderLoginForm(),this.bodyElement.append(e);const t=document.getElementById("btnOk"),n=document.getElementById("btnCancel"),a=document.getElementById("input-login"),d=document.getElementById("input-pass");this.burgerMenu.classList.toggle("burger-menu_active");const c=()=>{this.bodyElement.classList.toggle("notScrollable"),this.coverElement.classList.toggle("hidden"),e.remove(),s.Z.initMainContainerControls()};t.addEventListener("click",(e=>{if(e.preventDefault(),"admin"===a.value&&"admin"===d.value)return i.Z.authorized=!0,this.adminPanel.classList.toggle("hidden"),this.logout.classList.toggle("hidden"),this.login.classList.toggle("hidden"),this.reset.classList.toggle("hidden"),void c();new o.G("login and password are not correct",!1,!1).show()})),n.addEventListener("click",(e=>{e.preventDefault(),c()}))}}}))},832:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>o});var a=n(268),i=n(549),r=n(701),s=e([i]);i=(s.then?await s:s)[0];const o={mainContainer:document.getElementById("main-container"),initMainContainerControls(){this.mainContainer=document.getElementById("main-container"),this.mainContainer.addEventListener("click",this.mainHandler)},switchOffMainContainerControls(){this.mainContainer=document.getElementById("main-container"),this.mainContainer.removeEventListener("click",this.mainHandler)},mainHandler(e){e.preventDefault();const t=e.target;let n=t.closest(".main-card");n&&async function(e){const t=document.querySelector(".burger-link_active");t&&t.classList.remove("burger-link_active"),document.getElementById(`burger-link-${e.dataset.id}`).classList.add("burger-link_active"),i.Z.activeCategory=await a.Z.getCategoryById(Number(e.dataset.id)),i.Z.cards=await a.Z.getCardsOfCategoryById(Number(e.dataset.id)),i.Z.page="category",window.location.hash="category"}(n),n=t.closest(".card"),n&&"train"===i.Z.applicationMode&&async function(e){const t=e.closest(".card");t.classList.contains("translate")||e.classList.contains("rotate")||"train"!==i.Z.applicationMode||r.Z.playAudio(`${String(t.dataset.audiosrc)}`)}(e.target),n&&"game"===i.Z.applicationMode&&i.Z.activeGame&&function(e){const t=e.closest(".card"),n=document.getElementById("rating");if(t.dataset.word===i.Z.cardsForGame[i.Z.correctWordsCounter].word)if(t.classList.add("inactive"),i.Z.correctWordsCounter++,n.appendChild(r.Z.createDOMElement("div",["star-success"])),r.Z.playAudio("./assets/resource/control-audio/correct.mp3"),i.Z.correctWordsCounter>=i.Z.wordsCounter)0===i.Z.errorWordsCounter?r.Z.popup("win",i.Z.errorWordsCounter):r.Z.popup("lose",i.Z.errorWordsCounter),i.Z.initGameState(!1),document.getElementById("rating").innerHTML="",window.location.hash="main";else{const e=`${i.Z.cardsForGame[i.Z.correctWordsCounter].audio}`;setTimeout((()=>r.Z.playAudio(e)),500)}else t.classList.contains("inactive")||(i.Z.errorWordsCounter++,n.appendChild(r.Z.createDOMElement("div",["star-error"])),r.Z.playAudio("./assets/resource/control-audio/error.mp3"))}(e.target),t.classList.contains("rotate")&&"train"===i.Z.applicationMode&&async function(e){const t=e.closest(".card");t.classList.add("translate"),t.addEventListener("mouseleave",(()=>{t.classList.remove("translate"),t.removeEventListener("mouseleave",(()=>{t.classList.remove("translate")}))}))}(t),t.classList.contains("btn")&&"game"===i.Z.applicationMode&&(document.getElementById("rating").classList.remove("none"),t.classList.contains("repeat")||(i.Z.initGameState(),t.classList.add("repeat")),r.Z.playAudio(`${i.Z.cardsForGame[i.Z.correctWordsCounter].audio}`))}}}))},137:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>s});var a=n(549),i=n(598),r=e([a,i]);[a,i]=r.then?await r:r;const s={switchInput:document.getElementById("switch-input"),initSwitch(){this.switchInput=document.getElementById("switch-input"),this.switchInput.addEventListener("change",this.switchHandler.bind(this))},switchHandler(){i.Z.burgerMenu.classList.toggle("green"),this.switchInput.checked?a.Z.applicationMode="train":a.Z.applicationMode="game","main"!==a.Z.page&&"category"!==a.Z.page||(window.location.hash=" ",window.location.hash=a.Z.page)}}}))},303:(e,t,n)=>{n.a(e,(async e=>{var t=n(755),a=n(911),i=n(517),r=n(549),s=n(732),o=e([i,a,r]);[i,a,r]=o.then?await o:o,await r.Z.InitStore(),await t.Z.renderBaseTemplate(),a.Z.init(),i.Z.initControlls(),new s.G("Доброго дня! Закончу сегодня в 22:00 UTC. Спасибо)").show(),e()}),1)},268:(e,t,n)=>{n.d(t,{Z:()=>i});const a="https://efk-srv.herokuapp.com/api",i={async getCategories(){const e=await fetch(`${a}/categories/`);return await e.json()},async getCategoryById(e){const t=await fetch(`${a}/categories/${e}`);return await t.json()},async getCardsOfCategoryById(e){const t=await fetch(`${a}/cards/category/${e}`);return await t.json()},async getAllCards(){const e=await fetch(`${a}/cards/`);return await e.json()},async resetBDToInitialState(){await fetch(`${a}/reset/`,{method:"PUT"})},async deleteCategory(e){await fetch(`${a}/categories/${e}`,{method:"DELETE"})},async UpdateCategory(e,t){await fetch(`${a}/categories/${e}`,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})},updateStatistics(e){const t=`EFK-${e.word}`;localStorage.setItem(t,JSON.stringify(e))},getStatistics(){const e=[],t=Object.keys(localStorage);for(let n=0;n<t.length;n++)-1!==t[n].indexOf("EFK-",0)&&e.push(JSON.parse(localStorage.getItem(t[n])));return e},clearStistics(){let e;const t=Object.keys(localStorage);for(let n=0;n<t.length;n++)-1!==t[n].indexOf("EFK-",0)&&(e=Object.assign(Object.assign({},JSON.parse(localStorage.getItem(t[n]))),{trainClicks:0,gameCorrectClicks:0,gameErrorClicks:0,gameCorrectPercent:0}),localStorage.setItem(t[n],JSON.stringify(e)))},deleteStistics(){const e=Object.keys(localStorage);for(let t=0;t<e.length;t++)-1!==e[t].indexOf("EFK-",0)&&localStorage.removeItem(e[t])},initStatistics(e){let t;this.deleteStistics();for(let n=0;n<e.length;n++)t=`EFK-${e[n].word}`,localStorage.setItem(t,JSON.stringify(e[n]))}}},445:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>s});var a=n(549),i=n(755),r=e([a]);a=(r.then?await r:r)[0];const s={renderAdminPage(){document.getElementById("main-container").innerHTML=i.Z.renderCardsForAdminCategoryPage(a.Z.cardsForCategories)}}}))},447:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>s});var a=n(549),i=n(755),r=e([a]);a=(r.then?await r:r)[0];const s={renderGameCardsPage(){document.getElementById("main-container").innerHTML=i.Z.renderCardsForGameCardsPage(a.Z.cards,a.Z.applicationMode)}}}))},162:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>s});var a=n(549),i=n(755),r=e([a]);a=(r.then?await r:r)[0];const s={renderMainPage(){document.getElementById("main-container").innerHTML=i.Z.renderCardsForMainCategoryPage(a.Z.cardsForCategories,a.Z.applicationMode)}}}))},911:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>s});var a=n(517),i=e([a]);function r(){const e=function(){const e=window.location.hash?window.location.hash.slice(1):"",[t]=e.split("/");return t}();e&&("main"===e&&a.Z.mainRoute(),"category"===e&&a.Z.categoryRoute(),"statistics"===e&&a.Z.statisticsRoute(),"admin"===e&&a.Z.adminRoute())}a=(i.then?await i:i)[0];const s={async init(){window.addEventListener("hashchange",r),window.location.hash="main",r()}}}))},549:(e,t,n)=>{n.a(e,(async e=>{n.d(t,{Z:()=>r});var a=n(268),i=n(701);const r={categories:await a.Z.getCategories(),activeCategory:{name:"",id:-1,description:""},cards:[],cardsForCategories:[],page:"main",applicationMode:"train",statistics:[],gameErrors:0,cardsForGame:[],wordsCounter:0,correctWordsCounter:0,errorWordsCounter:0,activeGame:!1,authorized:!1,async InitStore(){this.categories=await a.Z.getCategories(),[this.activeCategory]=this.categories,this.cards=await a.Z.getCardsOfCategoryById(this.activeCategory.id),this.cardsForGame=this.cards.slice(),this.cardsForCategories=await i.Z.getCardsForCategories(),this.page="main",this.applicationMode="train"},initGameState(e=!0){this.gameErrors=0,this.cardsForGame=this.cards.slice(),this.cardsForGame=i.Z.shuffle(this.cardsForGame),this.wordsCounter=this.cardsForGame.length,this.correctWordsCounter=0,this.errorWordsCounter=0,this.activeGame=e}};e()}),1)},701:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(268);const i={async initStatistics(){const e=[],t=await a.Z.getAllCards(),n={word:"",translation:"",categoryId:-1,trainClicks:0,gameCorrectClicks:0,gameErrorClicks:0,gameCorrectPercent:0};for(let a=0;a<t.length;a++)n.word=t[a].word,n.translation=t[a].translation,n.categoryId=t[a].categoryId,e.push(n);return e},async getCardsForCategories(){const e=[];let t;const n=await a.Z.getCategories();for(let i=0;i<n.length;i++)t=await a.Z.getCardsOfCategoryById(n[i].id),t.length>0?e[i]=Object.assign(Object.assign({},n[i]),{image:t[0].image,words:t.length}):e[i]=Object.assign(Object.assign({},n[i]),{image:"",words:0});return e},playAudio(e){const t=new Audio;t.src=e,t.currentTime=0,t.play()},shuffle(e){let t;for(let n=e.length-1;n>0;n--)t=Math.floor(Math.random()*(n+1)),[e[n],e[t]]=[e[t],e[n]];return e},createDOMElement(e="div",t=[],n=""){const a=document.createElement(e);return a.classList.add(...t),a.innerHTML=n,a},popup(e,t){let n,a,i;"win"===e?(n="./assets/resource/control-audio/win.mp3",i="./assets/resource/control-img/success.jpg",a="Win!!!"):(n="./assets/resource/control-audio/failure.mp3",i="./assets/resource/control-img/failure.jpg",a=`Lose...(${t} errors)`);const r=`\n      <div>${a}</div>\n      <img src="${i}" alt="game result">\n    `,s=document.getElementById("body"),o=document.getElementById("cover"),d=this.createDOMElement("div",["popup"],r);s.append(d),this.playAudio(n),s.classList.toggle("notScrollable"),o.classList.toggle("hidden"),setTimeout((()=>{s.classList.toggle("notScrollable"),o.classList.toggle("hidden"),s.removeChild(d)}),3e3)}}},755:(e,t,n)=>{n.d(t,{Z:()=>a});const a={async renderBaseTemplate(){document.getElementById("body").innerHTML='\n    <div class="wrapper">\n      <header class="header">\n\n        <h1 id="invisible" class = "invisible">English for kids</h1>\n\n        <nav id="burger-menu" class="burger-menu green">\n          <a href id="burger-menu_button" class="burger-menu_button">\n            <span class="burger-menu_lines"></span>\n          </a>\n          <ul id="burger-links" class="burger-links green">\n          </ul>\n        </nav>\n\n        <div class="switch-container" id="switch-container">\n          <label for="switch-input" class="switch">\n            <input\n              id = "switch-input"\n              class="switch-input"\n              type="checkbox"\n              checked\n            >\n            <span id="switch-label" class="switch-label" data-on="train" data-off="play"></span>\n            <span id="switch-handle" class="switch-handle"></span>\n          </label>\n        </div>\n      </header>\n      <div id="main-container" class="main-container">\n        <div id="rating" class="rating none"> </div>\n        \n        ТУТ БУДУТ КАРТОЧКИ\n        <br>\n        ДО КОНЦА КРОССЧЕКА ПОСТАРАЮСЬ ДОДЕЛАТЬ ФУНКЦИОНАЛ\n\n      </div>\n      <footer class="footer">\n        <a href="https://rs.school/js/" "rsschool-href"> \n          <img class="rsschool-logo" src="./assets/resource/control-img/rs_school_js.svg" alt="School logo">\n        </a>\n        <a href="https://github.com/drunich-z/" target="_blank"> \n            <img class="github-logo" src="./assets/resource/control-img/github-logo.png" alt="Git logo">\n        </a>\n        <div id="student" class="student">\n          drunich-z, 2021\n        </div>\n\n      </footer>\n      <div id="cover" class="cover hidden"></div>\n    </div>\n    '},renderBurger(e,t=!1){let n="";n=`<a id="burger-link-main" href="#main" class="burger-link \n      ${t?"":"burger-link_active"}" data-type="main">MAIN</a>\n    `;for(let t=0;t<e.length;t++)n+=`<a id="burger-link-${e[t].id}" href="#category"class="burger-link" data-type="category" data-id="${e[t].id}"data-link="${e[t].name}">${e[t].name}</a>`;return n+='<a href="#statistics" class="burger-link" data-type="statistics" data-link="statistics">STATISTICS</a>',n+=`<a id="burger-link-login" href="#login" class="burger-link burger-link-login \n      ${t?"hidden":""}" data-type="login" data-link="login">LOGIN</a>\n    `,n+=`<a id="burger-link-logout" href="#logout" class="burger-link burger-link-logout \n      ${t?"":"hidden"}" data-type="logout" data-link="logout">LOGOUT</a>\n    `,n+=`<a id="burger-link-admin" href="#admin"class="burger-link burger-link-admin \n      ${t?"":"hidden burger-link_active"}" data-type="admin" data-link="admin">ADMIN PANEL</a>\n    `,n+=`<a id="burger-link-reset" href="#" class="burger-link burger-link-reset\n      ${t?"":"hidden"}" data-type="reset" data-link="reset">RESET TO INITIAL STATE</a>\n    `,n},renderCardsForGameCardsPage(e,t="train"){const n="train"===t?"":"none",a="train"===t?"":"card-cover";let i='<div id="rating" class="rating none"></div>';for(let t=0;t<e.length;t++)i+=`\n        <div class="card-container">\n          <div id="card-${e[t].word}" \n               class="card ${a}" \n               data-word=${e[t].word}\n               data-audiosrc=${e[t].audio}>\n            <div class="front" style="background-image: url('${e[t].image}')">\n              <div class="card-header ${n}">${e[t].word}</div>\n\n            </div>\n            <div class="back ${n}" style="background-image: url('${e[t].image}')">\n              <div class="card-header ${n}">${e[t].translation}</div>\n            </div>\n            <div class="rotate ${n}" \n                 style="background-image: url('./assets/resource/control-img/rotate.svg')"\n                 data-word="${e[t].word}">\n            </div>\n          </div>\n        </div>\n      `;return i+=`\n      <div id="btns" class="btns"> \n        <button id="button-start" \n                class="btn ${"train"===t?"none":""}"> \n          Start game\n        </button>\n              \n      </div>\n      `,i},renderCardsForMainCategoryPage(e,t="train"){const n="train"===t?"green":"";let a="";for(let t=0;t<e.length;t++)a+=`\n      <a href="#category" class="main-card ${n}" \n                          data-category="${e[t].name}" \n                          data-id="${e[t].id}">\n        <img src="${e[t].image}" alt="category-picture" class="pict">\n        ${e[t].name}\n      </a>\n      `;return a},renderCardsForAdminCategoryPage(e){let t="";for(let n=0;n<e.length;n++)t+=`\n      <div id="admin-category-card-${e[n].id}" class="admin-category-card" data-id="${e[n].id}">\n        <div class="input-category-container">\n          <label id="label-word" for="input-category"></label>\n          <input id="input-category-${e[n].id}" \n                 name="category-${e[n].id}" \n                 type="text" \n                 class="input-category" \n                 value="${e[n].name}" >\n        </div>\n        <a href="#" class="category-words" data-id="${e[n].id}">words: ${e[n].words}</a>\n        <div class="category-btn-container">\n          <button id="btnCatUpd-${e[n].id}"\n                  class="btn-update-category   \n                  category-btn" data-id="${e[n].id}">Update</button>\n          <button id="btnCatSave-${e[n].id}"\n                  class="btn-save-category   \n                  category-btn hidden" data-id="${e[n].id}">Save</button>\n          <button class="btn-add-word-category \n                  category-btn" data-id="${e[n].id}">Add word</button>\n          <button class="btn-delete-category \n                  category-btn" data-id="${e[n].id}">Delete</button>\n        </div>\n      </div>\n      `;return t+='\n      <div class="admin-category-card">\n        <h3>Create new category</h3>\n        <img class="new-category" src="./assets/resource/control-img/plus.png" alt="new category">\n      </div>\n    ',t},renderLoginForm:()=>'\n      <form id="form-login" action="submit" class="form-login">\n      <div class="login-header">LOGIN  (admin/admin is correct)</div>\n      <div class="login-row">\n        <label id="label-login" for="input-login"></label>\n        <input name="input-login" id="input-login" type="text" class="input-login" placeholder="LOGIN">\n      </div>\n      <div class="login-row">\n        <label id="label-login" for="input-pass"></label>\n        <input name="input-pass" id="input-pass" type="password" class="input-pass" placeholder="PASSWORD">\n      </div>\n      <div class="login-footer">\n        <button id="btnCancel" class="btn-cancel">Cancel</button>\n        <button id="btnOk" class="btn-ok">Ok</button>\n      </div>\n    </form>\n    '}}},s={};function o(e){var t=s[e];if(void 0!==t)return t.exports;var n=s[e]={exports:{}};return r[e](n,n.exports,o),n.exports}e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},a=e=>!--e.r&&e(),i=(e,t)=>e?e.push(t):a(t),o.a=(r,s,o)=>{var d,c,l,g=o&&[],u=r.exports,m=!0,h=!1,y=(t,n,a)=>{h||(h=!0,n.r+=t.length,t.map(((t,i)=>t[e](n,a))),h=!1)},p=new Promise(((e,t)=>{l=t,c=()=>(e(u),n(g),g=0)}));p[t]=u,p[e]=(e,t)=>{if(m)return a(e);d&&y(d,e,t),i(g,e),p.catch(t)},r.exports=p,s((r=>{if(!r)return c();var s,o;d=(r=>r.map((r=>{if(null!==r&&"object"==typeof r){if(r[e])return r;if(r.then){var s=[];r.then((e=>{o[t]=e,n(s),s=0}));var o={[e]:(e,t)=>(i(s,e),r.catch(t))};return o}}return{[e]:e=>a(e),[t]:r}})))(r);var l=new Promise(((e,n)=>{(s=()=>e(o=d.map((e=>e[t])))).r=0,y(d,s,n)}));return s.r?l:o})).then(c,l),m=!1},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o(303)})();