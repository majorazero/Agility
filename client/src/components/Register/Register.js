import React, { Component } from "react";
import axios from "axios";
import RegisterLayout from "../utils/RegisterLayout.js"
import Grid from '@material-ui/core/Grid';

class Register extends Component {
  state = {
    fName: "",
    lName: "",
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

    axios.post("/api/register", this.state).then((res) => {
      if (res.data === "User already exists!") {
        this.setState({ message: res.data });
      }
      else {
        sessionStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        window.location.assign("/homepage");
      }
    });
  }

  render() {
    return (
      <div
        className="parallax"
        style={{
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
            <RegisterLayout
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              message={this.state.message}
            />
          </Grid>
        </Grid>
      </div >
    );
  }
}

export default Register;
