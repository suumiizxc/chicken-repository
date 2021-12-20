import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { getWords, insertWord } from "../../services/main_service";

export default function Index(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [wordStates, setWordStates] = useState({
    isModalVisible: false,
    data: null,
    all_language: [
      {
        id: 55,
        name: "GERMAN",
      },
      {
        id: 23,
        name: "",
      },
      {
        id: 24,
        name: "ENGLISH",
      },
      {
        id: 25,
        name: "MONGOL",
      },
      {
        id: 26,
        name: "CHINESE",
      },
    ],
    types: [
      {
        id: 118,
        full_name: "plural",
        short_name: "plural",
      },
      {
        id: 119,
        full_name: "present continuous",
        short_name: "present continuous",
      },
      {
        id: 120,
        full_name: "present simple",
        short_name: "present simple",
      },
      {
        id: 121,
        full_name: "past simple",
        short_name: "past simple",
      },
      {
        id: 122,
        full_name: "past continuous",
        short_name: "past continuous",
      },
      {
        id: 27,
        full_name: "TEST",
        short_name: "TEST",
      },
    ],
    sendWord: {
      language_id: null,
      word: null,
      type_id: null,
      root_word_id: null,
      type_id: null,
      created_by: null,
    },
  });

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
          <Button
            onClick={() => {
              console.log("record", record);
            }}
            icon={<DeleteOutlined style={{ color: "#FF6B72" }} />}
          />
          <Button
            onClick={() => {
              console.log("record", record);
              wordStates.sendWord = record;
              // state.addEditOrganizationInit = Object.assign(
              //   {},
              //   state.addEditOrganization
              // );
              wordStates.isModalVisible = true;

              // setFields();
              setWordStates({ ...wordStates });
              console.log("wordState edit", wordStates);
            }}
            icon={<EditOutlined style={{ color: "#3e79f7" }} />}
          />
        </Space>
      ),
    },
  ];

  const wordAdd = () => {
    setWordStates({ ...wordStates, isModalVisible: true });
  };

  const onLanguageChange = (value) => {
    setWordStates({ ...wordStates, language_id: value });
    console.log("worDsTATE", wordStates.language_id);
  };

  const onTypeChange = (value) => {
    setWordStates({ ...wordStates, type_id: value });
    console.log("wordState type id", wordStates.type_id);
  };

  const handleCancel = () => {
    setWordStates({ ...wordStates, isModalVisible: false });
  };

  const onFinishFailedWord = (err) => {
    console.log("onFinishFailed", err);
  };

  const onFinishWord = (values) => {
    wordStates.sendWord = {
      language_id: parseInt(values.language_id),
      word: values.word,
      type_id: values.type_id,
      root_word_id: parseInt(values.root_word_id),
      type_id: values.type_id,
      created_by: parseInt(localStorage.getItem("user_id")),
    };
    setWordStates({ ...wordStates });
    insertWord(wordStates.sendWord, props.userData.token)
      .then((res) => {
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("success insert word");
          getAllWords();
          // form.resetFields();
        } else {
          //unsuccessful
          console.log("unsuccessfully insert word");
        }
      })
      .catch((e) => {
        //unsuccessful
        console.log(e);
      });
  };

  const getAllWords = () => {
    const token = localStorage.getItem("token");
    // props.setLoader(true);
    getWords(token)
      .then((res) => {
        if (res && res.data && res.data.status && res.data.status === true) {
          //success

          console.log("success all words");
          setWordStates({ ...wordStates, data: res.data.data });
        } else {
          //unsuccessful
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        console.log(e);
      });
  };
  useEffect(() => {
    console.log("word useffect");
    console.log("user token", props.userData.token);
    getAllWords();
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
      <Table columns={columns} dataSource={wordStates.data} />
      <Modal
        title="Үг нэмэх"
        visible={wordStates.isModalVisible}
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
            name={"language_id"}
            label="Үндсэн хэл"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Select
              placeholder="Үндсэг хэлээ сонгоно уу"
              defaultValue={
                wordStates.sendWord && wordStates.sendWord.id
                  ? wordStates.sendWord.language.id
                  : 1
              }
              onChange={onLanguageChange}
              allowClear
            >
              {wordStates.all_language &&
                wordStates.all_language.map((type) => (
                  <Option value={type.id}>{type.name}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Үг"
            name="word"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"type_id"}
            label="Цагын хэлбэр"
            rules={[{ required: true, message: "Заавал бөглөнө үү!" }]}
          >
            <Select
              placeholder="Цагын хэлбэрээ сонгоно уу"
              // defaultValue={""}
              onChange={onTypeChange}
              allowClear
            >
              {wordStates.types &&
                wordStates.types.map((type) => (
                  <Option value={type.id}>{type.full_name}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Үгийн үндэс"
            name="root_word_id"
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
