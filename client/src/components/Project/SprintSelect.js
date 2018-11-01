import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const SprintSelect = (props) => (
    <div>
    {props.pastSprints.map(data => (
        <Chip
            key={data.key}
            label={data.label}
            id={data.id}
            onClick={props.onClick.bind(this, data.id)}
            color={props.activeSprint === data.id ? 'primary' : "default"}
        />
        ))}
    </div>
);

export default SprintSelect;