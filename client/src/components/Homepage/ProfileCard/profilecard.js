import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ProfileAvatar from '../../utils/ProfileAvatar'

const styles = theme => ({
  card: {
    width: '100%',
    height: '60%'
  },
  media: {
    height: '60%',
    backgroundSize: 'cover',
    backgroundPosition: "center center",
    margin: 10
  },
  actions: {
    display: 'flex',
    paddingLeft: 24,
    paddingRight: 24
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        padding: "8px 12px"
      },
    },
  },
});

class RecipeReviewCard extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
        >
          <ProfileAvatar />
        </CardMedia>
        <MuiThemeProvider theme={theme}>
          <CardContent>
            <Typography variant="h6" gutterBottom style={{ textAlign: "left", color: 'whitesmoke' }}>
              {this.props.userFirstName + " " + this.props.userLastName}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ textAlign: "left", color: 'whitesmoke' }}>
              {this.props.userEmail}
            </Typography>
          </CardContent>
        </MuiThemeProvider>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
