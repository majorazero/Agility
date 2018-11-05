import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import SingleLineGridList from "../../ProjectList/ProjectListTab/ProjectListTab.js";
import axios from "axios";
import Assignment from '@material-ui/icons/Assignment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ProjectList from "../../ProjectList/ProjectList.js";
import GridList from '@material-ui/core/GridList';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        height: 2
      },
    },
  },
});

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    name: "",
    summary: "",
    projects: [],
    open: false,
    direction: "row",
    justify: "center",
    alignItems: "center",
    projects: [],
    inviteCode: "",
    message: ""
  };

  onProjectPress = (id) => {
    axios.post("/api/encrypt", {
      token: "project",
      id: id.toString()
    }).then((data) => {
      window.location.assign(`/project/${data.data}`);
    });
  }

  componentDidMount = () => {
    this.fetch();
  }

  fetch = () => {
    axios.post("/api/projectOfUser", {
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.setState({ projects: response.data });
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List style={{ position: 'sticky', height: 46, padding: 8, top: 0, background: 'whitesmoke', zIndex: 1 }}>
          <ListItem button key="Home" name="home" component={Link} to="/homepage">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* <ListItem button key="Project" name="project" component={Link} to="/project/:id">
            <ListItemIcon><Assignment /></ListItemIcon>
            <ListItemText primary="Project" />
          </ListItem> */}
        </List>
        <Divider style={{ position: 'sticky', top: 'inherit', zIndex: 1 }} />
        <List>
          {/* <GridList> */}
          {this.state.projects.map((item) => {
              return (
                <MuiThemeProvider theme={theme}>
                  <SingleLineGridList
                    key={item.id}
                    name={item.name}
                    summary={item.summary}
                    className={classes.balls}
                    // style={{ margin: 2, width: 100, height: 100 }}
                    onProjectPress={() => { this.onProjectPress(item.id) }} />
                </MuiThemeProvider>
              )
            })};
          {/* </GridList> */}
        </List>
      </div>
    );

    return (
      <div>


        {/* <IconButton  > */}
        <Button className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
          <MenuIcon />
        </Button>
        {/* </IconButton> */}


        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>

      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);