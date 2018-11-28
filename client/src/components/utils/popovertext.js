import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AlertSnackbar from './Snackbar';

const theme = createMuiTheme({
  overrides: {
    MuiPopover: {
      root: {
        backgroundColor: 'dimgray',
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
      open: false,
      copied: false,
      showsnack: false,
      snackType: '',
      errorTaskMess: "",
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
              vertical: 'top',
              horizontal: 'right',
            }}
          >

            {/* <Typography className={classes.typography}>{this.props.message}</Typography> */}

<Typography className={classes.typography}>
            <CopyToClipboard text={this.props.message}
              onCopy={() => {
                this.setState({ copied: true, showsnack: true, snackType: 'info', errorTaskMess: 'Copied to clipboard!' });
                setTimeout(() => { this.setState({ showsnack: false }) }, 3000);
              }}>
              <span>{this.props.message}</span>
            </CopyToClipboard>

</Typography>
          </Popover>
        </MuiThemeProvider>
        {this.state.copied ? (this.state.showsnack ? <AlertSnackbar
          open={this.state.showsnack}
          variant={this.state.snackType}
          message={this.state.errorTaskMess}
        /> : null) : null}
      </div>
    );
  }
}

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopper);
