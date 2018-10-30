import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pool from "./Pool.js";
import { Grid } from "@material-ui/core";
import ButtonSizes from "../utils/FAB.js";
import SimpleModalWrapped from "../utils/Modal";
import AddTaskLayout from "../utils/AddTaskLayout.js";

class Project extends React.Component {

    state = {
        tasks: [],
        projects: [],
        sprints: [],
        direction: 'column',
        justify: 'flex-start',
        alignItems: 'flex-start',
        // temp id set
        sprintId: "1",
        open: false,
        name: "",
        due_date: "",
        description: ""
    }

    componentDidMount() {
        this.getTasks();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    getTasks = () => {

        // let number = this.state.projects
        // below we'll just place the variable in where we grab the dynamically updated 'project' that we're on depending on user choice
        axios.get("/api/task/" + this.state.sprintId, {
            params: {
                assigned_id: null
            }
        }).then((res) => {

            this.setState({
                tasks: res.data
            });
        });
    };

    addTask = () => {

        console.log(this.state.name)
        console.log(this.state.due_date)
        console.log(this.state.description)
        // would put sprintId state in as basis for task addition
        // axios.post("/api/task", event.target, { sprint_id : this.state.sprintId }

        // })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteTask = (task) => {
        axios.delete("/api/task/by/" + task.id).then(()=>{
            this.getTasks();
        });
    }

    assignTask = (task) => {
        axios.post("/api/decrypt", { token: localStorage.getItem("token"), id: sessionStorage.getItem("id") }).then((response) => {
            let user = response.data;

            console.log(user)
            axios.put("/api/task/by/" + task.id + "/" + user).then(() => {
                this.getTasks();
            })
        });


    }

    render() {
        const { direction, justify, alignItems } = this.state;
        return (
            <div style={{ paddingTop: "50px" }}>
                <Grid container>
                    <h1>This is the project page.</h1>
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <h2>This is pool.</h2>

                        <Grid
                            container
                            alignItems={alignItems}
                            direction={direction}
                            justify={justify}
                        >
                            <ButtonSizes
                                onClick={this.handleOpen}
                            />
                            <SimpleModalWrapped
                                open={this.state.open}
                                onClose={this.handleClose}
                                name="Add a New Task ..."
                                onSubmit={this.addTask}
                                onChange={this.handleChange}
                            >
                                <AddTaskLayout
                                />
                            </SimpleModalWrapped>
                            {this.state.tasks.map((task) => {
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
                    <br />
                    <div><Link to="/">Back to landing page.</Link></div>
                </Grid>
            </div>
        );
    }
}

export default Project;
