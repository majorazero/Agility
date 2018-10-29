import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      marginTop: 5,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 24,
    },
    pos: {
      marginBottom: 12,
    },
  };


function TaskCard(props){
    // const { classes } = props;
    const bull = <span className={styles.bullet}>•</span>;
        return(
            <Card style={styles.card}>
                <CardContent>
                    <Typography variant="h6">
                        {props.title}
                    </Typography>
                    <Typography variant='body2'>
                        Complexity: {props.difficulty} {bull} Due: {props.dueDate} 
                    </Typography>
                    <Typography variant='subtitle1'>
                        {props.summary}
                    </Typography>
                </CardContent>
            </Card>
        )
};

export default TaskCard;