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
    getAllWritingVideoCueByVIDAPI,
    getAllWritingVideoCueMissWordByCIDAPI,
    insertWritingVideoCueAPI,
    insertWritingVideoCueMissWordAPI,
    deleteWritingVideoCueAPI,
    deleteWritingVideoCueMissWordAPI,
    updateWritingVideoCueAPI,
    updateWritingVideoCueMissWordAPI,
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
    maxOrdering : 1, 
    writingVideoId : null,
    writingVideoCueId : null,
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
      title : "Cue id",
      dataIndex : "cue_id",
      key : "cue_id"  
    },
    {
      title : "Ordering",
      dataIndex : "ordering",
      key : "ordering"  
    },
    {
      title : "Main text",
      dataIndex : "main_text",
      key : "main_text",  
    },
    {
        title : "Word value",
        dataIndex : "word_value",
        key : "word_value",  
    },
    {
        title : "Space next",
        dataIndex : "space_next",
        key : "space_next",  
    },
    {
        title : "Is visible",
        dataIndex : "is_visible",
        key : "is_visible",  
    },
    {
        title : "Has hint",
        dataIndex : "has_hint",
        key : "has_hint",  
    },
    {
        title : "Hint text",
        dataIndex : "hint_text",
        key : "hint_text",  
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
                    deleteWritingVideoCueData(record.id);
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
                {/* <Tooltip placement="topRight" title="Видео руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/content/writing-video-cue-miss-word");
                        props.courseIds.writingVideoCueId = record.id;
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
        id : record.id,
        cue_id : record.cue_id,
        ordering : record.ordering,
        main_text : record.main_text,
        word_value : record.word_value,
        space_next : record.space_next,
        is_visible : record.is_visible,
        has_hint : record.has_hint,
        hint_text : record.hint_text,
    });
  };

  //GET All writing list
  const getAllWritingVideoCue = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({ writingVideoStates });
    getAllWritingVideoCueMissWordByCIDAPI(id,writingVideoStates.token)
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

  const deleteWritingVideoCueData = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    deleteWritingVideoCueMissWordAPI(id, writingVideoStates.token)
    .then((res) => {
      writingVideoStates.loader = false;
      setWritingVideoStates({ writingVideoStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // writingVideoStates.data = res.data.data;
        // getAllWritingVideoCue(props.courseIds.writingId);
        // setWritingVideoStates({ ...writingVideoStates });
        // console.log("success delete writing", res.data.data);
        message.success("Амжилттай устгалаа")
        getAllWritingVideoCue(writingVideoStates.writingVideoCueId);
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
    
    writingVideoStates.action = "ADD_WRITING_VIDEO_CUE";
    writingVideoStates.isModalVisible = true;
    getFormData({
        id : "",
        cue_id : "",
        ordering : "",
        main_text : "",
        word_value : "",
        space_next : "",
        is_visible : "",
        has_hint : "",
        hint_text : "",
    })
    setWritingVideoStates({ ...writingVideoStates });
  };


  const insertWritingVideoCueData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    insertWritingVideoCueMissWordAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.insertData = res.data.data;
          getAllWritingVideoCue(props.courseIds.writingVideoCueId);
          setWritingVideoStates({ ...writingVideoStates });
          console.log("success all writing", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа ");
        console.log(e);
      })
  }

  const updateWritingVideoCueData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    updateWritingVideoCueMissWordAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.updateData = res.data.data;
          getAllWritingVideoCue(props.courseIds.writingVideoCueId);
          setWritingVideoStates({ ...writingVideoStates });
          message.success("Амжилттай заслаа")
          console.log("success update writing", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа");
        console.log(e);
      })
  }


  const onFinishVideoWriting = (values) => {
      console.log("on finish writing")
      if(writingVideoStates.action == "ADD_WRITING_VIDEO_CUE") {
        var insertObj = {
            cue_id : props.courseIds.writingVideoCueId,
            ordering : parseInt(values.ordering),
            main_text : values.main_text,
            word_value : values.word_value,
            space_next : parseInt(values.space_next),
            is_visible : parseInt(values.is_visible),
            has_hint : parseInt(values.has_hint),
            hint_text : values.hint_text,
        };
        insertWritingVideoCueData(insertObj)
        getAllWritingVideoCue(writingVideoStates.writingVideoCueId);
        
      } else if (writingVideoStates.action == "EDIT") {
        var updateObj = {
            id : writingVideoStates.id, 
            cue_id : props.courseIds.writingVideoCueId,
            ordering : parseInt(values.ordering),
            main_text : values.main_text,
            word_value : values.word_value,
            space_next : parseInt(values.space_next),
            is_visible : parseInt(values.is_visible),
            has_hint : parseInt(values.has_hint),
            hint_text : values.hint_text,
        };
        console.log("UPDATE OBJ : ", updateObj)
        updateWritingVideoCueData(updateObj)
        getAllWritingVideoCue(props.courseIds.writingVideoCueId);
      }
      writingVideoStates.isModalVisible = false;
      setWritingVideoStates({ ...writingVideoStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideoCue(props.courseIds.writingVideoCueId);
    writingVideoStates.writingVideoCueId = props.courseIds.writingVideoCueId;

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
            Writing видео cue нэмэх
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
                  <Divider>Word add</Divider>
                      <Col span={24}>
                          <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"cue_id"}
                                  label="Cue id"
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
                                  name={"main_text"}
                                  label="Main text"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"video_id"}
                                  label="Video id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
                              <Col span={8}>
                                  <Form.Item
                                  name={"word_value"}
                                  label="Word value"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"space_next"}
                                  label="Space next"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_visible"}
                                  label="Is visible"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"has_hint"}
                                  label="Has hint"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"hint_text"}
                                  label="Hint text"
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
            } else if (writingVideoStates.action == "ADD_WRITING_VIDEO_CUE") {
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
                                  name={"ordering"}
                                  label="Ordering"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"main_text"}
                                  label="Main text"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"word_value"}
                                  label="Word value"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"space_next"}
                                  label="Space next"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_visible"}
                                  label="Is visible"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"has_hint"}
                                  label="Has hint"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"hint_text"}
                                  label="Hint text"
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