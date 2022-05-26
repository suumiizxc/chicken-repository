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
  Divider,
  Tooltip,
  Descriptions
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FullscreenOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import {
    getAllListeningAnswerByQuestionAPI,
    insertListeningAnswerAPI,
    deleteListeningAnswerAPI,
    updateListeningListeningAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [listeningQuestionStates, setListeningQuestionStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    insertData: null,
    id : null,
    updateData:{
        id : null
    },
  });
  const columns = [
    {
      title : "Id",
      dataIndex : "id",
      key :"id"
    },
    {
      title : "Question id",
      dataIndex : "question_id",
      key :"question_id"
    },
    {
      title : "Answer",
      dataIndex : "answer",
      key :"answer"
    },
    {
      title : "Is true",
      dataIndex : "is_true",
      render:(text) => <a>{text !== 0 ? "Буруу" : "Зөв"}</a>,
    },
    {
      title : "Is active",
      dataIndex : "is_active",
      render:(text) => <a>{text !== 0 ? "Идэвхгүй" : "Идэвхтэй"}</a>,
    },
    {
      title : "ordering",
      dataIndex : "ordering",
      key :"ordering"
    },
    {
        title : "Үйлдэл",
        key : "action",
        fixed : "right",
        width : 100,
        render: (text, record) => (
            <Space size="middle">
                <Popconfirm
                    placement="topLeft"
                    htmlType="submit"
                    title={"Мэдээллийг устгахад итгэлтэй байна уу?"}
                    onConfirm={() => {
                    console.log("delete record", record);
                    deleteWritingVideoData(record.id);
                    }}
                    okText="Тийм"
                    cancelText="Үгүй"
                >
                    <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
                </Popconfirm>
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    listeningQuestionStates.action = "EDIT";
                    // setListeningQuestionStates({ ...listeningQuestionStates });
                    // getAllWriting(record);
                    listeningQuestionStates.updateData = record;
                    listeningQuestionStates.id = record.id;
                    listeningQuestionStates.isModalVisible = true;
                    getFormData(record);
                    setListeningQuestionStates({ ...listeningQuestionStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                {/* <Tooltip placement="topRight" title="Question руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/content/writing-video-cue");
                        props.courseIds.writingVideoId = record.id;
                        props.setCourseIds({ ...props.courseIds });
                    }}
                    icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
                    />
                </Tooltip> */}
            </Space>
        )
    }
    
  ]

  const getFormData = (record) => {
  
    // setIntroVideoCueStates({ ...introVideoCueStates });
    form.setFieldsValue({
        answer : record.answer,
        is_true : record.is_true,
        is_active : record.is_active, 
        ordering : record.ordering
    });
  };

  //GET All writing list
  const getAllWritingVideo = (id) => {
    listeningQuestionStates.loader = true;
    setListeningQuestionStates({ listeningQuestionStates });
    getAllListeningAnswerByQuestionAPI(id,listeningQuestionStates.token)
      .then((res) => {
        listeningQuestionStates.loader = false;
        setListeningQuestionStates({ listeningQuestionStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningQuestionStates.data = res.data.data;
          setListeningQuestionStates({ ...listeningQuestionStates });
          console.log("success all writing", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа ");
        console.log(e);
      });
  };

  const deleteWritingVideoData = (id) => {
    listeningQuestionStates.loader = true;
    setListeningQuestionStates({listeningQuestionStates})
    deleteListeningAnswerAPI(id, listeningQuestionStates.token)
    .then((res) => {
      listeningQuestionStates.loader = false;
      setListeningQuestionStates({ listeningQuestionStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // listeningQuestionStates.data = res.data.data;
        getAllWritingVideo(props.courseIds.listeningQuestionId);
        setListeningQuestionStates({ ...listeningQuestionStates });
        console.log("success delete writing", res.data.data);
        // getAllWritingVideo(props.courseIds.listeningId);
      } else {
        //unsuccessful
        message.error("Алдаа гарлаа");
      }
    })
    .catch((e) => {
      //unsuccessful
      props.setLoader(false);
      message.error("Алдаа гарлаа ");
      console.log(e);
    });
  }


  const insertListeningCue = () => {
    
    listeningQuestionStates.action = "ADD_LISTENING_CUE";
    listeningQuestionStates.isModalVisible = true;
    setListeningQuestionStates({ ...listeningQuestionStates });
  };


  const insertListeningCueData = (data) => {
    listeningQuestionStates.loader = true;
    setListeningQuestionStates({listeningQuestionStates})
    insertListeningAnswerAPI(data, listeningQuestionStates.token)
      .then((res) => {
        listeningQuestionStates.loader = false;
        setListeningQuestionStates({listeningQuestionStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningQuestionStates.insertData = res.data.data;
          getAllWritingVideo(props.courseIds.listeningQuestionId);
          setListeningQuestionStates({ ...listeningQuestionStates });
          console.log("success all writing", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Сумъяад мэдэгдэнэ үү");
        console.log(e);
      })
  }

  const updateListeningCueData = (data) => {
    listeningQuestionStates.loader = true;
    setListeningQuestionStates({listeningQuestionStates})
    updateListeningListeningAPI(data, listeningQuestionStates.token)
      .then((res) => {
        listeningQuestionStates.loader = false;
        setListeningQuestionStates({listeningQuestionStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningQuestionStates.updateData = res.data.data;
          getAllWritingVideo(props.courseIds.listeningQuestionId);
          setListeningQuestionStates({ ...listeningQuestionStates });
          console.log("success update writing", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Сумъяад мэдэгдэнэ үү");
        console.log(e);
      })
  }


  const onFinishListening = (values) => {
      console.log("on finish writing")
      if(listeningQuestionStates.action == "ADD_LISTENING_CUE") {
        var insertObj = {question_id : props.courseIds.listeningQuestionId, answer : values.answer, is_true : parseInt(values.is_true), is_active : parseInt(values.is_active),  ordering : parseInt(values.ordering)};
        insertListeningCueData(insertObj)
        // getAllWritingVideo(props.courseIds.listeningCueId);
        form.resetFields();
        
      } else if (listeningQuestionStates.action == "EDIT") {
        var updateObj = {id : listeningQuestionStates.id, question_id : props.courseIds.listeningQuestionId, answer : values.answer, is_true : parseInt(values.is_true), is_active : parseInt(values.is_active), ordering : parseInt(values.ordering)};
        console.log("PISDAAAADASDADA : ", updateObj)
        updateListeningCueData(updateObj)
        // getAllWritingVideo(props.courseIds.listeningCueId);
      }
      listeningQuestionStates.isModalVisible = false;
      setListeningQuestionStates({ ...listeningQuestionStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideo(props.courseIds.listeningQuestionId);
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={listeningQuestionStates.loader}
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
            onClick={() => {
              navigate("/content/listening");
            }}
            icon={<RollbackOutlined />}
            // type="alert"
            style={{
              marginBottom: 16,
              marginRight: 16,
              backgroundColor: "#FAAD14",
              color: "#FFFFFF",
            }}
          >
            Буцах
          </Button>
          <Button
            onClick={insertListeningCue}
            icon={<PlusCircleOutlined />}
            // type="alert"
            style={{
              marginBottom: 16,
              marginRight: 16,
              backgroundColor: "#3F79F7",
              color: "#FFFFFF",
            }}
          >
            Listening answer нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={listeningQuestionStates.data} />
        <Modal
          title="Listening answer нэмэх"
          width={"90%"}
          visible={listeningQuestionStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            listeningQuestionStates.isModalVisible = false;
            listeningQuestionStates.action = null;
            setListeningQuestionStates({ ...listeningQuestionStates });
          }}
        >
          {(() => {   
            if(listeningQuestionStates.action == "EDIT") {
              return (
            <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishListening}
              onFinishFailed={onFinishFailedWriting}
              autoComplete="off"
            >
                  <Row>
                      <Col span={24}>
                          <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"answer"}
                                  label="Answer"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_true"}
                                  label="Is true"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_active"}
                                  label="Is active"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"ordering"}
                                  label="ordering"
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
            )
            } else if (listeningQuestionStates.action == "ADD_LISTENING_CUE") {
              return(
              <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishListening}
              onFinishFailed={onFinishFailedWriting}
              autoComplete="off"
            >
                  <Row>
                  <Divider>Add answer</Divider>
                      <Col span={24}>
                          <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"answer"}
                                  label="Answer"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_true"}
                                  label="Is true"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_active"}
                                  label="Is active"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"ordering"}
                                  label="Ordering"
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
              )}
           })()}
        </Modal>
      </Spin>
    </Card>
  );
}