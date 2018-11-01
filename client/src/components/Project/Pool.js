import React from "react";
import SimpleExpansionPanel from "../utils/TaskPool.js";

const Pool = (props) => {

    return (
        <SimpleExpansionPanel
            name={props.tasks.name}
            key={props.id}
            description={props.tasks.description}
            due={props.tasks.due_date}
            summary={props.tasks.description}
            difficulty={props.tasks.difficulty}
            onClickDelete={props.onClickDelete}
            onClickAdd={props.onClickAdd}
            unAssign={props.unAssign}
            assigned={props.assigned}
        />
    );
};

export default Pool;
