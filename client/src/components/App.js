import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Test from './Test';
import Main from './Main';

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/login" component={Test}/>
      </Switch>
    )
  }
}

export default App;
