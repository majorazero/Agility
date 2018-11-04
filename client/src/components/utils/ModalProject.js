import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import AddProjectLayout from "./AddProjectLayout.js";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        // width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModalProject extends React.Component {
    state = {
        open: false,
    };


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            {this.props.name}
                        </Typography>
                        <div>
                            <AddProjectLayout 
                            onSubmit={this.props.onSubmit}
                            onChange={this.props.onChange}
                            />
                        </div>
                        <SimpleModalProjectWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModalProject.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalProjectWrapped = withStyles(styles)(SimpleModalProject);

export default SimpleModalProjectWrapped;
