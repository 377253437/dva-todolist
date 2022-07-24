import React, { useEffect } from 'react';
import { Input, Form, Modal } from 'antd';

// interface IValues {
//   title: string;
//   detail: string;
//   id?: string;
// }
interface IAppProps {
  isModalVisible: boolean;
  onCancel: () => void;
  record: any;
  onFinish: () => void;
}

const InputModal: React.FC<IAppProps> = ({
  isModalVisible,
  onCancel,
  record,
  onFinish
}) => {
  const [form] = Form.useForm();
  const onSubmit = ()=> {
    form.submit();
  };
  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  }, [isModalVisible]);
  return (
    <div>
      <Modal 
        title="Todolist的信息" 
        visible={isModalVisible} 
        onCancel={onCancel} 
        onOk={onSubmit} 
        forceRender
      >
        <Form 
          layout="vertical" 
          name="form_in_modal" 
          form={form}
          onFinish={ onFinish }
        >
          <Form.Item  
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入标题!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="detail"
            label="详情"
            rules={[
              {
                required: true,
                message: '请输入详细信息!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InputModal;
