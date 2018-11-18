// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// // import Button from '@material-ui/core/Button';
// import AddSprintLayout from "./AddSprintLayout";

// function getModalStyle() {
//     const top = 50;
//     const left = 50;

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const styles = theme => ({
//     paper: {
//         position: 'absolute',
//         // width: theme.spacing.unit * 50,
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing.unit * 4,
//     },
// });

// class SimpleModalSprint extends React.Component {
//     state = {
//         open: false,
//     };


//     render() {
//         const { classes } = this.props;
//         return (
//             <div>
//                 <Modal
//                     aria-labelledby="simple-modal-title"
//                     aria-describedby="simple-modal-description"
//                     open={this.props.open}
//                     onClose={this.props.onClose}
//                 >
//                     <div style={getModalStyle()} className={classes.paper}>
//                         <Typography variant="h6" id="modal-title">
//                             {this.props.name}
//                         </Typography>
//                         <div>
//                             <AddSprintLayout 
//                             onSubmit={this.props.onSubmit}
//                             onChange={this.props.onChange}
//                             />
//                         </div>
//                         <SimpleModalSprintWrapped />
//                     </div>
//                 </Modal>
//             </div>
//         );
//     }
// }

// SimpleModalSprint.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// // We need an intermediary variable for handling the recursive nesting.
// const SimpleModalSprintWrapped = withStyles(styles)(SimpleModalSprint);

// export default SimpleModalSprintWrapped;


import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddSprintLayout from "./AddSprintLayout";
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
        };
    }


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.onSubmit()
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                        <AddSprintLayout
                            onChange={this.props.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Submit
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialogSlide;