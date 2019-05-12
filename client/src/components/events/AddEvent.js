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
            startMonth: "",
            startDay: "",
            startYear: "",
            endMonth: "",
            endDay: "",
            endYear: "",
            startHour: "",
            startMinutes: "",
            endHour: "",
            endMinutes: ""
        }
    }

    handleAddEvent(event) {
        event.preventDefault();
        const localStorage = window.localStorage;
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
            case 'startMonth':
                this.setState({
                    startMonth: event.target.value
                })
                break;
            case 'startDay':
                this.setState({
                    startDay: event.target.value
                })
                break;
            case 'startYear':
                this.setState({
                    startYear: event.target.value
                })
                break;
            case 'endMonth':
                this.setState({
                    endMonth: event.target.value
                })
                break;
            case 'endDay':
                this.setState({
                    endDay: event.target.value
                })
                break;
            case 'endYear':
                this.setState({
                    endYear: event.target.value
                })
                break;
            case 'startHour':
                this.setState({
                    startHour: event.target.value
                })
                break;
            case 'startMinutes':
                this.setState({
                    startMinutes: event.target.value
                })
                break;
            case 'endHour':
                this.setState({
                    endHour: event.target.value
                })
                break;
            case 'endMinutes':
                this.setState({
                    endMinutes: event.target.value
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
                <div>
                    <input onChange={this.handleChange} type="number" name="startDay" placeholder="DD" required/>
                    <input onChange={this.handleChange} type="number" name="startMonth" placeholder="MM" required/>
                    <input onChange={this.handleChange} type="number" name="startYear" placeholder="YYYY" required/>
                </div>
                <div>
                    <input onChange={this.handleChange} type="number" name="endDay" placeholder="DD" required/>
                    <input onChange={this.handleChange} type="number" name="endMonth" placeholder="MM" required/>
                    <input onChange={this.handleChange} type="number" name="endYear" placeholder="YYYY" required/>
                </div>
                <div>
                    <input onChange={this.handleChange} type="number" name="startHour" placeholder="HH" required/>
                    <input onChange={this.handleChange} type="number" name="startMinutes" placeholder="MM" required/>
                </div>
                <div>
                    <input onChange={this.handleChange} type="number" name="endHour" placeholder="HH" required/>
                    <input onChange={this.handleChange} type="number" name="endMinutes" placeholder="MM" required/>
                </div>
                
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