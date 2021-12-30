import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Spin,
  Divider,
  Col,
  Row,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  deleteWord,
  findRootWord,
  getLanguageWord,
  getTypesWord,
  getWords,
  insertTranslation,
  updateTranslation,
  insertWordTransalation,
  updateWord,
} from "../../services/Word_service";

export default function Index(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [wordLoader, setWordLoader] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [wordStates, setWordStates] = useState({
    isModalVisible: false,
    data: null,
    all_language: null,
    types: null,
    language_id: null,
    word_id: null,
    insertWord: {
      language_id: null,
      word: null,
      root_word_id: null,
      type_id: null,
      created_by: null,
      to_language_id: null,
      translation_to_origin: null,
      translations: {
        noun: null,
        verb: null,
        adjective: null,
        adverb: null,
        pronoun: null,
        preposition: null,
        conjunction: null,
        determiner: null,
        exclamation: null,
        modal_verb: null,
        phrasal_verb: null,
        idiom: null,
        auxilary_verb: null,
        phrase: null,
        example_1: null,
        example_2: null,
        example_3: null,
      },
    },
    editWord: {},
    deleteWord: {},
    editWordInit: {},
    action: null,
    rootWordLikely: [],
    rootWordEqually: [],
  });

  const EditDate = (date) => {
    const slitDate = date.split(" ");
    return slitDate[0];
  };

  const onChangeRootWordOption = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchRootWordOption = (val) => {
    console.log("search:", val);
    findRootWord(val, props.userData.token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("success find root word equally", res.data.equally);
          console.log("success find root word likely", res.data.likely);
          wordStates.isModalVisible = false;
          wordStates.rootWordLikely = res.data.likely;
          wordStates.rootWordEqually = res.data.equally;
          setWordStates(wordStates);
        } else {
          //unsuccessful
          console.log("unsuccessfully find root word");
        }
      })
      .catch((e) => {
        //unsuccessful
        setWordLoader(false);
        console.log("catch error find root word", e);
      });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Үндсэн хэл",
      dataIndex: "language_id",
      key: "language_id",
    },
    {
      title: "Үг",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Цагийн хэлбэр",
      dataIndex: "type_id",
      key: "type_id",
    },
    {
      title: "Үгийн үндэс",
      dataIndex: "root_word_id",
      key: "root_word_id",
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => <Space size="middle">{EditDate(text)}</Space>,
    },
    {
      title: "Ажилтан",
      dataIndex: "created_by",
      key: "created_by",
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
              runDeleteWord(record);
            }}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
          </Popconfirm>
          <Button
            onClick={() => {
              wordStates.isModalVisible = true;
              wordStates.editWord = record;
              wordStates.action = "EDIT";
              getFormData(record);
              setWordStates({ ...wordStates });
              console.log("wordState editWords", wordStates.editWord);
            }}
            icon={<EditOutlined style={{ color: "#3e79f7" }} />}
          />
        </Space>
      ),
    },
  ];

  const getFormData = (data) => {
    form.setFieldsValue({
      language_id: data.language_id,
      word: data.word,
      type_id: data.type_id,
      root_word_id: data.root_word_id,
      noun: data.noun,
      verb: data.verb,
      adjective: data.adjective,
      adverb: data.adverb,
      pronoun: data.pronoun,
      preposition: data.preposition,
      conjunction: data.conjunction,
      determiner: data.determiner,
      exclamation: data.exclamation,
      modal_verb: data.modal_verb,
      phrasal_verb: data.phrasal_verb,
      idiom: data.idiom,
      auxilary_verb: data.auxilary_verb,
      phrase: data.phrase,
      example_1: data.example_1,
      example_2: data.example_2,
      example_3: data.example_3,
    });
  };

  const runDeleteWord = (data) => {
    console.log("DELETE record", data);
    setWordLoader(true);
    deleteWord(parseInt(data.id), props.userData.token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("success delete word");
          wordStates.isModalVisible = false;
          setWordStates(wordStates);
          getAllWords();
          message.warning("Ажилттай устгагдлаа");
        } else {
          //unsuccessful
          console.log("unsuccessfully delete word");
        }
      })
      .catch((e) => {
        //unsuccessful
        setWordLoader(false);
        console.log("catch error", e);
      });
  };

  const wordAdd = () => {
    setWordStates({ ...wordStates, isModalVisible: true });
  };

  const onLanguageChange = (value) => {
    setWordStates({ ...wordStates, language_id: value });
    console.log("worDsTATE", wordStates.language_id);
  };

  const onTypeChange = (value) => {
    setWordStates({ ...wordStates, type_id: value });
    console.log("wordState type id", wordStates.type_id);
  };

  const onFinishFailedWord = (err) => {
    console.log("onFinishFailed", err);
  };

  const onFinishWord = (values) => {
    console.log("values onFinish", values);

    setWordStates({ ...wordStates });
    console.log("ACTION", wordStates.action);
    if (wordStates.action === "EDIT") {
      wordStates.editWord = {
        id: parseInt(wordStates.editWord.id),
        language_id: parseInt(values.language_id),
        word: values.word,
        type_id: values.type_id,
        root_word_id: parseInt(values.root_word_id),
        created_by: parseInt(localStorage.getItem("user_id")),
      };
      setWordLoader(true);
      updateWord(wordStates.editWord, props.userData.token)
        .then((res) => {
          setWordLoader(false);
          if (res && res.data && res.data.status && res.data.status === true) {
            //success
            console.log("success update word");
            wordStates.isModalVisible = false;
            setWordStates(wordStates);
            getAllWords();
            //Update translation
            updateTranslations(values);
            message.success("Ажилттай засагдлаа");
            // form.resetFields();
          } else {
            //unsuccessful
            message.error("Алдаа гарлаа /үг засах үед/");
            console.log("unsuccessfully update word");
          }
        })
        .catch((e) => {
          //unsuccessful
          message.error("Алдаа гарлаа /үг засах үед/");
          console.log(e);
        });
    }
    // insert Word
    else {
      console.log("insert word VALUES", values);
      wordStates.insertWord = {
        language_id: parseInt(values.language_id),
        word: values.word,
        type_id: values.type_id === undefined ? 0 : values.type_id,
        root_word_id: parseInt(values.root_word_id),
        created_by: parseInt(localStorage.getItem("user_id")),
        to_language_id: 27, //static
        translation_to_origin:
          values.translation_to_origin === undefined
            ? "English to Mongolia"
            : values.translation_to_origin,
        translations: {
          noun: values.noun,
          verb: values.verb,
          adjective: values.adjective,
          adverb: values.adverb,
          pronoun: values.pronoun,
          preposition: values.preposition,
          conjunction: values.conjunction,
          determiner: values.determiner,
          exclamation: values.exclamation,
          modal_verb: values.modal_verb,
          phrasal_verb: values.pharse_verb,
          idiom: values.idiom,
          auxilary_verb: values.auxilary_verb,
          phrase: values.phrase,
          example_1: values.example_1,
          example_2: values.example_2,
          example_3: values.example_3,
        },
      };
      console.log("insert word", wordStates.insertWord);
      setWordLoader(true);
      insertWordTransalation(wordStates.insertWord, props.userData.token)
        .then((res) => {
          setWordLoader(false);
          if (res && res.data && res.status && res.word.status === true) {
            //success
            console.log("success insert word");
            getAllWords();
            wordStates.word_id = res.data.data.word.id;
            wordStates.isModalVisible = false;
            setWordStates({ ...wordStates });

            // Translation inser
            message.success("Ажилттай нэмэгдлээ");
            // form.resetFields();
          } else {
            //unsuccessful
            setWordLoader(false);
            console.log("unsuccessfully insert word");
            message.error("Алдаа гарлаа /үг нэмэх үед/");
          }
        })
        .catch((e) => {
          //unsuccessful
          console.log("catch insertWord e", e);
          message.error("Алдаа гарлаа /үг нэмэх үед catch/");
        });
    }
  };

  const getAllWords = () => {
    const token = localStorage.getItem("token");
    setWordLoader(true);
    //1. Get table all words request
    getWords(token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success

          console.log("success all words", res.data.data);
          wordStates.data = res.data.data;
          setWordStates({ ...wordStates });
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийн жагсаалт авах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        setWordLoader(false);
        message.error("Алдаа гарлаа /үгийн жагсаалт авах үед/");
        console.log(e);
      });
    //2. Get word types request
    getTypesWord(token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success

          console.log("success all types", res.data.data);
          wordStates.types = res.data.data;

          setWordStates({ ...wordStates });
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийн төрөл авах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийн төрөл авах үед/");
        console.log(e);
      });

    //3. Get word language request
    getLanguageWord(token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success

          console.log("success all language", res.data.data);
          wordStates.all_language = res.data.data;

          setWordStates({ ...wordStates });
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг language авах үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг language авах үед/");
        console.log(e);
      });
  };

  //... Save word translation request
  const insertTranslations = (data, token) => {
    insertTranslation(data, token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("success all translation type", res.data.data);
          setWordStates({ ...wordStates });
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг орчуулга нэмэх үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг орчуулга нэмэх үед/");
        console.log(e);
      });
  };

  //... Update word translation request
  const updateTranslations = (values) => {
    console.log("values tran update", values);
    const translationsData = {
      word_id: wordStates.word_id,
      to_language_id: parseInt(values.language_id),
      translation_to_origin: "english to mongolia",
      created_by: parseInt(localStorage.getItem("user_id")),
      translations: {
        noun: values.noun,
        verb: values.verb,
        adjective: values.adjective,
        adverb: values.adverb,
        pronoun: values.pronoun,
        preposition: values.preposition,
        conjunction: values.conjunction,
        determiner: values.determiner,
        exclamation: values.exclamation,
        modal_verb: values.modal_verb,
        phrasal_verb: values.phrasal_verb,
        idiom: values.idiom,
        auxilary_verb: values.auxilary_verb,
        phrase: values.phrase,
        example_1: values.example_1,
        example_2: values.example_2,
        example_3: values.example_3,
      },
    };
    // Translation update

    updateTranslation(translationsData, props.userData.token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("success all translation UPDATE", res.data.data);
          getAllWords();
          message.success("Амжилттай засагдлаа орчуулга");
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг орчуулга нэмэх үед/");
        }
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг орчуулга нэмэх үед/");
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("word useffect");
    getAllWords();
  }, [wordStates.isModalVisible]);

  return (
    <Card title={"Курс"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={wordLoader}
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
            onClick={wordAdd}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Үг нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={wordStates.data} />
        {/* {wordStates.isModalVisible ? ( */}
        <Modal
          title="Үг нэмэх"
          width={"70%"}
          visible={wordStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            wordStates.isModalVisible = false;
            wordStates.action = null;
            setWordStates({ ...wordStates });
          }}
        >
          <Form
            form={form}
            name="addWord"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinishWord}
            onFinishFailed={onFinishFailedWord}
            autoComplete="off"
          >
            <Row>
              <Divider>Word add</Divider>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name={"language_id"}
                      label="Үндсэн хэл"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Select
                        placeholder="Үндсэг хэлээ сонгоно уу"
                        defaultValue={null}
                        onChange={onLanguageChange}
                      >
                        {wordStates.all_language &&
                          wordStates.all_language.map((type) => (
                            <Option value={type.id}>{type.name}</Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Үг"
                      name="word"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={"type_id"}
                      label="Цагын хэлбэр"
                      // rules={[
                      //   { required: true, message: "Заавал бөглөнө үү!" },
                      // ]}
                    >
                      <Select
                        placeholder="Цагын хэлбэрээ сонгоно уу"
                        defaultValue={null}
                        onChange={onTypeChange}
                        allowClear
                      >
                        {wordStates.types &&
                          wordStates.types.map((type, i) => (
                            <Option key={i} value={type.id}>
                              {type.full_name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Үгийн үндэс" name="root_word_id">
                      <Input disabled={!wordStates.type_id} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Divider>Word translation</Divider>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item label={"noun"} name={"noun"}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={"modal_verb"} name={"modal_verb"}>
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
        </Modal>
      </Spin>
    </Card>
  );
}
