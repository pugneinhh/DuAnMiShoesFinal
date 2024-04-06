import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Table,
  Space,
  Tag,
  Badge,
  Col,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { LuMousePointerClick } from "react-icons/lu";
import { useParams } from "react-router-dom";
import TableSanPham from "./TableSanPham";
import { MdSimCardDownload } from "react-icons/md";
import { FaBuilding, FaUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import TableSanPhamHoanTra from "./TableSanPhamHoanTra";
import { TraHangAPI } from "../api/traHang/traHang.api";

const DetailHoaDonTraHang = () => {
  const [form] = Form.useForm();
    const [selectedIDSP, setSelectedIDSP] = useState([]);
    const [sanPhamHDCT,setSanPhamHDCT]=useState([]);
    const { id } = useParams("");
  const handleSelectedIDSP = (selectedRowKeys) => {
    setSelectedIDSP(selectedRowKeys);
    console.log("select sản phẩm trả",selectedRowKeys)
  };
  useEffect(()=>{
    loadAllHDCT();
  },[id])
  const loadAllHDCT=()=>{
    console.log("ma",id);

    TraHangAPI.getHoaDonByMa(id).then((res)=>{
      console.log("trả hàng hóa đơn",res.data);
      setSanPhamHDCT(res.data);
    })
  }
  return (
    <div>
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

        <TableSanPham onSelectedSP={handleSelectedIDSP} sanPhamHDCT={sanPhamHDCT} />
      </div>

      <div className=" d-flex flex-row mt-4" style={{ padding: "0 9px" }}>
        <div
          className="col-md-9 "
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

          <TableSanPhamHoanTra onSelectedSP={handleSelectedIDSP} sanPhamHoanTra={selectedIDSP} />
        </div>
        <div
          className="col-md-3"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
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
                <span>Nguyễn Thị Phương Anh</span>
              </span>
            </div>
            <div className="row mt-2">
              <span className="col fs-6 ms-1">
                <FaBuildingUser size={20} />
                <span className="fw-bolder me-2">
                  <strong>Người nhận :</strong>
                </span>
                <span>Nguyễn Thị Phương Anh</span>
              </span>
            </div>
            <div className="row mt-2">
              <span className="col fs-6">
                <FaBuilding size={20} />
                <span className="fw-bolder me-3">
                  <strong>Địa chỉ :</strong>
                </span>
                <span>
                  Số 16, Ngõ 406, phường xuân phương, nam từ liêm, hà nội
                </span>
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
              <strong>Tổng tiền</strong>
              <span className="float-end" style={{ color: "red" }}>
                <storng>0 VND</storng>
              </span>
            </h5>
            <h5 className="col mt-3" style={{ color: "#736f6f" }}>
              <strong>Giảm giá</strong>
              <span className="float-end" style={{ color: "red" }}>
                <storng>0 VND</storng>
              </span>
            </h5>
            <h5 className="col mt-3" style={{ color: "#736f6f" }}>
              <strong>Số tiền hoàn trả</strong>
              <span className="float-end" style={{ color: "red" }}>
                <storng>0 VND</storng>
              </span>
            </h5>
          </div>
          <div
            className="mt-4 text-center "
            style={{
              padding: "0 10px",
            }}
          >
            <button class="button-tra-hang">
              <span class="text">Trả hàng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailHoaDonTraHang;
