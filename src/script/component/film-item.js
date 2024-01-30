class filmItem extends HTMLElement {

  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
this.isOpen = false;
  }

  set film(film) {
    this._film = film;
    this.render();
  }

  async result() {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=e38b7731&i=${this._film.imdbID}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
      return "Tidak ada data rincian film yang tersedia.";
    }
  }

  async render() {
    const details= await this.result();
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 18px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          overflow: hidden;
        }

        /* Stylize the content */
        .poster {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          object-position: center;
        }

        .film-description {
          padding: 24px;
          display: ${this.isOpen ? 'block' : 'none'}; /* Tampilkan atau sembunyikan rincian */
        }

        .film-description h2 {
          font-weight: lighter;
          font-size: 1.5rem; /* Ukuran heading */
        }

        .film-description p {
          margin-top: 10px;
          font-size: 1rem; /* Ukuran teks paragraf */
        }

        .toggle-button {
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }
      </style>
      <img class="poster" src="${this._film.Poster}" alt="${this._film.Title}">
        <h2>${this._film.Title}</h2>
        <p>${this._film.Year}</p>
      <div class="film-description">

        <p>${this._film.imdbID}</p>
        <p>Director : ${details.Director}</p>
        <p>Written By : ${details.Writer}</p>
        <p>Actors : ${details.Actors}</p>
        <p>${details.Plot}</p>
      </div>
      <button class="toggle-button">${this.isOpen ? 'Hide details' : 'See details'}</button>
    `;

    // Mendapatkan referensi ke elemen-elemen dalam shadow DOM
    const toggleButton = this.shadowDOM.querySelector(".toggle-button");

    toggleButton.addEventListener("click", () => {
      // Toggle status (buka jika tertutup, tutup jika terbuka)
      this.isOpen = !this.isOpen;

      // Update tampilan tombol berdasarkan status
      toggleButton.textContent = this.isOpen ? 'Hide details' : 'See details';

      // Tampilkan atau sembunyikan rincian
      const filmDescription = this.shadowDOM.querySelector(".film-description");
      filmDescription.style.display = this.isOpen ? 'block' : 'none';
    });
}
}

customElements.define('film-item', filmItem);
