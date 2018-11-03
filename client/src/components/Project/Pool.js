import React from "react";
import SimpleExpansionPanel from "../utils/TaskPool.js";

const Pool = (props) => {

    return (
        <SimpleExpansionPanel
            currentUser={props.currentUser}
            assignedUser={props.assignedUser}
            name={props.tasks.name}
            key={props.id}
            isAdmin={props.isAdmin}
            description={props.tasks.description}
            due={props.tasks.due_date}
            summary={props.tasks.description}
            difficulty={props.tasks.difficulty}
            onClickDelete={props.onClickDelete}
            onClickAdd={props.onClickAdd}
            unAssign={props.unAssign}
            assigned={props.assigned}
            onClickComplete={props.onClickComplete}
            complete = {props.complete}
        />
    );
};

export default Pool;
