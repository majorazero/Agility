import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

function getFabStyle() {
  const top = -10;
  const left = 85;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    zIndex: 100,
    position: "sticky"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <Tooltip title={props.title} placement="right">
      <Button
        style={getFabStyle()}
        variant="fab"
        // onMouseOver={this.variant="extendedFab"} 
        color={props.color}
        className={classes.button}
        onClick={props.onClick}
        mini
      // title={props.title}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);