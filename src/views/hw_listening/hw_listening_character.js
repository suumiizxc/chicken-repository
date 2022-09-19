import { EditOutlined, ManOutlined, PlayCircleFilled, PlusCircleOutlined, StopOutlined, WomanOutlined } from "@ant-design/icons";
import { Card,message, Spin, List, Avatar, Button, Tooltip, Modal, Form, Row, Col, Input } from "antd";
import { useEffect, useState } from "react"
import { GetAllHwListeningCharacters, InsertHwListeningCharacter, UpdateHwListeningCharacter, UploadListeningCharacterImage } from "../../services/Listening_service";

export default function Index(props){
    
    const [form] = Form.useForm();

    const[hwListeningCharacterStates, setHwListeningCharacterStates] = useState({
        token: localStorage.getItem("token"),
        cart_title: "Дүрүүд",
        loader: false,
        isModalVisible: false,
        data: [],
        action: null,
        reqData: {
            id: null,
            name: null,
            profile_img: null,
            is_active: null,
            sex: null
        },
        profile_img_url: null
    })

    const handleFileRead = async (event)=>{
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        hwListeningCharacterStates.upload_image_b64 = base64.replace("data:","").replace("image/","").replace("png;", "").replace("jpg;", "").replace("jpeg;", "").replace("base64,","")+"...file_name..."+file.name;
        setHwListeningCharacterStates({...hwListeningCharacterStates})
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () =>{
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) =>{
                reject(error);
            }
        })
    }

    const uploadImage = () =>{
        var upObj = {
            "upload" : hwListeningCharacterStates.upload_image_b64.split("...file_name...")[0],
            "file_name" : hwListeningCharacterStates.upload_image_b64.split("...file_name...")[1],
        }
        uploadListeningCharacterImage(upObj);
    }

    const uploadListeningCharacterImage = (data) =>{
        hwListeningCharacterStates.loader = true;
        setHwListeningCharacterStates({...hwListeningCharacterStates});
        UploadListeningCharacterImage(hwListeningCharacterStates.token, data).then((res) => {
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
            hwListeningCharacterStates.profile_img_url = res.data.response;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
            form.setFieldsValue({
                profile_img: hwListeningCharacterStates.profile_img_url
            })
        })
        .catch(()=>{
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
            message.error("Алдаа гарлаа ");
        })
    }

    const getAllListeningCharacters = () => {
        hwListeningCharacterStates.loader = true;
        setHwListeningCharacterStates({...hwListeningCharacterStates});
        GetAllHwListeningCharacters(hwListeningCharacterStates.token).then((res) => {
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
            if(res && res.data && res.data.status){
                hwListeningCharacterStates.data = res.data.data;
                setHwListeningCharacterStates({...hwListeningCharacterStates});
            }else{
                message.error("Амжилтгүй");
            }
        })
        .catch((err) => {
            message.error("Алдаа гарлаа")
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
        })
    }

    const insertHwlisteningCharacter = (data) =>{
        hwListeningCharacterStates.loader = true;
        setHwListeningCharacterStates({...hwListeningCharacterStates});
        InsertHwListeningCharacter(hwListeningCharacterStates.token, data).then((res) => {
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
            if(res && res.data && res.data.status){
                hwListeningCharacterStates.isModalVisible = false;
                setHwListeningCharacterStates({...hwListeningCharacterStates});
                message.success("Амжилттай");
                getAllListeningCharacters();
            }else{
                message.success("Амжилтгүй");
            }
        })
        .catch((err) => {
            message.error("Алдаа гарлаа");
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
        })
    } 

    const updateHwListeningCharacter = (data) =>{
        hwListeningCharacterStates.loader = true;
        setHwListeningCharacterStates({...hwListeningCharacterStates});
        UpdateHwListeningCharacter(hwListeningCharacterStates.token, data).then((res) => {
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
            if(res && res.data && res.data.status){
                message.success("Амжилттай");
                hwListeningCharacterStates.isModalVisible = false;
                setHwListeningCharacterStates({...hwListeningCharacterStates});
                getAllListeningCharacters();
            }else{
                message.success("Амжилтгүй");
            }
        })
        .catch((err) => {
            message.error("Алдаа гарлаа");
            hwListeningCharacterStates.loader = false;
            setHwListeningCharacterStates({...hwListeningCharacterStates});
        })
    }

    const getFieldsValue = (item) =>{
        form.setFieldsValue({
            name: item.name,
            profile_img: item.profile_img,
        })
    }

    const onFinish = (values) => {
        switch(hwListeningCharacterStates.action){
            case "EDIT":
                hwListeningCharacterStates.reqData.name = values.name
                hwListeningCharacterStates.reqData.profile_img = values.profile_img
                setHwListeningCharacterStates({...hwListeningCharacterStates})
                updateHwListeningCharacter(hwListeningCharacterStates.reqData)
                break;
            case "ADD_CHARACTER":
                hwListeningCharacterStates.reqData.name = values.name
                hwListeningCharacterStates.reqData.profile_img = values.profile_img
                setHwListeningCharacterStates({...hwListeningCharacterStates})
                insertHwlisteningCharacter(hwListeningCharacterStates.reqData)
                break;
        }
        hwListeningCharacterStates.reqData ={
            id: null,
            name: null,
            profile_img: null,
            is_active: null,
            sex: null
        }
        form.resetFields();
    }

    useEffect(()=>{
        getAllListeningCharacters();
    },[])

    return(
        <div
            style={{
                width:"100%",
                display:"flex",
                justifyContent: "center"
            }}
        >
        <Card title={hwListeningCharacterStates.cart_title}
            style = {{margin:15, width:"50%", borderColor:"black"}}
            
        >
            <Spin
                spinning={hwListeningCharacterStates.loader}
                style={{
                    position: "absolute",
                top: "50%",
                left: "0%",
                marginTop: "-5.5rem",
                }}
            >   
            <div
                style={{
                    display: "flex",
                    justifyContent: 'flex-end',
                    marginBottom:"5px"
                }}
            >
                <Button
                type="primary"
                onClick={()=>{
                    hwListeningCharacterStates.action = "ADD_CHARACTER"
                    hwListeningCharacterStates.isModalVisible = true;
                    setHwListeningCharacterStates({...hwListeningCharacterStates});
                }}
                >Дүр нэмэх</Button>
            </div>
                <List
                    itemLayout="horizontal"
                    dataSource={hwListeningCharacterStates.data}
                    renderItem={(item)=>(
                        <List.Item
                        extra={
                            <>
                            <Tooltip placement="topRight" title={item.is_active == 0 ? "Идэвхтэй болгох":"Идэвхгүй болгох"}>
                            <Button icon={item.is_active == 0 ? <PlayCircleFilled style={{ color: "#3e79f7" }}/> : <StopOutlined style={{ color: "#3e79f7" }}/>}
                                onClick={()=>{
                                    item.is_active = item.is_active === 0 ? 1:0;
                                    updateHwListeningCharacter(item);
                                }}
                            />
                            </Tooltip>
                            <Tooltip placement="topRight" title={"Хүйс солих"}>
                            <Button icon={item.sex == 1 ? <WomanOutlined style={{ color: "#3e79f7" }}/> : <ManOutlined style={{ color: "#3e79f7" }}/>}
                                onClick={()=>{
                                    item.sex = item.sex === 1 ? 2:1;
                                    updateHwListeningCharacter(item);
                                }}
                            />
                            </Tooltip>
                            <Tooltip placement="topRight" title={"Засах"}>
                                <Button icon={<EditOutlined style={{ color: "#3e79f7"}}
                                    onClick={()=>{
                                        hwListeningCharacterStates.action = "EDIT"
                                        hwListeningCharacterStates.isModalVisible = true;
                                        hwListeningCharacterStates.reqData.id = item.id;
                                        hwListeningCharacterStates.reqData.sex = item.sex;
                                        hwListeningCharacterStates.reqData.is_active = item.is_active;
                                        hwListeningCharacterStates.profile_img_url = item.profile_img;
                                        setHwListeningCharacterStates({...hwListeningCharacterStates})
                                        getFieldsValue(item)
                                    }}
                                />}/>
                            </Tooltip>
                            </>
                        }
                        style={{
                            background:item.is_active == 0 ? "#e8e8e8" : "white"
                        }}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.profile_img}/>}
                                title={<p>{item.name}</p>}
                                description={item.sex == 1 ? "Эм" : "Эр"}  
                            />
                        </List.Item>
                    )}
                >
                </List>
                <Modal
                    title="Дүр засварлах"
                    width={"90%"}
                    visible={hwListeningCharacterStates.isModalVisible}
                    footer={null}
                    onCancel={() => {
                        form.resetFields();
                        hwListeningCharacterStates.isModalVisible = false;
                        hwListeningCharacterStates.action = null;
                        setHwListeningCharacterStates({...hwListeningCharacterStates});
                    }}
                >
                    <Form
                        form={form}
                        labelCol={{span:8}}
                        wrapperCol={{span:16}}
                        initialValues={{remember: true}}
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col span={24}>
                                <Row>
                                <Col span={24} offset={11}>
                                        <Avatar size={150} src={hwListeningCharacterStates.profile_img_url} style={{marginBottom:"20px"}}/>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"name"}
                                        label="Name"
                                        rules={[
                                            {required: true, message: "Заавал бөглөнө үү!" }
                                        ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                        name={"profile_img"}
                                        label="Profile image"
                                        >
                                            <Input
                                            onChange={(a)=>{
                                                hwListeningCharacterStates.profile_img_url = a.target.value
                                                setHwListeningCharacterStates({...hwListeningCharacterStates})
                                            }}
                                            />
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
                                    span={6}>
                                        <Button
                                            onClick={uploadImage}
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
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 17, span: 7}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width: "100%"}}
                            >
                                Хадгалах
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </Card>
        </div>
    )
}