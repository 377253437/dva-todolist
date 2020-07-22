/**
 * @file todos list
 * @author shenjianqin@sensorsdata.cn
 */
import React, {useEffect, useState} from 'react';
import { connect } from 'dva';
import { Button, Checkbox, Card, List } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import TodoForm from "./TodoForm";

const Todolist = ({ dispatch, todos: { list: dataSource } }) => {
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    // fetch todos list data
    dispatch({ type: 'todos/fetch' });
  }, []);

  // show/hide add form
  const showAdd = () => setIsAdding(true);
  const hideAdd = () => setIsAdding(false);

  // add new item
  const handleAdd = (values) => {
    dispatch({ type: 'todos/add', payload: values });
    hideAdd();
  };

  // delete item by id
  const handleDelete = (id) => {
    dispatch({ type: 'todos/delete', payload: id });
  };

  // check/uncheck item
  const toggleStatus = (id, value) => {
    dispatch({ type: 'todos/toggle', payload: { id, checked: value } });
  };

  const renderItem = (item) =>
    <List.Item
      actions={[
        <Button
          type="text"
          danger
          size="small"
          icon={<CloseOutlined />}
          onClick={() => handleDelete(item.id)}
        />
      ]}
    >
      <Checkbox
        checked={item.checked}
        onChange={(e) => toggleStatus(item.id, e.target.checked)}
      >
        {item.content}
      </Checkbox>
    </List.Item>;

  return (
    <Card
      style={{maxWidth: 800, margin: '0 auto'}}
      extra={isAdding
        ? <TodoForm onSubmit={handleAdd} />
        : <Button icon={<PlusOutlined />} onClick={showAdd}>Add</Button>
      }
    >
      <List
        bordered
        dataSource={dataSource}
        renderItem={renderItem}
      />
    </Card>
  );
};

function mapStateToProps({ todos }) {
  return { todos };
}

export default connect(mapStateToProps)(Todolist);
