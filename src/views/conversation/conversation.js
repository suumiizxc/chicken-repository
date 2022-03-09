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
    getAllConversationAPI,
    insertConversationAPI,
    updateConversationAPI,
    deleteConversationAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [conversationStates, setConverstationStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    insertData: null,
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
        title : "Name",
        dataIndex :"name",
        key : "name",
    },
    {
        title : "Url",
        dataIndex : "url",
        key : "url",
    },
    {
      title : "Host source",
      dataIndex : "host_source",
      key :"host_source"
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
                    title={"Мэдээллийг устгахад итгэлтэй байна уу? 🤔🤔🤔"}
                    onConfirm={() => {
                    console.log("delete record", record);
                    deleteListeningData(record);
                    }}
                    okText="Тийм"
                    cancelText="Үгүй"
                >
                    <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
                </Popconfirm>
                <Tooltip placement="topRight" title="Засах">
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    conversationStates.action = "EDIT";
                    // setConverstationStates({ ...conversationStates });
                    // getAllPPVContent(record);
                    conversationStates.updateData = record;
                    conversationStates.id = record.id;
                    conversationStates.isModalVisible = true;
                    getFormData(record);
                    setConverstationStates({ ...conversationStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/conversation-cue");
                        props.courseIds.conversationId = record.id;
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
      name : record.name, 
      url : record.url,
      host_source : record.host_source,
    });
  };

  //GET All writing list
  const getAllPPVContent = () => {
    conversationStates.loader = true;
    setConverstationStates({ conversationStates });
    getAllConversationAPI(conversationStates.token)
      .then((res) => {
        conversationStates.loader = false;
        setConverstationStates({ conversationStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          conversationStates.data = res.data.data;
          setConverstationStates({ ...conversationStates });
          console.log("success all writing", conversationStates);
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

  const insertListeningData = (values) => {
      conversationStates.loader = true;
      setConverstationStates({conversationStates})
      insertConversationAPI(values, conversationStates.token)
        .then((res) => {
            conversationStates.loader = false;
            setConverstationStates({conversationStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                conversationStates.insertData = res.data.data;
                setConverstationStates({ ...conversationStates });
                getAllPPVContent()
                form.resetFields()
                console.log("success insert writing", res.data.data);
                message.success("Амжилттай writing хадгаллаа 😍😊✅")
              } else {
                //unsuccessful
                message.error("Алдаа гарлаа 😭😓🪲")
            }
        })
        .catch((e) => {
            //unsuccessful
            props.setLoader(false);
            message.error("Алдаа гарлаа ");
            console.log(e);
          });
  }

  const updateListeningData = (values) => {
      conversationStates.loader = true;
      setConverstationStates({conversationStates})
      updateConversationAPI(values, conversationStates.token)
        .then((res) => {
            conversationStates.loader = false;
            setConverstationStates({conversationStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                conversationStates.updateData = res.data.data;
                setConverstationStates({ ...conversationStates });
                getAllPPVContent()
                console.log("success insert writing", res.data.data);
                message.success("Амжилттай writing хадгаллаа 😍😊✅")
              } else {
                //unsuccessful
                message.error("Алдаа гарлаа");
            }
        })
        .catch((e) => {
            props.setLoader(false);
            message.error("Алдаа гарлаа 😭😓🪲")
            console.log(e)
        })
  }
  

  const deleteListeningData = (values) => {
      conversationStates.loader = true; 
      setConverstationStates({conversationStates})
      deleteConversationAPI(values.id, conversationStates.token)
        .then((res) => {
            conversationStates.loader = false;
            setConverstationStates({conversationStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                conversationStates.updateData = res.data.data;
                setConverstationStates({ ...conversationStates });
                getAllPPVContent()
                console.log("success insert writing", res.data.data);
                message.success("Амжилттай writing устгав 😍😊✅")
              } else {
                //unsuccessful
                message.error("Алдаа гарлаа");
            }
        })
        .catch((e) => {

        })
  }

  const onFinishWriting = (values) => {
      console.log("on finish writing : ", values);

      conversationStates.isModalVisible = false;
      if (conversationStates.action == "ADD_LISTENING") {
          var inObj = {name : values.name, url : values.url, host_source : parseInt(values.host_source)};
          insertListeningData(inObj);
          getAllPPVContent();
      } else if (conversationStates.action == "EDIT") {
          var updObj = {id : conversationStates.id, name : values.name, url : values.url, host_source : parseInt(values.host_source)};
          updateListeningData(updObj);
          getAllPPVContent();
      }
      form.resetFields();
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    conversationStates.isModalVisible = true;
    conversationStates.action = "ADD_LISTENING";
    setConverstationStates({ ...conversationStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllPPVContent();
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={conversationStates.loader}
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
            onClick={insertWriting}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Conversation нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={conversationStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={conversationStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            conversationStates.isModalVisible = false;
            conversationStates.action = null;
            setConverstationStates({ ...conversationStates });
          }}
        >
         {(() => {   
             if(conversationStates.action == "EDIT") {
                 return (
                    <Form
                    form={form}
                    name="addWord"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishWriting}
                    onFinishFailed={onFinishFailedWriting}
                    autoComplete="off"
                  >
                        <Row>
                           <Col span={24}>
                           <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"name"}
                                  label="Name"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"url"}
                                  label="Url"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"host_source"}
                                  label="Host source"
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
             } else if(conversationStates.action == "ADD_LISTENING") {
                return (
                   <Form
                   form={form}
                   name="addWord"
                   labelCol={{ span: 8 }}
                   wrapperCol={{ span: 16 }}
                   initialValues={{ remember: true }}
                   onFinish={onFinishWriting}
                   onFinishFailed={onFinishFailedWriting}
                   autoComplete="off"
                 >
                       <Row>
                           <Col span={24}>
                           <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"name"}
                                  label="Name"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"url"}
                                  label="Url"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"host_source"}
                                  label="Host source"
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
            } 
          
            })()}
        </Modal>
      </Spin>
    </Card>
  );
}