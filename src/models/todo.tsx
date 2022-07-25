import { TodoState } from '../typing/todo';
import { Subscription } from 'dva';
import { Reducer } from 'redux';
// import { getTodos, editTodos, deleteTodos } from '../services/todo';
// import { Effect, Subscription } from 'dva';
  
export interface ModelType {
  namespace: string;
  state: TodoState[];
  reducers:{
    add:Reducer<TodoState>;
    delete:Reducer<TodoState>;
    edit:Reducer<TodoState>;
    done:Reducer<TodoState>;
    selectAll:Reducer<TodoState>;
    cancelAll:Reducer<TodoState>;
    deleteAll:Reducer<TodoState>;
  };
  subscriptions: { setup: Subscription };
}
const ModelTodo = {
  namespace: 'todos',
  state: [
    {
      'id': '112542643',
      'title': 'HTML的学习',
      'detail': 'HTML的全称为超文本标记语言,是一种标记语言。它包括一系列标签.',
      'status': false
    },
    {
      'id': '1352216',
      'title': 'Javascript的学习',
      'detail': 'JavaScript,简称“JS”,是一种具有函数优先的轻量级，解释型或即时编译型的编程语言.',
      'status': true
    },
    {
      'id': '23532572574',
      'title': 'React的学习',
      'detail': 'React是用于构建用户界面的JavaScript库,起源于Facebook的内部项目.',
      'status': false
    }
  ],
  reducers: {
    // save(state, { payload }) {
    //   console.log(payload);
    //   return [...state, ...payload];
    // },
    add(state, { payload }) {
      const { values } = payload;
      return [...state, { id: new Date().getTime(), ...values, status: false }];
    },
    delete(state, { payload }) {
      const { id } = payload;
      console.log('id', id);
      return state.filter((item) => item.id !== id);
    },
    edit(state, { payload }) {
      console.log('editing');
      const { values, id } = payload;
      let indexArr = state.map(item => {
        return item.id;
      });
      let statusArr = state.map(item => {
        return item.status;
      });
      const index = indexArr.indexOf(id);
      let newState = [...state];
      newState[index] = { id: index, ...values, status: statusArr[index] };
      console.log(newState);
      return newState;
    },
    done(state, { payload }) {
      const { id } = payload;
      console.log(id);
      return state.map((item) => item.id === id ? { ...item, status: !item.status } : item
      );
    },
    // search(state, { payload }) {
    //   const { value } = payload;
    //   console.log('搜索', value);
    //   // let filterArr = [];
    //   // filterArr = state.filter(item => {
    //   //   return item.title.includes(value);
    //   // });
    //   let filterArr = state.filter(item => item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    //   console.log(filterArr);
    //   return filterArr;
    // },
    selectAll(state) {
      // let newState = 
      // });
      let newState = state.map(item => return { ...item ,status:true });
      return newState
    },
    cancelAll(state) {
      // let newState = state.map(item => item.status === true);
      let newState = state.map(item => return { ...item ,status:false });
      // let newState = state.forEach(item => item.status:false );
      console.log(newState);
     
      return newState;
    },
    deleteAll(state) {
      return state.filter((item: { status: boolean }) => item.status === false);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'updateTodo'
          });
        }
      });
    }
  }
};

export default ModelTodo;
