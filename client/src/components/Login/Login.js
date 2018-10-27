import React, {Component} from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    },console.log(this.state));
  }

  render(){
    return(
      <div>
        <h1>This is a login page.</h1>
        <form type="submit">
          <h2>Username:</h2>
          <input type="text" name="username" onChange={this.handleChange}/>
          <h2>Password:</h2>
          <input type="password" name="password" onChange={this.handleChange}/>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
