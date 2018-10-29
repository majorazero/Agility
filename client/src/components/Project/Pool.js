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
            onClick={props.onClick}
        />
    );
};

export default Pool;
