import React, { useState, useCallback } from 'react';
import styles from './Todo.less';
import { Space, Table, Tag, Popconfirm, message, Checkbox, Button,Tooltip } from 'sensd';
import { TodoState } from '../../typing/todo';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import InputModal from '../inputModal/inputModal';



interface IAppProps {
  todos: TodoState[];
  dispatch: Dispatch<any>;
}
interface InputValues {
  title: string;
  detail: string;
}

const Todo: React.FC<IAppProps> = ({ todos, dispatch }) => {
  const data: TodoState[] = todos;
  let noDoneArr: TodoState[] = data.filter((item) => item.status === false);
  let isDoneArr: TodoState[] = data.filter((item) => item.status === true);
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '详情',
      dataIndex: 'detail',
      width: '500px';
      ellipsis: {
        showTitle: false,
      },
      render: detail => (
        <Tooltip placement="topLeft" title={detail}>
          {detail}
        </Tooltip>
    )},
    {
      title: '状态',
      dataIndex: 'status',
      render: (isDone) => {
        if (isDone) {
          return <Tag color="#108ee9">完成</Tag>;
        } else {
          return <Tag color="#f50">未完成</Tag>;
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            编辑
          </a>
          <a>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => {
                deleteHandler(record.id);
              }}
            >
              删除
            </Popconfirm>
          </a>
          <Checkbox
            checked={record.status}
            onChange={() => {
              onCheckedChange(record.id);
            }}
          ></Checkbox>
        </Space>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [record, setRecord] = useState<any>(undefined);
  const editHandler = (record) => {
    console.log(record);
    setIsModalVisible(true);
    setRecord(record);
  };

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const deleteHandler = (id: number) => {
    dispatch({
      type: 'todos/delete',
      payload: { id },
    });
    message.success('删除成功');
  };
  const onFinish = (values: InputValues) => {
    console.log(record);
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'todos/edit',
        payload: {
          id,
          values,
        },
      });
    } else {
      dispatch({
        type: 'todos/add',
        payload: { values },
      });
    }
    setIsModalVisible(false);
  };
  const addHandler = () => {
    setIsModalVisible(true);
    setRecord(undefined);
  };
  const onCheckedChange = (id: number) => {
    dispatch({
      type: 'todos/done',
      payload: { id },
    });
  };
  const handleAllDone = () => {
    dispatch({
      type: 'todos/selectAll',
    });
  };
  const handleAllCancle = () => {
    dispatch({
      type: 'todos/cancelAll',
    });
  };
  const handleAllDelete = () => {
    dispatch({
      type: 'todos/deleteAll',
    });
  };
  return (
    <div className={styles.wrapBox}>
      <div className={styles.inputBox}>
        <div className={styles.doneBox}>
          <div className={styles.tagBox}>
            <p>总共有代办事项:{data.length}</p>
            <p>
              <span className={styles.DoneStyle}>已完成：{isDoneArr.length}</span>
              <span className={styles.noDoneStyle}>未完成：{noDoneArr.length}</span>
            </p>
          </div>
          <div className={styles.buttonBox}>
            <Button type="primary" size="small" shape="round" onClick={handleAllDone}>
              全部完成
            </Button>
            <Button type="primary" size="small" shape="round" onClick={handleAllCancle}>
              全部取消
            </Button>
            <Button type="primary" size="small" shape="round" onClick={handleAllDelete}>
              全部删除
            </Button>
          </div>
        </div>
        <Button type="primary" onClick={addHandler}>
          添加
        </Button>
      </div>
      <InputModal isModalVisible={isModalVisible} onCancel={handleCancel} record={record} onFinish={onFinish} />
      <div className={styles.line}></div>
      <div className={styles.contentBox}>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(Todo);
