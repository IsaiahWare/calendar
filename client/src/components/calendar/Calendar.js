import React, { Component } from 'react'
import { connect } from 'react-redux';
import Week from './Week';
import '../../styles/calendar/Calendar.css';
import {generateWeeks} from './CalendarHelper';

class Calendar extends Component {

    render() {
        const date = this.props.updateDateReducer.date != null ? this.props.updateDateReducer.date : new Date();
        const weeks = generateWeeks(date);
        const className = `week-${weeks.length}-days`;
        const calendarSize = this.props.size === "small" ? "calendar-small" : null;
        return (
            <div id="calendar" className="calendarSize">
                {
                    weeks.map( function(w, i) {
                        if (i === 0) {
                            return <Week days={w} className={className} key={i} firstWeek={true} date={date}/>
                        } else if (i === weeks.length-1) {
                            return <Week days={w} className={className} key={i} lastWeek={true} date={date}/>
                        } else {
                            return <Week days={w} className={className} key={i} date={date}/>
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

export default connect(mapStateToProps, null)(Calendar);