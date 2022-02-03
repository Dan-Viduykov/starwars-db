/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/SwapiService';
import Spinner from '../Spinner';
import './RandomPlanet.css';
import ErrorIndicator from '../ErrorIndicator';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
  };

  constructor() {
    super();
    this.id = Math.round(Math.random() * 25) + 1;
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet() {
    this.swapiService.getPlanet(this.id).then(this.onPlanetLoaded).catch(this.onError);
  }

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} id={this.id} /> : null;

    return (
      <div className="random-planet jumbotron rounded card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

function PlanetView({ planet, id }) {
  const { name, population, rotation_period: rotationPeriod, diameter } = planet;

  return [
    <img
      className="planet-image"
      src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      alt={`${name} planet`}
      key={101}
    />,
    <div className="card-body" key={102}>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{population}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation period</span>
          <span>{rotationPeriod}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{diameter}</span>
        </li>
      </ul>
    </div>,
  ];
}

PlanetView.defaultProps = {
  planet: {
    name: 'no name',
    population: 'no population',
    rotation_period: 'no rotation period',
    diameter: 'no diameter',
  },
  id: 2,
};

PlanetView.propTypes = {
  id: PropTypes.number,
  planet: PropTypes.shape({
    name: PropTypes.string,
    population: PropTypes.string,
    rotation_period: PropTypes.string,
    diameter: PropTypes.string,
  }),
};
