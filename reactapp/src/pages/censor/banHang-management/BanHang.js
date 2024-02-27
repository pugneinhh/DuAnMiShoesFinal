import {
  Button,
  Empty,
  Input,
  Modal,
  Space,
  Switch,
  Tabs,
  Tag,
  Table,
  InputNumber,
  Badge,
  Select,
} from "antd";
import React, { Children, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BsQrCodeScan, BsRecordCircle } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { QrReader } from "react-qr-reader";
import {
  MdOutlinePayments,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { DeleteFilled } from "@ant-design/icons";
import ModalSanPham from "./ModalSanPham";
import ModalThanhToan from "./ModalThanhToan";
import ModalKhachHang from "./ModalKhachHang";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import BillReducer, {
  CreateBill,
  GetBill,
  RemoveBill,
  UpdateBill,
  UpdateVoucherToBill,

} from "../../../store/reducer/Bill.reducer";
import {
  AddProduct,
  GetProduct,
  UpdateApartProduct,
  UpdatePushProduct,
} from "../../../store/reducer/Product.reducer";
import { Image } from "cloudinary-react";
import { AddClient, GetClient } from "../../../store/reducer/Client.reducer";
import {
  GetInvoice,
  UpdateInvoice,
  RemoveInvoice,
  LoadInvoice,  RemoveInvoiceByHoaDon,
} from "../../../store/reducer/DetailInvoice.reducer";
import { VoucherNguoiDungAPI } from "../../censor/api/voucher/nguoiDungVoucher.api";
import { SellAPI } from "../api/sell/sell.api";
import { VoucherAPI } from "../api/voucher/voucher.api";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import imgTicket from "../../../assets/images/discountTicket.png";
import DiaChiGiaoHang from "./GiaoHang";
import { NguoiDungAPI } from "../api/nguoiDung/nguoiDungAPI";

const { Option } = Select;
const { TabPane } = Tabs;
const BanHang = () => {
  const [activeKey, setActiveKey] = useState(0);
  const initState = useRef(1);
  const hoaDons = useSelector(GetBill);
  const ctspHD = useSelector(GetInvoice);
  const ctsp = useSelector(GetProduct);
  const client = useSelector(GetClient);
  const [shipMoney, setShipMoney] = useState("");
  const [prevValue, setPrevValue] = useState(undefined);
  let lengthSP = 0;
  let data = [""];
  let hd = [""]; 
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchTraSau, setIsSwitchTraSau] = useState(false);

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn === true) {
      setIsSwitchTraSau(false);
    }
    if (isSwitchOn === false) {
      if(hoaDons.filter((item) => item.id === activeKey && item.nguoiDung)[0]){
        NguoiDungAPI.getDiaChiByIDND(hoaDons.filter((item) => item.id === activeKey && item.nguoiDung)[0].nguoiDung).then((resData) => setDiaChiKhachHang(resData.data));
     } else {
       setDiaChiKhachHang("");
      // setShipMoney(0);
     }
    }
  };

  useEffect(() => {
     console.log("Hóa đơns",hoaDons);
    console.log(hoaDons.filter((item) => item.id === activeKey && item.tenNguoiNhan).length)
    if (hoaDons.filter((item) => item.id === activeKey && item.tenNguoiNhan).length === 0) {
      setIsSwitchOn(false);
    } else {
      setIsSwitchOn(true);
    }
  }, [activeKey,hoaDons.tenNguoiNhan,hoaDons.ngayDuKienNhan]);
  //đang fixx
  const handleSwitchTraSau = () => {
    setIsSwitchTraSau(!isSwitchTraSau);
    if (!isSwitchTraSau) {
      Modal.confirm({
        title: "Thông báo",
        content:
          "Bạn có chắc chắn muốn hóa đơn này trả sau hay không?",
        onOk: () => {
          console.log("Tên người nhaanjn vận chuyển:",hoaDons.filter((i) => i.id === activeKey)[0].tenNguoiNhan)
          if (!hoaDons.filter((i) => i.id === activeKey)[0].tenNguoiNhan){
              toast("Hóa đơn chưa có thông tin vận chuyển!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              
            });
            return setIsSwitchTraSau(false);
          } else {       
            SellAPI.updateTraSau(activeKey,storedData)
          toast("✔️ Cập nhật thành công!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          
          dispatch(RemoveInvoiceByHoaDon({hoaDon:activeKey}))
          dispatch(RemoveBill({key:activeKey}));
          setIsSwitchTraSau(false);
        }
        },
        onCancel: () => {
          return setIsSwitchTraSau(false);
        },
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        ),
      });
    }
  };

  const [voucherHienTai, setVoucherHienTai] = useState("");




  const onChangeVoucher = (value, option) => {
    dispatch(UpdateVoucherToBill({ voucher: value, key: activeKey }));
    VoucherAPI.detail(value).then((res) => setVoucherHienTai(res.data));

    SellAPI.updateVoucherToHD(activeKey, value);
  };
  const onSearchVoucher = (value, option) => {

  };
  // Lấy thông tin nhân viên
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("userData");
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      const nameFromData = parsedData.ma;
      if (nameFromData) {
        setStoredData(nameFromData);
      }
    }
  }, []);



  //Hết

 
    // option.label.toLowerCase().includes(input.toLowerCase());

  const [voucherByIDKH, setVoucherByIDKH] = useState([""]);
  const [voucherNoLimited, setVoucherNoLimited] = useState([""]);
  const [diaChiKhachHang, setDiaChiKhachHang] = useState([""]);
