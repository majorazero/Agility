import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TaskCard from '../utils/TaskCard/TaskCard';
import Paper from '@material-ui/core/Paper';
import Pool from "./Pool.js"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const style = {
  gridItem: {
    padding: 10
  },
  taskCard: {
    marginTop: 5
  }
}

class UserPool extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      tasks: []
    };
  }

  componentDidMount() {
    // this.getUsers(this.props.sprintId);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.sprintId !== this.props.sprintId) || (prevProps.tasks !== this.props.tasks) || (prevProps.members !== this.props.members)) {
      this.render();
    }
      console.log("PROPS",this.props);
  }

  render() {
    return (
      <div>
        <List
            subheader={<li />}
            style={{
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
            }}
        >
            {this.props.members.map((member, i) => (
                <li key={i}>
                    <ListSubheader style={{ backgroundColor: 'whitesmoke' }}>{member.User.first_name} {member.User.last_name}</ListSubheader>
                    {this.props.tasks.filter(task => task.assigned_id === member.User.id).map(fTask => {
                        return(
                        <ul>
                        <ListItem key={fTask.id}>
                            <Pool
                                id={this.key}
                                isAdmin={this.props.isAdmin}
                                currentUser={this.props.currentUser}
                                assignedUser={fTask.assigned_id}
                                tasks={fTask}
                                onClickDelete={() => this.props.onClickDelete(fTask)}
                                unAssign={() => this.props.unassign(fTask.id)}
                                onClickComplete={() => this.props.onClickComplete(fTask.id)}
                                assigned
                            />
                        </ListItem>
                        </ul>
                    )})
                }

                </li>
            ))}
        </List>
    </div>
      // <Grid container spacing={24}
      //   direction="column"
      //   justify="flex-start"
      //   alignItems="flex-start"
      // >
      //   {this.props.members.map((member, i) => {
      //     return (
      //       <Grid item>
      //         <Paper key={i}>
      //           <p>{member.User.first_name} {member.User.last_name}</p>
      //           {this.props.tasks.filter(task => task.assigned_id === member.User.id).map(fTask => {
      //             return (
      //               <Pool key={fTask.id} id={this.key}
      //                 isAdmin={this.props.isAdmin}
      //                currentUser={this.props.currentUser} assignedUser={fTask.assigned_id} tasks={fTask} onClickDelete={() => this.props.onClickDelete(fTask)} unAssign={() => this.props.unassign(fTask.id)} onClickComplete={() => this.props.onClickComplete(fTask.id)} assigned />
      //             )
      //           })}
      //         </Paper>
      //       </Grid>)
      //   })}
      // </Grid>
    );
  }
};

export default UserPool;
