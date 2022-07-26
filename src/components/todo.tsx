import React, { useState } from 'react';
import styles from '../styles/todo.less';
import { Button, Space, Table, Tag, Popconfirm, message, Checkbox } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TodoState } from '../typing/todo';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import InputModal from './inputModal';

interface IAppProps {
  todos: TodoState[];
  dispatch: Dispatch<any>;
}

const Todo: React.FC<IAppProps> = ({ todos, dispatch }) => {
  const data = todos;
  let noDoneArr = data.filter(item => item.status === false);
  let isDoneArr = data.filter(item => item.status === true);
  const DoneStyle = { 'color': '#1DA57A' };
  const noDoneStyle = { 'color': 'red' };
  // const { Search } = Input;
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
      render: (record) => 
        <Space size="middle">
          <a onClick={() => { editHandler(record); }}>编辑</a>
          <a>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => { deleteHandler(record.id); }}
            >
                删除
            </Popconfirm>
          </a>
          <Checkbox checked={record.status} onChange={ () => { onCheckedChange(record.id); }}></Checkbox>
        </Space>
    }
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);
  const editHandler = (record) => {
    setIsModalVisible(true);
    console.log(record);
    setRecord(record);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteHandler = (id:number) => {
    dispatch({
      type: 'todos/delete',
      payload: { id }
    });
    message.success('删除成功');
  };
  const onFinish = (values) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'todos/edit',
        payload: {
          id,
          values
        }
      });
    } else {
      dispatch({
        type: 'todos/add',
        payload: { values }
      });
    }
    setIsModalVisible(false);
  };
  const addHandler = () =>{
    setIsModalVisible(true);
    setRecord(undefined);
  };
  // const onSearch = (e) => {
  //   console.log(e.target.value);
  //   let value = e.target.value;
  //   if (value) {
  //     dispatch({
  //       type: 'todos/search',
  //       payload: { value }
  //     });
  //   } 
  // };
  const onCheckedChange = (id:number) => {
    dispatch({
      type: 'todos/done',
      payload: { id }
    });
  };
  const handleAllDone = () => {
    dispatch({
      type: 'todos/selectAll'
    });
  };
  const handleAllCancle = () => {
    dispatch({
      type: 'todos/cancelAll'
    });
  };
  const handleAllDelete = () => {
    dispatch({
      type: 'todos/deleteAll'
    });
  };
  return (
    <div className={styles.wrapBox}>
      <div className={styles.inputBox}>
        {/* <Search
          className={styles.searchBox}
          placeholder="请输入想搜索的标题"
          onChange={onSearch}
          enterButton
        /> */}
        <div className={styles.doneBox}>
          <div className={styles.tagBox}>
            <p>总共有代办事项:{data.length}</p>
            <p>
              <span style={DoneStyle}>已完成：{isDoneArr.length}</span>
              <span style={noDoneStyle}>未完成：{noDoneArr.length}</span>
            </p> 
          </div>
          <div className={styles.buttonBox}>
            <Button type="primary" size='small' shape='round' onClick={handleAllDone}>全部完成</Button>
            <Button type="primary" size='small' shape='round' onClick={handleAllCancle}>全部取消</Button>
            <Button type="primary" size='small' shape='round' onClick={handleAllDelete}>全部删除</Button>  
          </div>
        </div>
        <Button type="primary" onClick={addHandler}>添加</Button>
      </div>
      <InputModal 
        isModalVisible={isModalVisible}
        onCancel={handleCancel}
        record={record}
        onFinish={onFinish}
      />
      <div className={styles.line}></div>
      <div className={styles.contentBox}>
        <Table columns={columns} dataSource={data} rowKey="id"/>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(Todo);
