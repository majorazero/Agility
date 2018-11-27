import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Landing from "./components/Landing/Landing.js";
import Homepage from "./components/Homepage/Homepage.js";
import Register from "./components/Register/Register.js";
import Project from "./components/Project/Project.js";
import UserPool from "./components/Project/UserPool";
import SprintSelect from "./components/Project/SprintSelect";
import axios from "axios";
import notFound from "./components/utils/404/404.js";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#998877'
    },
    secondary: {
      main: '#778899'
    }
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {

  state = {
    loggedIn: false,
    loaded: false
  }

  componentWillMount = () => {
    //obviously we'll have to be updated once i get the database going.
    //if sessionStorage doesn't exist
    if (sessionStorage.getItem("id") === null) {
      //we check if token exist, it does
      if (localStorage.getItem("token") !== null) {
        axios.post("/api/tokenLogin", {
          token: localStorage.getItem("token")
        }).then((response) => {
          sessionStorage.setItem("id", response.data.id);
          this.setState({ loaded: true, loggedIn: true });
        });
        //if it does we'll log the user in.
      }
      //if no token exists, they have to login.
      else {
        this.setState({ loaded: true });
      }
    }
    else {
      //you have a session you're logged in
      this.setState({ loaded: true, loggedIn: true });
    }
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => (
                (this.state.loggedIn !== true) ? (<Landing />) : (<Redirect to="/homepage" />)
              )} />
              <Route exact path="/homepage" component={Homepage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/project/:id" component={Project} />
              <Route exact path='/userpool' component={UserPool} />
              <Route exact path='/sprintselect' component={SprintSelect} />
              <Route exact path='/404' component={notFound} />
              <Route component={notFound} />
            </Switch>

          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
