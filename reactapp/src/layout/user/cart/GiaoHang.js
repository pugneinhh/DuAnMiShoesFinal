import { Col, Form, Input, Select, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { AddressApi } from "../api/address/AddressApi";
import { AddressApi } from "../../../pages/censor/api/address/AddressApi";
// import { ShipAPI } from "../api/ship/ship.api";
import { ShipAPI } from "../../../pages/censor/api/ship/ship.api";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { SellAPI } from "../../../pages/censor/api/sell/sell.api";
// import { SellAPI } from "../api/sell/sell.api";
import { toast, ToastContainer } from "react-toastify";
import { UpdateVanChuyenToBill } from "../../../store/reducer/Bill.reducer";
import { dispatch } from "../../../store/redux/store";

const DiaChiGiaoHang = ({ money, quantity, hoaDon, thongTinVanChuyen }) => {
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [timeShip, setTimeShip] = useState("");
  const [moneyShip, setMoneyShip] = useState();
  const [nameClient, setNameClient] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const [thanhPho, setThanhPho] = useState("");
  const [quan, setQuan] = useState("");
  const [phuong, setPhuong] = useState("");
  const [soNha, setSoNha] = useState("");
  const [form] = Form.useForm();
  const nav = useNavigate();
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };
  const loadTimeAndMoney = async (districtID, valueWard, quantity) => {
    setTimeShip(
      await ShipAPI.fetchAllDayShip(districtID, valueWard).then(
        (res) => res.data.data.leadtime * 1000
      )
    );
    money(
      await ShipAPI.fetchAllMoneyShip(districtID, valueWard, quantity).then(
        (res) => res.data.data.total
      )
    );
    setMoneyShip(
      await ShipAPI.fetchAllMoneyShip(districtID, valueWard, quantity).then(
        (res) => res.data.data.total
      )
    );
  };
  console.log("Thông tin vận chuyển", thongTinVanChuyen);
  let indexThanhPhoDaCo = "";
  let thanhPhoDaCo = "";
  let diaChi1 = "";
  let indexQuanDaCo = "";
  let quanDaCo = "";
  let diaChi2 = "";
  let indexPhuongDaCo = "";
  let phuongDaCo = "";
  let diaChi3 = "";
  let indexSoNhaDaCo = "";
  let soNhaDaCo = "";
  if (thongTinVanChuyen) {
    indexThanhPhoDaCo = thongTinVanChuyen.diaChi.lastIndexOf("/");
    thanhPhoDaCo = thongTinVanChuyen.diaChi.substring(
      indexThanhPhoDaCo + 1,
      thongTinVanChuyen.diaChi.length
    );
    diaChi1 = thongTinVanChuyen.diaChi.substring(0, indexThanhPhoDaCo);
    indexQuanDaCo = diaChi1.lastIndexOf("/");
    quanDaCo = diaChi1.substring(indexQuanDaCo + 1, diaChi1.length);
    diaChi2 = diaChi1.substring(0, indexQuanDaCo);
    indexPhuongDaCo = diaChi2.lastIndexOf("/");
    phuongDaCo = diaChi2.substring(indexPhuongDaCo + 1, diaChi2.length);
    diaChi3 = diaChi2.substring(0, indexPhuongDaCo);
    indexSoNhaDaCo = diaChi3.lastIndexOf("/");
    soNhaDaCo = diaChi3.substring(indexSoNhaDaCo + 1, diaChi3.length);
    let districtID = "";
    let valueWard = "";
    let codeProvince = "";
    //  AddressApi.fetchAllProvince().then((res) => {
    //   codeProvince = res.data.data.filter((i) => i.ProvinceName === thanhPhoDaCo)[0].ProvinceID;

    // });

    // AddressApi.fetchAllProvinceDistricts(codeProvince).then(
    //   (res) => {
    //      districtID = res.data.data?.fillter((i) => i.DistrictName === quanDaCo)[0].DistrictID;
    //   })
    //   console.log("ID district",districtID);

    //   AddressApi.fetchAllProvinceWard(districtID).then((res) => {
    //     valueWard = res.data.data.fillter((i) => i.WardName === phuongDaCo)[0].WardCode;
    //   });
    //  loadTimeAndMoney(districtID,valueWard,quantity);
  }
  console.log("Thành phố đã có", thanhPhoDaCo);
  console.log("Quận đã có", quanDaCo);
  console.log("Phường đã có", phuongDaCo);
  console.log("Số nhà đã có", soNhaDaCo);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const handleSubmit = async (value) => {
    console.log(value);
    console.log(money);
    dispatch(
      UpdateVanChuyenToBill({
        tenNguoiNhan: value.tenNguoiNhan,
        soDienThoai: value.soDienThoai,
        email: value.email,
        diaChi:
          value.soNha +
          "/" +
          value.tenXa +
          "/" +
          value.tenHuyen +
          "/" +
          value.tenThanhPho,
        ngayDuKienNhan: timeShip,
        tienVanChuyen: moneyShip,
      })
    );
    const data = [
      {
        tenNguoiNhan: value.tenNguoiNhan,
        soDienThoai: value.soDienThoai,
        email: value.email,
        diaChi:
          value.soNha +
          "/" +
          value.tenXa +
          "/" +
          value.tenHuyen +
          "/" +
          value.tenThanhPho,
        ngayDuKienNhan: timeShip,
        tienVanChuyen: moneyShip,
      },
    ];
    console.log("dâta", data[0]);
    await SellAPI.updateVanChuyen(hoaDon, data[0]);
  };

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
    setProvince(valueProvince);
    setThanhPho(value);
  };

  const handleNameChange = (value) => {
    setNameClient(value);
    console.log("Tên", value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleSDTChange = (value) => {
    setSDT(value);
  };

  const handleSoNhaChange = (value) => {
    setSoNha(value);
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    setDistrictID(valueDistrict.valueDistrict);
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
    setDistrict(valueDistrict);
    setQuan(value);
  };

  const handleWardChange = async (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWardCode(valueWard.valueWard);
    setTimeShip(
      await ShipAPI.fetchAllDayShip(districtID, valueWard.valueWard).then(
        (res) => res.data.data.leadtime * 1000
      )
    );
    money(
      await ShipAPI.fetchAllMoneyShip(
        districtID,
        valueWard.valueWard,
        quantity
      ).then((res) => res.data.data.total)
    );
    console.log(
      await ShipAPI.fetchAllDayShip(districtID, valueWard.valueWard).then(
        (res) => res.data.data.leadtime * 1000
      )
    );
    setMoneyShip(
      await ShipAPI.fetchAllMoneyShip(
        districtID,
        valueWard.valueWard,
        quantity
      ).then((res) => res.data.data.total)
    );
    setPhuong(value);
    setWard(valueWard);
  };

  const changeQuantity = async () => {
    if (districtID && wardCode) {
      money(
        await ShipAPI.fetchAllMoneyShip(districtID, wardCode, quantity).then(
          (res) => res.data.data.total
        )
      );
    }
  };
  useEffect(() => {
    changeQuantity();
    console.log("Số lượng thay đổi", quantity);
  }, [quantity]);

  useEffect(() => {
    loadDataProvince();
  }, []);
  return (
    <>
      <Form className="mt-4" onFinish={handleSubmit} form={form}>
        <Col span={25} style={{ marginRight: "20px" }}>
          <Form.Item
            name="tenNguoiNhan"
            tooltip="Họ tên đầy đủ của bạn là gì?"
            onChange={handleNameChange}
            rules={[
              {
                required: true,
                message: "Vui lòng hãy nhập họ và tên.",
                whitespace: true,
              },
              {
                pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
                message: "Họ và tên chỉ được phép chứa chữ cái.",
              },
            ]}
          >
            <Input
              onKeyPress={(e) => {
                if (e.key === " " && e.target.selectionStart === 0) {
                  e.preventDefault();
                }
              }}
              placeholder="Nhập họ và tên"
              defaultValue={
                thongTinVanChuyen ? thongTinVanChuyen.tenNguoiNhan : ""
              }
              // value={""}
              // onChange={handleNameChange}
            />
          </Form.Item>
          <Form.Item
            name="soDienThoai"
            tooltip="Số điện thoại của bạn là gì?"
            rules={[
              {
                required: true,
                message: "Vui lòng hãy nhập số điện thoại.",
                whitespace: true,
              },
              {
                pattern: /^0\d{9}$/,
                message: "Vui lòng nhập số điện thoại hợp lệ.",
              },
            ]}
          >
            <Input
              placeholder="Nhập số điện thoại"
              onChange={handleSDTChange}
              defaultValue={
                thongTinVanChuyen ? thongTinVanChuyen.soDienThoai : ""
              }
            />
          </Form.Item>
          <Form.Item
            name="email"
            tooltip="Email của bạn là gì?"
            rules={[
              {
                required: true,
                message: "Vui lòng hãy nhập email.",
                whitespace: true,
              },
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email.",
              },
            ]}
          >
            <Input
              placeholder="Nhập email"
              onChange={handleEmailChange}
              defaultValue={thongTinVanChuyen ? thongTinVanChuyen.email : ""}
            />
          </Form.Item>

          <Form.Item
            name="tenThanhPho"
            tooltip="Tỉnh/Thành phố của bạn là gì?"
            rules={[
              {
                required: true,
                message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
                whitespace: true,
              },
            ]}
          >
            <Select
              defaultValue={thanhPhoDaCo ? thanhPhoDaCo : null}
              onChange={handleProvinceChange}
            >
              <Select.Option>--Chọn Tỉnh/Thành phố--</Select.Option>
              {listProvince?.map((item) => {
                return (
                  <Select.Option
                    key={item.ProvinceID}
                    value={item.ProvinceName}
                    valueProvince={item.ProvinceID}
                  >
                    {item.ProvinceName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="tenHuyen"
            tooltip="Quận/Huyện của bạn là gì?"
            rules={[
              {
                required: true,
                message: "Vui lòng hãy chọn Quận/Huyện.",
                whitespace: true,
              },
            ]}
            // labelCol={{ span: 9 }}
            // wrapperCol={{ span: 15 }}
          >
            <Select
              defaultValue={quanDaCo ? quanDaCo : null}
              onChange={handleDistrictChange}
            >
              <Select.Option>--Chọn Quận/Huyện--</Select.Option>
              {listDistricts?.map((item) => {
                return (
                  <Select.Option
                    key={item.DistrictID}
                    value={item.DistrictName}
                    valueDistrict={item.DistrictID}
                  >
                    {item.DistrictName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="tenXa"
            tooltip="Xã/Phường của bạn là gì?"
            rules={[
              {
                required: true,
                message: "Vui lòng hãy chọn Xã/Phường.",
                whitespace: true,
              },
            ]}
          >
            <Select
              defaultValue={phuongDaCo ? phuongDaCo : null}
              onChange={handleWardChange}
            >
              <Select.Option>--Chọn Xã/Phường--</Select.Option>
              {listWard?.map((item) => {
                return (
                  <Select.Option
                    key={item.WardCode}
                    value={item.WardName}
                    valueWard={item.WardCode}
                  >
                    {item.DistrictName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="soNha"
            tooltip="Số nhà của bạn là gì?"
            rules={[
              {
                required: true,
                message: "Vui lòng hãy nhập số nhà.",
                whitespace: true,
              },
            ]}
            // labelCol={{ span: 9 }}
            // wrapperCol={{ span: 15 }}
          >
            <Input
              placeholder="Nhập số nhà "
              onChange={handleSoNhaChange}
              defaultValue={soNhaDaCo ? soNhaDaCo : null}
            />
          </Form.Item>
        </Col>

        <div className="row mt-2">
          <div className="col-md-4">
            <img src={LogoGHN} style={{ width: 200, height: 70 }}></img>
          </div>
          <div className="col-md-6 align-self-center fw-bold">
            <p>
              Thời gian giao hàng dự kiến :{" "}
              <span className="text-danger">
                {/* {new Date(timeShip * 1).getDate()} / {new Date(timeShip * 1).getUTCMonth()} / {new Date(timeShip * 1).getFullYear()} */}
                {thongTinVanChuyen
                  ? thongTinVanChuyen.ngayDuKienNhan
                  : timeShip
                  ? new Date(timeShip).toLocaleDateString()
                  : "dd/MM/yyyy"}
              </span>
            </p>
          </div>
        </div>
        {/* <Button
          className=" mt-2 me-5 bg-success float-end bg-black"
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: "Thông báo",
              content: "Bạn có chắc chắn muốn đặt hàng không?",
              onOk: () => {
                form.submit();

                toast("✔️ Cập nhật hóa đơn thành công!", {
                  position: "top-right",
                  autoClose: 1000,
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
          Xác nhận đặt hàng
        </Button> */}
      </Form>
    </>
  );
};
export default DiaChiGiaoHang;
