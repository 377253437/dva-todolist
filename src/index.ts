import dva from 'dva';
import createhistory from 'history/createBrowserHistory';
import './index.less';
import 'sensd/dist/sensd.css';
// import { persistEnhancer } from 'dva-model-persist';
// import storage from 'dva-model-persist/lib/storage';
// import { setLocale } from '@sc/intl';
// setLocale({
//   locale: 'zh-cn', // 国际化语言，zh-cn为简体，zh-tw为繁体
//   on: true,
//   debug: false, // 设置为true可进行验证
//   onError () {}
// });
// 1. Initialize
// const app = dva();
const app = dva({
  history: createhistory(),
});

// app.use({
//   extraEnhancers: [
//     persistEnhancer({
//       key: 'model',
//       storage,
//     }),
//   ],
// });

// 3. Model
app.model(require('./models/todo.ts').default);

// 4. Router
// app.router(require('./router').default);
app.router(require('./router').default);

// 5. Start
// app.start('#root');
app.start('#root');

