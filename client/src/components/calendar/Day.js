import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setAuthAction} from '../../redux/actions/setAuthAction';
import {openAddEventBoxAction, closeAddEventBoxAction} from '../../redux/actions/addEventBoxActions';
import '../../styles/calendar/Day.css';

class Day extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.closeAddEventBoxAction = this.closeAddEventBoxAction.bind(this);
        this.openAddEventBoxAction = this.openAddEventBoxAction.bind(this);
        this.state = {
            redirect: false
        }
    }

    openAddEventBoxAction(id) {
        this.props.openAddEventBoxAction(id);
    }

    closeAddEventBoxAction(id) {
        this.props.closeAddEventBoxAction(id);
    }

    setAuthAction(obj) {
        this.props.setAuthAction(obj);
    }

    handleClick(event) {
        // console.log(this.props.authReducer);
        // const id = event.target.id;
        this.setState({
            redirect: true
        })
    }

    componentDidMount() {
        // console.log(this.props.authReducer);
    }

    render() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
        // const date = new Date();

        let className = "day";

        if (this.props.faded === true) {
            className = className + ` ${"day-faded"}`;
        }

        return (
            <div className={className} id={this.props.id}>
                {
                    this.props.dayName != null ? <p>{this.props.dayName}</p> : null
                }
                <div className="day-info">
                    {this.props.firstDay != null && this.props.faded == null ? <p>{months[this.props.date.getMonth()]}</p> : null}
                    {this.props.lastDay != null ? <p>{months[(this.props.date.getMonth() + 1) % 12]}</p> : null}
                    &nbsp;
                    {this.props.number}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setAuthAction: (obj) => dispatch(setAuthAction(obj)),
    openAddEventBoxAction: (id) => dispatch(openAddEventBoxAction(id)),
    closeAddEventBoxAction: (id) => dispatch(closeAddEventBoxAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Day);