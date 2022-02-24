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
    getAllReadingCueByReadingAPI,
    insertReadingCueAPI,
    updateReadingCueAPI,
    deleteReadingCueAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [readingCueStates, setReadingCueStates] = useState({
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
        title : "Reading id",
        dataIndex : "reading_id",
        key :"reading_id"
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key : "ordering",
    },
    {
        title : "From language id",
        dataIndex : "from_language_id",
        key :"from_language_id"
    },
    {
        title : "From language translation",
        dataIndex : "from_language_translation",
        key :"from_language_translation"
    },
    {
        title : "From language is default",
        dataIndex : "from_language_is_default",
        key :"from_language_is_default"
    },
    {
        title : "To language id",
        dataIndex : "to_language_id",
        key :"to_language_id"
    },
    {
        title : "To language translation",
        dataIndex : "to_language_translation",
        key :"to_language_translation"
    },
    {
        title : "To language is default",
        dataIndex : "to_language_is_default",
        key :"to_language_is_default"
    },
    {
        title : "Grammar is highlighted",
        dataIndex : "grammar_is_highlighted",
        key :"grammar_is_highlighted"
    },
    {
        title : "Grammar description",
        dataIndex : "grammar_description",
        key :"grammar_description"
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
                    readingCueStates.action = "EDIT";
                    // setReadingCueStates({ ...readingCueStates });
                    // getAllReading(record);
                    readingCueStates.updateData = record;
                    readingCueStates.id = record.id;
                    readingCueStates.isModalVisible = true;
                    getFormData(record);
                    setReadingCueStates({ ...readingCueStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/content/reading-cue-word");
                        props.courseIds.readingCueId = record.id;
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
      ordering : record.ordering,
      from_language_id : record.from_language_id,
      from_language_translation : record.from_language_translation,
      from_language_is_default : record.from_language_is_default,
      to_language_id : record.to_language_id,
      to_language_translation : record.to_language_translation,
      to_language_is_default : record.to_language_is_default,
      grammar_is_highlighted : record.grammar_is_highlighted,
      grammar_description : record.grammar_description,
    });
  };

  //GET All writing list
  const getAllReading = (id) => {
    readingCueStates.loader = true;
    setReadingCueStates({ readingCueStates });
    getAllReadingCueByReadingAPI(id, readingCueStates.token)
      .then((res) => {
        readingCueStates.loader = false;
        setReadingCueStates({ readingCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          readingCueStates.data = res.data.data;
          setReadingCueStates({ ...readingCueStates });
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
      readingCueStates.loader = true;
      setReadingCueStates({readingCueStates});
      console.log("SHINE PISDA : ", values);
      insertReadingCueAPI(values, readingCueStates.token)
        .then((res) => {
            readingCueStates.loader = false;
            setReadingCueStates({readingCueStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingCueStates.insertData = res.data.data;
                setReadingCueStates({ ...readingCueStates });
                getAllReading(props.courseIds.readingId)
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
      readingCueStates.loader = true;
      setReadingCueStates({readingCueStates})
      updateReadingCueAPI(values, readingCueStates.token)
        .then((res) => {
            readingCueStates.loader = false;
            setReadingCueStates({readingCueStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingCueStates.updateData = res.data.data;
                setReadingCueStates({ ...readingCueStates });
                getAllReading(props.courseIds.readingId)
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
      readingCueStates.loader = true; 
      setReadingCueStates({readingCueStates})
      deleteReadingCueAPI(values.id, readingCueStates.token)
        .then((res) => {
            readingCueStates.loader = false;
            setReadingCueStates({readingCueStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingCueStates.updateData = res.data.data;
                setReadingCueStates({ ...readingCueStates });
                getAllReading(props.courseIds.readingId)
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

      readingCueStates.isModalVisible = false;
      if (readingCueStates.action == "ADD_READING") {
        //   values.is_active = parseInt(values.is_active);
          var insObj = {
              ordering : parseInt(values.ordering), 
              reading_id : props.courseIds.readingId, 
              from_language_id : parseInt(values.from_language_id), 
              from_language_translation : values.from_language_translation,
              from_language_is_default : values.from_language_is_default,
              to_language_id : parseInt(values.to_language_id),
              to_language_translation : values.to_language_translation,
              to_language_is_default : values.to_language_is_default,
              grammar_is_highlighted : values.grammar_is_highlighted,
              grammar_description : (values.grammar_description === null ? "" : values.grammar_description),
          };
          insertListeningData(insObj);
        //   getAllReading(props.courseIds.readingId);
      } else if (readingCueStates.action == "EDIT") {
          var updObj = {
            id : readingCueStates.id,
            ordering : parseInt(values.ordering),
            reading_id : props.courseIds.readingId,
            from_language_id : parseInt(values.from_language_id),
            from_language_translation : values.from_language_translation,
            from_language_is_default : values.from_language_is_default,
            to_language_id : parseInt(values.to_language_id),
            to_language_translation : values.to_language_translation,
            to_language_is_default : values.to_language_is_default,
            grammar_is_highlighted : values.grammar_is_highlighted,
            grammar_description : (values.grammar_description === null ? "" : values.grammar_description)
          };
          updateListeningData(updObj);
          form.resetFields();
          getAllReading(props.courseIds.readingId);
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    readingCueStates.isModalVisible = true;
    readingCueStates.action = "ADD_READING";
    setReadingCueStates({ ...readingCueStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllReading(props.courseIds.readingId);
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={readingCueStates.loader}
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
        <Table columns={columns} dataSource={readingCueStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={readingCueStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            readingCueStates.isModalVisible = false;
            readingCueStates.action = null;
            setReadingCueStates({ ...readingCueStates });
          }}
        >
         {(() => {   
             if(readingCueStates.action == "EDIT") {
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
                                        name={"ordering"}
                                        label="ordering"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"from_language_id"}
                                        label="From language id"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"from_language_translation"}
                                        label="From language translation"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"from_language_is_default"}
                                        label="From language is default"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"to_language_id"}
                                        label="To language id"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"to_language_translation"}
                                        label="To language translation"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"to_language_is_default"}
                                        label="To language is default"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"grammar_is_highlighted"}
                                        label="Grammar is highlighted"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"grammar_description"}
                                        label="Grammar description"
                                       
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
             } else if(readingCueStates.action == "ADD_READING") {
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
                                       name={"from_language_id"}
                                       label="From language id"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"from_language_translation"}
                                       label="From language translation"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"from_language_is_default"}
                                       label="From language is default"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"to_language_id"}
                                       label="To language id"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"to_language_translation"}
                                       label="To language translation"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"to_language_is_default"}
                                       label="To language is default"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"grammar_is_highlighted"}
                                       label="Grammar is highlighted"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"grammar_description"}
                                       label="Grammar description"
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