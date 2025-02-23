import React from 'react';
import '../App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand text-white" href="/">TattooStudio</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link text-white" href="/">HOME</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/calendar/">UMÓW SIĘ</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="/visits/">WIZYTY</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
