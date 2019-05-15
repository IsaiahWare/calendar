import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './calendar/Calendar';
import Header from './header/Header';
import SideMenu from './sidemenu/SideMenu';
import {setAuthAction} from '../redux/actions/setAuthAction'
import '../styles/Container.css';

class Main extends Component {

    constructor(props) {
        super(props);
        this.setAuthAction = this.setAuthAction.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.auth = this.auth.bind(this);
        this.state = {
            sideMenu: false,
            auth: false
        }
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
            // console.log(res)
        })
        .catch(err => console.log(err));
    }

    toggleMenu() {
        this.setState({
            sideMenu: !this.state.sideMenu
        })
    }

    // Redux methods

    setAuthAction(obj) { 
        this.props.setAuthAction(obj);
    }

    // Lifecycle methods

    componentWillMount() {
        this.auth();
    }

    render() {
        const userID = this.props.authReducer.id;
        return (
            <React.Fragment>
                <Header toggleSideMenu={this.toggleMenu} date={this.props.updateDateReducer.date != null ? this.props.updateDateReducer.date : new Date()}/>
                <div className="wrapper">
                    {this.state.sideMenu === true ? <SideMenu/> : null}
                    <Calendar userID={userID}/>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setAuthAction: (obj) => dispatch(setAuthAction(obj)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);