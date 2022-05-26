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
    getAllArticleCueByArticleAPI,
    insertArticleCueAPI,
    deleteArticleCueAPI,
    updateArticleCueAPI,

    insertArticleCueWordAPI,
    deleteArticleCueWordByCueIDAPI,
} from "../../services/Content_service";
import {
  getLanguageWord,
 
} from "../../services/Word_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [listeningCueStates, setListeningCueStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    insertData: null,
    id : null,
    updateData:{
        id : null
    },
    insertWord : [],
  });
  const symbols = [",", ".", ":", ";", "/", "!","-","_", `'`, `"`];

  const columns = [
    {
      title : "Id",
      dataIndex : "id",
      key :"id"
    },
    {
      title : "Article id",
      dataIndex : "article_id",
      key :"article_id"
    },
    {
      title : "From language id",
      dataIndex : "from_language_id",
      render:(text) => <a>{text === 1 ? "MONGOL" : "ENGLISH"}</a>
    },
    {
      title : "From language translation",
      dataIndex : "from_language_translation",
      key :"from_language_translation"
    },
    {
      title : "To language id",
      dataIndex : "to_language_id",
      render:(text) => <a>{text === 1 ? "MONGOL" : "ENGLISH"}</a>
    },
    {
      title : "To language translation",
      dataIndex : "to_language_translation",
      key : "to_language_translation"
    },
    {
      title : "Is active",
      dataIndex : "is_active",
      render:(text) => <a>{text !== 0 ? "Идэвхгүй" : "Идэвхтэй"}</a>,
    },
    {
      title : "Ordering",
      dataIndex : "ordering",
      key :"ordering"
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
                    deleteWritingVideoData(record.id);
                    deleteArticleCueWordData(record.id);
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
                    listeningCueStates.action = "EDIT";
                    // setListeningCueStates({ ...listeningCueStates });
                    // getAllWriting(record);
                    listeningCueStates.updateData = record;
                    listeningCueStates.id = record.id;
                    listeningCueStates.isModalVisible = true;
                    getFormData(record);
                    setListeningCueStates({ ...listeningCueStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                <Tooltip placement="topRight" title="Question руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/article-cue-word");
                        props.courseIds.articleCueId = record.id;
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
        from_language_id : record.from_language_id,
        from_language_translation : record.from_language_translation,
        to_language_id : record.to_language_id,
        to_language_translation : record.to_language_translation,
        is_active : record.is_active,
        ordering : record.ordering,
    });
  };

  const getAllLangueges = () => {
    listeningCueStates.loader = true;
    setListeningCueStates({ listeningCueStates });
    getLanguageWord(listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({ listeningCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.langueges = res.data.data;
          setListeningCueStates({ ...listeningCueStates });
          console.log("success all langueges", res.data.data);
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
  
  //GET All writing list
  const getAllWritingVideo = (id) => {
    listeningCueStates.loader = true;
    setListeningCueStates({ listeningCueStates });
    getAllArticleCueByArticleAPI(id,listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({ listeningCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.data = res.data.data;
          setListeningCueStates({ ...listeningCueStates });
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

  const deleteWritingVideoData = (id) => {
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    deleteArticleCueAPI(id, listeningCueStates.token)
    .then((res) => {
      listeningCueStates.loader = false;
      setListeningCueStates({ listeningCueStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // listeningCueStates.data = res.data.data;
        // getAllWritingVideo(props.courseIds.articleId);
        setListeningCueStates({ ...listeningCueStates });
        console.log("success delete writing", res.data.data);
        getAllWritingVideo(props.courseIds.articleId);
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

  const deleteArticleCueWordData = (id) => {
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    deleteArticleCueWordByCueIDAPI(id, listeningCueStates.token)
    .then((res) => {
      listeningCueStates.loader = false;
      setListeningCueStates({ listeningCueStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // listeningCueStates.data = res.data.data;
        // getAllWritingVideo(props.courseIds.articleId);
        setListeningCueStates({ ...listeningCueStates });
        console.log("success delete writing", res.data.data);
        getAllWritingVideo(props.courseIds.articleId);
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


  const insertListeningCue = () => {
    
    listeningCueStates.action = "ADD_LISTENING_CUE";
    listeningCueStates.isModalVisible = true;
    setListeningCueStates({ ...listeningCueStates });
  };


  const insertListeningCueData = (data) => {
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    insertArticleCueAPI(data, listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({listeningCueStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.insertData = res.data.data;
          setListeningCueStates({ ...listeningCueStates });
          console.log("success all writing", res.data.data);
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

  const updateListeningCueData = (data) => {
    listeningCueStates.loader = true;
    setListeningCueStates({listeningCueStates})
    deleteArticleCueWordData(data.id)
    updateArticleCueAPI(data, listeningCueStates.token)
      .then((res) => {
        listeningCueStates.loader = false;
        setListeningCueStates({listeningCueStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          listeningCueStates.updateData = res.data.data;
          // getAllWritingVideo(listeningCueStates.courseIds.listeningId);
          setListeningCueStates({ ...listeningCueStates });
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


  const onFinishListening = (values) => {
      console.log("on finish writing")
      if(listeningCueStates.action == "ADD_LISTENING_CUE") {
        var insertObj = {
          article_id : parseInt(props.courseIds.articleId), 
          from_language_id : parseInt(values.from_language_id),
          from_language_translation : values.from_language_translation,
          to_language_id : parseInt(values.to_language_id),
          to_language_translation : values.to_language_translation,
          is_active : parseInt(values.is_active),
          ordering : parseInt(values.ordering),
        };
        insertListeningCueData(insertObj)
        getAllWritingVideo(props.courseIds.articleId);
        
      } else if (listeningCueStates.action == "EDIT") {
        var updateObj = {
          id : listeningCueStates.id,
          article_id : parseInt(props.courseIds.articleId), 
          from_language_id : parseInt(values.from_language_id),
          from_language_translation : values.from_language_translation,
          to_language_id : parseInt(values.to_language_id),
          to_language_translation : values.to_language_translation,
          is_active : parseInt(values.is_active),
          ordering : parseInt(values.ordering),
        };
        
        updateListeningCueData(updateObj)
        splitStringSendWord(listeningCueStates.id, updateObj.from_language_translation);
        getAllWritingVideo(props.courseIds.articleId);
      }
      listeningCueStates.isModalVisible = false;
      form.resetFields();
      getAllWritingVideo(props.courseIds.articleId);
      setListeningCueStates({ ...listeningCueStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const sendCueWord = async(data) => {
    const wlen = listeningCueStates.insertWord.length;
    for(var i = 0; i < wlen; i++) {
      try{
        let response = await insertArticleCueWordAPI(data[i], listeningCueStates.token)
        message.success(`Амжилттай үг нэмлээ : ${i + 1} / ${wlen}`)
      } catch(err) {
        message.success(`Алдаа гарлаа : ${i + 1} / ${wlen}`)
      }
    }
  }

  const splitStringSendWord = (id, val) => {
    
    var cr1 = val
      .replaceAll(" ","~")
      .replaceAll(".","~.~")
      .replaceAll(",","~,~")
      .replaceAll(":","~:~")
      .replaceAll(";","~;~")
      .replaceAll("-","~-~")
      .replaceAll("/","~/~")
      .replaceAll("?","~?~")
      .replaceAll(`'`,`~'~`)
      .replaceAll(`"`,`~"~`)
      .replaceAll(`!`,`~!~`)
      .replaceAll("~","~")
      .split("~");
    console.log("cr1",cr1)
    var cr2 =[] 
    var initial_order = 1;
    cr1.forEach((val) => {
      var sp = val.split("~")
      sp.forEach((val1) => {
        if(val1 !== ""){
          cr2.push(
            {
              cue_id : id, 
              main_text : val1, 
              word_value : symbols.indexOf(val1) === -1 ? val1.toLowerCase() : "", 
              space_next : 0, 
              ordering : initial_order,
              is_visible : 0,
              has_hint : 0,
              hint_text : "",
            }
          );
          initial_order++;
        }
      })
    })
    console.log("TEST {} : ",cr2);
    listeningCueStates.insertWord = cr2;
    sendCueWord(cr2);
    setListeningCueStates({ ...listeningCueStates });
  }

  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideo(props.courseIds.articleId);
    getAllLangueges()
  }, []);

return (
    <Card title={"Article"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={listeningCueStates.loader}
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
              navigate("/article");
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
            onClick={insertListeningCue}
            icon={<PlusCircleOutlined />}
            // type="alert"
            style={{
              marginBottom: 16,
              marginRight: 16,
              backgroundColor: "#3F79F7",
              color: "#FFFFFF",
            }}
          >
            Article мөр нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={listeningCueStates.data} />
        <Modal
          title="Мөр нэмэх"
          width={"90%"}
          visible={listeningCueStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            listeningCueStates.isModalVisible = false;
            listeningCueStates.action = null;
            setListeningCueStates({ ...listeningCueStates });
          }}
        >
          {(() => {   
            if(listeningCueStates.action == "EDIT") {
              return (
            <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishListening}
              onFinishFailed={onFinishFailedWriting}
              autoComplete="off"
            >
                  <Row>
                      <Col span={24}>
                          <Row>
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
                                  name={"is_active"}
                                  label="Is active"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"ordering"}
                                  label="ordering"
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
            } else if (listeningCueStates.action == "ADD_LISTENING_CUE") {
              return(
              <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishListening}
              onFinishFailed={onFinishFailedWriting}
              autoComplete="off"
            >
                  <Row>
                  <Divider>Мөр нэмэх</Divider>
                      <Col span={24}>
                          <Row>
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
                                  name={"is_active"}
                                  label="Is active"
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