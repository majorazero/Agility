import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import RegisterLayout from "../utils/RegisterLayout.js"
import SimpleBottomNavigation from "../utils/Footer/Footer.js";


class Register extends Component {
  state = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    message: ""
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/register",this.state).then((res)=>{
      if(res.data === "User already exists!"){
        this.setState({message:res.data});
      }
      else{
        sessionStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        window.location.assign("/homepage");
      }
    });
  }

  render(){
    return(<div>
      <h1 style={{textAlign:"center"}}>Register!</h1>
        <small>{this.state.message}</small>

        <RegisterLayout
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        {/* <form type="submit" onSubmit={this.handleSubmit}>
          <h2>First Name:</h2>
          <input type="text" name="fName" onChange={this.handleChange}/>
          <h2>Last Name:</h2>
          <input type="text" name="lName" onChange={this.handleChange}/>
          <h2>Email:</h2>
          <input type="email" name="email" onChange={this.handleChange}/>
          <h2>Password:</h2>
          <input type="password" name="password" onChange={this.handleChange}/>
          <div>
            <button>Submit</button>
          </div>
        </form> */}
        <div style={{textAlign:"center", marginTop: "5px"}}>
      <Link  to="/login">Back to login.</Link>
      </div>
      <SimpleBottomNavigation/>
    </div>
    );
  }
}

export default Register;
