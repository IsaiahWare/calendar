import React from 'react';
import { connect } from 'react-redux';
import {setAuthAction} from '../redux/actions/setAuthAction'

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.auth = this.auth.bind(this);
        this.setAuthAction = this.setAuthAction.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.register = this.register.bind(this);
    }

    handleClick() {
        console.log(this.props.authReducer);
    }

    register() {
        const data = {
            username: "bob",
            password: "test"
        }
        fetch("http://127.0.0.1:5000/register", {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    auth() {
        const localStorage = window.localStorage;

        if (localStorage.getItem('cookie') === null) {
            console.log("false auth: cookie is empty");
            return false;
        }
        if (this.props.authReducer.id === null) {
            console.log("false auth: id is empty")
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
                localStorage.removeItem('cookie')
            }
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    login() {
        const data = {
            username: "test",
            password: "test"
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
                .catch(err => console.log(err))
            } else {
                return false;
            }
        })
        .then(res => {
            this.setAuthAction(res)
        })
        .catch(err => console.log(err));
    }

    // Redux

    setAuthAction(obj) {
        this.props.setAuthAction(obj);
    }

    // Lifestyle

    componentWillMount() {
    //    this.login()
    }

    render() {
        return (
            <React.Fragment>
                <h1>test</h1>
                <button onClick={this.login}>login</button>
                <button onClick={this.handleClick}>print</button>
                <button onClick={this.auth}>auth</button>
                <button onClick={this.register}>register</button>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    setAuthAction: (obj) => dispatch(setAuthAction(obj)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Test);