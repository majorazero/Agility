import React, { Component } from "react";
import ProjectList from "../ProjectList/ProjectList.js";
import axios from "axios";
import ProfileCard from "./ProfileCard/profilecard.js";
import ActiveTasks from "./ActiveTasks/activetasks";
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from "../utils/Navbar/Navbar.js";
import TextMobileStepper from './../utils/Stepper.js';
import Tab from './../utils/Tab2.js';

class Homepage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      tasks: [],
      sprints: [],
      expanded: false,
      totalTask: "",
      totalCompletedTask: "",
      sprintParticipate: "",
      projectContributed: "",
      projectCreated: "",
      complexity: "",
      complexitySemantics: "",
      inviteCode: "",
      showsnack: false,
      snackmessage: '',
      projects: [],
      currentUser: "",
      loaded: false,
      summaryLoaded: false,
      projectLoaded: false,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      initial: "",
      name: "",
      summary: "",
      open: false
    }
  }

  componentDidMount = () => {
    if (sessionStorage.getItem("id") === null) {
      //we might want to change this to a 404
      window.location.assign("/");
    }
    this.getCurrentUserId();

    axios.post("/api/getuser",
      {
        id: sessionStorage.getItem("id"),
        token: localStorage.getItem("token")
      }).then((response) => {
        this.setState(
          {
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
            stacks: response.data.stacks,
            userFirstName: response.data.prof.first_name,
            userLastName: response.data.prof.last_name,
            userEmail: response.data.prof.email,
            initial: `${response.data.prof.first_name.charAt(0)}${response.data.prof.last_name.charAt(0)}`,
            summaryLoaded: true
          }
        );
      }).then(() => {
        console.log(this.state);
        this.fetch();
      });
  }

  fetch = () => {
    axios.post("/api/projectOfUser", {
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then((response) => {
      this.setState({
        projects: response.data.projects,
        currentUser: response.data.currentUser,
        projectLoaded: true
      });
    });
  }

  getCurrentUserId = () => {
    axios.post("/api/decrypt", {
      id: sessionStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then(res => {
      this.setState({ userId: res.data }, () => {
        this.getTasks(this.state.userId)
      })
    })
  }

  getTasks = (currentUserId) => {
    axios.get(`/api/sprints/tasks/user/${currentUserId}`)
      .then(res => {
        let incomplete = res.data.filter(task => !task.isCompleted)
        let today = new Date();
        let active = incomplete.filter(task => (new Date(`${task.end_date}T23:59:59`) >= today) && (new Date(`${task.start_date}T00:00:00`) <= today))
        let data = []
        let sprints = []

        active.forEach(task => {
          if (!(sprints.includes(task.sprintId))) {
            sprints.push(task.sprintId)
            data.push({
              sprint: task.sprint,
              tasks: [task]
            })
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].sprint === task.sprint) {
                data[i].tasks.push(task)
              }
            }
          }
        })
        this.setState({ tasks: data, loaded: true })
      }
      )
  }

  goToProject = (sprintId) => {
    axios.get(`/api/projectId/sprint/${sprintId}`)
      .then(res => {
        axios.post("/api/encrypt", {
          token: "project",
          id: res.data[0].id.toString()
        }).then((data) => {
          window.location.assign(`/project/${data.data}`);
        });
      }
      )
  }

  stackFormat = () => {
    let arr = [];
    if (this.state.stacks !== undefined) {
      let stack = JSON.parse(JSON.stringify(this.state.stacks));
      let format = {
        label1: "Start working on some projects! No stack metrics yet!"
      };
      if (Object.keys(stack).length > 0) {
        for (let j = 0; j < 3; j++) {
          let Obj = {};
          let maxComplete = -1;
          let topStack = "";
          let stackName = "";
          for (let i in stack) {
            if (stack[i].amountComplete > maxComplete) {
              maxComplete = stack[i].amountComplete;
              topStack = stack[i];
              stackName = i;
            }
          }
          Obj[`stackName`] = stackName;
          Obj[`stackComplete`] = `Average Rate of Completion: ${(topStack.amountComplete / topStack.amountAttempted * 100).toFixed(2)}%`;
          if (topStack.amountComplete > 0) {
            Obj[`stackComplex`] = `Average Complexity: ${(topStack.complexitySum / topStack.amountComplete).toFixed(2)}`;
          }
          else {
            Obj[`stackComplex`] = `Average Complexity: 0`;
          }
          arr.push(Obj);
          stack[stackName] = "";
        }
        let format = {
          label1: "TOP STACKS:",
          info1: ""
        };
        for (let i = 0; i < 3; i++) {
          format[`label${i + 2}`] = arr[i].stackName;
          format[`info${i + 2}`] = `${arr[i].stackComplete} ${arr[i].stackComplex}`;
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

  handleInviteChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    if(this.state.name === ""){
      this.setState({showsnack: true, snackmessage: "Have to enter a project name!"});
      setTimeout(() => { this.setState({showsnack: false }) }, 3000);
    }
    else if (this.state.summary === ""){
      this.setState({showsnack: true, snackmessage: "Have to enter a description!"});
      setTimeout(() => { this.setState({showsnack: false }) }, 3000);
    }
    else {
      axios.post("/api/project", {
        name: this.state.name,
        summary: this.state.summary,
        id: sessionStorage.getItem("id"),
        token: localStorage.getItem("token")
      }).then((response) => {
        this.fetch();
        this.handleClose();
      });
    }
  }


  handleInviteSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/sprintMembershipWithCode", { sId: this.state.inviteCode, uId: sessionStorage.getItem("id"), token: localStorage.getItem("token") }).then((response) => {
      if (response.data === "Already part of sprint!") {
        this.setState({ showsnack: true, snackmessage: response.data });
        setTimeout(() => { this.setState({ showsnack: false }) }, 3000);
      }
      else {
        this.fetch();
      }
    }).catch(()=>{
      this.setState({ showsnack: true, snackmessage: 'Invalid invite code!' });
      setTimeout(() => { this.setState({ showsnack: false }) }, 3000);
    });
  }

  render() {
    return (
      <div>
        <ButtonAppBar />
        <div
          className="parallax"
          style={{
            display: 'flex',
            flexGrow: 1,
            backgroundColor: 'dimgray',
            paddingTop: 75,
            resizeMode: 'cover',
            height: "-webkit-fill-available"
          }} >

          <Grid item xs={3} style={{ margin: 25 }}>
            <ProfileCard
              userFirstName={this.state.userFirstName}
              userLastName={this.state.userLastName}
              userEmail={this.state.userEmail}
              initial={this.state.initial}
            />
          </Grid>
          <Tab
            activeTasks={<ActiveTasks
              loaded={this.state.loaded}
              tasks={this.state.tasks} goToProject={this.goToProject} homepage />}
            projectList={this.state.projectLoaded ?
              <ProjectList
                fetch={()=>{this.fetch()}}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                open={this.state.open}
                projects={this.state.projects}
                currentUser={this.state.currentUser}
                showsnack={this.state.showsnack}
                snackmessage={this.state.snackmessage}
                handleInviteSubmit={this.handleInviteSubmit}
                handleInviteChange={this.handleInviteChange}
              /> : ""
            }
            userSummary={this.state.summaryLoaded ? <TextMobileStepper
              tutorialSteps={this.makeArray()}
            /> : ""}
          />
        </div >
      </div >
    );
  }
}


export default Homepage;
