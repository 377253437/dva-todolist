import React, { useState, useCallback, useEffect } from "react";
import styles from "./Todo.less";
import {
  Space,
  Table,
  Tag,
  Popconfirm,
  message,
  Checkbox,
  Button,
  Tooltip,
  Input,
} from "sensd";
import { ModelState } from "../../models/todo";
import { Dispatch } from "redux";
import { connect } from "dva";
import InputModal from "../inputModal/inputModal";

interface IAppProps {
  todos: ModelState;
  dispatch: Dispatch<any>;
}
interface InputValues {
  title: string;
  detail: string;
}

const Todo: React.FC<IAppProps> = ({ todos, dispatch }) => {
  //初始化数据
  const { data } = todos;

  useEffect(() => {
    dispatch({
      type: "todos/query",
    });
  }, []);

  let noDoneArr = data.filter((item) => item.status === false);
  let isDoneArr = data.filter((item) => item.status === true);
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      ellipsis: {
        showTitle: false,
      },
      render: (detail) => (
        <Tooltip placement="topLeft" title={detail}>
          {detail}
        </Tooltip>
      ),
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "详情",
      dataIndex: "detail",
      width: "300px",
      ellipsis: {
        showTitle: false,
      },
      render: (detail) => (
        <Tooltip placement="topLeft" title={detail}>
          {detail}
        </Tooltip>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (isDone) => {
        if (isDone) {
          return <Tag color="#108ee9">完成</Tag>;
        } else {
          return <Tag color="#f50">未完成</Tag>;
        }
      },
    },
    {
      title: "操作",
      key: "action",
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
              onCheckedChange(record.id, record.status);
            }}
          ></Checkbox>
        </Space>
      ),
    },
  ];
  //弹窗开关
  const [isModalVisible, setIsModalVisible] = useState(false);
  //编辑弹窗的表单
  // eslint-disable-next-line no-undef
  const [record, setRecord] = useState<any>(undefined);

  //   const [form] = Form.useForm()
  const editHandler = (record) => {
    setIsModalVisible(true);
    setRecord(record);
  };

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const deleteHandler = (id: number) => {
    dispatch({
      type: "todos/delete",
      payload: { id },
    });
    message.success("删除成功");
  };
  const onFinish = (values: InputValues) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: "todos/edit",
        payload: {
          id,
          values,
        },
      });
    } else {
      dispatch({
        type: "todos/add",
        payload: { values },
      });
    }
    setIsModalVisible(false);
  };
  const addHandler = () => {
    setIsModalVisible(true);
    setRecord(undefined);
  };
  const onCheckedChange = (id: number, checked: boolean) => {
    dispatch({
      type: "todos/toggle",
      payload: { id, checked },
    });
  };
  const onSearch = (value) => {
    if (value) {
      dispatch({
        type: "todos/search",
        payload: { value },
      });
    }
  };

  return (
    <div className={styles.wrapBox}>
      <div className={styles.header}>
        Todo List
        <p className={styles.doneCount}>
          <span className={styles.DoneStyle}>已完成：{isDoneArr.length}</span>
          <span className={styles.noDoneStyle}>未完成：{noDoneArr.length}</span>
        </p>
      </div>
      <div className={styles.inputBox}>
        <Input.Search
        enterButton="搜索"
          className={styles.searchBox}
          onSearch={onSearch}
          placeholder="输入标题关键字"
          allowClear
          size="large"
        />
        <div className={styles.doneBox}>
          <div className={styles.tagBox}></div>
        </div>
        <Button type="primary" onClick={addHandler} size='large'>
          添加
        </Button>
      </div>
      <InputModal
        isModalVisible={isModalVisible}
        onCancel={handleCancel}
        record={record}
        onFinish={onFinish}
      />
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
