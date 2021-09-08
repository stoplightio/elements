import { DevPortalProvider } from '@stoplight/elements-dev-portal';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { StoplightAPI } from './components/API';
import { Navigation } from './components/Navigation';
import { NotFound } from './components/NotFound';
import { StoplightProjectDocs } from './components/StoplightProject';

class App extends Component {
  render() {
    return (
      <DevPortalProvider>
        <BrowserRouter>
          <div className="app-container">
            <header>
              <Navigation />
            </header>
            <main className="main-content">
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
      </DevPortalProvider>
    );
  }
}

export default App;
