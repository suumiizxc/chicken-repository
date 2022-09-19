import { ArrowsAltOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, message, Modal, Space, Spin, Table, Tooltip, Form, Row, Col, Input, Select} from "antd";
import { useEffect, useState } from "react";
import { GetAllHWListening, GetAllHwListeningCharacters, GetCharactersByListeningID, InsertHWListening, UpdateHWListening, UploadListeningMP3 } from "../../services/Listening_service";
import { useNavigate } from "react-router-dom";
export default function Index(props){

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const { Option } = Select;
    const [hwListeningStates, setHwListeningStates] = useState({
        token: localStorage.getItem("token"),
        cart_title: "Сонсгол шалгах",
        loader: false,
        isModalVisible: false,
        data: null,
        action: null,
        reqData:{
            id: null,
		    title: null,
		    is_active: null,
		    created_at: null,
		    created_user: null,
		    sound_url: null,
		    level_id: null
        },
        sound_url: null,
        uploadMp3b64: null,
    });

    const column = [
        {
            title: "ID",
            dataIndex: "id",
            key: "title"
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Level",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Created user",
            dataIndex: "last_name",
            key: "last_name"
        },
        {
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: "Is active",
            dataIndex: "is_active",
            key: "is_active"
        },
        {
            title: "Sound url",
            dataIndex: "sound_url",
            key: "sound_url"
        },
        {
            title:"Үйлдэл",
            key: "action",
            fixed: "right",
            width: 100,
            render: (text, record) => {
                return(
                <Space size="middle">
                    <Tooltip placement="topRight" title="Засах">
                    <Button
                        onClick={()=>{
                            hwListeningStates.action = "EDIT"
                            hwListeningStates.sound_url = record.sound_url;
                            hwListeningStates.isModalVisible = true;
                            hwListeningStates.reqData.id = parseInt(record.id);
                            hwListeningStates.reqData.created_at = record.created_at;
                            hwListeningStates.reqData.created_user = parseInt(record.created_user);
                            //hwListeningStates.created_user = record.created_user
                            setHwListeningStates({...hwListeningStates});
                            getFormData(record);
                        }}
                        icon={<EditOutlined style={{ color: "#3e79f7"}}/>}
                    >
                    </Button>
                    </Tooltip>
                    <Tooltip
                        placement="topRight" title="Cue рүү үсрэх"
                    >
                        <Button
                        onClick={()=>{
                            props.courseIds.hwListeningId = record.id;
                            props.setCourseIds({...props.courseIds});
                            getCharactersByListeningID(record.id);
                        }}
                        icon={<ArrowsAltOutlined style={{color: "#3e79f7"}}/>}
                        >
                        </Button>
                    </Tooltip>
                </Space>
                )
            }
        }
    ]

    const getFormData = (record) =>{
        form.setFieldsValue({
            title: record.title,
            level_id: record.level_id,
            is_active: record.is_active,
            sound_url: record.sound_url
        })
    }

    const getCharactersByListeningID = (listening_id) =>{
        hwListeningStates.loader = true;
        setHwListeningStates({...hwListeningStates});
        GetCharactersByListeningID(hwListeningStates.token, listening_id).then((res) => {
            props.courseIds.listeningCharacters = [];
            for(let i=0; i<res.data.data.length; i++){
                props.courseIds.listeningCharacters.push(
                    {
                        id:res.data.data[i].id,
                        name:res.data.data[i].name
                    }
                )
                props.setCourseIds({...props.courseIds});
            }
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            navigate("/hw_listening_cue");
        })
    }

    const getAllHWListening = () =>{
        hwListeningStates.loader = true;
        setHwListeningStates({...hwListeningStates});
        GetAllHWListening(hwListeningStates.token).then((res) => {
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            if(res && res.data && res.data.status){
                hwListeningStates.data = res.data.data;
                setHwListeningStates({...hwListeningStates});
            }else{
                message.error("Амжилтгүй");
            }
        }).catch((e) => {
            message.error("Алдаа гарлаа")
        })
    }

    const updateHWListening = (data) =>{
        hwListeningStates.loader = true;
        setHwListeningStates({...hwListeningStates});
        UpdateHWListening(hwListeningStates.token, data).then((res) => {
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            if(res && res.data && res.data.status){
                message.success("Амжилттай шинэчлэлээ")
                getAllHWListening();
                hwListeningStates.reqData = {
                    id: null,
                    title: null,
                    is_active: null,
                    created_at: null,
                    created_user: null,
                    sound_url: null,
                    level_id: null
                }
            }else{
                message.error("Амжилтгүй");
            }
        }).catch((e) => {
            message.error("Алдаа гарлаа")
        })
    }

    const insertHwListening = (data) => {
        hwListeningStates.loader = true;
        setHwListeningStates({...hwListeningStates});
        InsertHWListening(hwListeningStates.token, data).then((res) => {
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            if(res && res.data && res.data.data){
                message.success("Амжилттай шинэчлэлээ");
                hwListeningStates.reqData = {
                    id: null,
                    title: null,
                    is_active: null,
                    created_at: null,
                    created_user: null,
                    sound_url: null,
                    level_id: null
                };
                getAllHWListening();
            }else{
                message.error("Амжилтгүй");
            }
        })
        .catch((err) => {
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            message.error("Алдаа гарлаа");
        })
    }

    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        hwListeningStates.uploadMp3b64 = base64.replace("data:","").replace("audio/","").replace("mpeg;", "").replace("base64,","")+"...file_name..."+file.name;
        setHwListeningStates({...hwListeningStates});
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const uploadMp3 = () =>{
        var upObj = {
            "upload" : hwListeningStates.uploadMp3b64.split("...file_name...")[0],
            "file_name": hwListeningStates.uploadMp3b64.split("...file_name...")[1]
        }
        uploadListeningMP3(upObj);
    }

    const uploadListeningMP3 = (data) => {
        hwListeningStates.loader = true;
        hwListeningStates.isModalVisible = false;
        setHwListeningStates({...hwListeningStates})
        UploadListeningMP3(hwListeningStates.token,data).then((res) => {
            hwListeningStates.loader = false;
            hwListeningStates.isModalVisible = true;
            hwListeningStates.reqData.sound_url = res.data.response;
            hwListeningStates.sound_url = res.data.response;
            setHwListeningStates({...hwListeningStates});
            form.setFieldsValue({sound_url: hwListeningStates.reqData.sound_url});
        })
        .catch((e) => {
            message.error("Алдаа гарлаа");
            console.log(e);
        })
    }

    const onFinish = (values) => {
        hwListeningStates.isModalVisible = false;
        switch(hwListeningStates.action){
            case "EDIT":
                hwListeningStates.reqData.is_active = parseInt(values.is_active);
                hwListeningStates.reqData.level_id = parseInt(values.level_id);
                hwListeningStates.reqData.sound_url = values.sound_url;
                hwListeningStates.reqData.title = values.title;
                setHwListeningStates({...hwListeningStates});
                updateHWListening(hwListeningStates.reqData);
                break;
            case "ADD_LISTENING":
                hwListeningStates.reqData.is_active = parseInt(values.is_active);
                hwListeningStates.reqData.level_id = parseInt(values.level_id);
                hwListeningStates.reqData.sound_url = values.sound_url;
                hwListeningStates.reqData.title = values.title;
                setHwListeningStates({...hwListeningStates});
                insertHwListening(hwListeningStates.reqData);
                break;
        }
    }

    const insertListening = () => {
        hwListeningStates.isModalVisible = true;
        hwListeningStates.action = "ADD_LISTENING"
        setHwListeningStates({...hwListeningStates})
    };

    const getAllHwListeningCharacters = () =>{
        hwListeningStates.loader = true;
        setHwListeningStates({...hwListeningStates});
        GetAllHwListeningCharacters(hwListeningStates.token).then((res) => {
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            if(res && res.data && res.data.status){
                props.courseIds.characterOptions = [];
                for(let i=0; i<res.data.data.length; i++){
                    props.courseIds.characterOptions.push(<Option key={res.data.data[i].id} value={res.data.data[i].name}>{res.data.data[i].name}</Option>)
                    props.setCourseIds({...props.courseIds});
                }
            }else{
                message.error("Амжилтгүй");
            }
        })
        .catch((err) => {
            hwListeningStates.loader = false;
            setHwListeningStates({...hwListeningStates});
            message.error("Алдаа гарлаа");
        })
    }

    useEffect(() => {
        getAllHwListeningCharacters();
        getAllHWListening();
    }, [])

    return(
        <Card title="Сонсгол шалгах" style={{margin:"15px", width:"100%"}}>
            <Spin
                tip=""
                spinning={hwListeningStates.loader}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    marginTop: "-5.5rem",
                }}
            >
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button
                        onClick={insertListening}
                        icon={<PlusCircleOutlined/>}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        Сонсгол шалгах нэмэх
                    </Button>
                </div>
                <Table columns={column} dataSource={hwListeningStates.data}/>
                <Modal
                    title = "Listening edit"
                    width = {"90%"}
                    visible = {hwListeningStates.isModalVisible}
                    footer = {null}
                    onCancel={()=>{
                        form.resetFields();
                        hwListeningStates.isModalVisible = false;
                        hwListeningStates.sound_url = null;
                        setHwListeningStates({...hwListeningStates});
                        console.log(hwListeningStates.sound_url)
                    }}
                >
                    <Form
                    form = {form}
                    labelCol={{span:8}}
                    wrapperCol={{span:16}}
                    initialValues={{remember:true}}
                    onFinish={onFinish}
                    onFinishFailed={()=>{
                        message.error("Амжилтгүй")
                    }}
                    autoComplete="off"
                    >
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col
                                    span={8}
                                    >
                                        <Form.Item
                                        name={"title"}
                                        label={"Title"}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                    span={8}
                                    >
                                        <Form.Item
                                        name={"level_id"}
                                        label={"Level"}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                    span={8}
                                    >
                                        <Form.Item
                                        name={"is_active"}
                                        label={"is_active"}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                    span={8}
                                    >
                                        <Form.Item
                                        name={"sound_url"}
                                        label={"Sound url"}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                    span={24}
                                    offset={2}
                                    >
                                    <Col
                                    span={6}>
                                        <Input
                                            id="originFileName"
                                            type="file"
                                            label="Document"
                                            name="originalFileName"
                                            onChange={handleFileRead}
                                            size="small"
                                            variant="standart"
                                        />
                                    </Col>
                                    <Col
                                    style={{marginTop:"5px"}}
                                    span={8}
                                    >
                                        <audio controls
                                            src={hwListeningStates.sound_url}
                                        >
                                        </audio>
                                    </Col>
                                    <Col
                                    span={6}>
                                        <Button
                                            onClick={uploadMp3}
                                            icon={<PlusCircleOutlined/>}
                                            type="primary"
                                            style={{
                                                margin: 16,
                                            }}
                                        >
                                            Upload mp3
                                        </Button>
                                    </Col>
                                    </Col>
                                </Row>
                                <Form.Item
                                    wrapperCol={{ offset: 17, span: 7}}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{width:"100%"}}
                                    >
                                        Хадгалах
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Spin>
        </Card>
    );
}