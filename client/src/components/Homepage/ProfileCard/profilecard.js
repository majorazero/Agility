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
import axios from 'axios';
import TextMobileStepper from "../../utils/Stepper.js";

const styles = theme => ({
    card: {
        width: 300,
    },
    media: {
        height: 40,
        paddingBottom: "40%",
        backgroundSize: 'cover',
        backgroundPosition: "center center",
        margin: 5
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
        userEmail: "",
        totalTask: "",
        totalCompletedTask: "",
        sprintParticipate: "",
        projectContributed: "",
        projectCreated: "",
        complexity: "",
        complexitySemantics: ""
    };

    componentDidMount() {
      axios.post("/api/getuser",
        {
          id: sessionStorage.getItem("id"),
          token: localStorage.getItem("token")
        }).then((response) => {
          console.log(response.data);
          this.setState(
            {
              userFirstName: response.data.prof.first_name,
              userLastName: response.data.prof.last_name,
              userEmail: response.data.prof.email,
              totalTask: response.data.totalTask,
              totalCompletedTask: response.data.totalCompletedTask,
              sprintParticipate: response.data.sprintParticipate,
              projectContributed: response.data.projectContributed,
              projectCreated:
              response.data.projectCreated,
              complexity:
              response.data.complexity,
              complexitySemantics:
              response.data.compSemantics
            }
          );
        });
    }
    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card} style={{width: "100%"}}>
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
                    <Typography component="h2">
                      Career
                    </Typography>
                    <Typography>
                      {(this.state.totalTask === 0) ? "Start working on something!":
                        `${this.state.totalCompletedTask/this.state.totalTask*100}%`
                      }
                    </Typography>
                    <Typography>
                      Total Tasks Completed: {this.state.totalCompletedTask}
                    </Typography>
                    <Typography>
                      Total Tasks Taken: {this.state.totalTask}
                    </Typography>
                    <Typography>
                      Average Task Complexity: {this.state.complexity} ({this.state.complexitySemantics})
                    </Typography>
                    <Typography>
                      Total Sprints Participated: {this.state.sprintParticipate}
                    </Typography>
                    <Typography>
                      Total Projects Contributed:  {this.state.projectContributed}
                    </Typography>
                    <Typography>
                      Total Projects Created:  {this.state.projectCreated}
                    </Typography>
                    <br />
                    {/* <Typography component="p">
                        Progress
          </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
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
                    <CardContent> */}
                        <TextMobileStepper />
                    </CardContent>
                {/* </Collapse> */}
            </Card>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
