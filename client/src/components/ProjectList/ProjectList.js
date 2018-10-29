import React, {Component} from "react";
import Modal from '@material-ui/core/Modal';
require("./ProjectList.css");

class ProjectList extends Component{
  state = {
    projectName: "",
    summary: "",
    dueDate: ""
  }

  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
  }

  render(){
    return(
      <div className="projList">
        <h1>This is a project List.</h1>
        <div>

        </div>
        <form>
          <h2>Someone(Mike) might have to material-ui this into a modal/drawer for me.</h2>
          <h2>Project Name</h2>
          <input type="text" name="projectName" onChange={this.handleChange}/>
          <h2>Summary Name</h2>
          <textarea name="summary" onChange={this.handleChange}/>
          <h2>Due Date</h2>
          <input type="date" name="dueDate" onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

export default ProjectList;
