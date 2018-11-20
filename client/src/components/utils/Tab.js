import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
                {this.props.holyTaint}
                {this.props.holyHole}
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Tasks" />
                    {/* <Tab label="User Pool" /> */}
                    {/* <Tab label="Progress" /> */}
                </Tabs>
                {value === 0 && <TabContainer>
                    <div>
                        {this.props.holyBalls}
                        {this.props.holySack}
                    </div>
                </TabContainer>}
                {/* {value === 1 && <TabContainer>{this.props.holySack}</TabContainer>} */}
            </Paper>

        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
