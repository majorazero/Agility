import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterLayout from "../utils/RegisterLayout.js"
import Grid from '@material-ui/core/Grid';
import SimpleBottomNavigation from "../utils/Footer/Footer.js";
import Button from '@material-ui/core/Button';

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
      /* <h1 style={{textAlign:"center"}}>Register!</h1> */
      /* <small>{this.state.message}</small> */
      <div
        className="parallax"
        style={{
          // paddingTop: "50px",
          overflowX: "hidden",
          backgroundImage: `url("/assets/images/background1.png")`,
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
              // backgroundImage: `url("/assets/images/background.png")`,
              // resizeMode: 'cover',
              height: "100%",
              padding: "10px",
              backgroundPosition: "center",
              color: "whitesmoke",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={24}
              style={{
                // backgroundImage: `url("/assets/images/background.png")`,
                // resizeMode: 'cover',
                height: "100%",
                padding: "10px",
                backgroundPosition: "center",
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
            <RegisterLayout
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              message={this.state.message}
            />
            {/* <form type="submit" onSubmit={this.handleSubmit}>
          <h2>First Name:</h2>
          <input type="text" name="fName" onChange={this.handleChange}/>
          <h2>Last Name:</h2>
          <input type="text" name="lName" onChange={this.handleChange}/>
          <h2>Email:</h2>
          <input type="email" name="email" onChange={this.handleChange}/>
          <h2>Password:</h2>
          <input type="password" name="password" onChange={this.handleChange}/>
          <div>
            <button>Submit</button>
          </div>
        </form> */}
            {/* <div style={{ textAlign: "center", marginTop: "5px" }}> */}
          </Grid>

          {/* </div> */}
        </Grid>
        {/* <div style={{ position: "fixed", width: "100%", bottom: "0" }}>
          <SimpleBottomNavigation />
        </div> */}
      </div >
    );
  }
}

export default Register;
