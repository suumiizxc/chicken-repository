import { CheckOutlined, DeleteOutlined, EditOutlined, ExpandAltOutlined, ExpandOutlined, PlayCircleFilled, PlusCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, List, message, Popconfirm, Row, Select, Spin, Table, TimePicker, Tooltip, Typography} from "antd";
import FormItem from "antd/lib/form/FormItem";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteHWListeningCue, GetAllHwListeningCharacters, GetCuesByListeningID, InsertHWListeningCue, UpdateHWListeningCue } from "../../services/Listening_service";

export default function Index(props){
    const { TextArea } = Input;
    const { Title } = Typography;
    const { Option } = Select;
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [hwListeningCueStates, setHwListeningCueStates] = useState({
        token: localStorage.getItem("token"),
        loader: false,
        isModalVisible: false,
        data: [],
        action: null,
        characterOptions: props.courseIds.characterOptions,
        rowDisabled:[],
        listeningCharacters: props.courseIds.listeningCharacters,
        inserting: false,
        cancelForm:{
            eng_text: null,
            mon_text: null,
            start_time: null,
            end_time: null,
            character: null,
        }
    });

    const getCuesByListeningID = (listening_id) => {
        hwListeningCueStates.loader = true;
        setHwListeningCueStates({...hwListeningCueStates});
        GetCuesByListeningID(hwListeningCueStates.token, listening_id).then((res) => {
            hwListeningCueStates.loader = false;
            setHwListeningCueStates({...hwListeningCueStates});
            if(res && res.data && res.data.status){
                hwListeningCueStates.data = res.data.data;
                for(let i=0; i<hwListeningCueStates.data.length; i++)
                    hwListeningCueStates.rowDisabled[i] = true;
                setHwListeningCueStates({...hwListeningCueStates});
            }else{
                message.error("Амжилтгүй");
            }
        })
        .catch((err) => {
            hwListeningCueStates.loader = false;
            setHwListeningCueStates({...hwListeningCueStates});
            message.error("Алдаа гарлаа");
        })
    }

    const updateHWListneningCue = (data) =>{
        hwListeningCueStates.loader = true;
        setHwListeningCueStates({...hwListeningCueStates});
        UpdateHWListeningCue(hwListeningCueStates.token, data).then((res)=>{
            hwListeningCueStates.loader=false;
            setHwListeningCueStates({...hwListeningCueStates});
            if(res && res.data && res.data.status){
                message.success("Амжилттай шинэчлэлээ");
                getCuesByListeningID(props.courseIds.hwListeningId);
            }else{
                message.error("Амжилтгүй")
            }
        }).catch((err)=>{
            message.error("Алдаа гарлаа")
        })
    }

    const insertHwListeningCue = (data) =>{
        hwListeningCueStates.loader = true;
        setHwListeningCueStates({...hwListeningCueStates});
        InsertHWListeningCue(hwListeningCueStates.token, data).then((res)=>{
            hwListeningCueStates.loader = false;
            setHwListeningCueStates({...hwListeningCueStates});
            if(res && res.data && res.data.status){
                message.success("Амжилттай");
                getCuesByListeningID(props.courseIds.hwListeningId);
            }else{
                message.error("Амжилтгүй")
            }
        }).catch((err)=>{
            message.error("Алдаа гарлаа")
        })
    }

    const deleteHWListeningCue = (id) =>{
        hwListeningCueStates.loader = true;
        setHwListeningCueStates({...hwListeningCueStates});
        DeleteHWListeningCue(hwListeningCueStates.token, id).then((res)=>{
            hwListeningCueStates.loader = false;
            setHwListeningCueStates({...hwListeningCueStates});
            if(res && res.data && res.data.status){
                message.success("Амжилттай устгалаа");
                getCuesByListeningID(props.courseIds.hwListeningId);
            }else{
                message.error("Амжилтгүй");
            }
        })
        .catch((err)=>{
            message.error("Алдаа гарлаа");
        })
    }

    // const getAllHwListeningCharacters = () =>{
    //     hwListeningCueStates.loader = true;
    //     setHwListeningCueStates({...hwListeningCueStates});
    //     GetAllHwListeningCharacters(hwListeningCueStates.token).then((res) => {
    //         if(res && res.data && res.data.status){
    //             hwListeningCueStates.characterData = res.data.data;
    //             hwListeningCueStates.loader = false;
    //             setHwListeningCueStates({...hwListeningCueStates});
    //         }else{
    //             message.error("Амжилтүй");
    //         }
    //     })
    //     .catch((err) => {
    //         hwListeningCueStates.loader = false;
    //         setHwListeningCueStates({...hwListeningCueStates});
    //         message.error("Алдаа гарлаа");
    //     });
    // }

    useEffect(() => {
        // getAllHwListeningCharacters();
        getCuesByListeningID(props.courseIds.hwListeningId);
    }, []);

    return(
        <Card
            title={"Listenign cue"} style={{ margin: 15, width: "100%"}}
        >
            <Spin
                spinning={hwListeningCueStates.loader}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    marginTop: "-5.5rem",
                }}
            >
                <div
                    style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems: "center"
                    }}
                >
                <Title level={4}>Characters:</Title>
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        margin: "10px",
                        width: '40%',
                    }}
                    onSelect={(_,e)=>{
                        console.log(e)
                        hwListeningCueStates.listeningCharacters.push(
                            {
                                id:e.key,
                                name:e.children
                            }
                        )
                        setHwListeningCueStates({...hwListeningCueStates})
                    }}
                    onDeselect={(a,e)=>{
                        hwListeningCueStates.listeningCharacters.forEach((obj,index)=>{
                            if(parseInt(obj.id) === parseInt(e.key)){
                                hwListeningCueStates.listeningCharacters.splice(index,1)
                                setHwListeningCueStates({...hwListeningCueStates})
                            }
                        })
                    }}
                    defaultValue={hwListeningCueStates.listeningCharacters.map((e)=>(
                        e.name
                    ))}
                >
                    {hwListeningCueStates.characterOptions}
                </Select>
                <Button
                style={{
                    background:"#3e79f7",
                    color:"white"
                }}
                onClick={()=>{
                    hwListeningCueStates.data.push(
                        {
                            id: null,
                            eng_text: null,
                            mon_text: null,
                            start_time: null,
                            end_time: null,
                            ordering: null,
                            listening_id: props.courseIds.hwListeningId,
                            is_active: null,
                            character_id: null,
                            name: null
                        }
                    )
                    hwListeningCueStates.inserting = true;
                    setHwListeningCueStates({...hwListeningCueStates})
                }}
                icon={<PlusCircleOutlined/>}
                >cue Нэмэх</Button>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={hwListeningCueStates.data}
                    renderItem={(item, index)=>(
                        <List.Item
                        >
                            <List.Item.Meta
                                style={{background: item.is_active == 0 ? "#f2f2f2":"#ffffff"}}
                                avatar={<Avatar src={item.profile_img}/>}
                                title={<p>{item.name}</p>}
                                description={
                                    (
                                        <div
                                            style={{width:"100%"}}
                                        >   
                                            <Form
                                            form={form}
                                            autoComplete="off"
                                        >
                                            <FormItem>
                                                <Row gutter={[16,24]}>
                                                    <Col span={5}>
                                                        <Form.Item
                                                            label={"English"}
                                                            name={[index, "english"]}
                                                            initialValue={item.eng_text}
                                                        >
                                                            <TextArea
                                                            style={{
                                                                color:"GrayText"
                                                            }}
                                                            disabled={hwListeningCueStates.rowDisabled[index]}
                                                            autoSize
                                                            >
                                                            </TextArea>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={5}>
                                                    <Form.Item
                                                        label={"Mongolian"}
                                                        name={[index, "mongol"]}
                                                        initialValue={item.mon_text}
                                                    >
                                                            <TextArea
                                                            style={{
                                                                color:"GrayText"
                                                            }}
                                                            disabled={hwListeningCueStates.rowDisabled[index]}
                                                            autoSize
                                                            >
                                                            </TextArea>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={3}>
                                                    <Form.Item
                                                        label={"Start"}
                                                        name={[index,"start_time"]}
                                                        initialValue={item.start_time}
                                                    >
                                                        {
                                                            <Input
                                                            disabled={hwListeningCueStates.rowDisabled[index]}
                                                            />
                                                        }
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={3}>
                                                    <Form.Item
                                                        label={"End"}
                                                        name={[index, "end_time"]}
                                                        initialValue={item.end_time}
                                                    >
                                                        {
                                                            <Input
                                                            disabled = {hwListeningCueStates.rowDisabled[index]}
                                                            />
                                                        }
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                    <Form.Item
                                                        label={"Character"}
                                                        name={[index, "character"]}
                                                        initialValue={item.character_id}
                                                    >
                                                        <Select
                                                        disabled={hwListeningCueStates.rowDisabled[index]}
                                                        mode="multiple"
                                                        allowClear
                                                        >
                                                            {hwListeningCueStates.listeningCharacters.map((element)=>(
                                                                    <Option key={element.id} value={element.id}>{element.name}</Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Popconfirm
                                                            title={"Устгахдаа итгэлтэй байна уу?"}
                                                            okText={"Тийм"}
                                                            cancelText={"Үгүй"}
                                                            onConfirm={()=>{
                                                                deleteHWListeningCue(item.id);
                                                            }}
                                                        >
                                                            <Button
                                                            icon={<DeleteOutlined style={{color:"#ff1100"}}/>}
                                                            block
                                                            ></Button>
                                                        </Popconfirm>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Tooltip
                                                        title={hwListeningCueStates.rowDisabled[index] ? "Засах":"Дуусгах"}
                                                        >
                                                        <Button
                                                        htmlType="submit"
                                                        icon={hwListeningCueStates.rowDisabled[index] ? <EditOutlined style={{color:"#3e79f7"}}/>:<CheckOutlined style={{color:"#00ff0d"}}/>}
                                                        onClick={
                                                            hwListeningCueStates.rowDisabled[index] ? 
                                                                ()=>{
                                                                    // hwListeningCueStates.cancelForm.eng_text = form.getFieldValue([index, "english"]);
                                                                    // hwListeningCueStates.cancelForm.mon_text = form.getFieldValue([index, "mongol"]);
                                                                    // hwListeningCueStates.cancelForm.start_time = form.getFieldValue([index, "start_time"]);
                                                                    // hwListeningCueStates.cancelForm.end_time = form.getFieldValue([index, "end_time"]);
                                                                    // hwListeningCueStates.cancelForm.character = parseInt((typeof form.getFieldValue([index, "character"]))=="object" ? form.getFieldValue([index, "character"])[0]:form.getFieldValue([index, "character"]));
                                                                    hwListeningCueStates.rowDisabled[index] = !hwListeningCueStates.rowDisabled[index] 
                                                                    setHwListeningCueStates({...hwListeningCueStates})
                                                                }    
                                                                :
                                                                ()=>{
                                                                    if(!hwListeningCueStates.inserting)
                                                                        updateHWListneningCue(
                                                                            {
                                                                                id: item.id,
                                                                                eng_text: form.getFieldValue([index, "english"]),
                                                                                mon_text: form.getFieldValue([index, "mongol"]),
                                                                                start_time: form.getFieldValue([index, "start_time"]),
                                                                                end_time: form.getFieldValue([index, "end_time"]),
                                                                                ordering: 3,
                                                                                listening_id: props.courseIds.hwListeningId,
                                                                                is_active: item.is_active,
                                                                                character_id: parseInt((typeof form.getFieldValue([index, "character"]))=="object" ? form.getFieldValue([index, "character"])[0]:form.getFieldValue([index, "character"]))
                                                                            }
                                                                        )
                                                                    else{
                                                                        insertHwListeningCue(
                                                                            {
                                                                                eng_text: form.getFieldValue([index, "english"]),
                                                                                mon_text: form.getFieldValue([index, "mongol"]),
                                                                                start_time: form.getFieldValue([index, "start_time"]),
                                                                                end_time: form.getFieldValue([index, "end_time"]),
                                                                                ordering: 3,
                                                                                listening_id: props.courseIds.hwListeningId,
                                                                                is_active: item.is_active,
                                                                                character_id: parseInt((typeof form.getFieldValue([index, "character"]))=="object" ? form.getFieldValue([index, "character"])[0]:form.getFieldValue([index, "character"]))
                                                                            }
                                                                        )
                                                                        hwListeningCueStates.inserting = false;
                                                                    }
                                                                    hwListeningCueStates.rowDisabled[index] = !hwListeningCueStates.rowDisabled[index] 
                                                                    setHwListeningCueStates({...hwListeningCueStates})
                                                                }
                                                        }
                                                        ></Button>
                                                        </Tooltip>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Tooltip
                                                        title={
                                                            hwListeningCueStates.inserting || !hwListeningCueStates.rowDisabled[index] ? "Цуцлах":(item.is_active == 1 ? "Идэвхгүй болгох":"Идэвхгтэй болгох")
                                                        }
                                                        >
                                                        <Button
                                                        onClick={
                                                            hwListeningCueStates.rowDisabled[index] ?
                                                            ()=>{updateHWListneningCue(
                                                                {
                                                                    id: item.id,
                                                                    eng_text: form.getFieldValue([index, "english"]),
                                                                    mon_text: form.getFieldValue([index, "mongol"]),
                                                                    start_time: form.getFieldValue([index, "start_time"]),
                                                                    end_time: form.getFieldValue([index, "end_time"]),
                                                                    ordering: 3,
                                                                    listening_id: props.courseIds.hwListeningId,
                                                                    is_active: item.is_active  == 1 ? 0:1,
                                                                    character_id: parseInt((typeof form.getFieldValue([index, "character"]))=="object" ? form.getFieldValue([index, "character"])[0]:form.getFieldValue([index, "character"]))
                                                                }
                                                            )}:()=>{
                                                                if(hwListeningCueStates.inserting){
                                                                    hwListeningCueStates.inserting = false;
                                                                    hwListeningCueStates.data.pop();
                                                                    
                                                                }else{
                                                                    hwListeningCueStates.rowDisabled[index] = true;
                                                                }
                                                                setHwListeningCueStates({...hwListeningCueStates});
                                                            }
                                                        }
                                                        icon={hwListeningCueStates.rowDisabled[index] ? <PlayCircleFilled style={{color:"#3e79f7"}}/> : <StopOutlined style={{color:"#ff1100"}}/>}
                                                        block
                                                        ></Button>
                                                        </Tooltip>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Tooltip
                                                            title={"Cue words"}
                                                        >
                                                            <Button
                                                            icon={<ExpandAltOutlined style={{color:"#3e79f7"}}/>}
                                                            block
                                                            onClick={()=>{
                                                                props.courseIds.hwListeningCueId = item.id;
                                                                props.setCourseIds({...props.courseIds});
                                                                navigate("/hw_listening_cue_word")
                                                            }}
                                                            ></Button>
                                                        </Tooltip>
                                                    </Col>
                                                </Row>
                                            </FormItem>
                                        </Form>
                                        </div>
                                    )
                                }
                            />
                        </List.Item>
                    )}
                >
                </List>
            </Spin>
        </Card>
    )
}