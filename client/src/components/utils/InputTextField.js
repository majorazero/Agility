import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        height: 'fit-content',
        display: 'flex',
        alignItems: 'flex-end'
      },
    },
  },
});

const styles = theme => ({
  button: {
    margin: "8px 8px 8px 16px",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    padding: "0 0 5px 5px",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class InputTextField extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={this.props.onSubmit}
      >
        <TextField
          label={this.props.label}
          type="text"
          className={classes.textField}
          margin="normal"
          onChange={this.props.onChange}
          name={this.props.name}
        />
        <MuiThemeProvider theme={theme}>
          <Button type="submit" variant="outlined" size="small" color="secondary" className={classes.button}>
              Submit
            </Button>
        </MuiThemeProvider>
      </form>
    );
  }
}

InputTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputTextField);
