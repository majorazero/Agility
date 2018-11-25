import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import DatePickers from "./DatePicker.js";
import TextField from '@material-ui/core/TextField';

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
    marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    justify: "center",
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    width: 'auto', // Fix IE 11 issue.
    // marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function AddTaskLayout(props) {
  const { classes } = props;
  return (
    <div>
      <CssBaseline />
      <main className={classes.layout}>
        <form onSubmit={props.onSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Task Name</InputLabel>
            <Input id="name" name="name" autoComplete="name" autoFocus
              onChange={props.onChange("taskName")}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <DatePickers
              label="Due Date"
              id="due_date"
              name="due_date"
              autoComplete="due_date"
              autoFocus
              onChange={props.onChange("taskDue_date")}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input id="description" name="description" autoComplete="description" autoFocus
              onChange={props.onChange("taskDescription")}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            {/* <InputLabel htmlFor="complexity">Complexity (1-5)</InputLabel> */}
            {/* <Input id="complexity" name="complexity" autoComplete="complexity" autoFocus
              onChange={props.onChange("taskComplexity")}
            /> */}
            <TextField type='number' label='Complexity (1-5)' id="complexity" name="complexity" autoComplete="complexity" autoFocus
              onChange={props.onChange("taskComplexity")} inputProps={{ min: "1", max: "5"}}></TextField>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="stack">Stack (Javascript, CSS, HTML, React ...)</InputLabel>
            <Input id="stack" name="stack" autoComplete="stack" autoFocus
              onChange={props.onChange("taskStack")}
            />
          </FormControl>
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
            </Button> */}
        </form>
      </main>
    </div>
  );
}

AddTaskLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTaskLayout);
