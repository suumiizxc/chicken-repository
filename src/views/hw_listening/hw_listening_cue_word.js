import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Button, Card, Form, Input, message, Modal, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { GetHwListeningCueWords, UpdateHwListeningCueWord } from "../../services/Listening_service";

export default function Index(props){

    const [hwListeningCueWordStates, setHwListeningCueWordStates] = useState({
        token: localStorage.getItem("token"),
        loader: false,
        isModalVisible: false,
        data: [],
        action: null,
        rowDisabled:[]
    })

    const [form] = Form.useForm()

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Cue id",
            dataIndex: "cue_id",
            key: "cue_id"
        },
        {
            title: "Main text",
            dataIndex: "main_text",
            key: "main_text"
        },
        {
            title: "Word value",
            dataIndex: "word_value",
            key: "word_value",
            render: (text, record, index)=>{
                return(
                    <Form
                        form={form}
                    >
                        <Form.Item
                            name={[index,"word_value"]}
                            initialValue={record.word_value}
                        >
                        <Input
                        style={{width:"150px"}}
                        disabled={hwListeningCueWordStates.rowDisabled[index]}
                        >
                        </Input>
                        </Form.Item>
                    </Form>
                )
            }   
        },
        {
            title: "Space next",
            dataIndex: "space_next",
            key: "space_next",
            render: (text, record, index)=>{
                return(
                    <Form
                        form={form}
                    >
                        <Form.Item
                            name={[index, "space_next"]}
                            initialValue={record.space_next}
                        >
                            <Input
                                style={{width:"70px"}}
                                disabled={hwListeningCueWordStates.rowDisabled[index]}
                            />
                        </Form.Item>
                    </Form>
                )
            }
        },
        {
            title: "Ordering",
            dataIndex: "ordering",
            key: "ordering"
        },
        {
            title: "Actions",
            render: (text, records, index)=>{
                return(
                    <Button
                        icon={hwListeningCueWordStates.rowDisabled[index] ? <EditOutlined style={{ color: "#3e79f7" }} /> : <CheckCircleOutlined style={{ color: "#3e79f7" }} />}
                        onClick={
                            hwListeningCueWordStates.rowDisabled[index] ?
                            ()=>{
                                hwListeningCueWordStates.rowDisabled[index] = !hwListeningCueWordStates.rowDisabled[index];
                                setHwListeningCueWordStates({...hwListeningCueWordStates})
                            }:
                            ()=>{
                                updateHwListeningCueWord({
                                    id:records.id,
	                                main_text: records.main_text,
	                                ordering: records.ordering,
	                                space_next: parseInt(form.getFieldValue([index, "space_next"])),
	                                word_value: form.getFieldValue([index, "word_value"]),
	                                cue_id: records.cue_id
                                })
                                hwListeningCueWordStates.rowDisabled[index] = !hwListeningCueWordStates.rowDisabled[index];
                                setHwListeningCueWordStates({...hwListeningCueWordStates})
                        }}
                    >
                    </Button>
                )
            }
        }
    ]

    const updateHwListeningCueWord = (data) =>{
        hwListeningCueWordStates.loader = true;
        setHwListeningCueWordStates({...hwListeningCueWordStates});
        UpdateHwListeningCueWord(hwListeningCueWordStates.token, data).then((res)=>{
            hwListeningCueWordStates.loader = false;
            setHwListeningCueWordStates({...hwListeningCueWordStates});
            if(res && res.data && res.data.status){
                message.success("Амжилттай шинэчлэлээ");
                getHwListeningCueWords(props.courseIds.hwListeningCueId)
            }else{
                message.error("Амжилтгүй")
            }
        }).catch((err)=>{
            message.error("Алдаа гарлаа")
        })
    }

    const getHwListeningCueWords = (cue_id) =>{
        hwListeningCueWordStates.loader = true;
        setHwListeningCueWordStates({...hwListeningCueWordStates});
        GetHwListeningCueWords(hwListeningCueWordStates.token, cue_id).then((res)=>{
            hwListeningCueWordStates.loader = false;
            setHwListeningCueWordStates({...hwListeningCueWordStates});
            if(res && res.data && res.data.status){
                hwListeningCueWordStates.data = res.data.data;
                for(let i=0; i<res.data.data.length; i++){
                    hwListeningCueWordStates.rowDisabled.push(true);
                }
                setHwListeningCueWordStates({...hwListeningCueWordStates});
            }else{
                message.error("Амжилтгүй");
            }
        })
        .catch((err)=>{
            message.error("Алдаа гарлаа");
        })
    }

    useEffect(()=>{
        getHwListeningCueWords(props.courseIds.hwListeningCueId);
    },[])

    return(
        <Card
            title={"Hw listening cue word"} style = {{ margin:15, width: "100%"}}
        >
            <Spin
                spinning={hwListeningCueWordStates.loader}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    marginTop: "-5.5rem",
                }}
            >
                <Table
                    pagination={false} 
                    columns={columns}
                    dataSource={hwListeningCueWordStates.data}
                />
                <Modal
                    title={"Word edit"}
                    width={"90%"}
                    visible={hwListeningCueWordStates.isModalVisible}
                    footer={null}
                    onCancel={()=>{
                        hwListeningCueWordStates.isModalVisible = false;
                        setHwListeningCueWordStates({...hwListeningCueWordStates})
                    }}
                >
                </Modal>
            </Spin>
        </Card>
    )
}