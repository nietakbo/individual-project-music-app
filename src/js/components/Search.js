import { templates, select } from '../settings.js';
import utils from '../utils.js';
import app from '../app.js';
class Search {
  constructor(data) {
    this.searchForm = document.querySelector('#search');

    this.data = data;
    this.dom = {};

    this.getElement(this.searchForm);
    this.initAction();
  }

  getElement(searchForm) {
    this.dom.searchBtn = searchForm.querySelector(select.searchForm.button);
    this.dom.searchInput = searchForm.querySelector(select.searchForm.input);
    this.dom.searchMsg = searchForm.querySelector(select.searchForm.message);
    this.dom.searchSelect = searchForm.querySelector(select.searchForm.select);
    this.dom.resultsContainer = searchForm.querySelector(select.containerOf.searchResult);
  }

  initSearch() {
    const searchValue = this.dom.searchInput.value.trim().toLowerCase();

    const filteredSongs = this.data.songs.filter(song => song.title.toLowerCase().includes(searchValue));

    const filteredAuthors = this.data.authors.filter(author => author.name.toLowerCase().includes(searchValue));

    const songsByAuthor = this.data.songs.filter(song => filteredAuthors.some(author => song.author === author.id));

    this.songsSet = [...new Set([...filteredSongs, ...songsByAuthor])];
  }

  initAction() {
    this.dom.searchBtn.addEventListener('click', event => {
      event.preventDefault();
      this.dom.resultsContainer.innerHTML = '';

      if (this.dom.searchSelect.value === '') {
        if (this.dom.searchInput.value.trim() === '') {
          this.dom.searchMsg.innerHTML = 'Please type at least one letter';
          this.dom.resultsContainer.innerHTML = '';
        } else {
          this.initSearch();
          this.dom.searchMsg.innerHTML = 'Check what we found!';
          this.dom.resultsContainer.innerHTML = '';

          for (let song of this.songsSet) {
            const generatedHTML = templates.song(song);
            this.element = utils.createDOMFromHTML(generatedHTML);
            this.dom.resultsContainer.appendChild(this.element);
          }
        }
      } else {
        this.data.songs.forEach(song => {
          const generatedHTML = templates.song(song);
          this.element = utils.createDOMFromHTML(generatedHTML);

          if (song.categories.includes(this.dom.searchSelect.value)) {
            this.dom.resultsContainer.appendChild(this.element);
          }
        });
        this.dom.searchMsg.innerHTML = 'Check what we found!';
      }
      app.initPlayer(select.containerOf.searchResult);
    });
  }
}

export default Search;