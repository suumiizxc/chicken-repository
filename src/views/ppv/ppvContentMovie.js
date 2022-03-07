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
    getAllContentMovieByContentAPI,
    inserContentMovieAPI,
    updateContentMovieAPI,
    deleteContentMovieAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [ppvContentMovieStates, setPPVContentMovieStates] = useState({
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
        title : "Content id",
        dataIndex : "content_id",
        key :"content_id"
    },
    {
        title : "Name",
        dataIndex : "name",
        key : "name",
    },
    {
        title : "Intro",
        dataIndex : "intro",
        key :"intro"
    },
    {
        title : "Run time",
        dataIndex : "run_time",
        key :"run_time"
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key :"ordering"
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key :"is_active"
    },
    {
        title : "Host url",
        dataIndex : "host_url",
        key :"host_url"
    },
    {
        title : "Host type",
        dataIndex : "host_type",
        key :"host_type"
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
                    ppvContentMovieStates.action = "EDIT";
                    // setPPVContentMovieStates({ ...ppvContentMovieStates });
                    // getAllReading(record);
                    ppvContentMovieStates.updateData = record;
                    ppvContentMovieStates.id = record.id;
                    ppvContentMovieStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/ppv/content-movie-cue");
                        props.courseIds.ppvContentMovieId = record.id;
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
      content_id : record.content_id, 
      name : record.name,
      intro : record.intro,
      run_time : record.run_time, 
      ordering : record.ordering, 
      is_active : record.is_active, 
      host_url : record.host_url,
      host_type : record.host_type,
    });
  };

  //GET All writing list
  const getAllReading = (id) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ ppvContentMovieStates });
    getAllContentMovieByContentAPI(id, ppvContentMovieStates.token)
      .then((res) => {
        ppvContentMovieStates.loader = false;
        setPPVContentMovieStates({ ppvContentMovieStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentMovieStates.data = res.data.data;
          setPPVContentMovieStates({ ...ppvContentMovieStates });
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
      ppvContentMovieStates.loader = true;
      setPPVContentMovieStates({ppvContentMovieStates});
      console.log("SHINE PISDA : ", values);
      inserContentMovieAPI(values, ppvContentMovieStates.token)
        .then((res) => {
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({ppvContentMovieStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieStates.insertData = res.data.data;
                setPPVContentMovieStates({ ...ppvContentMovieStates });
                getAllReading(props.courseIds.ppvContentId);
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
      ppvContentMovieStates.loader = true;
      setPPVContentMovieStates({ppvContentMovieStates})
      updateContentMovieAPI(values, ppvContentMovieStates.token)
        .then((res) => {
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({ppvContentMovieStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieStates.updateData = res.data.data;
                setPPVContentMovieStates({ ...ppvContentMovieStates });
                getAllReading(props.courseIds.ppvContentId);
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
      ppvContentMovieStates.loader = true; 
      setPPVContentMovieStates({ppvContentMovieStates})
      deleteContentMovieAPI(values.id, ppvContentMovieStates.token)
        .then((res) => {
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({ppvContentMovieStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieStates.updateData = res.data.data;
                setPPVContentMovieStates({ ...ppvContentMovieStates });
                getAllReading(props.courseIds.ppvContentId);
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

      ppvContentMovieStates.isModalVisible = false;
      if (ppvContentMovieStates.action == "ADD_READING") {
        //   values.is_active = parseInt(values.is_active);
          var insObj = {
              content_id : parseInt(props.courseIds.ppvContentId),
              name : values.name,
              intro : values.intro,
              run_time : parseInt(values.run_time),
              ordering : parseInt(values.ordering),
              is_active : parseInt(values.is_active),
              host_url : values.host_url,
              host_type : parseInt(values.host_type),
          };
          insertListeningData(insObj);
          
        //   getAllReading(props.courseIds.ppvContentId);;
      } else if (ppvContentMovieStates.action == "EDIT") {
          var updObj = {
            id : ppvContentMovieStates.id,
            content_id : parseInt(props.courseIds.ppvContentId),
            name : values.name,
            intro : values.intro,
            run_time : parseInt(values.run_time),
            ordering : parseInt(values.ordering),
            is_active : parseInt(values.is_active),
            host_url : values.host_url,
            host_type : parseInt(values.host_type),
          };
          updateListeningData(updObj);
          form.resetFields();
          getAllReading(props.courseIds.ppvContentId);;
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    ppvContentMovieStates.isModalVisible = true;
    ppvContentMovieStates.action = "ADD_READING";
    setPPVContentMovieStates({ ...ppvContentMovieStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllReading(props.courseIds.ppvContentId);;
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={ppvContentMovieStates.loader}
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
            Reading нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={ppvContentMovieStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={ppvContentMovieStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            ppvContentMovieStates.isModalVisible = false;
            ppvContentMovieStates.action = null;
            setPPVContentMovieStates({ ...ppvContentMovieStates });
          }}
        >
         {(() => {   
             if(ppvContentMovieStates.action == "EDIT") {
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
                                        label="Name"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"intro"}
                                        label="Intro"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"run_time"}
                                        label="Run time"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"ordering"}
                                        label="Ordering"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"is_active"}
                                        label="Is active"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"host_url"}
                                        label="Host url"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"host_type"}
                                        label="Host type"
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
             } else if(ppvContentMovieStates.action == "ADD_READING") {
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
                                       label="Name"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"intro"}
                                       label="Intro"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"run_time"}
                                       label="Run time"
                                       rules={[
                                        { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"ordering"}
                                       label="Ordering"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_active"}
                                       label="Is active"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"host_url"}
                                       label="Host url"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"host_type"}
                                       label="Host type"
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