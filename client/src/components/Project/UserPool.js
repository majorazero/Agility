import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TaskCard from '../utils/TaskCard/TaskCard';
import Paper from '@material-ui/core/Paper';


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
  }

  render() {
    console.log(this.props);
    return (
      <Grid container spacing={24}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        {this.props.members.map((member, i) => {
          return (
            <Grid item>
              <Paper key={i}>
                <p>{member.User.first_name} {member.User.last_name}</p>
                {this.props.tasks.filter(task => task.assigned_id === member.User.id).map(fTask => (
                  <TaskCard key={fTask.id} title={fTask.name} summary={fTask.description} dueDate={fTask.due_date} unAssign={() => {
                    this.props.unassign(fTask.id)
                  }} titleSize="subtitle2" subtitleSize='caption'></TaskCard>
                ))}
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    );
  }
};

export default UserPool;
