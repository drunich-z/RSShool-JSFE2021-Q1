export default {

  async renderBaseTemplate(): Promise<void> {
    const html = `
    <div class="menu">
      <a class="button garage-menu-button primary" id="garage-menu" href="#cars-garage">To garage</a>
      <a class="button winners-menu-button primary" id="winners-menu" href="#race-winners">To winners</a>
    </div>
    <div id="garage-view">
      <div>
        <form class="form" id="create">
          <input type="text" class="input" id="create-name" name="name" required="required"></input>
          <input type="color" class="input" id="create-color" name="color" value="#ffffff"></input>
          <button class="button" type="submit" id="create-submit">Create</button>
        </form>
        <form class="form" id="update">
          <input type="text" class="input" id="update-name" name="name" disabled required="required"></input>
          <input type="color" class="input" id="update-color" name="color" value="#ffffff" disabled></input>
          <button class="button" type="submit" id="update-submit" disabled>Update</button>
        </form>
      </div>
      <div class="race-control">
        <button class="button race-button primary" id="race">Race</button>
        <button class="button reset-button primary" id="reset">Reset</button>
        <button class="button generator-button" id="generate">Generate cars</button>
      </div>
      <div id="garage">
        
      </div>
      <div class="message-container hidden" id="message-container">
        <img src="./assets/resource/bob.jpg" alt="Marley" id="bob-image" class="message-pict"> 
        <p class="message" id="message"></p>
      </div>
    </div>
    <div id="winners-view" style="display: none">
    
    </div>
    <div class="pagination">
      <button class="button primary prev-button" disabled id="prev">Prev</button>
      <button class="button primary next-button" disabled id="next">Next</button>
    </div>
    `;
    const root = document.createElement('div');
    root.innerHTML = html;
    document.body.appendChild(root);
  },
};
