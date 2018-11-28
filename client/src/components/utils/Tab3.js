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
        overflow: 'auto',
    },
});

class LandingTab extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        value: 0
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
                    centered>
                    <Tab label='Projects' />
                    <Tab label="Sprints" />
                    <Tab label='Tasks' />
                    <Tab label='Metrics' />
                  </Tabs>

                {value === 0 && <TabContainer>
                  <Typography gutterBottom variant='h4' style={{ textAlign: 'center' }}>Projects Header</Typography>
                  <Grid container spacing={8} style={{  paddingTop: 10}}>
                    <Grid item xs={5}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant='body1'>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</Typography>
                    </Grid>
                  </Grid>
                </TabContainer>}
                {value === 1 && <TabContainer>
                  <Typography gutterBottom variant='h4' style={{ textAlign: 'center' }}>Break your work cycle into sprints.</Typography>
                  <Grid container spacing={8} style={{ paddingTop: 10}}>
                    <Grid item xs={5}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant='body1'>Projects can be huge endeavors and knowing where to start can be daunting; sprints will help break down development into manageable chunks. Sprints are work cycles within projects with pre-determined start date and end dates with over-arching goals in mind.</Typography>
                      <br />
                      <Typography variant='body1'>With progress bar and summary metrics, both project manager and work members can easily determine the health and efficiency of a sprint and its members.</Typography>
                    </Grid>
                  </Grid>
                </TabContainer>}
                {value === 2 && <TabContainer>
                  <Typography gutterBottom variant='h4' style={{ textAlign: 'center' }}>Task Header</Typography>
                  <Grid container spacing={8} style={{ paddingTop: 10}}>
                    <Grid item xs={5}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant='body1'>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</Typography>
                    </Grid>
                  </Grid>
                </TabContainer>}
                {value === 3 && <TabContainer>
                  <Typography gutterBottom variant='h4' style={{ textAlign: 'center' }}>Improving upon your mistakes is the key to any good developer.</Typography>
                  <Grid container spacing={8} style={{ paddingTop: 10}}>
                    <Grid item xs={5}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant='body1'>Knowing exactly what the limit of your skills is quintissential, but determining what exactly needs to be improved is difficulty. With metrics, we make it easy by quanitifying your performance.</Typography>
                      <br />
                      <Typography variant='body1'>Performances between sprints can be shown in the summary tabs of a sprint where it will measure the stacks each member typically work with as well as how many task they complete out of the task they take. High completion rate with low complexity scores could translate to a user having improved and that they should try to challenge themselves by tackling more difficult tasks in their future sprints, while the inverse would imply a user may be taking off more than they can chew and that maybe they should take it easier next time.</Typography>
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
