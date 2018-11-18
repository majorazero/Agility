import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, ListItem } from "@material-ui/core";
import axios from "axios";
import SingleLineGridList from "./ProjectListTab/ProjectListTab.js";
import SimpleModalProjectWrapped from "../utils/ModalProject.js";
import AddProjectLayout from "../utils/AddProjectLayout.js";
import ButtonSizes from "../utils/FAB.js";
import GridList from '@material-ui/core/GridList';
import MouseOverPopover from '../utils/popover.js';
import InputTextField from "../utils/InputTextField.js";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

class ProjectList extends Component {
  state = {
    name: "",
    summary: "",
    projects: [],
    open: false,
    direction: "row",
    justify: "center",
    alignItems: "center",
    projects: [],
    inviteCode: "",
    message: ""
  }

  componentDidMount = () => {
    this.fetch();
  }

  fetch = () => {
    axios.post("/api/projectOfUser", {
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.setState({ projects: response.data });
    });
  }

  populate = () => {
    if (this.state.projects.length === 0) {
      //maybe ill replace this with something if no projects appeared yet.
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
                // style={{ margin: 2, width: 100, height: 100 }}
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
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.fetch();
      this.handleClose();
    });
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    console.log(1);
    this.setState({ open: false });
  };

  handleInviteSubmit = (event) => {
    event.preventDefault();
    console.log(3);
    axios.post("/api/sprintMembershipWithCode", { sId: this.state.inviteCode, uId: sessionStorage.getItem("id"), token: localStorage.getItem("token") }).then((response) => {
      if (response.data === "Already part of sprint!") {
        console.log(response.data);
        this.setState({ message: response.data });
      }
      else {
        this.setState({ message: "You succesfully joined!" });
        this.fetch();
      }
    }).catch(err => {
      this.setState({ message: "Invalid invite code!" });
    });
  }

  render() {
    const { direction, justify, alignItems } = this.state;
    return (
      <div
        className="balls"
        style={{
          position: "relative"
        }}
      >

        {/* <Grid container
          spacing={16}
          alignItems={alignItems}
          direction={direction}
          justify={justify}
        >
          <Paper> */}
        <div
          className="eat"
          style={{
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            padding: 10,
            height: "100%",
            width: '100%'
          }}
        >
          <List>
            {this.populate()}
          </List>
          <Grid item>
            <Typography variant="h5" gutterBottom>{this.state.message}</Typography>
            <InputTextField
              onSubmit={this.handleInviteSubmit}
              label="Project Invite Code:"
              name="inviteCode"
              onChange={this.handleInviteChange}
            />
          </Grid>
        </div>

        {/* <Grid
          container
          spacing={8}
          // style={{ background: 'whitesmoke', margin: 'inherit', width: '-webkit-fill-available' }}
        >
          <Grid item xs={10} >
            <Typography variant="h5" gutterBottom>{this.state.message}</Typography>
            <InputTextField
              onSubmit={this.handleInviteSubmit}
              label="Project Invite Code:"
              name="inviteCode"
              onChange={this.handleInviteChange}
            />
          </Grid>
          <Grid item xs style ={{marginTop: 30}}>
            <ButtonSizes
              onClick={this.handleOpen}
              title="Add a Project"
              color="primary"
              placement="right"
            />
          </Grid>
        </Grid> */}

        {/* </Paper>
        </Grid> */}

        {/* <Grid xs={12}
          container

          style={{ marginBottom: 20 }}
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
          <div className="projList" >
            <Grid item xs={12}>
              <div style={{
                boxShadow: "4px 4px 5px 1px rgb(23, 23, 23, 0.5)",
                border: "10px solid lightgray",
                borderRadius: "20px",
                paddingTop: "7px",
                paddingBottom: "7px",
                paddingLeft: "6px",
                paddingRight: "6px",
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                maxWidth: 900,
                overflow: 'hidden',
                // width: "1200px"
                marginTop: 20,

              }}>
                <GridList style={{
                  flexWrap: 'nowrap',
                  transform: 'translateZ(0)',
                  width: "100%"
                }}>
                  {this.populate()}
                </GridList>
              </div>
            </Grid>
            <ButtonSizes
              onClick={this.handleOpen}
            />
            <h2>Join Sprint with Invite Code</h2> */}

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

        {/* <ButtonSizes
          onClick={this.handleOpen}
          title="Add a Project"
          color="primary"
        /> */}

        {/* style={{
          position: "absolute"
        }}
         <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          spacing={8}
          style={{
            height: 90,
          }}
        > */}
        {/* <Grid item xs={9} /> */}
        {/* <Grid item xs>
            <Typography variant="h5" gutterBottom>{this.state.message}</Typography>

            <InputTextField
              onSubmit={this.handleInviteSubmit}
              label="Project Invite Code:"
              name="inviteCode"
              onChange={this.handleInviteChange}
              style={{
                position: "inherit"
              }}
            />
          </Grid>
         </Grid> */}

        {/* <div className="invCodeDiv">
          <form onSubmit={this.handleInviteSubmit}>
            <small>{this.state.message}</small>
            <h3>Invite Code:</h3>
            <input type="text" name="inviteCode" onChange={this.handleInviteChange} />
            <button>Submit</button>
          </form>
        </div> */}
      </div >
    );
  }
}

export default ProjectList;
