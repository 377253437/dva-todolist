import * as React from 'react';

import { Router, Route, Switch } from 'dva/router';

import Home from './routes/Home'; // 引入 首页 组件
import Test from './components/test';

export default function RouterConfig({ history }) {
  // 路由配置
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/test' component={Test} />
      </Switch>
    </Router>
  );
}
