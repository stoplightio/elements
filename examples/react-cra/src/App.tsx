import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { StoplightAPI } from './components/API';
import { Navigation } from './components/Navigation';
import { NotFound } from './components/NotFound';
import { StoplightProjectDocs } from './components/StoplightProject';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <Navigation />
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                <Redirect to="/stoplight-project" />
              </Route>
              <Route path="/zoom-api" component={StoplightAPI} />
              <Route path="/stoplight-project" component={StoplightProjectDocs} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
