import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ContainedButtons from "../../utils/Button.js";
import Paper from '@material-ui/core/Paper';
import "./404.css";

class notFound extends Component{

  state = {
    message: "Take me home!"
  }

  componentDidMount = () => {
    setTimeout(()=>{
      this.setState({message:"Time to go!"});
    },5000);
    setTimeout(()=>{
      this.props.history.push("/");
    },5500);
  }

  render(){
    return (
        <div style={{
            backgroundImage: `url("/assets/images/404.jpg")`,
            maxHeight: "100%",
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize:"cover",
            zIndex: 5,
            display: "flex",
            overflow: "hidden"
        }}>
        <div style={{
            margin: "250px",
            zIndex: 10,
        }}>
          <Paper style={{backgroundColor:"rgba(0, 0, 0, 0.1)", color:"white", padding: "40px"}}>
            <div className="main">404</div>
            <div id="helperMsg">Looks like you wandered to the wrong work space. Give us a moment to find where you should be. </div>

{/*            <ContainedButtons
              size="large"
              component={Link}
              to="/"
              name={this.state.message}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />*/}
          </Paper>

        </div>
      </div>
    );
  }
}


export default notFound;
