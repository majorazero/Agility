import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login/Login.js";
import Landing from "./components/Landing/Landing.js";
import Homepage from "./components/Homepage/Homepage.js";
import Register from "./components/Register/Register.js";
import Project from "./components/Project/Project.js";
import ButtonAppBar from "./components/utils/Navbar/Navbar.js";
// import ActiveTasks from "./components/ActiveTasks/activetasks"

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ButtonAppBar/>
          <Route exact path ="/" component={Landing} />
          <Route exact path ="/homepage" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/project" component={Project}/>
        </div>
      </Router>
    );
  }
}

export default App;
