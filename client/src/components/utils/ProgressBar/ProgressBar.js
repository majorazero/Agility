import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
        margin: '0 50px 0 50px',
    },
};

class LinearDeterminate extends React.Component {
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    var completed = this.props.completed
    if (completed !== 100) {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    const { classes } = this.props;
    var whatBar = this.props.whatBar
    return (
      <div className={classes.root} style={{borderRadius: '25px'}}>
        <Typography>{this.props.title1}</Typography>
        <LinearProgress style={{height: 12, borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}} color='primary' variant="determinate" value={this.props.completedTask} />
        <LinearProgress style={{height: 12, borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'}} color='secondary' variant="determinate" value={this.props.completedTime} />
        <Typography>{this.props.title2}</Typography>
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
