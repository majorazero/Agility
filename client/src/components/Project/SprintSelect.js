import React from 'react';
import Chip from '@material-ui/core/Chip';


const SprintSelect = (props) => (
    <div>
    {props.sprints.map((data, i) => {
        return(
        <Chip
            key={data.key}
            label={data.label}
            id={data.id}
            onClick={props.onClick.bind(this, data.id)}
            color={props.activeSprint === data.id ? 'primary' : "default"}
        />
        )})}
    </div>
    );

export default SprintSelect;