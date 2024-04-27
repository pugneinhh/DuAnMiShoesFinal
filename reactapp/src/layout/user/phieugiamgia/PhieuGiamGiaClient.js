import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { get } from "local-storage";
import ProfileMenu from "../profile/ProfileMenu";
import { SellAPI } from "../../../pages/censor/api/sell/sell.api";
import "./phieugiamgia.css"
const PhieuGiamGiaCLient = (props) => {
  const storedData = get("userData");
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const nav = useNavigate();
  const [datas, setData] = useState([]);
  const loadVoucher = () => {
    SellAPI.getVoucherWithIDKH(storedData.userID)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setUserName(storedData.ten);
    setLinkAnhUser(storedData.anh);
    loadVoucher();
  }, []);

  const muaNgay = () => {
    nav("/san-pham");
  };
  return (
    <div className="row" style={{height:705}}>
      <ProfileMenu></ProfileMenu>
      <div
        className="col-md-10 "
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <div
          style={{
            padding: "0 10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h5>Phiếu giảm giá</h5>
          <p>Các voucher bạn có thể sử dụng</p>
        </div>
        <div
          className="row mt-5"
          style={{
            padding: "0 30px",
          }}
        >
          {datas.map((item, index) => (
            <div className="col-md-4">
              <div class="cardPhieuGiamGia">
                <div class="cardribbon">
                  {item.mucDo.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}

                  <span>{item.loaiVoucher === "Tiền mặt" ? "VND" : "%"}</span>
                </div>
                <h3>{item.ma}</h3>

                <h6>
                  Điều kiện:
                  <span className="text-danger ms-2">
                    {item.dieuKien.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h6>

                <h6>
                  Giảm tối đa:
                  <span className="text-danger ms-2">
                    {item.giamToiDa.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h6>

                <h6>
                  Số ngày còn lại:
                  <span className="text-danger ms-2">{item.ngayConLai}</span>
                </h6>
                <div className="text-end">
                  <button className=" btn btn-danger" onClick={muaNgay}>
                    Sử dụng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* tab */}
    </div>
  );
};
export default PhieuGiamGiaCLient;
