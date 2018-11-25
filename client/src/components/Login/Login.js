import React, { Component } from "react";
import axios from "axios";
import LoginLayout from "../utils/LoginLayout.js";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
      <div
        className="parallax"
        style={{
          // paddingTop: "50px",
          overflowX: "hidden",
          backgroundImage: `url("/assets/images/login.jpg")`,
          resizeMode: 'cover',
          height: "-webkit-fill-available"
        }} >
        <Grid container>
          <Grid
            item
            xs
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={24}
            style={{
              height: "100%",
              padding: "10px",
              backgroundPosition: "center",
              color: "whitesmoke",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <LoginLayout
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              message={this.state.message}
            />
          </Grid>
          <Grid container>
            <Grid
              item
              xs
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={24}
              style={{
                height: "100%",
                padding: "10px",
                backgroundPosition: "center",
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button variant="contained" href="/">
                Back To Landing Page
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
