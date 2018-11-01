import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

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
            </form>
        );
    }
}

InputTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputTextField);