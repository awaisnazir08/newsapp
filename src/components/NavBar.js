import React, { Component } from "react";

export class NavBar extends Component {

  render() {
    let {mode, modeToggler}=this.props;
    return (
      <div>
        <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              NewsMonkey
            </a>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    Sports
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    Entertainment
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    Business
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    Technology
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    Health
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    Science
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link">
                    General
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={modeToggler}
            />
            <label  style={{width:"100px"}} className={`form-check-label text-${mode==='light'?'dark':'light'}`} htmlFor="flexSwitchCheckDefault" >
              Dark Mode
            </label>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
