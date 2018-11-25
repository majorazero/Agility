import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiPopover: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: 'dimgray', // Some CSS
        color: 'white'
      },
    },
  },
});

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class SimplePopper extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      open: false
    };
  }

  handleClick = event => {
    this.props.onPoperClick()
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : null;

    return (
      <div>
        <Button size="small" color='secondary' aria-describedby={id} variant="contained" onClick={this.handleClick}>
          Invite Code
        </Button>
        <MuiThemeProvider theme={theme}>
          <Popover
            id="simple-popper"
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >

          <Typography className={classes.typography}>{this.props.message}</Typography>

        </Popover>
</MuiThemeProvider>
      </div>
    );
  }
}

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopper);
