import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
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
import {
  deleteMixedVideoAPI,
  getAllMixedVideoAPI,
  insertMixedVideoAPI,
  updateMixedVideoAPI,
} from "../../../services/Course_service";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();

  const [mixedVideoStates, setMixedVideoStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    id: null,
    action: null,
    host_source: null,
    host_source_youtube: null,
    host_source_amazon: null,
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
      title: "Видеоны Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Видеоны URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Видеоны хост",
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
              console.log("mixedVideoStates updateIntroVideo");
              getFormData(record);
              mixedVideoStates.action = "EDIT";
              mixedVideoStates.isModalVisible = true;
              mixedVideoStates.id = record.id;
              record.host_source == 1
                ? (mixedVideoStates.host_source_amazon = record.host_source)
                : (mixedVideoStates.host_source_youtube = record.host_source);
              mixedVideoStates.updateData = record;
              setMixedVideoStates({ ...mixedVideoStates });
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
    mixedVideoStates.loader = true;
    setMixedVideoStates({ mixedVideoStates });
    getAllMixedVideoAPI(mixedVideoStates.token)
      .then((res) => {
        mixedVideoStates.loader = false;
        setMixedVideoStates({ mixedVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          mixedVideoStates.data = res.data.data;
          setMixedVideoStates({ ...mixedVideoStates });
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
    mixedVideoStates.isModalVisible = true;
    setMixedVideoStates({ ...mixedVideoStates });
  };

  const insertIntroVideo = (values) => {
    console.log("insert data values", values);
    mixedVideoStates.loader = true;
    mixedVideoStates.host_source_youtube == null
      ? (mixedVideoStates.host_source = mixedVideoStates.host_source_amazon)
      : (mixedVideoStates.host_source = mixedVideoStates.host_source_youtube);

    setMixedVideoStates({ ...mixedVideoStates });
    mixedVideoStates.insertData = {
      name: values.name,
      url: values.url,
      host_source: mixedVideoStates.host_source,
    };
    insertMixedVideoAPI(mixedVideoStates.insertData, mixedVideoStates.token)
      .then((res) => {
        mixedVideoStates.loader = false;
        setMixedVideoStates({ mixedVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай интро видео нэмэгдлээ");
          console.log("success all language", res.data.data);
          mixedVideoStates.host_source_amazon = null;
          mixedVideoStates.host_source_youtube = null;
          setMixedVideoStates({ ...mixedVideoStates });
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео нэмэх үед/");
          mixedVideoStates.host_source_amazon = null;
          mixedVideoStates.host_source_youtube = null;
          setMixedVideoStates({ ...mixedVideoStates });
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        mixedVideoStates.loader = false;
        setMixedVideoStates({ ...mixedVideoStates });
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео нэмэх үед/");
        mixedVideoStates.host_source_amazon = null;
        mixedVideoStates.host_source_youtube = null;
        setMixedVideoStates({ ...mixedVideoStates });
        form.resetFields();
        console.log(e);
      });
  };

  const deleteIntroVideo = (values) => {
    deleteMixedVideoAPI(values.id, mixedVideoStates.token)
      .then((res) => {
        mixedVideoStates.loader = false;
        setMixedVideoStates({ mixedVideoStates });
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
    mixedVideoStates.host_source_youtube == null
      ? (mixedVideoStates.host_source = mixedVideoStates.host_source_amazon)
      : (mixedVideoStates.host_source = mixedVideoStates.host_source_youtube);
    mixedVideoStates.updateData = {
      id: mixedVideoStates.id,
      name: value.name,
      url: value.url,
      host_source: mixedVideoStates.host_source,
    };
    updateMixedVideoAPI(mixedVideoStates.updateData, mixedVideoStates.token)
      .then((res) => {
        mixedVideoStates.loader = false;
        setMixedVideoStates({ mixedVideoStates });
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
    mixedVideoStates.isModalVisible = false;

    if (mixedVideoStates.action === "EDIT") {
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

  const onChangeCheckYoutube = (checkedValues) => {
    console.log("checked values", checkedValues.target.defaultValue);
    mixedVideoStates.host_source_youtube == null
      ? (mixedVideoStates.host_source_youtube =
          checkedValues.target.defaultValue)
      : (mixedVideoStates.host_source_youtube = null);
    setMixedVideoStates({ ...mixedVideoStates });
  };
  const onChangeCheckAmazon = (checkedValues) => {
    console.log("checked values", checkedValues.target.defaultValue);
    mixedVideoStates.host_source_amazon == null
      ? (mixedVideoStates.host_source_amazon =
          checkedValues.target.defaultValue)
      : (mixedVideoStates.host_source_amazon = null);
    setMixedVideoStates({ ...mixedVideoStates });
  };
  useEffect(() => {
    console.log("intro video useffect");
    getAllIntroData();
  }, []);

  return (
    <Card title={"Mixed видео"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={mixedVideoStates.loader}
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
            Нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={mixedVideoStates.data} />
        <Modal
          title="Интро вилео"
          width={"50%"}
          visible={mixedVideoStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            mixedVideoStates.isModalVisible = false;
            mixedVideoStates.action = null;
            mixedVideoStates.host_source_amazon = null;
            mixedVideoStates.host_source_youtube = null;
            setMixedVideoStates({ ...mixedVideoStates });
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
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Form.Item
                      label="Youtube"
                      name={"host_source_youtube"}
                      labelCol={{ span: 18 }}
                    >
                      <Checkbox
                        onChange={onChangeCheckYoutube}
                        defaultValue={2}
                        checked={mixedVideoStates.host_source_youtube}
                        disabled={mixedVideoStates.host_source_amazon}
                      ></Checkbox>
                    </Form.Item>
                    <Form.Item
                      label="Amazon"
                      name={"host_source_amazon"}
                      labelCol={{ span: 18 }}
                    >
                      <Checkbox
                        onChange={onChangeCheckAmazon}
                        defaultValue={1}
                        checked={mixedVideoStates.host_source_amazon}
                        disabled={mixedVideoStates.host_source_youtube}
                      ></Checkbox>
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
