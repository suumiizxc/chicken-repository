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
    getAllWritingVideoByWIDAPI,
    insertWritingVideoAPI,
    deleteWritingVideoAPI,
    updateWritingVideoAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [writingVideoStates, setWritingVideoStates] = useState({
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
      title : "Writing Id",
      dataIndex : "writing_id",
      key :"writing_id"
    },
    {
        title : "Host Url",
        dataIndex : "host_url",
        key : "host_url",
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key : "ordering",
    },
    {
        title : "IsActive",
        dataIndex : "is_active",
        key : "is_active",
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
                    writingVideoStates.action = "EDIT";
                    // setWritingVideoStates({ ...writingVideoStates });
                    // getAllWriting(record);
                    writingVideoStates.updateData = record;
                    writingVideoStates.id = record.id;
                    writingVideoStates.isModalVisible = true;
                    getFormData(record);
                    setWritingVideoStates({ ...writingVideoStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                <Tooltip placement="topRight" title="Видео руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/content/writing-video");
                        props.courseIds.writingId = record.id;
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
        ordering : record.ordering,
        is_active : record.is_active,
    });
  };

  //GET All writing list
  const getAllWritingVideo = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({ writingVideoStates });
    getAllWritingVideoByWIDAPI(id,writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({ writingVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.data = res.data.data;
          setWritingVideoStates({ ...writingVideoStates });
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
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    deleteWritingVideoAPI(id, writingVideoStates.token)
    .then((res) => {
      writingVideoStates.loader = false;
      setWritingVideoStates({ writingVideoStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // writingVideoStates.data = res.data.data;
        getAllWritingVideo(props.courseIds.writingId);
        setWritingVideoStates({ ...writingVideoStates });
        console.log("success delete writing", res.data.data);
        getAllWritingVideo(props.courseIds.writingId);
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


  const insertWritingVideo = () => {
    
    writingVideoStates.action = "ADD_WRITING_VIDEO";
    writingVideoStates.isModalVisible = true;
    setWritingVideoStates({ ...writingVideoStates });
  };


  const insertWritingVideoData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    insertWritingVideoAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.insertData = res.data.data;
          setWritingVideoStates({ ...writingVideoStates });
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

  const updateWritingVideoData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    updateWritingVideoAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.updateData = res.data.data;
          setWritingVideoStates({ ...writingVideoStates });
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


  const onFinishVideoWriting = (values) => {
      console.log("on finish writing")
      if(writingVideoStates.action == "ADD_WRITING_VIDEO") {
        var insertObj = {writing_id : props.courseIds.writingId, host_url : values.host_url, ordering : parseInt(values.ordering), is_active : parseInt(values.is_active)};
        insertWritingVideoData(insertObj)
        getAllWritingVideo(props.courseIds.writingId);
        
      } else if (writingVideoStates.action == "EDIT") {
        var updateObj = {id : writingVideoStates.id, writing_id : props.courseIds.writingId, host_url : values.host_url, ordering : parseInt(values.ordering), is_active : parseInt(values.is_active)};
        console.log("PISDAAAADASDADA : ", updateObj)
        updateWritingVideoData(updateObj)
        getAllWritingVideo(props.courseIds.writingId);
      }
      writingVideoStates.isModalVisible = false;
      setWritingVideoStates({ ...writingVideoStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideo(props.courseIds.writingId);
  }, []);

return (
    <Card title={"Writing"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={writingVideoStates.loader}
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
              navigate("/content/writing");
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
            onClick={insertWritingVideo}
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
        <Table columns={columns} dataSource={writingVideoStates.data} />
        <Modal
          title="Writing видео нэмэх"
          width={"90%"}
          visible={writingVideoStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            writingVideoStates.isModalVisible = false;
            writingVideoStates.action = null;
            setWritingVideoStates({ ...writingVideoStates });
          }}
        >
          {(() => {   
            if(writingVideoStates.action == "EDIT") {
              return (
            <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishVideoWriting}
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
                                  name={"ordering"}
                                  label="Ordering"
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
            } else if (writingVideoStates.action == "ADD_WRITING_VIDEO") {
              return(
              <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishVideoWriting}
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
                                  name={"ordering"}
                                  label="Ordering"
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