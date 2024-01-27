import { templates, select } from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.renderInSongs();
  }

  renderInSongs() {
    const generatedHTML = templates.song(this.data);
    this.element = utils.createDOMFromHTML(generatedHTML);

    const songContainer = document.querySelector(select.containerOf.songs);

    songContainer.appendChild(this.element);
  }
}
export default Home;