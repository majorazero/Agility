import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

//has to be

class Homepage extends Component {


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
      <div>
        <h1>This is a homepage.</h1>
        <button onClick={this.decrypt}>What's my id? This is for testing duh.</button>
        <Link onClick={this.logOut} to="/">Logout.</Link>
      </div>

    );
  }
}

export default Homepage;
