import React from "react";
import { Form, Input, Modal, Upload, message } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useAddChatRoom } from "../../../api/useChatRoom";
import { useState } from "react";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface AddChatFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const { Item } = Form;

export const AddChatForm: React.FC<AddChatFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imagefile, setImageFile] = useState<UploadFile<any>>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 上传之前
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只可以上传图片!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片必须小于2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
    });
    setImageFile(info.file);
    setLoading(false);
  };

  // 上传按扭
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>选择头像</div>
    </div>
  );

  const { add } = useAddChatRoom();

  return (
    <Modal
      open={open}
      title="创建新的聊天室"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (!values.roomname) {
              message.warning("有信息没填");
            }
            add(values.roomname, imagefile, user.username, user.password);
            onCreate(values);
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
        <Item
          valuePropName="fileList"
          rules={[{ required: true, message: "请选择你的头像" }]}
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            action="/upload.do"
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ borderRadius: "50%", width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Item>
        <Item
          name="roomname"
          label="聊天室名称"
          rules={[
            {
              required: true,
              message: "请填写您的聊天室名称",
            },
          ]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
