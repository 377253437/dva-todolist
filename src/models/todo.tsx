import { TodoState } from '../typing/todo';
import { Reducer } from 'redux';

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
}
const ModelTodo = {
  namespace: 'todos',
  state: [ ],
  reducers: {
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
    selectAll(state) {
      let newState = state.map(item => ({ ...item, status: true }));
      return newState;
    },
    cancelAll(state) {
      let newState = state.map(item => ({ ...item, status: false }));
      console.log(newState);
     
      return newState;
    },
    deleteAll(state) {
      return state.filter((item: { status: boolean }) => item.status === false);
    },
  },
};

export default ModelTodo;
