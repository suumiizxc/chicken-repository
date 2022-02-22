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
  Tooltip,
  Select,
} from "antd";
import {
  ArrowsAltOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  deleteGrammerAPI,
  getAllGrammerAPI,
  insertIntoGrammerAPI,
  updateGrammerAPI,

  getAllGrammerPatternAPI,
  insertIntoGrammerStructureAPI,
  getIntoGrammerStructureByGrammarIDAPI,
  deleteIntoGrammerStructureByGrammarIDAPI,

  insertGrammarTableExampleAPI,
  getGrammarTableExampleByGrammarIDAPI,
} from "../../../services/Content_service";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const { TextArea } = Input;

export default function Index(props) {
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();

  const [grammerStates, setGrammerStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    id: null,
    host_source: null,
    checkBoxOptions: ["YouTube", "Amazon"],
    insertData: {},
    updateData: {},
    grammarPattern : [],
    grammarBuildPattern : [],
    insertGrammarStructure : {},
    insertGrammarPattern : {},
    getGrammarStructure : null,
    insertGrammarTableExample : null,
    getGrammarTableExample : null,
  });

  const columns_grammar_structure = [
    {
      title : "Id",
      dataIndex : "id",
      key : "id",
    },
    {
      title : "Grammar id",
      dataIndex : "grammar_id",
      key : "grammar_id",
    },
    {
      title : "Pattern id",
      dataIndex : ["pattern", "name_eng"],
      key : "pattern_id",
    },
    {
      title : "Ordering",
      dataIndex : "ordering",
      key : "ordering",
    }, 
    {
      title : "Type label",
      dataIndex : "type_label",
      key : "type_label",
    }
  ];

  const columns_grammar_example = [
    {
      title : "Id", 
      dataIndex : "id",
      key : "id",
    }, 
    {
      title : "Grammar id",
      dataIndex : "grammar_id",
      key : "grammar_id",
    }, 
    {
      title : "English text",
      dataIndex : "eng_text",
      key : "eng_text",
    },
    {
      title : "Mongol text",
      dataIndex : "mon_text",
      key : "mon_text"
    }
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Монгол нэр",
      dataIndex: "name_mon",
      key: "name_mon",
    },
    {
      title: "Англи нэр",
      dataIndex: "name_eng",
      key: "name_eng",
    },
    {
      title :"Өгүүлбэрийн төрөл",
      dataIndex : "label",
      key : "label",
    },
    {
      title: "Үйлдэл",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="topLeft"
            htmlType="submit"
            title={"Мэдээллийг устгахад итгэлтэй байна уу?"}
            onConfirm={() => {
              console.log("delete record", record);
              deleteIntroVideo(record);
            }}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
          </Popconfirm>
          <Tooltip placement="topRight" title="Дүрэм Засах">
            <Button
              onClick={() => {
                console.log("edit intro video records==>", record);
                console.log("grammerStates updateIntroVideo");
                getFormData(record);
                grammerStates.action = "EDIT";
                grammerStates.isModalVisible = true;
                grammerStates.updateData = record;
                grammerStates.id = record.id;

                console.log("GRAMMAR STATES : ", grammerStates)
                setGrammerStates({ ...grammerStates });
              }}
              icon={<EditOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Дүрэм бүтэц бүтээх">
            <Button
              onClick={() => {
                console.log("edit intro video records==>", record);
                console.log("grammerStates updateIntroVideo");
                getFormData(record);
                getAllIntroPatternData();
                grammerStates.action = "BUILD_STRUCTURE";
                grammerStates.isModalVisible = true;
                grammerStates.updateData = record;
                grammerStates.id = record.id;

                console.log("GRAMMAR STATES : ", grammerStates)
                grammerStates.loader = false;
                setGrammerStates({ ...grammerStates });
              }}
              icon={<PlusCircleOutlined style={{ color: "#FAAD14" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Дүрэм бүтэц харах">
            <Button
              onClick={() => {
                console.log("see grammar structure records==>", record);
                console.log("grammerStates updateIntroVideo");
                getFormData(record);
                grammerStates.action = "SEE_STRUCTURE";
                grammerStates.isModalVisible = true;
                grammerStates.updateData = record;
                grammerStates.id = record.id;
                getGrammarStructure(record.id);
                console.log("GRAMMAR STATES : ", grammerStates)
                grammerStates.loader = false;
                setGrammerStates({ ...grammerStates });
              }}
              icon={<CheckOutlined style={{ color: "#FAAD14" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Жишээ өгүүлбэр нэмэх">
            <Button
              onClick={() => {
                console.log("see grammar structure records==>", record);
                console.log("grammerStates updateIntroVideo");
                getFormData(record);
                grammerStates.action = "ADD_EXAMPLE";
                grammerStates.isModalVisible = true;
                grammerStates.updateData = record;
                grammerStates.id = record.id;
                getGrammarStructure(record.id);
                console.log("GRAMMAR STATES : ", grammerStates)
                grammerStates.loader = false;
                setGrammerStates({ ...grammerStates });
              }}
              icon={<PlusCircleOutlined style={{ color: "#FAAD14" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Жишээ өгүүлбэр харах">
            <Button
              onClick={() => {
                console.log("see grammar structure records==>", record);
                console.log("grammerStates updateIntroVideo");
                getFormData(record);
                grammerStates.action = "SEE_EXAMPLES";
                grammerStates.isModalVisible = true;
                grammerStates.updateData = record;
                grammerStates.id = record.id;
                getGrammarStructure(record.id);
                // console.log("GRAMMAR STATES : ", grammerStates)
                getGrammarTableExampleByGrammarID();
                grammerStates.loader = false;
                
                setGrammerStates({ ...grammerStates });
              }}
              icon={<CheckOutlined style={{ color: "#FAAD14" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Жишээ рүү үсрэх ЗАСВАРТАЙ ороод дэмий л байхдаа">
            <Button
              onClick={() => {
                console.log("Cue button intro video records ID==>", record.id);
                navigate("/content/grammer-table-example");
                props.courseIds.grammarId = record.id;
                props.setCourseIds({ ...props.courseIds });
              }}
              icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip>
          {/* <Tooltip placement="topRight" title="Cue руу үсрэх">
            <Button
              onClick={() => {
                console.log("Cue button intro video records ID==>", record.id);
                navigate("/course/intro-cue-video");
                props.courseIds.introVideoId = record.id;
                props.setCourseIds({ ...props.courseIds });
              }}
              icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip> */}
        </Space>
      ),
    },
  ];

  const getFormData = (record) => {
    form.setFieldsValue({
      name_mon: record.name_mon,
      name_eng: record.name_eng,
      label : record.label,
    });
  };

  //GET All intro video list
  const getAllIntroData = () => {
    grammerStates.loader = true;
    setGrammerStates({ grammerStates });
    getAllGrammerAPI(grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          grammerStates.data = res.data.data;
          setGrammerStates({ ...grammerStates });
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео авах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео авах үед/");
        console.log(e);
      });
  };

  const getAllIntroPatternData = () => {
    grammerStates.loader = true;
    setGrammerStates({grammerStates});
    getAllGrammerPatternAPI(grammerStates.token)
      .then((res) => {
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          setGrammerStates({grammerStates});
          grammerStates.grammarPattern = res.data.data;
          setGrammerStates({ ...grammerStates });
          console.log("success all pattern data : ", res.data.data);
          console.log("GRAMMAR STATES : ", grammerStates);
          // message.success("AMjilttai ");
        } else {
          message.error("Алдаа гарлаа Grammar pattern");
        }
      })
      .catch((err) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Grammar pattern");
        console.log(err);
      })
  }
  const getGrammarStructure = (id) => {
    grammerStates.loader = true;
    setGrammerStates({grammerStates});
    getIntoGrammerStructureByGrammarIDAPI(id, grammerStates.token)
      .then((res) => {
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          setGrammerStates({grammerStates});
          grammerStates.getGrammarStructure = res.data.data;
          setGrammerStates({ ...grammerStates });
          console.log("success all structure data : ", res.data.data);
          console.log("GRAMMAR STATES : ", grammerStates);
          // message.success("AMjilttai ");
        } else {
          message.error("Алдаа гарлаа Grammar pattern");
        }
      })
      .catch((err) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Grammar pattern");
        console.log(err);
      })
  }

  const deleteGrammarStructure = (id) => {
    grammerStates.loader = true;
    setGrammerStates({grammerStates});
    deleteIntoGrammerStructureByGrammarIDAPI(id, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай устгагдлаа");
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        }
      })
      .catch((err) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Grammar pattern");
        console.log(err);
      })
  }


  const insertIntroVideoClicked = () => {
    grammerStates.isModalVisible = true;
    grammerStates.action = "ADD_GRAMMAR";
    setGrammerStates({ ...grammerStates });
  };

  const onChangeGrammarStructure = (val) => {
    
    grammerStates.grammarBuildPattern = val;
    setGrammerStates({...grammerStates})

    console.log("grammar pattern on change :  ", grammerStates.grammarBuildPattern);
  }

  const insertIntroVideo = (values) => {
    console.log("insert data values", values);
    grammerStates.loader = true;
    setGrammerStates({ grammerStates });
    grammerStates.insertData = {
      name_mon: values.name_mon,
      name_eng: values.name_eng,
      label : values.label,
    };
    insertIntoGrammerAPI(grammerStates.insertData, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай grammer нэмэгдлээ");
          console.log("success all language", res.data.data);
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа / grammer нэмэх үед/");
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        grammerStates.loader = false;
        setGrammerStates({ ...grammerStates });
        props.setLoader(false);
        message.error("Алдаа гарлаа /grammer нэмэх үед/");
        form.resetFields();
        console.log(e);
      });
  };

  const deleteIntroVideo = (values) => {
    deleteGrammerAPI(values.id, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай устгагдлаа");
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        console.log(e);
      });
  };


  const insertGrammarStructure = (values) => {
    insertIntoGrammerStructureAPI(values, grammerStates.token)
    .then((res) => {
      grammerStates.loader = false;
      setGrammerStates({ ...grammerStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        message.success("Ажилттай бүтэц нэмлээ");
        console.log("successfully inserted grammar structure", res.data.data);
      } else {
        //unsuccessful
        message.error("Алдаа гарлаа ");
      }
    })
    .catch((e) => {
      //unsuccessful
      props.setLoader(false);
      message.error("Алдаа гарлаа");
      console.log(e);
    });
  }

  const updateIntroVideo = (values) => {
    console.log("update values", values);
    grammerStates.updateData = {
      id: grammerStates.id,
      name_mon: values.name_mon,
      name_eng: values.name_eng,
      label : values.label,
    };
    setGrammerStates({ ...grammerStates });
    updateGrammerAPI(grammerStates.updateData, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай засагдлаа");
          console.log("success all language", res.data.data);
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        console.log(e);
        form.resetFields();
      });
  };

  const onFinishIntroVideo = (values) => {
    console.log("onfinish");
    grammerStates.isModalVisible = false;

    if (grammerStates.action === "EDIT") {
      console.log("edit values", values);
      updateIntroVideo(values);
    } else {
      console.log("insert intro video running");
      insertIntroVideo(values);
    }
  };

  const onFinishDeleteGrammarStructure = () => {
    deleteGrammarStructure(grammerStates.id)
    getGrammarStructure(grammerStates.id)
    grammerStates.isModalVisible = false;
  }

  const onFinishAddExample = (values) => {
    values.grammar_id = grammerStates.id;

    insertGrammarTableExample(values)
    console.log("onfinish PISDAAAAAA", values);    
    grammerStates.isModalVisible = false;
  }

  const insertGrammarTableExample = (data) => {
    grammerStates.loader = true;
    setGrammerStates({grammerStates});
    insertGrammarTableExampleAPI(data, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroData();
          message.success("Ажилттай устгагдлаа");
          console.log("success all language", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео устгах үед/");
        }
      })
      .catch((err) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Grammar pattern");
        console.log(err);
      })
  }

  const getGrammarTableExampleByGrammarID = () => {
    grammerStates.loader = true;
    setGrammerStates({grammerStates});
    getGrammarTableExampleByGrammarIDAPI(grammerStates.id, grammerStates.token)
      .then((res) => {
        grammerStates.loader = false;
        setGrammerStates({ grammerStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          // getAllIntroData();
          grammerStates.getGrammarTableExample = res.data.data;
          setGrammerStates({ ...grammerStates });
          // message.success("Ажилттай устгагдлаа");
          console.log("success all grammar examples", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа ");
        }
      })
      .catch((err) => {
        props.setLoader(false);
        message.error("Алдаа гарлаа Grammar pattern");
        console.log(err);
      })
  }


  const onFinishGrammarPattern = (values) => {
    console.log("onfinish");
    
    var structures = [];
    grammerStates.grammarBuildPattern.map((val, ind, arr) => {
      grammerStates.grammarPattern.map((val1, ind1, arr1) => {
        // console.log("val1 : ", val1);
        if(val === val1.name_eng) {
          var obj = {grammar_id : grammerStates.id, pattern_id : val1.id, ordering : structures.length + 1, type_label : 0,}
          structures.push(obj)
        }
      })
    });

    grammerStates.insertGrammarStructure = {course_grammar_structures : structures};



    if (grammerStates.action === "EDIT") {
      console.log("edit values", values);
      // updateIntroVideo(values);
    } else {
      console.log("insert grammar structure insert running");
      insertGrammarStructure(grammerStates.insertGrammarStructure);
    }

    console.log("states :",grammerStates);
  };

  const onFinishFailedIntroVideo = () => {
    console.log("onfinish failed");
  };
  

  const onChangeCheck = (checkedValues) => {
    console.log("checked values", checkedValues.toString());
    grammerStates.host_source = checkedValues.toString();
    setGrammerStates({ ...grammerStates });
  };
  useEffect(() => {
    console.log("intro video useffect");
    getAllIntroData();
    getAllIntroPatternData()
  }, []);

  return (
    <Card title={"Дүрэм"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={grammerStates.loader}
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
            onClick={insertIntroVideoClicked}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Дүрэм нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={grammerStates.data} />
        <Modal
          title="Дүрэм"
          width={"80%"}
          visible={grammerStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            grammerStates.isModalVisible = false;
            grammerStates.action = null;
            setGrammerStates({ ...grammerStates });
          }}
        >
          {(() => {
            if (grammerStates.action === "ADD_GRAMMAR") {
              return (
              <Form
                form={form}
                name="addWord"
                labelCol={{ span: 8}}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinishIntroVideo}
                onFinishFailed={onFinishFailedIntroVideo}
                autoComplete="off"
              >
                <Row>
                  <Col span={36}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Монгол нэр"
                          name="name_mon"
                          rules={[
                            { required: true, message: "Заавал бөглөнө үү!" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12} flex="auto">
                        <Form.Item
                          label="Англи нэр"
                          name="name_eng"
                          rules={[
                            { required: true, message: "Заавал бөглөнө үү!" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item 
                          label="Өгүүлбэрийн төрөл" 
                          name="label"
                          rules={[
                            {required:true, message: "Заавал бөглөнө үү!" },
                          ]} 
                        >
                          <Input/>
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
              );
            }   else if (grammerStates.action === "EDIT") {
                return (
                <Form
                  form={form}
                  name="addWord"
                  labelCol={{ span: 8}}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishIntroVideo}
                  onFinishFailed={onFinishFailedIntroVideo}
                  autoComplete="off"
                >
                  <Row>
                    <Col span={36}>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Монгол нэр"
                            name="name_mon"
                            rules={[
                              { required: true, message: "Заавал бөглөнө үү!" },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12} flex="auto">
                          <Form.Item
                            label="Англи нэр"
                            name="name_eng"
                            rules={[
                              { required: true, message: "Заавал бөглөнө үү!" },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item 
                            label="Өгүүлбэрийн төрөл" 
                            name="label"
                            rules={[
                              {required:true, message: "Заавал бөглөнө үү!" },
                            ]} 
                          >
                            <Input/>
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
                );
            } else if (grammerStates.action === "BUILD_STRUCTURE") {
              return (
                <Form
                  form={form}
                  name="addWord"
                  labelCol={{ span: 8}}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishGrammarPattern}
                  onFinishFailed={onFinishFailedIntroVideo}
                  autoComplete="off"
                >
                   <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select"
                    onChange={onChangeGrammarStructure}
                    optionLabelProp="label"
                  >
                    {grammerStates.grammarPattern.map((option) => (
                      <Option value={option.name_eng}>{option.name_eng}</Option>
                    ))}
                  </Select>
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
                );
            } 
            else if (grammerStates.action === "ADD_EXAMPLE") {
              return (
                <Form
                  form={form}
                  name="add_example"
                  labelCol={{ span: 8}}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishAddExample}
                  onFinishFailed={onFinishFailedIntroVideo}
                  autoComplete="off"
                >
                   <Row>
                    <Col span={36}>
                      <Row>
                        <Col span={18} flex="auto">
                          <Form.Item
                            label="Англи текст"
                            name="eng_text"
                            rules={[
                              { required: true, message: "Заавал бөглөнө үү!" },
                            ]}
                          >
                            <TextArea rows={5} />
                          </Form.Item>
                        </Col>
                        <Col span={18} flex="auto">
                          <Form.Item 
                            label="Монгол текст" 
                            name="mon_text"
                            rules={[
                              {required:true, message: "Заавал бөглөнө үү!" },
                            ]} 
                          >
                            <TextArea rows={5}/>
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
                );
            } else if (grammerStates.action === "SEE_STRUCTURE") {
              return (
                <Form
                  form={form}
                  name="addWord"
                  labelCol={{ span: 8}}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishDeleteGrammarStructure}
                  onFinishFailed={onFinishFailedIntroVideo}
                  autoComplete="off"
                >
                  <Table columns={columns_grammar_structure} dataSource={grammerStates.getGrammarStructure} />
                  <Form.Item wrapperCol={{ offset: 17, span: 7 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      УСТГАХ
                    </Button>
                  </Form.Item>
                </Form>
                );
            } else if (grammerStates.action === "SEE_EXAMPLES") {
              return (
                <Form
                  form={form}
                  name="addWord"
                  labelCol={{ span: 8}}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishDeleteGrammarStructure}
                  onFinishFailed={onFinishFailedIntroVideo}
                  autoComplete="off"
                >
                  <Table columns={columns_grammar_example} dataSource={grammerStates.getGrammarTableExample} />
                  <Form.Item wrapperCol={{ offset: 17, span: 7 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      УСТГАХ
                    </Button>
                  </Form.Item>
                </Form>
                );
            }
          })()}
          
        </Modal>
      </Spin>
    </Card>
  );
}
