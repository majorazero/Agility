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
          <ContainedButtons
            name={props.assigned ? "Unassign" : "Select"}
            color="primary"
            onClick={props.assigned ? props.unAssign : props.onClickAdd}
          />
          {/* } */}
          {/* {(location.pathname === "/homepage") ? null :  */}
          {props.isAdmin ?
          <ContainedButtons
            name={props.assigned ? "Mark Complete" : "Delete"}
            color="secondary"
            onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
          />
          :
          (props.assigned) ?
          <ContainedButtons
            name={props.assigned ? "Mark Complete" : "Delete"}
            color="secondary"
            onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
          /> : ""}
          {/* } */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
