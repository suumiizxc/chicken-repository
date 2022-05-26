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
    getAllArticleCueWordByArticleCueAPI,
    insertArticleCueWordAPI,
    updateArticleCueWordAPI,
    deleteArticleCueWordAPI,
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
        title : "Cue id",
        dataIndex : "cue_id",
        key :"cue_id"
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
        render:(text) => <a>{text !== 0 ? "Ардаа зайгүй" : "Ардаа зайтай"}</a>,
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key : "ordering",
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
            </Space>
        )
    }
    
  ]

  const getFormData = (record) => {
  
    // setIntroVideoCueStates({ ...introVideoCueStates });
    form.setFieldsValue({
      ordering : record.ordering,
      word_value : record.word_value,
      space_next : record.space_next,
      main_text : record.main_text,
    });
  };

  //GET All writing list
  const getAllReading = (id) => {
    readingCueStates.loader = true;
    setReadingCueStates({ readingCueStates });
    getAllArticleCueWordByArticleCueAPI(id, readingCueStates.token)
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
      insertArticleCueWordAPI(values, readingCueStates.token)
        .then((res) => {
            readingCueStates.loader = false;
            setReadingCueStates({readingCueStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingCueStates.insertData = res.data.data;
                setReadingCueStates({ ...readingCueStates });
                getAllReading(props.courseIds.articleCueId)
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
      updateArticleCueWordAPI(values, readingCueStates.token)
        .then((res) => {
            readingCueStates.loader = false;
            setReadingCueStates({readingCueStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingCueStates.updateData = res.data.data;
                setReadingCueStates({ ...readingCueStates });
                getAllReading(props.courseIds.articleCueId)
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
      deleteArticleCueWordAPI(values.id, readingCueStates.token)
        .then((res) => {
            readingCueStates.loader = false;
            setReadingCueStates({readingCueStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingCueStates.updateData = res.data.data;
                setReadingCueStates({ ...readingCueStates });
                getAllReading(props.courseIds.articleCueId)
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
              cue_id : props.courseIds.articleCueId,
              main_text : values.main_text,
              word_value : values.word_value,
              space_next : parseInt(values.space_next),
              ordering : parseInt(values.ordering),
          };
          insertListeningData(insObj);
        //   getAllReading(props.courseIds.articleCueId);
      } else if (readingCueStates.action == "EDIT") {
          var updObj = {
            id : readingCueStates.id,
            cue_id : props.courseIds.articleCueId,
            main_text : values.main_text,
            word_value : values.word_value,
            space_next : parseInt(values.space_next),
            ordering : parseInt(values.ordering)
          };
          updateListeningData(updObj);
          form.resetFields();
          getAllReading(props.courseIds.articleCueId);
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
    getAllReading(props.courseIds.articleCueId);
  }, []);

return (
    <Card title={"Article"} style={{ margin: 15, width: "100%" }}>
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
            Үг нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={readingCueStates.data} />
        <Modal
          title="Word edit"
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
                                        name={"main_text"}
                                        label="Main text"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"word_value"}
                                        label="Word value"
                                        
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"space_next"}
                                        label="Space next"
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
                                       name={"main_text"}
                                       label="Main text"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"word_value"}
                                       label="Word value"
                                      
                                       >
                                           <Input />
                                       </Form.Item>
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"space_next"}
                                       label="Space next"
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