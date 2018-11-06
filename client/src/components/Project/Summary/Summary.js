import React from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import UserStepper from '../../utils/UserStepper.js';

const SummaryCard = (props) => {
  console.log(props);
  let sprintComplexity = 0;
  let membersCard = props.members.map((item) => {
    let amtofTaskTaken = 0;
    let amtofTaskComplete = 0;
    let complexity = 0;
    let stack = {};
    for (let i = 0; i < props.assigned.length; i++) {
      if (props.assigned[i].assigned_id === item.User.id) {
        amtofTaskTaken++;
      }
    }
    for (let i = 0; i < props.completed.length; i++) {
      if (props.completed[i].assigned_id === item.User.id) {
        amtofTaskComplete++;
        amtofTaskTaken++;
        complexity += props.completed[i].complexity;
        if (stack[props.completed[i].stack] === undefined) {
          stack[props.completed[i].stack] = 1;
        }
        else {
          stack[props.completed[i].stack]++;
        }
      }
    }
    complexity = (complexity / amtofTaskComplete).toFixed(2);
    let topStack = "";
    let topStackNum = 0;
    for (let i in stack) {
      if (stack[i] > topStackNum) {
        topStackNum = stack[i];
        topStack = i;
      }
    }
    console.log(topStack, topStackNum);
    // return(
    //   <div>
    //     <div>{item.User.first_name} {item.User.last_name}</div>
    //     <div>Task Completed: {amtofTaskComplete}</div>
    //     <div>Tasks Taken: {amtofTaskTaken}</div>
    //     {(amtofTaskComplete === 0) ? "":<div>Avg Complexity: {complexity} (Completed)</div>}
    //     {(topStack === "") ? "": <div>Most Taken Stack: {topStack} {(topStackNum/amtofTaskComplete*100).toFixed(2)}%</div>}
    //     <div>-----------</div>
    //   </div>
    // );
    return {
      label1: `${item.User.first_name} ${item.User.last_name}`,
      label2: "Task Completed:",
      info2: `${amtofTaskComplete}`,
      label3: "Task Taken:",
      info3: `${amtofTaskTaken}`,
      label4: `${(amtofTaskComplete === 0) ? "" : "Avg Complexity:"}`,
      info4: `${(amtofTaskComplete === 0) ? "" : `${complexity} (Completed)`}`,
      label5: `${(topStack === "") ? "" : `Most Taken Stack:`}`,
      info5: `${(topStack === "") ? "" : `${topStack} ${(topStackNum / amtofTaskComplete * 100).toFixed(2)}%`}`
    };
  });

  return (
    <div style={{
      padding: '5px 25px 25px 25px',
      width: 'inherit'
    }}>
      {(props.currentSprint === -1) ?
        <div>
          <Typography variant="subtitle1" gutterBottom>No data avaiable yet!</Typography>
          <Typography variant="subtitle2" gutterBottom>Create a sprint!</Typography>
        </div>
        :
        <div>
          <Grid
            container
            spacing={8}
          >
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>Task Completion Rate: </Typography>
              <Typography variant="subtitle2" gutterBottom>{(props.completed.length / (props.completed.length + props.assigned.length + props.unAssigned.length) * 100).toFixed(2)}% ({props.completed.length}/{props.completed.length + props.assigned.length + props.unAssigned.length})</Typography>
              <Divider />
              <Typography variant="subtitle1" gutterBottom>Total Untaken Tasks Across Sprint: </Typography>
              <Typography variant="subtitle2" gutterBottom>{props.unAssigned.length}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={8}
              >
                <Grid item xs>
                  <UserStepper
                    membersCard={membersCard}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>}
    </div>
  );
}

export default SummaryCard;
