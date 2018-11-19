// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ContainedButtons from "./Button.js";
import Grid from '@material-ui/core/Grid';

// const styles = theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '33.33%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
//   column: {
//     flexBasis: '33.33%',
//   }
// });

// class SimpleExpansionPanel extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       expanded: null,
//     };
//   }

//   handleChange = panel => (event, expanded) => {
//     this.setState({
//       expanded: expanded ? panel : false,
//     });
//   };

//   render() {
//     const { classes } = this.props;
//     const { expanded } = this.state;
//     return (
//       <div className = {classes.root}>
//       <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange} key={this.props.id}>
//         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//           <div className={classes.column}>
//           <Typography className={classes.heading}>{this.props.name}</Typography>
//           </div>
//           <div className={classes.column}>
//             <Typography className={classes.secondaryHeading}>Due: {this.props.due}</Typography>
//           </div>
//           <div className={classes.column}>
//             <Typography className={classes.secondaryHeading}>{this.props.stack}</Typography>
//           </div>
//         </ExpansionPanelSummary>
//         <Grid container >
//           <ExpansionPanelDetails className={classes.root}>
//             <Grid container>
//               <Grid item xs style={{marginRight: 10}}>
//                 <Typography>
//                   {this.props.description}
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Grid container
//               direction="row"
//               justify="flex-end"
//               alignItems="flex-end"
//               style={{ width: 'fit-content' }}
//             >
//               {this.props.homepage ?
//                 (<Grid item xs><ContainedButtons
//                   size="small"
//                   name='View Project'
//                   color='primary'
//                   onClick={this.props.goToProject}
//                   hidden={this.props.activetasks ? false : true}
//                 /></Grid>)
//                 :
//                 (<Grid item xs><ContainedButtons
//                   name={this.props.complete ? (this.props.isAdmin ? 'Reopen' : null) : (this.props.assigned ? 'Unassign' : 'Claim')}
//                   color="primary"
//                   size="small"
//                   onClick={this.props.assigned ? (this.props.complete ? this.props.onClickReopen : this.props.unAssign) : this.props.onClickAdd}
//                   hidden={(this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
//                 // hidden={this.props.complete ? (this.props.isAdmin ? (this.props.currentUser === this.props.assignedUser ? false:true):true) : false}
//                 />
//                   <ContainedButtons
//                     name={this.props.assigned ? 'Mark Complete' : this.props.isAdmin ? 'Delete' : null}
//                     color='secondary'
//                     size="small"
//                     onClick={this.props.assigned ? this.props.onClickComplete : this.props.onClickDelete}
//                     hidden={this.props.complete ? true : (this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
//                   /></Grid>)
//               }
//             </Grid>

//           </ExpansionPanelDetails>
//         </Grid>
//       </ExpansionPanel>
//       </div>
//     );
//   }
// }

// SimpleExpansionPanel.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleExpansionPanel);



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
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    display: 'flex',
    float: 'right'
  }
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
    const { expanded } = this.state;

    return (
      <div className={classes.root}>

        <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange} key={this.props.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.props.name}</Typography>
            <Typography className={classes.secondaryHeading}>{this.props.due} | {this.props.stack}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {this.props.description}
            </Typography>
            {this.props.homepage ?
              (<ContainedButtons
                className={classes.button}
                size="small"
                name='View Project'
                color='primary'
                onClick={this.props.goToProject}
                hidden={this.props.activetasks ? false : true}
              />)
              :
              (<div><ContainedButtons
                className={classes.button}
                name={this.props.complete ? (this.props.isAdmin ? 'Reopen' : null) : (this.props.assigned ? 'Unassign' : 'Claim')}
                color="primary"
                size="small"
                onClick={this.props.assigned ? (this.props.complete ? this.props.onClickReopen : this.props.unAssign) : this.props.onClickAdd}
                hidden={(this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
              // hidden={this.props.complete ? (this.props.isAdmin ? (this.props.currentUser === this.props.assignedUser ? false:true):true) : false}
              />
                <ContainedButtons
                  className={classes.button}
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