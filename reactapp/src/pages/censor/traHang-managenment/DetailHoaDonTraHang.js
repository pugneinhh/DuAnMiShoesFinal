import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { LuMousePointerClick } from "react-icons/lu";
import { useParams } from "react-router-dom";
import TableSanPham from "./TableSanPham";
import { MdSimCardDownload } from "react-icons/md";
import { FaBuilding, FaUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import TableSanPhamHoanTra from "./TableSanPhamHoanTra";
import { TraHangAPI } from "../api/traHang/traHang.api";
import { useSelector } from "react-redux";
import { GetNewBill } from "../../../store/reducer/NewBill.reducer";
import { SellAPI } from "../api/sell/sell.api";
import { toast, ToastContainer } from "react-toastify";
import { VoucherAPI } from "../api/voucher/voucher.api";

const DetailHoaDonTraHang = () => {
  const [form] = Form.useForm();
  const [selectedIDSP, setSelectedIDSP] = useState([]);
  const [sanPhamHDCT, setSanPhamHDCT] = useState([]);
  const [thongTin, setThongTin] = useState([]);
  const [tienGiamHDMoi, setTienGiamHDMoi] = useState(0);
  const [tienTra, setTienTra] = useState(0);
  const { id } = useParams("");
  console.log(id);
  let newBill = useSelector(GetNewBill);

  let totalNewBill = newBill.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.tongTien;
  }, 0);
 
  let check = 0;

  const loadVoucherTotNhatVaVoucherTiepTheo = (total) => {
    
    if (total && total > 0) {
      SellAPI.voucherTotNhat(
        thongTin.nguoiDung != null ? thongTin.nguoiDung.id : null,
        total
      ).then((res) => {
        loadGiamGia(res.data);
      });
    } else {
      setTienGiamHDMoi(0);
      setTienTra(thongTin.thanhTien);
    }
  };

  const loadGiamGia = (voucher) => {
    if (voucher) {
      
      if (voucher.loaiVoucher === "Tiền mặt") {
        setTienGiamHDMoi(voucher.giamToiDa);
        setTienTra(
           totalNewBill -thongTin.giaGiamGia + voucher.giamToiDa
        );
      } else {
        setTienGiamHDMoi(
          Math.min(
            (thongTin.giaGoc - totalNewBill) * (voucher.mucDo / 100),
            voucher.giamToiDa
          )
        );
        setTienTra(
              totalNewBill - thongTin.giaGiamGia +
              (parseFloat(thongTin.giaGoc) === parseFloat(totalNewBill)
                ? 0
                : Math.min(
                    (thongTin.giaGoc - totalNewBill) * (voucher.mucDo / 100),
                    voucher.giamToiDa
                  ))
        );
      }
    } else {
     
      setTienGiamHDMoi(0);
      // setTienTra(thongTin.thanhTien - (thongTin.giaGoc - totalNewBill));
      setTienTra( totalNewBill);
    }
  };

  useEffect(() => {
    if (newBill.length > 0) {
      if (thongTin && thongTin.voucher != null) {
       
        VoucherAPI.detail(thongTin.voucher.id).then((res) => {
          
          if (thongTin.giaGoc - totalNewBill >= res.data.dieuKien) {
            // đủ điều kiện voucher cũ
            if (res.data.loaiVoucher === "Tiền mặt") {
              
              setTienGiamHDMoi(res.data.giamToiDa);
              setTienTra(
                parseFloat(totalNewBill)-parseFloat(thongTin.giaGiamGia) + parseFloat(res.data.giamToiDa)
              );
            } else {
              // phần trăm
              setTienGiamHDMoi(
                Math.min(
                  (thongTin.giaGoc - totalNewBill) * (res.data.mucDo / 100),
                  res.data.giamToiDa
                )
              );
              setTienTra(
                totalNewBill - thongTin.giaGiamGia +
                    (parseFloat(thongTin.giaGoc) === parseFloat(totalNewBill)
                      ? 0
                      : Math.min(
                          (thongTin.giaGoc - totalNewBill) *
                            (res.data.mucDo / 100),
                          res.data.giamToiDa
                        ))
              );
            }
          } else {
            // không đủ điều kiện voucher cũ
            //trường hợp trả tất

            loadVoucherTotNhatVaVoucherTiepTheo(
              parseFloat(thongTin.giaGoc) - parseFloat(totalNewBill)
            );
          }
        });
      } else {
        // không có voucher
        loadVoucherTotNhatVaVoucherTiepTheo(thongTin.giaGoc - totalNewBill);
      }
    } else {
      setTienGiamHDMoi(0);
      setTienTra(0);
    }
  }, [newBill]);

  const handleSelectedIDSP = (selectedRowKeys) => {
    setSelectedIDSP(selectedRowKeys);
  };
  useEffect(() => {
    loadAllHDCT();
  }, [id]);
  const loadAllHDCT = () => {
    TraHangAPI.getThongTinHoaDon(id).then((res) => {
      setThongTin(res.data);
      
    });
    TraHangAPI.getHoaDonByMa(id).then((res) => {
      console.log("hóa đơn",res.data);
      setSanPhamHDCT(res.data);
    });
  };
  const handleTraHang = () => {
    if (newBill.length > 0) {
      newBill.map((spt) => {
        const data = {
          idHD: thongTin.id,
          idHDCT: spt.idHDCT,
          idCTSP: spt.idCTSP,
          soLuong: spt.soLuong,
          ghiChu: spt.ghiChu,
          tienMoi: thongTin.thanhTien - tienTra ? tienTra : 0,
        };
        console.log("sanPhamTra", data);
        if (data.ghiChu != null && data.ghiChu.trim() !== "") {
          check = 0;
          TraHangAPI.traHang(data);
          toast.success("Trả hàng thành công!", {
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
          check = 1;
        }
      });
    } else {
      toast.error("Vui lòng chọn sản phẩm muốn trả!", {
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
    if (check === 1) {
      toast.error("Vui lòng nhập ghi chú lý do sản phẩm muốn trả!", {
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
  };
  return (
    <div style={{maxHeight:"100%",height:800,minHeight:"100%",padding:0}}>
      <div className="d-flex flex-row bd-highlight mb-3">
        <h5 className="mt-1 me-2">
          <strong>Trả hàng</strong>
        </h5>
        <p className="fs-6 me-2 fw-bolder" style={{ paddingTop: "2px" }}>
          /
        </p>
        <p
          className="fs-6 fw-bolder "
          style={{ color: "#736f6f", paddingTop: "2px" }}
        >
          <strong>{id}</strong>
        </p>
      </div>

      {/* form danh sách sản phẩm */}
      <div className="row" style={{maxHeight:"100%",maxWidth:"100%",height:"100%"}}>
        <div className="col-md-8" style={{height:"100%"}}>
          <div
            className="  m-2 p-3 pt-2"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              border: "1px solid #ddd", // Border color
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
              borderRadius: "8px",
              maxWidth: "100%", // Đảm bảo div không vượt quá kích thước màn hình

            }}
          >
            <h5 className="fw-bolder">
              <LuMousePointerClick size={30} />
              <span className="ms-2">
                <strong>Chọn sản phẩm cần trả</strong>
              </span>
            </h5>
            <hr></hr>

            <TableSanPham
              onSelectedSP={handleSelectedIDSP}
              sanPhamHDCT={sanPhamHDCT}
            />
          </div>

          <div className=" d-flex flex-row mt-4" style={{ padding: "0 9px" }}>
            <div
              className="col"
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid #ddd", // Border color
                boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
                borderRadius: "8px",
                maxWidth: "100%", // Đảm bảo div không vượt quá kích thước màn hình
              }}
            >
              <h5 className="fw-bolder pt-2 ps-3">
                <MdSimCardDownload size={30} />
                <span className="ms-2">
                  <strong> Danh sách sản phẩm trả</strong>
                </span>
              </h5>
              <hr></hr>

              <TableSanPhamHoanTra
                //onSelectedSP={handleSelectedIDSP}
                sanPhamHoanTra={selectedIDSP}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="col"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              border: "1px solid #ddd", // Border color
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
              borderRadius: "8px",
              height: "100%",
              maxWidth: "100%", // Đảm bảo div không vượt quá kích thước màn hình

            }}
          >
            <h4 className="text-center mt-2" style={{ color: "green" }}>
              <b>Thông tin hoàn trả</b>
            </h4>

            <div
              style={{
                borderRadius: "5px",
                margin: "0 10px",
                padding: "10px 15px",
                backgroundColor: "#C0C0C0",
              }}
            >
              <div className="row">
                <span className="col fs-6">
                  <FaUser size={20} />
                  <span className="fw-bolder me-3">
                    <strong>Khách hàng :</strong>
                  </span>
                  <span>
                    {thongTin.nguoiDung != null
                      ? thongTin.nguoiDung.ten
                      : "Khách lẻ"}
                  </span>
                </span>
              </div>
              <div className="row mt-2">
                <span className="col fs-6 ms-1">
                  <FaBuildingUser size={20} />
                  <span className="fw-bolder me-2">
                    <strong>Người nhận :</strong>
                  </span>
                  <span>
                    {thongTin.tenNguoiNhan != null ? thongTin.tenNguoiNhan : ""}
                  </span>
                </span>
              </div>
              <div className="row mt-2">
                <span className="col fs-6">
                  <FaBuilding size={20} />
                  <span className="fw-bolder me-3">
                    <strong>Địa chỉ :</strong>
                  </span>
                  <span>{thongTin.diaChi != null ? thongTin.diaChi : ""}</span>
                </span>
              </div>
            </div>

            <div
              className="mt-2"
              style={{
                padding: "0 10px",
              }}
            >
              <h5 className="col" style={{ color: "#736f6f" }}>
                <strong>Tổng tiền hóa đơn ban đầu :</strong>
                <span className="float-end" style={{ color: "red" }}>
                  <strong>
                    {thongTin?Number(thongTin.thanhTien).toLocaleString("vi-VN"):0} VND
                  </strong>
                </span>
              </h5>
              <h5 className="col mt-3" style={{ color: "#736f6f" }}>
                <strong>Tổng tiền hóa đơn hiện tại :</strong>
                <span className="float-end" style={{ color: "red" }}>
                  <strong>
                    {totalNewBill?totalNewBill.toLocaleString("vi-VN"):0} VND
                  </strong>
                </span>
              </h5>
              <h5 className="col mt-3" style={{ color: "#736f6f" }}>
                <strong>Giảm giá</strong>
                <span className="float-end" style={{ color: "red" }}>
                  <strong>
                    {tienGiamHDMoi ? tienGiamHDMoi.toLocaleString("vi-VN") : 0}{" "}
                    VND
                  </strong>
                </span>
              </h5>
              <h5 className="col mt-3" style={{ color: "#736f6f" }}>
                <strong>Số tiền hoàn trả</strong>
                <span className="float-end" style={{ color: "red" }}>
                  <strong>
                    {tienTra ? tienTra.toLocaleString("vi-VN") : 0} VND
                  </strong>
                </span>
              </h5>
            </div>
            <div
              className="mt-4 text-center "
              style={{
                padding: "0 10px",
              }}
            >
              <button
                className="button-tra-hang"
                onClick={() => {
                  Modal.confirm({
                    title: "Thông báo",
                    content: "Bạn có chắc chắn muốn trả hàng không?",
                    onOk: () => {
                      handleTraHang();
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
                <span className="text">Trả hàng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
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
export default DetailHoaDonTraHang;
