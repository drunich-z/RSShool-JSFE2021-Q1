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
            <a href class="burger-link">MAIN</a>
            <a href class="burger-link">Cards---1</a>
            <a href class="burger-link">Cards---2</a>
            <a href class="burger-link">Cards---3</a>
            <a href class="burger-link">Cards---4</a>
            <a href class="burger-link">Cards---5</a>
            <a href class="burger-link">Cards---6</a>
            <a href class="burger-link">Cards---7</a>
            <a href class="burger-link">Cards---8</a>
            <a href class="burger-link">Staistics</a>

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
      <div class="cards-container">
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
    const root = document.createElement('div');
    root.innerHTML = html;
    document.body.appendChild(root);
  },

  renderBurger(categories: Category[]): string {
    let result = '';
    result = '<a href="#main" class="burger-link" data-link="main">MAIN</a>';
    for (let i = 0; i < categories.length; i++) {
      result += `<a href="#category" class="burger-link" data-link="${categories[i].name}">${categories[i].name}</a>`;
    }
    result += '<a href="#statistics" class="burger-link" data-link="statistics">STATISTICS</a>';
    return result;
  },

};
