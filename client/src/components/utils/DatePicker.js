import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
});

function DatePickers(props) {
  const { classes } = props;
  return (
      <TextField
        id={props.id}
        label={props.label}
        name={props.name}
        type="date"
        value={props.edit ? props.due_date:props.defaultDueDate}
        className={classes.textField}
        onChange={props.onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
