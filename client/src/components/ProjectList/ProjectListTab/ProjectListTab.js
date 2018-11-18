// import React from "react";
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';


// const ProjectListTab = (props) => {
//   return (
//     // <Grid
//     //   container
//     //   spacing={16}
//     //   style={{ padding: 5, width: 150 }}
//     // >
//     //   <Grid item xs>
//           <GridListTile>
//             <img src="assets/images/background.jpg" alt={props.name} style={{
//               height: 150,
//               backgroundSize: 'cover',
//               backgroundPosition: "center center"
//             }} />
//             <GridListTileBar
//               style={{ background: 'red' }}
//               actionIcon={
//                 <IconButton onClick={props.onProjectPress}>
//                   <Typography variant="h6" gutterBottom>{props.name}</Typography>
//             </IconButton>}
//             />
//           </GridListTile>
//     //   </Grid>
//     // </Grid>
//     //   <h1>{props.name}</h1>
//     //   <h2>{props.summary}</h2>
//     // <button onClick={props.onProjectPress}>Go to project.</button>

//     //   <h2>Due Date: {props.duedate}</h2>
//     // </div>
//   );
// }

// export default ProjectListTab;


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Add from '@material-ui/icons/Add';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    backgroundSize: 'cover',
    // backgroundPosition: "center center",
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  title: {
    margin: 5,
  },
});

function SingleLineGridList(props) {
  const { classes } = props;

  return (
    // <GridListTile
    //   style={{
    //     height: 150,
    //     width: 250
    //   }}
    //   classes={{ root: classes.gridList }}
    // >
    <div
      alt={props.name}
    // classes={{root: classes.root}}
    >
      <List style={{ padding: 0, margin: 5 }}>
        <ListItem style={{ width: '50%' }} button onClick={props.onClick}>
          <ListItemIcon><Add /></ListItemIcon>
          <ListItemText primary={props.title} />
        </ListItem>
        <ListItem
          classes={{ root: classes.root }}
        >
          <ListItemText
            button
            style={{ cursor: "pointer" }}
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
            aria-label="Choose Project"
            onClick={props.onProjectPress}
            primary={props.name}
            secondary={props.summary}
          />
          <ListItemSecondaryAction>
            {/* <IconButton aria-label="Choose Project" onClick={props.onProjectPress}> */}
            <Icon className={classes.title}>
              how_to_vote
                    </Icon>
            {/* </IconButton> */}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
    //   <GridListTileBar
    //   style={{cursor: "pointer"}}
    //     title={props.name}
    //     onClick={props.onProjectPress}
    //     classes={{
    //       root: classes.titleBar,
    //       title: classes.title,
    //     }}
    //     actionIcon={
    //       <IconButton>
    //         <Icon className={classes.title}>
    //           how_to_vote
    //         </Icon>
    //       </IconButton>
    //     }
    //   />
    // </GridListTile>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
