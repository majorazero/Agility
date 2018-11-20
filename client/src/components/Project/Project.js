import React from "react";
import axios from "axios";
import Pool from "./Pool.js";
import SimpleModalWrapped from "../utils/Modal";
import AddTaskLayout from "../utils/AddTaskLayout.js";
import UserPool from './UserPool';
import ButtonAppBar from "../utils/Navbar/Navbar.js";
import AddSprintLayout from "../utils/AddSprintLayout.js";
import SimpleModalSprintWrapped from '../utils/ModalSprint';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Summary from "./Summary/Summary.js";
import LinearDeterminate from "../utils/ProgressBar/ProgressBar.js";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ClippedDrawer from './../utils/Navbar/SprintDrawer.js';
import Tab from './../utils/Tab.js';
import Add from '@material-ui/icons/Add';
import { ListItemText } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = {
    root: {
        padding: '0px 30px 0px 10px'
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    }
}



class Project extends React.Component {
  state = {
    //this is the project's personal info
    projName: "",
    summary: "",
    projDueDate: "",
    projectId: "",
    adminId: "",
    isAdmin: "",

    inviteCode: "",

    isActive: "",
    activeSprintId: '',

    unassignedTasks: [],
    assignedTasks: [],
    completedTasks: [],
    projects: [],
    sprints: [],
    members: [],
    direction: 'column',
    justify: 'flex-start',
    alignItems: 'flex-start',

    // temp id set
    sprintId: -1,

    taskOpen: false,
    taskName: "",
    taskDue_date: "",
    taskDescription: "",
    taskComplexity: "",
    taskStack: "",
    chipData: [],

    sprintOpen: false,
    sprintName: "",
    sprintStart_date: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`,
    sprintEnd_date: "",

    currentUser: '',
    showComplete: false,

    //Progress Bar Time
    SprintTime: 0,
    SprintProgress: 0,

    expanded: null //handles the accordion function for expansion panels
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.post("/api/projectById", {
      token: "project",
      id: id
    }).then((response) => {
      this.setState({
        projName: response.data[0].name,
        summary: response.data[0].summary,
        projDueDate: response.data[0].due_date,
        projectId: response.data[0].id,
        adminId: response.data[0].userId
      });

      //pass project id here
      this.getMembers(this.state.sprintId);
      this.getCurrentUserId();
    }).catch((err) => {
      window.location.assign("/404");
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getTasks = () => {
    // let number = this.state.projects
    // below we'll just place the variable in where we grab the dynamically updated 'project' that we're on depending on user choice
    axios.get("/api/task/" + this.state.sprintId).then((res) => {
      let task = res.data;
      let unassigned = [];
      let assigned = [];
      let completed = [];

      for (let i = 0; i < task.length; i++) {
        if (task[i].assigned_id === null) {
          unassigned.push(task[i])
        }

        else if (!task[i].isCompleted) {
          assigned.push(task[i]);
        }
        else if (task[i].isCompleted) {
          completed.push(task[i])
        }
      }
      let progressStat = (completed.length / (completed.length + assigned.length + unassigned.length) * 100);
      this.setState({
        unassignedTasks: unassigned,
        assignedTasks: assigned,
        completedTasks: completed,
        SprintProgress: progressStat
      });
    });
  };

  addTask = (event) => {
      event.preventDefault();
      if (this.state.taskComplexity <= 5 && this.state.taskComplexity >= 1) {
          axios.post("/api/task", {
              name: this.state.taskName,
              due_date: this.state.taskDue_date,
              description: this.state.taskDescription,
              sprint_id: this.state.sprintId,
              complexity: this.state.taskComplexity,
              stack: this.state.taskStack
          }).then(() => {
              this.setState({
                  taskOpen: false
              });
              this.getTasks();
          });
      }
      else {
          console.log("Invalid complexity value!");
      }
  }

  addTask = () => {
    if (this.state.taskComplexity <= 5 && this.state.taskComplexity >= 1) {
      axios.post("/api/task", {
        name: this.state.taskName,
        due_date: this.state.taskDue_date,
        description: this.state.taskDescription,
        sprint_id: this.state.sprintId,
        complexity: this.state.taskComplexity,
        stack: this.state.taskStack
      }).then(() => {
        this.setState({
          taskOpen: false
        });
        this.getTasks();
      });
    }
    else {
      console.log("Invalid complexity value!");
    }
  }

  handleOpen = (name) => {
    this.setState({
      [name]: true
    }, () => {
      console.log(this.state.taskOpen)
    })
  }

  handleClose = (name) => {
      this.setState({ [name]: false });
  };

  deleteTask = (task) => {
      axios.delete("/api/task/by/" + task.id).then(() => {
          this.getTasks();
      });
  }

  assignTask = (task) => {
    axios.post("/api/decrypt", { token: localStorage.getItem("token"), id: sessionStorage.getItem("id") }).then((response) => {
      let user = response.data;
      axios.put("/api/task/by/" + task.id + "/" + user).then((res) => {
          // console.log(res.data);
          this.getTasks();
          //window.location.reload();
      })
    });
  }

  unassignTask = (id) => {
    axios.put("/api/task/unassign", { id: id }).then((response) => {
      this.getTasks();
    });
  }

  updateActiveSprint = (sprintId) => {
    let isActive = false;
    if (this.state.activeSprintId === sprintId) {
        isActive = true;
    }
    this.setState({ sprintId: sprintId, isActive: isActive }, () => {
      this.getTasks();
      this.getMembers(this.state.sprintId);
    });
  }

  defaultVal = () => {
    let today = new Date().split("T");
    this.setState({
        due_date: today
    });
  };

  getSprints = (projectId, userId) => {
    let sprintData = [];
    axios.get(`/api/sprints/project/${projectId}/user/${userId}`).then((res) => {
      if (res.data.length > 0) {
        let sprints = res.data
        let today = new Date();
        let currentSprint = res.data[0].sprintId;
        let activeSprint;
        let isActive = false;
        let timeProgress = 0;
        // check for active sprint
        for (let i = 0; i < sprints.length; i++) {
          let endDate = new Date(`${sprints[i].endDate}T00:00:00`)
          let startDate = new Date(`${sprints[i].startDate}T00:00:00`)
          let currentDate = new Date();
          sprintData.push({
            key: i,
            label: sprints[i].sprintName,
            id: sprints[i].sprintId,
            start: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
            end: `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`
          });
          if (sprints[i].isActive) {
            //verify end date has not passed
            if (today > endDate) {
              isActive = false
            }
            else {
              //set currentSprint, set isActive
              activeSprint = sprints[i].sprintId;
              currentSprint = activeSprint
              isActive = true;
              timeProgress = ((endDate - currentDate) / (endDate - startDate) * 100);
            }
          }
          else if (today >= startDate && today <= endDate) {
            activeSprint = sprints[i].sprintId;
            currentSprint = activeSprint
            isActive = true;
            timeProgress = ((endDate - currentDate) / (endDate - startDate) * 100);
          }
        }
        this.setState({
          SprintTime: timeProgress,
          chipData: sprintData,
          sprintId: currentSprint,
          activeSprintId: activeSprint,
          sprints: res.data,
          isActive: isActive
        });
      }
    }).then(() => {
      this.getTasks();
      this.getMembers(this.state.sprintId);
    });
  };

  addSprint = () => {
    axios.post('/api/sprint', {
      name: this.state.sprintName,
      start_date: this.state.sprintStart_date,
      end_date: this.state.sprintEnd_date,
      project_id: this.state.projectId
    }).then((res) => {
      axios.post(`/api/sprintMembership`, { userId: this.state.currentUser, sprintId: res.data.id })
      .then(() => {
        this.setState({
          sprintOpen: false
        }, () => {
          this.getSprints(this.state.projectId, this.state.currentUser);
        });
      })
    });
  }

  getMembers = (sprintId) => {
    axios.post('/api/allMemberInSprint', { sprintId: sprintId }).then(res => {
      this.setState({ members: res.data });
    })
  }

  getCurrentUserId = () => {
    axios.post("/api/userByDecrypt", {
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then(res => {
      let isAdmin = false;
      if (res.data.id === this.state.adminId) {
        isAdmin = true;
      }
      this.setState({ currentUser: res.data.id, isAdmin: isAdmin },
        () => {
          this.getSprints(this.state.projectId, this.state.currentUser)
        }
      );
    });
  }


  inviteMember = () => {
    //we'll pass the sprint id as an encrypted id
    axios.post("/api/encrypt", {
      id: this.state.sprintId.toString(),
      token: "invite"
    }).then((response) => {
      this.setState({ inviteCode: response.data });
    });
  }

  markComplete = (id) => {
    axios.put(`/api/complete/task/${id}`)
      .then(() => {
        this.getTasks();
      }
    )
  }

  reopenTask = (id) => {
    axios.put(`/api/reopen/task/${id}`)
      .then(() => {
        this.getTasks();
      }
    )
  }

  switchTaskPool = () => {
    if (this.state.showComplete === true) {
      this.setState({ showComplete: false })
    }
    else {
      this.setState({ showComplete: true })
    }
  }

  handleTaskOpen = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
      const { expanded } = this.state;
      const { classes } = this.props;
      return (
          <div>

              <ButtonAppBar />

              <div
                  className="parallax"
                  style={{
                      display: 'flex',
                      flexGrow: 1,
                      backgroundColor: 'dimgray',
                      paddingTop: 75,
                      resizeMode: 'cover',
                      height: "-webkit-fill-available"
                  }} >

                  {/* <Grid
                      container
                      spacing={8}
                      style={{ padding: 25 }}
                  >
                      <Grid item xs>
                          <Paper
                              style={{ height: "100%", background: 'whitesmoke' }}
                          >
                              <Grid item xs style={{ padding: '25px 25px 0 25px' }}>
                                  <Typography fullWidth variant="h5" gutterBottom>Sprints</Typography>
                              </Grid>
                              <Grid
                                  container
                                  spacing={8}
                              >
                                  <Grid item xs>
                                  <SimpleModalSprintWrapped
                                          open={this.state.sprintOpen}
                                          onClose={() => this.handleClose('sprintOpen')}
                                          name="Add a New Sprint ..."
                                          onSubmit={this.addSprint}
                                          onChange={this.handleChange}
                                      >
                                          <AddSprintLayout
                                          />
                                      </SimpleModalSprintWrapped>
                                      <Chips
                                          sprints={this.state.chipData}
                                          onClick={this.updateActiveSprint}
                                          activeSprint={this.state.sprintId}
                                          currentUser={this.state.currentUser}
                                      />
                                  </Grid>
                                  <div style={{ marginRight: 5 }}>
                                      {(this.state.isAdmin === true) ?
                                          <ButtonSizes
                                              onClick={() => this.handleOpen('sprintOpen')}
                                              title="Add a Sprint"
                                              color="secondary"
                                              placement="left"
                                              mini
                                          /> :
                                          ""}
                                  </div>
                              </Grid>
                          </Paper>
                      </Grid>
                  </Grid> */}
                  {/* <Grid
                      container
                      spacing={32}
                      style={{ padding: 25 }}
                  >
                      <Grid
                          item
                          xs={6}
                          style={{ height: 'fit-content' }}
                      >
                          <Paper
                              style={{ background: 'whitesmoke', height: '100%', maxHeight: '100%' }}
                          >
                              <Grid item xs={12} style={{ padding: '25px 25px 0 25px' }}>
                                  <Typography fullWidth variant="h5" gutterBottom>Tasks</Typography>
                              </Grid>
                              <Grid
                                  container
                                  spacing={8}
                                  style={{ padding: '0 25px 0 25px' }}
                              >
                                  <Grid item xs={6}>
                                      <SwitchLabel
                                          onChange={this.switchTaskPool}
                                          label="Show Completed Tasks"
                                      />
                                  </Grid>
                                  <Grid item xs style={{ display: "flex", justifyContent: "flex-start", marginTop: 7 }}>
                                      <SimplePopper
                                          onPoperClick={this.inviteMember}
                                          message={this.state.inviteCode}
                                      />
                                  </Grid>
                                  <Grid item xs>
                                      {this.state.isActive ?
                                          ((this.state.isAdmin === true) ?
                                              <ButtonSizes
                                                  onClick={() => this.handleOpen('taskOpen')}
                                                  title="Add a Task"
                                                  color="secondary"
                                                  placement="top"
                                              /> : null)
                                          : null}
                                  </Grid>
                              </Grid>
                              <Grid
                                  container
                                  spacing={8}

                              >
                                  <Grid item xs>
                                      <List style={{
                                          width: '100%',
                                          maxWidth: '100%',
                                          position: 'relative',
                                          overflow: 'auto',
                                          maxHeight: 300,
                                      }}>
                                          {!this.state.isActive ?
                                              <li>
                                                  {this.state.showComplete ? this.state.completedTasks.map((task) => {
                                                      return (
                                                          <ul>
                                                              <ListItem classes={{ root: classes.root }}>
                                                                  <Pool
                                                                      key={task.id}
                                                                      id={this.key}
                                                                      isAdmin={this.state.isAdmin}
                                                                      tasks={task}
                                                                      onClickDelete={this.deleteTask.bind(this, task)}
                                                                      onClickReopen={() => this.reopenTask(task.id)}
                                                                      assignedUser={task.assigned_id}
                                                                      currentUser={this.state.currentUser}
                                                                      expanded={expanded === `panel${task.id}`}
                                                                      onChange={this.handleTaskOpen(`panel${task.id}`)}
                                                                      complete
                                                                  />
                                                              </ListItem>
                                                          </ul>
                                                      );
                                                  }) :
                                                      <Summary
                                                          members={this.state.members}
                                                          completed={this.state.completedTasks}
                                                          assigned={this.state.assignedTasks}
                                                          unAssigned={this.state.unassignedTasks}
                                                          currentSprint={this.state.sprintId}
                                                          sprints={this.state.sprints} />}
                                              </li> :
                                              <li> {(this.state.isAdmin === true) ?
                                    <ButtonSizes
                                        onClick={() => this.handleOpen('taskOpen')}
                                        title="Add a Task"
                                        color="secondary"
                                    /> :
                                    ""} <SimpleModalWrapped
                                                      open={this.state.taskOpen}
                                                      onClose={() => this.handleClose('taskOpen')}
                                                      name="Add a New Task ..."
                                                      onSubmit={this.addTask}
                                                      onChange={this.handleChange}
                                                  >
                                                      <AddTaskLayout
                                                      />
                                                  </SimpleModalWrapped>

                                                  {this.state.showComplete ? this.state.completedTasks.map((task) => {
                                                      return (
                                                          <ul>
                                                              <ListItem classes={{ root: classes.root }}>
                                                                  <Pool
                                                                      key={task.id}
                                                                      id={this.key}
                                                                      isAdmin={this.state.isAdmin}
                                                                      tasks={task}
                                                                      onClickDelete={this.deleteTask.bind(this, task)}
                                                                      onClickReopen={() => this.reopenTask(task.id)}
                                                                      assignedUser={task.assigned_id}
                                                                      assigned={true}
                                                                      currentUser={this.state.currentUser}
                                                                      expanded={expanded === `panel${task.id}`}
                                                                      onChange={this.handleTaskOpen(`panel${task.id}`)}
                                                                      complete
                                                                  />
                                                              </ListItem>
                                                          </ul>
                                                      );
                                                  }) : this.state.unassignedTasks.map((task) => {
                                                      return (
                                                          <ul>
                                                              <ListItem classes={{ root: classes.root }}>
                                                                  <Pool
                                                                      key={task.id}
                                                                      id={this.key}
                                                                      isAdmin={this.state.isAdmin}
                                                                      tasks={task}
                                                                      onClickDelete={this.deleteTask.bind(this, task)}
                                                                      onClickAdd={this.assignTask.bind(this, task)}
                                                                      currentUser={this.state.currentUser}
                                                                      expanded={expanded === `panel${task.id}`}
                                                                      onChange={this.handleTaskOpen(`panel${task.id}`)}
                                                                  />
                                                              </ListItem>
                                                          </ul>
                                                      );
                                                  })}
                                              </li>}
                                      </List>
                                  </Grid>
                              </Grid>
                          </Paper>
                      </Grid>
                      <Grid item xs={6} style={{ height: 'fit-content' }}>
                          <Paper
                              style={{ height: '100%', maxHeight: '100%' }}
                          >
                              <Grid item xs={12} style={{ padding: '25px 25px 0 25px' }}>
                                  <Typography fullWidth variant="h5" gutterBottom>Project Users</Typography>
                              </Grid>
                              <Grid
                                  container
                                  spacing={8}
                              >
                                  <Grid item xs>
                                      <UserPool
                                          isAdmin={this.state.isAdmin}
                                          currentUser={this.state.currentUser}
                                          sprintId={this.state.sprintId}
                                          members={this.state.members}
                                          tasks={this.state.assignedTasks}
                                          unassign={this.unassignTask}
                                          onClickDelete={this.deleteTask}
                                          onClickComplete={this.markComplete}
                                      />
                                  </Grid>
                              </Grid>
                          </Paper>
                      </Grid>
                      <Grid
                          container
                          spacing={8}
                          style={{ padding: 25 }}
                      >
                          <Grid item xs={12}> */}
                  {/* <MuiThemeProvider theme={theme}> */}
                  {/* <Paper
                                      style={{ background: 'none', border: 'none', height: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 10 }}
                                  > */}
                  {/* {(this.state.isActive) ? <LinearDeterminate whatBar completed={this.state.SprintTime} title={"Sprint Time"} /> : <LinearDeterminate whatBar completed={100} title={"Sprint Time"} />}
                              <LinearDeterminate completed={this.state.SprintProgress} title={"Sprint Progress"} /> */}
                  {/* </Paper> */}
                  {/* </MuiThemeProvider> */}
                  {/* </Grid>
                      </Grid>
                  </Grid> */}

                  <Tab
                      holyBalls={<List style={{
                        width: '100%',
                        maxWidth: '100%',
                        position: 'relative',
                        overflow: 'auto',
                      }}>
                        {!this.state.isActive ?
                          <li>
                            {this.state.showComplete ? this.state.completedTasks.map((task) => {
                              return (
                                <ul>
                                  <ListItem classes={{ root: classes.root }}>
                                    <Pool
                                      key={task.id}
                                      id={this.key}
                                      isAdmin={this.state.isAdmin}
                                      tasks={task}
                                      onClickDelete={this.deleteTask.bind(this, task)}
                                      onClickReopen={() => this.reopenTask(task.id)}
                                      assignedUser={task.assigned_id}
                                      currentUser={this.state.currentUser}
                                      expanded={expanded === `panel${task.id}`}
                                      onChange={this.handleTaskOpen(`panel${task.id}`)}
                                      complete
                                    />
                                  </ListItem>
                                </ul>
                              );
                            }) :
                              <Summary
                                members={this.state.members}
                                completed={this.state.completedTasks}
                                assigned={this.state.assignedTasks}
                                unAssigned={this.state.unassignedTasks}
                                currentSprint={this.state.sprintId}
                                sprints={this.state.sprints} />}
                        </li> :
                        <li> {(this.state.isAdmin === true) ?
                            <ListItem button onClick={() => this.handleOpen('taskOpen')} title="ADD TASK">
                              <ListItemIcon><Add /></ListItemIcon>
                              <ListItemText primary='ADD TASK' />
                            </ListItem>
                            :
                            ""}

                            {this.state.showComplete ? this.state.completedTasks.map((task) => {
                              return (
                                <ul>
                                  <ListItem classes={{ root: classes.root }}>
                                    <Pool
                                      key={task.id}
                                      id={this.key}
                                      isAdmin={this.state.isAdmin}
                                      tasks={task}
                                      onClickDelete={this.deleteTask.bind(this, task)}
                                      onClickReopen={() => this.reopenTask(task.id)}
                                      assignedUser={task.assigned_id}
                                      assigned={true}
                                      currentUser={this.state.currentUser}
                                      expanded={expanded === `panel${task.id}`}
                                      onChange={this.handleTaskOpen(`panel${task.id}`)}
                                      complete
                                    />
                                  </ListItem>
                                </ul>
                              );
                            }) : this.state.unassignedTasks.map((task) => {
                              return (
                                <ul>
                                  <ListItem classes={{ root: classes.root }}>
                                    <Pool
                                      key={task.id}
                                      id={this.key}
                                      isAdmin={this.state.isAdmin}
                                      tasks={task}
                                      onClickDelete={this.deleteTask.bind(this, task)}
                                      onClickAdd={this.assignTask.bind(this, task)}
                                      currentUser={this.state.currentUser}
                                      expanded={expanded === `panel${task.id}`}
                                      onChange={this.handleTaskOpen(`panel${task.id}`)}
                                    />
                                  </ListItem>
                                </ul>
                              );
                            })}
                          </li>}
                      </List>}

                      holySack={<UserPool
                        isAdmin={this.state.isAdmin}
                        currentUser={this.state.currentUser}
                        sprintId={this.state.sprintId}
                        members={this.state.members}
                        tasks={this.state.assignedTasks}
                        unassign={this.unassignTask}
                        onClickDelete={this.deleteTask}
                        onClickComplete={this.markComplete}
                      />}

                      holyTaint={<LinearDeterminate completed={this.state.SprintProgress} title={"Sprint Progress"} />}

                      onClick={() => this.handleOpen('taskOpen')}
                      title='ADD TASK'
                  />

                  <SimpleModalSprintWrapped
                      open={this.state.sprintOpen}
                      onClose={() => this.handleClose('sprintOpen')}
                      name="Add a New Sprint ..."
                      onSubmit={this.addSprint}
                      onChange={this.handleChange}
                  >
                    <AddSprintLayout
                    />
                  </SimpleModalSprintWrapped>
                  <SimpleModalWrapped
                    open={this.state.taskOpen}
                    onClose={() => this.handleClose('taskOpen')}
                    name="Add a New Task ..."
                    onSubmit={this.addTask}
                    onChange={this.handleChange}
                  >
                    <AddTaskLayout
                    />
                  </SimpleModalWrapped>

                  <ClippedDrawer
                    balls={() => this.handleOpen('sprintOpen')}
                    title="ADD SPRINT"
                    isAdmin={this.state.isAdmin}
                    sprints={this.state.chipData}
                    onClick={this.updateActiveSprint}
                    activeSprint={this.state.sprintId}
                    currentUser={this.state.currentUser}
                  />
              </div>
          </div>
      );
  }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Project);
