import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pool from "./Pool.js";
import { Grid } from "@material-ui/core";
import ButtonSizes from "../utils/FAB.js";
import SimpleModalWrapped from "../utils/Modal";
import AddTaskLayout from "../utils/AddTaskLayout.js";
import Chips from './SprintSelect';
import UserPool from './UserPool';
import ButtonAppBar from "../utils/Navbar/Navbar.js";
import AddSprintLayout from "../utils/AddSprintLayout.js";
import SimpleModalSprintWrapped from '../utils/ModalSprint';
import SimpleBottomNavigation from "../utils/Footer/Footer.js";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SwitchLabel from '../utils/Switch';
import Summary from "./Summary/Summary.js";
import LinearDeterminate from "../utils/ProgressBar/ProgressBar.js";
import moment from "moment";


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
        sprintId: 4,

        taskOpen: false,
        taskName: "",
        taskDue_date: "",
        taskDescription: "",
        chipData: [],

        sprintOpen: false,
        sprintName: "",
        sprintStart_date: "",
        sprintEnd_date: "",

        currentUser: '',
        showComplete: false,

        //Progress Bar Time
        SprintTime: 20,
        SprintProgress: 50
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

        // this.ProgressBar();
    }

    // ProgressBar = () => {

    //     // axios.get("/api/sprintById/" + this.state.sprintId).then((res) => {
    //         // console.log(res)
    //         let startDate = res.data[0].start_date;
    //         let endDate = res.data[0].end_date;
    //         var momentStart = moment(startDate).valueOf()
    //         var momentEnd = moment(endDate).valueOf()
    //         var difference = momentEnd - momentStart
    //         var currentTime = moment(Date.now()).valueOf()
    //         console.log(currentTime)

    //         var timeHasPassed =  currentTime - momentStart;

    //         var timeLeft = timeHasPassed - currentTime;

    //         this.setState({timeHasPassed})
    //         this.setState({timeLeft})


    //         console.log(timeHasPassed)
    //         console.log(timeLeft)
    //     // })
    // }

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
            this.setState({
                unassignedTasks: unassigned,
                assignedTasks: assigned,
                completedTasks: completed
            }, () => {
                console.log(this.state.completedTasks)
            })
        });
    };

    addTask = (event) => {
        event.preventDefault();
        console.log(this.state.name, this.state.due_date, this.state.description, this.state.sprintId)
        // would put sprintId state in as basis for task addition
        axios.post("/api/task", {
            name: this.state.taskName,
            due_date: this.state.taskDue_date,
            description: this.state.taskDescription,
            sprint_id: this.state.sprintId
        }).then(() => {
            this.setState({
                taskOpen: false
            });
            this.getTasks();
        });
    }

    handleOpen = (name) => {
        console.log(name)
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
        console.log("assign task")
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
        console.log('unassign task')
        axios.put("/api/task/unassign", { id: id }).then((response) => {
            this.getTasks();
        });
    }

    updateActiveSprint = (sprintId) => {
        let isActive = false;
        for(let i = 0; i < this.state.sprints.length; i++){
          if((this.state.sprints[i].sprintId === sprintId) && this.state.sprints[i].isActive === 1){
            isActive = true;
          }
        }
        this.setState({ sprintId: sprintId, isActive: isActive }, () => {
            this.getTasks();
            console.log(this.state);
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
        axios.get(`/api/sprints/project/${projectId}/user/${userId}`)
            .then((res) => {
                let today = new Date();
                //default to latest sprint
                let currentSprint = res.data[0].sprintId;
                let isActive = false;
                res.data.map((pSprint, i) => {
                    sprintData.push({
                        key: i,
                        label: pSprint.sprintName,
                        id: pSprint.sprintId
                    });
                    //if a sprint is not complete, it'll be set to that instead.
                    if (pSprint.isActive === 1) {
                      currentSprint = pSprint.sprintId;
                      isActive = true;
                    }
                });
              //  console.log(currentSprint,isActive);
                this.setState({
                    chipData: sprintData,
                    sprintId: currentSprint,
                    sprints: res.data,
                    isActive: isActive
                });
            }).then(() => {
                console.log("Active: ",this.state.isActive);
                this.getTasks();
                this.getMembers(this.state.sprintId);
            });
    };

    addSprint = (event) => {
        event.preventDefault();
        let obj = {
            name: this.state.sprintName,
            start_date: this.state.sprintStart_date,
            end_date: this.state.sprintEnd_date,
            project_id: this.state.projectId
        }
        axios.post('/api/sprint', {
            name: this.state.sprintName,
            start_date: this.state.sprintStart_date,
            end_date: this.state.sprintEnd_date,
            project_id: this.state.projectId
        }).then(() => {
            this.setState({
                sprintOpen: false
            }, () => {
                console.log(this.state.sprintOpen);
                this.getSprints(this.state.projectId);
            });
        });
    }

    getMembers = (sprintId) => {
        axios.post('/api/allMemberInSprint', { sprintId: sprintId }).then(res => {
            console.log("Members:", res.data);
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
                })
        })
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
            })
    }

    switchTaskPool = () => {
        if (this.state.showComplete === true) {
            this.setState({ showComplete: false })
        }
        else {
            this.setState({ showComplete: true })
        }
    }

    render() {
        const { direction, justify, alignItems } = this.state;
        return (
            <div>
                <ButtonAppBar />
                <div
                    className="parallax"
                    style={{
                        paddingTop: "50px",

                        // possible?
                        backgroundImage: `url("/assets/images/background.png")`,
                        resizeMode: 'cover',
                        height: "1050px"
                    }} >

                    <Grid
                        container
                        spacing={8}
                        style={{ padding: "50px" }}
                    >
                        <Grid item xs={12}>
                            <Paper
                                style={{ height: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 10 }}
                            >
                             {<LinearDeterminate whatBar completed ={this.state.SprintTime} title={"Sprint Time"}/> }
                             {<LinearDeterminate  completed ={this.state.SprintProgress} title={"Sprint Progress"}/> }


                            </Paper>
                        </Grid>
                        <Grid
                            container
                            spacing={8}
                            style={{ padding: "50px" }}
                        >
                            <Grid item xs={12}>
                                <Paper
                                    style={{ height: "100%" }}
                                >
                                    {/* <MuiThemeProvider theme={theme}> */}

                                    {(this.state.isAdmin === true) ?
                                        <ButtonSizes
                                            onClick={() => this.handleOpen('sprintOpen')}
                                            title="Add a Sprint"
                                            color="secondary"
                                            mini
                                        /> :
                                        ""}

                                    {/* </MuiThemeProvider> */}
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
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={24}
                            style={{ padding: "50px" }}
                        >

                        <Grid item xs={6}>
                          <Paper
                              style={{ height: "300px" }}
                          >
                            <SwitchLabel
                                onChange={this.switchTaskPool}
                                label="Show Completed Tasks"
                             />
                           {!this.state.isActive ?  <div>

                             {this.state.showComplete ? this.state.completedTasks.map((task) => {
                               return (
                                 <Pool
                                   key={task.id}
                                   id={this.key}
                                   isAdmin={this.state.isAdmin}
                                   tasks={task}
                                   onClickDelete={this.deleteTask.bind(this, task)}
                                 />
                               );
                             }) : <Summary />}
                           </div> :
                              <div>
                                {/* <MuiThemeProvider theme={theme2}> */}
                                {(this.state.isAdmin === true) ?
                                  <ButtonSizes
                                      onClick={() => this.handleOpen('taskOpen')}
                                      title="Add a Task"
                                      color="secondary"
                                  /> :
                                  ""}
                                {/* </MuiThemeProvider> */}
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


                                {this.state.showComplete ? this.state.completedTasks.map((task) => {
                                  return (
                                    <Pool
                                      key={task.id}
                                      id={this.key}
                                      isAdmin={this.state.isAdmin}
                                      tasks={task}
                                      onClickDelete={this.deleteTask.bind(this, task)}
                                    />
                                  );
                              }) : this.state.unassignedTasks.map((task) => {
                                return (
                                  <Pool
                                    key={task.id}
                                    id={this.key}
                                    isAdmin={this.state.isAdmin}
                                    tasks={task}
                                    onClickDelete={this.deleteTask.bind(this, task)}
                                    onClickAdd={this.assignTask.bind(this, task)}
                                  />
                                );
                                })}
                              </div>}

                          </Paper>
                        </Grid>
                          <Grid item xs={6}>
                            <Paper
                                style={{ height: "300px" }}
                            >
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
                            </Paper>
                          </Grid>
                        </Grid>
                    </Grid>
                </div>


                {/* <div style={{ paddingTop: "100px" }}>
                    <SprintSelect
                    sprints={this.state.chipData}
                    onClick={this.updateActiveSprint}
                    activeSprint={this.state.sprintId}
                    currentUser={this.state.currentUser}
                    />
                    <ButtonSizes
                        onClick={() => this.handleOpen('sprintOpen')}
                        title="Add a Sprint"
                        color="secondary"
                        style= {{
                            position: "absolute!important",
                            top: "50px!important",
                            left: "50px!important"
                        }}
                    />
                    <SimpleModalSprintWrapped
                        open={this.state.sprintOpen}
                        onClose={() => this.handleClose('sprintOpen')}
                        name="Add a New Sprint ..."
                        onSubmit={this.addSprint}
                        onChange={this.handleChange}
                    >
                        {/* <AddSprintLayout
                        /> */}
                {/* </SimpleModalSprintWrapped>
                    <Grid container>
                        <h1>{this.state.projName}</h1>
                        <h2>{this.state.summary}</h2>
                        <h3>{this.state.projDueDate}</h3>
                        <Grid item xs={6} style={{ padding: "10px" }}>
                            <h2>This is pool.</h2>
                            {/* <LinearDeterminate sprintId={this.state.sprintId}/> */}
                {/* <div>
                    {this.state.inviteCode}
                </div>
                <button onClick={this.inviteMember}>Invite Code</button>

                <Grid
                    container
                    alignItems={alignItems}
                    direction={direction}
                    justify={justify}
                >
                    <ButtonSizes
                        onClick={() => this.handleOpen('taskOpen')}
                    />
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
                    <SwitchLabel
                        onChange={this.switchTaskPool}
                    ></SwitchLabel>
                    {this.state.showComplete ? this.state.completedTasks.map((task) => {
                        return (
                            <Pool
                                key={task.id}
                                id={this.key}
                                tasks={task}
                                onClickDelete={this.deleteTask.bind(this, task)}
                            />
                        );
                    }) : this.state.unassignedTasks.map((task) => {
                        return (
                            <Pool
                                key={task.id}
                                id={this.key}
                                tasks={task}
                                onClickDelete={this.deleteTask.bind(this, task)}
                                onClickAdd={this.assignTask.bind(this, task)}
                                style={this.state.showComplete ? { display: 'default' } : { display: 'none' }}
                            />
                        );
                    })}

                </Grid>

                        </Grid>
            <Grid item xs={6} style={{ padding: "10px" }}>
                <UserPool sprintId={this.state.sprintId} members={this.state.members} tasks={this.state.assignedTasks}
                    unassign={this.unassignTask}
                    onClickDelete={this.deleteTask}
                    onClickComplete={this.markComplete}
                ></UserPool>
            </Grid>
            <br />
            <div><Link to="/homepage">Back to home page.</Link></div>
                    </Grid >
                </div >
            <div style={{ position: "fixed", width: "100%", bottom: "0" }}> */}

            {/* </div> * /} */}
            < SimpleBottomNavigation />
            </div >
        );
    }
}

export default Project;
