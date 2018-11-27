import React, { Component } from 'react';
import Pool from '../../Project/Pool';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    top: {
        backgroundColor: theme.palette.background.default,
    }
});

class ActiveTasks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: null
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };


  render() {
    const { expanded } = this.state;
    const { classes } = this.props

    return (
      <List className={classes.root} subheader={<li />}>
        {this.props.tasks.length === 0 ?

          <Typography gutterBottom variant='h4'>No active tasks!</Typography>
          
          :  this.props.tasks.map((sprint, i) => (
          <li key={i} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader className={classes.top}>{sprint.sprint}</ListSubheader>
              {sprint.tasks.map((task, index) => (
                <ListItem key={index}>
                  <Pool
                    tasks={task}
                    activetasks={true}
                    goToProject={() => this.props.goToProject(task.sprintId)}
                    homepage={this.props.homepage}
                    id={task.id}
                    expanded={expanded === `panel${task.id}`}
                    onChange={this.handleChange(`panel${task.id}`)}
                  />
                </ListItem>
              ))}
            </ul>
          </li>))
        }
      </List>
    );
  }
}

ActiveTasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActiveTasks);
