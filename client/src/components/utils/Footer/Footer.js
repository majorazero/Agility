import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Home from "./icons/Home.js";
import GitHub from "./icons/github-icon.svg";


// import githubIcon from "../../../../public/assets/images/git-hub-icon.png";

const styles = {
  root: {
    width: "100%",
    backgroundColor: "lightgrey",
    bottom: "0",
    // position: "fixed"
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={{ alignItems: "center" }}

      >
        {/* <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} /> */}
        {/* <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} /> */}
        {/* <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} /> */}
        {/* <BottomNavigationAction label="Folder" value="folder" icon={<Icon>folder</Icon>} /> */}

        <BottomNavigationAction label="GitHub" value="nearby" icon={<img src={GitHub} width="30px" />} />
        <BottomNavigationAction label="Copyright 2018 ©" value="nearby" />} />

{/* icon={<img src={GitHub} width="30px" */}


      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
