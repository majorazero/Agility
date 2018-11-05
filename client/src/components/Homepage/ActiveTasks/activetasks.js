import React, { Component } from 'react';
import axios from 'axios';
// import Modal from '@material-ui/core/Modal';
import TaskCard from "../../utils/TaskCard/TaskCard"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Pool from '../../Project/Pool';
import Grid from '@material-ui/core/Grid';


const ActiveTasks = (props) => (
    <div>
        <List
            subheader={<li />}
            style={{
                width: '100%',
                maxWidth: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
            }}
        >
            {props.tasks.map((sprint, i) => (
                <li key={i}>
                    <ListSubheader style={{ backgroundColor: 'whitesmoke' }}>{sprint.sprint}</ListSubheader>
                    {sprint.tasks.map((task, index) => {
                        console.log(sprint)
                        console.log(task.sprintId)
                        return(
                        <ul>
                        <ListItem key={index}>
                            {/* <Grid container> */}
                            {/* <Grid item xs> */}
                            <Pool
                                tasks={task}
                                activetasks={true}
                                goToProject={() => props.goToProject(task.sprintId)}
                                homepage={props.homepage}
                            />
                            {/* </Grid> */}
                            {/* </Grid> */}
                        </ListItem>
                        </ul>
                    )})
                }

                </li>
            ))}
        </List>
        {/* <h3>Active Tasks Pane</h3>
        {this.state.tasks.map((task, i) => (
            <TaskCard key={i} title={task.name} summary={task.description} dueDate={task.due_date} difficulty={task.difficulty}/>
        ))} */}
    </div>
)
export default ActiveTasks;
