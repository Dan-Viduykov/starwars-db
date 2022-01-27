import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="header d-flex">
      <h3 className="header__title">
        <a href="#">Star DB</a>
      </h3>
      <ul className="header__list d-flex">
        <li className="header__list-item">
          <a href="#">People</a>
        </li>
        <li className="header__list-item">
          <a href="#">Planets</a>
        </li>
        <li className="header__list-item">
          <a href="#">Starships</a>
        </li>
      </ul>
    </div>
  );
}
