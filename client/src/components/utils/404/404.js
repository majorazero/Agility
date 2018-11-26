import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

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
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Paper
        style={{
          height: 'fit-content',
          width: 450,
          padding: 25,
          opacity: .9,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
        >
          <Typography variant='h2' gutterBottom>404</Typography>
          <Typography variant='h6' gutterBottom>Looks like you wandered to the wrong work space. Give us a moment to find where you should be.</Typography>
        </Paper>
    </div>
    );
  }
}


export default notFound;
