import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
                    <Tab label='Projects' />
                    <Tab label="Sprints" />
                    <Tab label='Tasks' />
                    <Tab label='Metrics' />
                  </Tabs>

                {value === 0 && <TabContainer>
                  <h2>Projects Header</h2>
                  <Grid container spacing={12}>
                    <Grid item xs={6}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={6}>
                      Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                    </Grid>
                  </Grid>
                </TabContainer>}
                {value === 1 && <TabContainer>
                  <h2>Sprint Header</h2>
                  <Grid container spacing={12}>
                    <Grid item xs={6}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={6}>
                      Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                    </Grid>
                  </Grid>
                </TabContainer>}
                {value === 2 && <TabContainer>
                  <h2>Task Header</h2>
                  <Grid container spacing={12}>
                    <Grid item xs={6}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={6}>
                      Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                    </Grid>
                  </Grid>
                </TabContainer>}
                {value === 3 && <TabContainer>
                  <h2>Metrics allow allows users to quantify their performance.</h2>
                  <Grid container spacing={12}>
                    <Grid item xs={6}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={6}>
                      Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
                    </Grid>
                  </Grid>
                </TabContainer>}
            </Paper>
        );
    }
}

LandingTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingTab);
