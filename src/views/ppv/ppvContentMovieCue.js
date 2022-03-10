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
    getAllContentMovieCueByMovieAPI,
    insertContentMovieCueAPI,
    updateContentMovieCueAPI,
    deleteContentMovieCueAPI,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [ppvContentMovieCueStates, setPPVContentMovieCueStates] = useState({
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
        title : "Movie id",
        dataIndex : "movie_id",
        key :"movie_id"
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key : "ordering",
    },
    {
        title : "Start time",
        dataIndex : "start_time",
        key :"start_time"
    },
    {
        title : "End time",
        dataIndex : "end_time",
        key :"end_time"
    },
    {
        title : "From language id",
        dataIndex : "from_language_id",
        key :"ordering"
    },
    {
        title : "From language translation",
        dataIndex : "from_language_translation",
        key :"from_language_translation"
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
                    ppvContentMovieCueStates.action = "EDIT";
                    // setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
                    // getAllReading(record);
                    ppvContentMovieCueStates.updateData = record;
                    ppvContentMovieCueStates.id = record.id;
                    ppvContentMovieCueStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/ppv/content-movie-cue-word");
                        props.courseIds.ppvContentMovieCueId = record.id;
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
      movie_id : record.movie_id, 
      ordering : record.ordering, 
      start_time : record.start_time, 
      end_time : record.end_time, 
      from_language_id : record.from_language_id,
      from_language_translation : record.from_language_translation,
      to_language_id : record.to_language_id,
      to_language_translation : record.to_language_translation,
      
    });
  };

  //GET All writing list
  const getAllReading = (id) => {
    ppvContentMovieCueStates.loader = true;
    setPPVContentMovieCueStates({ ppvContentMovieCueStates });
    getAllContentMovieCueByMovieAPI(id, ppvContentMovieCueStates.token)
      .then((res) => {
        ppvContentMovieCueStates.loader = false;
        setPPVContentMovieCueStates({ ppvContentMovieCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentMovieCueStates.data = res.data.data;
          setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
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
      ppvContentMovieCueStates.loader = true;
      setPPVContentMovieCueStates({ppvContentMovieCueStates});
      console.log("SHINE PISDA : ", values);
      insertContentMovieCueAPI(values, ppvContentMovieCueStates.token)
        .then((res) => {
            ppvContentMovieCueStates.loader = false;
            setPPVContentMovieCueStates({ppvContentMovieCueStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieCueStates.insertData = res.data.data;
                setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
                getAllReading(props.courseIds.ppvContentMovieId);
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
      ppvContentMovieCueStates.loader = true;
      setPPVContentMovieCueStates({ppvContentMovieCueStates})
      updateContentMovieCueAPI(values, ppvContentMovieCueStates.token)
        .then((res) => {
            ppvContentMovieCueStates.loader = false;
            setPPVContentMovieCueStates({ppvContentMovieCueStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieCueStates.updateData = res.data.data;
                setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
                getAllReading(props.courseIds.ppvContentMovieId);
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
      ppvContentMovieCueStates.loader = true; 
      setPPVContentMovieCueStates({ppvContentMovieCueStates})
      deleteContentMovieCueAPI(values.id, ppvContentMovieCueStates.token)
        .then((res) => {
            ppvContentMovieCueStates.loader = false;
            setPPVContentMovieCueStates({ppvContentMovieCueStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieCueStates.updateData = res.data.data;
                setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
                getAllReading(props.courseIds.ppvContentMovieId);
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

      ppvContentMovieCueStates.isModalVisible = false;
      if (ppvContentMovieCueStates.action == "ADD_READING") {
        //   values.is_active = parseInt(values.is_active);
          var insObj = {
              movie_id : parseInt(props.courseIds.ppvContentMovieId),
              ordering : parseInt(values.ordering),
              start_time : values.start_time,
              end_time : values.end_time, 
              from_language_id : parseInt(values.from_language_id),
              from_language_translation : values.from_language_translation,
              to_language_id : parseInt(values.to_language_id),
              to_language_translation : values.to_language_translation,

          };
          insertListeningData(insObj);
          
        //   getAllReading(props.courseIds.ppvContentMovieId);;
      } else if (ppvContentMovieCueStates.action == "EDIT") {
          var updObj = {
            id : ppvContentMovieCueStates.id,
            movie_id : parseInt(props.courseIds.ppvContentMovieId),
            ordering : parseInt(values.ordering),
            start_time : values.start_time,
            end_time : values.end_time, 
            from_language_id : parseInt(values.from_language_id),
            from_language_translation : values.from_language_translation,
            to_language_id : parseInt(values.to_language_id),
            to_language_translation : values.to_language_translation,

          };
          updateListeningData(updObj);
          form.resetFields();
          getAllReading(props.courseIds.ppvContentMovieId);;
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    ppvContentMovieCueStates.isModalVisible = true;
    ppvContentMovieCueStates.action = "ADD_READING";
    setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
  };


  useEffect(() => {
    console.log("listening useffect");
    getAllReading(props.courseIds.ppvContentMovieId);;
  }, []);

return (
    <Card title={"Listening"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={ppvContentMovieCueStates.loader}
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
        <Table columns={columns} dataSource={ppvContentMovieCueStates.data} />
        <Modal
          title="Writing edit"
          width={"90%"}
          visible={ppvContentMovieCueStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            ppvContentMovieCueStates.isModalVisible = false;
            ppvContentMovieCueStates.action = null;
            setPPVContentMovieCueStates({ ...ppvContentMovieCueStates });
          }}
        >
         {(() => {   
             if(ppvContentMovieCueStates.action == "EDIT") {
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
                                        name={"start_time"}
                                        label="Start time"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"end_time"}
                                        label="End time"
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
             } else if(ppvContentMovieCueStates.action == "ADD_READING") {
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
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"start_time"}
                                       label="Start time"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"end_time"}
                                       label="End time"
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