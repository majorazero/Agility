import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Register extends Component {
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
    axios.post("/api/register",this.state).then((res)=>{
      console.log(res.data);
    });
  }

  render(){
    return(<div>
      <h1>Register!</h1>
        <form type="submit" onSubmit={this.handleSubmit}>
          <h2>Username:</h2>
          <input type="text" name="username" onChange={this.handleChange}/>
          <h2>Password:</h2>
          <input type="password" name="password" onChange={this.handleChange}/>
          <div>
            <button>Submit</button>
          </div>
        </form>
      <Link to="/login">Back to login.</Link>
    </div>);
  }
}

export default Register;
