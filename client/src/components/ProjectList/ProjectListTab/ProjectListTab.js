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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <GridListTile>
      <img src="assets/images/background.jpg"
        alt={props.name}
        style={{
          // width: 150,
          height: 200,
          backgroundSize: 'cover',
          backgroundPosition: "center center"
        }}
      />
      <GridListTileBar
        title={props.name}
        onClick={props.onProjectPress}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton>
            <StarBorderIcon className={classes.title} />
          </IconButton>
        }
      />
    </GridListTile>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);