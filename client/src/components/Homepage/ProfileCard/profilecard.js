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
import { MobileStepper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles = theme => ({
    card: {
        width: "100%",
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
    }
});

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                paddingBottom: 0
            },
        },
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

    makeArray = () => {
        var tutorialSteps = [
            {
                label1: 'Total Tasks Completed: ',
                info1: this.state.totalCompletedTask,
                label2: 'Total Tasks Taken: ',
                info2: this.state.totalTask,
                label3: 'Average Task Complexity: ',
                info3: `${this.state.complexity} (${this.state.complexitySemantics})`
            },
            {
                label1: 'Total Sprints Participated: ',
                info1: this.state.sprintParticipate,
                label2: 'Total Projects Contributed: ',
                info2: this.state.projectContributed,
                label3: 'Total Projects Created: ',
                info3: this.state.projectCreated
            }
        ];
        return (
            tutorialSteps
        );
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

                <MuiThemeProvider theme={theme}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {this.state.userFirstName + " " + this.state.userLastName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.state.userEmail}
                        </Typography>
                        <br />
                        <Typography variant="h6" gutterBottom>
                            Career History
                    </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {(this.state.totalTask === 0) ? "Start working on something!" :
                                `${this.state.totalCompletedTask / this.state.totalTask * 100}%`
                            }
                        </Typography>
                        <br />
                        {/* <Typography

                    />
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
                    </Typography> */}
                        {/* <Typography component="p">
                        Progress
          </Typography> */}
                    </CardContent>
                </MuiThemeProvider>

                {/* <CardActions className={classes.actions} disableActionSpacing>
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
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit> */}
                <CardContent>
                    <TextMobileStepper
                        tutorialSteps={this.makeArray()}
                    />
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
