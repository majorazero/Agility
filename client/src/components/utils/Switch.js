import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabel extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.props.checked}
              onChange={this.props.onChange}
              value="checkedA"
            />
          }
          label={this.props.label}
        />
      </FormGroup>
    );
  }
}

export default SwitchLabel;
