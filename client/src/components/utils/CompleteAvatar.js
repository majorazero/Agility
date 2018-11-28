import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = {
  avatar: {
    marginRight:5,
    height: 24,
    width: 24,
    fontSize: 14
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function LetterAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
    {/* Add Initials Here */}
      <Avatar className={classes.avatar}>IN</Avatar>
      {/* <Avatar className={classes.orangeAvatar}>N</Avatar>
      <Avatar className={classes.purpleAvatar}>OP</Avatar> */}
    </div>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);
