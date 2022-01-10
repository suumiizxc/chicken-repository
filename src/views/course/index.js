import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Spin,
  Divider,
  Col,
  Row,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export default function Index(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [wordLoader, setWordLoader] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [wordStates, setWordStates] = useState({
    isModalVisible: false,
    data: null,
    all_language: null,
    types: null,
    language_id: null,
    word_id: null,
    insertWord: {
      language_id: null,
      word: null,
      root_word_id: null,
      type_id: null,
      created_by: null,
      to_language_id: null,
      translation_to_origin: null,
      translations: {
        noun: null,
        verb: null,
        adjective: null,
        adverb: null,
        pronoun: null,
        preposition: null,
        conjunction: null,
        determiner: null,
        exclamation: null,
        modal_verb: null,
        phrasal_verb: null,
        idiom: null,
        auxilary_verb: null,
        phrase: null,
        example_1: null,
        example_2: null,
        example_3: null,
      },
    },
    editWord: {},
    deleteWord: {},
    editWordInit: {},
    action: null,
    rootWordLikely: [],
    rootWordEqually: [],
  });

  const EditDate = (date) => {
    const slitDate = date.split(" ");
    return slitDate[0];
  };

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
      key: "root_word_id",
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => <Space size="middle">{EditDate(text)}</Space>,
    },
    {
      title: "Ажилтан",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Үйлдэл",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topLeft"
            htmlType="submit"
            title={"Мэдээллийг устгахад итгэлтэй байна уу?"}
            onConfirm={() => {
              console.log("delete record", record);
              // runDeleteWord(record);
            }}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
          </Popconfirm>
          <Button
            onClick={() => {
              wordStates.isModalVisible = true;
              wordStates.editWord = record;
              wordStates.action = "EDIT";
              // getFormData(record);
              setWordStates({ ...wordStates });
              console.log("wordState editWords", wordStates.editWord);
            }}
            icon={<EditOutlined style={{ color: "#3e79f7" }} />}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log("course useffect");
  }, [wordStates.isModalVisible]);

  return (
    <Card title={"Курс"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={wordLoader}
        indicator={antIcon}
        style={{
          position: "absolute",
          top: "50%",
          left: "0%",
          marginTop: "-5.5rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            // onClick={wordAdd}
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
        {/* {wordStates.isModalVisible ? ( */}
        <Modal
          title="Үг нэмэх"
          width={"70%"}
          visible={wordStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            wordStates.isModalVisible = false;
            wordStates.action = null;
            setWordStates({ ...wordStates });
          }}
        >
          <Form
            form={form}
            name="addWord"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={onFinishCourse}
            // onFinishFailed={onFinishFailedWord}
            autoComplete="off"
          >
            <Row>
              <Divider>Word add</Divider>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Үг"
                      name="word"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={"type_id"}
                      label="Цагын хэлбэр"
                      // rules={[
                      //   { required: true, message: "Заавал бөглөнө үү!" },
                      // ]}
                    >
                      <Select
                        placeholder="Цагын хэлбэрээ сонгоно уу"
                        defaultValue={null}
                        // onChange={onTypeChange}
                        allowClear
                      >
                        {wordStates.types &&
                          wordStates.types.map((type, i) => (
                            <Option key={i} value={type.id}>
                              {type.full_name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Үгийн үндэс" name="root_word_id">
                      <Input disabled={!wordStates.type_id} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Divider>Word translation</Divider>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item label={"noun"} name={"noun"}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={"modal_verb"} name={"modal_verb"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 17, span: 7 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Хадгалах
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </Card>
  );
}
