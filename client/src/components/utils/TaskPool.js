import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContainedButtons from "./Button.js";
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


const styles = theme => ({
  root: {
    width: 'fit-content',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  notHeading: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightItalic,
  }
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  // console.log(props.onClickReopen,props.unAssign, props.onClickAdd);
  console.log(props);
  return (
    <ExpansionPanel key={props.id}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{props.name}</Typography>
      </ExpansionPanelSummary>
      <Grid container >
        <ExpansionPanelDetails className={classes.root}>
          <Grid container>
            <Grid item xs>
              <Typography>
                {props.description}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography className={classes.notHeading}>
                {props.due}
              </Typography>
            </Grid>
          </Grid>
          <Grid container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            style={{ width: 'fit-content' }}
            >
            {props.homepage ?
              (<Grid item xs><ContainedButtons
                size="small"
                name='View Project'
                color='primary'
                onClick={props.goToProject}
                hidden={props.activetasks ? false : true}
              /></Grid>)
              :
              (<Grid item xs><ContainedButtons
                name={props.complete ? (props.isAdmin ? 'Reopen' : null) : (props.assigned ? 'Unassign' : 'Claim')}
                color="primary"
                size="small"
                onClick={props.assigned ? (props.complete ? props.onClickReopen : props.unAssign) : props.onClickAdd}
                hidden={(props.currentUser === props.assignedUser) ? false : (props.isAdmin ? false : true)}
              // hidden={props.complete ? (props.isAdmin ? (props.currentUser === props.assignedUser ? false:true):true) : false}
              />
                <ContainedButtons
                  name={props.assigned ? 'Mark Complete' : props.isAdmin ? 'Delete' : null}
                  color='secondary'
                  size="small"
                  onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
                  hidden={props.complete ? true : (props.currentUser === props.assignedUser) ? false : (props.isAdmin ? false : true)}
                /></Grid>)
            }
          </Grid>
        </ExpansionPanelDetails>
      </Grid>
    </ExpansionPanel>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
