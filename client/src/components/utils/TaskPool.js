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
    // color: theme.palette.text.secondary,
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
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography style={{ width: '-webkit-fill-available' }}>
              {this.props.description}
            </Typography>
          {this.props.location === 'open tasks' ? 
            <div>
              <ContainedButtons
                size="small"
                name='Delete'
                color='primary'
                onClick={this.props.onClickDelete}
                hidden={false}
              />
              <ContainedButtons
                size="small"
                name='Claim'
                color='primary'
                onClick={this.props.onClickAdd}
                hidden={false}
              /> 
              <ContainedButtons
                size="small"
                name='Edit'
                color='primary'
                onClick={this.props.edit}
                hidden={this.props.isAdmin ? false:true}
              /> 
            </div>
             : null}
          {this.props.location === 'in progress' ? 
            <div>
              <ContainedButtons
                size="small"
                name='Complete'
                color='primary'
                onClick={this.props.onClickComplete}
                hidden={false}
              />
              <ContainedButtons
                size="small"
                name='Unassign'
                color='primary'
                onClick={this.props.unAssign}
                hidden={false}
              />
            </div>
            : null}
            {this.props.location === 'complete' ? 
              <div>
                <ContainedButtons
                  size="small"
                  name='Reopen'
                  color='primary'
                  onClick={this.props.onClickReopen}
                  hidden={false}
                /> 
              </div>
            :null}
            {this.props.homepage ? 
              <div>
                <ContainedButtons
                  size="small"
                  name='View Project'
                  color='primary'
                  onClick={this.props.goToProject}
                  hidden={false}
                />
              </div>
            : null}
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
