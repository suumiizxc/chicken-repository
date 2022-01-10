import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Divider,
  Col,
  Row,
  message,
  Card,
  Spin,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import CustomLoader from "../../../components/Loader";
import CardLarge from "../../../components/CardLarge";
import {
  deleteIntoVideoAPI,
  getAllIntoVideo,
  insertIntoVideoAPI,
  updateIntoVideoAPI,
} from "../../../services/Course_service";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();

  const [introVideoStates, setIntroVideoStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    checkBoxOptions: ["YouTube", "Amazon"],
    insertData: {},
    updateData: {},
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Зам",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Эх сурвалж/хост/",
      dataIndex: "host_source",
      key: "host_source",
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
              deleteIntroVideo(record);
            }}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
          </Popconfirm>
          <Button
            onClick={() => {
              console.log("edit intro video records==>", record);
              console.log("introVideoStates updateIntroVideo");
              getFormData(record);
              introVideoStates.action = "EDIT";
              introVideoStates.isModalVisible = true;
              introVideoStates.updateData = record;
              setIntroVideoStates({ ...introVideoStates });
            }}
            icon={<EditOutlined style={{ color: "#3e79f7" }} />}
          />
        </Space>
      ),
    },
  ];

  const getFormData = (record) => {
    form.setFieldsValue({
      name: record.name,
      url: record.url,
      host_source: record.host_source,
    });
  };

  //GET All intro video list
  const getAllIntroData = () => {
    introVideoStates.loader = true;
    setIntroVideoStates({ introVideoStates });
    getAllIntoVideo(introVideoStates.token)
      .then((res) => {
        introVideoStates.loader = false;
        setIntroVideoStates({ introVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          introVideoStates.data = res.data.data;
          setIntroVideoStates({ ...introVideoStates });
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео авах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео авах үед/");
        console.log(e);
      });
  };

  const insertIntroVideoClicked = () => {
    introVideoStates.isModalVisible = true;
    setIntroVideoStates({ ...introVideoStates });
  };

  const insertIntroVideo = (values) => {
    console.log("insert data values", values);
    introVideoStates.loader = true;
    setIntroVideoStates({ introVideoStates });
    introVideoStates.insertData = {
      name: values.name,
      url: values.url,
      host_source: introVideoStates.host_source,
    };
    insertIntoVideoAPI(introVideoStates.insertData, introVideoStates.token)
      .then((res) => {
        introVideoStates.loader = false;
        setIntroVideoStates({ introVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай интро видео нэмэгдлээ");
          console.log("success all language", res.data.data);
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео нэмэх үед/");
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        introVideoStates.loader = false;
        setIntroVideoStates({ ...introVideoStates });
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео нэмэх үед/");
        form.resetFields();
        console.log(e);
      });
  };

  const deleteIntroVideo = (values) => {
    deleteIntoVideoAPI(values.id, introVideoStates.token)
      .then((res) => {
        introVideoStates.loader = false;
        setIntroVideoStates({ introVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай устгагдлаа");
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        console.log(e);
      });
  };

  const updateIntroVideo = (value) => {
    introVideoStates.updateData = {
      id: value.id,
      name: value.name,
      url: value.url,
      host_source: value.host_source ? value.host_source[0] : "",
    };
    updateIntoVideoAPI(introVideoStates.updateData, introVideoStates.token)
      .then((res) => {
        introVideoStates.loader = false;
        setIntroVideoStates({ introVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай засагдлаа");
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        console.log(e);
      });
  };

  const onFinishIntroVideo = (values) => {
    console.log("onfinish");
    introVideoStates.isModalVisible = false;

    if (introVideoStates.action === "EDIT") {
      console.log("edit intro video running");
      updateIntroVideo(values);
    } else {
      console.log("insert intro video running");
      insertIntroVideo(values);
    }
  };

  const onFinishFailedIntroVideo = () => {
    console.log("onfinish failed");
  };

  const onChangeCheck = (checkedValues) => {
    console.log("checked values", checkedValues.toString());
    introVideoStates.host_source = checkedValues.toString();
    setIntroVideoStates({ ...introVideoStates });
  };
  useEffect(() => {
    console.log("intro video useffect");
    getAllIntroData();
  }, []);

  return (
    <Card title={"Интро видео"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={introVideoStates.loader}
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
            onClick={insertIntroVideoClicked}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Үг нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={introVideoStates.data} />
        <Modal
          title="Интро вилео"
          width={"50%"}
          visible={introVideoStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            introVideoStates.isModalVisible = false;
            introVideoStates.action = null;
            setIntroVideoStates({ ...introVideoStates });
          }}
        >
          <Form
            form={form}
            name="addWord"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishIntroVideo}
            onFinishFailed={onFinishFailedIntroVideo}
            autoComplete="off"
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Нэр"
                      name="name"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Үгийн үндэс"
                      name="url"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={19}>
                    <Form.Item
                      label="Эх сурвалж"
                      name="host_source"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Checkbox.Group
                        options={introVideoStates.checkBoxOptions}
                        defaultValue={[introVideoStates.host_source]}
                        onChange={onChangeCheck}
                      />
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
