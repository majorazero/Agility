// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ContainedButtons from "./Button.js";
// import Grid from '@material-ui/core/Grid';
// import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


// const styles = theme => ({
//   root: {
//     width: 'fit-content',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
//   notHeading: {
//     fontSize: theme.typography.pxToRem(10),
//     fontWeight: theme.typography.fontWeightItalic,
//   }
// });

// function SimpleExpansionPanel(props) {
//   const { classes } = props;
//   // console.log(props.onClickReopen,props.unAssign, props.onClickAdd);
//   console.log(props);
//   return (
//     <ExpansionPanel key={props.id}>
//       <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//         <Typography className={classes.heading}>{props.name}</Typography>
//       </ExpansionPanelSummary>
//       <Grid container >
//         <ExpansionPanelDetails className={classes.root}>
//           <Grid container>
//             <Grid item xs>
//               <Typography>
//                 {props.description}
//               </Typography>
//             </Grid>
//             <Grid item xs>
//               <Typography className={classes.notHeading}>
//                 {props.due}
//               </Typography>
//             </Grid>
//           </Grid>
//           {/* {(location.pathname === "/homepage") ? null :  */}

//           {/* {props.isAdmin ?
//             <ContainedButtons
//               name={props.assigned ? "Unassign" : "Claim"}
//               color="primary"
//               onClick={props.assigned ? props.unAssign : props.onClickAdd}
//             />
//             :
//           (props.assigned && (props.currentUser === props.assignedUser)) ?
//             <ContainedButtons
//               name='Unassign'
//               color="primary"
//               onClick={props.unAssign}
//             />
//             :
//           <ContainedButtons
//             name='Claim'
//             color="primary"
//             onClick={props.onClickAdd}
//           />} */}
//           <Grid container
//             direction="row"
//             justify="flex-end"
//             alignItems="flex-end"
//             style={{ width: 'fit-content' }}
//             >
//             {props.homepage ?
//               (<Grid item xs><ContainedButtons
//                 size="small"
//                 name='View Project'
//                 color='primary'
//                 onClick={props.goToProject}
//                 hidden={props.activetasks ? false : true}
//               /></Grid>)
//               :
//               (<Grid item xs><ContainedButtons
//                 name={props.complete ? (props.isAdmin ? 'Reopen' : null) : (props.assigned ? 'Unassign' : 'Claim')}
//                 color="primary"
//                 size="small"
//                 onClick={props.assigned ? (props.complete ? props.onClickReopen : props.unAssign) : props.onClickAdd}
//                 hidden={(props.currentUser === props.assignedUser) ? false : (props.isAdmin ? false : true)}
//               // hidden={props.complete ? (props.isAdmin ? (props.currentUser === props.assignedUser ? false:true):true) : false}
//               />
//                 <ContainedButtons
//                   name={props.assigned ? 'Mark Complete' : props.isAdmin ? 'Delete' : null}
//                   color='secondary'
//                   size="small"
//                   onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
//                   hidden={props.complete ? true : (props.currentUser === props.assignedUser) ? false : (props.isAdmin ? false : true)}
//                 /></Grid>)
//             }
//           </Grid>

//           {/* {(location.pathname === "/homepage") ? null :  */}
//           {/* {props.isAdmin ?
//           <ContainedButtons
//             name={props.assigned ? "Mark Complete" : "Delete"}
//             color="secondary"
//             onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
//           />
//           :
//           (props.assigned && (props.currentUser === props.assignedUser)) ?
//           <ContainedButtons
//             name={props.assigned ? "Mark Complete" : "Delete"}
//             color="secondary"
//             onClick={props.assigned ? props.onClickComplete : props.onClickDelete}
//           /> : ""} */}
//           {/* } */}
//         </ExpansionPanelDetails>
//       </Grid>
//     </ExpansionPanel>
//   );
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
import ContainedButtons from "./Button.js";
import Grid from '@material-ui/core/Grid';

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
});

class SimpleExpansionPanel extends React.Component {
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

