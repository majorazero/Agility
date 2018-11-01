import React, {Component} from 'react';
import { Link } from "react-router-dom";
import ContainedButtons from "../../utils/Button.js";



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
            backgroundImage: `url("/assets/images/404.png")`,
            maxHeight: "100%",
            height: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize:"cover",
            backgroundColor: "rgb(6, 5, 5,9.5)",
            zIndex: 5,
            display: "flex",
            overflow: "hidden"
        }}>
        <div style={{
            margin: "500px",
            zIndex: 10,
        }}>
          <ContainedButtons
            component={Link}
            to="/"
            name={this.state.message}
            color="secondary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </div>
      </div>
    );
  }
}


export default notFound;
