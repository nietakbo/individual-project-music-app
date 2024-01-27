import { select, templates } from '../settings.js';
import utils from '../utils.js';
import app from '../app.js';
class Discover {
  constructor(data) {
    this.data = data;
    this.initDiscover();
  }
  initDiscover() {
    const discoverLink = document.querySelector('#discoverLink');
    discoverLink.addEventListener('click', () => {
      let max = this.data.songs.length;
      let arrEl = Math.floor(Math.random() * max);
      for (let song of this.data.songs) {
        if (song === this.data.songs[arrEl]) {
          const resultsContainer = document.querySelector(select.containerOf.discoverResult);
          const generatedHTML = templates.song(song);
          this.element = utils.createDOMFromHTML(generatedHTML);

          if (resultsContainer.innerHTML === '') {
            resultsContainer.appendChild(this.element);
          } else {
            resultsContainer.removeChild(resultsContainer.firstChild);
            resultsContainer.appendChild(this.element);
          }
        }
      }
      app.initPlayer(select.containerOf.discoverResult);
    });
  }
}

export default Discover;