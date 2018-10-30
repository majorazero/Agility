import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Login from "./components/Login/Login.js";
import Landing from "./components/Landing/Landing.js";
import Homepage from "./components/Homepage/Homepage.js";
import Register from "./components/Register/Register.js";
import Project from "./components/Project/Project.js";
import ButtonAppBar from "./components/utils/Navbar/Navbar.js";
import ActiveTasks from "./components/ActiveTasks/activetasks";
import UserPool from "./components/Project/UserPool";
import SprintSelect from "./components/Project/SprintSelect";
import axios from "axios";
import notFound from "./components/utils/404/404.js";
// import ProgressBar from "./components/utils/ProgressBar/ProgressBar";
import './App.css';
import parallax from "./components/parallax/parallax.js"
class App extends Component {

  state = {
    loggedIn: false,
    loaded: false
  }

  componentWillMount = () => {
    //obviously we'll have to be updated once i get the database going.
    console.log(sessionStorage.getItem("id"), localStorage.getItem("token"));
    //if sessionStorage doesn't exist
    if (sessionStorage.getItem("id") === null) {
      console.log("no session storage!");
      //we check if token exist, it does
      if (localStorage.getItem("token") !== null) {
        console.log("checking database if token exists");
        axios.post("/api/tokenLogin", {
          token: localStorage.getItem("token")
        }).then((response) => {
          console.log(response);
          sessionStorage.setItem("id", response.data.id);
          //window.location.assign("/homepage");
          //this.props.history.push("/homepage");
          //return true;
          this.setState({loaded:true, loggedIn: true});
        });
        //if it does we'll log the user in.
      }
      //if no token exists, they have to login.
      this.setState({loaded: true});
    }
    else {
      //you have a session you're logged in
      console.log("Welcome back!");
      //window.location.assign("/homepage");
      //this.props.history.push("/homepage");
      //return true;
      this.setState({loaded:true, loggedIn: true});
    }
    this.setState({loaded: true});
  }

  render() {
    if(!this.state.loaded){
      return null;
    }



    return (
      // style={{padding: "100px 50px 0 50px"}}
      <Router>
        <div>
        {window.location.href.includes("404")? null:<ButtonAppBar />}
          <Route exact path ="/" render={() => (
              (this.state.loggedIn !== true) ? (<Landing />) : (<Redirect to="/homepage" />)
            )} />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/project/:id" component={Project} />
          <Route exact path='/tasks' component={ActiveTasks} />
          <Route exact path='/userpool' component={UserPool} />
          <Route exact path='/sprintselect' component={SprintSelect} />
          <Route exact path='/404' component={notFound} />
          <Route exact path='/parallax' component={parallax} />

        </div>
      </Router>
    );
  }
}

export default App;
