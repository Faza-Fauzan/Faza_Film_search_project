class FilmDetails extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set filmdetails(filmdetails) {
    this._filmdetails = filmdetails;
    this.render();
  }

  render() {
    if (this._filmdetails) {
      this.shadowDOM.innerHTML = `
        <p>${this._filmdetails.Plot}</p>
      `;
    }
  }
}

customElements.define('film-details', FilmDetails);
