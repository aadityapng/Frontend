import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  message,
} from "antd";
import axios from "axios";

const MenuCategories = () => {
  const [form] = Form.useForm();
  const [ListData, setListData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(0);
  const [actionForm, setActionForm] = useState("");
  const [DetailId, setDetailId] = useState(0);
  const [totalListData, setTotalListData] = useState(0);

  const showModal = (action = "create") => {
    if (action === "create") {
      form.resetFields();
    }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setActionForm("update");
              setDetailId(record.id);
              axios
                .get(`${process.env.REACT_APP_API_URL}/master-menu-categories/${record.id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => {
                  showModal();
                  form.setFieldsValue(response.data.data);
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    window.location.href = "/login";
                  }
                });
            }}
          >
            Ubah
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                content: "Are you sure want to delete this data?",
                onOk: () => {
                  axios
                    .delete(
                      `${process.env.REACT_APP_API_URL}/master-menu-categories/${record.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((response) => {
                      setFlag((prev) => prev + 1);
                      message.success({
                        content: response.data.message,
                      });
                    })
                    .catch((error) => {
                      if (error.response.status === 401) {
                        window.location.href = "/login";
                      } else {
                        message.error({
                          content: error.message,
                        });
                      }
                    });
                },
              });
            }}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetchRecords(1, 10);
  }, [flag]);

  const fetchRecords = (page, pageSize) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/master-menu-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListData(response.data.data);
        setTotalListData(response.data.totalData);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
      });
  };

  const onFinish = (values) => {
    values.role_id = 1;
    if (actionForm === "create") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/master-menu-categories`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFlag((prev) => prev + 1);
          message.success({
            content: response.data.message,
          });
          handleOk();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location.href = "/login";
          } else {
            message.error({
              content: error.message,
            });
          }
        });
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/master-menu-categories/${DetailId}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFlag((prev) => prev + 1);
          message.success({
            content: response.data.message,
          });
          handleOk();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location.href = "/login";
          } else {
            message.error({
              content: error.message,
            });
          }
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div id="add-user">
      <div className="titile-section mt-2 mx-8 flex justify-between items-center">
        <p className="text-2xl ml-4">Data Kategori Menu</p>
        <Button
          type="primary"
          onClick={() => {
            showModal("create");
            setActionForm("create");
          }}
        >
          Tambah
        </Button>
      </div>
      <div className="mx-16 mt-16">
        <Table
          columns={columns}
          dataSource={ListData}
          pagination={{
            total: totalListData,
            onChange: (page, pageSize) => {
              fetchRecords(page, pageSize);
            },
          }}
        />
      </div>
      <Modal
        title="Form Kategori Menu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button form="formMenuCategory" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="formMenuCategory"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Nama"
            name="name"
            rules={[
              {
                required: true,
                message: "Data ini harus diisi!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuCategories;
