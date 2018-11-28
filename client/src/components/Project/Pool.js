import React from "react";
import SimpleExpansionPanel from "../utils/TaskPool.js";
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';

const styles = {
  root: {
    padding: 0
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listItem: {
    padding: 0
  }
}

const Pool = (props) => {
  const { classes } = props;
  // console.log(props.tasks);
  return (
    <ListItem
      style={{
        display: "table-caption",
        width: "100%",
      }}
      classes = {
        {root: classes.root}
      }
    >
      <SimpleExpansionPanel
        location = {props.location}
        currentUser={props.currentUser}
        assignedUser={props.assignedUser}
        name={props.tasks.name}
        key={props.id}
        id={props.id}
        isAdmin={props.isAdmin}
        description={props.tasks.description}
        due={props.tasks.due_date}
        summary={props.tasks.description}
        complexity={props.tasks.complexity}
        stack={props.tasks.stack}
        onClickDelete={props.onClickDelete}
        onClickAdd={props.onClickAdd}
        unAssign={props.unAssign}
        assigned={props.assigned}
        onClickComplete={props.onClickComplete}
        onClickReopen={props.onClickReopen}
        complete={props.complete}
        activetasks={props.activetasks}
        goToProject={props.goToProject}
        homepage={props.homepage}
        expanded={props.expanded}
        onChange={props.onChange}
        edit={props.edit}
        futureSprint={props.futureSprint}
        active={props.active}
      />
    </ListItem>
  );
};

Pool.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Pool);
