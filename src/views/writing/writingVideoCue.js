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
  Descriptions,
  Dropdown,
  Menu,
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
    getAllWritingVideoCueByVIDAPI,
    insertWritingVideoCueAPI,
    deleteWritingVideoCueAPI,
    updateWritingVideoCueAPI,
    getAllWritingVideoCueMissWordByCIDAPI,

    insertWritingVideoCueMissWordAPI,
    deleteWritingVideoCueMissWordByCueIDAPI,
} from "../../services/Content_service";
import {
  getLanguageWord,
 
} from "../../services/Word_service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [writingVideoStates, setWritingVideoStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    insertData: null,
    id : null,
    maxOrdering : 1, 
    writingVideoId : null,
    updateData:{
        id : null
    },
    insertedCueID : null,
    insertWord : [],
    langueges : [],
    fromLanguageID : 2,
    toLanguageID : 1,
  });



  const symbols = [",", ".", ":", ";", "/", "!","-","_", `'`, `"`];

  const fromLanguageChange = (values) => {
    console.log("funActive : ", values)
    if(values.key === "2") {
      writingVideoStates.updateData.from_language_id = 2
    } else {
      writingVideoStates.updateData.from_language_id = 1
    }
    console.log("state : ", writingVideoStates)
    setWritingVideoStates({ ...writingVideoStates });
  }

  const menuFromLanguage = (
    <Menu onClick={fromLanguageChange}>
      <Menu.Item key="2">
          Англи
      </Menu.Item>
      <Menu.Item key="1">
          Монгол
      </Menu.Item>
    </Menu>
  );

  const fromLanguageInsertChange = (values) => {
    console.log("funActive : ", values)
    if(values.key === "2") {
      writingVideoStates.fromLanguageID = 2
    } else {
      writingVideoStates.fromLanguageID = 1
    }
    console.log("state : ", writingVideoStates)
    setWritingVideoStates({ ...writingVideoStates });
  }

  const menuFromLanguageInsert = (
    <Menu onClick={fromLanguageInsertChange}>
      <Menu.Item key="2">
          Англи
      </Menu.Item>
      <Menu.Item key="1">
          Монгол
      </Menu.Item>
    </Menu>
  );

  const toLanguageChange = (values) => {
    console.log("funActive : ", values)
    if(values.key === "2") {
      writingVideoStates.updateData.to_language_id = 2
    } else {
      writingVideoStates.updateData.to_language_id = 1
    }
    console.log("state : ", writingVideoStates)
    setWritingVideoStates({ ...writingVideoStates });
  }

  const menuToLanguage = (
    <Menu onClick={toLanguageChange}>
      <Menu.Item key="2">
          Англи
      </Menu.Item>
      <Menu.Item key="1">
          Монгол
      </Menu.Item>
    </Menu>
  );

  const toLanguageinsertChange = (values) => {
    console.log("funActive : ", values)
    if(values.key === "2") {
      writingVideoStates.toLanguageID = 2
    } else {
      writingVideoStates.toLanguageID = 1
    }
    console.log("state : ", writingVideoStates)
    setWritingVideoStates({ ...writingVideoStates });
  }


  const menuToLanguageInsert = (
    <Menu onClick={toLanguageinsertChange}>
      <Menu.Item key="2">
          Англи
      </Menu.Item>
      <Menu.Item key="1">
          Монгол
      </Menu.Item>
    </Menu>
  );

  

  const columns_word = [
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
      key :"main_text"
    },
    {
      title : "Word value",
      dataIndex : "word_value",
      key :"word_value"
    },
    {
      title : "Space next",
      dataIndex : "space_next",
      key :"space_next"
    },
    {
      title : "Ordering",
      dataIndex : "ordering",
      key :"ordering"
    }
  ]

  const columns = [
    {
      title : "Id",
      dataIndex : "id",
      key :"id"
    },
    {
        title : "Start time",
        dataIndex : "start_time",
        key : "start_time",
    },
    {
        title : "End time",
        dataIndex : "end_time",
        key : "end_time",
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key : "ordering",
    },
    {
        title : "Video id",
        dataIndex : "video_id",
        key : "video_id",
    },
    
    {
        title : "From language id",
        dataIndex : "from_language_id",
        render:(text) => <a>{writingVideoStates.langueges.length === 0 ? text : writingVideoStates.langueges.find(el => el.id === text)["name"]}</a>
    },
    {
        title : "From language translation",
        dataIndex : "from_language_translation",
        key : "from_language_translation",
    },
    {
        title : "From language is default",
        dataIndex : "from_language_is_default",
        key : "from_language_is_default",
    },
    {
        title : "To language id",
        dataIndex : "to_language_id",
        render:(text) => <a>{writingVideoStates.langueges.length === 0 ? text : writingVideoStates.langueges.find(el => el.id === text)["name"]}</a>
    },
    {
        title : "To language translation",
        dataIndex : "to_language_translation",
        key : "to_language_translation",
    },
    {
        title : "To language is default",
        dataIndex : "to_language_is_default",
        key : "to_language_is_default",
    },
    {
        title : "Miss word required",
        dataIndex : "miss_word_required",
        render:(text) => <a>{text !== 0 ? "Тийм" : "Үгүй"}</a>,
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
                    deleteWritingVideoCueData(record.id);
                    
                    deleteWritingVideoCueWordByCueIDData(record.id);
                    }}
                    okText="Тийм"
                    cancelText="Үгүй"
                >
                    <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
                </Popconfirm>
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("writingVideoStates updateIntroCueVideo");
                    writingVideoStates.action = "EDIT";
                    // setWritingVideoStates({ ...writingVideoStates });
                    // getAllWriting(record);
                    writingVideoStates.updateData = record;
                    writingVideoStates.id = record.id;
                    writingVideoStates.isModalVisible = true;
                    getFormData(record);
                    setWritingVideoStates({ ...writingVideoStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                <Tooltip placement="topRight" title="Харах">
                  <Button
                    onClick={() => {
                      console.log("cue video word edit records==>", record);
                      writingVideoStates.action = "EDIT_WORD_SEE";
                      setWritingVideoStates({ ...writingVideoStates });
                      getFormData(record);
                      writingVideoStates.updateData.id = record.id;
                      writingVideoStates.isModalVisible = true;

                      getCueWordsByCueIdData(record.id, writingVideoStates.token)
                      console.log("Cue words : ",writingVideoStates.cueWords)
                      setWritingVideoStates({ ...writingVideoStates });
                      console.log("writingVideoStates : ", writingVideoStates);
                    }}
                    icon={<EyeOutlined style={{ color: "#FAAD14" }} />}
                  />
                </Tooltip>
                <Tooltip placement="topRight" title="Видео руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        navigate("/content/writing-video-cue-miss-word");
                        props.courseIds.writingVideoCueId = record.id;
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
  
    // setWritingVideoStates({ ...writingVideoStates });
    form.setFieldsValue({
        video_id : record.video_id,
        ordering : record.ordering,
        from_language_id : record.from_language_id,
        from_language_translation : record.from_language_translation,
        from_language_is_default : record.from_language_is_default,
        to_language_id : record.to_language_id,
        to_language_translation : record.to_language_translation,
        to_language_is_default : record.to_language_is_default,
        miss_word_required : record.miss_word_required,
        start_time : record.start_time,
        end_time : record.end_time,
    });
  };

  //GET All writing list
  const getAllWritingVideoCue = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({ writingVideoStates });
    getAllWritingVideoCueByVIDAPI(id,writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({ writingVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.data = res.data.data;
          setWritingVideoStates({ ...writingVideoStates });
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

  const getAllLangueges = () => {
    writingVideoStates.loader = true;
    setWritingVideoStates({ writingVideoStates });
    getLanguageWord(writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({ writingVideoStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.langueges = res.data.data;
          setWritingVideoStates({ ...writingVideoStates });
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

  const getCueWordsByCueIdData = (cue_id, token) => {
    getAllWritingVideoCueMissWordByCIDAPI(cue_id, token)
      .then((res) => {
        // console.log("SUCCESS : ", res)
        writingVideoStates.cueWords = [...res.data.data] 
        setWritingVideoStates({...writingVideoStates})
        message.success("successfully get words")
      })
      .catch((err)=>{
        console.log("error : ",err)
        message.error("failed get words")
      })
  }
  
  const deleteWritingVideoCueWordByCueIDData = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    deleteWritingVideoCueMissWordByCueIDAPI(id, writingVideoStates.token)
    .then((res) => {
      writingVideoStates.loader = false;
      setWritingVideoStates({ writingVideoStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // writingVideoStates.data = res.data.data;
        getAllWritingVideoCue(props.courseIds.writingVideoId);
        setWritingVideoStates({ ...writingVideoStates });
        // console.log("success delete writing", res.data.data);
        message.success("Амжилттай устгалаа : word");
        
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

  const deleteWritingVideoCueData = (id) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    deleteWritingVideoCueAPI(id, writingVideoStates.token)
    .then((res) => {
      writingVideoStates.loader = false;
      setWritingVideoStates({ writingVideoStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        // writingVideoStates.data = res.data.data;
        getAllWritingVideoCue(props.courseIds.writingVideoId);
        setWritingVideoStates({ ...writingVideoStates });
        // console.log("success delete writing", res.data.data);
        message.success("Амжилттай устгалаа : cue");
        
        // deleteWritingVideoCueWordByCueIDData(id, writingVideoStates.token);
        
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


  const insertWritingVideo = () => {
    
    writingVideoStates.action = "ADD_WRITING_VIDEO_CUE";
    writingVideoStates.isModalVisible = true;
    getFormData({
        video_id : "",
        ordering : "",
        from_language_id : "",
        from_language_translation : "",
        from_language_is_default : "",
        to_language_id : "",
        to_language_translation : "",
        to_language_is_default : "",
        miss_word_required : "",
        start_time : "",
        end_time : "",
    })
    setWritingVideoStates({ ...writingVideoStates });
  };


  const insertWritingVideoCueData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    insertWritingVideoCueAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.insertData = res.data.data;
          writingVideoStates.insertedCueID = res.data.data.id;
          getAllWritingVideoCue(props.courseIds.writingVideoId);
          setWritingVideoStates({ ...writingVideoStates });
          console.log("success all writing", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа ");
        console.log(e);
      })
  }

  const updateWritingVideoCueData = (data) => {
    writingVideoStates.loader = true;
    setWritingVideoStates({writingVideoStates})
    deleteWritingVideoCueWordByCueIDData(data.id);
    updateWritingVideoCueAPI(data, writingVideoStates.token)
      .then((res) => {
        writingVideoStates.loader = false;
        setWritingVideoStates({writingVideoStates})
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          writingVideoStates.updateData = res.data.data;
          getAllWritingVideoCue(props.courseIds.writingVideoId);
          setWritingVideoStates({ ...writingVideoStates });
          message.success("Амжилттай заслаа")
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


  const onFinishVideoWriting = (values) => {
      console.log("on finish writing")
      if(writingVideoStates.action == "ADD_WRITING_VIDEO_CUE") {
        var insertObj = {
            ordering : parseInt(values.ordering),
            video_id : parseInt(props.courseIds.writingVideoId), 
            from_language_id : parseInt(writingVideoStates.fromLanguageID),
            from_language_translation : values.from_language_translation,
            from_language_is_default : parseInt(values.from_language_is_default),
            to_language_id : parseInt(writingVideoStates.toLanguageID),
            to_language_translation : values.to_language_translation,
            to_language_is_default : parseInt(values.to_language_is_default),
            miss_word_required : parseInt(values.miss_word_required),
            start_time : values.start_time,
            end_time : values.end_time,
        };
        insertWritingVideoCueData(insertObj)
        // splitStringSendWord(writingVideoStates.insertedCueID, insertObj.from_language_translation);
        getAllWritingVideoCue(props.courseIds.writingVideoId);
        
      } else if (writingVideoStates.action == "EDIT") {
        var updateObj = {
            id : writingVideoStates.id, 
            ordering : parseInt(values.ordering),
            video_id : parseInt(writingVideoStates.updateData.video_id), 
            from_language_id : parseInt(writingVideoStates.updateData.from_language_id),
            from_language_translation : values.from_language_translation,
            from_language_is_default : parseInt(values.from_language_is_default),
            to_language_id : parseInt(writingVideoStates.updateData.to_language_id),
            to_language_translation : values.to_language_translation,
            to_language_is_default : parseInt(values.to_language_is_default),
            miss_word_required : parseInt(values.miss_word_required),
            start_time : values.start_time,
            end_time : values.end_time,
        };
        console.log("UPDATE OBJ : ", updateObj)
        updateWritingVideoCueData(updateObj)
        splitStringSendWord(writingVideoStates.id, updateObj.from_language_translation);
        getAllWritingVideoCue(props.courseIds.writingVideoId);
      }
      

      writingVideoStates.isModalVisible = false;
      setWritingVideoStates({ ...writingVideoStates });
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const sendCueWord = async(data) => {
    const wlen = writingVideoStates.insertWord.length;
    for(var i = 0; i < wlen; i++) {
      try{
        let response = await insertWritingVideoCueMissWordAPI(data[i], writingVideoStates.token)
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
    writingVideoStates.insertWord = cr2;
    sendCueWord(cr2);
    setWritingVideoStates({ ...writingVideoStates });
  }


  useEffect(() => {
    console.log("writing useffect");
    getAllWritingVideoCue(props.courseIds.writingVideoId);
    getAllLangueges()
    writingVideoStates.writingVideoId = props.courseIds.writingVideoId;

  }, []);

return (
    <Card title={"Writing"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={writingVideoStates.loader}
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
              navigate("/content/writing");
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
            onClick={insertWritingVideo}
            icon={<PlusCircleOutlined />}
            // type="alert"
            style={{
              marginBottom: 16,
              marginRight: 16,
              backgroundColor: "#3F79F7",
              color: "#FFFFFF",
            }}
          >
            Writing видео cue нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={writingVideoStates.data} />
        <Modal
          title="Writing видео cue нэмэх"
          width={"90%"}
          visible={writingVideoStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            writingVideoStates.isModalVisible = false;
            writingVideoStates.action = null;
            setWritingVideoStates({ ...writingVideoStates });
          }}
        >
          {(() => {   
            if(writingVideoStates.action == "EDIT") {
              return (
            <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishVideoWriting}
              onFinishFailed={onFinishFailedWriting}
              autoComplete="off"
            >
                  <Row>
                  <Divider>Word add</Divider>
                      <Col span={24}>
                          <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"start_time"}
                                  label="Start time"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"end_time"}
                                  label="End time"
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
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"video_id"}
                                  label="Video id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"from_language_id"}
                                  label="From language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
                              <Col span={8}>
                                <Form.Item label="From language id">
                                <Dropdown overlay={menuFromLanguage} placement="bottomLeft" onConfirm={e => e.preventDefault()}>
                                  <Button>{writingVideoStates.updateData.from_language_id !== 1 ? "Англи" : "Монгол"}</Button>
                                </Dropdown>
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
                                  name={"from_language_is_default"}
                                  label="From language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"to_language_id"}
                                  label="To language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
                              <Col span={8}>
                                <Form.Item label="To language id">
                                  <Dropdown overlay={menuToLanguage} placement="bottomLeft" onConfirm={e => e.preventDefault()}>
                                  <Button>{writingVideoStates.updateData.to_language_id !== 1 ? "Англи" : "Монгол"}</Button>
                                  </Dropdown>
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
                                  name={"to_language_is_default"}
                                  label="To language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"miss_word_required"}
                                  label="Miss word required"
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
            }else if (writingVideoStates.action == "EDIT_WORD_SEE") {
              return (
                <Table columns={columns_word} dataSource={writingVideoStates.cueWords} />
              );
            }  else if (writingVideoStates.action == "ADD_WRITING_VIDEO_CUE") {
              return(
              <Form
              form={form}
              name="addWord"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinishVideoWriting}
              onFinishFailed={onFinishFailedWriting}
              autoComplete="off"
            >
                  <Row>
                  <Divider>Word add</Divider>
                      <Col span={24}>
                          <Row>
                              <Col span={8}>
                                  <Form.Item
                                  name={"start_time"}
                                  label="Start time"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"end_time"}
                                  label="End time"
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
                              
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"from_language_id"}
                                  label="From language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
                              <Col span={8}>
                                <Form.Item label="From language id">
                                  <Dropdown overlay={menuFromLanguageInsert} placement="bottomLeft" onConfirm={e => e.preventDefault()}>
                                  <Button>{writingVideoStates.fromLanguageID !== 1 ? "Англи" : "Монгол"}</Button>
                                  </Dropdown>
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
                                  name={"from_language_is_default"}
                                  label="From language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"to_language_id"}
                                  label="To language id"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
                              <Col span={8}>
                                <Form.Item label="To language id">
                                  <Dropdown overlay={menuToLanguageInsert} placement="bottomLeft" onConfirm={e => e.preventDefault()}>
                                  <Button>{writingVideoStates.toLanguageID !== 1 ? "Англи" : "Монгол"}</Button>
                                  </Dropdown>
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
                                  name={"to_language_is_default"}
                                  label="To language is default"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"miss_word_required"}
                                  label="Miss word required"
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