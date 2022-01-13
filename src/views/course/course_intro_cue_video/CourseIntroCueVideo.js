import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Divider,
  Col,
  Row,
  message,
  Card,
  Spin,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CustomLoader from "../../../components/Loader";
import CardLarge from "../../../components/CardLarge";
import {
  deleteIntoCueVideoAPI,
  getAllIntoCueVideo,
  insertIntoCueVideoAPI,
  updateIntoVideoCueAPI,
} from "../../../services/Course_service";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();

  const [introVideoCueStates, setIntroVideoCueStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    from_language_is_default: null,
    to_language_is_default: null,
    insertData: {
      course_intro_videos: [],
    },
    updateData: {
      id: null,
      intro_video_id: 821,
      ordering: 1,
    },
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Cue ийн дугаарлалт",
      dataIndex: "ordering",
      key: "ordering",
    },
    {
      title: "Интро видео id",
      dataIndex: "intro_video_id",
      key: "intro_video_id",
    },
    {
      title: "Эхлэх цаг",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Дуусах цаг",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "From language_id",
      dataIndex: "from_language_id",
      key: "from_language_id",
    },
    {
      title: "From language is translation",
      dataIndex: "from_language_translation",
      key: "from_language_translation",
    },
    {
      title: "From language is default",
      dataIndex: "from_language_is_default",
      key: "from_language_is_default",
    },
    {
      title: "To language id",
      dataIndex: "to_language_id",
      key: "to_language_id",
    },
    {
      title: "To language translation",
      dataIndex: "to_language_translation",
      key: "to_language_translation",
    },
    {
      title: "To language is default",
      dataIndex: "to_language_is_default",
      key: "to_language_is_default",
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
              deleteIntoCueVideo(record);
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
              introVideoCueStates.action = "EDIT";
              setIntroVideoCueStates({ ...introVideoCueStates });
              getFormData(record);
              introVideoCueStates.updateData.id = record.id;
              introVideoCueStates.isModalVisible = true;
              setIntroVideoCueStates({ ...introVideoCueStates });
            }}
            icon={<EditOutlined style={{ color: "#3e79f7" }} />}
          />
        </Space>
      ),
    },
  ];

  const getFormData = (record) => {
    console.log("getFormData records==>", record);
    record.from_language_is_default == "0" ? (
      <> </>
    ) : (
      (introVideoCueStates.from_language_is_default =
        record.from_language_is_default)
    );

    record.to_language_is_default == "0" ? (
      <></>
    ) : (
      (introVideoCueStates.to_language_is_default =
        record.to_language_is_default)
    );
    setIntroVideoCueStates({ ...introVideoCueStates });
    form.setFieldsValue({
      start_time: record.start_time,
      end_time: record.end_time,
      from_language_id: record.from_language_id,
      from_language_translation: record.from_language_translation,
      from_language_is_default: record.from_language_is_default,
      to_language_id: record.to_language_id,
      to_language_translation: record.to_language_translation,
      to_language_is_default: record.to_language_is_default,
    });
  };

  //GET All intro video list
  const getAllIntroCueData = () => {
    introVideoCueStates.loader = true;
    setIntroVideoCueStates({ introVideoCueStates });
    getAllIntoCueVideo(introVideoCueStates.token)
      .then((res) => {
        introVideoCueStates.loader = false;
        setIntroVideoCueStates({ introVideoCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          introVideoCueStates.data = res.data.data;
          setIntroVideoCueStates({ ...introVideoCueStates });
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

  const insertIntroVideoClicked = () => {
    introVideoCueStates.isModalVisible = true;
    setIntroVideoCueStates({ ...introVideoCueStates });
  };

  const insertIntroVideo = (values) => {
    console.log("insert data values", values);
    var insertArray = null;
    insertArray = introVideoCueStates;

    var ids = {
      ordering: 1,
      intro_video_id: 821,
      from_language_id: 2,
      to_language_id: 1,
    };
    values.video_cue.map((item, key) => {
      item["ordering"] = ids.ordering + key;
      item["intro_video_id"] = ids.intro_video_id;
      item["from_language_id"] = ids.from_language_id;
      item["to_language_id"] = ids.to_language_id;
      introVideoCueStates.from_language_is_default == null
        ? (item["from_language_is_default"] = "0")
        : (item["from_language_is_default"] =
            introVideoCueStates.from_language_is_default);
      introVideoCueStates.to_language_is_default == null
        ? (item["to_language_is_default"] = "0")
        : (item["to_language_is_default"] =
            introVideoCueStates.to_language_is_default);

      insertArray.insertData.course_intro_videos.push(item);
    });

    setIntroVideoCueStates(insertArray);

    introVideoCueStates.loader = true;
    setIntroVideoCueStates({ introVideoCueStates });

    // INSERT Intro cue videos
    insertIntoCueVideoAPI(
      introVideoCueStates.insertData,
      introVideoCueStates.token
    )
      .then((res) => {
        introVideoCueStates.loader = false;
        setIntroVideoCueStates({ introVideoCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroCueData();
          message.success("Ажилттай интро видео cue нэмэгдлээ");
          console.log("success all language", res.data.data);
          insertArray.insertData.course_intro_videos = [];
          form.resetFields();
        } else {
          //unsuccessful
          message.error("Алдаа гарлаа /үгийг интро видео cue нэмэх үед/");
          form.resetFields();
        }
      })
      .catch((e) => {
        //unsuccessful
        introVideoCueStates.loader = false;
        setIntroVideoCueStates({ ...introVideoCueStates });
        props.setLoader(false);
        message.error("Алдаа гарлаа /үгийг интро видео cue нэмэх үед/");
        form.resetFields();
        console.log(e);
      });
  };

  //DELETE Intro CUE video
  const deleteIntoCueVideo = (values) => {
    deleteIntoCueVideoAPI(values.id, introVideoCueStates.token)
      .then((res) => {
        introVideoCueStates.loader = false;
        setIntroVideoCueStates({ introVideoCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroCueData();
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

  const updateIntroCueVideo = (value) => {
    console.log("UPDATE VALUES-->", value);
    var update_from_language_is_default =
      introVideoCueStates.from_language_is_default == null
        ? "0"
        : value.from_language_is_default;

    var update_to_language_is_default =
      introVideoCueStates.from_language_is_default == null
        ? "0"
        : value.to_language_is_default;

    introVideoCueStates.updateData = {
      id: introVideoCueStates.updateData.id,
      ordering: introVideoCueStates.updateData.ordering,
      intro_video_id: introVideoCueStates.updateData.intro_video_id,
      start_time: value.start_time,
      end_time: value.end_time,
      from_language_id: 1,
      from_language_translation: value.from_language_translation,
      from_language_is_default: update_from_language_is_default,
      to_language_id: 2,
      to_language_translation: value.to_language_translation,
      to_language_is_default: update_to_language_is_default,
    };
    setIntroVideoCueStates({ ...introVideoCueStates });
    updateIntoVideoCueAPI(
      introVideoCueStates.updateData,
      introVideoCueStates.token
    )
      .then((res) => {
        introVideoCueStates.loader = false;
        setIntroVideoCueStates({ introVideoCueStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          getAllIntroCueData();
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
        form.resetFields();
        console.log(e);
      });
  };

  const onFinishIntroVideo = (values) => {
    console.log("onfinish");
    introVideoCueStates.isModalVisible = false;

    if (introVideoCueStates.action === "EDIT") {
      console.log("edit intro video running=>");
      updateIntroCueVideo(values);
    } else {
      console.log("insert intro video running");
      console.log("values array video cue", values);
      insertIntroVideo(values);
    }
  };

  const onFinishFailedIntroVideo = () => {
    console.log("onfinish failed");
  };

  const onChangeCheckE = (checkedValues) => {
    console.log(
      "checked values from_language_is_default==>",
      checkedValues.target.defaultValue
    );

    console.log(
      "introVideoCueStates.from_language_is_default==>",
      introVideoCueStates.from_language_is_default
    );
    introVideoCueStates.from_language_is_default == null
      ? (introVideoCueStates.from_language_is_default =
          checkedValues.target.defaultValue)
      : (introVideoCueStates.from_language_is_default = null);
    setIntroVideoCueStates({ ...introVideoCueStates });
  };

  const onChangeCheckM = (checkedValues) => {
    console.log("checked values from_language_is_default==", checkedValues);
    console.log(
      "introVideoCueStates.to_language_is_default==>",
      introVideoCueStates.to_language_is_default
    );
    introVideoCueStates.to_language_is_default == null
      ? (introVideoCueStates.to_language_is_default =
          checkedValues.target.defaultValue)
      : (introVideoCueStates.to_language_is_default = null);
    setIntroVideoCueStates({ ...introVideoCueStates });
  };

  const test = () => {
    console.log("test");
  };
  useEffect(() => {
    console.log("intro video useffect");
    getAllIntroCueData();
  }, []);

  return (
    <Card title={"Интро видео cue"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={introVideoCueStates.loader}
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
            Video cue add
          </Button>
        </div>
        <Table columns={columns} dataSource={introVideoCueStates.data} />
        <Modal
          title="Интро вилео cue"
          width={"90%"}
          visible={introVideoCueStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            introVideoCueStates.isModalVisible = false;
            introVideoCueStates.action = null;
            introVideoCueStates.from_language_is_default = null;
            introVideoCueStates.to_language_is_default = null;
            setIntroVideoCueStates({ ...introVideoCueStates });
          }}
        >
          {introVideoCueStates.action !== "EDIT" ? (
            <Form
              form={form}
              name="addWord"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              onFinish={onFinishIntroVideo}
              onFinishFailed={onFinishFailedIntroVideo}
              autoComplete="off"
            >
              <Form.List name="video_cue">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key}>
                        <Form.Item
                          label="Эхлэх цаг"
                          {...restField}
                          name={[name, "start_time"]}
                          rules={[
                            {
                              required: true,
                              message: "Заавал бөглөнө үү!",
                            },
                          ]}
                          labelCol={{ span: 24 }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Дуусах цаг"
                          {...restField}
                          name={[name, "end_time"]}
                          rules={[
                            {
                              required: true,
                              message: "Заавал бөглөнө үү!",
                            },
                          ]}
                          labelCol={{ span: 24 }}
                        >
                          <Input />
                        </Form.Item>
                        <Col span={24}>
                          <Form.Item
                            label="Англи текст"
                            {...restField}
                            name={[name, "from_language_translation"]}
                            rules={[
                              {
                                required: true,
                                message: "Заавал бөглөнө үү!",
                              },
                            ]}
                            labelCol={{ span: 24 }}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Form.Item
                          label="E"
                          {...restField}
                          name={[name, "from_language_is_default"]}
                          labelCol={{ span: 24 }}
                        >
                          <Checkbox
                            onChange={onChangeCheckE}
                            defaultValue={"2"}
                            checked={
                              introVideoCueStates.from_language_is_default
                            }
                            disabled={
                              introVideoCueStates.to_language_is_default
                            }
                            // value={"English"}
                          ></Checkbox>
                        </Form.Item>
                        <Form.Item
                          label="Монгол текст"
                          {...restField}
                          name={[name, "to_language_translation"]}
                          rules={[
                            {
                              required: true,
                              message: "Заавал бөглөнө үү!",
                            },
                          ]}
                          labelCol={{ span: 24 }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="М"
                          {...restField}
                          name={[name, "to_language_is_default"]}
                          labelCol={{ span: 24 }}
                        >
                          <Checkbox
                            onChange={onChangeCheckM}
                            defaultValue={"1"}
                            checked={introVideoCueStates.to_language_is_default}
                            disabled={
                              introVideoCueStates.from_language_is_default
                            }
                          ></Checkbox>
                        </Form.Item>
                        <Form.Item label={"Хасах"} labelCol={{ span: 24 }}>
                          <MinusCircleOutlined
                            style={{ color: "#FF4D4F" }}
                            onClick={() => remove(name)}
                          />
                        </Form.Item>
                      </Space>
                    ))}
                    <Form.Item
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Шинээр нэмэх
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

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
          ) : (
            <Form
              form={form}
              name="addWord"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              onFinish={onFinishIntroVideo}
              onFinishFailed={onFinishFailedIntroVideo}
              autoComplete="off"
            >
              <Row>
                <Col span={4}>
                  <Form.Item
                    label="Эхлэх цаг"
                    name="start_time"
                    rules={[
                      {
                        required: true,
                        message: "Заавал бөглөнө үү!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Дуусах цаг"
                    name="end_time"
                    rules={[
                      {
                        required: true,
                        message: "Заавал бөглөнө үү!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Англи текст"
                    name="from_language_translation"
                    rules={[
                      {
                        required: true,
                        message: "Заавал бөглөнө үү!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <Form.Item
                    label="E"
                    name="from_language_is_default"
                    labelCol={{ span: 24 }}
                  >
                    <Checkbox
                      onChange={onChangeCheckE}
                      defaultValue={"2"}
                      checked={introVideoCueStates.from_language_is_default}
                      disabled={introVideoCueStates.to_language_is_default}
                    ></Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Монгол текст"
                    name="to_language_translation"
                    rules={[
                      {
                        required: true,
                        message: "Заавал бөглөнө үү!",
                      },
                    ]}
                    labelCol={{ span: 24 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <Form.Item
                    label="М"
                    name="to_language_is_default"
                    labelCol={{ span: 24 }}
                  >
                    <Checkbox
                      onChange={onChangeCheckM}
                      defaultValue={"1"}
                      checked={introVideoCueStates.to_language_is_default}
                      disabled={introVideoCueStates.from_language_is_default}
                    ></Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ offset: 17, span: 7 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Хадгалах/UPDATE/
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Spin>
    </Card>
  );
}
