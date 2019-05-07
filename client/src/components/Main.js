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
        this.state = {
            sideMenu: false
        }
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

    componentDidMount() {
        // console.log(JSON.stringify(this.props.sideMenuReducer))
    }

    componentDidUpdate(next, prev) {
        // console.log(JSON.stringify(this.props.sideMenuReducer))
    }

    render() {
        return (
            <React.Fragment>
                <Header toggleSideMenu={this.toggleMenu} date={this.props.updateDateReducer.date != null ? this.props.updateDateReducer.date : new Date()}/>
                <div className="wrapper">
                    {this.state.sideMenu === true ? <SideMenu/> : null}
                    {this.state.sideMenu === true ? <Calendar size={"small"}/> : <Calendar/>}
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