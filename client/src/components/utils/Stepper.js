import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DescIcon from '@material-ui/icons/Description';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: '90%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  balls: {
    padding: 15,
    height: 470,
    width: '-webkit-fill-available'
  },
});

class TextMobileStepper extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
    };
  }


  // handleNext = () => {
  //   this.setState(prevState => ({
  //     activeStep: prevState.activeStep + 1,
  //   }));
  // };

  // handleBack = () => {
  //   this.setState(prevState => ({
  //     activeStep: prevState.activeStep - 1,
  //   }));
  // };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.tutorialSteps.length;

    return (
      <div className={classes.root}>
        {/* <MobileStepper
          style={{
            padding: 5
          }}
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
        /> */}
        <Paper className={classes.balls}>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-content',
              position: 'absolute',
              left: 90,
              top: 67
            }}
          >
            <DescIcon color='secondary' />
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[0].label1}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[0].info1}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[0].label2}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[0].info2}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[0].label3}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[0].info3}</Typography>
          </div>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-content',
              position: 'absolute',
              bottom: 45,
              left: 90
            }}
          >
            <DescIcon color='secondary' />
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[1].label1}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[1].info1}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[1].label2}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[1].info2}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[1].label3}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[1].info3}</Typography>
          </div>
          <div
            style={{
              width: 'fit-content',
              height: 'fit-content',
              position: 'absolute',
              right: 90,
              top: 67
            }}
          >
            <DescIcon color='secondary' />
            {(this.props.tutorialSteps.length > 2) ? <br /> : null}
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[2].label1}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[2].info1}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[2].label2}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[2].info2}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[2].label3}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[2].info3}</Typography>
            <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[2].label4}</Typography>
            <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[2].info4}</Typography>
          </div>
        </Paper>
      </div>
    );
  }
}

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);
