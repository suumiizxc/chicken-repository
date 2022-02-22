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
    insertWritingVideoCueAPI,
    deleteWritingVideoCueAPI,
    updateWritingVideoCueAPI,
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
        title : "Start time",
        dataIndex : "start_time",
        key : "start_time",
    },
    {
        title : "End time",
        dataIndex : "end_time",
        key : "end_time",
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key : "ordering",
    },
    {
        title : "Video id",
        dataIndex : "video_id",
        key : "video_id",
    },
    
    {
        title : "From language id",
        dataIndex : "from_language_id",
        key : "from_language_id",
    },
    {
        title : "From language translation",
        dataIndex : "from_language_translation",
        key : "from_language_translation",
    },
    {
        title : "From language is default",
        dataIndex : "from_language_is_default",
        key : "from_language_is_default",
    },
    {
        title : "To language id",
        dataIndex : "to_language_id",
        key : "to_language_id",
    },
    {
        title : "To language translation",
        dataIndex : "to_language_translation",
        key : "to_language_translation",
    },
    {
        title : "To language is default",
        dataIndex : "to_language_is_default",
        key : "to_language_is_default",
    },
    {
        title : "Miss word required",
        dataIndex : "miss_word_required",
        key : "miss_word_required",
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
                <Tooltip placement="topRight" title="Видео руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/content/writing-video-cue-miss-word");
                        props.courseIds.writingVideoCueId = record.id;
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
        video_id : record.video_id,
        ordering : record.ordering,
        from_language_id : record.from_language_id,
        from_language_translation : record.from_language_translation,
        from_language_is_default : record.from_language_is_default,
        to_language_id : record.to_language_id,
        to_language_translation : record.to_language_translation,
        to_language_is_default : record.to_language_is_default,
        miss_word_required : record.miss_word_required,
        start_time : record.start_time,
        end_time : record.end_time,
    });
  };

  //GET All writing list
  const getAllWritingVideoCue = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({ writingVideoStates });
    getAllWritingVideoCueByVIDAPI(id,writingVideoStates.token)
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
    deleteWritingVideoCueAPI(id, writingVideoStates.token)
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
        getAllWritingVideoCue(writingVideoStates.writingVideoId);
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
        video_id : "",
        ordering : "",
        from_language_id : "",
        from_language_translation : "",
        from_language_is_default : "",
        to_language_id : "",
        to_language_translation : "",
        to_language_is_default : "",
        miss_word_required : "",
        start_time : "",
        end_time : "",
    })
    setWritingVideoStates({ ...writingVideoStates });
  };


  const insertWritingVideoCueData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    insertWritingVideoCueAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.insertData = res.data.data;
          getAllWritingVideoCue(props.courseIds.writingVideoId);
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
    updateWritingVideoCueAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.updateData = res.data.data;
          getAllWritingVideoCue(props.courseIds.writingVideoId);
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
        message.error("Алдаа гарлаа Сумъяад мэдэгдэнэ үү");
        console.log(e);
      })
  }


  const onFinishVideoWriting = (values) => {
      console.log("on finish writing")
      if(writingVideoStates.action == "ADD_WRITING_VIDEO_CUE") {
        var insertObj = {
            ordering : parseInt(values.ordering),
            video_id : parseInt(props.courseIds.writingVideoId), 
            from_language_id : parseInt(values.from_language_id),
            from_language_translation : values.from_language_translation,
            from_language_is_default : parseInt(values.from_language_is_default),
            to_language_id : parseInt(values.to_language_id),
            to_language_translation : values.to_language_translation,
            to_language_is_default : parseInt(values.to_language_is_default),
            miss_word_required : parseInt(values.miss_word_required),
            start_time : values.start_time,
            end_time : values.end_time,
        };
        insertWritingVideoCueData(insertObj)
        getAllWritingVideoCue(props.courseIds.writingVideoId);
        
      } else if (writingVideoStates.action == "EDIT") {
        var updateObj = {
            id : writingVideoStates.id, 
            ordering : parseInt(values.ordering),
            video_id : parseInt(writingVideoStates.updateData.video_id), 
            from_language_id : parseInt(values.from_language_id),
            from_language_translation : values.from_language_translation,
            from_language_is_default : parseInt(values.from_language_is_default),
            to_language_id : parseInt(values.to_language_id),
            to_language_translation : values.to_language_translation,
            to_language_is_default : parseInt(values.to_language_is_default),
            miss_word_required : parseInt(values.miss_word_required),
            start_time : values.start_time,
            end_time : values.end_time,
        };
        console.log("UPDATE OBJ : ", updateObj)
        updateWritingVideoCueData(updateObj)
        getAllWritingVideoCue(props.courseIds.writingVideoId);
      }
      writingVideoStates.isModalVisible = false;
      setWritingVideoStates({ ...writingVideoStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideoCue(props.courseIds.writingVideoId);
    writingVideoStates.writingVideoId = props.courseIds.writingVideoId;

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
                                  name={"start_time"}
                                  label="Start time"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"end_time"}
                                  label="End time"
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
                                  name={"from_language_id"}
                                  label="From language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"from_language_translation"}
                                  label="From language translation"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"from_language_is_default"}
                                  label="From language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"to_language_id"}
                                  label="To language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"to_language_translation"}
                                  label="To language translation"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"to_language_is_default"}
                                  label="To language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"miss_word_required"}
                                  label="Miss word required"
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
                                  name={"start_time"}
                                  label="Start time"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"end_time"}
                                  label="End time"
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
                                  name={"from_language_id"}
                                  label="From language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"from_language_translation"}
                                  label="From language translation"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"from_language_is_default"}
                                  label="From language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"to_language_id"}
                                  label="To language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"to_language_translation"}
                                  label="To language translation"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"to_language_is_default"}
                                  label="To language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"miss_word_required"}
                                  label="Miss word required"
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