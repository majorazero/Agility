import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../ProjectList/ProjectList.js";
import axios from "axios";
import ProfileCard from "./ProfileCard/profilecard.js";
import ActiveTasks from "./ActiveTasks/activetasks";
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from "../utils/Navbar/Navbar.js";
import Paper from '@material-ui/core/Paper';
import ButtonSizes from "../utils/FAB.js";
import SimpleBottomNavigation from "../utils/Footer/Footer.js";

//doesn't has to be

class Homepage extends Component {

  constructor(props){

    super(props);

    this.state ={
    userId: 0,
    tasks: [],
    sprints: []
    }
  }

  componentDidMount = () => {
    if (sessionStorage.getItem("id") === null) {
      console.log("You're not logged in!");
      //we might want to change this to a 404
      window.location.assign("/");
    }
    this.getCurrentUserId();
  }

  getCurrentUserId = () => {
    axios.post("/api/decrypt", {
        id: sessionStorage.getItem("id"),
        token: localStorage.getItem("token")
    }).then(res => {
        console.log(res.data)
        this.setState({ userId: res.data }, ()=>{
          this.getTasks(this.state.userId)
        })
    })
  }

  getTasks = (currentUserId) => {
    axios.get(`/api/sprints/tasks/user/${currentUserId}`)
    .then(res => {
      let incomplete = res.data.filter(task => !task.isCompleted)

        let data = []
        incomplete.forEach(task => {
            if(!(data.includes(task.sprint))){
                data.push({
                    sprint: task.sprint,
                    tasks: [task]
                })
            } else{
                data[task.sprint].tasks.push(task)
            }
        })
      this.setState({tasks: data})
    })
  }

  render() {
    return (
      <div>
        <ButtonAppBar />
        <div
          className="parallax"
          style={{
            paddingTop: "50px",

            // possible?
            backgroundImage: `url("/assets/images/background.png")`,
            resizeMode: 'cover',
            height: "100%"
          }} >
          <Grid
            container
            spacing={8}
            style={{ padding: "50px" }}
          >
            <Grid item xs={8}>
              <Paper
                style={{ height: "100%" }}
              >
                <ActiveTasks tasks={this.state.tasks} />
              </Paper>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <ProfileCard />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={8}
            style={{ padding: "50px" }}
          >
            <Grid item xs={12}>
              <Paper
              // style={{ height: 100 }}
              >
                <ProjectList />
              </Paper>
            </Grid>
          </Grid>

          {/* <Grid container spacing={8} style={{ marginTop: 100 }}>
          <Grid container item xs={12} style={{ marginLeft: 100 }}>
            <Grid item xs={4} style={{ maxHeight: 375, overflow: "auto", marginLeft: 35, marginRight: 140 }}>
              <ActiveTasks />
            </Grid>
            <Grid item xs={4} style={{ justifyContent: "left" }}>
              <ProfileCard />
            </Grid>
          </Grid>
          <Grid container style={{ justifyContent: 'center' }}>
            <Grid item xs={10} >
              <ProjectList />
            </Grid>
          </Grid>
        </Grid> */}
        <SimpleBottomNavigation />
        </div >
        {/* <div style={{position:"inherit"}}>
        <SimpleBottomNavigation />
        </div> */}
      </div>
    );
  }
}


export default Homepage;
