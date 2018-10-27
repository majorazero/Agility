import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Project extends Component {


    render() {
        return (
            <div>
                <h1>This is the project page.</h1>
                
                <div><Link to="/register">New user? Register!</Link></div>
                <div><Link to="/">Back to landing page.</Link></div>
            </div>
        );
    }
}

export default Project;