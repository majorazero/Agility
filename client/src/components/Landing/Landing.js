import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import ContainedButtons from "../utils/Button.js"
import Image from '../../assets/images/background.jpg';





class Landing extends Component {

  componentWillMount() {
    //obviously we'll have to be updated once i get the database going.
    console.log(sessionStorage.getItem("id"),localStorage.getItem("token"));
    //if sessionStorage doesn't exist
    if (sessionStorage.getItem("id") === null) {
      console.log("no session storage!");
      //we check if token exist, it does
      if (localStorage.getItem("token") !== null) {
        console.log("checking database if token exists");
        axios.post("/api/tokenLogin",{
          token: localStorage.getItem("token")
        }).then((response) => {
          console.log(response);
          sessionStorage.setItem("id",response.data.id);
          window.location.assign("/homepage");
        });
        //if it does we'll log the user in.
        //window.location.assign("/homepage");
      }
      //if no token exists, they have to login.
    }
    else{
      //you have a session you're logged in
      console.log("Welcome back!");
      window.location.assign("/homepage");
    }
  }

  render() {

    return (
      <div>
        <div>
          <Grid container justify="center" style={{ backgroundImage: `url(${Image})`, resizeMode: 'cover', height: "660px" }}>

            <h1>This is a landing page.</h1>

            <p>
              lorem ipsum dolor sit amet, quo molestie reprimique te. Ea per tota erant consequuntur, quodsi oportere ut mea. At vero convenire vel, ei est laoreet singulis, nominati abhorreant delicatissimi eos an. Officiis adipisci sed ei. In utamur intellegam est, purto assueverit eu nam, no quas etiam disputationi duo.
          <br />
              <br />
              Sea maiorum urbanitas adipiscing no, doctus labitur mandamus quo cu. Quo ei virtute deleniti prodesset, dolores necessitatibus id vis, id per officiis repudiandae. Sea dignissim voluptatibus eu. No pri iudico aliquid facilisi.
          <br />
              <br />
              Vix legere quaestio eu, usu dicit fastidii an, sed an dicant consequuntur. Ad ius persius blandit. An pro nulla tollit honestatis, in per ceteros definitionem, cu has wisi audiam constituam. Facilis conclusionemque eam eu, sit mutat quando tempor et.
          <br />
              <br />
              Tale putent ne pro, rebum sonet nostro id sit. Has ut labores feugait elaboraret, ei graeco iriure fuisset duo. No sed facete possim omnium, ut dico purto qui. Vim et doming molestiae, duo ei nonumy accumsan.
          <br />
              <br />
              Vim no facer ancillae petentium, convenire laboramus ad pro. Ut perfecto deterruisset per. Elitr quidam te duo. Dissentiet appellantur ea mel, vocent facilisi definiebas vix in. Blandit percipit sed no, vel oblique sapientem abhorreant ad.
        </p>
            <ContainedButtons
              component={Link}
              to="/login"
              name="Login"
              color="primary"

            />
            <ContainedButtons
              component={Link}
              to="/signup"
              name="Sign Up"
              color="secondary"
            />
          </Grid>
        </div>
        <div>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <p>
              lorem ipsum dolor sit amet, quo molestie reprimique te. Ea per tota erant consequuntur, quodsi oportere ut mea. At vero convenire vel, ei est laoreet singulis, nominati abhorreant delicatissimi eos an. Officiis adipisci sed ei. In utamur intellegam est, purto assueverit eu nam, no quas etiam disputationi duo.
          <br />
              <br />
              Sea maiorum urbanitas adipiscing no, doctus labitur mandamus quo cu. Quo ei virtute deleniti prodesset, dolores necessitatibus id vis, id per officiis repudiandae. Sea dignissim voluptatibus eu. No pri iudico aliquid facilisi.
          <br />
              <br />
              Vix legere quaestio eu, usu dicit fastidii an, sed an dicant consequuntur. Ad ius persius blandit. An pro nulla tollit honestatis, in per ceteros definitionem, cu has wisi audiam constituam. Facilis conclusionemque eam eu, sit mutat quando tempor et.
          <br />
              <br />
              Tale putent ne pro, rebum sonet nostro id sit. Has ut labores feugait elaboraret, ei graeco iriure fuisset duo. No sed facete possim omnium, ut dico purto qui. Vim et doming molestiae, duo ei nonumy accumsan.
          <br />
              <br />
              Vim no facer ancillae petentium, convenire laboramus ad pro. Ut perfecto deterruisset per. Elitr quidam te duo. Dissentiet appellantur ea mel, vocent facilisi definiebas vix in. Blandit percipit sed no, vel oblique sapientem abhorreant ad.
        </p>
          </Grid>
        </div>
      </div>
    );
  }
}


export default Landing;
