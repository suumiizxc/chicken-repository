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
  Affix
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
  ZoomOutOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import {
    getAllContentMovieByContentAPI,
    inserContentMovieAPI,
    updateContentMovieAPI,
    deleteContentMovieAPI,

    getPPVQuizConfigByContentAPI,
    deletePPVQuizConfigAPI,
    insertPPVQuizQuestionAPI,
    getPPVQuizByContentAPI,

    updatePPVQuizQuestionAPI,
    deletePPVQuizQuestionAPI,
    getPPVQuizAnswerByQuestionAPI,
    insertPPVQuizQuestionAnswerAPI,
    deletePPVQuizQuestionAnswerAPI,
    
    getPPVContentByID,
    uploadPPVContentMovieVideo,
} from "../../services/Content_service";
import { useNavigate } from "react-router-dom";

export default function Index(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [ppvContentMovieStates, setPPVContentMovieStates] = useState({
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
    quiz_config : null,
    quiz_question : null,
    quiz_question_answer : null,
    question_idv1 : null,
    content_name: null,
    movie_video_url:null,
    upload_video_b64: null,
  });

  window.scrollTo(0,props.pages.content_movie_current_scrollY);
  console.log(window.scrollY);
  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    ppvContentMovieStates.upload_video_b64 = base64.replace("data:","").replace("video/","").replace("mp4;","").replace("base64,","")+"...file_name..."+file.name;
    setPPVContentMovieStates({...ppvContentMovieStates})
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
  const columns_quiz_question = [
    {
        title : "Id",
        dataIndex : "id",
        key : "id",
    },
    {
        title : "Content name",
        dataIndex : "content_id",
        key : "content_id",
        render: (text, record) => render(ppvContentMovieStates.content_name, record)
    },
    {
        title : "Question",
        dataIndex : "question",
        key : "question",
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key : "is_active",
        render:(text, record) => render(text == 1 ? "Идэвхгүй":"Идэвхтэй", record)
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
                    deletePPVQuestion(record);
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
                    ppvContentMovieStates.action = "EDIT_PPV_QUIZ_QUESTION";
                    // setPPVContentMovieStates({ ...ppvContentMovieStates });
                    // getAllReading(record);
                    ppvContentMovieStates.updateData = record;
                    ppvContentMovieStates.id = record.id;
                    ppvContentMovieStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Answer харах">
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    ppvContentMovieStates.action = "SEE_PPV_QUIZ_QUESTION_ANSWER";
                    // setPPVContentMovieStates({ ...ppvContentMovieStates });
                    // getAllReading(record);
                    getPPVQuizAnswer(record.id);
                    ppvContentMovieStates.updateData = record;
                    ppvContentMovieStates.question_idv1 = record.id
                    ppvContentMovieStates.id = record.id;
                    ppvContentMovieStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    }}
                    icon={<ZoomInOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Answer нэмэх">
                <Button
                    onClick={() => {
                    console.log("UPDATE/edit intro CUE video records==>", record);
                    console.log("introVideoCueStates updateIntroCueVideo");
                    ppvContentMovieStates.action = "ADD_PPV_QUIZ_QUESTION_ANSWER";
                    // setPPVContentMovieStates({ ...ppvContentMovieStates });
                    // getAllReading(record);
                    getPPVQuizAnswer(record.id);
                    ppvContentMovieStates.updateData = record;
                    ppvContentMovieStates.id = record.id;
                    ppvContentMovieStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    }}
                    icon={<ZoomInOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
            </Space>
        )
    }
    
  ]


  const columns_quiz_answer = [
    {
        title : "Id",
        dataIndex : "id",
        key : "id",
        render: (text, record) => render(text, record)
    },
    {
        title : "Question id",
        dataIndex : "question_id",
        key : "question_id",
        render: (text, record) => render(text, record)
    },
    {
        title : "Answer",
        dataIndex : "answer",
        key : "answer",
        render: (text, record) => render(text, record)
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key : "is_active",
        render:(text, record) => render(text == 1 ? "Идэвхгүй":"Идэвхтэй", record)
    },
    {
        title : "Is correct",
        dataIndex : "is_correct",
        key : "is_correct",
        render: (text, record) => render(text, record)
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
                    deletePPVQuizQuestionAnswerData(record);
                   
                    }}
                    okText="Тийм"
                    cancelText="Үгүй"
                >
                    <Button icon={<DeleteOutlined style={{ color: "#FF6B72" }} />} />
                </Popconfirm>
                
            </Space>
        )
    }

  ]

  const columns_quiz = [
    {
        title : "Id",
        dataIndex : "id",
        key : "id",
        render: (text, record) => render(text, record)
    }, 
    {
        title : "Content name",
        dataIndex : "content_id",
        key : "content_id",
        render: (text, record) => render(ppvContentMovieStates.content_name, record)
    },
    {
        title : "Num context",
        dataIndex : "num_context",
        key : "num_context",
        render: (text, record) => render(text, record)
    },
    {
        title : "Num voc",
        dataIndex : "num_voc",
        key : "num_voc",
        render: (text, record) => render(text, record)
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key : "is_active",
        render:(text, record) => render(text == 1 ? "Идэвхгүй":"Идэвхтэй", record)
    },
    {
        title : "Duration",
        dataIndex : "duration",
        key : "duration",
        render: (text, record) => render(text, record)
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
                    deletePPVQuizConfig(record);
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
                    ppvContentMovieStates.action = "EDIT";
                    // setPPVContentMovieStates({ ...ppvContentMovieStates });
                    // getAllReading(record);
                    ppvContentMovieStates.updateData = record;
                    ppvContentMovieStates.id = record.id;
                    ppvContentMovieStates.isModalVisible = true;
                    getFormData(record);
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                
            </Space>
        )
    }
  ]

  const columns = [
    {
        title : "Id",
        dataIndex : "id",
        key :"id",
        render: (text, record) => render(text, record)
    },
    {
        title : "Content name",
        dataIndex : "content_id",
        key :"content_id",
        render: (text, record) => render(ppvContentMovieStates.content_name, record)
    },
    {
        title : "Name",
        dataIndex : "name",
        key : "name",
        render: (text, record) => render(text, record)
    },
    {
        title : "Intro",
        dataIndex : "intro",
        key :"intro",
        render: (text, record) => render(text, record)
    },
    {
        title : "Run time",
        dataIndex : "run_time",
        key :"run_time",
        render: (text, record) => render(text, record)
    },
    {
        title : "Ordering",
        dataIndex : "ordering",
        key :"ordering",
        render: (text, record) => render(text, record)
    },
    {
        title : "Is active",
        dataIndex : "is_active",
        key :"is_active",
        render:(text, record) => render(text == 1 ? "Идэвхгүй":"Идэвхтэй", record)
    },
    {
        title : "Host url",
        dataIndex : "host_url",
        key :"host_url",
        render: (text, record) => render(text, record)
    },
    {
        title : "Host type",
        dataIndex : "host_type",
        key :"host_type",
        render: (text, record) => render(text, record)
    },
    {
        title : "Үйлдэл",
        key : "action",
        fixed : "right",
        width : 100,
        render: (text, record) => {
            return{
                props: {
                    style: {background: record.is_active == 1 ? "#e8e7e6":""}
                },
                children:<Space size="middle">
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
                    ppvContentMovieStates.action = "EDIT";
                    // setPPVContentMovieStates({ ...ppvContentMovieStates });
                    // getAllReading(record);
                    ppvContentMovieStates.updateData = record;
                    ppvContentMovieStates.id = record.id;
                    ppvContentMovieStates.isModalVisible = true;
                    ppvContentMovieStates.movie_video_url = record.host_url;
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    getFormData(record);
                    setPPVContentMovieStates({ ...ppvContentMovieStates });
                    }}
                    icon={<EditOutlined style={{ color: "#3e79f7" }} />}
                />
                </Tooltip>
                <Tooltip placement="topRight" title="Cue руу үсрэх">
                    <Button
                    onClick={() => {
                        console.log("Cue button intro video records ID==>", record.id);
                        console.log(props.courseIds)
                        navigate("/ppv/content-movie-cue");
                        props.courseIds.ppvContentMovieId = record.id;
                        props.setCourseIds({ ...props.courseIds });
                    }}
                    icon={<ArrowsAltOutlined style={{ color: "#3e79f7" }} />}
                    />
                </Tooltip>
            </Space>
            }
        }
    }
    
  ]

  const getFormData = (record) => {
  
    // setIntroVideoCueStates({ ...introVideoCueStates });
    form.setFieldsValue({
      content_id : record.content_id, 
      name : record.name,
      intro : record.intro,
      run_time : record.run_time, 
      ordering : record.ordering, 
      is_active : record.is_active, 
      host_url : record.host_url,
      host_type : record.host_type,
    });
  };

  //GET All writing list
  const getAllReading = (id) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ ppvContentMovieStates });
    getAllContentMovieByContentAPI(id, ppvContentMovieStates.token)
      .then((res) => {
        ppvContentMovieStates.loader = false;
        setPPVContentMovieStates({ ppvContentMovieStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentMovieStates.data = res.data.data;
          setPPVContentMovieStates({ ...ppvContentMovieStates });
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

  const getPPVQuizAnswer = (id) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ ppvContentMovieStates });
    getPPVQuizAnswerByQuestionAPI(id, ppvContentMovieStates.token)
      .then((res) => {
        ppvContentMovieStates.loader = false;
        setPPVContentMovieStates({ ppvContentMovieStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentMovieStates.quiz_question_answer = res.data.data;
          setPPVContentMovieStates({ ...ppvContentMovieStates });
          console.log("success all quiz answer", res.data.data);
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

  const getPPVQuizConfigs = (id) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ ppvContentMovieStates });
    getPPVQuizConfigByContentAPI(id, ppvContentMovieStates.token)
      .then((res) => {
        ppvContentMovieStates.loader = false;
        setPPVContentMovieStates({ ppvContentMovieStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentMovieStates.quiz_config = res.data.data;
          setPPVContentMovieStates({ ...ppvContentMovieStates });
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


  const getPPVQuizQuestions = (id) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ ppvContentMovieStates });
    getPPVQuizByContentAPI(id, ppvContentMovieStates.token)
      .then((res) => {
        ppvContentMovieStates.loader = false;
        setPPVContentMovieStates({ ppvContentMovieStates });
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          ppvContentMovieStates.quiz_question = res.data.data;
          setPPVContentMovieStates({ ...ppvContentMovieStates });
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

    const getPPVContentByid = (content_id) => {
        ppvContentMovieStates.loader = true;
        setPPVContentMovieStates({ppvContentMovieStates})
        getPPVContentByID(ppvContentMovieStates.token, content_id)
            .then((res) => {
                ppvContentMovieStates.loader = false;
                setPPVContentMovieStates({...ppvContentMovieStates});
                if(res.data.status){
                    ppvContentMovieStates.content_name = res.data.data.name;
                    setPPVContentMovieStates({...ppvContentMovieStates});
                }
            })
    }

  const insertListeningData = (values) => {
      ppvContentMovieStates.loader = true;
      setPPVContentMovieStates({ppvContentMovieStates});
      console.log("SHINE PISDA : ", values);
      inserContentMovieAPI(values, ppvContentMovieStates.token)
        .then((res) => {
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({ppvContentMovieStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieStates.insertData = res.data.data;
                setPPVContentMovieStates({ ...ppvContentMovieStates });
                getAllReading(props.courseIds.ppvContentId);
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

  const insertPPVQuizQuestionData = (values) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ppvContentMovieStates});
    // console.log("SHINE PISDA : ", values);
    insertPPVQuizQuestionAPI(values, ppvContentMovieStates.token)
      .then((res) => {
          ppvContentMovieStates.loader = false;
          setPPVContentMovieStates({ppvContentMovieStates});
          if (res && res.data && res.data.status && res.data.status === true) {
              //success
            //   ppvContentMovieStates.insertData = res.data.data;
              
              getAllReading(props.courseIds.ppvContentId);
              getPPVQuizConfigs(props.courseIds.ppvContentId);
              getPPVQuizQuestions(props.courseIds.ppvContentId);
              setPPVContentMovieStates({ ...ppvContentMovieStates });
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

const updatePPVQuizQuestionData = (values) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ppvContentMovieStates});
    // console.log("SHINE PISDA : ", values);
    updatePPVQuizQuestionAPI(values, ppvContentMovieStates.token)
      .then((res) => {
          ppvContentMovieStates.loader = false;
          setPPVContentMovieStates({ppvContentMovieStates});
          if (res && res.data && res.data.status && res.data.status === true) {
              //success
            //   ppvContentMovieStates.insertData = res.data.data;
              
              getAllReading(props.courseIds.ppvContentId);
              getPPVQuizConfigs(props.courseIds.ppvContentId);
              getPPVQuizQuestions(props.courseIds.ppvContentId);
              setPPVContentMovieStates({ ...ppvContentMovieStates });
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

const insertPPVQuizQuestionAnswerData = (values) => {
    ppvContentMovieStates.loader = true;
    setPPVContentMovieStates({ppvContentMovieStates});
    // console.log("SHINE PISDA : ", values);
    insertPPVQuizQuestionAnswerAPI(values, ppvContentMovieStates.token)
      .then((res) => {
          ppvContentMovieStates.loader = false;
          setPPVContentMovieStates({ppvContentMovieStates});
          if (res && res.data && res.data.status && res.data.status === true) {
              //success
            //   ppvContentMovieStates.insertData = res.data.data;
              
              getAllReading(props.courseIds.ppvContentId);
              getPPVQuizConfigs(props.courseIds.ppvContentId);
              getPPVQuizQuestions(props.courseIds.ppvContentId);
              setPPVContentMovieStates({ ...ppvContentMovieStates });
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
      ppvContentMovieStates.loader = true;
      setPPVContentMovieStates({ppvContentMovieStates})
      updateContentMovieAPI(values, ppvContentMovieStates.token)
        .then((res) => {
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({ppvContentMovieStates});
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieStates.updateData = res.data.data;
                setPPVContentMovieStates({ ...ppvContentMovieStates });
                getAllReading(props.courseIds.ppvContentId);
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
      ppvContentMovieStates.loader = true; 
      setPPVContentMovieStates({ppvContentMovieStates})
      deleteContentMovieAPI(values.id, ppvContentMovieStates.token)
        .then((res) => {
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({ppvContentMovieStates})
            if (res && res.data && res.data.status && res.data.status === true) {
                //success
                ppvContentMovieStates.updateData = res.data.data;
                setPPVContentMovieStates({ ...ppvContentMovieStates });
                getAllReading(props.courseIds.ppvContentId);
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

  const deletePPVQuizQuestionAnswerData = (values) => {
    ppvContentMovieStates.loader = true; 
    setPPVContentMovieStates({ppvContentMovieStates})
    deletePPVQuizQuestionAnswerAPI(values.id, ppvContentMovieStates.token)
      .then((res) => {
          ppvContentMovieStates.loader = false;
          setPPVContentMovieStates({ppvContentMovieStates})
          if (res && res.data && res.data.status && res.data.status === true) {
              //success
              ppvContentMovieStates.updateData = res.data.data;
              setPPVContentMovieStates({ ...ppvContentMovieStates });
              getAllReading(props.courseIds.ppvContentId);
              getPPVQuizAnswer(ppvContentMovieStates.question_idv1)
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

  const deletePPVQuizConfig = (values) => {
    ppvContentMovieStates.loader = true; 
    setPPVContentMovieStates({ppvContentMovieStates})
    deletePPVQuizConfigAPI(values.id, ppvContentMovieStates.token)
      .then((res) => {
          ppvContentMovieStates.loader = false;
          setPPVContentMovieStates({ppvContentMovieStates})
          if (res && res.data && res.data.status && res.data.status === true) {
              //success
            //   ppvContentMovieStates.updateData = res.data.data;
              setPPVContentMovieStates({ ...ppvContentMovieStates });
              getAllReading(props.courseIds.ppvContentId);
              getPPVQuizConfigs(props.courseIds.ppvContentId);
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


const deletePPVQuestion = (values) => {
    ppvContentMovieStates.loader = true; 
    setPPVContentMovieStates({ppvContentMovieStates})
    deletePPVQuizQuestionAPI(values.id, ppvContentMovieStates.token)
      .then((res) => {
          ppvContentMovieStates.loader = false;
          setPPVContentMovieStates({ppvContentMovieStates})
          if (res && res.data && res.data.status && res.data.status === true) {
              //success
            //   ppvContentMovieStates.updateData = res.data.data;
              setPPVContentMovieStates({ ...ppvContentMovieStates });
              getAllReading(props.courseIds.ppvContentId);
              getPPVQuizConfigs(props.courseIds.ppvContentId);
              getPPVQuizQuestions(props.courseIds.ppvContentId);
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

    const insertPPVContentMovieVideo = (data) =>{
        ppvContentMovieStates.loader = true;
        ppvContentMovieStates.isModalVisible = false;
        setPPVContentMovieStates({...ppvContentMovieStates});
        uploadPPVContentMovieVideo(data).then((res) => {
            if(res && res.data && res.status){
                ppvContentMovieStates.isModalVisible = true;
                ppvContentMovieStates.loader = false;
                setPPVContentMovieStates({...ppvContentMovieStates});
                ppvContentMovieStates.movie_video_url = res.data.response;
                setPPVContentMovieStates({...ppvContentMovieStates});
                form.setFieldsValue({
                    host_url: ppvContentMovieStates.movie_video_url
                });
                message.success("Бичлэг хуулагдлааа");
            }else{
                ppvContentMovieStates.isModalVisible = true;
                ppvContentMovieStates.loader = false;
                setPPVContentMovieStates({...ppvContentMovieStates});
                message.error("Бичлэг хуулах явцад алдаа гарлаа");
            }
        }).catch((err)=>{
            ppvContentMovieStates.isModalVisible = true;
            ppvContentMovieStates.loader = false;
            setPPVContentMovieStates({...ppvContentMovieStates});
            message.error("Бичлэг хуулах явцад алдаа гарлаа");
        })
    }

  const onFinishWriting = (values) => {
      console.log("on finish writing : ", values);

      ppvContentMovieStates.isModalVisible = false;
      if (ppvContentMovieStates.action == "ADD_READING") {
        //   values.is_active = parseInt(values.is_active);
          var insObj = {
              content_id : parseInt(props.courseIds.ppvContentId),
              name : values.name,
              intro : values.intro,
              run_time : parseInt(values.run_time),
              ordering : parseInt(values.ordering),
              is_active : parseInt(values.is_active),
              host_url : values.host_url,
              host_type : parseInt(values.host_type),
          };
          insertListeningData(insObj);
          
        //   getAllReading(props.courseIds.ppvContentId);;
      } else if (ppvContentMovieStates.action == "EDIT") {
          var updObj = {
            id : ppvContentMovieStates.id,
            content_id : parseInt(props.courseIds.ppvContentId),
            name : values.name,
            intro : values.intro,
            run_time : parseInt(values.run_time),
            ordering : parseInt(values.ordering),
            is_active : parseInt(values.is_active),
            host_url : values.host_url,
            host_type : parseInt(values.host_type),
          };
          updateListeningData(updObj);
          form.resetFields();
          getAllReading(props.courseIds.ppvContentId);
      } else if (ppvContentMovieStates.action == "ADD_PPV_QUIZ_QUESTION") {
        var insertObj = {
          content_id : props.courseIds.ppvContentId,
          question : values.question,
          is_active : parseInt(values.is_active),
        };
        insertPPVQuizQuestionData(insertObj);
        form.resetFields();
        getAllReading(props.courseIds.ppvContentId);;
        getPPVQuizConfigs(props.courseIds.ppvContentId);
        getPPVQuizQuestions(props.courseIds.ppvContentId);
    } else if (ppvContentMovieStates.action == "EDIT_PPV_QUIZ_QUESTION") {
        var insertObj = {
          id : parseInt(ppvContentMovieStates.id),
          content_id : props.courseIds.ppvContentId,
          question : values.question,
          is_active : parseInt(values.is_active),
        };
        updatePPVQuizQuestionData(insertObj);
        form.resetFields();
        getAllReading(props.courseIds.ppvContentId);;
        getPPVQuizConfigs(props.courseIds.ppvContentId);
        getPPVQuizQuestions(props.courseIds.ppvContentId);
    } else if (ppvContentMovieStates.action == "ADD_PPV_QUIZ_QUESTION_ANSWER") {
        var insertObj = {
          
          question_id : ppvContentMovieStates.id,
          answer : values.answer,
          is_active : parseInt(values.is_active),
          is_correct : parseInt(values.is_correct),
        };
        insertPPVQuizQuestionAnswerData(insertObj);
        form.resetFields();
        getAllReading(props.courseIds.ppvContentId);;
        getPPVQuizConfigs(props.courseIds.ppvContentId);
        getPPVQuizQuestions(props.courseIds.ppvContentId);
    }

    
  }
  const onFinishFailedWriting = () => {
      console.log("on finish failed writing")
  }

  const insertWriting = () => {
    ppvContentMovieStates.isModalVisible = true;
    ppvContentMovieStates.action = "ADD_READING";
    setPPVContentMovieStates({ ...ppvContentMovieStates });
  };

  const insertPPVQuizQuestion = () => {
    ppvContentMovieStates.isModalVisible = true;
    ppvContentMovieStates.action = "ADD_PPV_QUIZ_QUESTION";
    setPPVContentMovieStates({ ...ppvContentMovieStates });
  };

  const uploadVideo = () =>{

    var upObj = {
        "upload": ppvContentMovieStates.upload_video_b64.split("...file_name...")[0],
        "file_name": ppvContentMovieStates.upload_video_b64.split("...file_name...")[1],
    };
    insertPPVContentMovieVideo(upObj)
  }

  useEffect(() => {
    console.log("listening useffect");
    getAllReading(props.courseIds.ppvContentId);
    getPPVQuizConfigs(props.courseIds.ppvContentId);
    getPPVQuizQuestions(props.courseIds.ppvContentId);
    getPPVContentByid(props.courseIds.ppvContentId)
  }, []);

return (
    <>
    <Card title={"PPV"} style={{ margin: 15, width: "100%", backgroundColor:"#f7f7f7" }}>
    {/* <Affix offsetTop={-100} style={{position:"absolute", left:"0%"}} >
        <h2>{ppvContentMovieStates.content_name}</h2>
    </Affix> */}
      <Spin
        tip=""
        spinning={ppvContentMovieStates.loader}
        indicator={antIcon}
        style={{
          position: "absolute",
          top: "50%",
          left: "0%",
          marginTop: "-5.5rem",
        }}
      >
        <Card style={{borderBlockColor:"gray"}}>
        <h2>PPV quiz config</h2>
        <Table columns={columns_quiz} dataSource={ppvContentMovieStates.quiz_config}/>
        </Card>
        <Card style={{borderBlockColor:"gray"}}>
        <h2>PPV movie</h2>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop:"10px" }}>
          <Button
            onClick={insertWriting}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            PPV нэмэх
          </Button>
        </div>
        <Table columns={columns} dataSource={ppvContentMovieStates.data} />
        </Card>
        <Card style={{borderBlockColor:"gray"}}>
        <h2>PPV quiz question</h2>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={insertPPVQuizQuestion}
            icon={<PlusCircleOutlined />}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            PPV Quiz Question нэмэх
          </Button>
        </div>
        <Table columns={columns_quiz_question} dataSource={ppvContentMovieStates.quiz_question}/>
        </Card>
        <Modal
          title="PPV edit"
          width={"90%"}
          visible={ppvContentMovieStates.isModalVisible}
          footer={null}
          onCancel={() => {
            form.resetFields();
            ppvContentMovieStates.isModalVisible = false;
            ppvContentMovieStates.action = null;
            setPPVContentMovieStates({ ...ppvContentMovieStates });
          }}
        >
         {(() => {   
             if(ppvContentMovieStates.action == "EDIT") {
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
                                        name={"name"}
                                        label="Name"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"intro"}
                                        label="Intro"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"run_time"}
                                        label="Run time"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
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
                                        name={"is_active"}
                                        label="Is active"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"host_url"}
                                        label="Host url"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"host_type"}
                                        label="Host type"
                                        rules={[
                                            { required: true, message: "Заавал бөглөнө үү!" },
                                        ]}
                                        
                                        >
                                            <Input />
                                        </Form.Item>
                                    
                                    </Col>
                                    <Col span={24}>
                                    <Col span={8} offset={4}>
                                      <Input
                                                id="originalFileName"
                                                type="file"
                                                inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt, .ts' }}
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
                                                onClick={uploadVideo}
                                                icon={<PlusCircleOutlined />}
                                                type="primary"
                                                style={{
                                                marginBottom: 16,
                                                }}
                                            >
                                                Upload video
                                            </Button>
                                    </Col>
                                  </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Col span={8}>
                            <video id="myVideo" height={300} src={ppvContentMovieStates.movie_video_url} controls></video>
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
             } else if(ppvContentMovieStates.action == "ADD_READING") {
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
                                       name={"name"}
                                       label="Name"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"intro"}
                                       label="Intro"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"run_time"}
                                       label="Run time"
                                       rules={[
                                        { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
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
                                       name={"is_active"}
                                       label="Is active"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"host_url"}
                                       label="Host url"
                                       rules={[
                                           { required: true, message: "Заавал бөглөнө үү!" },
                                       ]}
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"host_type"}
                                       label="Host type"
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
            } else if(ppvContentMovieStates.action == "ADD_PPV_QUIZ_QUESTION") {
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
                                       name={"question"}
                                       label="question"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_active"}
                                       label="Is active"
                                       
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
            } else if(ppvContentMovieStates.action == "EDIT_PPV_QUIZ_QUESTION") {
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
                                       name={"question"}
                                       label="question"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_active"}
                                       label="Is active"
                                       
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
            } else if(ppvContentMovieStates.action == "ADD_PPV_QUIZ_QUESTION_ANSWER") {
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
                                       name={"answer"}
                                       label="answer"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_active"}
                                       label="Is active"
                                       
                                       >
                                           <Input />
                                       </Form.Item>
                                   
                                   </Col>
                                   <Col span={12}>
                                       <Form.Item
                                       name={"is_correct"}
                                       label="Is correct"
                                       
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
            } else if(ppvContentMovieStates.action == "SEE_PPV_QUIZ_QUESTION_ANSWER") {
                return (
                   <Table columns={columns_quiz_answer} dataSource={ppvContentMovieStates.quiz_question_answer} />
               )
            } 


            })()}
        </Modal>
      </Spin>
    </Card>
    </>
  );
}