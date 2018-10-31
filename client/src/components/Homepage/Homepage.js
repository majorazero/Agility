import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../ProjectList/ProjectList.js";
import axios from "axios";
import ProfileCard from "./ProfileCard/profilecard.js";
import ActiveTasks from "./ActiveTasks/activetasks";
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from "../utils/Navbar/Navbar.js";

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
        <ButtonAppBar/>
      <Grid container spacing={8} style={{ marginTop: 100 }}>
        <Grid container item xs={12} style={{  }}>
         
          <Grid container item xs={6} style={{  justifyContent: "right" }}>
            <Grid item xs={6} style={{ marginLeft: 200, marginTop: 70}}>
              <ProfileCard />
            </Grid>
          </Grid>
          <Grid container item xs={6} style={{  }}>
            <Grid item xs={6} style={{ marginLeft: 100 }}>
              <Grid item xs={5} >
                <h1>Task List</h1>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ 
              maxHeight: 300, 
              height: 300,
              overflow: "auto" , 
              marginRight: 140, 
              border: "5px solid lightgrey", 
              borderRadius: 7,
              boxShadow: "4px 4px 5px 1px rgb(23, 23, 23, 0.5)",
              }}>
              <ActiveTasks />
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid item xs={12}   style={{ marginLeft: 100, maxWidth: 900}}>
            <ProjectList />
          </Grid>
        </Grid>
        </Grid>
      </div>

    );
  }
}

export default Homepage;
