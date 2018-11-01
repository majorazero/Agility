import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import axios from 'axios';
import { runInThisContext } from 'vm';

class SprintSelect extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            sprints: []
        };
      }

      componentDidMount(){
          this.getSprints(1)
      }

      componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.getSprints(1)
        }
      }

      getSprints = (currentUser) => {
          axios.post('/api/allSprintsForMember', {userId: currentUser})
          .then(res => {
            let sprints = res.data
            let sprintIds = [];
            sprints.forEach(sprint => {
            sprintIds.push(sprint.sprintId)})
            console.log(sprintIds)
            let correctSprints = this.props.pastSprints.filter(item => sprintIds.includes(item.id));
            this.setState({sprints: correctSprints})
          })
      } 

    render(){
    return(
    <div>
    {this.state.sprints.map((data, i) => {
        return(
        <Chip
            key={data.key}
            label={data.label}
            id={data.id}
            onClick={this.props.onClick.bind(this, data.id)}
            color={this.props.activeSprint === data.id ? 'primary' : "default"}
        />
        )})}
    </div>
    )}};

export default SprintSelect;