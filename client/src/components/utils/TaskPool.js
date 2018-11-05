import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContainedButtons from "./Button.js";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";


const styles = theme => ({
  root: {
    width: '100%',
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
        <ExpansionPanelDetails>
          <Typography>
              {props.description}
          </Typography>
          <br />
          <Typography className={classes.notHeading}>
              {props.due}
          </Typography>
          {/* {(location.pathname === "/homepage") ? null :  */}

          {/* {props.isAdmin ?
            <ContainedButtons
              name={props.assigned ? "Unassign" : "Claim"}
              color="primary"
              onClick={props.assigned ? props.unAssign : props.onClickAdd}
            />
            :
          (props.assigned && (props.currentUser === props.assignedUser)) ?
            <ContainedButtons
              name='Unassign'
              color="primary"
              onClick={props.unAssign}
            />
            :
          <ContainedButtons
            name='Claim'
            color="primary"
            onClick={props.onClickAdd}
          />} */}

            {props.homepage ?  
                <ContainedButtons
                name='View Project'
                color='primary'
                onClick= {props.goToProject}
                hidden={props.activetasks ? false : true}
              />
              :
              (<div><ContainedButtons
              name={props.complete ? 'Reopen':(props.assigned ? 'Unassign':'Claim') }
              color="primary"
              onClick={props.assigned ? (props.complete ? props.onClickReopen : props.unAssign) : props.onClickAdd}
              hidden = {(props.currentUser === props.assignedUser) ? false:(props.isAdmin ? false: true)}
              // hidden={props.complete ? (props.isAdmin ? (props.currentUser === props.assignedUser ? false:true):true) : false}
              />
              <ContainedButtons
              name={props.assigned ? 'Mark Complete' : props.isAdmin ? 'Delete':null}
              color='secondary'
              onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
              hidden={props.complete ? true:(props.currentUser === props.assignedUser) ? false:(props.isAdmin ? false: true)}
            /></div>)
            }


          {/* {(location.pathname === "/homepage") ? null :  */}
          {/* {props.isAdmin ?
          <ContainedButtons
            name={props.assigned ? "Mark Complete" : "Delete"}
            color="secondary"
            onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
          />
          :
          (props.assigned && (props.currentUser === props.assignedUser)) ?
          <ContainedButtons
            name={props.assigned ? "Mark Complete" : "Delete"}
            color="secondary"
            onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
          /> : ""} */}

          


          {/* } */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
