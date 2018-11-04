import React from "react";
import SimpleExpansionPanel from "../utils/TaskPool.js";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

const Pool = (props) => {
    const { classes } = props;
    console.log(props);
    return (
        <ListItem
            style={{
                paddingTop: 5,
                paddingBottom: 5,
                display: "table-caption",
                width: "100%"
            }}
        >
            <SimpleExpansionPanel
                currentUser={props.currentUser}
                assignedUser={props.assignedUser}
                name={props.tasks.name}
                key={props.id}
                isAdmin={props.isAdmin}
                description={props.tasks.description}
                due={props.tasks.due_date}
                summary={props.tasks.description}
                difficulty={props.tasks.difficulty}
                onClickDelete={props.onClickDelete}
                onClickAdd={props.onClickAdd}
                unAssign={props.unAssign}
                assigned={props.assigned}
                onClickComplete={props.onClickComplete}
                onClickReopen={props.onClickReopen}
                complete={props.complete}
            />
        </ListItem>
    );
};

export default Pool;
