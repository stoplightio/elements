import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
            <Route path="/API" component={StoplightAPI} />
            <Route path="/" component={StoplightProjectDocs} exact />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
