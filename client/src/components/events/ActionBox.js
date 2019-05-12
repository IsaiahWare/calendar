import React from 'react';
import AddEvent from './AddEvent';
import {Redirect} from 'react-router-dom';
import '../../styles/events/ActionBox.css';

class ActionBox extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        console.log("This should close");
        this.props.close();
    }

    render() {
        return (
            <div className="ActionBox">
                <button onClick={this.close}>Close</button>
                <AddEvent close={this.close}/>
            </div>
        )
    }
}

export default ActionBox;