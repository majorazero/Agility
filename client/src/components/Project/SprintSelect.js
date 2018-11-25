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
// import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/icons/TurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
// import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingBottom: 10
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

function Chips(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            {props.sprints.map((data, i) => {
                return (
                <Tooltip title={`${data.start} - ${data.end}`} placement="top">
                <Chip
                    icon={<Icon />}
                    className={classes.chip}
                    key={data.key}
                    label={data.label}
                    id={data.id}
                    onClick={props.onClick.bind(this, data.id)}
                    color={props.activeSprint === data.id ? 'primary' : "default"}
                />
                </Tooltip>
                )
            })}
        </div>
    );
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);