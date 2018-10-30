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
        sprintId: "2",
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

    addTask = (event) => {
        
        console.log("poop")
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

        axios.delete("/api/task/by/" + task.id);
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
                                        onClick={this.deleteTask.bind(this, task)}
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
