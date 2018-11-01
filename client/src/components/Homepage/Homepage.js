import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../ProjectList/ProjectList.js";
import axios from "axios";
import ProfileCard from "./ProfileCard/profilecard.js";
import ActiveTasks from "./ActiveTasks/activetasks";
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from "../utils/Navbar/Navbar.js";
import Paper from '@material-ui/core/Paper';
import SimpleBottomNavigation from "../utils/Footer/Footer.js";


//doesn't has to be

class Homepage extends Component {

  componentDidMount = () => {
    if (sessionStorage.getItem("id") === null) {
      console.log("You're not logged in!");
      //we might want to change this to a 404
      window.location.assign("/");
    }
  }

  render() {
    return (
      <div>
        <ButtonAppBar />
        <div
          className="parallax"
          style={{
            paddingTop: "50px",
            overflowX: "hidden",

            // possible?
            backgroundImage: `url("/assets/images/background.png")`,
            resizeMode: 'cover',
            // height: "3050px"
          }} >
          <Grid
            container
            spacing={8}
            style={{ padding: "50px" }}
          >
            <Grid item xs={8}>
              <Paper
                style={{ height: "100%" }}
              >
                <ActiveTasks />
              </Paper>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs>
              <ProfileCard />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={8}
            style={{ padding: "50px" }}
          >
            <Grid item xs={12}>
              <Paper
                // style={{ height: 100 }}
              >
                <ProjectList />
              </Paper>
            </Grid>
          </Grid>

          {/* <Grid container spacing={8} style={{ marginTop: 100 }}>
          <Grid container item xs={12} style={{ marginLeft: 100 }}>
            <Grid item xs={4} style={{ maxHeight: 375, overflow: "auto", marginLeft: 35, marginRight: 140 }}>
              <ActiveTasks />
            </Grid>
            <Grid item xs={4} style={{ justifyContent: "left" }}>
              <ProfileCard />
            </Grid>
          </Grid>
          <Grid container style={{ justifyContent: 'center' }}>
            <Grid item xs={10} >
              <ProjectList />
            </Grid>
          </Grid>
        </Grid> */}
        </div >
        <div style={{position:"relative"}}>
        <SimpleBottomNavigation /> 
        </div>
      </div>
    );
  }
}

export default Homepage;
