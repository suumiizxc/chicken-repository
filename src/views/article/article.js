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
  Select,
  Dropdown,
  Tag,
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
    getAllArticle,
    insertArticleAPI,
    updateArticleAPI,
    deleteArticleAPI,
    uploadArticleSingleImageAPI,
    getAllArticleCategories,
    getArticleImage,
    InsertArticleSlider,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";

const { Option } = Select;

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [readingStates, setReadingStates] = useState({
    token: localStorage.getItem("token"),
    card_title: "Видео интро",
    loader: false,
    id: null,
    isModalVisible: false,
    data: null,
    action: null,
    host_source: null,
    insertData: null,
    updateData:{
        id : null
    },
    categoryData : null,
    selectedCategoryID : null,
    upload_image_b64: null,
    article_image: null,
  });

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    console.log(base64);
    readingStates.upload_image_b64 = base64.replace("data:","").replace("image/","").replace("png;", "").replace("jpg;", "").replace("jpeg;", "").replace("base64,","");
    setReadingStates({...readingStates})

  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const funActive = (values) => {
    console.log("funActive : ", values)
    if(values.key === "0") {
      readingStates.updateData.is_active = 0
    } else {
      readingStates.updateData.is_active = 1
    }
    console.log("state : ", readingStates)
    setReadingStates({ ...readingStates });
  }

  const menu = (
    <Menu onClick={funActive}>
      <Menu.Item key="1">
          Идэвхгүй
      </Menu.Item>
      <Menu.Item key="0">
          Идэвхтэй
      </Menu.Item>
    </Menu>
  );
  

  
  function handleChange(value) {

    console.log(`selected : ${value} `);
    readingStates.selectedCategoryID = parseInt(value);
    setReadingStates({ ...readingStates });

  }

  const columns = [
    {
        title : "Id",
        dataIndex : "id",
        key :"id"
    },
    {
        title : "Title",
        dataIndex : "title",
        key : "title",
    },
    {
        title : "Category",
        dataIndex : ["category", "name"],
        key : ["category", "name"],
    },
    {
        title : "Is trending",
        dataIndex :"is_trending",
        render:(text) => <Tag color={text !== 0 ? "blue" : "red"} >{text !== 0 ? "Тийм" : "Үгүй"}</Tag>,
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        // render:(text) => <a color={text !== 0 ? "geekblue" : "green"}>{text !== 0 ? "Идэвхгүй" : "Идэвхтэй"}</a>,
        render: (text) => <Tag color={text !== 0 ? "red" : "blue"}>{text !== 0 ? "Идэвхгүй" : "Идэвхтэй"}</Tag>
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
                    readingStates.action = "EDIT";
                    // setReadingStates({ ...readingStates });
                    // getAllReading(record);
                    readingStates.updateData = record;
                    readingStates.id = record.id;
                    readingStates.isModalVisible = true;
                    getFormData(record);
                    getAllArticleImg(record.id)
                    setReadingStates({ ...readingStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/article-cue");
                        props.courseIds.articleId = record.id;
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
      title : record.title,
      category_id : record.category_id,
      is_trending : record.is_trending,
      is_active : record.is_active,
    });
  };

  //GET All writing list
  const getAllReading = () => {
    readingStates.loader = true;
    setReadingStates({ readingStates });
    getAllArticle(readingStates.token)
      .then((res) => {
        readingStates.loader = false;
        setReadingStates({ readingStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          readingStates.data = res.data.data;
          setReadingStates({ ...readingStates });
          console.log("success all", res.data.data);
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

  const getAllArticleImg = (id) =>{
    readingStates.loader = true;
    setReadingStates({...readingStates});
    getArticleImage(id,readingStates.token)
      .then((res) => {
        readingStates.loader = false;
        setReadingStates({ ...readingStates })
        if(res && res.data && res.data.status){
          readingStates.article_image = res.data.data
          setReadingStates({ ...readingStates })
        }else{
          message.error("Зураг олдсонгүй")
          readingStates.loader = false;
        setReadingStates({ ...readingStates })
        }
      }).catch((err)=>{
        message.error("Зураг олдсонгүй")
        readingStates.loader = false;
        setReadingStates({ ...readingStates })
      })
  }

  const insertArticleSlider = (data)=>{
    readingStates.loader = true;
    setReadingStates({...readingStates})
    InsertArticleSlider(data, readingStates.token).then((res)=>{
      readingStates.loader = false;
      setReadingStates({...readingStates})
      if(res && res.data && res.data.status){
        readingStates.article_image = res.data.data.img_url
        setReadingStates({...readingStates})
        message.success("Амжилттай")
      }else{
        message.error("Алдаа гарлаа")
        readingStates.loader = false;
        setReadingStates({ ...readingStates })
      }
    }).catch((err)=>{
      readingStates.loader = false;
      setReadingStates({ ...readingStates })
      message.error("Алдаа гарлаа")
    })
  }

  const getAllCategories = () => {
    readingStates.loader = true;
    setReadingStates({ readingStates });
    getAllArticleCategories(readingStates.token)
      .then((res) => {
        readingStates.loader = false;
        setReadingStates({ readingStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          readingStates.categoryData = res.data.data;
          setReadingStates({ ...readingStates });
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
      readingStates.loader = true;
      setReadingStates({readingStates});
      console.log("SHINE PISDA : ", values);
      insertArticleAPI(values, readingStates.token)
        .then((res) => {
            readingStates.loader = false;
            setReadingStates({readingStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingStates.insertData = res.data.data;
                setReadingStates({ ...readingStates });
                getAllReading()
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
      readingStates.loader = true;
      setReadingStates({readingStates})
      updateArticleAPI(values, readingStates.token)
        .then((res) => {
            readingStates.loader = false;
            setReadingStates({readingStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingStates.updateData = res.data.data;
                setReadingStates({ ...readingStates });
                getAllReading()
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
      readingStates.loader = true; 
      setReadingStates({readingStates})
      deleteArticleAPI(values.id, readingStates.token)
        .then((res) => {
            readingStates.loader = false;
            setReadingStates({readingStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                readingStates.updateData = res.data.data;
                setReadingStates({ ...readingStates });
                getAllReading()
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

  const insertArticleUploadImage = (data) => {
    readingStates.loader = true;
    setReadingStates({ readingStates });
    uploadArticleSingleImageAPI(data)
      .then((res) => {
        readingStates.loader = false;
        setReadingStates({ readingStates });
        readingStates.article_image = res.data.response; 
        //readingStates.view_img_url = res.data.response;
        //form.resetFields();
        //getFormData(readingStates.updateData);
        setReadingStates({ ...readingStates });
        
        console.log("success all writing", readingStates);
        insertArticleSlider({
          "title":form.getFieldValue("title"),
          "img_url":readingStates.article_image,
          "ordering":1,
          "is_active":0,
          "article_id":readingStates.id
        })
        
      })
      .catch((e) => {
        //unsuccessful
        readingStates.article_image = null;
        props.setLoader(false);
        message.error("Алдаа гарлаа ");
        console.log(e);
      });
  };

  const   onFinishWriting = (values) => {
      console.log("on finish writing : ", values);

      readingStates.isModalVisible = false;
      if (readingStates.action == "ADD_READING") {
          var inObj = {title : values.title, category_id : readingStates.selectedCategoryID, is_trending : parseInt(values.is_trending), is_active : parseInt(readingStates.updateData.is_active)};
          insertListeningData(inObj);
        //   getAllReading();
      } else if (readingStates.action == "EDIT") {
          var updObj = {id : readingStates.id,  title : values.title, category_id : readingStates.selectedCategoryID,  is_trending : parseInt(values.is_trending), is_active : parseInt(readingStates.updateData.is_active)};
          updateListeningData(updObj);
          form.resetFields();
          getAllReading();
      }
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    readingStates.isModalVisible = true;
    readingStates.action = "ADD_READING";
    setReadingStates({ ...readingStates });
  };

  const uploadImage = () => {
    var upObj = {"upload" : readingStates.upload_image_b64}
    insertArticleUploadImage(upObj)

  };


  useEffect(() => {
    console.log("listening useffect");
    getAllReading();
    getAllCategories();
  }, []);


return (
    <Card title={"Article"} style={{ margin: 15, width: "100%" }}>
      <Spin
        tip=""
        spinning={readingStates.loader}
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
            Article нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={readingStates.data} />
        <Modal
          title="Article"
          width={"90%"}
          visible={readingStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            readingStates.isModalVisible = false;
            readingStates.action = null;
            setReadingStates({ ...readingStates });
          }}
        >
         {(() => {   
             if(readingStates.action == "EDIT") {
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
                                        name={"title"}
                                        label="Title"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        {/* <Form.Item
                                        name={"category_id"}
                                        label="Category id"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item> */}
                                        <Form.Item
                                        label="Category">
                                        <Select style={{ width: 300 }} onSelect={(value) => handleChange(value)}>
                                          {/* <Option value="jack">Jack</Option> */}
                                          {
                                            readingStates.categoryData.map((obj) => {
                                              return <Option value={obj.id}>{obj.name}</Option>
                                            })
                                          }
                                          
                                        </Select>
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"is_trending"}
                                        label="Is trending"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        {/* <Form.Item
                                        name={"is_active"}
                                        label="Is active"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item> */}
                                      <Form.Item label="Is active">
                                      <Dropdown overlay={menu} placement="bottomLeft" onConfirm={e => e.preventDefault()}>
                                        <Button>{readingStates.updateData.is_active !== 1 ? "Идэвхтэй" : "Идэвхгүй"}</Button>
                                      </Dropdown>
                                      </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                    <Col span={8} offset={4}>
                                      <Input
                                                id="originalFileName"
                                                type="file"
                                                inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                                                //required
                                                label="Document"
                                                name="originalFileName"
                                                onChange={handleFileRead}
                                                size="small"
                                                variant="standard"
                                            />
                                    </Col>
                                    <Col span={8} offset={4}>
                                            <Button
                                                onClick={uploadImage}
                                                icon={<PlusCircleOutlined />}
                                                type="primary"
                                                style={{
                                                marginBottom: 16,
                                                }}
                                            >
                                                Upload image :P 
                                            </Button>
                                    </Col>
                                  </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Col span={8}>
                                    <img id="myImg" height={300}  src={readingStates.article_image}/>
                        </Col>
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
             } else if(readingStates.action == "ADD_READING") {
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
                                       name={"title"}
                                       label="Title"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       {/* <Form.Item
                                       name={"category_id"}
                                       label="Category id"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                            
                                       </Form.Item> */}
                                      <Form.Item
                                       label="Category">
                                      <Select style={{ width: 300 }} onSelect={(value) => handleChange(value)}>
                                        {/* <Option value="jack">Jack</Option> */}
                                        {
                                          readingStates.categoryData.map((obj) => {
                                            return <Option value={obj.id}>{obj.name}</Option>
                                          })
                                        }
                                        
                                      </Select>
                                      </Form.Item>
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_trending"}
                                       label="Is trending"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       {/* <Form.Item
                                       name={"is_active"}
                                       label="Is active"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item> */}
                                   <Form.Item label="Is active">
                                      <Dropdown overlay={menu} placement="bottomLeft" onConfirm={e => e.preventDefault()}>
                                        <Button>{readingStates.updateData.is_active !== 1 ? "Идэвхтэй" : "Идэвхгүй"}</Button>
                                      </Dropdown>
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