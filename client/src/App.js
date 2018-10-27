import React, { Component } from 'react';
<<<<<<< HEAD
=======
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login/Login.js";
import Landing from "./components/Landing/Landing.js";
import Homepage from "./components/Homepage/Homepage.js";
import Register from "./components/Register/Register.js";
import './App.css';
>>>>>>> master

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <h1>Tell me I'm pretty</h1>
      </div>
=======
      <Router>
        <div>
          <Route exact path ="/" component={Landing}/>
          <Route exact path ="/homepage" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </div>
      </Router>
>>>>>>> master
    );
  }
}

export default App;
