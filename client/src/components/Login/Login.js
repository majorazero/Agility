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
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/login",this.state,(response) => {
      console.log(response.data);
    })
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
      </div>
    );
  }
}

export default Login;
