import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        top: 64,
        height: '-webkit-fill-available'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
    const { classes } = props;

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="right"
        >
            <List>
                <ListItem button onClick={props.balls}>
                    <ListItemIcon><Add /></ListItemIcon>
                    <ListItemText primary={props.title} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {props.sprints.map((data, i) => (
                    <Tooltip title={`${data.start} - ${data.end}`} placement='left'>
                        <ListItem
                            button
                            key={data.key}
                            onClick={props.onClick.bind(this, data.id)}
                            color={props.activeSprint === data.id ? 'primary' : "default"}
                            id={data.id}
                        >
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary={data.label} />
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Drawer>
    );
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
