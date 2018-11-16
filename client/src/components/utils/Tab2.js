import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';
import { ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 25
    },
});

class SimpleTabs2 extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: 0,
        };
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <Paper className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Active Tasks" />
                    <Tab label="Projects" />
                    <Tab label="Statistics" />
                </Tabs>
                {value === 0 && <TabContainer>
                    {/* <ListItem style={{ width: 'max-content'}} button onClick={this.props.onClick}>
                        <ListItemIcon><Add /></ListItemIcon>
                        <ListItemText primary={this.props.title} />
                    </ListItem> */}
                    {this.props.justBalls}
                </TabContainer>}
                {value === 1 && <TabContainer>{this.props.justSack}</TabContainer>}
                {value === 2 && <TabContainer>{this.props.justTaint}</TabContainer>}
            </Paper>

        );
    }
}

SimpleTabs2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs2);