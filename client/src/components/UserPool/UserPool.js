import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TaskCard from '../utils/TaskCard/TaskCard';


// const style = {
//     gridItem: {
//         padding: 10
//     },
//     taskCard: {
//         marginTop: 5
//     }
// }

class UserPool extends Component {
    
    state={
        users: [],
        tasks: []
    }

    componentDidMount(){
        this.getUsers(1);
    }

    getUsers = (sprintId) => {
        axios.post('/api/allMemberInSprint', {sprintId: sprintId})
        .then(res => {
            console.log(res.data)
            this.setState({users: res.data}, () => this.getTasks(1))
        })
    }

    getTasks = (sprintId) => {
        axios.get(`/api/task/${sprintId}`)
        .then(res => {
            this.setState({tasks: res.data})
        })
    }

    render(){
        console.log(this.state.users, this.state.tasks)
        return(
            <Grid container spacing={24}>
                {this.state.users.map((user, i) => (
                    <Grid item key={i}>
                      <p>{user.User.first_name}</p>
                      {this.state.tasks.filter(task => task.assigned_id === i+1).map(fTask => (
                          <TaskCard title={fTask.name}></TaskCard>
                      ))}
                    </Grid>
                ))}
            </Grid> 
        )
    }
};

export default UserPool;