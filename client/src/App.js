import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/Login/Login.js";
import Landing from "./components/Landing/Landing.js";
import Homepage from "./components/Homepage/Homepage.js";
import Register from "./components/Register/Register.js";
import Project from "./components/Project/Project.js";
import ButtonAppBar from "./components/utils/Navbar/Navbar.js";
import ActiveTasks from "./components/ActiveTasks/activetasks";
import UserPool from "./components/UserPool/UserPool";


import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{padding: "100px 50px 0 50px"}}>
          <ButtonAppBar/>
          <Route exact path ="/" component={Landing} />
          <Route exact path ="/homepage" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/project/:id" component={Project}/>
          <Route exact path='/tasks' component = {ActiveTasks} />
          <Route exact path='/userpool' component={UserPool} />
        </div>
      </Router>
    );
  }
}

export default App;
