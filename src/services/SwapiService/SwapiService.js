class SwapiService {
  /* eslint no-underscore-dangle: 0 */
  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url} \n received ${res.status}`);
    }

    return res.json();
  }

  async getAllPeople() {
    const result = await this.getResource(`/people/`);
    return result.results;
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }

  async getAllPlanets() {
    const result = await this.getResource(`/planets/`);
    return result.results;
  }

  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }

  async getAllStarships() {
    const result = await this.getResource(`/starships/`);
    return result.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }
}

export default SwapiService;
