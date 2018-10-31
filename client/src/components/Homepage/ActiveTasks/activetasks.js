import React, { Component } from 'react';
import axios from 'axios';
// import Modal from '@material-ui/core/Modal';
import TaskCard from "../../utils/TaskCard/TaskCard"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Pool from '../../Project/Pool'

class ActiveTasks extends Component {

    state = {
        sprints: [],
        tasks: []
    };

    componentDidMount(){
        this.getTasks(1);    
        this.getSprints(1);    
    }

    getTasks = (userId) => {
        axios.get(`/api/tasks/users/${userId}`)
        .then(res => {
            console.log(res.data)
            this.setState({tasks: res.data})
        })
    };

    getSprints = (userId) => {
        axios.post('/api/allSprintsForMember', {userId})
        .then(res => {
            this.setState({sprints: res.data})
        })
    }

    render(){
        return(
            <div>
                <List subheader={<li />}>
                    {this.state.sprints.map((sprint, i) => (
                        <li key={i}>
                            
                                <ListSubheader style={{backgroundColor: 'white'}}>{sprint.Sprint.name}</ListSubheader>
                                {this.state.tasks.filter(task => task.sprint_id === sprint.Sprint.id)
                                .map((ftask, findex) => (
                                    <ListItem key={findex}>
                                        <Pool
                                            tasks={ftask}
                                        />
                                    </ListItem>
                                ))
                                }
                            
                        </li>    
                    ))}
                </List>
                {/* <h3>Active Tasks Pane</h3>
                {this.state.tasks.map((task, i) => (
                    <TaskCard key={i} title={task.name} summary={task.description} dueDate={task.due_date} difficulty={task.difficulty}/>
                ))} */}
            </div>
        )
    };
};

export default ActiveTasks;