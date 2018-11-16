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
import Paper from '@material-ui/core/Paper';
import TextMobileStepper from "../../utils/Stepper.js";
import { MobileStepper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Progress from "../../utils/ProgressBar/ProgressBar.js";


const styles = theme => ({
    card: {
        width: "100%"
        // background: 'whitesmoke'
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
        },
        // position: 'absolute'
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
                response.data.compSemantics,
            stacks: response.data.stacks
          }
        );
      });
    }

    stackFormat = () => {
      let arr = [];
      if(this.state.stacks !== undefined){
        let stack = JSON.parse(JSON.stringify(this.state.stacks));
        let format = {
          label1: "Start working on some projects! No stack metrics yet!"
        };
        if(Object.keys(stack).length > 0){
          for(let j = 0; j < 3; j++){
            let Obj = {};
            let maxComplete = -1;
            let topStack = "";
            let stackName = "";
            for(let i in stack){
              if(stack[i].amountComplete > maxComplete){
                maxComplete = stack[i].amountComplete;
                topStack = stack[i];
                stackName = i;
              }
            }
            Obj[`stackName`] = stackName;
            Obj[`stackComplete`] = `Average Rate of Completion: ${(topStack.amountComplete/topStack.amountAttempted*100).toFixed(2)}%`;
            if(topStack.amountComplete > 0){
              Obj[`stackComplex`] = `Average Complexity: ${(topStack.complexitySum/topStack.amountComplete).toFixed(2)}`;
            }
            else {
              Obj[`stackComplex`] = `Average Complexity: 0`;
            }
            arr.push(Obj);
            stack[stackName] = "";
          }
          console.log(arr);
          let format = {
            label1: "TOP STACKS:",
            info1: ""
          };
          for(let i = 0; i < 3; i++){
            format[`label${i+2}`] = arr[i].stackName;
            format[`info${i+2}`] = `${arr[i].stackComplete} ${arr[i].stackComplex}`;
          }
          return format;
        }
        return format;
      }
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
        },
        this.stackFormat()
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
                        <Typography variant="h6" gutterBottom style={{ textAlign: "left" }}>
                            {this.state.userFirstName + " " + this.state.userLastName}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom style={{ textAlign: "left" }}>
                            {this.state.userEmail}
                        </Typography>
                        {/* <br /> */}
                        {/* <Typography variant="h6" gutterBottom>
                            Career
                    </Typography> */}
                        {/* <Typography variant="subtitle1" gutterBottom>
                        <br />
                        <Typography variant="h6" gutterBottom>
                            Career History
                    </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {(this.state.totalTask === 0) ? "Start working on something!" :
                                `${this.state.totalCompletedTask / this.state.totalTask * 100}%`
                            }
                        </Typography> */}
                        {/* <br /> */}
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

                <CardActions className={classes.actions} disableActionSpacing>
                    <Typography variant="subtitle1" gutterBottom style={{ textAlign: "left" }}>
                        Career History
                    </Typography>
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
                      <div style={{textAlign: "center", padding: "0 5px 0 5px" }}>
                        <Progress completed={(this.state.totalCompletedTask/this.state.totalTask*100)}/>
                        <Typography variant="subtitle2" gutterBottom>Task Completion Rate ({(this.state.totalCompletedTask/this.state.totalTask*100).toFixed(2)}%)</Typography>
                      </div>
                        <TextMobileStepper
                            tutorialSteps={this.makeArray()}
                        />
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
