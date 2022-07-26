// import request from '../utils/request';

// export function getTodos() {
//   return request(
//     'https://www.fastmock.site/mock/150348a8facee83e78b98c0bf203a46f/todolist/list',   
//     {
//       method: 'GET',
//     });
// }
// export function deleteTodos({ id }) {
//   return request(
//     `https://www.fastmock.site/mock/150348a8facee83e78b98c0bf203a46f/todolist/list/${id}`,   
//     {
//       method: 'DELETE'
//     }
//   );
// }
// export function editTodos({ id, values }) {
//   return request(
//     `https://www.fastmock.site/mock/150348a8facee83e78b98c0bf203a46f/todolist/list/${id}`,   
//     {
//       method: 'PUT',
//       body: JSON.stringify({ values }),
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//     }
//   );
// }
// export function addTodos({ values }) {
//   return request(
//     'https://www.fastmock.site/mock/150348a8facee83e78b98c0bf203a46f/todolist/list',
//     {
//       method: 'POST',
//       body: JSON.stringify({ values }),
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//     },
//   );
// }
// import request from '../utils/request';

// export function query() {
//   return request('/api/todos');
// }

