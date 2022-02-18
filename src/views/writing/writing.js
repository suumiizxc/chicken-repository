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
    getAllWritingAPI,
    insertWritingAPI,
    updateWritingAPI,
    deleteWritingAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [writingStates, setWritingStates] = useState({
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
      title : "Нэр",
      dataIndex : "name",
      key :"name"
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
                    deleteWritingData(record);
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
                    writingStates.action = "EDIT";
                    // setWritingStates({ ...writingStates });
                    // getAllWriting(record);
                    writingStates.updateData = record;
                    writingStates.id = record.id;
                    writingStates.isModalVisible = true;
                    getFormData(record);
                    setWritingStates({ ...writingStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
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
      name: record.name,
    });
  };

  //GET All writing list
  const getAllWriting = () => {
    writingStates.loader = true;
    setWritingStates({ writingStates });
    getAllWritingAPI(writingStates.token)
      .then((res) => {
        writingStates.loader = false;
        setWritingStates({ writingStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingStates.data = res.data.data;
          setWritingStates({ ...writingStates });
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

  const insertWritingData = (values) => {
      writingStates.loader = true;
      setWritingStates({writingStates})
      insertWritingAPI(values, writingStates.token)
        .then((res) => {
            writingStates.loader = false;
            setWritingStates({writingStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                writingStates.insertData = res.data.data;
                setWritingStates({ ...writingStates });
                getAllWriting()
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

  const updateWritingData = (values) => {
      writingStates.loader = true;
      setWritingStates({writingStates})
      updateWritingAPI(values, writingStates.token)
        .then((res) => {
            writingStates.loader = false;
            setWritingStates({writingStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                writingStates.updateData = res.data.data;
                setWritingStates({ ...writingStates });
                getAllWriting()
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
  

  const deleteWritingData = (values) => {
      writingStates.loader = true; 
      setWritingStates({writingStates})
      deleteWritingAPI(values.id, writingStates.token)
        .then((res) => {
            writingStates.loader = false;
            setWritingStates({writingStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                writingStates.updateData = res.data.data;
                setWritingStates({ ...writingStates });
                getAllWriting()
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

      writingStates.isModalVisible = false;
      if (writingStates.action == "ADD_WRITING") {
          insertWritingData(values);
          getAllWriting();
      } else if (writingStates.action == "EDIT") {
          var updObj = {id : writingStates.id, name : values.name};
          updateWritingData(updObj);
          getFormData({name:""})
          getAllWriting();
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    writingStates.isModalVisible = true;
    writingStates.action = "ADD_WRITING";
    setWritingStates({ ...writingStates });
  };


  useEffect(() => {
    console.log("writing useffect");
    getAllWriting();
  }, []);

return (
    <Card title={"Writing"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={writingStates.loader}
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
            Writing нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={writingStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={writingStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            writingStates.isModalVisible = false;
            writingStates.action = null;
            setWritingStates({ ...writingStates });
          }}
        >
         {(() => {   
             if(writingStates.action == "EDIT") {
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
                                    <Col span={12}>
                                        <Form.Item
                                        name={"name"}
                                        label="Нэр"
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
                )
             } else if(writingStates.action == "ADD_WRITING") {
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
                                   <Col span={12}>
                                       <Form.Item
                                       name={"name"}
                                       label="Нэр"
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
               )
            } 
          
            })()}
        </Modal>
      </Spin>
    </Card>
  );
}