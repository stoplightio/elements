import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { StoplightAPI } from './components/API';
import { Error } from './components/Error';
import { Navigation } from './components/Navigation';
import { StoplightProjectDocs } from './components/stoplightProject';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Redirect to="/stoplightProject" />
            </Route>
            <Route path="/API" component={StoplightAPI} />
            <Route path="/stoplightProject" component={StoplightProjectDocs} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
