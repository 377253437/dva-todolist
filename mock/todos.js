/**
 * @file todos api mock
 * @author  shenjianqin@sensorsdata.cn
 */
let index = 0;
const data = [];
export default {
  'GET /api/todos': (req, res) => {
    res.json(data);
  },
  'POST /api/todos': (req, res) => {
    const todo = {
      ...req.body,
      id: `index${++index}`,
      checked: false,
    };
    data.push(todo);
    res.json(todo);
  },
  'DELETE /api/todos/:id': (req, res) => {
    const { id } = req.params;
    const itemIndex = data.findIndex(t => t.id === id);
    if (itemIndex > -1) data.splice(itemIndex, 1);
    res.end('success');
  },
  'PUT /api/todos/:id': (req, res) => {
    const { id } = req.params;
    const itemIndex = data.findIndex(t => t.id === id);
    if (itemIndex > -1) {
      data[itemIndex] = {
        ...data[itemIndex],
        ...req.body,
      };
      res.json(data[itemIndex]);
    }
    res.json(null);
  },
};
