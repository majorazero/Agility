import React, { Component } from "react";
import { Grid, ListItem } from "@material-ui/core";
import axios from "axios";
import SingleLineGridList from "./ProjectListTab/ProjectListTab.js";
import SimpleModalProjectWrapped from "../utils/ModalProject.js";
import AddProjectLayout from "../utils/AddProjectLayout.js";
import InputTextField from "../utils/InputTextField.js";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Add from '@material-ui/icons/Add';
import AlertSnackbar from './../utils/Snackbar.js';

class ProjectList extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      summary: "",
      projects: this.props.projects,
      open: false,
      direction: "row",
      justify: "center",
      alignItems: "center",
      inviteCode: "",
      message: "",
      currentUser: this.props.currentUser,
      showsnack: this.props.showsnack
    }
  }

  // fetch = () => {
  //   console.log(this.props);
  //   axios.post("/api/projectOfUser", {
  //     id: sessionStorage.getItem("id"),
  //     token: localStorage.getItem("token")
  //   }).then((response) => {
  //     console.log(response.data);
  //     this.setState({
  //       projects: response.data.projects,
  //       currentUser: response.data.currentUser
  //     });
  //   });
  // }

  populate = () => {
    if (this.state.projects.length === 0) {
      return <h1>Start a new project!</h1>;
    }
    else {
      return (
        <div>
          {this.state.projects.map((item) => {
            return (
              <SingleLineGridList
                onClick={this.handleOpen}
                title='ADD PROJECT'
                key={item.id}
                name={item.name}
                summary={item.summary}
                isAdmin={(item.userId === parseInt(this.state.currentUser)) ? true : false}
                onProjectPress={() => { this.onProjectPress(item.id) }} />
            )
          })}
        </div>
      )
    }
  }

  //we'll pass project id into this and link it to a specific project page
  onProjectPress = (id) => {
    axios.post("/api/encrypt", {
      token: "project",
      id: id.toString()
    }).then((data) => {
      window.location.assign(`/project/${data.data}`);
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // handleInviteChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  handleSubmit = () => {
    axios.post("/api/project", {
      name: this.state.name,
      summary: this.state.summary,
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.props.fetch();
      this.handleClose();
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

  // handleInviteSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post("/api/sprintMembershipWithCode", { sId: this.state.inviteCode, uId: sessionStorage.getItem("id"), token: localStorage.getItem("token") }).then((response) => {
  //     if (response.data === "Already part of sprint!") {
  //         this.setState({ showsnack: true });
  //         setTimeout(() => { this.setState({showsnack: false }) }, 3000);
  //     }
  //     else {
  //       this.fetch();
  //     }
  //   });
  // }

  render() {
    return (
      <div
        className="balls"
        style={{
          position: "relative"
        }}
      >
        <div
          className="eat"
          style={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            padding: 10,
            width: '100%'
          }}
        >
          <List>
            <ListItem style={{ width: '50%' }} button onClick={this.handleOpen}>
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText primary='ADD PROJECT' />
            </ListItem>
            {this.populate()}
            {/*this.state.projects.length === 0 ? */}
          </List>
          <Grid item>
            {/* <Typography variant="h5" gutterBottom>{this.state.message}</Typography> */}

            <InputTextField
              onSubmit={this.props.handleInviteSubmit}
              label="Sprint Invite Code:"
              name="inviteCode"
              onChange={this.props.handleInviteChange}
            />

          </Grid>
        </div>

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
        {this.state.showsnack ? <AlertSnackbar
          open={this.state.showsnack}
          variant='error'
          message='You are already part of this sprint.'
        /> : null}
      </div>
    );
  }
}

export default ProjectList;
