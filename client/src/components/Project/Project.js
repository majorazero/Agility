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
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

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

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                background: 'none'
            },
        },
    },
});


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
        sprintStart_date: "",
        sprintEnd_date: "",

        currentUser: '',
        showComplete: false,

        //Progress Bar Time
        SprintTime: 0,
        SprintProgress: 0
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
            // let today = new Date.now();
            // console.log(today);
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

    updateComplete = () => {

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

            console.log(task);

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
            let progressStat = (completed.length/(completed.length+assigned.length+unassigned.length)*100);
            this.setState({
                unassignedTasks: unassigned,
                assignedTasks: assigned,
                completedTasks: completed,
                SprintProgress: progressStat
            }, () => {
                console.log(this.state.sprints)
            })
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
        if (this.state.activeSprintId === sprintId) {
            isActive = true;
        }
        // for(let i = 0; i < this.state.sprints.length; i++){
        //   if((this.state.sprints[i].sprintId === sprintId) && this.state.sprints[i].isActive === 1){
        //     isActive = true;
        //   }
        // }
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
        axios.get(`/api/sprints/project/${projectId}/user/${userId}`).then((res) => {
            if (res.data.length > 0) {
                console.log(res.data)
                let sprints = res.data
                let today = new Date();
                let currentSprint = res.data[0].sprintId;
                let isActive = false;
                let timeProgress = 0;
                // check for active sprint
                for (let i = 0; i < sprints.length; i++) {
                    let endDate = new Date(sprints[i].endDate)
                    let startDate = new Date(sprints[i].startDate)
                    let currentDate = new Date();
                    console.log(startDate, endDate, currentDate);
                    console.log(endDate - startDate);
                    sprintData.push({
                        key: i,
                        label: sprints[i].sprintName,
                        id: sprints[i].sprintId
                    });
                    if (sprints[i].isActive) {
                        //verify end date has not passed
                        if (today > endDate) {

                        }
                        else {
                          //set currentSprint, set isActive
                          currentSprint = sprints[i].sprintId;
                          isActive = true;
                          timeProgress = ((endDate-currentDate)/(endDate-startDate)*100);
                        }
                    }
                    else if (today >= startDate && today <= endDate) {
                        currentSprint = sprints[i].sprintId;
                        isActive = true;
                          timeProgress = ((endDate-currentDate)/(endDate-startDate)*100);
                    }
                }
                console.log(timeProgress);
                this.setState({
                    SprintTime: timeProgress,
                    chipData: sprintData,
                    sprintId: currentSprint,
                    activeSprintId: currentSprint,
                    sprints: res.data,
                    isActive: isActive
                });
            }
        }).then(() => {
            this.getTasks();
            this.getMembers(this.state.sprintId);
        });
    };

    addSprint = (event) => {
        event.preventDefault();

        axios.post('/api/sprint', {
            name: this.state.sprintName,
            start_date: this.state.sprintStart_date,
            end_date: this.state.sprintEnd_date,
            project_id: this.state.projectId
        }).then((res) => {
            console.log(this.state.currentUser, res.data.id)
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
        console.log("WHAT");
        axios.put(`/api/complete/task/${id}`)
            .then(() => {
                this.getTasks();
            })
    }

    reopenTask = (id) => {
        console.log('Reopen Task', id)
        axios.put(`/api/reopen/task/${id}`)
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
        const { classes } = this.props
        return (
            <div>
                <ButtonAppBar />
                <div
                    className="parallax"
                    style={{
                        paddingTop: 50,
                        overflowX: "hidden",
                        backgroundImage: `url("/assets/images/background.png")`,
                        resizeMode: 'cover',
                        height: "-webkit-fill-available"
                    }} >

                    <Grid
                        container
                        spacing={8}
                        style={{ padding: "50px 50px 25px 50px" }}
                    >
                        <Grid item xs={12}>
                            {/* <MuiThemeProvider theme={theme}> */}
                            {/* <Paper
                                    style={{ background: 'none', border: 'none', height: "100%", paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 10 }}
                                > */}
                            {<LinearDeterminate whatBar completed={this.state.SprintTime} title={"Sprint Time"} />}
                            {<LinearDeterminate completed={this.state.SprintProgress} title={"Sprint Progress"} />}
                            {/* </Paper> */}
                            {/* </MuiThemeProvider> */}
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={8}
                        style={{ padding: "50px 50px 25px 50px" }}
                    >
                        <Grid item xs>
                            <Paper
                                style={{ height: "100%", background: 'whitesmoke' }}
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
                                    // style={{ paddingBottom: 10 }}
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
                        spacing={32}
                        style={{ padding: 50 }}
                    >
                        <Grid
                            item
                            xs={6}
                            style={{ height: 'fit-content' }}
                        >
                            <Paper
                                style={{ background: 'whitesmoke', height: '100%' }}
                            >
                                <Grid
                                    container
                                    spacing={8}
                                    style={{ padding: 25 }}
                                >
                                    <Grid item xs>
                                        <SwitchLabel
                                            onChange={this.switchTaskPool}
                                            label="Show Completed Tasks"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        {(this.state.isAdmin === true) ?
                                            <ButtonSizes
                                                onClick={() => this.handleOpen('taskOpen')}
                                                title="Add a Task"
                                                color="secondary"
                                            /> :
                                            ""}
                                        <button onClick={this.inviteMember}>Invite Code</button>
                                        {this.state.inviteCode}
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
                                                                <ListItem classes={{root: classes.root}}>
                                                                    <Pool
                                                                        key={task.id}
                                                                        id={this.key}
                                                                        isAdmin={this.state.isAdmin}
                                                                        tasks={task}
                                                                        onClickDelete={this.deleteTask.bind(this, task)}
                                                                        onClickReopen={() => this.reopenTask(task.id)}
                                                                        assignedUser={task.assigned_id}
                                                                        currentUser={this.state.currentUser}
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
                                                <li>
                                                    {/* <MuiThemeProvider theme={theme2}> */}
                                                    {/* {(this.state.isAdmin === true) ?
                                      <ButtonSizes
                                          onClick={() => this.handleOpen('taskOpen')}
                                          title="Add a Task"
                                          color="secondary"
                                      /> :
                                      ""} */}
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
                                                            <ul>
                                                                <ListItem classes={{root: classes.root}}>
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
                                                                        complete
                                                                    />
                                                                </ListItem>
                                                            </ul>
                                                        );
                                                    }) : this.state.unassignedTasks.map((task) => {
                                                        return (
                                                            <ul>
                                                                <ListItem classes={{root: classes.root}}>
                                                                    <Pool
                                                                        key={task.id}
                                                                        id={this.key}
                                                                        isAdmin={this.state.isAdmin}
                                                                        tasks={task}
                                                                        onClickDelete={this.deleteTask.bind(this, task)}
                                                                        onClickAdd={this.assignTask.bind(this, task)}
                                                                        currentUser={this.state.currentUser}
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
                                style={{ height: '100%', }}
                            >
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
                    spacing={8}
                    style={{ padding: 25 }}
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
            </Grid>
          </div>

          <div>
             {this.state.inviteCode}
         </div>
         <button onClick={this.inviteMember}>Invite Code</button>

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
                {/*< SimpleBottomNavigation />*/}

            </div>
        );
    }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Project);

