import ContainedButtons from "./Button.js";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '70%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
            <Typography className={classes.secondaryHeading}>{this.props.due} | {this.props.stack}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography style={{ width: '-webkit-fill-available' }}>
              {this.props.description}
            </Typography>
            {this.props.homepage ?
              (<ContainedButtons
                size="small"
                name='View Project'
                color='primary'
                onClick={this.props.goToProject}
                hidden={this.props.activetasks ? false : true}
              />)
              :
              (<div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}><ContainedButtons
                name={this.props.complete ? (this.props.isAdmin ? 'Reopen' : null) : (this.props.assigned ? 'Unassign' : 'Claim')}
                color="primary"
                size="small"
                onClick={this.props.complete ? (this.props.isAdmin ? this.props.onClickReopen : null) : (this.props.assigned ? this.props.unAssign : this.props.onClickAdd)}
                hidden={(this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
              />
                <ContainedButtons
                  name={this.props.assigned ? 'Mark Complete' : this.props.isAdmin ? 'Delete' : null}
                  color='secondary'
                  size="small"
                  onClick={this.props.assigned ? this.props.onClickComplete : this.props.onClickDelete}
                  hidden={this.props.complete ? true : (this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
                /></div>)
            }
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
