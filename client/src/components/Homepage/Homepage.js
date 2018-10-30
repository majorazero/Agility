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
        <Grid item>
          <ProfileCard />
        </Grid>
        <Grid item>
          <ProjectList />
        </Grid>
        <Link onClick={this.logOut} to="/">Logout.</Link>
      </Grid>
        
    );
  }
}

export default Homepage;
