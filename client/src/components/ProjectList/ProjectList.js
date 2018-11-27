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
      open: false,
      direction: "row",
      justify: "center",
      alignItems: "center",
      inviteCode: "",
      message: ""
    }
  }

  populate = () => {
    if (this.props.projects.length === 0) {
      return <Typography gutterBottom variant='h4'>Start a new project!</Typography>;
    }
    else {
      return (
        <div>
          {this.props.projects.map((item) => {
            return (
              <SingleLineGridList
                onClick={this.handleOpen}
                title='ADD PROJECT'
                key={item.id}
                name={item.name}
                summary={item.summary}
                isAdmin={(item.userId === parseInt(this.props.currentUser)) ? true : false}
                onProjectPress={() => { this.onProjectPress(item.id) }}
              />
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
            <ListItem style={{ width: '50%' }} item>
              <InputTextField
                onSubmit={this.props.handleInviteSubmit}
                label="Sprint Invite Code:"
                name="inviteCode"
                onChange={this.props.handleInviteChange}
              />
          </ListItem>
            {this.populate()}
          </List>
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
        {this.props.showsnack ? <AlertSnackbar
          open={this.props.showsnack}
          variant='error'
          message='You are already part of this sprint.'
        /> : null}
      </div>
    );
  }
}

export default ProjectList;
