/**
 * @file 文件用途
 * @author  shenjianqin@sensorsdata.cn
 */
import React from 'react';
import { Form, Input, Button } from 'antd';

const TodoForm = ({ onSubmit }) => {
  return (
    <Form layout="inline" onFinish={onSubmit}>
      <Form.Item
        name="content"
        rules={[{ required: true, message: 'Please input your todo description!' }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
