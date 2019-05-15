import React, { Component } from 'react'
import { connect } from 'react-redux';
import Week from './Week';
import '../../styles/calendar/Calendar.css';
import {generateWeeks} from './CalendarHelper';
import {setAuthAction} from '../../redux/actions/setAuthAction';
class Calendar extends Component {

    constructor(props) {
        super(props);
        this.auth = this.auth.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.state = {
            gotEvents: false
        }
    }

    getEvents() {
        const date = this.props.updateDateReducer.date != null ? this.props.updateDateReducer.date : new Date();
        const weeks = generateWeeks(date);
        const firstDay = weeks[0][0].id;
        const lastDay = weeks[weeks.length-1][6].id;
        const data = {
            userID: this.props.authReducer.id+"",
            startYear: firstDay.substring(0,4),
            startMonth: firstDay.substring(4,6),
            startDay: firstDay.substring(6,8),
            endYear: lastDay.substring(0,4),
            endMonth: lastDay.substring(4,6),
            endDay: lastDay.substring(6,8)
        }
        if (this.props.authReducer.id === null) return;
        console.log(data);
        fetch('http://127.0.0.1:5000/get_events', {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log("events: " + JSON.stringify(res))
        })
        .catch(err => console.log(err));
    }

    auth() {
        const localStorage = window.localStorage;
        if (localStorage.getItem('cookie') === null) {
            return false;
        }
        const data = {
            userID: this.props.authReducer.id,
            cookie: localStorage.getItem('cookie')
        }
        fetch("http://127.0.0.1:5000/auth", {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.auth === false) {
                localStorage.removeItem('cookie');
                const obj = {
                    id: null,
                    cookie: null
                }
                this.setAuthAction(obj);
            } else {
                const obj = {
                    id: res.id,
                    cookie: localStorage.getItem('cookie')
                }
                this.setAuthAction(obj);
            }
        })
        .catch(err => console.log(err));
    }

    // Redux

    setAuthAction(obj) { 
        this.props.setAuthAction(obj);
    }

    componentWillMount() {
        this.auth();
    }

     componentDidUpdate() {
        this.getEvents()
     }

    render() {
        const date = this.props.updateDateReducer.date != null ? this.props.updateDateReducer.date : new Date();
        const weeks = generateWeeks(date);
        const className = `week-${weeks.length}-days`;
        const userID = this.props.userID;
        return (
            <div id="calendar" className="calendarSize">
                {
                    weeks.map( function(w, i) {
                        if (i === 0) {
                            return <Week userID={userID} days={w} className={className} key={i} firstWeek={true} date={date}/>
                        } else if (i === weeks.length-1) {
                            return <Week userID={userID} days={w} className={className} key={i} lastWeek={true} date={date}/>
                        } else {
                            return <Week userID={userID} days={w} className={className} key={i} date={date}/>
                        }
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setAuthAction: (obj) => dispatch(setAuthAction(obj)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);