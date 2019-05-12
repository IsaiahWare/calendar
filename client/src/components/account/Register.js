import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

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

    handleRegister(event) {
        event.preventDefault();
        const un = this.state.username;
        const pw = this.state.password;
        const data = {
            username: un,
            password: pw
        }
        fetch('http://127.0.0.1:5000/register', {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.auth === true) {
               this.props.handleSuccessfulRegister(un, pw);
            } else {
                console.log("Failed register");
                return false;
            }
        })
        .catch(err => console.log(err))
    }

    render() {
        return(
            <form onSubmit={this.handleRegister}>
                <input type="text" placeholder="Username" onChange={this.handleUsername} required/>
                <input type="password" placeholder="Password" onChange={this.handlePassword} required/>
                <input type="submit" value="Register"/>
            </form>
        );
    }
}

export default Register;