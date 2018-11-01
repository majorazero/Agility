import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Axios from 'axios';

const styles = theme => ({
    card: {
        maxWidth: 300,
    },
    media: {
        height: 75,
        paddingBottom: "60%",
        backgroundSize: 'cover',
        backgroundPosition: "center center"
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});


class RecipeReviewCard extends React.Component {
    state = {
        expanded: false,
        userFirstName: "",
        userLastName: "",
        userEmail: ""
    };

    componentDidMount() {
        Axios.post("/api/getuser",
            {
                id: sessionStorage.getItem("id"),
                token: localStorage.getItem("token")
            }).then((response) => {
                this.setState(
                    {
                        userFirstName: response.data[0].first_name,
                        userLastName: response.data[0].last_name,
                        userEmail: response.data[0].email
                    }
                )
            })
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/assets/images/profileimg.jpg"
                    title=""
                />

                <CardContent>
                    <Typography component="p">
                        {this.state.userFirstName + " " + this.state.userLastName}
                    </Typography>
                    <Typography component="p">
                        {this.state.userEmail}
                    </Typography>
                    <Typography component="p">
                        Progress
          </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
