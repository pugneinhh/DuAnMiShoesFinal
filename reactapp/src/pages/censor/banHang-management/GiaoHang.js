import { Col, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddressApi } from "../api/address/AddressApi";
import LogoGHN from "../../../assets/images/LogoGHN.png";
const DiaChiGiaoHang = (props) => {
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
   const [form] = Form.useForm();
  const nav = useNavigate();
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then((res) => {
      setListProvince(res.data.data);
    });
  };

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
    setProvince(valueProvince);
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
    setDistrict(valueDistrict);
  };

  const handleWardChange = (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWard(valueWard);
  };

  useEffect(() => {
    loadDataProvince();
  }, []);
  return (
    <>
      <Form className="mt-4">
        <Col span={25} style={{ marginRight: "20px" }}>
          <Form.Item
            name="ten"
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
          >
            <Input
              onKeyPress={(e) => {
                if (e.key === " " && e.target.selectionStart === 0) {
                  e.preventDefault();
                }
              }}
              placeholder="Nhập họ và tên"
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
            <Input placeholder="Nhập số điện thoại" />
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
            <Input placeholder="Nhập email" />
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

          <Form.Item
            name="diaChi"
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
            <Input placeholder="Nhập số nhà " />
          </Form.Item>
        </Col>
      </Form>

      <div className="row mt-2">
        <div className="col-md-4">
          <img src={LogoGHN} style={{ width: 200, height: 70 }}></img>
        </div>
        <div className="col-md-6 align-self-center fw-bold">
          <p >
            Thời gian giao hàng dự kiến : <span className="text-danger"> 31/01/2024</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default DiaChiGiaoHang;
