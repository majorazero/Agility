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
              onChange={props.edit ? props.onChange('currentTaskName'):props.onChange("taskName")}
              value={props.name}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <DatePickers
              label="Due Date"
              id="due_date"
              name="due_date"
              autoComplete="due_date"
              autoFocus
              onChange={props.edit ? props.onChange('currentTaskDueDate'):props.onChange("taskDue_date")}
              edit={props.edit ? true:false}
              due_date={props.due_date}
              defaultDueDate = {props.defaultDueDate}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input id="description" name="description" autoComplete="description" autoFocus
              onChange={props.edit ? props.onChange("currentTaskDescription"):props.onChange("taskDescription")}
              value={props.description}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField type='number' label='Complexity (1-5)' id="complexity" name="complexity" autoComplete="complexity" autoFocus
              onChange={props.edit ? props.onChange('currentTaskComplexity'):props.onChange("taskComplexity")} inputProps={{ min: "1", max: "5"}}
              value={props.complexity}
              ></TextField>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="stack">Stack (Javascript, CSS, HTML, React ...)</InputLabel>
            <Input id="stack" name="stack" autoComplete="stack" autoFocus
              onChange={props.edit ? props.onChange('currentTaskStack'):props.onChange("taskStack")}
              value={props.stack}
            />
          </FormControl>
        </form>
      </main>
    </div>
  );
}

AddTaskLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTaskLayout);
