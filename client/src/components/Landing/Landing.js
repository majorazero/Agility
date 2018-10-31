import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ContainedButtons from "../utils/Button.js";
import './landing.css';
import Typography from '@material-ui/core/Typography';


//import Image from "/assets/images/profileimg.png";

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});

class Landing extends Component {
  render() {
    return (
      <div 
       className="parallax"
      style={{
        paddingTop: "50px",
        overflowX: "hidden",
        backgroundImage: `url("/assets/images/background.png")`,
        resizeMode: 'cover',
        height: "2500px"
      }} >
        <Grid container>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={24}
              style={{
                // backgroundImage: `url("/assets/images/background.png")`,
                // resizeMode: 'cover',
                height: "650px",
                padding: "10px",
                backgroundPosition: "center",
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <Typography component="h2" variant="h1" gutterBottom>agility.</Typography>

              <MuiThemeProvider theme={theme}>
                <ContainedButtons
                  component={Link}
                  to="/register"
                  name="Sign Up"
                  color="secondary"
                />
              </MuiThemeProvider>

              <MuiThemeProvider theme={theme}>
                <ContainedButtons
                  component={Link}
                  to="/login"
                  name="Login"
                  color="primary"
                />
              </MuiThemeProvider>

              {/* <div style={{backgroundImage: `url("/assets/images/down-arrow.png")`}} ></div> */}
            </Grid>
          </Grid>
          <Grid item alignItems="center" xs={12}>
            <Grid
              // className="parallax"
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              style={{
                padding: "10px",
                height: "450px",
                background: "whitesmoke",
                fontSize: "25px",
                position: "relative"
              }}
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
