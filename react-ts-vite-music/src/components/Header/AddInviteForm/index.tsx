import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useUser } from "../../../api/useUser";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddInviteFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const { Item } = Form;

// 自动生成邀请码
function generateInviteCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = length || 8;
  let inviteCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    inviteCode += characters.charAt(randomIndex);
  }

  return inviteCode;
}

export const AddInviteForm: React.FC<AddInviteFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { AddInviteCode } = useUser();
  const code = generateInviteCode(6);
  const [inviteCode, setInviteCode] = useState<string>(code);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const generateCode = () => {
    const code = generateInviteCode(6);
    setInviteCode(code);
  };

  return (
    <Modal
      open={open}
      title="添加邀请码"
      okText="添加"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            AddInviteCode(
              inviteCode,
              values.comments,
              user.username,
              user.password
            );
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <p>邀请码</p>
        <Input
          value={inviteCode}
          onChange={(event) => {
            setInviteCode(event.target.value);
          }}
          suffix={<Button onClick={generateCode}>自动生成</Button>}
        />
        <Item name="comments" label="备注">
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
