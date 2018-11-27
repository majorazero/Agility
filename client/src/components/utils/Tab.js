import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';

function TabContainer(props) {
    return (
        <Typography
            component="div"
            style={{
                padding: 8 * 3,
                position: 'relative'
            }}
        >
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 25,
        overflow: 'auto'
    },
});

class SimpleTabs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <Paper className={classes.root}>
          <div style={{paddingTop: 10, position: 'sticky', top: 0, backgroundColor: '#424242', zIndex: 10}}>
                <ListItem
                    style={{margin: '10px 0 10px 0', display:'flex', flexDirection:'row', justifyContent:'space-between', paddingBottom:20}}>
                    <Typography variant="h4" gutterBottom color='default'>{this.props.projectName}</Typography>
                    <span>{this.props.inviteCode}</span></ListItem>
                {this.props.sprintProgress}{this.props.sprintTime}
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                >
                    <Tab label={this.props.isActive ? 'Open Tasks' : 'Incomplete Tasks'} onClick={()=>{this.props.getTasks()}}/>
                    <Tab label="In Progress" onClick={()=>{this.props.getTasks()}}/>
                    <Tab label='Complete' onClick={()=>{this.props.getTasks()}}/>
                    <Tab label='Summary' onClick={()=>{this.props.getTasks()}}/>
                </Tabs>
          </div>
                {value === 0 && <TabContainer>{this.props.taskPool}</TabContainer>}
                {value === 1 && <TabContainer>{this.props.userPool}</TabContainer>}
                {value === 2 && <TabContainer>{this.props.completedTab}</TabContainer>}
                {value === 3 && <TabContainer>{this.props.summaryTab}</TabContainer>}
            </Paper>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
