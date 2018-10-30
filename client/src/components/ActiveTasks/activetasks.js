import React, { Component } from 'react';
import axios from 'axios';
// import Modal from '@material-ui/core/Modal';
import TaskCard from "../utils/TaskCard/TaskCard"


class ActiveTasks extends Component {

    state = {
        tasks: []
    };

    componentDidMount(){
        this.getTasks(1);        
    }

    getTasks = (userId) => {
        axios.get(`/api/tasks/users/${userId}`)
        .then(res => {
            console.log(res.data)
            this.setState({tasks: res.data})
        })
    };

    render(){
        return(
            <div>
                <h3>Active Tasks Pane</h3>
                {this.state.tasks.map((task, i) => (
                    <TaskCard key={i} title={task.name} summary={task.description} dueDate={task.due_date} difficulty={task.difficulty}/>
                ))}
            </div>
        )
    };
};

export default ActiveTasks;