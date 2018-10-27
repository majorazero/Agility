import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login/Login.js";
import Landing from "./components/Landing/Landing.js";
import Homepage from "./components/Homepage/Homepage.js";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path ="/" component={Landing}/>
          <Route exact path ="/homepage" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
