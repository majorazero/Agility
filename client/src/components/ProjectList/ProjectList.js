import React, {Component} from "react";
import Modal from '@material-ui/core/Modal';
import axios from "axios";
require("./ProjectList.css");

class ProjectList extends Component{
  state = {
    projectName: "",
    summary: "",
    dueDate: "",
    projects: ""
  }



  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }
  handleSubmit= (event) => {
    event.preventDefault();
    //we'll create a project now.
    let dateFormat = this.state.dueDate;
    console.log(dateFormat);
    axios.post("/api/project",{
      name: this.state.projectName,
      summary: this.state.summary,
      dueDate: this.state.dueDate
    }).then((response) => {
      console.log(response.data);
    });
  }

  render(){
    return(
      <div className="projList">
        <h1>This is a project List.</h1>
        <div>
          Imagine a scroll bar here.
        </div>
        <form onSubmit={this.handleSubmit}>
          <h2>Someone(Mike) might have to material-ui this into a modal/drawer for me.</h2>
          <h2>Project Name</h2>
          <input type="text" name="projectName" onChange={this.handleChange}/>
          <h2>Summary Name</h2>
          <textarea name="summary" onChange={this.handleChange}/>
          <h2>Due Date</h2>
          <input type="date" name="dueDate" onChange={this.handleChange}/>
          <div>
            <button type="Submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectList;
