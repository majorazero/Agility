import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContainedButtons from "./Button.js";

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
          <ContainedButtons
            name="Delete"
            color="secondary"
            onClick={props.onClick}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);