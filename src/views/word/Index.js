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
  findRootWord,
  getLanguageWord,
  getTypesWord,
  getWords,
  getWordsId,
  insertWordTransalation,
  updateWordTranslation,
  deleteWordTranslation,

  getFindWords,
} from "../../services/Word_service";

const { Search } = Input;
const { TextArea } = Input;

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
    get_word_count : 0,
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
    editWord: {
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
    },
    deleteWord: {},
    editWordInit: {},
    action: null,
    rootWordLikely: [],
    rootWordEqually: [],
  });
  const [showWordStateOption, setShowWordStateOption] = useState(false);

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
      render: (text, record) => (
        <Space size="middle">
          {record.word_type.id === 0 ? (
            <span style={{ color: "#FAAD14" }}>Байхгүй</span>
          ) : (
            record.word_type.full_name
          )}
        </Space>
      ),
    },
    {
      title: "Үгийн үндэс",
      dataIndex: "root_word_id",
      key: "root_word_id",
      render: (text, record) => (
        <Space size="middle">
          {record.root_word.id === 0 ? (
            <span style={{ color: "#FAAD14" }}>Байхгүй</span>
          ) : (
            record.root_word.word
          )}
        </Space>
      ),
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
      render: (text, record) => (
        <Space size="middle">
          {record.created_user.first_name + " " + record.created_user.last_name}
        </Space>
      ),
    },
    {
      title: "Үйлдэл",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Popconfirm
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
          </Popconfirm> */}
          <Button
            onClick={() => {
              wordStates.isModalVisible = true;
              wordStates.editWord = record;
              wordStates.action = "EDIT";
              console.log("edit word records==>", record);
              getWordsId(record.id, props.userData.token)
                .then((res) => {
                  setWordLoader(false);
                  console.log("getWORDID", res);
                  if (
                    res &&
                    res.data.word &&
                    res.data.word_translation &&
                    res.data.status === true
                  ) {
                    //success
                    console.log("success get word id", res);
                    getFormData(res.data.word, res.data.word_translation);
                  } else {
                    //unsuccessful
                    console.log("unsuccessfully get word id");
                  }
                })
                .catch((e) => {
                  //unsuccessful
                  setWordLoader(false);
                  console.log("catch error", e);
                });

              setWordStates({ ...wordStates });
              console.log("wordState editWords", wordStates.editWord);
            }}
            icon={<EditOutlined style={{ color: "#3e79f7" }} />}
          />
        </Space>
      ),
    },
  ];

  const getFormData = (word, translation) => {
    console.log(
      "translation  real-> obj",
      translation.find((element) => element.translation_type.id === 11)
    );
    console.log("translation word-> ", word);
    console.log("translation translation full-> ", translation);
    const noun = translation.find(
      (element) => element.translation_type.id === 1
    );
    const verb = translation.find(
      (element) => element.translation_type.id === 2
    );
    const adjective = translation.find(
      (element) => element.translation_type.id === 3
    );
    const adverb = translation.find(
      (element) => element.translation_type.id === 4
    );
    const pronoun = translation.find(
      (element) => element.translation_type.id === 5
    );
    const preposition = translation.find(
      (element) => element.translation_type.id === 6
    );
    const conjunction = translation.find(
      (element) => element.translation_type.id === 7
    );
    const determiner = translation.find(
      (element) => element.translation_type.id === 8
    );
    const exclamation = translation.find(
      (element) => element.translation_type.id === 9
    );
    const modal_verb = translation.find(
      (element) => element.translation_type.id === 10
    );
    const phrasal_verb = translation.find(
      (element) => element.translation_type.id === 11
    );
    const idiom = translation.find(
      (element) => element.translation_type.id === 12
    );
    const auxilary_verb = translation.find(
      (element) => element.translation_type.id === 13
    );
    const phrase = translation.find(
      (element) => element.translation_type.id === 14
    );

    const example_1 = translation.find(
      (element) => element.translation_type.id === 200
    );

    const example_2 = translation.find(
      (element) => element.translation_type.id === 201
    );

    const example_3 = translation.find(
      (element) => element.translation_type.id === 202
    );

    form.setFieldsValue({
      language_id: word.language_id,
      word: word.word,
      type_id: word.type_id,
      root_word_id: word.root_word_id,
      translation_to_origin:
        translation.length > 0
          ? translation[0].translation_to_origin
          : "English to Mongolia",
      noun: noun === undefined ? "" : noun.translation_text,
      verb: verb === undefined ? "" : verb.translation_text,
      adjective: adjective === undefined ? "" : adjective.translation_text,
      adverb: adverb === undefined ? "" : adverb.translation_text,
      pronoun: pronoun === undefined ? "" : pronoun.translation_text,
      preposition:
        preposition === undefined ? "" : preposition.translation_text,
      conjunction:
        conjunction === undefined ? "" : conjunction.translation_text,
      determiner: determiner === undefined ? "" : determiner.translation_text,
      exclamation:
        exclamation === undefined ? "" : exclamation.translation_text,
      modal_verb: modal_verb === undefined ? "" : modal_verb.translation_text,
      phrasal_verb:
        phrasal_verb === undefined ? "" : phrasal_verb.translation_text,
      idiom: idiom === undefined ? "" : idiom.translation_text,
      auxilary_verb:
        auxilary_verb === undefined ? "" : auxilary_verb.translation_text,
      phrase: phrase === undefined ? "" : phrase.translation_text,
      example_1: example_1 === undefined ? "" : example_1.translation_text,
      example_2: example_2 === undefined ? "" : example_2.translation_text,
      example_3: example_3 === undefined ? "" : example_3.translation_text,
    });
  };

  const runDeleteWord = (data) => {
    console.log("DELETE record", data);
    setWordLoader(true);
    deleteWordTranslation(parseInt(data.id), props.userData.token)
      .then((res) => {
        setWordLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success

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

  const wordAll = () => {
    // setWordStates({ ...wordStates, isModalVisible: true });
    getAllWords()
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
      console.log("edit word trans values---->", values);
      wordStates.editWord = {
        id: parseInt(wordStates.editWord.id),
        language_id: parseInt(values.language_id),
        word: values.word,
        type_id: values.type_id,
        root_word_id: parseInt(values.root_word_id),
        created_by: parseInt(localStorage.getItem("user_id")),
        to_language_id: 2,
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
          phrasal_verb: values.phrasal_verb,
          idiom: values.idiom,
          auxilary_verb: values.auxilary_verb,
          phrase: values.phrase,
          example_1: values.example_1,
          example_2: values.example_2,
          example_3: values.example_3,
        },
      };
      setWordLoader(true);
      setWordStates({ ...wordStates });
      updateWordTranslation(wordStates.editWord, props.userData.token)
        .then((res) => {
          setWordLoader(false);
          console.log("wordStates.editWord", wordStates.editWord);
          if (res && res.data && res.data.status && res.data.status === true) {
            //success
            console.log("success update word");
            wordStates.isModalVisible = false;
            setWordStates(wordStates);
            getAllWords();
            message.success("Амжилттай засагдлаа");
            form.resetFields();
          } else {
            //unsuccessful
            message.error("Алдаа гарлаа /үг засах үед/");
            wordStates.isModalVisible = false;
            setWordStates({ ...wordStates });
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
      console.log("insert word VALUES-->", values);
      wordStates.insertWord = {
        language_id:
          values.language_id === undefined ? 0 : parseInt(values.language_id),
        word: values.word,
        type_id: values.type_id === undefined ? 0 : values.type_id,
        root_word_id:
          values.root_word_id === undefined ? 0 : parseInt(values.root_word_id),
        created_by: parseInt(localStorage.getItem("user_id")),
        to_language_id: 2, //static
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
          phrasal_verb: values.phrasal_verb,
          idiom: values.idiom,
          auxilary_verb: values.auxilary_verb,
          phrase: values.phrase,
          example_1: values.example_1,
          example_2: values.example_2,
          example_3: values.example_3,
        },
      };

      console.log("insert word CHANGES-->", wordStates.insertWord);
      setWordLoader(true);
      insertWordTransalation(wordStates.insertWord, props.userData.token)
        .then((res) => {
          setWordLoader(false);
          console.log("insert word", res);
          if (res && res.data && res.status && res.data.status === true) {
            //success
            console.log("success insert word", res);
            getAllWords();
            wordStates.word_id = res.data.data.word.id;
            wordStates.isModalVisible = false;
            setWordStates({ ...wordStates });
            // Translation inser
            form.resetFields();
            message.success("Амжилттай нэмэгдлээ..");
          } else {
            //unsuccessful
            setWordLoader(false);
            form.resetFields();
            console.log("unsuccessfully insert word");
            wordStates.isModalVisible = false;
            setWordStates({ ...wordStates });
            message.error("Алдаа гарлаа /үг нэмэх үед/");
          }
        })
        .catch((e) => {
          //unsuccessful
          setWordLoader(false);
          console.log(e);
          wordStates.isModalVisible = false;
          setWordStates({ ...wordStates });
          message.success("Ажилттай нэмэгдлээ CATCH");
          form.resetFields();

          // message.error("Алдаа гарлаа /үг нэмэх үед catch.../");
        });
    }
  };

  const onSearchWord = (val) => {
    console.log("ON SEARCH")
    const token = localStorage.getItem("token");

    getFindWords(val, token)
      .then((res) => {
        console.log("success + ", res)
        wordStates.data = [ ...res.data.likely];
        wordStates.get_word_count = wordStates.data.length;
        
        setWordStates({...wordStates})
      })
      .catch((err) => {
        console.log("failed :+", err)
      })

  }

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
          wordStates.get_word_count = wordStates.data.length;
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

  useEffect(() => {
    console.log("word useffect");
    getAllWords();
  }, []);

  // useEffect(() => {
  //   if (showWordStateOption) {
  //     setShowWordStateOption(false);
  //   }
  // }, [wordStates.rootWordLikely]);

  // useEffect(() => {
  //   if (!showWordStateOption) {
  //     setShowWordStateOption(true);
  //   }
  // }, [setShowWordStateOption]);





  

  return (
    <Card title={"Үгсийн сан"} style={{ margin: 15, width: "100%" }}>
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
        <Space direction="vertical" style={{marginBottom:16,}}>
          <Search placeholder="input search text" onSearch={onSearchWord} style={{ width: 200 }} />
        </Space>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <label>Бүх үгийн тоо : {wordStates.get_word_count}</label>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={wordAll}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Бүх үг
          </Button>
        </div>
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
                      initialValue={2}
                    >
                      <Select
                        placeholder="Үндсэг хэлээ сонгоно уу"
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
                      {/* <Input /> */}
                      <TextArea />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={"type_id"} label="Цагын хэлбэр">
                      <Select
                        placeholder="Цагын хэлбэрээ сонгоно уу"
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
                    {/* <Form.Item
                      label="Үгийн үндэс"
                      name="root_word_id"
                      rules={[
                        { required: true, message: "Заавал бөглөнө үү!" },
                      ]}
                    >
                      <Select
                        showSearch
                        name="root_word_id"
                        placeholder="Үгийн үндэс сонгох"
                        optionFilterProp="children"
                        onChange={onChangeRootWordOption}
                        onSearch={onSearchRootWordOption}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {showWordStateOption &&
                          wordStates.rootWordLikely.map((type) => (
                            <Option value={type.root_word_id}>
                              {type.word}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item> */}
                  </Col>
                </Row>
              </Col>

              <Divider>Word translation</Divider>
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Form.Item label={"noun"} name={"noun"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"verb"} name={"verb"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"adjective"} name={"adjective"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"adverb"} name={"adverb"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"pronoun"} name={"pronoun"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"preposition"} name={"preposition"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"conjunction"} name={"conjunction"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>

                    <Form.Item label={"determiner"} name={"determiner"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"exclamation"} name={"exclamation"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={"modal_verb"} name={"modal_verb"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"phrasal_verb"} name={"phrasal_verb"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"idiom"} name={"idiom"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"auxilary_verb"} name={"auxilary_verb"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"phrase"} name={"phrase"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"example_1"} name={"example_1"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"example_2"} name={"example_2"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item label={"example_3"} name={"example_3"}>
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
                    </Form.Item>
                    <Form.Item
                      label={"translation_to_origin"}
                      name={"translation_to_origin"}
                    >
                      {/* <Input /> */}
                      <TextArea autoSize={{ minRows: 3}}/>
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
