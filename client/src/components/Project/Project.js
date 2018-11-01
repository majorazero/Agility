import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pool from "./Pool.js";
import { Grid } from "@material-ui/core";
import ButtonSizes from "../utils/FAB.js";
import SimpleModalWrapped from "../utils/Modal";
import AddTaskLayout from "../utils/AddTaskLayout.js";
import SprintSelect from './SprintSelect';
import UserPool from './UserPool';
import ButtonAppBar from "../utils/Navbar/Navbar.js";
import AddSprintLayout from "../utils/AddSprintLayout.js";
import SimpleModalSprintWrapped from '../utils/ModalSprint';
import SimpleBottomNavigation from "../utils/Footer/Footer.js";



class Project extends React.Component {

    state = {
        //this is the project's personal info
        projName: "",
        summary: "",
        projDueDate: "",
        projectId: "",

        inviteCode: "",

        unassignedTasks: [],
        assignedTasks: [],
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

        currentUser: ''
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.post("/api/projectById", {
            token: "project",
            id: id
        }).then((response) => {
            console.log(response.data);
            this.setState({
                projName: response.data[0].name,
                summary: response.data[0].summary,
                projDueDate: response.data[0].due_date,
                projectId: response.data[0].id
            });
            //pass project id here
            this.getMembers(this.state.sprintId);
            this.getCurrentUserId();
            console.log(this.state);
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

            for (let i = 0; i < task.length; i++) {
                if (task[i].assigned_id === null) {
                    unassigned.push(task[i])
                }
                else{
                    assigned.push(task[i]);
                }
            }
            console.log(this.state);
            this.setState({
                unassignedTasks: unassigned,
                assignedTasks: assigned
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
            console.log(this.state.taskOpen)})
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
      axios.put("/api/task/unassign",{id: id}).then((response) => {
        this.getTasks();
      });
    }

    updateActiveSprint = (sprintId) => {
      this.setState({ sprintId: sprintId }, () => {
        this.getTask();
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
        .then((res)=> {
        console.log(res.data);
          let today = new Date();
          //default to latest sprint
          let currentSprint = res.data[0].id;
          res.data.map((pSprint, i) => {
            sprintData.push({
                key: i,
                label: pSprint.sprintName,
                id: pSprint.sprintId
            });
            //if a sprint is not complete, it'll be set to that instead.
            if(!pSprint.isComplete){
              currentSprint = pSprint.sprintId;
            }
        });
        console.log(currentSprint);
        this.setState({
          chipData: sprintData,
          sprintId: currentSprint
         });
      }).then(() => {
        this.getTasks();
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
        })
        .then(() => {
            this.setState({
                sprintOpen: false
            }, () => {
                console.log(this.state.sprintOpen)
                this.getSprints(this.state.projectId)
            })
        })
    }

    getMembers = (sprintId) => {
        axios.post('/api/allMemberInSprint', {sprintId: sprintId})
        .then(res => {
            console.log("Members:", res.data)
            this.setState({members: res.data})
        })
    }

    getCurrentUserId = () => {
        axios.post("/api/decrypt", {
            id: sessionStorage.getItem("id"),
            token: localStorage.getItem("token")
        }).then(res => {
            console.log(res.data)
            this.setState({currentUser: res.data}, 
                ()=> {
                    this.getSprints(this.state.projectId, this.state.currentUser)})
        }) 
        }
    

    inviteMember = () => {
        //we'll pass the sprint id as an encrypted id
        axios.post("/api/encrypt", {
            id: this.state.sprintId.toString(),
            token: "invite"
        }).then((response) => {
            console.log(response.data);
            this.setState({ inviteCode: response.data });
        });
    }

    render() {
        const { direction, justify, alignItems } = this.state;
        return (
            <div>
                <ButtonAppBar />
                <div style={{ paddingTop: "100px" }}>
                    <SprintSelect sprints={this.state.chipData} onClick={this.updateActiveSprint} activeSprint={this.state.sprintId} currentUser={this.state.currentUser} />
                    <ButtonSizes
                        onClick={() => this.handleOpen('sprintOpen')}
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
                    </SimpleModalSprintWrapped>
                    <Grid container>
                        <h1>{this.state.projName}</h1>
                        <h2>{this.state.summary}</h2>
                        <h3>{this.state.projDueDate}</h3>
                        <Grid item xs={6} style={{ padding: "10px" }}>
                            <h2>This is pool.</h2>

                            <div>
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
                                {this.state.unassignedTasks.map((task) => {
                                    return (
                                        <Pool
                                            key={task.id}
                                            id={this.key}
                                            tasks={task}
                                            onClickDelete={this.deleteTask.bind(this, task)}
                                            onClickAdd={this.assignTask.bind(this, task)}
                                        />
                                    );
                                })}

                            </Grid>

                        </Grid>
                        <Grid item xs={6} style={{ padding: "10px" }}>
                            <UserPool sprintId={this.state.sprintId} members={this.state.members} tasks={this.state.assignedTasks}
                            unassign={this.unassignTask}></UserPool>
                        </Grid>
                        <br />
                        <div><Link to="/homepage">Back to home page.</Link></div>
                    </Grid>
                </div>
                <div style={{position:"fixed", width:"100%", bottom:"0"}}>
                <SimpleBottomNavigation /> 
                </div>
            </div>
        );
    }
}

export default Project;
