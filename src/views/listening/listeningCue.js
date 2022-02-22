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
    getAllListeningCueByListeningAPI,
    insertListeningCueAPI,
    deleteListeningCueVideoAPI,
    updateListeningCueAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [listeningCueStates, setListeningCueStates] = useState({
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
      title : "Listening id",
      dataIndex : "listening_id",
      key :"listening_id"
    },
    {
      title : "Host url",
      dataIndex : "host_url",
      key :"host_url"
    },
    {
      title : "Host source type",
      dataIndex : "host_source_type",
      key :"host_source_type"
    },
    {
      title : "Is active",
      dataIndex : "is_active",
      key :"is_active"
    },
    {
      title : "Ordering",
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
                    listeningCueStates.action = "EDIT";
                    // setListeningCueStates({ ...listeningCueStates });
                    // getAllWriting(record);
                    listeningCueStates.updateData = record;
                    listeningCueStates.id = record.id;
                    listeningCueStates.isModalVisible = true;
                    getFormData(record);
                    setListeningCueStates({ ...listeningCueStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                <Tooltip placement="topRight" title="Question руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/content/listening-question");
                        props.courseIds.listeningCueId = record.id;
                        props.setCourseIds({ ...props.courseIds });
                    }}
                    icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
                    />
                </Tooltip>
            </Space>
        )
    }
    
  ]

  const getFormData = (record) => {
  
    // setIntroVideoCueStates({ ...introVideoCueStates });
    form.setFieldsValue({
        writing_id : record.writing_id,
        host_url : record.host_url,
        host_source_type : record.host_source_type,
        ordering : record.ordering,
        is_active : record.is_active,
    });
  };

  //GET All writing list
  const getAllWritingVideo = (id) => {
    listeningCueStates.loader = true;
    setListeningCueStates({ listeningCueStates });
    getAllListeningCueByListeningAPI(id,listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({ listeningCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.data = res.data.data;
          setListeningCueStates({ ...listeningCueStates });
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
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    deleteListeningCueVideoAPI(id, listeningCueStates.token)
    .then((res) => {
      listeningCueStates.loader = false;
      setListeningCueStates({ listeningCueStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // listeningCueStates.data = res.data.data;
        // getAllWritingVideo(props.courseIds.listeningId);
        setListeningCueStates({ ...listeningCueStates });
        console.log("success delete writing", res.data.data);
        getAllWritingVideo(props.courseIds.listeningId);
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
    
    listeningCueStates.action = "ADD_LISTENING_CUE";
    listeningCueStates.isModalVisible = true;
    setListeningCueStates({ ...listeningCueStates });
  };


  const insertListeningCueData = (data) => {
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    insertListeningCueAPI(data, listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({listeningCueStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.insertData = res.data.data;
          setListeningCueStates({ ...listeningCueStates });
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
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    updateListeningCueAPI(data, listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({listeningCueStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.updateData = res.data.data;
          // getAllWritingVideo(listeningCueStates.courseIds.listeningId);
          setListeningCueStates({ ...listeningCueStates });
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
      if(listeningCueStates.action == "ADD_LISTENING_CUE") {
        var insertObj = {listening_id : props.courseIds.listeningId, host_url : values.host_url, host_source_type : parseInt(values.host_source_type),  ordering : parseInt(values.ordering), is_active : parseInt(values.is_active)};
        insertListeningCueData(insertObj)
        getAllWritingVideo(props.courseIds.listeningId);
        
      } else if (listeningCueStates.action == "EDIT") {
        var updateObj = {id : listeningCueStates.id, listening_id : props.courseIds.listeningId, host_url : values.host_url, host_source_type : parseInt(values.host_source_type), ordering : parseInt(values.ordering), is_active : parseInt(values.is_active)};
        console.log("PISDAAAADASDADA : ", updateObj)
        updateListeningCueData(updateObj)
        getAllWritingVideo(props.courseIds.listeningId);
      }
      listeningCueStates.isModalVisible = false;
      setListeningCueStates({ ...listeningCueStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideo(props.courseIds.listeningId);
  }, []);

return (
    <Card title={"Writing"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={listeningCueStates.loader}
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
            Writing видео нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={listeningCueStates.data} />
        <Modal
          title="Writing видео нэмэх"
          width={"90%"}
          visible={listeningCueStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            listeningCueStates.isModalVisible = false;
            listeningCueStates.action = null;
            setListeningCueStates({ ...listeningCueStates });
          }}
        >
          {(() => {   
            if(listeningCueStates.action == "EDIT") {
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
                                  name={"host_url"}
                                  label="Host url"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"host_source_type"}
                                  label="Host source type"
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
            } else if (listeningCueStates.action == "ADD_LISTENING_CUE") {
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
                  <Divider>Word add</Divider>
                      <Col span={24}>
                          <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"host_url"}
                                  label="Host url"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"host_source_type"}
                                  label="Host source type"
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