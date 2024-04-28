import { Form, Input, InputNumber, Modal, Select } from "antd";
import ModalDiaChi from "../khachHang-management/ModalDiaChi";
import { AddressApi } from "../api/address/AddressApi";
import { useEffect, useState } from "react";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import { SellAPI } from "../api/sell/sell.api";
import { ShipAPI } from "../api/ship/ship.api";
import Moment from "moment";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ModalDiaChiUpdate = (props) => {
  const [form] = Form.useForm();
  const { openDiaChiUpdate, setOpenDiaChiUpdate } = props;
  const idHD = props.idHD;
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [diaChiHoaDon, setdiaChiHoaDon] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [timeShip, setTimeShip] = useState(0);
  const [money, setMoney] = useState(0);
  const [moneyShip, setMoneyShip] = useState(0);
  const [soTienVanChuyen, setSoTienVanChuyen] = useState(0);

  useEffect(() => {
    // form.setFieldsValue({ idNguoiDung: idKH });
    loadDiaChiHoaDon();
    loadDataProvince();
  }, []);

  const loadDiaChiHoaDon = () => {
    HoaDonAPI.detailUpdateHoaDon(idHD).then((res) => {
      setdiaChiHoaDon(res.data);
      SellAPI.getAllHDCTByHD(res.data.ma).then((res) => {
        let totalQuantity = 0;
        res.data.forEach((hdct) => {
          totalQuantity += hdct.soLuong;
        });
        setQuantity(totalQuantity);
      });

      if (res.data.diaChi && res.data.diaChi != null) {
        const firstIndex = res.data.diaChi.indexOf("/");
        const secondIndex = res.data.diaChi.indexOf("/", firstIndex + 1);
        const thirdIndex = res.data.diaChi.indexOf("/", secondIndex + 1);

        const diaChi = res.data.diaChi.substring(0, firstIndex);
        const xa = res.data.diaChi.substring(firstIndex + 1, secondIndex);
        const huyen = res.data.diaChi.substring(secondIndex + 1, thirdIndex);
        const tp = res.data.diaChi.substring(thirdIndex + 1);
        
        setProvinceID(
          listProvince.filter(
            (item) =>
              item.ProvinceName.toLowerCase().replace(/\s/g, "") ===tp.toLowerCase().replace(/\s/g, "")
          )[0]
        );
      
        if (ProvinceID) {
          AddressApi.fetchAllProvinceDistricts(
            listProvince.filter(
              (item) =>
                item.ProvinceName.toLowerCase().replace(/\s/g, "") ===tp.toLowerCase().replace(/\s/g, "")
            )[0].ProvinceID
          ).then((res) => {
            setListDistricts(res.data.data);
            setDistrictID(
              res.data.data.filter(
                (item) =>
                  item.NameExtension[0].toLowerCase().replace(/\s/g, "") ===huyen.toLowerCase().replace(/\s/g, "")
              )[0].DistrictID
            );
            AddressApi.fetchAllProvinceWard(
              res.data.data.filter(
                (item) =>
                  item.NameExtension[0].toLowerCase().replace(/\s/g, "") ===huyen.toLowerCase().replace(/\s/g, "")
              )[0].DistrictID
            ).then((res) => {
              setListWard(res.data.data);
              setWardCode(
                res.data.data.filter(
                  (item) =>
                    item.NameExtension[0].toLowerCase().replace(/\s/g, "") ===xa.toLowerCase().replace(/\s/g, "")
                )[0].WardCode
              );
             
            });
          });
        }
        form.setFieldsValue({
          tenNguoiNhan: res.data.tenNguoiNhan,
          sdt: res.data.sdt,
          ghiChu: res.data.ghiChu,
          tenThanhPho: tp,
          tenHuyen: huyen,
          tenXa: xa,
          diaChi: diaChi,
        });
        
      }
    });
  };

  const handleClose = () => {
    setOpenDiaChiUpdate(false);
  };
  const loadTimeAndMoney = async (districtID, valueWard, quantity) => {
    setTimeShip(
      await ShipAPI.fetchAllDayShip(districtID, valueWard).then(
        (res) => res.data.data.leadtime * 1000
      )
    );

    setMoney(
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
  const handleSubmit = (value) => {
    const data =  {
        tenNguoiNhan: value.tenNguoiNhan,
        soDienThoai: value.sdt,
        diaChi:
          value.diaChi +
          "/" +
          value.tenXa +
          "/" +
          value.tenHuyen +
          "/" +
          value.tenThanhPho,
        ngayDuKienNhan:
          timeShip ? timeShip : diaChiHoaDon.ngayDuKienNhan,
        tienVanChuyen: moneyShip ?  roundToThousands(
          moneyShip
        ):diaChiHoaDon.tienVanChuyen,
        ghiChu: value.ghiChu
      };
   
    SellAPI.updateVanChuyen(diaChiHoaDon.ma, data);
  };

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };

  const [ProvinceID, setProvinceID] = useState(null);
  const [DistrictID, setDistrictID] = useState(null);
  const [WardCode, setWardCode] = useState(null);

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
    setProvinceID(valueProvince.valueProvince);
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
    setDistrictID(valueDistrict.valueDistrict);
  };

  const handleWardChange = (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWardCode(valueWard.valueWard);
    loadTimeAndMoney(DistrictID,valueWard.valueWard,quantity);
  };

  return (
    <Modal
      title="Update địa chỉ"
      centered
      open={openDiaChiUpdate}
      onCancel={handleClose}
      onOk={() => {
        Modal.confirm({
          title: "Thông báo",
          content:
            "Bạn có chắc chắn muốn sửa thông tin đặt hàng không?",
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
      height={300}
      width={1000}
      zIndex={2}
      style={{ top: -200 }}
    >
      <Form
        form={form}
        initialValues={diaChiHoaDon}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <div className="row">
          <div className="col">
            <Form.Item
              name="tenNguoiNhan"
              label="Họ và tên"
              tooltip="Họ tên đầy đủ của bạn là gì?"
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
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input
                onKeyPress={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
                // style={{ textAlign: "center" }}
              />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item
              name="sdt"
              label="Số điện thoại"
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
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <Form.Item
              name="tenThanhPho"
              label="Tỉnh/Thành phố"
              tooltip="Tỉnh/Thành phố của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
                  whitespace: true,
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Select defaultValue={""} onChange={handleProvinceChange}>
                <Select.Option value="">--Chọn Tỉnh/Thành phố--</Select.Option>
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
          </div>
          <div className="col-md-4">
            {" "}
            <Form.Item
              name="tenHuyen"
              label="Quận/Huyện"
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
              <Select defaultValue={""} onChange={handleDistrictChange}>
                <Select.Option value="">--Chọn Quận/Huyện--</Select.Option>
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
          </div>
          <div className="col-md-4">
            <Form.Item
              name="tenXa"
              label="Xã/Phường"
              tooltip="Xã/Phường của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy chọn Xã/Phường.",
                  whitespace: true,
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Select defaultValue={""} onChange={handleWardChange}>
                <Select.Option value="">--Chọn Xã/Phường--</Select.Option>
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
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item
              name="diaChi"
              label="Số nhà"
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
              <Input />
            </Form.Item>
          </div>
          <div className="col">
            {" "}
            <Form.Item
              name="ghiChu"
              label="Ghi chú"
              tooltip="Họ tên đầy đủ của bạn là gì?"
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input
                onKeyPress={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
                // style={{ textAlign: "center" }}
              />
            </Form.Item>
          </div>
        </div>
      </Form>

      <div>
        <p>Thời gian dự kiến giao hàng là : {timeShip
                  ?Moment(timeShip).format("DD/MM/yyyy")
                  : Moment(diaChiHoaDon.ngayDuKienNhan).format(
                      "DD/MM/yyyy"
                    )}
              </p>
        <p> Phí giao hàng là: {" "}
                              <InputNumber
                                value={
                                  soTienVanChuyen === 0 ? `${Intl.NumberFormat("en-US").format(                
                                    moneyShip? moneyShip:diaChiHoaDon.tienVanChuyen                  
                                        )}`                     
                                    : Intl.NumberFormat("en-US").format(
                                        soTienVanChuyen
                                      )
                                }
                                onChange={(value) => setMoneyShip(value)}
                              />đ</p>
      </div>
    </Modal>
  );
};
export default ModalDiaChiUpdate;
function roundToThousands(amount) {
  return Math.round(amount / 100) * 100;
}