import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const ProjectListTab = (props) => {
  return(
      <GridListTile style={{marginLeft: 5}}>
        <img src='https://www.projectsmart.co.uk/img/project.png' alt={props.name} />
        <GridListTileBar
          title={props.name}
          style={{background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'}}
        />
      </GridListTile>
    //   <h1>{props.name}</h1>
    //   <h2>{props.summary}</h2>
    //   <h2>Due Date: {props.duedate}</h2>
    //   <button onClick={props.onProjectPress}>Go to project.</button>
    // </div>
  );
}

export default ProjectListTab;
