import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';

function TabContainer(props) {
    return (
        <Typography
            component="div"
            style={{
                padding: 8 * 3,
                position: 'relative'
            }}
        >
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
        margin: 25,
        overflow: 'auto'
    },
});

class LandingTab extends React.Component {
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
                        <Tab label='Metrics' />
                        <Tab label="Sprints" />
                        <Tab label='Tasks' />
                        <Tab label='Projects' />
                    </Tabs>

                {value === 0 && <TabContainer>Metrics</TabContainer>}
                {value === 1 && <TabContainer>Sprints</TabContainer>}
                {value === 2 && <TabContainer>Tasks</TabContainer>}
                {value === 3 && <TabContainer>Projects</TabContainer>}
            </Paper>
        );
    }
}

LandingTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingTab);
