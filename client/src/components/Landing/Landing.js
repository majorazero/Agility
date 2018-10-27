import React, {Component} from "react";
import {Link} from "react-router-dom";

class Landing extends Component {

  componentWillMount(){
    //obviously we'll have to be updated once i get the database going.
    //if sessionStorage doesn't exist
    if(sessionStorage.getItem("id") === null){
      console.log("no session storage!");
      //we check if token exist, it does
      if(localStorage.getItem("token") !== null){
        console.log("checking database if token exists");
        console.log("I'd auto log you in at this point but this is actually kind of annoying for testing, uncomment out window.location if you wanan see how this works.");
        //if it does we'll log the user in.
        //window.location.assign("/homepage");
      }
      //if no token exists, they have to login.
    }
  }

  render(){
    return (
      <div>
        <h1>This is a landing page.</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Landing;
