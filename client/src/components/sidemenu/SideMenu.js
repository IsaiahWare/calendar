import React from 'react';
import Login from '../account/Login';
import {connect} from 'react-redux';
import '../../styles/sidemenu/SideMenu.css';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.auth = this.auth.bind(this);
        this.test = this.test.bind(this);
        this.state = {
            auth: false
        }
    }

    auth() {
        const localStorage = window.localStorage;
        if (localStorage.getItem('cookie') === null) {
            console.log("false auth: cookie is empty");
            return false;
        }
        // id is local, gets erased during refresh
        // if (this.props.authReducer.id === null) {
        //     console.log("false auth: id is empty")
        //     return false;
        // }
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

    test() {
        console.log(this.props.authReducer)
    }

    componentWillMount() {
        this.setState({
            auth: this.auth()
        })
    }

    render() {
        return (
            <div id="side-menu">
                {this.state.auth === false ? <Login/> : null}
                <button onClick={this.test}>get the props</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

// const mapDispatchToProps = dispatch => ({
//     setAuthAction: (obj) => dispatch(setAuthAction(obj)) 
// })

export default connect(mapStateToProps, null)(SideMenu);