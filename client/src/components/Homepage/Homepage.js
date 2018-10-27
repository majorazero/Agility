import React, {Component} from "react";
import {Link} from "react-router-dom";

//has to be

class Homepage extends Component {


  logOut = () => {
    //logging out means clearing out session storage and localstorage
    localStorage.clear();
    sessionStorage.clear();
  }

  render(){
    return (
      <div>
        <h1>This is a homepage.</h1>
        <Link onClick={this.logOut} to="/">Logout.</Link>
      </div>

    );
  }
}

export default Homepage;
