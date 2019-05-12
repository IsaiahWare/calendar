import React from 'react';
import Login from './Login';
import Register from './Register';
import {setAuthAction} from '../../redux/actions/setAuthAction'
import {connect} from 'react-redux';

class AccountMain extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSuccessfulRegister = this.handleSuccessfulRegister.bind(this);
        this.setAuthAction = this.setAuthAction.bind(this);
    }

    handleSuccessfulRegister(username, password) {
        this.handleLogin(username, password);
    }

    handleLogin(username, password) {
        const data = {
            username: username,
            password: password
        }
        const localStorage = window.localStorage;
        fetch("http://127.0.0.1:5000/login", {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.auth === true) {
                return fetch("http://127.0.0.1:5000/make_cookie", {
                    method: 'post',
                    body: JSON.stringify({userID: res.id})
                })
                .then(res => res.json())
                .then(res => {
                    if (res.auth === true) {
                        localStorage.setItem('cookie', res.cookie);
                        return {id: res.id, cookie: res.cookie};
                    } else {
                        return {id: "", cookie: ""}
                    }
                })
                .then((res) => {
                    this.props.handleAuthTrue();
                    return res;
                })
                .catch(err => console.log(err))
            } else {
                return {id: null, cookie: null};
            }
        })
        .then(res => {
            console.log(res);
            this.setAuthAction(res)
        })
        .catch(err => console.log(err));
    }

    // Redux

    setAuthAction(obj) {
        this.props.setAuthAction(obj);
    }


    render() {
        return (
            <React.Fragment>
                <Login handleLogin={this.handleLogin}/>
                <Register handleSuccessfulRegister={this.handleSuccessfulRegister}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(AccountMain);