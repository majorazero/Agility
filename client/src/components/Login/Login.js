import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/login",this.state).then((res) => {
      console.log(res.data);
      sessionStorage.setItem("id", res.data.id);
      localStorage.setItem("token", res.data.token);
      console.log(sessionStorage.getItem("id"),localStorage.getItem("token"));
      window.location.assign("/homepage");
    });
  }

  render(){
    return(
      <div>
        <h1>This is a login page.</h1>
        <form type="submit" onSubmit={this.handleSubmit}>
          <h2>Username:</h2>
          <input type="text" name="username" onChange={this.handleChange}/>
          <h2>Password:</h2>
          <input type="password" name="password" onChange={this.handleChange}/>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <div><Link to="/register">New user? Register!</Link></div>
        <div><Link to="/">Back to landing page.</Link></div>
      </div>
    );
  }
}

export default Login;
