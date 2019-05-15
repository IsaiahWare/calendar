import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incDateAction } from '../../redux/actions/incDateAction';
import { decDateAction } from '../../redux/actions/decDateAction';
import {setAuthAction} from '../../redux/actions/setAuthAction';
import '../../styles/header/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.incDateAction = this.incDateAction.bind(this);
        this.decDateAction = this.decDateAction.bind(this);
        this.setAuthAction = this.setAuthAction.bind(this);
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
        this.state = {
            login: false
        }
    }

    toggleSideMenu() {
        this.props.toggleSideMenu();
    }

    setAuthAction(obj) {
        this.props.setAuthAction(obj);
    }

    incDateAction() {
        this.props.incDateAction();
    }

    decDateAction() {
        this.props.decDateAction();
    }

    handleClickAddEvent() {
        this.setState({
            login: true
        })
    }

    render() {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"]
        return (
            <div id="header">
                <button onClick={this.toggleSideMenu}>Toggle Side Menu</button>
                <div id="header-month-buttons">

                    <button onClick={this.decDateAction}>Prev Month</button>

                    <p id="month-display">
                        {`${months[this.props.date.getMonth()]}`}
                        &nbsp;
                        <span id="year-clickable">{this.props.date.getFullYear()}</span>
                    </p>

                    <button onClick={this.incDateAction}>Next Month</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    incDateAction: () => dispatch(incDateAction()),
    decDateAction: () => dispatch(decDateAction()),
    setAuthAction: (obj) => dispatch(setAuthAction(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);