import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import ProjectListTab from "./ProjectListTab/ProjectListTab.js";
require("./ProjectList.css");

class ProjectList extends Component{
  state = {
    projectName: "",
    summary: "",
    dueDate: "",
    projects: []
  }

  componentDidMount = () => {
    this.fetch();
  }

  fetch = () => {
    axios.post("/api/projectOfUser",{
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.setState({projects: response.data});
    });
  }

  populate = () => {
    if(this.state.projects.length === 0){
      //maybe ill replace this with something if no projects appeared yet.
      return <h1>Oops no projects yet.</h1>;
    }
    else{
      return this.state.projects.map((item) => {
        return <ProjectListTab
          key={item.id}
          name={item.name}
          summary={item.summary}
          duedate={item.due_date}
          onProjectPress = {() => {this.onProjectPress(item.id)}} />;
      });
    }
  }

  //we'll pass project id into this and link it to a specific project page
  onProjectPress = (id) => {
    axios.post("/api/encrypt",{
      token: localStorage.getItem("token"),
      id: id.toString()
    }).then((data) => {
      window.location.assign(`/project/${data.data}`);
    });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }
  handleSubmit= (event) => {
    event.preventDefault();
    //we'll create a project now.
    axios.post("/api/project",{
      name: this.state.projectName,
      summary: this.state.summary,
      due_date: this.state.dueDate,
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.fetch();
    });
  }

  render(){
    return(
      <div className="projList">
        <h1>This is a project List.</h1>
        <div>
          {this.populate()}
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
