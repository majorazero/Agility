import React from "react";

const SummaryCard = (props) => {
  console.log(props);
  let sprintComplexity = 0;
  let membersCard = props.members.map((item) => {
    let amtofTaskTaken = 0;
    let amtofTaskComplete = 0;
    let complexity = 0;
    let stack = {};
    for(let i = 0; i < props.assigned.length; i++){
      if(props.assigned[i].assigned_id === item.User.id){
        amtofTaskTaken++;
      }
    }
    for(let i = 0; i < props.completed.length; i++){
      if(props.completed[i].assigned_id === item.User.id){
        amtofTaskComplete++;
        amtofTaskTaken++;
        complexity += props.completed[i].complexity;
        if(stack[props.completed[i].stack] === undefined){
          stack[props.completed[i].stack] = 1;
        }
        else {
          stack[props.completed[i].stack]++;
        }
      }
    }
    complexity = (complexity/amtofTaskComplete).toFixed(2);
    let topStack = "";
    let topStackNum = 0;
    for (let i in stack){
      if(stack[i] > topStackNum){
        topStackNum = stack[i];
        topStack = i;
      }
    }
    console.log(topStack,topStackNum);
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
      info2: `Task Completed: ${amtofTaskComplete}`,
      info3: `Task Taken: ${amtofTaskTaken}`,
      info4: `${(amtofTaskComplete === 0) ? "":`Avg Complexity: ${complexity} (Completed)`}`,
      info5: `${(topStack === "") ? "": `Most Taken Stack: ${topStack} ${(topStackNum/amtofTaskComplete*100).toFixed(2)}%`}`
    };
  });

  return(
    <div>
      {(props.currentSprint === -1) ?
        <div>
          <div>No data avaiable yet!</div>
          <div>Create a sprint!</div>
        </div>
        :
        <div>
          <div>Task Completion Rate: {(props.completed.length/(props.completed.length + props.assigned.length + props.unAssigned.length)*100).toFixed(2)}% ({props.completed.length}/{props.completed.length + props.assigned.length + props.unAssigned.length})</div>
          <div>Total Untaken Tasks Across Sprint: {props.unAssigned.length}</div>
          <div></div>
          <div>-----------</div>
          <div>

          </div>
        </div>}
    </div>
  );
}

export default SummaryCard;
