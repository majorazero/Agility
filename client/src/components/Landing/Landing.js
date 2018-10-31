import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import ContainedButtons from "../utils/Button.js";
import './landing.css';

//import Image from "/assets/images/profileimg.png";

class Landing extends Component {
  render() {
    return (
      <div style={{ paddingTop: "50px",overflowX: "hidden"}} >
        <Grid container>
          <Grid item xs={12} className = "parallax"  style={{ padding: "10px"}}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={24}
              style={{
                backgroundImage: `url("/assets/images/background.jpg")`,
                resizeMode: 'cover',
                height: "660px",
                padding: "10px",
                backgroundPosition: "center",
                color:"whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <h1 style={{
                textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                fontSize: 70,
                fontFamily: "'Source Serif Pro', serif"
              }}>Agility.</h1>

              <ContainedButtons
                component={Link}
                to="/login"
                name="Login"
                color="primary"
              />
              <ContainedButtons
                component={Link}
                to="/register"
                name="Sign Up"
                color="secondary"
              />

              {/* <div style={{backgroundImage: `url("/assets/images/down-arrow.png")`}} ></div> */}
            </Grid>
          </Grid>
          <Grid item alignItems="center" xs={12} 
            style={{
              height:"900px", 
              backgroundImage: `url("/assets/images/background.png")`,
            fontSize:"25px", 
            position:"relative"
            }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              style={{ padding: "10px" }}
              spacing={24}
            >
              <p>
                lorem ipsum dolor sit amet, quo molestie reprimique te. Ea per tota erant consequuntur, quodsi oportere ut mea. At vero convenire vel, ei est laoreet singulis, nominati abhorreant delicatissimi eos an. Officiis adipisci sed ei. In utamur intellegam est, purto assueverit eu nam, no quas etiam disputationi duo.
          <br />
                <br />
        </p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default Landing;
