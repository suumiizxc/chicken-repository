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
  IeCircleFilled,
} from "@ant-design/icons";

import {

  getAllGrammerPatternAPI,
  insertGrammarTableExampleAPI,
  deleteGrammarTableExampleByGrammarIDAPI,
  getGrammarTableExampleByGrammarIDAPI,
  updateGrammarTableExampleByGrammarIDAPI,

  insertGrammarTableExamplePatternAPI,
  getGrammarTableExamplePatternByGrammarIDAPI,
  deleteGrammarTableExamplePatternByGrammarIDAPI,
} from "../../../services/Content_service";
import { max } from "moment";


const { Option } = Select;
const { TextArea } = Input;

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();

  const [grammarExampleStates, setGrammarExampleStates] = useState({
    token: localStorage.getItem("token"),
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    id: null,
    host_source: null,
    checkBoxOptions: ["YouTube", "Amazon"],
    insertData: {},
    updateData: {},
    engTextSplitted : null,
    grammarPattern : [],
    grammarBuildPattern : [],
    grammarExamplePatterns : [],
    grammarExamplePattern : null,
    getGrammarExamplePattern : null,
    test_data : [],
  });


  // const test_data = [
	// 	{
	// 		"id": 8,
	// 		"name_eng": "Main Verb",
	// 		"name_mon": "Гол үйл үг",
	// 		"short_eng_name": "MV"
	// 	},
	// 	{
	// 		"id": 5,
	// 		"name_eng": "Possesive pronoun",
	// 		"name_mon": "Харьяалах төлөөний үг",
	// 		"short_eng_name": "PP"
	// 	},
	// 	{
	// 		"id": 6,
	// 		"name_eng": "Subject Complement",
	// 		"name_mon": "Өгүүлэгдэхүүнийг тодорхойлогч",
	// 		"short_eng_name": "SC"
	// 	},
	// 	{
	// 		"id": 7,
	// 		"name_eng": "Auxiliary verb",
	// 		"name_mon": "Туслах үйл үг",
	// 		"short_eng_name": "AV"
	// 	},
	// 	{
	// 		"id": 1,
	// 		"name_eng": "Subject",
	// 		"name_mon": "Өгүүлэгдэхүүн",
	// 		"short_eng_name": "S"
	// 	},
	// 	{
	// 		"id": 2,
	// 		"name_eng": "Tobe",
	// 		"name_mon": "Байх",
	// 		"short_eng_name": "Tobe"
	// 	},
	// 	{
	// 		"id": 3,
	// 		"name_eng": "Object",
	// 		"name_mon": "Тусагдахуун",
	// 		"short_eng_name": "Obj"
	// 	},
	// 	{
	// 		"id": 4,
	// 		"name_eng": "Adverb",
	// 		"name_mon": "Дайвар үг",
	// 		"short_eng_name": "Adv"
	// 	},
  //   {
  //     "name_eng" : "NULL",
  //     "name_mon" : "NULL"
  //   }
	// ];

  const columns_example_pattern_get = [
    {
      title : "Id",
      dataIndex : "id",
      key : "id",
    },
    {
      title : "Grammar table id",
      dataIndex : "grammar_table_id",
      key : "grammar_table_id",
    },
    {
      title : "word",
      dataIndex : "word",
      key :"word",
    },
    {
      title : "Pattern id",
      dataIndex : ["pattern", "name_eng"],
      key : "pattern_id",
    },
    {
      title : "ORdering",
      dataIndex : "ordering",
      key : "ordering",
    }
  ];

  const columns_examples_pattern = [
    {
      title : "Example id",
      dataIndex : "grammar_table_id",
      key : "grammar_table_id",
    },
    {
      title : "Grammar id",
      dataIndex : "grammar_id", 
      key : "grammar_id",
    },
    {
      title : "Word", 
      dataIndex : "example_word", 
      key : "example_word",
    },
    {
      title : "Ordering",
      key : "ordering",
      dataIndex : "ordering",
    },

    {
      title : "Pattern",
      key : "action",
      render: (text, record) => (
        <Space size="middle">
        <Select
          mode="multiple"
          style={{ width: 300 }}
          placeholder="select"
          onChange={(val)=>{
            console.log("record ID : ", record);
            var pushPatterns = record;
            pushPatterns["pattern_name"] = val[0];
            pushPatterns["created_date"] = new Date().valueOf();
            grammarExampleStates.grammarExamplePatterns.push(pushPatterns);
            setGrammarExampleStates({ ...grammarExampleStates });
          }}
          optionLabelProp="label"
        >
          {grammarExampleStates.test_data.map((option) => (
            <Option value={option.name_eng}>{option.name_eng}</Option>
          ))}
        </Select>

      </Space>
      )
    },
    
  ];


  

  const columns_examples = [
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
      key : "mon_text",
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
              deleteGrammarTableExample(record.id);
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
                console.log("grammarExampleStates updateIntroVideo");
                getFormData(record);
                grammarExampleStates.action = "EDIT";
                grammarExampleStates.isModalVisible = true;
                grammarExampleStates.updateData = record;
                grammarExampleStates.id = record.id;

                console.log("GRAMMAR STATES : ", grammarExampleStates)
                console.log("PROPS : ", props);
                setGrammarExampleStates({ ...grammarExampleStates });
              }}
              icon={<EditOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Патерн засах">
            <Button
              onClick={() => {
                console.log("edit intro video records==>", record);
                console.log("grammarExampleStates updateIntroVideo");
                getFormData(record);
                grammarExampleStates.action = "EDIT_PATTERN";
                grammarExampleStates.isModalVisible = true;
                grammarExampleStates.updateData = record;
                grammarExampleStates.id = record.id;
                const splitted_words = record.eng_text.split(/[.,';:\/ -]/);
                var adjust_words = []
                splitted_words.map((val, ind) => {
                  var obj = {grammar_table_id : record.id, grammar_id : record.grammar_id, example_word : val, ordering : ind + 1};
                  adjust_words.push(obj)
                })

                grammarExampleStates.engTextSplitted = adjust_words;
                grammarExampleStates.grammarExamplePatterns = [];
                grammarExampleStates.grammarExamplePattern = [];
                console.log("GRAMMAR STATES : ", grammarExampleStates)
                console.log("ENG _ TEXT : ", grammarExampleStates.engTextSplitted);
                setGrammarExampleStates({ ...grammarExampleStates });
              }}
              icon={<EditOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip>
          <Tooltip placement="topRight" title="Example pattern харах">
            <Button
              onClick={() => {
                console.log("edit intro video records==>", record);
                console.log("grammarExampleStates updateIntroVideo");
                getFormData(record);
                grammarExampleStates.action = "SEE_EXAMPLE_PATTERN";
                grammarExampleStates.isModalVisible = true;
                grammarExampleStates.updateData = record;
                grammarExampleStates.id = record.id;
                getGrammartTableExamplePatternByGrammarID(grammarExampleStates.id);
                console.log("GRAMMAR STATES : ", grammarExampleStates)
                console.log("PROPS : ", props);
                setGrammarExampleStates({ ...grammarExampleStates });
              }}
              icon={<CheckOutlined style={{ color: "#3e79f7" }} />}
            />
          </Tooltip>
          
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log("grammar table example initialize");
    getAllGrammarTableExample(props.courseIds.grammarId);
    getAllIntroPatternData();
  }, []);

  const getFormData = (record) => {
    form.setFieldsValue({
      eng_text: record.eng_text,
      // url: record.url,
      mon_text: record.mon_text,
    });
  };

  const getAllIntroPatternData = () => {
    grammarExampleStates.loader = true;
    setGrammarExampleStates({grammarExampleStates});
    getAllGrammerPatternAPI(grammarExampleStates.token)
      .then((res) => {
        setGrammarExampleStates({ grammarExampleStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          setGrammarExampleStates({grammarExampleStates});
          grammarExampleStates.test_data = res.data.data;
          setGrammarExampleStates({ ...grammarExampleStates });
          console.log("success all pattern data : ", res.data.data);
          console.log("GRAMMAR STATES : ", grammarExampleStates);
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

  const onChangeExamplePattern = (val) => {
    grammarExampleStates.grammarBuildPattern = val;
    setGrammarExampleStates({...grammarExampleStates})

    console.log("grammar pattern on change :  ", grammarExampleStates.grammarBuildPattern);
  }

  const onFinishExamplePattern = () => {
    console.log("EXAMPLE PATTERN ! : ")
    if(grammarExampleStates.grammarExamplePatterns.length > 0) {
      if(grammarExampleStates.engTextSplitted.length > 0) {
        var insert_example_pattern = [];
        grammarExampleStates.engTextSplitted.map((val, ind) => {
          var max_epoch = 0;
          var max_row = null;
          grammarExampleStates.grammarExamplePatterns.map((val1, ind1) => {
            
            if(val.example_word === val1.example_word) {
              
              if(max_epoch < val1.created_date) {
                console.log("VAL1 : ",val1)
                max_epoch = val1.created_date;
                max_row = val1
              }
            }
          })
          if(max_epoch != 0 && max_row != null) {
            console.log("max_row : ", max_row);
            var id = null;
            if (max_row.pattern_name !== "null") {
              if (max_row.pattern_name != undefined) {
                grammarExampleStates.test_data.map((val) => {
                  if (val.name_eng == max_row.pattern_name) {
                    id = val.id;
                  }
                })
                
              }
            }
            
            var obj = {grammar_table_id : max_row.grammar_table_id, word : max_row.example_word, pattern_id : id, ordering : max_row.ordering};
            insert_example_pattern.push(obj);
          }
        });

        console.log("INSERT example pattern : ", insert_example_pattern);
        grammarExampleStates.grammarExamplePattern = {example_patterns : insert_example_pattern};
        setGrammarExampleStates({ ...grammarExampleStates });
        insertGrammartTableExamplePattern(grammarExampleStates.grammarExamplePattern);
        
      }
    }
  }


  const insertGrammartTableExamplePattern = (data) => {
    grammarExampleStates.loader = true;
    setGrammarExampleStates({ grammarExampleStates });
    insertGrammarTableExamplePatternAPI(data,grammarExampleStates.token)
      .then((res) => {
        grammarExampleStates.loader = false;
        setGrammarExampleStates({ grammarExampleStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          // grammarExampleStates.data = res.data.data;
          setGrammarExampleStates({ ...grammarExampleStates });
          console.log("success insert data", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлааw");
        console.log(e);
      });
  };

  // getGrammarTableExamplePatternByGrammarIDAPI
  const getGrammartTableExamplePatternByGrammarID = (id) => {
    grammarExampleStates.loader = true;
    setGrammarExampleStates({ grammarExampleStates });
    getGrammarTableExamplePatternByGrammarIDAPI(id,grammarExampleStates.token)
      .then((res) => {
        grammarExampleStates.loader = false;
        setGrammarExampleStates({ grammarExampleStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          grammarExampleStates.getGrammarExamplePattern = res.data.data;
          setGrammarExampleStates({ ...grammarExampleStates });
          console.log("success get data", res.data.data);
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлааw");
        console.log(e);
      });
  };
  

  const getAllGrammarTableExample = (id) => {
    grammarExampleStates.loader = true;
    setGrammarExampleStates({ grammarExampleStates });
    getGrammarTableExampleByGrammarIDAPI(id,grammarExampleStates.token)
      .then((res) => {
        grammarExampleStates.loader = false;
        setGrammarExampleStates({ grammarExampleStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          grammarExampleStates.data = res.data.data;
          setGrammarExampleStates({ ...grammarExampleStates });
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

  const onFinishDeleteAllExamplePattern = () => {
    console.log("ened ustgana ", grammarExampleStates.id)
    // deleteGrammarTableExamplePatternByGrammarIDAPI
    deleteGrammarTableExamplePattern(grammarExampleStates.id);
    grammarExampleStates.isModalVisible = false;
    setGrammarExampleStates({ ...grammarExampleStates });
  }
  
  const deleteGrammarTableExamplePattern = (id) => {
    deleteGrammarTableExamplePatternByGrammarIDAPI(id, grammarExampleStates.token)
      .then((res) =>{
        grammarExampleStates.loader = false;
        setGrammarExampleStates({ grammarExampleStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllGrammarTableExample(props.courseIds.grammarId);
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

  const deleteGrammarTableExample = (id) => {
    deleteGrammarTableExampleByGrammarIDAPI(id, grammarExampleStates.token)
      .then((res) =>{
        grammarExampleStates.loader = false;
        setGrammarExampleStates({ grammarExampleStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllGrammarTableExample(props.courseIds.grammarId);
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

  const onFinishExampleUpdate = (values) => {
    grammarExampleStates.updateData = {
      id : grammarExampleStates.id,
      grammar_id : props.courseIds.grammarId,
      eng_text : values.eng_text,
      mon_text : values.mon_text, 
    };

    console.log("Update data : ", grammarExampleStates.updateData)
    setGrammarExampleStates({...grammarExampleStates});
    updateGrammarTableExampleByGrammarIDAPI(grammarExampleStates.updateData, grammarExampleStates.token)
    .then((res) =>{
      grammarExampleStates.loader = false;
      setGrammarExampleStates({ grammarExampleStates });
      if (res && res.data && res.data.status && res.data.status === true) {
        //success
        getAllGrammarTableExample(props.courseIds.grammarId);
        message.success("Ажилттай шинэчиллээ");
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
  }
  const onFinishFailed = () => {
    console.log("on finish failed")
  }

  return (
    <Card title={"Дүрэм"} style={{ margin: 15, width: "100%" }}>
    <Table columns={columns_examples} dataSource={grammarExampleStates.data} />
    <Modal
          title="Дүрэм"
          width={"80%"}
          visible={grammarExampleStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            grammarExampleStates.isModalVisible = false;
            grammarExampleStates.action = null;
            setGrammarExampleStates({ ...grammarExampleStates });
          }}
        >
          {(() => {
            if (grammarExampleStates.action === "EDIT") {
              return (
              <Form
                form={form}
                name="EDIT"
                labelCol={{ span: 8}}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinishExampleUpdate}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row>
                  <Col span={36}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Англи нэр"
                          name="eng_text"
                          rules={[
                            { required: true, message: "Заавал бөглөнө үү!" },
                          ]}
                        >
                         <TextArea/>
                        </Form.Item>
                      </Col>
                      <Col span={12} flex="auto">
                        <Form.Item
                          label="Монгол текст"
                          name="mon_text"
                          rules={[
                            { required: true, message: "Заавал бөглөнө үү!" },
                          ]}
                        >
                          <TextArea/>
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
            } else if (grammarExampleStates.action === "EDIT_PATTERN") {
              return (
              <Form
                form={form}
                name="EDIT_PATTERN"
                labelCol={{ span: 8}}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinishExamplePattern}
                onFinishFailed={onFinishFailed}
                onPointerCancelCapture={onFinishFailed}
                autoComplete="off"
              >
                
              <Table columns={columns_examples_pattern} dataSource={grammarExampleStates.engTextSplitted} />
                
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
            } else if (grammarExampleStates.action === "SEE_EXAMPLE_PATTERN") {
              return (
              <Form
                form={form}
                name="EDIT_PATTERN"
                labelCol={{ span: 8}}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinishDeleteAllExamplePattern}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                
              <Table columns={columns_example_pattern_get} dataSource={grammarExampleStates.getGrammarExamplePattern} />
                
                <Form.Item wrapperCol={{ offset: 17, span: 7 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Бүгдийг устгах
                  </Button>
                </Form.Item>
              </Form>
              );
            }

          })()}
          </Modal>
    </Card>
  )
}
