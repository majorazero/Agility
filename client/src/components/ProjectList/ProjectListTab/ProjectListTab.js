import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    cursor: 'pointer',
    color: 'whitesmoke',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.7) 100%)'
  },
  title: {
    color: 'whitesmoke',
    margin: 5,
  },
});

function SingleLineGridList(props) {
  const { classes } = props;
  return (
    <div alt={props.name}>
      <List style={{ padding: 0, margin: 5 }}>
        <ListItem classes={{ root: classes.root }} hover>

          <ListItemText
            focusVisible
            button
            classes={{ title: classes.title }}
            aria-label="Choose Project"
            onClick={props.onProjectPress}
            primary={props.name}
            secondary={props.summary}
          />

          <Icon>how_to_vote</Icon>
        </ListItem>
      </List>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
