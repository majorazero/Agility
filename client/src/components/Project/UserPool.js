import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TaskCard from '../utils/TaskCard/TaskCard';
import Pool from './Pool';


// const style = {
//     gridItem: {
//         padding: 10
//     },
//     taskCard: {
//         marginTop: 5
//     }
// }

class UserPool extends Component {

    constructor(props) {
        super(props);
      }

    componentDidUpdate(prevProps){
        if((prevProps.sprintId !== this.props.sprintId) || (prevProps.tasks !== this.props.tasks) || (prevProps.members !== this.props.members)){
           this.render();
        }
    }

    render(){
      console.log(this.props);
      return(
        <Grid container spacing={24}>
            {this.props.members.map((member, i) => {
              return(
              <Grid key={i} item>
                <p>{member.User.first_name} {member.User.last_name}</p>
                {this.props.tasks.filter(task => task.assigned_id === member.User.id).map(fTask => {
                    console.log(fTask)
                    return(
                    <Pool key={fTask.id} id={this.key} tasks={fTask} onClickDelete={() => this.props.onClickDelete(fTask)}
                    unAssign={() => this.props.unassign(fTask.id)} assigned>
                    </Pool>)
                    // <TaskCard key={fTask.id} title={fTask.name} summary={fTask.description} dueDate={fTask.due_date} unAssign={()=>{
                    //   this.props.unassign(fTask.id)
                    // }} titleSize="subtitle2" subtitleSize='caption'></TaskCard>
                })}
              </Grid>)
            })}
        </Grid>
      );
    }
};

export default UserPool;
