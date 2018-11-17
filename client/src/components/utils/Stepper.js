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
    padding: 5
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    // height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  balls: {
    // backgroundColor: "white",
    // height: '100%',
    width: '100%',
    padding: 5
  },
});

class TextMobileStepper extends React.Component {

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
    const maxSteps = this.props.tutorialSteps.length;

    console.log(this.props.tutorialSteps[activeStep])

    return (
      <div className={classes.root}>
      <MobileStepper
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
        />
        <Paper square elevation={0} className={classes.balls}>
          <DescIcon style={{fill: 'black'}} />
          <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[activeStep].label1}</Typography>
          <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[activeStep].info1}</Typography>
          <br />
          <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[activeStep].label2}</Typography>
          <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[activeStep].info2}</Typography>
          <br />
          <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[activeStep].label3}</Typography>
          <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[activeStep].info3}</Typography>
          {(this.props.tutorialSteps.length > 2) ? <br /> : null }
          <Typography variant="subtitle1" gutterBottom>{this.props.tutorialSteps[activeStep].label4}</Typography>
          <Typography variant="caption" gutterBottom>{this.props.tutorialSteps[activeStep].info4}</Typography>
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