console.log("Địa chỉ KH",diaChiKhachHang)

  //load nguoi dung voucher

  const voucherNoIDKH = async () => {
    const result = await SellAPI.getVoucherNoLimited();
    console.log(result.data);
    setVoucherNoLimited(result.data);
  };


  const filterOptionVoucher = (input, option) => {
    voucherByIDKH?.map((item) =>
      item.ma.toLowerCase().includes(input.toLowerCase())
    );
  };

  const loadKhachHang = async () => {
    const result = await SellAPI.getAllCustomers();
    result.data.map((i) =>
      dispatch(
        AddClient({
          idND: i.idND,
          maND: i.maND,
          tenND: i.tenND,
          cccd: i.cccd,
          email: i.email,
          gioiTinh: i.gioiTinh,
          ngaySinh: new Date(i.ngaySinh * 1).toDateString("DD-MM-YYYY"),
          anh: i.anh,
          sdt: i.sdt,
          diem: i.diem,
          trangThai: i.trangThai,
        })
      )
    );
  };

  const loadCTSP = async () => {
    const result = await SellAPI.getAllProducts();
    result.data.map((i) =>
      dispatch(
        AddProduct({
          id: i.idCTSP,
          soLuong: i.soLuong,
          linkAnh: i.linkAnh,
          tenSP: i.tenSP,
          tenKT: i.tenKT,
          tenMS: i.tenMS,
          maMS: i.maMS,
          loaiKM: i.loaiKM,
          giaTriKhuyenMai: parseInt(i.giaTriKhuyenMai, 10),
          giaBan: i.giaBan,
          tenKM: i.tenKM,
        })
      )
    );
   // setCTSPSS(result.data);
  };



  const load = async (id) => {
    const result_hdct = await SellAPI.getAllHDCTByHD(id);
    console.log("HDCT", result_hdct.data);
    if (result_hdct.data.length > 0) {
      result_hdct.data.map((i) => {
        dispatch(
          LoadInvoice({
            id: i.id,
            soLuong: i.soLuong,
            giaGiam: i.giaGiam,
            total: i.giaSauGiam,
            trangThai: i.trangThai,
            giaBan: parseFloat(i.giaGiam) + parseFloat(i.giaSauGiam),
            giaSauGiam: i.giaSauGiam,
            tenSP: i.tenSP,
            maMS: i.maMS,
            tenMS: i.tenMS,
            tenKT: i.tenKT,
            hoaDon: i.idHD,
            chiTietSanPham: i.idCTSP,
            nguoiTao: i.nguoiTao,
            linkAnh: i.linkAnh,
            loaiKM: i.loaiKM,
            tenKM: i.tenKM,
            giaTriKhuyenMai: i.giaTriKhuyenMai,
          })
        );
      });
    }
  };

  const loadAllBill = async () => {
    const result = await SellAPI.getAllHoaDonCho();
    console.log(result.data);
    if (result.data.length > 0) {
      setActiveKey(result.data[0].id);
      if (result.data[0].nguoiDung) {
      SellAPI.getVoucherWithIDKH(result.data[0].nguoiDung).then(res => setVoucherByIDKH(res));
      }
      result.data.map((item) => {

        dispatch(
          CreateBill({
            id: item.id,
            ma: item.ma,
            nhanVien: storedData,
            nguoiDung: item.nguoiDung,
            gtNguoiDung: item.gtNguoiDung,
            voucher: item.voucher,
            ngayMua: null,
            giaGoc: item.giaGoc,
            giaGiamGia: item.giaGiamGia,
            thanhTien: item.thanhTien,
            diemSuDung: null,
            giaTriDiem: null,
            email: item.email,
            tenNguoiNhan: item.tenNguoiNhan,
            soDienThoai: item.soDienThoai,
            diaChi: item.diaChi,
            qrCode: null,
            ghiChu: item.ghiChu,
            ngayDuKienNhan: item.ngayDuKienNhan,
            ngayNhan: "null",
            ngayTraHang: null,
            nguoiTao: item.nguoiTao,
            // nguoiSua: item.nguoiSua,
            // ngaySua: item.ngaySua,
            // ngayTao: item.ngayTao,
            trangThai: 0,
            key: item.id,
            tienVanChuyen: item.tienVanChuyen,
          })
        );
        load(item.id);
      });
    } else {
      const result = await SellAPI.getAllHoaDonChoHomNay();
      const idHD = uuid();
      const currentDate = new Date();
      const currentDateInMilliseconds = Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const value = [
        {
          id: idHD,
          ma:
            "HDTQ" +
            currentDateInMilliseconds +
            "-" +
            ((!result.data ? 0 : parseFloat(result.data.length)) + 1),
          trangThai: 0,
          nhanVien: storedData,
          nguoiTao: storedData,
        },
      ];

      dispatch(
        CreateBill({
          id: idHD,
          ma:
            "HDTQ" +
            currentDateInMilliseconds +
            "-" +
            ((!result.data ? 0 : parseFloat(result.data.length)) + 1),
          nhanVien: storedData,
          nguoiDung: null,
          voucher: null,
          ngayMua: null,
          giaGoc: null,
          giaGiamGia: null,
          thanhTien: null,
          diemSuDung: null,
          giaTriDiem: null,
          tenNguoiNhan: null,
          soDienThoai: null,
          diaChi: null,
          qrCode: null,
          ghiChu: null,
          ngayDuKienNhan: null,
          ngayNhan: "null",
          ngayTraHang: null,
          nguoiTao: storedData,
          // nguoiSua: null,
          // ngaySua: null,
          // ngayTao: new Date(),
          trangThai: 0,
          key: idHD,
        })
      );
      SellAPI.addBill(value[0]);

      setActiveKey(idHD);
      console.log(value[0]);
    }
  };

  const [openSanPham, setOpenSanPham] = useState(false);

  useEffect(() => {
    loadCTSP();
    voucherNoIDKH();
    loadKhachHang();
    loadAllBill();
  }, []);

  const onChangeSoLuong = (value, record) => {
    console.log("value", value);
    console.log("prevvlue", prevValue);
    console.log("record", record);
    if (prevValue === 0) {
      setPrevValue(undefined);
      return;
    }
    if (value === 0 || !value) {
      setPrevValue(0);
      Modal.confirm({
        title: "Thông báo",
        content:
          "Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng không không?",
        onOk: () => {
          dispatch(
            RemoveInvoice({
              chiTietSanPham: record.chiTietSanPham,
              hoaDon: record.hoaDon,
            })
          );
          dispatch(
            UpdatePushProduct({
              id: record.chiTietSanPham,
              soLuong: record.soLuong,
            })
          );
          SellAPI.deleteInvoiceAndRollBackProduct(
            record.chiTietSanPham,
            record.hoaDon
          );
          // SellAPI.updateThanhTien(record.hoaDon);
          data = ctspHD.filter((f) => f.hoaDon === activeKey);
          toast("✔️ Cập nhật giỏ hàng thành công!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
        onCancel: () => {
          //  setSoLuong(prevValue);
        },
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        ),
      });
    } else {
      const slt = ctsp.filter((i) => i.id === record.chiTietSanPham)[0].soLuong;
      console.log("Số lượng tồn", slt);
      if (slt < value) {
        toast("Số lượng tồn không thỏa mãn yêu cầu!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        value = slt;
        dispatch(
          UpdateInvoice({
            soLuong: value,
            chiTietSanPham: record.chiTietSanPham,
            hoaDon: activeKey,
          })
        );
        dispatch(
          UpdateApartProduct({
            id: record.chiTietSanPham,
            soLuong: value - record.soLuong,
          })
        );
        SellAPI.updateSL(record.chiTietSanPham, activeKey, value);
        //SellAPI.updateThanhTien(activeKey);
      } else {
        dispatch(
          UpdateInvoice({
            soLuong: value,
            chiTietSanPham: record.chiTietSanPham,
            hoaDon: activeKey,
          })
        );
        dispatch(
          UpdateApartProduct({
            id: record.chiTietSanPham,
            soLuong: value - record.soLuong,
          })
        );
        SellAPI.updateSL(record.chiTietSanPham, activeKey, value);
        // SellAPI.updateThanhTien(activeKey);
      }
    }
  };

  const handleAddBill = () => {
    dispatch(
      UpdateBill({
        key: activeKey,
        giaGoc: data.reduce((accumulator, currentProduct) => {
          return accumulator + currentProduct.total;
        }, 0),
        giaGiamGia: voucherHienTai
          ? voucherHienTai.loaiVoucher === "Tiền mặt"
            ? voucherHienTai.mucDo < voucherHienTai.giamToiDa
              ? voucherHienTai.mucDo
              : voucherHienTai.giamToiDa
            : (data.total * voucherHienTai.mucDo) / 100 <
              voucherHienTai.giamToiDa
            ? (data.total * voucherHienTai.mucDo) / 100
            : voucherHienTai.giamToiDa
          : 0,
        thanhTien:
          data.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.total;
          }, 0) -
          (voucherHienTai
            ? voucherHienTai.loaiVoucher === "Tiền mặt"
              ? voucherHienTai.mucDo < voucherHienTai.giamToiDa
                ? voucherHienTai.mucDo
                : voucherHienTai.giamToiDa
              : (data.total * voucherHienTai.mucDo) / 100 <
                voucherHienTai.giamToiDa
              ? (data.total * voucherHienTai.mucDo) / 100
              : voucherHienTai.giamToiDa
            : 0),
      })
    );
    setOpenThanhToan(true);
  };
  const handleCloseSanPham = () => {
    setOpenSanPham(false);
  };
  const [openKhachHang, setOpenKhachHang] = useState(false);

  const handleCloseKhachHang = () => {
    setOpenKhachHang(false);
  };
  const [openThanhToan, setOpenThanhToan] = useState(false);
  const handleCloseThanhToan = () => {
    setOpenThanhToan(false);
  };
  const onChange = (key) => {
    setActiveKey(key);
    if (!hoaDons.filter((item) => item.id === key)[0].voucher) {
      console.log("Voucher null")
      setVoucherHienTai("");  
    } else {
      VoucherAPI.detail(
        hoaDons.filter((item) => item.id === key)[0].voucher
      ).then((res) => setVoucherHienTai(res.data));
    }
    if(hoaDons.filter((item) => item.id === key && item.nguoiDung)[0]){
       NguoiDungAPI.getDiaChiByIDND(hoaDons.filter((item) => item.id === key && item.nguoiDung)[0].nguoiDung).then((resData) => setDiaChiKhachHang(resData.data));
    } else {
      setDiaChiKhachHang("");
    }
    //setShipMoney(0);
     SellAPI.getVoucherWithIDKH(hoaDons.filter((item) => item.id === key && item.nguoiDung)[0]?.nguoiDung).then(res => setVoucherByIDKH(res));
    //voucherKH(nguoiDung);
  };

  ////tạo hóa đơn bằng redux

  const dispatch = useDispatch();
  const handleClickAddHD = async () => {
    // const maxKey = Math.max(...hoaDons.map((hd) => hd.key));
    if (hoaDons.length >= 5) {
      return toast.error("Không được vượt quá 5 hóa đơn!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // if (maxKey > 0) {
    const result = await SellAPI.getAllHoaDonChoHomNay();
    console.log("result", result);
    const idHD = uuid();
    const currentDate = new Date();
    const currentDateInMilliseconds = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const value = [
      {
        id: idHD,
        ma:
          "HDTQ" +
          currentDateInMilliseconds +
          "-" +
          (!result.data ? 0 : parseFloat(result.data.length) + 1),
        trangThai: 0,
        nhanVien: storedData,
        nguoiTao: storedData,
      },
    ];
    dispatch(
      CreateBill({
        id: idHD,
        ma:
          "HDTQ" +
          currentDateInMilliseconds +
          "-" +
          (!result.data ? 0 : parseFloat(result.data.length) + 1),
        nhanVien: storedData,
        nguoiDung: null,
        voucher: null,
        ngayMua: null,
        giaGoc: 0,
        giaGiamGia: 0,
        thanhTien: 0,
        diemSuDung: null,
        giaTriDiem: null,
        tenNguoiNhan: null,
        soDienThoai: null,
        diaChi: null,
        qrCode: null,
        ghiChu: null,
        ngayDuKienNhan: null,
        ngayNhan: "null",
        ngayTraHang: null,
        nguoiTao: storedData,
        nguoiSua: null,
        ngaySua: null,
        trangThai: 0,
        key: idHD,
      })
    );
    SellAPI.addBill(value[0]);
    setActiveKey(idHD);
    setVoucherHienTai("");
    setShipMoney(0);
  };
  // ///remove hóa đơn bằng redux
  const handleClickRemoveHD = (targetKey) => {
    if (hoaDons.length <= 0) {
      return toast.error("Không còn hóa đơn!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      Modal.confirm({
        title: "Thông báo",
        content: "Bạn có chắc chắn muốn xóa hóa đơn này không?",
        onOk: () => {
          dispatch(
            RemoveBill(hoaDons.filter((hoaDon) => hoaDon.key == targetKey)[0])
          );
          HoaDonAPI.huyHoaDon(targetKey);
          const list = ctspHD.filter((item) => item.hoaDon === targetKey);
          list.map((i) =>
            SellAPI.deleteInvoiceAndRollBackProduct(i.chiTietSanPham, targetKey)
          );
          setActiveKey(null);
          initState.current--;
          toast("✔️ Xóa hóa đơn thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // form.finish();
        },
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        ),
      });

      // setActiveKey(initState.current);
    }
  };
  // onedit sự kiện
  const onEdit = (targetKey, action) => {
    if (action === "handleClickAddHD") {
      handleClickAddHD();
    } else {
      handleClickRemoveHD(targetKey);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "chiTietSanPham",
      key: "chiTietSanPham",
      render: (chiTietSanPham, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Hình ảnh",
      dataIndex: "linkAnh",
      key: "linkAnh",
      center: "true",
      render: (linkAnh, record) => {
        return (
          <>
            {!record.tenKM ? (
              <Image
                cloudName="dtetgawxc"
                publicId={linkAnh}
                width="100"
                borderRadius="10"
                crop="scale"
                href={linkAnh}
              />
            ) : (
              <Badge.Ribbon
                text={
                  record.loaiKM === "Tiền mặt"
                    ? "-" +
                      `${Intl.NumberFormat("en-US").format(
                        record.giaTriKhuyenMai
                      )} VNĐ`
                    : "-" + record.giaTriKhuyenMai + "%"
                }
                color="red"
                size="small"
              >
                <Image
                  cloudName="dtetgawxc"
                  publicId={linkAnh}
                  width="100"
                  borderRadius="10"
                  crop="scale"
                  href={linkAnh}
                />
              </Badge.Ribbon>
            )}
          </>
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Giá Bán",
      dataIndex: "giaBan",
      render: (text, record) => {
        return (
          <>
            {!record.tenKM ? (
              <span>{`${Intl.NumberFormat("en-US").format(
                record.giaBan
              )} VNĐ`}</span>
            ) : (
              <span style={{ color: "red" }}>
                <del style={{ color: "black" }}>{`${Intl.NumberFormat(
                  "en-US"
                ).format(record.giaBan)} VNĐ`}</del>
                <br></br>
                {`${Intl.NumberFormat("en-US").format(record.giaSauGiam)} VNĐ`}
              </span>
            )}
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      render: (text, record) => (
        <InputNumber
          min={0}
          value={record.soLuong}
          onChange={(value) => onChangeSoLuong(value, record)}
        />
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu sắc",
      dataIndex: "tenMS",

      render: (text, record) => {
        return (
          <>
            <div
              style={{
                backgroundColor: `${record.maMS}`,
                borderColor: `${
                  record.maMS === "#ffffff" || "#fafafa" ? "#000000" : "#ffffff"
                }`,
                borderRadius: 30,
                border: "1px solid",
                width: 25,
                height: 25,
              }}
            ></div>
          </>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (text, record) => (
        <span>{`${Intl.NumberFormat("en-US").format(record.total)} VNĐ`}</span>
      ),
    },
    {
      title: "Thao tác",
      render: (record) => (
        <Space size="middle">
          <button
            className="btn btn-danger"
            style={{ borderRadius: 30 }}
            onClick={() => {
              Modal.confirm({
                title: "Thông báo",
                content:
                  "Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng không không?",
                onOk: () => {
                  dispatch(
                    RemoveInvoice({
                      chiTietSanPham: record.chiTietSanPham,
                      hoaDon: record.hoaDon,
                    })
                  );
                  dispatch(
                    UpdatePushProduct({
                      id: record.chiTietSanPham,
                      soLuong: record.soLuong,
                    })
                  );
                  SellAPI.deleteInvoiceAndRollBackProduct(
                    record.chiTietSanPham,
                    record.hoaDon
                  );
                  //SellAPI.updateThanhTien(record.hoaDon);
                  //  data = ctspHD.filter((f) => f.hoaDon === activeKey);
                  toast("✔️ Cập nhật giỏ hàng thành công!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  // form.finish();
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            <DeleteFilled size={20} />
          </button>
        </Space>
      ),
    },
  ];

  ////quét QR sản phẩm
  const totalPrice = 0;
  const [openScan, setOpenScan] = useState(false);
  const [qrData, setQrData] = useState("");
  const handleCloseScan = () => {
    setOpenScan(false);
  };
  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      // Gửi dữ liệu mã QR lên server ở đây
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container border-1">
      <div className="text-end mt-3 me-4 mb-3">
        {/* <Button type="primary" onClick={add} >Tạo hóa đơn</Button> */}
        <Button type="primary" onClick={handleClickAddHD}>
          Tạo hóa đơn
        </Button>
      </div>

      <div className="bg-light m-2 p-3 pt-2" style={{ borderRadius: 20 }}>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          defaultActiveKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
        >
          {/* chi tiết hóa đơn */}
          {hoaDons.map(
            (tab) => (
              (data = ctspHD.filter((f) => f.hoaDon === activeKey)),
              (hd = hoaDons.filter((f) => f.id === activeKey)),
              console.log("hóa đơn 0",hd[0]),
              // (KH = client.filter((k) => k.activeKey === activeKey)),
              (lengthSP = ctspHD
                .filter((f) => f.hoaDon === tab.key)
                .reduce(
                  (accumulator, object) =>
                    parseFloat(accumulator) + parseFloat(object.soLuong),
                  0
                )),
              (
                <TabPane
                  tab={
                    <>
                      {
                        <Space>
                          <span>{tab.ma}</span>
                          <Badge count={lengthSP === 0 ? 0 : lengthSP}></Badge>
                        </Space>
                      }
                    </>
                  }
                  key={tab.key}
                >
                  <>
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-start">
                          <h4>
                            <FaList /> Danh sách
                          </h4>
                        </div>
                        <div className="text-end">
                          <Button
                            type="primary"
                            icon={<BsQrCodeScan />}
                            onClick={() => setOpenScan(true)}
                          >
                            Quét QR sản phẩm
                          </Button>
                          <Button
                            type="primary"
                            className="ms-3"
                            onClick={() => setOpenSanPham(true)}
                          >
                            Chọn sản phẩm
                          </Button>
                          <ModalSanPham
                            // idHD = {tab.id}
                            activeKey={activeKey}
                            openSanPham={openSanPham}
                            setOpenSanPham={setOpenSanPham}
                            onOk={handleCloseSanPham}
                            onCancel={handleCloseSanPham}
                          />
                        </div>
                      </div>
                      <>
                        {data.length > 0 ? (
                          <Table
                            className="text-center"
                            dataSource={data}
                            columns={columns}
                            pagination={{
                              showQuickJumper: true,
                              defaultPageSize: 5,
                              position: ["bottomCenter"],
                              defaultCurrent: 1,
                              // total: cTSP.length,
                            }}
                          />
                        ) : (
                          <div>
                            <Empty
                              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy4Pi1fKO57hmDRx...usqp=CAU"
                              imageStyle={{
                                height: 250,
                              }}
                              description={
                                <span>Không có sản phẩm nào trong giỏ</span>
                              }
                            />
                          </div>
                        )}
                      </>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-start">
                        <h4> Tài khoản</h4>
                      </div>
                      <div className="text-end">
                        <>
                          <Button
                            className="me-5 bg-success"
                            type="primary"
                            onClick={() => setOpenKhachHang(true)}
                          >
                            Chọn khách hàng
                          </Button>
                          <ModalKhachHang
                            openKhachHang={openKhachHang}
                            activeKey={activeKey}
                            setOpenKhachHang={setOpenKhachHang}
                            onOk={handleCloseKhachHang}
                            onCancel={handleCloseKhachHang}
                            onVoucher={setVoucherByIDKH}
                          />
                        </>
                      </div>
                    </div>
                    <hr></hr>
                    {/* thông tin khách hàng */}
                    <div className="mb-3">
                      <>
                        {!tab.nguoiDung ? (
                          <span>
                            <p>
                              Tên khách hàng:{" "}
                              <Tag color="#cccccc" className="rounded-pill">
                                Khách lẻ
                              </Tag>
                            </p>
                            <p>
                              Số điện thoại:{" "}
                              <Tag color="#cccccc" className="rounded-pill">
                                000-0000-000
                              </Tag>
                            </p>
                          </span>
                        ) : (
                          <span>
                            <p>
                              Tên khách hàng:{" "}
                              <Tag
                                bordered={false}
                                color={
                                  client.filter(
                                    (i) => i.idND === tab.nguoiDung
                                  )[0]?.gioiTinh === "true"
                                    ? "processing"
                                    : "#FFB6C1"
                                }
                                className="rounded-pill"
                              >
                                {
                                  client.filter(
                                    (i) => i.idND === tab.nguoiDung
                                  )[0].tenND
                                }
                              </Tag>
                            </p>
                            <p>
                              Số điện thoại:{" "}
                              <Tag
                                bordered={false}
                                color={
                                  client.filter(
                                    (i) => i.idND === tab.nguoiDung
                                  )[0]?.gioiTinh === "true"
                                    ? "processing"
                                    : "#FFB6C1"
                                }
                                className="rounded-pill"
                              >
                                {
                                  client.filter(
                                    (i) => i.idND === tab.nguoiDung
                                  )[0].sdt
                                  //.soDienThoai
                                }
                              </Tag>
                            </p>
                          </span>
                        )}
                      </>
                    </div>
                    {/* hết thông tin tài khoản */}
                    <h4>Khách hàng</h4>
                    <hr></hr>
                    <div className="container-fluid row">
                      <div className="col-md-7">
                        {hd[0]?.tenNguoiNhan ? (
                          <DiaChiGiaoHang
                            money={setShipMoney}
                            quantity={lengthSP}
                            hoaDon={activeKey}
                            thongTinVanChuyen={hd[0]}
                            //thongTinKhachHang={diaChiKhachHang[0]}
                          />
                        ) : (
                          isSwitchOn && (
                            <DiaChiGiaoHang
                              money={setShipMoney}
                              quantity={lengthSP}
                              hoaDon={activeKey}
                              thongTinKhachHang={diaChiKhachHang}
                            />
                          )
                        )}
                        {/* {isSwitchOn && <DiaChiGiaoHang money ={setShipMoney} quantity={lengthSP} hoaDon={activeKey}/>} */}
                      </div>
                      <div className="col-md-5">
                        <h4 className="fw-bold">
                          <MdOutlineShoppingCartCheckout />
                          Thông tin thanh toán
                        </h4>
                        <div className="row">
                          <h6 className="col-md-3 mt-2">Thanh toán</h6>
                          <Button
                            className="col-md-9"
                            icon={
                              <MdOutlinePayments
                                size={25}
                                onClick={() => {
                                  //handleAddBill(dispatch(GetBillByKey({activeKey})))}
                                  handleAddBill(activeKey);
                                }}
                              />
                            }
                            style={{ marginLeft: 12 }}
                          ></Button>
                          <ModalThanhToan
                            openThanhToan={openThanhToan}
                            setOpenThanhToan={setOpenThanhToan}
                            onOk={handleCloseThanhToan}
                            onCancel={handleCloseThanhToan}
                            total={
                              data.reduce((accumulator, currentProduct) => {
                                return accumulator + currentProduct.total;
                              }, 0) -
                              (voucherHienTai
                                ? voucherHienTai.loaiVoucher === "Tiền mặt"
                                  ? voucherHienTai.mucDo <
                                    voucherHienTai.giamToiDa
                                    ? voucherHienTai.mucDo
                                    : voucherHienTai.giamToiDa
                                  : (data.total * voucherHienTai.mucDo) / 100 <
                                    voucherHienTai.giamToiDa
                                  ? (data.total * voucherHienTai.mucDo) / 100
                                  : voucherHienTai.giamToiDa
                                : 0)
                            }
                            hoaDon={activeKey}
                            voucher={voucherHienTai.id}
                          />
                        </div>

                        <div className="row">
                          <h6 className="col-md-3 mt-2">Mã giảm giá:</h6>

                          <Space.Compact className="col-md-10">
                            <Select
                              showSearch
                              style={{ width: 800, height: 120 }}
                              placeholder="Lựa chọn voucher"
                              optionLabelProp="label"
                              optionFilterProp="label"
                              onChange={onChangeVoucher}
                              onSearch={onSearchVoucher}
                              filterOption={filterOptionVoucher}
                              //  options={voucherByIDKH.data ? voucherByIDKH.data : voucherNoLimited}
                            >
                              {voucherByIDKH.data ? (
                                voucherByIDKH.data.map((option) => (
                                  <Option
                                    key={option.id}
                                    value={option.id}
                                    label={option.ma}
                                    imgTicket={imgTicket}
                                    dieuKien = {option.dieuKien}
                                    giamToiDa = {option.giamToiDa}
                                    loai = {option.loaiVoucher}
                                    mucDo = {option.mucDo}
                                    style={{ width: "100%", height: "100%" }}
                               
                                    // filterOption={filterOptionVoucher}
                                  >
                                    <div className="row">
                                      <div
                                        className="col-md-2"
                                        //style={{ marginRight: 50 }}
                                      >
                                        <img
                                          src={imgTicket}
                                          style={{
                                            width: 100,
                                            marginRight: "8px",
                                            heitgh: 80,
                                            marginTop: "15px",
                                          }}
                                        />
                                      </div>
                                      <div className="col" style={{marginLeft: "50px"}}>
                                        Mã giảm giá: {option.ma}
                                        <br></br>
                                        Điều kiện:
                                        {Intl.NumberFormat("en-US").format(
                                          option.dieuKien
                                        )}{" "}
                                        VNĐ
                                        <br></br>
                                        Giảm:
                                        {option.loaiVoucher === "Phần trăm"
                                          ? option.mucDo + "% "
                                          : `${Intl.NumberFormat(
                                              "en-US"
                                            ).format(option.mucDo)} VNĐ `}
                                        <br></br>
                                        Tối đa:
                                        {Intl.NumberFormat("en-US").format(
                                          option.giamToiDa
                                        )}
                                        VNĐ
                                      </div>
                                    </div>
                                  </Option>
                                ))
                              ) : voucherNoLimited ? (
                                voucherNoLimited.map((option) => (
                                  <Option
                                    key={option.id}
                                    value={option.id}
                                    label={option.ma}
                                    style={{ width: "100%", height: 100 }}
                                
                                    // filterOption={filterOptionVoucher}
                                  >
                                    <div className="row">
                                      <div className="col-md-2">
                                        <img
                                          src={imgTicket}
                                          style={{
                                            width: 100,
                                            marginRight: "8px",
                                            heitgh: 50,
                                            marginTop: "15px",
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="col"
                                        style={{ marginLeft: 50 }}
                                      >
                                        Mã giảm giá: {option.ma}
                                        <br></br>
                                        Điều kiện:
                                        {Intl.NumberFormat("en-US").format(
                                          option.dieuKien
                                        )}{" "}
                                        VNĐ
                                        <br></br>
                                        Giảm:
                                        {option.loaiVoucher === "Phần trăm"
                                          ? option.mucDo + "% "
                                          : `${Intl.NumberFormat(
                                              "en-US"
                                            ).format(option.mucDo)} VNĐ `}
                                        <br></br>
                                        Tối đa:
                                        {Intl.NumberFormat("en-US").format(
                                          option.giamToiDa
                                        )}
                                        VNĐ
                                      </div>
                                    </div>
                                  </Option>
                                ))
                              ) : (
                                <Option>Không có voucher hợp lệ</Option>
                              )}
                            </Select>
                            {/* <Button className="ms-5">Áp mã</Button> */}
                          </Space.Compact>
                        </div>
                        <h6 className="mt-4">
                          Trả sau:
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Switch
                            disabled={isSwitchOn ? false : true}
                            onChange={handleSwitchTraSau}
                            checked={isSwitchTraSau}
                          />
                        </h6>
                        <h6 className="mt-4">
                          Giao hàng: &nbsp;&nbsp;&nbsp;
                          <Switch
                            disabled={false}
                            onChange={handleSwitchToggle}
                            checked={
                              // hd[0]?.tenNguoiNhan
                              //   ? true
                              //   : isSwitchOn
                              //   ? true
                              //   : false
                             isSwitchOn
                            }
                          />
                        </h6>
                        <div className="row">
                          <div className="col-md-8">
                            <h6 className="mt-4">
                              Tiền hàng:{" "}
                              {`${Intl.NumberFormat("en-US").format(
                                data.reduce((accumulator, currentProduct) => {
                                  return accumulator + currentProduct.total;
                                }, 0) -
                                  (voucherHienTai
                                    ? voucherHienTai.loaiVoucher === "Tiền mặt"
                                      ? voucherHienTai.mucDo <
                                        voucherHienTai.giamToiDa
                                        ? voucherHienTai.mucDo
                                        : voucherHienTai.giamToiDa
                                      : (data.total * voucherHienTai.mucDo) /
                                          100 <
                                        voucherHienTai.giamToiDa
                                      ? (data.total * voucherHienTai.mucDo) /
                                        100
                                      : voucherHienTai.giamToiDa
                                    : 0)
                              )}`}
                            </h6>
                            <h6 className="mt-4">
                              Phí vận chuyển:{" "}
                              {isSwitchOn ? `${Intl.NumberFormat("en-US").format(
                              //  (hd[0].tienVanChuyen && hd[0].tienVanChuyen === shipMoney)
                              //     ? hd[0].tienVanChuyen 
                              //     : (hd[0].tienVanChuyen && hd[0].tienVanChuyen !== shipMoney)
                              //     ? shipMoney
                              //     : shipMoney
                                (hd[0].tienVanChuyen && !shipMoney  ) ? hd[0].tienVanChuyen : (hd[0].tienVanChuyen && hd[0].tienVanChuyen !== shipMoney) ? shipMoney : shipMoney
                                  
                              )}` : 0}
                            </h6>
                            <h6 className="mt-4">
                              Giảm giá:{" "}                    
                                     {`${Intl.NumberFormat("en-US").format(
                                voucherHienTai
                                  ? voucherHienTai.loaiVoucher === "Tiền mặt"
                                    ? voucherHienTai.mucDo <
                                      voucherHienTai.giamToiDa
                                      ? voucherHienTai.mucDo
                                      : voucherHienTai.giamToiDa
                                  //   : (((parseFloat(hd[0].thanhTien) * voucherHienTai.mucDo) /
                                  //       100 ) <
                                  //       parseFloat(voucherHienTai.giamToiDa))
                                  //   ? ((parseFloat(hd[0].thanhTien) * voucherHienTai.mucDo) / 100)
                                  //   : parseFloat(voucherHienTai.giamToiDa)
                                  // : 0
                                  : (data.total * voucherHienTai.mucDo) /
                                  100 <
                                voucherHienTai.giamToiDa
                              ? (data.total * voucherHienTai.mucDo) /
                                100
                              : voucherHienTai.giamToiDa
                            : 0
                              )}`}
                            </h6>
                            <h6 className="mt-4">
                              Điểm hiện tại:{" "}
                              <>
                                {tab.nguoiDung !== null ? tab.diemNguoiDung : 0}
                              </>
                            </h6>
                            <h6 className="mt-4">
                              Tổng tiền:{" "}
                              {`${Intl.NumberFormat("en-US").format(
                                data.reduce((accumulator, currentProduct) => {
                                  return accumulator + currentProduct.total;
                                }, 0) -
                                  (voucherHienTai
                                    ? voucherHienTai.loaiVoucher === "Tiền mặt"
                                      ? voucherHienTai.mucDo <
                                        voucherHienTai.giamToiDa
                                        ? voucherHienTai.mucDo
                                        : voucherHienTai.giamToiDa
                                      : (data.total * voucherHienTai.mucDo) /
                                          100 <
                                        voucherHienTai.giamToiDa
                                      ? (data.total * voucherHienTai.mucDo) /
                                        100
                                      : voucherHienTai.giamToiDa
                                    : 0) +
                                  (isSwitchOn ? (hd[0].tienVanChuyen && !shipMoney  ) ? hd[0].tienVanChuyen : (hd[0].tienVanChuyen && hd[0].tienVanChuyen !== shipMoney) ? shipMoney : shipMoney
                                    : 0)
                              )}`}
                            </h6>
                          </div>
                          <div className="col-md-4">
                            <h6 className="mt-4">VND</h6>

                            <h6 className="mt-4">VND</h6>
                            <h6 className="mt-4 text-danger">VND</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </TabPane>
              )
            )
          )}
        </Tabs>

        {hoaDons.length === 0 || activeKey === null || !activeKey ? (
          <>
            <div className="mb-3">
              <span>
                <p>
                  Tên khách hàng:{" "}
                  <Tag color="#cccccc" className="rounded-pill">
                    Khách lẻ
                  </Tag>
                </p>
                <p>
                  Số điện thoại:{" "}
                  <Tag color="#cccccc" className="rounded-pill">
                    000-0000-000
                  </Tag>
                </p>
              </span>
            </div>

            <h4>Khách hàng</h4>
            <hr></hr>
            <div className="container-fluid row">
              <div className="col-md-7"></div>
              <div className="col-md-5">
                <h4 className="fw-bold">
                  <MdOutlineShoppingCartCheckout />
                  Thông tin thanh toán
                </h4>
                <div className="row">
                  <h6 className="col-md-3 mt-2">Thanh toán</h6>
                  <Button
                    className="col-md-9"
                    icon={
                      <MdOutlinePayments
                        size={25}
                        onClick={() => setOpenThanhToan(true)}
                      />
                    }
                    style={{ marginLeft: 15 }}
                    disabled
                  ></Button>
                  <ModalThanhToan
                    openThanhToan={openThanhToan}
                    setOpenThanhToan={setOpenThanhToan}
                    onOk={handleCloseThanhToan}
                    onCancel={handleCloseThanhToan}
                  />
                </div>

                <div className="row">
                  <h6 className="col-md-3 mt-2">Mã giảm giá:</h6>

                  <Space.Compact className="col-md-9">
                    <Select
                      showSearch
                      style={{ width: 600, height: 80 }}
                      placeholder="Lựa chọn voucher"
                      optionFilterProp="children"
                      onChange={onChangeVoucher}
                      // onSearch={onSearchVoucher}
                      disabled
                    >
                      {voucherNoLimited ? (
                        voucherNoLimited.map((option) => (
                          <Option
                            key={option.id}
                            value={option.id}
                            label={option.ma}
                            style={{ width: "100%", height: 80 }}
                            // filterOption={filterOptionVoucher}
                          >
                            <div className="row">
                              <div
                                className="col-md-2"
                                style={{ marginRight: 50 }}
                              >
                                <img
                                  src={imgTicket}
                                  style={{
                                    width: 100,
                                    marginRight: "8px",
                                    heitgh: 50,
                                    marginTop: "15px",
                                  }}
                                />
                              </div>
                              <div className="col">
                                Mã giảm giá: {option.ma}
                                <br></br>
                                Điều kiện:
                                {Intl.NumberFormat("en-US").format(
                                  option.dieuKien
                                )}{" "}
                                VNĐ
                                <br></br>
                                Giảm:
                                {option.loaiVoucher === "Phần trăm"
                                  ? option.mucDo + "% "
                                  : `${Intl.NumberFormat("en-US").format(
                                      option.mucDo
                                    )} VNĐ `}
                                - Tối đa:
                                {Intl.NumberFormat("en-US").format(
                                  option.giamToiDa
                                )}
                                VNĐ
                              </div>
                            </div>
                          </Option>
                        ))
                      ) : (
                        <Option>Không có voucher hợp lệ</Option>
                      )}
                    </Select>
                    {/* 
                    <Button className="ms-5">Áp mã</Button> */}
                  </Space.Compact>
                </div>
                <h6 className="mt-4">
                  Trả sau: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Switch disabled checked="false" />
                </h6>
                <h6 className="mt-4">
                  Giao hàng: &nbsp;&nbsp;&nbsp;
                  <Switch disabled />
                </h6>
                <div className="row">
                  <div className="col-md-8">
                    <h6 className="mt-4">Tiền hàng:</h6>
                    <h6 className="mt-4">Phí vận chuyển:</h6>
                    <h6 className="mt-4">Giảm giá:</h6>
                    <h6 className="mt-4">Điểm hiện tại:</h6>
                    <h6 className="mt-4">Tổng tiền:</h6>
                  </div>
                  <div className="col-md-4">
                    <h6 className="mt-4">VND</h6>

                    <h6 className="mt-4">VND</h6>
                    <h6 className="mt-4 text-danger">VND</h6>
                  </div>
                </div>
                {/* <Button
                  className=" mt-2 me-5 bg-success float-end bg-black"
                  type="primary"
                  disabled
                >
                  Xác nhận đặt hàng
                </Button> */}
              </div>
            </div>
          </>
        ) : (
          console.error()
        )}
      </div>

      <Modal
        title={<h5>QR core scaner</h5>}
        centered
        open={openScan}
        onOk={handleCloseScan}
        onCancel={handleCloseScan}
        footer={[<Button onClick={handleCloseScan}>Cancel</Button>]}
        width={500}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          onResult={(result, error) => {
            if (!!result) {
              setQrData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};
export default BanHang;
