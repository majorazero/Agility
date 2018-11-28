import ContainedButtons from "./Button.js";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    marginLeft: '5%'
  },
});

class ControlledExpansionPanels extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      expanded: null,
    };
  }


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    //const { expanded } = this.state;

    return (
      <div className={classes.root}>

        <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange} key={this.props.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.props.name}</Typography>
            <Typography color='secondary' className={classes.secondaryHeading}>{this.props.due}</Typography>
            <Typography color='inherit' className={classes.secondaryHeading}>{this.props.stack}</Typography>
            <Typography color='primary' className={classes.secondaryHeading}>Complexity: {this.props.complexity}/5</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container direction='column'>
              <Grid>
                <Typography style={{ width: '-webkit-fill-available' }}>
                  {this.props.description}
                </Typography>
              </Grid>
              <Grid>
              {(this.props.active || this.props.futureSprint) ?  // if sprint is active
              
                this.props.location==='open tasks' ? //if rendered in open tasks panel 
                  <Grid container direction='row' justify='flex-end'>
                    <ContainedButtons
                      size="small"
                      name='Edit'
                      color='secondary'
                      onClick={this.props.edit}
                      hidden={this.props.isAdmin ? false:true}
                    />
                    <ContainedButtons
                      size="small"
                      name='Delete'
                      color='primary'
                      onClick={this.props.onClickDelete}
                      hidden={this.props.isAdmin ? false:true}
                    /> 
                    <ContainedButtons
                      size="small"
                      name='Claim'
                      color='secondary'
                      onClick={this.props.onClickAdd}
                      hidden={false}
                    /> 
                  </Grid>
                :
                  this.props.location==='in progress' ? // else if displayed in 'in progress'
                    <Grid container direction='row' justify='flex-end'>
                      <ContainedButtons
                        size="small"
                        name='Delete'
                        color='secondary'
                        onClick={this.props.onClickDelete}
                        hidden={this.props.isAdmin ? false:true}
                      />
                       <ContainedButtons
                        size="small"
                        name='Unassign'
                        color='primary'
                        onClick={this.props.unAssign}
                        hidden={this.props.futureSprint ? true:(this.props.currentUser === this.props.assignedUser) ? false : this.props.isAdmin ? false : true}
                      />  
                      <ContainedButtons
                        size="small"
                        name='Complete'
                        color='secondary'
                        onClick={this.props.onClickComplete}
                        hidden={this.props.futureSprint ? true: (this.props.currentUser === this.props.assignedUser) ? false : true}
                      /> 
                    </Grid>
                  : 
                    this.props.location==='complete' ? // else if displayed in complete
                      <Grid container direction='row' justify='flex-end'>
                        <ContainedButtons
                          size="small"
                          name='Reopen'
                          color='secondary'
                          onClick={this.props.onClickReopen}
                          hidden={this.props.isAdmin ? false : this.props.currentUser === this.props.assignedUser ? false : true}
                        /> 
                      </Grid>
                    :
                      null // no buttons are displayed if location is not in the above AND if sprint is inactive
              : 
              this.props.homepage ? // else if displayed in homepage active tasks
                <Grid container direction='row' justify='flex-end'>
                  <ContainedButtons
                    size="small"
                    name='View Project'
                    color='secondary'
                    onClick={this.props.goToProject}
                    hidden={false}
                  />
                </Grid>
            : null} 
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
