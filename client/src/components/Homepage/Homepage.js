import React, {Component} from "react";
import {Link} from "react-router-dom";
 import ProjectList from "../ProjectList/ProjectList.js";
import axios from "axios";
import ProfileCard from "./ProfileCard/profilecard.js";
import ActiveTasks from "./ActiveTasks/activetasks";
import Grid from '@material-ui/core/Grid';

//doesn't has to be

class Homepage extends Component {

  componentDidMount = () => {
    if(sessionStorage.getItem("id") === null){
      console.log("You're not logged in!");
      //we might want to change this to a 404
      window.location.assign("/");
    }
  }

  logOut = () => {
    //logging out means clearing out session storage and localstorage
    localStorage.clear();
    sessionStorage.clear();
  }

  decrypt = () => {
    axios.post("/api/decrypt",{token: localStorage.getItem("token"), id: sessionStorage.getItem("id")}).then((response)=>{
      console.log(response.data);
    });
  }

  render(){
    return (
      <Grid container spacing = {8} style={{marginTop: 100}}>
        <Grid container item xs={12} style={{marginLeft: 100}}>
            <Grid item xs={6} style={{maxHeight: 375, overflow: "auto", marginLeft: 35, marginRight: 140}}>
              <ActiveTasks />
            </Grid>
            <Grid item xs={4} style={{justifyContent: "left"}}>
              <ProfileCard />
            </Grid>
        </Grid>
        <Grid container style={{justifyContent: 'center'}}>
            <Grid item xs={10} >
              <ProjectList />
            </Grid>
          </Grid>
        <Link onClick={this.logOut} to="/">Logout.</Link>
      </Grid>
        
    );
  }
}

export default Homepage;