      <ExpansionPanel expanded={expanded === `panel${this.props.id}`} onChange={this.handleChange(`panel${this.props.id}`)} key={this.props.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{this.props.name}</Typography>
        </ExpansionPanelSummary>
        <Grid container >
          <ExpansionPanelDetails className={classes.root}>
            <Grid container>
              <Grid item xs>
                <Typography>
                  {this.props.description}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={classes.notHeading}>
                  {this.props.due}
                </Typography>
              </Grid>
            </Grid>
            {/* {(location.pathname === "/homepage") ? null :  */}

            {/* {this.props.isAdmin ?
            <ContainedButtons
              name={this.props.assigned ? "Unassign" : "Claim"}
              color="primary"
              onClick={this.props.assigned ? this.props.unAssign : this.props.onClickAdd}
            />
            :
          (this.props.assigned && (this.props.currentUser === this.props.assignedUser)) ?
            <ContainedButtons
              name='Unassign'
              color="primary"
              onClick={this.props.unAssign}
            />
            :
          <ContainedButtons
            name='Claim'
            color="primary"
            onClick={this.props.onClickAdd}
          />} */}
            <Grid container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
              style={{ width: 'fit-content' }}
            >
              {this.props.homepage ?
                (<Grid item xs><ContainedButtons
                  size="small"
                  name='View Project'
                  color='primary'
                  onClick={this.props.goToProject}
                  hidden={this.props.activetasks ? false : true}
                /></Grid>)
                :
                (<Grid item xs><ContainedButtons
                  name={this.props.complete ? (this.props.isAdmin ? 'Reopen' : null) : (this.props.assigned ? 'Unassign' : 'Claim')}
                  color="primary"
                  size="small"
                  onClick={this.props.assigned ? (this.props.complete ? this.props.onClickReopen : this.props.unAssign) : this.props.onClickAdd}
                  hidden={(this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
                // hidden={this.props.complete ? (this.props.isAdmin ? (this.props.currentUser === this.props.assignedUser ? false:true):true) : false}
                />
                  <ContainedButtons
                    name={this.props.assigned ? 'Mark Complete' : this.props.isAdmin ? 'Delete' : null}
                    color='secondary'
                    size="small"
                    onClick={this.props.assigned ? this.props.onClickComplete : this.props.onClickDelete}
                    hidden={this.props.complete ? true : (this.props.currentUser === this.props.assignedUser) ? false : (this.props.isAdmin ? false : true)}
                  /></Grid>)
              }
            </Grid>

            {/* {(location.pathname === "/homepage") ? null :  */}
            {/* {this.props.isAdmin ?
          <ContainedButtons
            name={this.props.assigned ? "Mark Complete" : "Delete"}
            color="secondary"
            onClick={this.props.assigned ? this.props.onClickComplete : this.props.onClickDelete}
          />
          :
          (this.props.assigned && (this.props.currentUser === this.props.assignedUser)) ?
          <ContainedButtons
            name={this.props.assigned ? "Mark Complete" : "Delete"}
            color="secondary"
            onClick={this.props.assigned ? this.props.onClickComplete : this.props.onClickDelete}
          /> : ""} */}
            {/* } */}
          </ExpansionPanelDetails>
        </Grid>
      </ExpansionPanel>

      // <div className={classes.root}>
      //   <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
      //     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      //       <Typography className={classes.heading}>General settings</Typography>
      //       <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
      //     </ExpansionPanelSummary>
      //     <ExpansionPanelDetails>
      //       <Typography>
      //         Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
      //         maximus est, id dignissim quam.
      //       </Typography>
      //     </ExpansionPanelDetails>
      //   </ExpansionPanel>
      //   <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
      //     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      //       <Typography className={classes.heading}>Users</Typography>
      //       <Typography className={classes.secondaryHeading}>
      //         You are currently not an owner
      //       </Typography>
      //     </ExpansionPanelSummary>
      //     <ExpansionPanelDetails>
      //       <Typography>
      //         Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
      //         diam eros in elit. Pellentesque convallis laoreet laoreet.
      //       </Typography>
      //     </ExpansionPanelDetails>
      //   </ExpansionPanel>
      //   <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
      //     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      //       <Typography className={classes.heading}>Advanced settings</Typography>
      //       <Typography className={classes.secondaryHeading}>
      //         Filtering has been entirely disabled for whole web server
      //       </Typography>
      //     </ExpansionPanelSummary>
      //     <ExpansionPanelDetails>
      //       <Typography>
      //         Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
      //         eros, vitae egestas augue. Duis vel est augue.
      //       </Typography>
      //     </ExpansionPanelDetails>
      //   </ExpansionPanel>
      //   <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
      //     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      //       <Typography className={classes.heading}>Personal data</Typography>
      //     </ExpansionPanelSummary>
      //     <ExpansionPanelDetails>
      //       <Typography>
      //         Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
      //         eros, vitae egestas augue. Duis vel est augue.
      //       </Typography>
      //     </ExpansionPanelDetails>
      //   </ExpansionPanel>
      // </div>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);