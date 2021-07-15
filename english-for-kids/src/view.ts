export default {

  async renderBaseTemplate(): Promise<void> {
    const html = `
    <div class="wrapper">
      <header class="header">

        <h1 id="invisible" class = "invisible">English for kids</h1>

        <nav id="burger-menu" class="burger-menu green">
          <a href id="burger-menu_button" class="burger-menu_button">
            <span class="burger-menu_lines"></span>
          </a>
          <ul id="burger-links" class="burger-links green">
          </ul>
        </nav>

        <div class="switch-container" id="switch-container">
          <label for="switch-input" class="switch">
            <input
              id = "switch-input"
              class="switch-input"
              type="checkbox"
              checked
            >
            <span id="switch-label" class="switch-label" data-on="train" data-off="play"></span>
            <span id="switch-handle" class="switch-handle"></span>
          </label>
        </div>
      </header>
      <div id="main-container" class="main-container">
        <div id="rating" class="rating none"> </div>
        
        ТУТ БУДУТ КАРТОЧКИ
        <br>
        ДО КОНЦА КРОССЧЕКА ПОСТАРАЮСЬ ДОДЕЛАТЬ ФУНКЦИОНАЛ

      </div>
      <footer class="footer">
        <a href="https://rs.school/js/" "rsschool-href"> 
          <img class="rsschool-logo" src="./assets/resource/control-img/rs_school_js.svg" alt="School logo">
        </a>
        <a href="https://github.com/drunich-z/" target="_blank"> 
            <img class="github-logo" src="./assets/resource/control-img/github-logo.png" alt="Git logo">
        </a>
        <div id="student" class="student">
          drunich-z, 2021
        </div>

      </footer>
      <div id="cover" class="cover hidden"></div>
    </div>
    `;
    const body = document.getElementById('body') as HTMLElement;
    body.innerHTML = html;
  },

  renderBurger(categories: Category[]): string {
    let result = '';
    result = '<a id="burger-link-main" href="#main" class="burger-link burger-link_active" data-type="main">MAIN</a>';
    for (let i = 0; i < categories.length; i++) {
      result += `<a id="burger-link-${categories[i].id}" href="#category"`
      + `class="burger-link" data-type="category" data-id="${categories[i].id}"`
      + `data-link="${categories[i].name}">${categories[i].name}</a>`;
    }
    result += '<a href="#statistics" class="burger-link" data-type="statistics" data-link="statistics">STATISTICS</a>';
    result += '<a id="burger-link-login" href="#login"'
      + ' class="burger-link burger-link-login" data-type="login" data-link="login">LOGIN</a>';
    return result;
  },

  renderCardsForCategoryPage(cards: CardLocal[], mode: ApplicationMode = 'train'): string {
    const none = mode === 'train' ? '' : 'none';
    const cardCover = mode === 'train' ? '' : 'card-cover';
    let result = '<div id="rating" class="rating none"></div>';
    for (let i = 0; i < cards.length; i++) {
      result += `
        <div class="card-container">
          <div id="card-${cards[i].word}" 
               class="card ${cardCover}" 
               data-word=${cards[i].word}
               data-audiosrc=${cards[i].audio}>
            <div class="front" style="background-image: url('${cards[i].image}')">
              <div class="card-header ${none}">${cards[i].word}</div>

            </div>
            <div class="back ${none}" style="background-image: url('${cards[i].image}')">
              <div class="card-header ${none}">${cards[i].translation}</div>
            </div>
            <div class="rotate ${none}" 
                 style="background-image: url('./assets/resource/control-img/rotate.svg')"
                 data-word="${cards[i].word}">
            </div>
          </div>
        </div>
      `;
    }
    result += `
      <div id="btns" class="btns"> 
        <button id="button-start" 
                class="btn ${mode === 'train' ? 'none' : ''}"> 
          Start game
        </button>
              
      </div>
      `;
    return result;
  },

  renderCardsForMainPage(cards: CardLocal[], mode: ApplicationMode = 'train'): string {
    const green = mode === 'train' ? 'green' : '';
    let result = '';
    for (let i = 0; i < cards.length; i++) {
      result += `
      <a href="#category" class="main-card ${green}" 
                          data-category="${cards[i].category.name}" 
                          data-id="${cards[i].category.id}">
        <img src="${cards[i].image}" alt="category-picture" class="pict">
        ${cards[i].category.name}
      </a>
      `;
    }
    return result;
  },

};
