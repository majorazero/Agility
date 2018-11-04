import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function ContainedButtons(props) {
  const classes = props.classes;
  return (
    <div>

      <Button
        size="medium"
        variant="contained"
        color={props.color}
        className={classes.button}
        to={props.to}
        component={props.component}
        onClick={props.onClick}
        target={props.target}
        style={props.hidden ? {display: 'none'} : {display: ""}} 
      >
        {props.name}

      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);