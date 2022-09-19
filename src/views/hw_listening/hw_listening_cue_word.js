import { Card, message, Modal, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { GetHwListeningCueWords } from "../../services/Listening_service";

export default function Index(props){

    const [hwListeningCueWordStates, setHwListeningCueWordStates] = useState({
        token: localStorage.getItem("token"),
        loader: false,
        isModalVisible: false,
        data: [],
        action: null,
    })

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
            key: "word_value"
        },
        {
            title: "Space next",
            dataIndex: "space_next",
            key: "space_next"
        },
        {
            title: "Ordering",
            dataIndex: "ordering",
            key: "ordering"
        },
        {
            title: "Actions"
        }
    ]

    const getHwListeningCueWords = (cue_id) =>{
        hwListeningCueWordStates.loader = true;
        setHwListeningCueWordStates({...hwListeningCueWordStates});
        GetHwListeningCueWords(hwListeningCueWordStates.token, cue_id).then((res)=>{
            hwListeningCueWordStates.loader = false;
            setHwListeningCueWordStates({...hwListeningCueWordStates});
            if(res && res.data && res.data.status){
                hwListeningCueWordStates.data = res.data.data;
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
                    columns={columns}
                    dataSource={hwListeningCueWordStates.data}
                />
                <Modal
                    title={"Word edit"}
                    width={"90%"}
                    visible={hwListeningCueWordStates.isModalVisible}
                    footer={null}
                >
                </Modal>
            </Spin>
        </Card>
    )
}