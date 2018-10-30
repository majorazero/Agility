import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import ContainedButtons from "../utils/Button.js";
//import Image from "/assets/images/profileimg.png";

class Landing extends Component {
  render() {
    return (
      <div style={{paddingTop: "50px"}}>
        <Grid container>
          <Grid item xs={12}  style={{ padding: "10px" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={24}
              style={{ backgroundImage: `url("/assets/images/background.jpg")`, resizeMode: 'cover', height: "660px", padding: "10px" }}
            >

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
                to="/register"
                name="Sign Up"
                color="secondary"
              />
            </Grid>
          </Grid>
          <Grid item alignItems="center" xs={12}  style={{ padding: "10px" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              style={{ padding: "10px" }}
              spacing={24}
            >
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
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default Landing;
