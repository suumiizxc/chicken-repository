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
    getAllArticle,
    insertArticleAPI,
    updateArticleAPI,
    deleteArticleAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [readingStates, setReadingStates] = useState({
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
        title : "Title",
        dataIndex : "title",
        key : "title",
    },
    {
        title : "Category",
        dataIndex : ["category", "name"],
        key : ["category", "name"],
    },
    {
        title : "Is trending",
        dataIndex :"is_trending",
        key : "is_trending"
    },
    {
        title : "Is active",
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
                    readingStates.action = "EDIT";
                    // setReadingStates({ ...readingStates });
                    // getAllReading(record);
                    readingStates.updateData = record;
                    readingStates.id = record.id;
                    readingStates.isModalVisible = true;
                    getFormData(record);
                    setReadingStates({ ...readingStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/article-cue");
                        props.courseIds.articleId = record.id;
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
      title : record.title,
      category_id : record.category_id,
      is_trending : record.is_trending,
      is_active : record.is_active,
    });
  };

  //GET All writing list
  const getAllReading = () => {
    readingStates.loader = true;
    setReadingStates({ readingStates });
    getAllArticle(readingStates.token)
      .then((res) => {
        readingStates.loader = false;
        setReadingStates({ readingStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          readingStates.data = res.data.data;
          setReadingStates({ ...readingStates });
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
      readingStates.loader = true;
      setReadingStates({readingStates});
      console.log("SHINE PISDA : ", values);
      insertArticleAPI(values, readingStates.token)
        .then((res) => {
            readingStates.loader = false;
            setReadingStates({readingStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingStates.insertData = res.data.data;
                setReadingStates({ ...readingStates });
                getAllReading()
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
      readingStates.loader = true;
      setReadingStates({readingStates})
      updateArticleAPI(values, readingStates.token)
        .then((res) => {
            readingStates.loader = false;
            setReadingStates({readingStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingStates.updateData = res.data.data;
                setReadingStates({ ...readingStates });
                getAllReading()
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
      readingStates.loader = true; 
      setReadingStates({readingStates})
      deleteArticleAPI(values.id, readingStates.token)
        .then((res) => {
            readingStates.loader = false;
            setReadingStates({readingStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingStates.updateData = res.data.data;
                setReadingStates({ ...readingStates });
                getAllReading()
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

      readingStates.isModalVisible = false;
      if (readingStates.action == "ADD_READING") {
          var inObj = {title : values.title, category_id : parseInt(values.category_id), is_trending : parseInt(values.is_trending), is_active : parseInt(values.is_active)};
          insertListeningData(inObj);
        //   getAllReading();
      } else if (readingStates.action == "EDIT") {
          var updObj = {id : readingStates.id,  title : values.title, category_id : parseInt(values.category_id),  is_trending : parseInt(values.is_trending), is_active : parseInt(values.is_active)};
          updateListeningData(updObj);
          form.resetFields();
          getAllReading();
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    readingStates.isModalVisible = true;
    readingStates.action = "ADD_READING";
    setReadingStates({ ...readingStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllReading();
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={readingStates.loader}
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
            Article нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={readingStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={readingStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            readingStates.isModalVisible = false;
            readingStates.action = null;
            setReadingStates({ ...readingStates });
          }}
        >
         {(() => {   
             if(readingStates.action == "EDIT") {
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
                                        name={"title"}
                                        label="Title"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"category_id"}
                                        label="Category id"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"is_trending"}
                                        label="Is trending"
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
             } else if(readingStates.action == "ADD_READING") {
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
                                       name={"title"}
                                       label="Title"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"category_id"}
                                       label="Category id"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_trending"}
                                       label="Is trending"
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