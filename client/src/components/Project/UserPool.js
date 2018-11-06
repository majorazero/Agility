import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TaskCard from '../utils/TaskCard/TaskCard';
import Paper from '@material-ui/core/Paper';
import Pool from "./Pool.js"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatary from '../utils/Avatar.js';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const styles = {
  gridItem: {
    padding: 10
  },
  taskCard: {
    marginTop: 5
  },
  root: {
    padding: '0px 30px 0px 10px'
  }
}

class UserPool extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      tasks: [],
      extended: null
    };
  }

  componentDidMount() {
    // this.getUsers(this.props.sprintId);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.sprintId !== this.props.sprintId) || (prevProps.tasks !== this.props.tasks) || (prevProps.members !== this.props.members)) {
      this.render();
    }
    console.log("PROPS", this.props);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props
    const { expanded } = this.state
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
              <Divider />
              <ListSubheader style={{ backgroundColor: 'whitesmoke', color: 'black', height: 50, display: 'flex', alignItems: 'center' }}><div><Avatary /></div><div style={{ justifyContent: 'flex-end' }}><Typography variant="h6" gutterBottom>{member.User.first_name} {member.User.last_name}</Typography></div></ListSubheader>
              <Divider />
              {this.props.tasks.filter(task => task.assigned_id === member.User.id).map(fTask => {
                return (
                  <ul>
                    <ListItem key={fTask.id} classes={{ root: classes.root }}>
                      <Pool
                        id={this.key}
                        isAdmin={this.props.isAdmin}
                        currentUser={this.props.currentUser}
                        assignedUser={fTask.assigned_id}
                        tasks={fTask}
                        onClickDelete={() => this.props.onClickDelete(fTask)}
                        unAssign={() => this.props.unassign(fTask.id)}
                        onClickComplete={() => this.props.onClickComplete(fTask.id)}
                        expanded={expanded === `panel${fTask.id}`}
                        onChange={this.handleChange(`panel${fTask.id}`)}
                        assigned
                      />
                    </ListItem>
                  </ul>
                )
              })
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

UserPool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPool);
