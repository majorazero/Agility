import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ContainedButtons from "../utils/Button.js";
import './landing.css';
import Typography from '@material-ui/core/Typography';
import MediaCard from "../utils/MediaCard.js"


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

  state = {
    creator: [
      {
        name: "Daniel Hsu",
        // image: ,
        summary: "He's brown."
      },
      {
        name: "Matt Purpura",
        // image: ,
        summary: "He's brown."
      },
      {
        name: "Michael Reza Sanaiha",
        image: "/assets/images/itsmeinasuit.jpeg",
        summary: "He's brown."
      },
      {
        name: "Yair Joseph",
        // image: ,
        summary: "He's brown."
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
          backgroundImage: `url("/assets/images/background.png")`,
          resizeMode: 'cover',
          height: "2950px"
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
                padding: "25px 50px 25px 50px",
                height: "500px",
                background: "whitesmoke",
                position: "relative"
              }}
              spacing={24}
            >
              <Typography variant="h6" gutterBottom color="textSecondary" align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada. Dictumst vestibulum rhoncus est pellentesque elit. Risus ultricies tristique nulla aliquet enim. Urna cursus eget nunc scelerisque viverra mauris in. Aliquam malesuada bibendum arcu vitae elementum. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Fringilla phasellus faucibus scelerisque eleifend donec pretium. A iaculis at erat pellentesque. Pharetra magna ac placerat vestibulum. Mi quis hendrerit dolor magna eget est.
<br />
                <br />
                Quisque id diam vel quam elementum pulvinar etiam non quam. Euismod in pellentesque massa placerat duis ultricies lacus sed. Ante metus dictum at tempor commodo. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Fermentum leo vel orci porta non pulvinar. At erat pellentesque adipiscing commodo. Diam maecenas ultricies mi eget. Elit at imperdiet dui accumsan sit amet. Suscipit tellus mauris a diam maecenas. At tempor commodo ullamcorper a lacus. Duis at tellus at urna condimentum. Arcu non sodales neque sodales ut. Pellentesque nec nam aliquam sem et. Vitae justo eget magna fermentum. Vitae turpis massa sed elementum tempus.
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

              <Typography variant="h4" gutterBottom>How does it work?</Typography>

              <MuiThemeProvider theme={theme}>
                <ContainedButtons
                  component={Link}
                  to="#"
                  name="See How It Works"
                  color="secondary"
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
                height: "500px",
                background: "whitesmoke",
                position: "relative"
              }}
              spacing={24}
            >
              <Typography variant="h6" gutterBottom color="textSecondary" align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada. Dictumst vestibulum rhoncus est pellentesque elit. Risus ultricies tristique nulla aliquet enim. Urna cursus eget nunc scelerisque viverra mauris in. Aliquam malesuada bibendum arcu vitae elementum. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Fringilla phasellus faucibus scelerisque eleifend donec pretium. A iaculis at erat pellentesque. Pharetra magna ac placerat vestibulum. Mi quis hendrerit dolor magna eget est.
<br />
                <br />
                Quisque id diam vel quam elementum pulvinar etiam non quam. Euismod in pellentesque massa placerat duis ultricies lacus sed. Ante metus dictum at tempor commodo. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Fermentum leo vel orci porta non pulvinar. At erat pellentesque adipiscing commodo. Diam maecenas ultricies mi eget. Elit at imperdiet dui accumsan sit amet. Suscipit tellus mauris a diam maecenas. At tempor commodo ullamcorper a lacus. Duis at tellus at urna condimentum. Arcu non sodales neque sodales ut. Pellentesque nec nam aliquam sem et. Vitae justo eget magna fermentum. Vitae turpis massa sed elementum tempus.
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

              <Typography variant="h4" gutterBottom>The Team</Typography>

              <Grid container spacing={40}>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    {this.state.creator.map((maker) => {
                      return (
                        <MediaCard
                          key={maker.id}
                          id={this.key}
                          maker={maker}
                        // onClick=?
                        />
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
