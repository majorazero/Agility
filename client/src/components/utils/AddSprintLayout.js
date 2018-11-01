import React from 'react';
import PropTypes from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DatePickers from "./DatePicker.js";

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    justify: "center",
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    width: 'auto', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function AddSprintLayout(props) {
  const { classes } = props;
  return (
    <div>
      <CssBaseline />
      <main className={classes.layout}>
        <form onSubmit={props.onSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Sprint Name</InputLabel>
            <Input
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={props.onChange("sprintName")}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <DatePickers
              label="Start Date"
              id="start_date"
              name="start_date"
              autoComplete="start_date"
              autoFocus
              onChange={props.onChange("sprintStart_date")}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <DatePickers
              label="End Date"
              id="end_date"
              name="end_date"
              autoComplete="end_date"
              autoFocus
              onChange={props.onChange("sprintEnd_date")}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
            </Button>
        </form>
      </main>
    </div>
  );
}

AddSprintLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddSprintLayout);