import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer.js';
import ClippedDrawer from './SprintDrawer.js';

const styles = {
  root: {
    flexGrow: 1,
    // backgroundColor: 'lightslategray',
    // opacity: .95
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  balls: {
    backgroundColor: 'lightslategray',
    opacity: .95,
  }
};



function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary" className={classes.balls}>
        <Toolbar>
          <Drawer />
          <Typography to="/" variant="h4" color="inherit" className={classes.grow}>
            agility.
          </Typography>
          {sessionStorage.getItem("id") ? null : <Button href="/register" color="inherit">Sign Up</Button>}
          {sessionStorage.getItem("id") ? <Button onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.assign("/");
          }} color="inherit">Logout</Button> : <Button href="/login" color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
