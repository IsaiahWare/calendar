import React from 'react';
import {connect} from 'react-redux';
import {setAuthAction} from '../../redux/actions/setAuthAction';

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.state = {
            name: "",
            userID: this.props.authReducer.id,
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: ""
        }
    }

    handleAddEvent(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/add_event', {
            method: 'post',
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(res => {
            if (res.auth === true) {
                this.props.close();
                console.log("event added")
            } else {
                console.log("event add failed")
            }
        })
        .catch(err => console.log(err));
    }

    handleChange(event) {
        switch(event.target.name) {
            case 'name':
                this.setState({
                    name: event.target.value
                })
                break;
            case 'startDate':
                this.setState({
                    startDate: event.target.value
                })
                break;
            case 'endDate':
                this.setState({
                    endDate: event.target.value
                })
                break;
            case 'startTime':
                this.setState({
                    startTime: event.target.value
                })
                break;
            case 'endTime':
                this.setState({
                    endTime: event.target.value
                })
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        console.log("asd: " + JSON.stringify(this.props.authReducer.id))
    }

    render() {
        return (
            <form onSubmit={this.handleAddEvent}>
                <input onChange={this.handleChange} type="text" name="name" placeholder="Event title" required/>
                <input onChange={this.handleChange} type="date" name="startDate" placeholder="start date" required/>
                <input onChange={this.handleChange} type="date" name="endDate" placeholder="end date" required/>
                <input onChange={this.handleChange} type="time" name="startTime" placeholder="start time" required/>
                <input onChange={this.handleChange} type="time" name="endTime" placeholder="end time" required/>
                
                <input type="submit" value="submit"/>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setAuthAction: (obj) => dispatch(setAuthAction(obj)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);