import React from 'react';
import {connect} from 'react-redux';
import {setAuthAction} from '../../redux/actions/setAuthAction'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.setAuthAction = this.setAuthAction.bind(this);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin(event) {
        event.preventDefault()
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(data);
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
            <div>
                <form onSubmit={this.handleLogin}>
                    <input type="text" placeholder="Username" onChange={this.handleUsername} required/>
                    <input type="password" placeholder="Password" onChange={this.handlePassword} required/>
                    <input type="submit" value="Login"/>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);