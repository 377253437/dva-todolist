import { TodoState } from "../typing/todo";
import { Effect, Subscription } from "dva";
import { Reducer } from "redux";
import { getTodo, addTodo, deleteTodo, editTodo, toggleTodoStatus } from "../services/todos";
export interface ModelState {
  data: TodoState[];
}

export interface ModelType {
  namespace: "todos";
  state: ModelState;
  effects: {
    query: Effect;
    add: Effect;
    edit:Effect;
    delete: Effect;
    toggle:Effect;
    search:Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ModelTodo: ModelType = {
  namespace: "todos",
  state: {
    data: [],
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, data };
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(getTodo, payload);
      yield put({ type: "save", payload: data });
    },
    *add({ payload: { values } }, { call, put }) {
      yield call(addTodo, {...values });
      yield put({ type: "query" });
    },
    *delete({ payload }, { call, put }) {
      yield call(deleteTodo, payload.id);
      yield put({
        type: "query"
      });
    },
    *edit({ payload: { id, values } }, { call, put }) {
      yield call(editTodo,  id, {...values} );
      yield put({
        type: 'query'
      });
    },
    *toggle({ payload: { id ,checked} }, { call, put }) {
        yield call(toggleTodoStatus, id , checked)
        yield put({
            type: 'query'
          });
    },
    *search({payload},{call , put}) {
        const { value } = payload;
        console.log('value',value)
        let res = yield call(getTodo, payload)
        const {data} = res
        let newDate =  data.filter(item => item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        console.log('newDate',newDate)
        yield put({
            type: 'save',
            payload: newDate
          });
    }

    // 点击分类，传过来一个表单  为 0 1 2  用swich case来渲染
    // *selectAll({payload},{call ,put}){
    //     yield call()
    // },
    // *cancelAll({payload},{call ,put}){

    // },
    // *deleteAll({payload},{call ,put}){
    //     yield call(deleteAllTodo)
    //     yield put({
    //         type: 'query'
    //       });
    // },
    // *selectAll({payload}, {call,put}) {
    //     yield call()
    //     state.data.map((item) => (item.status = true));
    //     console.log(state.data)
    //    // localStorage.setItem('todoList', JSON.stringify(newState));
    //    yield put({
    //     type: 'query'
    //   });
    //  },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/") {
          dispatch({
            type: "updateTodo",
          });
        }
      });
    },
  },
};

export default ModelTodo;
