import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginLayout from "../utils/LoginLayout.js";
import SimpleBottomNavigation from "../utils/Footer/Footer.js";
import Grid from '@material-ui/core/Grid';



class Login extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/login", this.state).then((res) => {
      if (res.data === "User does not exist.") {
        this.setState({ message: res.data });
      }
      else if (res.data === "Wrong password!") {
        this.setState({ message: res.data });
      }
      else {
        console.log(res.data);
        sessionStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        console.log(sessionStorage.getItem("id"), localStorage.getItem("token"));
        window.location.assign("/homepage");
      }
    });
  }
render() {
  return (
    <div>

        <h1 style={{textAlign: "center"}}>This is a login page.</h1>
        <small>{this.state.message}</small>

        <LoginLayout
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <div style={{textAlign: "center", marginTop:"20px"}}>
        <div><Link to="/register">New user? Register!</Link></div>
        <div><Link to="/">Back to landing page.</Link></div>
        </div>

        <div style={{ marginTop: "96px" }}> <SimpleBottomNavigation /> </div>       
      </div>
      );
    }
  }
  
  export default Login;
