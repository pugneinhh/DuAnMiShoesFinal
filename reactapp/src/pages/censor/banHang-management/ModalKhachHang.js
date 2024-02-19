import {
  Button,
  Modal,
  Space,
  Table,
  Input
} from "antd";
import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AddClient, GetClient } from "../../../store/reducer/Client.reducer";
import {
  GetBill,
  UpdateKHToBill,
  UpdateNullClient,
} from "../../../store/reducer/Bill.reducer";
import {SellAPI} from "../../censor/api/sell/sell.api";
import ModalAddKhachHang from "./ModalAddKhachHang";
import { KhachHangAPI } from "../api/user/khachHang.api";

const ModalKhachHang = ({setOpenKhachHang,openKhachHang,activeKey,onVoucher}) => {
  // const { openKhachHang, setOpenKhachHang } = props;
  // const activeKey = props.activeKey;
  const [openModalAddKhachHang, setopenModalAddKhachHang] = useState(false);
  const handleCloseAddKhachHang = () => {
    setopenModalAddKhachHang(false);
  };
  useEffect(() => {
    loadKhachHang();
  }, []);

  const dispatch = useDispatch();
  const client = useSelector(GetClient);
  const bill = useSelector(GetBill);
  const idKH = activeKey
    ? bill.filter((item) => item.id === activeKey)[0]?.nguoiDung
    : "";

  const handleClickAddClient = async (record) => {
    dispatch(
      UpdateKHToBill({
        key: activeKey,
        nguoiDung: record.id,
        tenNguoiDung: record.ten,
        gtNguoiDung: record.gioiTinh,
        diemNguoiDung: record.diem,
      })
    );
    await SellAPI.getVoucherWithIDKH(record.id).then((res) => onVoucher(res));
    SellAPI.updateKH(activeKey, record.id);
    setOpenKhachHang(false);
  };

  //Tìm khách hàng
  // const onChangeFilter = (changedValues, allValues) => {
  //   console.log("All values : ", allValues);
  //   timKiemKH(allValues);
  // };
  // const timKiemKH = (dataSearch) => {
  //   KhachHangAPI.timKiem(dataSearch).then((res) => {
  //     setKhachHang(res.data);
  //     console.log("22", res.data);
  //   });
  // };

  const handleClickRemoveClient = (record) => {
    dispatch(UpdateNullClient({ key: activeKey }));
    SellAPI.updateReturnKhachLe(activeKey);
    onVoucher("");
    setOpenKhachHang(false);
  };

  const loadKhachHang = async () => {
    const result = await SellAPI.getAllCustomers();
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
  };
  const handleClose = () => {
    setOpenKhachHang(false);
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
              height="140"
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
            {idKH !== null && idKH === record.id ? (
              <button
                type="primary"
                shape="round"
                className="btn btn-warning text-white"
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
            )}
          </>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Khách hàng"
      open={openKhachHang}
      onOk={handleClose}
      onCancel={handleClose}
      height={300}
      width={1200}
      // zIndex={10000}
      style={{ top: 50 }}
    >
      <div className="container">
        <div className="row mt-4">
          <Input className="col-md-8 ms-5"></Input>
          <Button
            className=" col-md-1 ms-5  bg-success float-end bg-primary"
            type="primary"
          >
            Tìm kiếm
          </Button>
          <Button
            className=" col-md-1 ms-5  bg-success float-end bg-primary"
            type="primary"
            onClick={() => setopenModalAddKhachHang(true)}
          >
            Thêm
          </Button>
          <ModalAddKhachHang
            openModalAddKhachHang={openModalAddKhachHang}
            setopenModalAddKhachHang={setopenModalAddKhachHang}
            loadKhachHang={loadKhachHang}
            onOk={handleCloseAddKhachHang}
            onCancel={handleCloseAddKhachHang}
          />
        </div>
        <Table
          style={{ justifyContent: "right" }}
          className="text-center mt-4"
          dataSource={client}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            defaultPageSize: 2,
            position: ["bottomCenter"],
            defaultCurrent: 1,
            total: client.length,
          }}
        />
      </div>
      {/* <div id="modal-root"></div> */}
    </Modal>
  );
};
export default ModalKhachHang;
