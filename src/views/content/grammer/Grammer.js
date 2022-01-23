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
  Tooltip,
} from "antd";
import {
  ArrowsAltOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  deleteGrammerAPI,
  getAllGrammerAPI,
  insertIntoGrammerAPI,
  updateGrammerAPI,
} from "../../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();

  const [grammerStates, setGrammerStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    id: null,
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
      title: "Монгол нэр",
      dataIndex: "name_mon",
      key: "name_mon",
    },
    {
      title: "Англи нэр",
      dataIndex: "name_eng",
      key: "name_eng",
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
          <Tooltip placement="topRight" title="Засах">
            <Button
              onClick={() => {
                console.log("edit intro video records==>", record);
                console.log("grammerStates updateIntroVideo");
                getFormData(record);
                grammerStates.action = "EDIT";
                grammerStates.isModalVisible = true;
                grammerStates.updateData = record;
                grammerStates.id = record.id;
                setGrammerStates({ ...grammerStates });
              }}
              icon={<EditOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip>
          {/* <Tooltip placement="topRight" title="Cue руу үсрэх">
            <Button
              onClick={() => {
                console.log("Cue button intro video records ID==>", record.id);
                navigate("/course/intro-cue-video");
                props.courseIds.introVideoId = record.id;
                props.setCourseIds({ ...props.courseIds });
              }}
              icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip> */}
        </Space>
      ),
    },
  ];

  const getFormData = (record) => {
    form.setFieldsValue({
      name_mon: record.name_mon,
      name_eng: record.name_eng,
    });
  };

  //GET All intro video list
  const getAllIntroData = () => {
    grammerStates.loader = true;
    setGrammerStates({ grammerStates });
    getAllGrammerAPI(grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          grammerStates.data = res.data.data;
          setGrammerStates({ ...grammerStates });
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
    grammerStates.isModalVisible = true;
    setGrammerStates({ ...grammerStates });
  };

  const insertIntroVideo = (values) => {
    console.log("insert data values", values);
    grammerStates.loader = true;
    setGrammerStates({ grammerStates });
    grammerStates.insertData = {
      name_mon: values.name_mon,
      name_eng: values.name_eng,
    };
    insertIntoGrammerAPI(grammerStates.insertData, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай grammer нэмэгдлээ");
          console.log("success all language", res.data.data);
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа / grammer нэмэх үед/");
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        grammerStates.loader = false;
        setGrammerStates({ ...grammerStates });
        props.setLoader(false);
        message.error("Алдаа гарлаа /grammer нэмэх үед/");
        form.resetFields();
        console.log(e);
      });
  };

  const deleteIntroVideo = (values) => {
    deleteGrammerAPI(values.id, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
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

  const updateIntroVideo = (values) => {
    console.log("update values", values);
    grammerStates.updateData = {
      id: grammerStates.id,
      name_mon: values.name_mon,
      name_eng: values.name_eng,
    };
    setGrammerStates({ ...grammerStates });
    updateGrammerAPI(grammerStates.updateData, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай засагдлаа");
          console.log("success all language", res.data.data);
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        console.log(e);
        form.resetFields();
      });
  };

  const onFinishIntroVideo = (values) => {
    console.log("onfinish");
    grammerStates.isModalVisible = false;

    if (grammerStates.action === "EDIT") {
      console.log("edit values", values);
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
    grammerStates.host_source = checkedValues.toString();
    setGrammerStates({ ...grammerStates });
  };
  useEffect(() => {
    console.log("intro video useffect");
    getAllIntroData();
  }, []);

  return (
    <Card title={"Дүрэм"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={grammerStates.loader}
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
            Дүрэм нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={grammerStates.data} />
        <Modal
          title="Дүрэм"
          width={"50%"}
          visible={grammerStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            grammerStates.isModalVisible = false;
            grammerStates.action = null;
            setGrammerStates({ ...grammerStates });
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
                      label="Монгол нэр"
                      name="name_mon"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Англи нэр"
                      name="name_eng"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
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
