import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 275,
    height: "100%"
  },
  media: {
    height: 140,
    paddingBottom: "60%",
    backgroundSize: 'cover',
    backgroundPosition: "center center"
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card onClick = {props.onClick} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.maker.image}
          title={props.maker.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.maker.name}
          </Typography>
          <Typography component="p">
            {props.maker.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
