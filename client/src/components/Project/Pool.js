import React from "react";
import SimpleExpansionPanel from "../utils/TaskPool.js"

const Pool = (props) => {

    return (
                <SimpleExpansionPanel 
                name={props.tasks.name}
                description={props.tasks.description}
                due={props.tasks.due_date} 
                />
    );
};

export default Pool;