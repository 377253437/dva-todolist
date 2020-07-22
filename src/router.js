import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import TodolistPage from "./routes/Todolist";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={TodolistPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
