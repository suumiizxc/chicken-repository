import React, { Children, useEffect, useState } from "react";
import imageToBase64 from "image-to-base64";
import axios from "axios";
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
  Upload, 
  Image,
  Select,
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
  BellOutlined,
  UploadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import {
    getAllPPVContentAPI,
    insertPPVContentAPI,
    updatePPVContentAPI,
    deletePPVContentAPI,

    uploadSingleImageAPI,

    getPPVQuizConfigByContentAPI,
    insertPPVQuizConfigAPI,
    getAllPPVCategory,
    getAllPPVLevel,
    getContentAgeCategories,
    getAllAgeCategories,
    insertContentAgeCategory,
    deleteContentAgeCategory,
    getAllProducts,
    getContentProductByContentID,
    inserContentProduct,
    deleteContentProduct

} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
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
    CategoryData: null,
    LevelData: null,
    CategoryDataMap: null,
    LevelDataMap: null,
    IsActiveOption:[<Option value={0}>Идэвхтэй</Option>,<Option value={1}>Идэвхгүй</Option>],
    IsSerialOption:[<Option value={1}>Цуврал</Option>,<Option value={0}>Цуврал биш</Option>],
    upload_image_b64 : null,
    view_img_url : null,
    quiz_config: null,
    vocabulary_count: null,
    content_age_category: [],
    age_categories: [],
    age_category_menu: null,
    content_product: [],
    products : [],
    product_menu: null,
  });

  window.scrollTo(0,props.pages.content_current_scrollY);
  console.log(window.scrollY);
  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    ppvContentStates.upload_image_b64 = base64.replace("data:","").replace("image/","").replace("png;", "").replace("jpg;", "").replace("jpeg;", "").replace("base64,","")+"...file_name..."+file.name;
    setPPVContentStates({ ...ppvContentStates });

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

  const render = (text, record)=>{
    if(record.is_active == 1){
      return {
        props: {
          style: { background: "#e8e7e6"},
        },
        children: <div>{text}</div>,
      };
    }else{
      return {
        children: <div>{text}</div>,
      };
    }
  }

  const menu = (
    <Menu
      items={ppvContentStates.age_category_menu}
    />
  );

  const product_menu = (
    <Menu
      items = {ppvContentStates.product_menu}
    />
  )

  const columns_config = [
    {
      title : "Id",
      dataIndex : "id",
      key : "id"
    },
    {
      title : "Content id",
      dataIndex : "content_id",
      key : "content_id",
    },
    {
      title : "Num context",
      dataIndex : "num_context",
      key : "num_context"
    },
    {
      title : "Num loc",
      dataIndex : "num_loc",
      key : "num_loc",
    },
    {
      title : "Is active",
      dataIndex : "is_active",
      key : "is_active",
    },
    {
      title : "Duration",
      dataIndex : "duration",
      key : "duration",      
    }
  ]

  const columns = [
    // {
    //   title : "Id",
    //   dataIndex : "id",
    //   key :"id"
    // },
    // {
    //     title : "Category id",
    //     dataIndex :"category_id",
    //     key : "category_id",
    // },
    {
      title : "Category name",
      dataIndex :"category_name",
      key : "category_name",
      render: (text, record) => render(text, record)
    },
    // {
    //     title : "Level id",
    //     dataIndex : "level_id",
    //     key : "level_id",
    // },
    {
      title : "Level name",
      dataIndex : "level_name",
      key : "level_name",
      render: (text, record) => render(text, record)
    },
    {
      title : "Нэр",
      dataIndex : "name",
      key :"name",
      render: (text, record) => render(text, record)
    },
    {
        title :"Vocabulary count",
        dataIndex : "vocabulary_count",
        key : "vocabulary_count",
        render: (text, record) => render(text, record)
    },
    {
        title : "Profile image",
        dataIndex : "profile_img",
        key : "profile_img",
        render: (text, record) =>{
          if(record.is_active == 1){
            return {
              props: {
                style: { background: "#e8e7e6"},
              },
              children: <div>{text != 0 ? text:""}</div>,
            };
          }
        },
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key : "is_active",
        render: (text, record) => {
          if(record.is_active == 1){
            return {
              props: {
                style: { background: "#e8e7e6"},
              },
              children: <div>{text == 0 ? "Идэвхтэй":"Идэвхгүй"}</div>,
            };
          }
          return{
            children: <div>{text == 0 ? "Идэвхтэй":"Идэвхгүй"}</div>,
          }
        }
    },
    {
        title : "Intro",
        dataIndex : "intro",
        key : "intro",
        render: (text, record) => render(text, record)
    },
    {
        title : "Is serial",
        dataIndex : "is_serial",
        key : "is_serial",
        render: (text, record) =>{
            if(record.is_active == 1){
              return {
                props: {
                  style: { background: "#e8e7e6"},
                },
                children: <div>{text == 1 ? "Цуврал":"Цуврал биш"}</div>,
              };
            }
            return{
              children: <div>{text == 1 ? "Цуврал":"Цуврал биш"}</div>,
            }
          },
    },
    {
        title : "Үйлдэл",
        key : "action",
        fixed : "right",
        width : 100,
        render: (text, record) => {
              return {
                props: {
                  style: { background: record.is_active == 1 ? "#e8e7e6":""},
                },
                children: <Space size="middle">
                {/* <Popconfirm
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
                </Popconfirm> */}
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
                    ppvContentStates.view_img_url = record.profile_img;
                    ppvContentStates.vocabulary_count = record.vocabulary_count;
                    getFormData(record);
                    setPPVContentStates({ ...ppvContentStates });
                    getContentAgeCategory(record.id)
                    GetContentProductByContentID(record.id)
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Quiz config">
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    // getPPVQuizConfigByContent(record.id);
                    

                    ppvContentStates.action = "quiz_config";
                    
                    ppvContentStates.updateData = record;
                    ppvContentStates.id = record.id;
                    ppvContentStates.isModalVisible = true;
                    ppvContentStates.view_img_url = record.profile_img;
                    getFormData(record);
                    console.log("pisdaa : ", record.profile_img)
                    
                    setPPVContentStates({ ...ppvContentStates });
                    }}
                    icon={<BellOutlined style={{ color: "#3e79f7" }} />}
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

            </Space>,
              };
            }
        }
  ]

  const getFormData = (record) => {
    form.setFieldsValue({
      id : record.id,
      category_id : ppvContentStates.action == "EDIT" ? record.category_name:record.category_id,
      level_id : ppvContentStates.action == "EDIT" ? record.level_name :record.level_id, 
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

  const insertPPVContentUploadImage = (data) => {
    ppvContentStates.loader = true;
    setPPVContentStates({ ppvContentStates });
    uploadSingleImageAPI(data)
      .then((res) => {
        ppvContentStates.loader = false;
        setPPVContentStates({ ppvContentStates });
        console.log("res : ", res)
        ppvContentStates.updateData.profile_img = res.data.response; 
       
        ppvContentStates.view_img_url = res.data.response;
        form.resetFields();
        getFormData(ppvContentStates.updateData);
        setPPVContentStates({ ...ppvContentStates });
        
        console.log("success all writing", ppvContentStates);
        
       
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа ");
        console.log(e);
      });
  };


  const insertPPVQuizConfig = (data) => {
    ppvContentStates.loader = true;
    setPPVContentStates({ ppvContentStates });
    insertPPVQuizConfigAPI(data, ppvContentStates.token)
      .then((res) => {
        ppvContentStates.loader = false;
        setPPVContentStates({ ppvContentStates });
        console.log("res : ", res)
        // ppvContentStates.updateData.profile_img = res.data.response; 
       
        // ppvContentStates.view_img_url = res.data.response;
        form.resetFields();
        getFormData(ppvContentStates.updateData);
        setPPVContentStates({ ...ppvContentStates });
        
        console.log("success all writing", ppvContentStates);
        
       
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        message.error("Алдаа гарлаа ");
        console.log(e);
      });
  };


  const getPPVQuizConfigByContent = (id) => {
    ppvContentStates.loader = true;
    setPPVContentStates({ ppvContentStates });
    getPPVQuizConfigByContentAPI(id, ppvContentStates.token)
      .then((res) => {
        ppvContentStates.loader = false;
        setPPVContentStates({ ppvContentStates });
        console.log("res quiz config get : ", res);

        ppvContentStates.quiz_config = res.data.data;
        ppvContentStates.action = "quiz_config_see";
        setPPVContentStates({ ...ppvContentStates });
        
        console.log("success all writing", ppvContentStates);
        
       
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

  const getContentAgeCategory = (content_id) =>{
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates})
    getContentAgeCategories(content_id, ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      if(res && res.data && res.data.status ) {
        ppvContentStates.content_age_category = res.data.data == null ? []:res.data.data;
        setPPVContentStates({...ppvContentStates})
        InitAgeCategoryMenu(content_id);
      }else{
        message.error("Насны ангилал харах явцад алдаа гарлаа");
      }
    }).catch((err) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      message.error("Насны ангилал харах явцад алдаа гарлаа");
    })
  }

  const getAllAgeCategory = () => {
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates})
    getAllAgeCategories(ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      if(res && res.data && res.data.status){
        ppvContentStates.age_categories = res.data.data;
        setPPVContentStates({...ppvContentStates});
      }else{
        message.error("Амжилтгүй")
      }
    }).catch((err) => {
      message.error("Амжилтгүй")
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
    })
  }

  const InsertContentAgeCategory = (data) =>{
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates})
    insertContentAgeCategory(data, ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      if(res && res.data && res.data.status){
        message.success("Амжилттай");
      }else{
        message.error("Амжилтгүй");
      }
    }).catch((err) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      message.error("Амжилтгүй");
    })
  }

  const DeleteContentAgeCategory = (age_category_id)=>{
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates})
    deleteContentAgeCategory(age_category_id, ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      if(res && res.data && res.data.status){
        message.success("Амжилттай устгагдлаа");
      }else{
        message.error("Амжилтгүй");
      }
    }).catch((err) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      message.error("Амжилтгүй");
    })
  }

  const GetContentProductByContentID = (content_id) => {
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates});
    getContentProductByContentID(content_id, ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      if(res && res.data && res.data.status){
        ppvContentStates.content_product = res.data.data == null ? []:res.data.data;
        setPPVContentStates({...ppvContentStates})
        InitContentProductMenu(content_id);
      }else{
        message.error("Product list харах явцад алдаа гарлаа");
      }
    }).catch((err) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      message.error("Product list харах явцад алдаа гарлаа");
    })
  }

  const getAllProduct = () => {
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates});
    getAllProducts(ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      if(res && res.data && res.data.status){
        ppvContentStates.products = res.data.data;
        setPPVContentStates({...ppvContentStates});
        console.log(ppvContentStates.products)
      }else{
        message.success("Амжилтгүй");
      }
    }).catch((err) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      message.success("Амжилтгүй");
    })
  }

  const InsertContentProduct = (data) => {
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates})
    inserContentProduct(data, ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates})
      if(res && res.data && res.data.status){
        message.success("Амжилттай");
      }else{
        message.success("Амжилтгүй");
      }
    }).catch((err) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      message.success("Амжилтгүй");
    })
  }

  const DeleteContentProduct = (product_id) =>{
    ppvContentStates.loader = true;
    setPPVContentStates({...ppvContentStates});
    deleteContentProduct(product_id, ppvContentStates.token).then((res) => {
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
      if(res && res.data && res.data.status){
        message.success("Амжилттай устгагдлаа");
      }else{
        message.success("Амжилтгүй");
      }
    }).catch((err) =>{
      message.success("Амжилтгүй");
      ppvContentStates.loader = false;
      setPPVContentStates({...ppvContentStates});
    })
  }

  const handleCheckBox = (value, content_id, category_id) => {
    if (value.target.checked){
      InsertContentAgeCategory({
        "content_id":content_id,
        "age_category_id":category_id
      })
    }else{
      DeleteContentAgeCategory(value.target.value)
    }
    ppvContentStates.isModalVisible = false;
    setPPVContentStates({...ppvContentStates});
  }

  const handleProductCheckBox = (value, content_id, product_id) => {
    if (value.target.checked){
      InsertContentProduct({
        "content_id":content_id,
        "product_id":product_id
      })
    }else{
      DeleteContentProduct(value.target.value)
    }
    ppvContentStates.isModalVisible = false;
    setPPVContentStates({...ppvContentStates});
  }

  const InitAgeCategoryMenu = (content_id) => {
    var checkedCCategoryID = {}
    var checkedCategories = ppvContentStates.content_age_category.map((ccategory) => {
      checkedCCategoryID[ccategory.age_category_id] = ccategory.id
      console.log(ccategory)
      return ccategory.age_category_id
    })
    
    ppvContentStates.age_category_menu = ppvContentStates.age_categories.map((category)=>{
      return{
        key: category.id,
        label: (
          <Checkbox
          value={checkedCCategoryID[category.id]} 
          defaultChecked ={checkedCategories.indexOf(category.id) > -1}
          onChange={(e) => handleCheckBox(e, content_id, category.id)}
          >{category.name}</Checkbox>
        ),
      }
    })
    setPPVContentStates({...ppvContentStates})
  } 

  const InitContentProductMenu = (content_id) => {
    var checkedCProductID = {}
    var checkedProducts = ppvContentStates.content_product.map((cproduct) => {
      checkedCProductID[cproduct.product_id] = cproduct.id
      console.log(cproduct)
      return cproduct.product_id
    })
    
    ppvContentStates.product_menu = ppvContentStates.products.map((product)=>{
      return{
        key: product.id,
        label: (
          <Checkbox
          value={checkedCProductID[product.id]} 
          defaultChecked ={checkedProducts.indexOf(product.id) > -1}
          onChange={(e) => handleProductCheckBox(e, content_id, product.id)}
          >{product.name}</Checkbox>
        ),
      }
    })
    setPPVContentStates({...ppvContentStates})
  }

  const onFinishWriting = (values) => {
      console.log("on finish writing : ", values);

      ppvContentStates.isModalVisible = false;
      if (ppvContentStates.action == "ADD_LISTENING") {
          var inObj = {category_id : parseInt(values.category_id), intro : values.intro, is_active : parseInt(values.is_active), is_serial : values.is_serial, level_id : parseInt(values.level_id), name : values.name, profile_img : values.profile_img, vocabulary_count : parseInt(values.vocabulary_count)};
          insertListeningData(inObj);
          getAllPPVContent();
      } else if (ppvContentStates.action == "EDIT") {
          var updObj = {id : ppvContentStates.id, category_id : parseInt(ppvContentStates.CategoryDataMap[values.category_id]), intro : values.intro, is_active : parseInt(values.is_active), is_serial : parseInt(values.is_serial), level_id : parseInt(ppvContentStates.LevelDataMap[values.level_id]), name : values.name, profile_img : values.profile_img, vocabulary_count : parseInt(ppvContentStates.vocabulary_count)};
          updateListeningData(updObj);
          getFormData({name:""})
          getAllPPVContent();
      } else if (ppvContentStates.action == "quiz_config") {
        var quiz_insert = {
          content_id : ppvContentStates.id,
          num_context : parseInt(values.num_context),
          num_voc : parseInt(values.num_voc),
          is_active :parseInt(values.is_active_quiz),
          duration : parseInt(values.duration),
        };
        console.log("Quiz insert : ", quiz_insert)
        insertPPVQuizConfig(quiz_insert);
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

  const uploadImage = () => {
    // ppvContentStates.isModalVisible = false;
    // ppvContentStates.action = "ADD_LISTENING";
    // setPPVContentStates({ ...ppvContentStates });
    var upObj = {
      "upload" : ppvContentStates.upload_image_b64.split("...file_name...")[0],
      "file_name": ppvContentStates.upload_image_b64.split("...file_name...")[1]
    }
    insertPPVContentUploadImage(upObj)
  };

  const getCategoryOptions = ()=>{
    const children = []
    const dataMap = {}
    getAllPPVCategory(ppvContentStates.token).then((res) =>{
      for(let i=0; i<res.data.data.length; i++){
        children.push(<Option value={res.data.data[i].id}>{res.data.data[i].name}</Option>)
        //children.push(<Option value={data.data.data[i].id}>{data.data.data[i].name}</Option>)
        dataMap[res.data.data[i].name] = res.data.data[i].id
        dataMap[res.data.data[i].id] = res.data.data[i].id
      }
      ppvContentStates.CategoryDataMap = dataMap;
      ppvContentStates.CategoryData = children;
      setPPVContentStates({ppvContentStates}); 
    }) 
  }

  const getLevelOptions = ()=>{
    const children = []
    const dataMap = {}
    getAllPPVLevel(ppvContentStates.token).then((res) =>{
      for(let i=0; i<res.data.data.length; i++){
        children.push(<Option value={res.data.data[i].id}>{res.data.data[i].name}</Option>)
        dataMap[res.data.data[i].name] = res.data.data[i].id
        dataMap[res.data.data[i].id] = res.data.data[i].id
      }
      ppvContentStates.LevelDataMap = dataMap;
      ppvContentStates.LevelData = children;
      setPPVContentStates({ppvContentStates}); 
    }) 
  }

  useEffect(() => {
    console.log("listening useffect");
    getLevelOptions();
    getCategoryOptions();
    getAllPPVContent();
    getAllAgeCategory();
    getAllProduct();
  }, []);

return (
    <Card title={"PPV"} style={{ margin: 15, width: "100%" }}>
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
        <Table columns={columns} dataSource={ppvContentStates.data}
        onChange={(newPagination)=>{
          props.courseIds.content_current_page = newPagination.current;
          props.setCourseIds({...props.courseIds});
          props.pages.content_current_pageSize = newPagination.pageSize;
          props.setPages({...props.pages});
          console.log(props.pages.content_current_pageSize);
        }}
        pagination={{
          pageSize:props.pages.content_current_pageSize,
          current:props.courseIds.content_current_page
        }}
        />
        <Modal
          title="PPV edit"
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
                                  label="Category name"
                                  >
                                      <Select
                                
                                      >
                                        {
                                          ppvContentStates.CategoryData
                                        }
                                      </Select>
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"level_id"}
                                  label="Level name"
                                  >
                                      <Select
                                      
                                      >
                                        {
                                          ppvContentStates.LevelData
                                        }
                                      </Select>
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
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"vocabulary_count"}
                                  label="Vocabulary count"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
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
                                      <Select>
                                        {
                                          ppvContentStates.IsActiveOption
                                        }
                                      </Select>
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
                                      <Select>
                                        {
                                          ppvContentStates.IsSerialOption
                                        }
                                      </Select>
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"age_category"}
                                  label="Насны ангилал"
                                  >
                                    <Dropdown
                                      overlay={menu}
                                    >
                                        <Divider>
                                          <ArrowDownOutlined/>
                                        </Divider>
                                      
                                    </Dropdown>
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"content_product"}
                                  label="Content product"
                                  >
                                    <Dropdown
                                      overlay={product_menu}
                                    >
                                        <Divider>
                                          <ArrowDownOutlined/>
                                        </Divider>
                                    </Dropdown>
                                  </Form.Item>
                              </Col>
                          </Row>
                            <Row>
                                <Col span={8}>
                                    <img id="myImg" height={300}  src={ppvContentStates.view_img_url}/>
                                </Col>
                            </Row>
                           <Row>
                               <Col span={24}>
                                    <Col span={8}>
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
                                        <Col span={8}>
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
                                  label="Category name"
                                  >
                                      <Select>
                                        {
                                          ppvContentStates.CategoryData
                                        }
                                      </Select>
                                  </Form.Item>
                              </Col>
                              <Col span={8}>
                                  <Form.Item
                                  name={"level_id"}
                                  label="Level name"
                                  >
                                      <Select>
                                        {
                                          ppvContentStates.LevelData
                                        }
                                      </Select>
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
                              {/* <Col span={8}>
                                  <Form.Item
                                  name={"vocabulary_count"}
                                  label="Vocabulary count"
                                  >
                                      <Input />
                                  </Form.Item>
                              </Col> */}
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
                                      <Select>
                                        {
                                          ppvContentStates.IsActiveOption
                                        }
                                      </Select>
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
                                      <Select>
                                        {
                                          ppvContentStates.IsSerialOption
                                        }
                                      </Select>
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
            } else if(ppvContentStates.action == "quiz_config") {
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
                                name={"num_context"}
                                label="Num context"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name={"num_voc"}
                                label="Num voc"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name={"is_active_quiz"}
                                label="Is active"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                name={"duration"}
                                label="Duration"
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
          } else if(ppvContentStates.action == "quiz_config_see") {
            return (
               <Table columns={columns_config} dataSource={ppvContentStates.quiz_config}/>
           )
        } 
          
            })()}
        </Modal>
      </Spin>
    </Card>
  );
}