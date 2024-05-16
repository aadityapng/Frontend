import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Select,
  message,
  Tag
} from "antd";
import axios from "axios";

const Order = () => {
  const [form] = Form.useForm();
  const [ListData, setListData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(0);
  const [DetailId, setDetailId] = useState(0);
  const [detailOrderListData, setDetailOrderListData] = useState([]);

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
      title: "No Order",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Status Pembayaran",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
        title: "Metode Pembayaran",
        dataIndex: "payment_method",
        key: "payment_method",
    },
    {
        title: "Status Order",
        dataIndex: "order_status",
        key: "order_status",
        render: (_, record) => {
            if (record.order_status === 'Sedang Disiapkan') {
                return <Tag color="blue">{record.order_status}</Tag>
            } else if (record.order_status === 'Selesai') {
                return <Tag color="green">{record.order_status}</Tag>
            } else {
                return <Tag color="red">{record.order_status}</Tag>
            }
        }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setDetailId(record.id);
              axios
                .get(`${process.env.REACT_APP_API_URL}/order/detail/${record.id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => {
                  showModal();
                  setDetailOrderListData(response.data.data)
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    window.location.href = "/login";
                  }
                });
            }}
          >
            Update Status
          </Button>
        </Space>
      ),
    },
  ];

  const columsDetailOrder = [
    {
        title: "Pesanan",
        dataIndex: "Menu.name",
        key: "Menu.name",
        render: (_, record) => {
            return record.Menu.name;
          },
    },
    {
        title: "Jumlah",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Catatan",
        dataIndex: "notes",
        key: "notes",
    },
  ]

  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetchRecords(1, 10);
  }, [flag]);

  const fetchRecords = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setListData(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location.href = "/login";
        }
      });
  };

  const onFinish = (values) => {
    axios
        .put(`${process.env.REACT_APP_API_URL}/order/update-status/${DetailId}`, values, {
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const filterOptionStatus = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div id="add-user">
      <div className="titile-section mt-2 mx-8 flex justify-between items-center">
        <p className="text-2xl ml-4">Data Order</p>
      </div>
      <div className="mx-16 mt-16">
        <Table
          columns={columns}
          dataSource={ListData}
        />
      </div>
      <Modal
        title="Form Status Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button form="formOrderStatus" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Table
          columns={columsDetailOrder}
          dataSource={detailOrderListData}
        />
        <Form
          form={form}
          name="formOrderStatus"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Ubah Status Order"
            name="order_status"
            rules={[
              {
                required: true,
                message: "Data ini harus diisi!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Pilih satu status"
              optionFilterProp="children"
              filterOption={filterOptionStatus}
              options={[
                {
                    value: 'Sedang Disiapkan',
                    label: 'Sedang Disiapkan',
                },
                {
                    value: 'Selesai',
                    label: 'Selesai',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
