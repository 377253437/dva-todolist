/**
 * @file todos api service
 * @author  shenjianqin@sensorsdata.cn
 */
import request from '../utils/request';

export function getTodos() {
  return request('/api/todos');
}

export function addTodo(data) {
  return request(
    '/api/todos',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    },
  );
}

export function deleteTodo(id) {
  return request(
    `/api/todos/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export function toggleTodoStatus(id, status) {
  return request(
    `/api/todos/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({ checked: status }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    },
  )
}
