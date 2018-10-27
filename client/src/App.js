import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login/Login.js";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
