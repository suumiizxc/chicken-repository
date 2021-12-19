import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Card, Modal, Form, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { getWords } from "../../services/main_service";

export default function Index(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Үндсэн хэл",
      dataIndex: "language_id",
      key: "language_id",
    },
    {
      title: "Үг",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Цагийн хэлбэр",
      dataIndex: "type_id",
      key: "type_id",
    },
    {
      title: "Үгийн үндэс",
      dataIndex: "root_word_id",
      key: "address",
    },
    {
      title: "Огноо",
      dataIndex: "created_date",
      key: "address",
    },
    {
      title: "Ажилтан",
      dataIndex: "created_by",
      key: "address",
    },
    {
      title: "Үйлдэл",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
          <Button icon={<EditOutlined style={{ color: "#3e79f7" }} />} />
        </Space>
      ),
    },
  ];

  const wordAdd = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishWord = (values) => {
    console.log("onFinish value", values);
  };

  const onFinishFailedWord = (err) => {
    console.log("onFinishFailed", err);
  };

  useEffect(() => {
    console.log("word useffect");
    console.log("user token", props.userData.token);
    const token = localStorage.getItem("token");
    getWords(token)
      .then((res) => {
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("success all words");
          setData(res.data.data);
        } else {
          //unsuccessful
        }
      })
      .catch((e) => {
        //unsuccessful
        console.log(e);
      });
  }, []);

  return (
    <Card title={"Үгсийн сан"} style={{ margin: 15, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={wordAdd}
          icon={<PlusCircleOutlined />}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Үг нэмэх
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Үг нэмэх"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="addWord"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinishWord}
          onFinishFailed={onFinishFailedWord}
          autoComplete="off"
        >
          <Form.Item
            label="Үндсэн хэл"
            name="language_id"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Үг"
            name="word"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Цагийн хэлбэр"
            name="type_id"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Үгийн үндэс"
            name="root_word_id"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Огноо"
            name="created_date"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ажилтан"
            name="created_by"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 17, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Шинээр нэмэх
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
