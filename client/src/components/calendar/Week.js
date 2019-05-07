import React, { Component } from 'react';
import Day from './Day';
import '../../styles/calendar/Week.css';

class Week extends Component {

    render() {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let dayIndex = 0;
        let firstWeek = this.props.firstWeek;
        let lastWeek = this.props.lastWeek;
        let date = this.props.date;
        let nextMonthDate = new Date(date.getFullYear(), date.getMonth()+1, 1);
        let lastMonthDate = new Date(date.getFullYear(), date.getMonth()-1, 1);

        return (
            <div className={this.props.className}>
                {
                    this.props.days.map( function(d, i) {
                        if (firstWeek) {
                            if (d["day"] === 1) {
                                return <Day number={d["day"]} id={d["id"]} key={i} dayName={days[dayIndex++]} firstDay={true} date={date}/>;
                            } else if (d["faded"] != null) {
                                return <Day number={d["day"]} id={d["id"]} key={i} dayName={days[dayIndex++]} faded={true} date={lastMonthDate}/>;
                            } else {
                                return <Day number={d["day"]} id={d["id"]} key={i} dayName={days[dayIndex++]} date={date}/>;
                            }
                        } else if (lastWeek) {
                            if (d["day"] === 1) {
                                return <Day number={d["day"]} id={d["id"]} key={i} lastDay={true} faded={true} date={date}/>;
                            } else if (d["day"] < 8) { 
                                return <Day number={d["day"]} id={d["id"]} key={i} faded={true} date={nextMonthDate}/>;
                            } else {
                                return <Day number={d["day"]} id={d["id"]} key={i} date={date}/>;
                            }
                        } else {
                            return <Day number={d["day"]} id={d["id"]} key={i} date={date}/>;
                        }
                    })
                }
            </div>
        )
    }
}

export default Week;