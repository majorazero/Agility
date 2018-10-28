import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pool from "./Pool.js";

class Project extends React.Component {

    state = {
        tasks: [],
        projects: [],
        sprints: []
    }

    componentDidMount() {
        this.getTasks();
      }

    getTasks = () => {

        // let number = this.state.projects
        // below we'll just place the variable in where we grab the dynamically updated 'project' that we're on depending on user choice
        axios.get("/api/task/2").then((res) => {

            this.setState({
                tasks: res.data
            });
        });
    };

    render() {
        return (
            <div>
                <h1>This is the project page.</h1>

                <h2>This is pool.</h2>
                {this.state.tasks.map((t) => {
                    return (
                        <Pool
                            key={t.id}
                            tasks={t}
                        />
                    );
                })}
                <div><Link to="/register">New user? Register!</Link></div>
                <div><Link to="/">Back to landing page.</Link></div>
            </div>
        );
    }
}

export default Project;
