import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import {Customer} from "./modules/customer/Customer";
import {Worker} from "./modules/worker/Worker";
import {Manager} from "./modules/manager/Manager";

function App() {
  return (
      <div className="container">
          <Router>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="./"><span role="image" aria-label="bee">🐝</span>Redőny</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                          <li className="nav-item">
                              <Link className="nav-link" to="/">
                                  Vásárló
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/worker">
                                  Munkás
                              </Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link"  to="/manager">
                                  Manager
                              </Link>
                          </li>
                      </ul>
                  </div>
              </nav>
              <Route exact path="/" component={Customer}/>
              <Route exact path="/worker" component={Worker}/>
              <Route exact path="/manager" component={Manager}/>
          </Router>


      </div>
  );
}

export default App;
