import React, { Component } from 'react';
// import axios from 'axios';
// // import Modal from '@material-ui/core/Modal';
// import TaskCard from "../../utils/TaskCard/TaskCard"
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import Pool from '../../Project/Pool';
// import Grid from '@material-ui/core/Grid';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

// const styles = theme => ({
//     root: {
//         padding: '0px 30px 0px 10px',
//     },
//     top: {
//         backgroundColor: theme.palette.background.default,
//     }
// })

// class ActiveTasks extends Component {

//     constructor(props){
//         super(props)

//         this.state = {
//             expanded: null
//         }
//     }

//     handleChange = panel => (event, expanded) => {
//         this.setState({
//           expanded: expanded ? panel : false,
//         });
//       };


//     render(){
//     const { expanded } = this.state;
//     const { classes } = this.props

//     return(
//     <div>
//         <List
//             subheader={<li />}
//             // style={{
//             //     width: '100%',
//             //     maxWidth: '100%',
//             //     position: 'relative',
//             //     overflow: 'auto',
//             //     maxHeight: 300,
//             // }}

//         >
//             {this.props.tasks.map((sprint, i) => (
//                 <li key={i}>
//                     <ListSubheader classes={{root: classes.top}}>{sprint.sprint}</ListSubheader>
//                     {sprint.tasks.map((task, index) => {
//                         console.log(task.sprintId)
//                         return(
//                         <ul>
//                         <ListItem key={index} classes={{root: classes.root}}>
//                             {/* <Grid container> */}
//                             {/* <Grid item xs> */}
//                             <Pool
//                                 tasks={task}
//                                 activetasks={true}
//                                 goToProject={() => this.props.goToProject(task.sprintId)}
//                                 homepage={this.props.homepage}
//                                 id={task.id}
//                                 expanded={expanded === `panel${task.id}`} 
//                                 onChange={this.handleChange(`panel${task.id}`)}
//                             />
//                             {/* </Grid> */}
//                             {/* </Grid> */}
//                         </ListItem>
//                         </ul>
//                     )})
//                 }

//                 </li>
//             ))}
//         </List>
//         {/* <h3>Active Tasks Pane</h3>
//         {this.state.tasks.map((task, i) => (
//             <TaskCard key={i} title={task.name} summary={task.description} dueDate={task.due_date} difficulty={task.difficulty}/>
//         ))} */}
//     </div>
//     )}}

//     ActiveTasks.propTypes = {
//         classes: PropTypes.object.isRequired,
//       };

// export default withStyles(styles)(ActiveTasks);


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { SSL_OP_MSIE_SSLV2_RSA_PADDING } from 'constants';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    top: {
        backgroundColor: theme.palette.background.default,
    }
});

class ActiveTasks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: null
        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    render() {
        const { expanded } = this.state;
        const { classes } = this.props

        return (
            <List className={classes.root} subheader={<li />}>
                {this.props.tasks.map((sprint, i) => (
                    <li key={i} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader className={classes.top}>{sprint.sprint}</ListSubheader>
                            {sprint.tasks.map((task, index) => (
                                <ListItem key={index}>
                                    <Pool
                                        tasks={task}
                                        activetasks={true}
                                        goToProject={() => this.props.goToProject(task.sprintId)}
                                        homepage={this.props.homepage}
                                        id={task.id}
                                        expanded={expanded === `panel${task.id}`}
                                        onChange={this.handleChange(`panel${task.id}`)}
                                    />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        );
    }
}

ActiveTasks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActiveTasks);