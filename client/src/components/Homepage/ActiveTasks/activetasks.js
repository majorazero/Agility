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
        tasks: [], 
        data: []
    };

    componentDidMount(){
      axios.post("/api/decrypt",{
        id: sessionStorage.getItem("id"),
        token: localStorage.getItem("token")
      }).then((response) => {
        this.getTasks(response.data);
      });
    }

    getTasks = (userId) => {
        axios.get(`/api/tasks/users/${userId}`)
        .then(res => {
            console.log(res.data)
            this.setState({tasks: res.data}, () => this.getSprints(userId))
        })
    };

    getSprints = (userId) => {
        axios.post('/api/allSprintsForMember', {userId})
        .then(res => {
            console.log(res.data)
            this.setState({sprints: res.data}, () => this.groupSprintsTasks())
        })
    }

    groupSprintsTasks = () => {
        let joinedData = [];
        this.state.sprints.forEach(sprint => {
            let obj = {
                name: sprint.Sprint.name,
                id: sprint.Sprint.id, 
                tasks: []
            }
            joinedData.push(obj)
        })
        this.state.tasks.forEach(task => {
            for(let i=0; i<joinedData.length; i++){
                if(task.sprint_id === joinedData[i].id){
                    joinedData[i].tasks.push(task);
                    break;
                }
            }
        })
        let filteredData = joinedData.filter(object => object.tasks.length > 0)
        this.setState({data: filteredData})
    }

    render(){
        return(
            <div>
                <List subheader={<li />}>
                    {this.state.data.map((sprint, i) => (
                        <li key={i}>
                            
                                <ListSubheader style={{backgroundColor: 'white'}}>{sprint.name}</ListSubheader>
                                {sprint.tasks.map((task, index) => (
                                    <ListItem key={index}>
                                        <Pool
                                            tasks={task}
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
