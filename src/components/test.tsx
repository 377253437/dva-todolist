import React, { useEffect } from 'react';
import { getTodos } from '../services/todo';
import { connect } from 'dva';
import { ColumnsType } from 'antd/es/table';
import { TodoState } from '../typing/todo';
import { Space, Table, Tag, Form } from 'antd';



const Test = ({ todos, dispatch }) => {
  const { data } = todos;
  const handle = () => {
    dispatch({ type: 'todos/updateTodo' });
    console.log('点击后', data);
  };
  useEffect(()=>{
    getTodos().then(res=>{
      console.log('useeffect', res);
    });
  });
  const columns: ColumnsType<TodoState> = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '详情',
      dataIndex: 'detail',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (isDone) => {
        if (isDone) {
          return <Tag color="#108ee9">完成</Tag>;
        } else {
          return <Tag color="#f50">未完成</Tag>;
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: () => 
        <Space size="middle">
          <a>1</a>
          <a>2</a>
        </Space>
    }
  ];
  return (
    <div className='test'>
      <div>
        <button onClick={handle}>点击更新</button>
        <Table columns={columns} dataSource={data}/>
     测试页面
      </div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onEdit={onEdit}
        initialValues={initialValue}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      />

    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state.todos);
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(Test);

