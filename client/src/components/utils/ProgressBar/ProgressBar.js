import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
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
      <div className={classes.root}>
        <h3 style={{ textAlign: "center", color:"white",textShadow: "2px 2px black"}}>{this.props.title}</h3>
        <LinearProgress color={(whatBar) ? "primary" : "secondary"} variant="determinate" value={this.props.completed} />
      </div>
    );
  }
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
