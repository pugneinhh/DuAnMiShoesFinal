import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Image } from "cloudinary-react";
import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddClient, GetClient } from "./reducer/Client.reducer";
import {
  GetBill,
  UpdateBill,
  UpdateKHToBill,
  UpdateNullClient,
} from "./reducer/Bill.reducer";
import { GetInvoice } from "./reducer/DetailInvoice.reducer";

const ModalKhachHang = (props) => {
  const { openKhachHang, setOpenKhachHang } = props;
  // const idHD = props.idHD;
  const activeKey = props.activeKey;
  const [khachHang, setKhachHangs] = useState([]);

  useEffect(() => {
    loadKhachHang();
  }, []);
  const dispatch = useDispatch();
  const client = useSelector(GetClient);
  const bill = useSelector(GetBill);
  const idKH = bill.filter((item)=> item.id === activeKey)[0].idNguoiDung;

  const handleClickAddClient = (record) => {
    dispatch(
      UpdateKHToBill({
        key: activeKey,
        nguoiDung: record.id,
        tenNguoiDung: record.ten,
        gtNguoiDung: record.gioiTinh,
        diemNguoiDung: record.diem,
      })
    );
    setOpenKhachHang(false);
  };

  const handleClickRemoveClient = (record) => {
    dispatch(UpdateNullClient({ key: activeKey }));
    setOpenKhachHang(false);
  };

  const loadKhachHang = async () => {
    const result = await axios.get(
      "http://localhost:8080/nguoi-dung/khach-hang"
    );
    result.data.map((i) =>
      dispatch(
        AddClient({
          id: i.idND,
          ma: i.maND,
          ten: i.tenND,
          cccd: i.cccd,
          email: i.email,
          gioiTinh: i.gioiTinh,
          ngaySinh: new Date(i.ngaySinh * 1).toDateString("DD-MM-YYYY"),
          anh: i.anh,
          soDienThoai: i.sdt,
          diem: i.diem,
          trangThai: i.trangThai,
        })
      )
    );
    setKhachHangs(result.data);
  };
  const handleClose = () => {
    setOpenKhachHang(false);
    console.log("đóng");
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Ảnh",
      dataIndex: "anh",
      key: "link",
      center: "true",
      render: (link) => {
        return (
          <>
            <Image
              cloudName="dtetgawxc"
              publicId={link}
              width="100"
              crop="scale"
              href={link}
            />
          </>
        );
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: "ten",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
    },
    {
      title: "Điểm",
      dataIndex: "diem",
    },

    {
      title: "Hành động",
      render: (record) => (
        <Space size="middle">
          <>
          {
            (idKH !== null && idKH === record.id
            ) ? (
              <button
                type="primary"
                shape="round"
                className="btn btn-d text-white"
                icon={<EyeOutlined />}
                onClick={() => handleClickRemoveClient(record)}
              >
                Bỏ khách hàng
              </button>
            ) : (
              <button
                type="primary"
                shape="round"
                className="btn btn-success text-white"
                icon={<EyeOutlined />}
                onClick={() => handleClickAddClient(record)}
              >
                Chọn khách hàng
              </button>
            )
    }
          </>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Khách hàng"
      centered
      open={openKhachHang}
      onOk={handleClose}
      onCancel={handleClose}
      // footer={
      //     <button onClick={handleClose}>Hủy</button>
      // }
      width={1300}
    >
      <div className="container">
        <div className="row mt-4">
          <Input className="col-md-9 ms-5"></Input>
          <Button
            className=" col-md-1 ms-5  bg-success float-end bg-primary"
            type="primary"
          >
            Tìm kiếm
          </Button>
        </div>
        <Table
          style={{ justifyContent: "center" }}
          className="text-center mt-4"
          dataSource={client}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            defaultPageSize: 5,
            position: ["bottomCenter"],
            defaultCurrent: 1,
            total: client.length,
          }}
        />
      </div>
    </Modal>
  );
};
export default ModalKhachHang;
