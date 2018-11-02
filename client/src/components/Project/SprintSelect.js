// import React from 'react';
// import Chip from '@material-ui/core/Chip';


// const SprintSelect = (props) => (
//     <div>
//     {props.sprints.map((data, i) => {
//         return(
//         <Chip
//             key={data.key}
//             label={data.label}
//             id={data.id}
//             onClick={props.onClick.bind(this, data.id)}
//             color={props.activeSprint === data.id ? 'primary' : "default"}
//         />
//         )})}
//     </div>
//     );

// export default SprintSelect;



import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Chips(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            {props.sprints.map((data, i) => {
                return (<Chip
                    icon={<FaceIcon />}
                    onDelete={handleDelete}
                    className={classes.chip}
                    key={data.key}
                    label={data.label}
                    id={data.id}
                    onClick={props.onClick.bind(this, data.id)}
                    color={props.activeSprint === data.id ? 'primary' : "default"}
                />
                )
            })}
        </div>
    );
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);