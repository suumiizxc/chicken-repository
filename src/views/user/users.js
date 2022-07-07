import { DeleteOutlined, UserAddOutlined, LoadingOutlined, EditOutlined, RedoOutlined, UserDeleteOutlined} from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Button, Card, message, Row, Table, Popconfirm, Space, Spin, Tooltip, Form, Input, Modal } from "antd";
import { RegisterNewUser } from "../../services/main_service";
import { getAllUsers, UpdateUser, DeleteUser } from "../../services/User_service";
import React, { useEffect , useState} from "react";

export default function Users(props){
    const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;

    const rule = {
        required: true,
        message: "Энэ талбарыг заавал бөглөнө үү !!"
    }
    
    const [userStates, setUserStates] = useState({
        role_id: localStorage.getItem("role_id"),
        token: localStorage.getItem("token"),
        card_title: "Системийн хэрэглэгчид",
        loader: false,
        isModalVisible: false,
        isEditable: false,
        data: null,
        action: null,
        insertData: null,
        isActive: true,
    });

    var updatedUser = {
        first_name: null,
        last_name: null,
        password: null,
        email: null,
        role_id: null,
        organization_id: null,
        is_active: null
    };

    const [editingRow, setEditingRow] = useState(null);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const render = (text, record, name) =>{
        if(editingRow === record.id){
            return(
                <><Form.Item
                    name={name}
                    rules={[
                        {
                            required: name != "password",
                            message: "Энэ талбарыг заавал бөглөнө үү",                
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                </>
            );
        }else{
            return <a style={{color:"black"}}>{text}</a>
        }
    }

    const Columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text, record) => <a style={{color:"black"}}>{text}</a>
        },
        {
            title: "Fisrt name",
            dataIndex: "first_name",
            key: "first_name",
            render: (text, record) => render(text, record, "first_name")
        },
        {
            title: "Last name",
            dataIndex: "last_name",
            key: "last_name",
            render: (text, record) => render(text, record, "last_name")
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text, record) => render(text, record, "email")
        },
        {
            title: "Role ID",
            dataIndex: "role_id",
            key: "role_id",
            render: (text, record) => render(text, record, "role_id")
        },
        {
            title: "Organization ID",
            dataIndex: "organization_id",
            key: "organization_id",
            render: (text, record) => render(text, record, "organization_id")
        },
        {
            title: "Created user ID",
            dataIndex: "created_user_id",
            key: "created_user_id",
            render: (text, record) =><a style={{color:"black"}}>{text}</a>
        },
        userStates.isEditable ? {
            title: "Password",
            dataIndex: "password",
            key: "password",
            render: (text, record) => render(text, record, "password")
        }:{},
        // {
        //     title: "Created date",
        //     dataIndex: "created_date",
        //     key: "created_date",
        //     render: (text, record) => render(text, record, "created_date")
        // },
        userStates.role_id == 9 ? {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record) => (
                <Space size = "middle">
                    <Popconfirm
                    placement="topLeft"
                    htmlType = "submit"
                    title={userStates.isActive ? "Хэрэглэгчийг устгахдаа итгэлтэй байна уу ?":"Хэрэглэгчийг дахин боловсруулахдаа итгэлтэй байна уу ?"}
                    onConfirm={() => {
                        updatedUser.first_name = record.first_name
                        updatedUser.last_name = record.last_name
                        updatedUser.password = ""
                        updatedUser.email = record.email
                        updatedUser.is_active = userStates.isActive == 0 ? 1:0
                        updatedUser.organization_id = record.organization_id
                        updatedUser.role_id = record.role_id
                        updateUser(updatedUser, record.id)
                    }}
                    okText = "Тийм"
                    cancelText = "Үгүй"
                    >
                        <Tooltip title={userStates.isActive ? "Хаях":"Дахин боловсруулах"}>
                        <Button icon={ userStates.isActive ?<DeleteOutlined style={{ color : "#FF6B72"}}/>:<RedoOutlined style={{ color : "#FF6B72"}}/>}
                        />
                        </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                        disabled={userStates.isActive}
                        title={"Хэрэглэгчийн мэдээлэл өгөгдлийн сангаас уствал дахин сэргээгдэхгүй !!!"}
                        placement="topRight"
                        onConfirm = {!userStates.isActive ? () => {
                            DeleteUserByID(record.id)
                        }:()=>{}}
                        okText = "Тийм"
                        cancelText = "Үгүй"
                    >
                    <Tooltip
                    title={userStates.isActive? "Хэрэглэгчийн мэдээллийг шинэчлэх":"Өгөгдлийн сангаас устгах"}
                    >
                        <Button htmlType={"submit"} icon={userStates.isActive ? <EditOutlined style={{ color: "#3e79f7" }}/>: <UserDeleteOutlined style={{ color: "#3e79f7" }}/>}
                            onClick={userStates.isActive ? () => {
                                //console.log(form.data);
                                if (userStates.isEditable){  
                                    updatedUser.first_name = form.getFieldValue().first_name
                                    updatedUser.last_name = form.getFieldValue().last_name
                                    updatedUser.password = form.getFieldValue().password
                                    updatedUser.email = form.getFieldValue().email
                                    updatedUser.is_active = userStates.isActive ? 1:0
                                    updatedUser.organization_id = parseInt(form.getFieldValue().organization_id)
                                    updatedUser.role_id = parseInt(form.getFieldValue().role_id)
                                    updateUser(updatedUser, form.getFieldValue().id)
                                    setEditingRow(null)
                                    userStates.isEditable = false;
                                    setUserStates(userStates)
                                }
                                else {
                                    userStates.isEditable = true;
                                    setUserStates(userStates)
                                    setEditingRow(record.id);
                                    form.setFieldsValue({
                                        id: record.id,
                                        first_name: record.first_name,
                                        last_name: record.last_name,
                                        email: record.email,
                                        role_id: record.role_id,
                                        organization_id: record.organization_id,
                                        created_user_id: record.created_user_id,
                                        password : ""
                                        //created_date: record.created_date,
                                    });
                                }}:()=>{}
                            }
                        />
                    </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }: {},
    ];
    
    {/*------------------------------------------------Get all users information----------------------------------------------*/}
    const getAllUser = () => {
        userStates.loader = true;
        setUserStates({ userStates });
        getAllUsers(userStates.token, userStates.isActive)
            .then((res) => {
            userStates.loader = false;
            setUserStates({ userStates });
            if (res && res.data && res.data.status && res.data.status === true) {
              //success
                userStates.data = res.data.data;
                setUserStates({ ...userStates });
                console.log("success all users", res.data.data);
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
    {/*------------------------------------------------Edit user information----------------------------------------------*/}
    
    const updateUser = (value, id) =>{
        userStates.loader = true;
        setUserStates({userStates});
        console.log(id)
        UpdateUser(value, userStates.token, id)
            .then((res) => {
                userStates.loader = false;
                setUserStates({userStates});
                if(res.data.status){
                    message.success("Амжилттай");
                    getAllUser();
                }else{
                    userStates.loader = false;
                    setUserStates({userStates});
                    message.error("Амжилтгүй")
                }
            })
            .catch((err) => {
                userStates.loader = false;
                setUserStates({userStates});
                message.error("Амжилтгүй")
                getAllUser()
            })
    }

    {/*-----------------------------------------------------Insert new users------------------------------------------------*/}

    const InsertUser = (value)=>{
        updatedUser.email = value.email;
        updatedUser.first_name = value.first_name;
        updatedUser.is_active = userStates.isActive ? 1 : 0;
        updatedUser.last_name = value.last_name;
        updatedUser.organization_id = parseInt(value.organization_id);
        updatedUser.password = value.password;
        updatedUser.role_id = parseInt(value.role_id)
        userStates.loader = true;
        setUserStates({userStates});
        RegisterNewUser(updatedUser, localStorage.getItem("token"))
            .then((res) => {
                userStates.loader = false;
                setUserStates({userStates});
                if(res.data.status){
                    message.success("Амжилттай");
                    userStates.isModalVisible = false;
                    setUserStates({userStates});
                    getAllUser();
                }else{
                    userStates.loader = false;
                    setUserStates({userStates});
                    message.error("Амжилтгүй")
                }
            })
            .catch((err) => {
                userStates.loader = false;
                setUserStates({userStates});
                message.error("Амжилтгүй")
                getAllUser()
            })
    }

    {/*-----------------------------------------------------Delete user from database----------------------------------------*/}

    const DeleteUserByID = (userID) => {
        userStates.loader = true;
        setUserStates({userStates})
        DeleteUser(userID, localStorage.getItem("token"))
        .then((res) => {
            if(res.data.status){
                message.success("Амжилттай");
                userStates.loader = false;
                setUserStates({userStates});
                getAllUser();
            }else{
                userStates.loader = false;
                setUserStates({userStates});
                message.error("Амжилтгүй")
            }
        }).catch((err) => {
            userStates.loader = false;
            setUserStates({userStates});
            message.error("Амжилтгүй")
            getAllUser()
        })
    }

    const onFinish = (value)=>{
        console.log(value)
    }

    useEffect(() => {
        console.log("writing useffect");
        getAllUser();
    }, []);

    return (
        
        <Card title={"Системийн хэрэглэгчид"} style={{ margin: 15, width: "100%" }}>
            <Spin
            tip=""
            spinning={userStates.loader}
            indicator={antIcon}
            style={{
            position: "absolute",
            top: "50%",
            left: "0%",
            marginTop: "-5.5rem",
            }}
        >
                <div style={{visibility: userStates.role_id == 9 ? "":"hidden"}}>
                <Row justify="end">
                <Button type="primary" icon={<UserAddOutlined></UserAddOutlined>}
                    onClick={() => {
                        userStates.isModalVisible = true;
                        setUserStates({ ...userStates });
                    }}
                >Хэрэглэгч нэмэх</Button>
                {/* <Button type="primary" icon={<UserDeleteOutlined/>} style={{backgroundColor:"red", border:"none"}}></Button> */}
                <Button type="primary" icon={<DeleteOutlined/>} style={{marginLeft:"10px"}}
                onClick={
                    () => {
                        userStates.isActive = !userStates.isActive
                        setUserStates({ ...userStates })
                        getAllUser()
                    }
                }
                >{userStates.isActive ? "Хогийн сав":"Идэвхтэй хэрэглэгчид"}</Button>
                </Row>
                </div>
                <Form form={form}>
                    <Table columns={Columns} dataSource={userStates.data}/>
                </Form>
                <Modal
                    title="Хэрэглэгч нэмэх"
                    width={"50%"}
                    visible={userStates.isModalVisible}
                    footer={null}
                    style={{top:20}}
                    onCancel={() => {
                        form.resetFields();
                        userStates.isModalVisible = false;
                        setUserStates({ ...userStates });
                    }}
                >
                    <Form
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: false,
                        }}
                        autoComplete="false"
                        onFinish={InsertUser}
                        form={form2}
                    >
                        <Form.Item
                            label="First name"
                            name="first_name"
                            rules={[rule]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Last name"
                            name="last_name"
                            rules={[rule]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[rule]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[rule]}
                        >
                            <Input.Password></Input.Password>
                        </Form.Item>
                        {/* <Form.Item
                            label="Confirm password"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password></Input.Password>
                        </Form.Item> */}
                        <Form.Item
                            label="Role ID"
                            name="role_id"
                            rules={[rule]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Organization ID"
                            name="organization_id"
                            rules={[rule]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 16,
                            }}
                        >
                            <Button type="primary" block
                                htmlType="submit"
                                onClick={()=>{
                        
                                }}
                            >Done</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </Card>
    );
}