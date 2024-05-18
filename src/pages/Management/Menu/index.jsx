import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  message,
  InputNumber,
  Select
} from "antd";
import axios from "axios";

const Menu = () => {
  const [form] = Form.useForm();
  const [ListData, setListData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(0);
  const [actionForm, setActionForm] = useState("");
  const [DetailId, setDetailId] = useState(0);
  const [totalListData, setTotalListData] = useState(0);
  const [file, setFile] = useState();
  const [listMenuCategory, setListMenuCategory] = useState([]);

  const showModal = (action = "create") => {
    getCategoryMenu();
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
                .get(`${process.env.REACT_APP_API_URL}/master-menu/${record.id}`, {
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
                      `${process.env.REACT_APP_API_URL}/master-menu/${record.id}`,
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

  const fetchRecords = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/master-menu/menu`,
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

  const getCategoryMenu = () => {
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
        const list = response.data.data;
        let optionMenuCategory = [];
        for (let i = 0; i < list.length; i++) {
            const data = list[i];
            optionMenuCategory.push({
                label: data.name, value: data.id
            });
        }
        setListMenuCategory(optionMenuCategory);
        setTotalListData(response.data.totalData);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
      });
  }

  const onFinish = (values) => {
    values.role_id = 1;
    console.log('file >>>', file);
    const formData = new FormData();
    formData.append('category_id', values.category_id);
    formData.append('name', values.name);
    formData.append('price', values.price);
    if (file) {
        formData.append('menu_photo', file);
    }
    if (actionForm === "create") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/master-menu`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFlag((prev) => prev + 1);
          setFile();
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
        .put(`${process.env.REACT_APP_API_URL}/master-menu/${DetailId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFlag((prev) => prev + 1);
          setFile();
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

  function handleFileChange(event) {
    setFile(event.target.files[0])
  }

  const filterOptionMenuCategory = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div id="add-user">
      <div className="titile-section mt-2 mx-8 flex justify-between items-center">
        <p className="text-2xl ml-4">Data Menu</p>
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
        title="Form Menu"
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
            label="Kategori Menu"
            name="category_id"
            rules={[
              {
                required: true,
                message: "Data ini harus diisi!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Pilih satu jabatan"
              optionFilterProp="children"
              filterOption={filterOptionMenuCategory}
              options={listMenuCategory}
            />
          </Form.Item>

          <Form.Item
            label="Nama Menu"
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

          <Form.Item
            label="Harga"
            name="price"
            rules={[
              {
                required: true,
                message: "Data ini harus diisi!",
              },
            ]}
          >
            <InputNumber style={{width: "100%"}} />
          </Form.Item>

          <Form.Item
            label="Foto Menu"
            name="menu_photo"
            rules={[
              {
                required: (actionForm === 'create') ? true : false,
                message: "Data ini harus diisi!",
              },
            ]}
          >
            <input type="file" onChange={handleFileChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Menu;
