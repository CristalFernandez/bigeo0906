import './navbar.css';
import React from "react";
import logo from "../../assets/img/LogoBIGEO.png";

const Navbar = ({ nombreUser }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={logo} width="150px" className="logo" alt="Logo" />
      </a>

      <button
        className="navbar-toggler toggle"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown" // Cambiado "data-toggle" a "data-bs-toggle"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Hola, {nombreUser}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Perfil
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Cerrar Sesión
              </a>
            </div>
          </li>
        </ul>

        <button type="button" className="btn btn-primary">
          Notificaciones <span className="badge badge-light">4</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;