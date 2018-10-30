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
    
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            tasks: []
        };
      }

    // state={
    //     users: [],
    //     tasks: []
    // }

    componentDidMount(){
        console.log(this.props.sprintId);
        this.getUsers(this.props.sprintId);
    }

    componentDidUpdate(prevProps){
        if(prevProps.sprintId !== this.props.sprintId){
            this.getUsers(this.props.sprintId);
        }
    }

    getUsers = (sprintId) => {
        axios.post('/api/allMemberInSprint', {sprintId: sprintId})
        .then(res => {
            console.log(res.data)
            this.setState({users: res.data}, () => this.getTasks(sprintId))
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
                    <Grid key={i} item>
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