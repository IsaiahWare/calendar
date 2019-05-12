import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Test from './Test';
import Main from './Main';
import ActionBox from './events/ActionBox';

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/login" component={Test}/>
        <Route path="/day/:id" component={ActionBox}/>
      </Switch>
    )
  }
}

export default App;
