import dva from 'dva';
import createhistory from 'history/createBrowserHistory';
import './index.less';
import 'antd/dist/antd.css';
import { persistEnhancer } from 'dva-model-persist';
import storage from 'dva-model-persist/lib/storage'; 

// 1. Initialize
// const app = dva();
const app = dva({
  history: createhistory(),
});
app.use({
  extraEnhancers: [
    persistEnhancer({
      key: 'model',
      storage
    })
  ],
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/todo.tsx').default);

// 4. Router
// app.router(require('./router').default);
app.router(require('./router').default);

// 5. Start
// app.start('#root');
app.start('#root');
