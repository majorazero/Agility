import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";
import ProjectListTab from "./ProjectListTab/ProjectListTab.js";
import SimpleModalProjectWrapped from "../utils/ModalProject.js";
import AddProjectLayout from "../utils/AddProjectLayout.js";
import ButtonSizes from "../utils/FAB.js";
import GridList from '@material-ui/core/GridList';


class ProjectList extends Component {
  state = {
    name: "",
    summary: "",
    due_date: "",
    projects: [],
    open: false,
    direction: 'column',
    justify: 'flex-start',
    alignItems: 'flex-start',
    projects: [],
    inviteCode: ""
  }

  componentDidMount = () => {
    this.fetch();
  }

  fetch = () => {
    axios.post("/api/projectOfUser", {
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      console.log(response.data);
      this.setState({ projects: response.data });
    });
  }

  populate = () => {
    if (this.state.projects.length === 0) {
      //maybe ill replace this with something if no projects appeared yet.
      return <h1>Oops no projects yet.</h1>;
    }
    else {
      return this.state.projects.map((item) => {
        return <ProjectListTab
          key={item.id}
          name={item.name}
          summary={item.summary}
          duedate={item.due_date}
          onProjectPress={() => { this.onProjectPress(item.id) }} />;
      });
    }
  }

  //we'll pass project id into this and link it to a specific project page
  onProjectPress = (id) => {
    axios.post("/api/encrypt",{
      token: "project",
      id: id.toString()
    }).then((data) => {
      window.location.assign(`/project/${data.data}`);
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log(this.state);
    });
  };

  handleInviteChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //we'll create a project now.
    axios.post("/api/project", {
      name: this.state.name,
      summary: this.state.summary,
      due_date: this.state.due_date,
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.fetch();
    });
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleInviteSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/sprintMembershipWithCode",{sId: this.state.inviteCode, uId: sessionStorage.getItem("id"), token: localStorage.getItem("token")}).then((response) => {
      console.log(this.state);
    });
    console.log(this.state.inviteCode);
  }

  render() {
    const { direction, justify, alignItems } = this.state;
    return (
      <div>
        <Grid
          container
          alignItems={alignItems}
          direction={direction}
          justify={justify}
        >
          <SimpleModalProjectWrapped
            open={this.state.open}
            onClose={this.handleClose}
            name="Add a New Project ..."
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          >

            <AddProjectLayout
            />
          </SimpleModalProjectWrapped>
      <div className="projList">
      <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                maxWidth: 1200,
                overflow: 'hidden'}}>
            <GridList style={{
              flexWrap: 'nowrap',
              transform: 'translateZ(0)'}}>
              {this.populate()}
            </GridList>
        </div>
        <ButtonSizes
            onClick={this.handleOpen}
          />

        <h2>Join Sprint with Invite Code</h2>

        <div className="invCodeDiv">
          <form onSubmit={this.handleInviteSubmit}>
            <h3>Invite Code:</h3>
            <input type="text" name="inviteCode" onChange={this.handleInviteChange} />
            <button>Submit</button>
          </form>
        </div>
        </div>
        </Grid>
      </div>
    );
  }
}

export default ProjectList;
