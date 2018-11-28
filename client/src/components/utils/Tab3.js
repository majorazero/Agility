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
                  <Typography gutterBottom variant='h4' style={{ textAlign: 'center' }}>Sprint Header</Typography>
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
                  <Typography gutterBottom variant='h4' style={{ textAlign: 'center' }}>Metrics allow allows users to quantify their performance.</Typography>
                  <Grid container spacing={8} style={{ paddingTop: 10}}>
                    <Grid item xs={5}>
                      <img height="300" src="./assets/images/demo1.gif"></img>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant='body1'>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</Typography>
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
