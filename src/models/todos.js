/**
 * @file todos model
 * @author  shenjianqin@sensorsdata.cn
 */
import {addTodo, deleteTodo, getTodos, toggleTodoStatus} from "../services/todos";

export default {

  namespace: 'todos',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch(_, { call, put }) {  // eslint-disable-line
      const { data } = yield call(getTodos);
      yield put({ type: 'save', payload: data });
    },
    *add({ payload: todo }, { call, put }) {
      yield call(addTodo, todo);
      yield put({ type: 'fetch' });
    },
    *delete({ payload: id }, { call, put }) {
      yield call(deleteTodo, id);
      yield put({ type: 'fetch' });
    },
    *toggle({ payload: { id, checked } }, { call, put }) {
      yield call(toggleTodoStatus, id, checked);
      yield put({ type: 'fetch' });
    },
  },

  reducers: {
    save(state, { payload: list }) {
      return { ...state, list };
    },
  },

};
