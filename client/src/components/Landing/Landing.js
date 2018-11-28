import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ContainedButtons from "../utils/Button.js";
import './landing.css';
import Typography from '@material-ui/core/Typography';
import MediaCard from "../utils/MediaCard.js";
import Drawer from '@material-ui/core/Drawer';
import { MenuItem, Paper } from "@material-ui/core";
import LandingTab from './../utils/Tab3.js';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #998877 30%, #778899 90%)',
        borderRadius: 3,
        border: '1px solid #778899',
        height: 48,
        width: '100%',
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
        image: "/assets/images/dan.jpg",
        summary: "Dan opened Trello one day, promptly closed the window and decided to make this instead.",
        github: "https://github.com/majorazero"
      },
      {
        name: "Matt Purpura",
        image: "/assets/images/matt.JPG",
        summary: "Prior to getting into development, Matt worked in software sales for 4 years and he understands the need for simple, yet powerful tools.   This was a guiding principle in the building of agility.",
        github: "https://github.com/mattpurpura"
      },
      {
        name: "Michael Reza Sanaiha",
        image: "/assets/images/itsmeinasuit.jpeg",
        summary: "With a passion for the visual arts, Michael brings a valuable perspective to the user experience and design.",
        github: "https://github.com/rezamike"
      },
      {
        name: "Yair Joseph",
        image: "/assets/images/yair.jpg",
        summary: "The root of my passion for design and structure come from my past of serving in special forces and being a photographer.  As a developer I can now express this passion by creating ideas of other and my own.",
        github: "https://github.com/yairjoseph"
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
                height: "650px",
                padding: "10px",
                backgroundPosition: "center",
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
                padding: 50,
                height: "100%",
                background: 'dimgray',
                position: "relative"
              }}
              spacing={24}
            >
              <Typography variant="h6" gutterBottom color="textSecondary" align="center">

                "Collaboration is challenging. We’re here to make it easier."  - The <span style={{ fontStyle: 'italic' }}>agility.</span> Team
                <br />
                <br />
                <span style={{ fontStyle: 'italic' }}>agility.</span> is a project management app that tracks the progress of its individual users with the principal intent of promoting accountability and providing the opportunity to ensure innovation for future projects. This is done by visualizing not only the successes but also the conflicts as they occur throughout the entirety of a given project.  Daunting projects can therefore be effectively analyzed and broken down to allow for a better and overall more streamlined process. The app is specifically designed for project managers, allowing them the ability to assign tasks to project workers and monitor the efficiency of each member assigned a task within a project sprint. Ultimately, we believe this will drive the best collaborative results.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={8}
              style={{
                height: "650px",
                padding: "10px",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid>
                  <LandingTab />
              </Grid>

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
                padding: 50,
                height: "100%",
                background: 'dimgray',
                position: "relative"
              }}
              spacing={24}
            >
              <Typography variant="h5" gutterBottom color="textSecondary" align="center">
                In a time where data is king and drives efficiency and progress, we desired to design and build a data-driven project management tool that was constructed from the ground up to work successfully within an agile environment. Our mission is to help project managers foster teamwork, promote accountability, and ensure efficiency within the project-management environment.
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
                height: "750px",
                paddingTop: "50px",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <Typography variant="h3" gutterBottom>The Team</Typography>

              <Grid container spacing={32}>
                <Grid item xs={12}>
                  <Grid container justify="center" align='center'>
                    {this.state.creator.map((maker) => {
                      console.log(maker);
                      return (
                        <Grid item style={{ padding: 20 }}>
                          <MediaCard
                            key={maker.id}
                            id={this.key}
                            maker={maker}
                            onClick={() => {
                              window.open(maker.github);
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div >
    );
  }
}

export default Landing;
