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
    getAllListeningAPI,
    insertListeningAPI,
    updateListeningAPI,
    deleteListeningAPI,
    reducedChickenAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [listeningStates, setListeningStates] = useState({
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
      title : "Birth date",
      dataIndex : "birth_date",
      key :"birth_date",
      render : (text, record) => {
        return `${text.split("T")[0]}`
      }
    },
    {
      title : "Average weight",
      dataIndex : "average_weight",
      key : "average_weight"
    },
    {
      title : "Location",
      dataIndex : "location",
      key : "location"
    },
    {
      title : "Birth Count",
      dataIndex : "total_count",
      key : "total_count",
    },
    {
      title : "Created at",
      dataIndex : "created_at",
      key : "created_at",
    },
    {
        title : "Үйлдэл",
        key : "action",
        fixed : "right",
        width : 100,
        render: (text, record) => (
            <Space size="middle">
                {/* <Popconfirm
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
                </Popconfirm> */}
                 <Tooltip placement="topRight" title="Reduced chicks">
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    listeningStates.action = "REDUCED";
                    // setListeningStates({ ...listeningStates });
                    // getAllListening(record);
                    listeningStates.updateData = record;
                    listeningStates.id = record.id;
                    listeningStates.isModalVisible = true;
                    getFormData(record);
                    setListeningStates({ ...listeningStates });
                    }}
                    icon={<MinusCircleOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="See reduced logs">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/chicken-reduce");
                        props.courseIds.chickenID = record.id;
                        props.setCourseIds({ ...props.courseIds });
                    }}
                    icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
                    />
                </Tooltip>
                <Tooltip placement="topRight" title="Add One day external chicks">
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    listeningStates.action = "EDIT";
                    // setListeningStates({ ...listeningStates });
                    // getAllListening(record);
                    listeningStates.updateData = record;
                    listeningStates.id = record.id;
                    listeningStates.isModalVisible = true;
                    getFormData(record);
                    setListeningStates({ ...listeningStates });
                    }}
                    icon={<PlusCircleOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="See add one day external chicks">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/chicken-one-day");
                        props.courseIds.chickenID = record.id;
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
      birth_date: record.birth_date,
      average_weight : record.average_weight,
      location : record.location,
      total_count : record.total_count,
      created_at : record.created_at,
    });
  };

  //GET All writing list
  const getAllListening = () => {
    listeningStates.loader = true;
    setListeningStates({ listeningStates });
    getAllListeningAPI(listeningStates.token)
      .then((res) => {
        listeningStates.loader = false;
        setListeningStates({ listeningStates });
        if (res && res.data ) {
          //success
          listeningStates.data = res.data.data;
          setListeningStates({ ...listeningStates });
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

  const insertListeningData = (values) => {
      listeningStates.loader = true;
      setListeningStates({listeningStates})
      insertListeningAPI(values, listeningStates.token)
        .then((res) => {
            listeningStates.loader = false;
            setListeningStates({listeningStates});
            if (res && res.data ) {
                //success
                listeningStates.insertData = res.data.data;
                setListeningStates({ ...listeningStates });
                getAllListening()
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
      listeningStates.loader = true;
      setListeningStates({listeningStates})
      updateListeningAPI(values, listeningStates.token)
        .then((res) => {
            listeningStates.loader = false;
            setListeningStates({listeningStates});
            if (res && res.data) {
                //success
                listeningStates.updateData = res.data.data;
                setListeningStates({ ...listeningStates });
                getAllListening()
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
  
  const reduceChickenData = (values) => {
      listeningStates.loader = true;
      setListeningStates({listeningStates})
      reducedChickenAPI(values, listeningStates.token)
        .then((res) => {
            listeningStates.loader = false;
            setListeningStates({listeningStates});
            if (res && res.data) {
                //success
                listeningStates.updateData = res.data.data;
                setListeningStates({ ...listeningStates });
                getAllListening()
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
      listeningStates.loader = true; 
      setListeningStates({listeningStates})
      deleteListeningAPI(values.id, listeningStates.token)
        .then((res) => {
            listeningStates.loader = false;
            setListeningStates({listeningStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                listeningStates.updateData = res.data.data;
                setListeningStates({ ...listeningStates });
                getAllListening()
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

      listeningStates.isModalVisible = false;
      if (listeningStates.action == "ADD_LISTENING") {
          var insObj = {
            average_weight : parseFloat(values.average_weight),
            location : values.location,
            total_count : parseInt(values.total_count),
          }
          insertListeningData(insObj);
          getAllListening();
          form.resetFields();
      } else if (listeningStates.action == "EDIT") {
          var updObj = {
             total_count : parseInt(values.total_count),
             average_weight : parseFloat(values.average_weight),
             chicken_id : listeningStates.id,
            };
          updateListeningData(updObj);
          getFormData({name:""})
          getAllListening();
      } else if (listeningStates.action == "REDUCED") {
          var updObj = {
             total_count : parseInt(values.total_count),
             reason : values.reason,
             chicken_id : listeningStates.id,
            };
          reduceChickenData(updObj);
          getFormData({name:""})
          getAllListening();
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    listeningStates.isModalVisible = true;
    listeningStates.action = "ADD_LISTENING";
    setListeningStates({ ...listeningStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllListening();
  }, []);

return (
    <Card title={"CHICKEN"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={listeningStates.loader}
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
            Chicken нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={listeningStates.data} />
        <Modal
          title="Chicken edit"
          width={"90%"}
          visible={listeningStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            listeningStates.isModalVisible = false;
            listeningStates.action = null;
            setListeningStates({ ...listeningStates });
          }}
        >
         {(() => {   
             if(listeningStates.action == "EDIT") {
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
                                        name={"total_count"}
                                        label="Count"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"average_weight"}
                                        label="Average weight"
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
             } else if(listeningStates.action == "ADD_LISTENING") {
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
                                       name={"average_weight"}
                                       label="Average weight"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"location"}
                                       label="Location"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"total_count"}
                                       label="Count"
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
            } else if(listeningStates.action == "REDUCED") {
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
                                       name={"reason"}
                                       label="Reason"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"total_count"}
                                       label="Count"
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