import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import Auth from './modules/Auth';
import ClientList from './components/ClientList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isAuthenticated(),
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/clients" render={() => <ClientList />} />
        </div>
      </Router>
    );
  }
}

export default App;
