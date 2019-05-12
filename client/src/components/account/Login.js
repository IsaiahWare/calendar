import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
        event.preventDefault();
        this.props.handleLogin(this.state.username, this.state.password);
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

export default Login;