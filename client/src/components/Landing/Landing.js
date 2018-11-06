import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ContainedButtons from "../utils/Button.js";
import './landing.css';
import Typography from '@material-ui/core/Typography';
import MediaCard from "../utils/MediaCard.js";



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


  handleClick = () => {
    window.open("https://github.com/majorazero/project3");

  }

  state = {
    creator: [
      {
        name: "Daniel Hsu",
        // image: ,
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        name: "Matt Purpura",
        // image: ,
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        name: "Michael Reza Sanaiha",
        image: "/assets/images/itsmeinasuit.jpeg",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        name: "Yair Joseph",
        image: "/assets/images/eximage.png",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    ]
  }
  render() {
    return (
      <div
        className="parallax"
        style={{
          paddingTop: "50px",
          overflowX: "hidden",
          backgroundImage: `url("/assets/images/background1.png")`,
          resizeMode: 'cover',
          height: "-webkit-fill-available"
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
                  size="medium"
                  component={Link}
                  to="/register"
                  name="Sign Up"
                  color="secondary"
                />
                <ContainedButtons
                  size="medium"
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
                padding: "25px 50px 25px 50px",
                height: "125%",
                background: "whitesmoke",
                position: "relative"
              }}
              spacing={24}
            >
              <Typography variant="h6" gutterBottom color="textSecondary" align="center">

                "Collaboration is challenging. We’re here to make it easier."  - The <span style={{fontStyle: 'italic'}}>agility.</span> Team
                <br />
                <br />
                <span style={{fontStyle: 'italic'}}>agility.</span> is a project management app that tracks the progress of its individual users with the principal intent of promoting accountability and providing the opportunity to ensure innovation for future projects. This is done by visualizing not only the successes but also the conflicts as they occur throughout the entirety of a given project.  Daunting projects can therefore be effectively analyzed and broken down to allow for a better and overall more streamlined process. The app is specifically designed for project managers, allowing them the ability to assign tasks to project workers and monitor the efficiency of each member assigned a task within a project sprint. Ultimately, we believe this will drive the best collaborative results.
              </Typography>
            </Grid>
          </Grid>
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

              <Typography variant="h3" gutterBottom>
                <img src="./assets/images/demo1.gif" width="400" />
                <img src="./assets/images/demo1.gif" width="400" />
                <img src="./assets/images/demo1.gif" width="400" />
              </Typography>

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
                padding: "25px 50px 25px 50px",
                height: "125%",
                background: "whitesmoke",
                position: "relative"
              }}
              spacing={24}
            >
              <Typography variant="h5" gutterBottom color="textSecondary" align="center">
                We desired to design and build a project management tool that was constructed from the ground up to work successfully within an agile environment. Our mission is to help project managers foster teamwork, promote accountability, and ensure efficiency within the project-management environment.
              </Typography>
            </Grid>
          </Grid>
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
                height: "750px",
                paddingTop: "50px",
                backgroundPosition: "center",
                color: "whitesmoke",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <Typography variant="h3" gutterBottom>The Team</Typography>

              <Grid container spacing={32}>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    {this.state.creator.map((maker) => {
                      return (
                        <Grid item style={{ padding: "20px" }}>
                          <MediaCard
                            key={maker.id}
                            id={this.key}
                            maker={maker}
                          // onClick=?
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
              {/* <div style={{backgroundImage: `url("/assets/images/down-arrow.png")`}} ></div> */}
            </Grid>
          </Grid>
        </Grid>
      </div >
    );
  }
}


export default Landing;
