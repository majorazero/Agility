import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchLabel = (props) => {

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={props.checked}
              onChange={props.onChange}
              value="checkedA"
            />
          }
          label="Show Completed Tasks"
        />
      </FormGroup>
    );
  }

export default SwitchLabel;
