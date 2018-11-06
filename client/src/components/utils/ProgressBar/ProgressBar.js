import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "axios";
import moment from "moment";

const styles = {
    root: {
        flexGrow: 1,
    },
};

class LinearDeterminate extends React.Component {

    constructor(props) {
        super(props)
    }
    // state = {
    //     completed: 0,
    //     sprintId: ""
    // };

    // componentDidMount() {
    //     this.setState({
    //         complete: this.props.complete
    //     })
    // }

    // componentDidMount() {
    //     this.setState({ sprintId: this.props.sprintId }, () => {
    //         // axios.get("/api/sprintById/" + this.state.sprintId).then((res) => {
    //         //     console.log(res)
    //         //     let startDate = res.data[0].start_date;
    //         //     let endDate = res.data[0].end_date;
    //         //     var momentStart = moment(startDate).valueOf()
    //         //     var momentEnd = moment(endDate).valueOf()
    //         //     var difference = momentEnd - momentStart
    //         //     var currentTime = moment(Date.now()).valueOf()
    //         //     console.log(currentTime)

    //         //     var timeHasPassed =  currentTime - momentStart;

    //         //     var timeLeft = timeHasPassed - currentTime;

    //         //     this.setState({timeHasPassed})
    //         //     this.setState({timeLeft})


    //         //     console.log(timeHasPassed)
    //         //     console.log(timeLeft)


    //         // difference
    //         this.setState({}, () => {
    //             this.timer = setInterval(this.progress, 500);
    //         })
    //         // })
    //     })
    // }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        // const { completed } = this.state;
        var completed = this.props.completed
        if (completed === 100) {
            // this.setState({ completed: 0 });
        } else {
            const diff = Math.random() * 10;
            this.setState({ completed: Math.min(completed + diff, 100) });
        }
    };

    render() {
        const { classes } = this.props;
        var whatBar = this.props.whatBar
        return (
            <div className={classes.root}>
                <h3 style={{ textAlign: "center", color:"white" }}>{this.props.title}</h3>
                <LinearProgress color={(whatBar) ? "primary" : "secondary"} variant="determinate" value={this.props.completed} />
                
            </div>
        );
    }
}

LinearDeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
