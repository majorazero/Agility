import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        height: 'fit-content'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        backgroundColor: theme.palette.background.default,
        justifyContent: 'center'
    },
    img: {
        height: 'fit-content',
        overflow: 'hidden',
        display: 'block',
        // width: '100%',
        padding: 5
    },
    mobileStepper: {
        height: 20
    }
});

class UserStepper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeStep: 0,
        };
    }


    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;
        const maxSteps = this.props.membersCard.length;

        return (
            (this.props.memberCard !== undefined) ?
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography variant="subtitle1" gutterBottom>{this.props.membersCard[activeStep].label1}</Typography>
                </Paper>
                <Paper square elevation={0} className={classes.img}>
                    <Typography variant="subtitle2" gutterBottom>{this.props.membersCard[activeStep].label2}</Typography>
                    <Typography variant="caption" gutterBottom>{this.props.membersCard[activeStep].info2}</Typography>
                    <br />
                    <Typography variant="subtitle2" gutterBottom>{this.props.membersCard[activeStep].label3}</Typography>
                    <Typography variant="caption" gutterBottom>{this.props.membersCard[activeStep].info3}</Typography>
                    <br />
                    <Typography variant="subtitle2" gutterBottom>{this.props.membersCard[activeStep].label4}</Typography>
                    <Typography variant="caption" gutterBottom>{this.props.membersCard[activeStep].info4}</Typography>
                    <br />
                    <Typography variant="subtitle2" gutterBottom>{this.props.membersCard[activeStep].label5}</Typography>
                    <Typography variant="caption" gutterBottom>{this.props.membersCard[activeStep].info5}</Typography>
                </Paper>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
            </Button>
                    }
                />
            </div> :
            <div>Nothing here.</div>
        );
    }
}

UserStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserStepper);
