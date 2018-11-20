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

class SimpleTabs extends React.Component {

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
            <ListItem>{this.props.holyInvite}</ListItem>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Tasks" />
                    <Tab label="User Pool" />
                    <Tab label="Progress" />
                </Tabs>
                {value === 0 && <TabContainer>{this.props.holyBalls}</TabContainer>}
                {value === 1 && <TabContainer>{this.props.holySack}</TabContainer>}
                {value === 2 && <TabContainer>{this.props.holyTaint}{this.props.holyHole}</TabContainer>}
            </Paper>

        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
