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
    getAllPPVContentAPI,
    insertPPVContentAPI,
    updatePPVContentAPI,
    deletePPVContentAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [ppvContentStates, setPPVContentStates] = useState({
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
        title : "Category id",
        dataIndex :"category_id",
        key : "category_id",
    },
    {
        title : "Level id",
        dataIndex : "level_id",
        key : "level_id",
    },
    {
      title : "Нэр",
      dataIndex : "name",
      key :"name"
    },
    {
        title :"Vocabulary count",
        dataIndex : "vocabulary_count",
        key : "vocabulary_count"
    },
    {
        title : "Profile image",
        dataIndex : "profile_img",
        key : "profile_img",
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key : "is_active",
    },
    {
        title : "Intro",
        dataIndex : "intro",
        key : "intro",
    },
    {
        title : "Is serial",
        dataIndex : "is_serial",
        key : "is_serial",
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
                    ppvContentStates.action = "EDIT";
                    // setPPVContentStates({ ...ppvContentStates });
                    // getAllPPVContent(record);
                    ppvContentStates.updateData = record;
                    ppvContentStates.id = record.id;
                    ppvContentStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentStates({ ...ppvContentStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/ppv/content-movie");
                        props.courseIds.ppvContentId = record.id;
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
      id : record.id,
      category_id : record.category_id,
      level_id : record.level_id, 
      name : record.name,
      vocabulary_count : record.vocabulary_count,
      profile_img : record.profile_img,
      is_active : record.is_active,
      intro : record.intro,
      is_serial : record.is_serial,
    });
  };

  //GET All writing list
  const getAllPPVContent = () => {
    ppvContentStates.loader = true;
    setPPVContentStates({ ppvContentStates });
    getAllPPVContentAPI(ppvContentStates.token)
      .then((res) => {
        ppvContentStates.loader = false;
        setPPVContentStates({ ppvContentStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentStates.data = res.data.data;
          setPPVContentStates({ ...ppvContentStates });
          console.log("success all writing", ppvContentStates);
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
      ppvContentStates.loader = true;
      setPPVContentStates({ppvContentStates})
      insertPPVContentAPI(values, ppvContentStates.token)
        .then((res) => {
            ppvContentStates.loader = false;
            setPPVContentStates({ppvContentStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentStates.insertData = res.data.data;
                setPPVContentStates({ ...ppvContentStates });
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
      ppvContentStates.loader = true;
      setPPVContentStates({ppvContentStates})
      updatePPVContentAPI(values, ppvContentStates.token)
        .then((res) => {
            ppvContentStates.loader = false;
            setPPVContentStates({ppvContentStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentStates.updateData = res.data.data;
                setPPVContentStates({ ...ppvContentStates });
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
      ppvContentStates.loader = true; 
      setPPVContentStates({ppvContentStates})
      deletePPVContentAPI(values.id, ppvContentStates.token)
        .then((res) => {
            ppvContentStates.loader = false;
            setPPVContentStates({ppvContentStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentStates.updateData = res.data.data;
                setPPVContentStates({ ...ppvContentStates });
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

      ppvContentStates.isModalVisible = false;
      if (ppvContentStates.action == "ADD_LISTENING") {
          var inObj = {category_id : parseInt(values.category_id), intro : values.intro, is_active : parseInt(values.is_active), is_serial : parseInt(values.is_serial), level_id : parseInt(values.level_id), name : values.name, profile_img : values.profile_img, vocabulary_count : parseInt(values.vocabulary_count)};
          insertListeningData(inObj);
          getAllPPVContent();
      } else if (ppvContentStates.action == "EDIT") {
          var updObj = {id : ppvContentStates.id, category_id : parseInt(values.category_id), intro : values.intro, is_active : parseInt(values.is_active), is_serial : parseInt(values.is_serial), level_id : parseInt(values.level_id), name : values.name, profile_img : values.profile_img, vocabulary_count : parseInt(values.vocabulary_count)};
          updateListeningData(updObj);
          getFormData({name:""})
          getAllPPVContent();
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    ppvContentStates.isModalVisible = true;
    ppvContentStates.action = "ADD_LISTENING";
    setPPVContentStates({ ...ppvContentStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllPPVContent();
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={ppvContentStates.loader}
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
            PPV content нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={ppvContentStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={ppvContentStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            ppvContentStates.isModalVisible = false;
            ppvContentStates.action = null;
            setPPVContentStates({ ...ppvContentStates });
          }}
        >
         {(() => {   
             if(ppvContentStates.action == "EDIT") {
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
                                  name={"category_id"}
                                  label="Category id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"level_id"}
                                  label="Level id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
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
                                  name={"vocabulary_count"}
                                  label="Vocabulary count"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"profile_img"}
                                  label="Profile image"
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
                              <Col span={8}>
                                  <Form.Item
                                  name={"intro"}
                                  label="Intro"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_serial"}
                                  label="Is serial"
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
             } else if(ppvContentStates.action == "ADD_LISTENING") {
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
                                  name={"category_id"}
                                  label="Category id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"level_id"}
                                  label="Level id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
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
                                  name={"vocabulary_count"}
                                  label="Vocabulary count"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"profile_img"}
                                  label="Profile image"
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
                              <Col span={8}>
                                  <Form.Item
                                  name={"intro"}
                                  label="Intro"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"is_serial"}
                                  label="Is serial"
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