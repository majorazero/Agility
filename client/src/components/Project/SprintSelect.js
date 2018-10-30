import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import axios from 'axios';

class SprintSelect extends Component {

    state={
        chipData: []
    }

    componentDidMount(){
        this.getSprints(1);
    }

    getSprints = (projectId) => {
        let sprintData = [];
        axios.get(`/api/sprint/${projectId}`)
        .then(res => {
            let today = new Date();
            let pastSprints = res.data.filter(sprint => {
                let endDate = new Date(sprint.end_date + "T00:00:00");
                return(
                    today > endDate
                )
            })
            .map((pSprint, i) => {
                sprintData.push({
                    key: i, 
                    label: pSprint.name
                })
            })
        this.setState({chipData: sprintData})
        })
    }

    render(){
        return(
            <Paper>
            {this.state.chipData.map(data => (
                <Chip
                  key={data.key}
                  label={data.label}
                />
              ))}
          </Paper>
        )};
};

export default SprintSelect;