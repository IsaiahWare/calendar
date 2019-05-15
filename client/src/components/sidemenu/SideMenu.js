import React from 'react';
import AccountMain from '../account/AccountMain';
import {connect} from 'react-redux';
import {setAuthAction} from '../../redux/actions/setAuthAction';
import '../../styles/sidemenu/SideMenu.css';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.auth = this.auth.bind(this);
        this.test = this.test.bind(this);
        this.setAuthAction = this.setAuthAction.bind(this);
        this.handleAuthTrue = this.handleAuthTrue.bind(this);
        this.handleAuthFalse = this.handleAuthFalse.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            auth: false
        }
    }

    handleAuthTrue() {
        this.setState({
            auth: true
        })
    }

    handleAuthFalse() {
        this.setState({
            auth: false
        })
    }

    logout() {
        const data = {
            userID: this.props.authReducer.id
        }
        fetch("http://127.0.0.1:5000/logout", {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.auth === true) {
                const obj = {
                    id: null,
                    cookie: null
                }
                this.setAuthAction(obj);
                localStorage.removeItem('cookie');
                this.handleAuthFalse();
            } else {
                console.log("Logout failed: " + res.error)
            }
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
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    test() {
        console.log(this.props.authReducer)
    }

    // Redux

    setAuthAction(obj) {
        this.props.setAuthAction(obj);
    }

    // Lifestyle

    componentWillMount() {
        this.setState({
            auth: this.auth()
        })
    }

    render() {
        return (
            <div id="side-menu">
                {this.state.auth === false ? <AccountMain handleAuthFalse={this.handleAuthFalse} handleAuthTrue={this.handleAuthTrue}/> : null}
                <button onClick={this.test}>get the props</button>
                <button onClick={this.logout}>Logout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);