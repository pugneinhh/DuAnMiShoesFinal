import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Divider,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTag } from "react-icons/fa";
import TableKhachHang from "./tableKhachHang";
import {  useNavigate } from "react-router-dom";

const ModelUpdateVoucher = (props) => {
  const navigate = useNavigate();
  const { id } = useParams("");
  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const [dataUpdate, setDataUpdate] = useState({});
  const [khachHang, setKhachHang] = useState([]);

  const [form2] = Form.useForm();

  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  //lấy ra detail voucher
  const detailVoucher = async () => {
    axios
      .get(`http://localhost:8080/voucher/detail/${id}`)
      .then((response) => {

        form2.setFieldsValue({
          id: response.data.id,
          ma: response.data.ma,
          ten: response.data.ten,
          mucDo: response.data.mucDo,
          giamToiDa: response.data.giamToiDa,
          dieuKien: response.data.dieuKien,
          ngayKetThuc: moment(response.data.ngayKetThuc, "YYYY-MM-DD HH:mm:ss"),
          ngayBatDau: moment(response.data.ngayBatDau, "YYYY-MM-DD HH:mm:ss"),
          loaiVoucher: response.data.loaiVoucher,
          soLuong: response.data.soLuong,
        });
        setDataUpdate(response.data);
        console.log(response.data);
        console.log(dataUpdate);
      })
      .catch((error) => console.error("Error upfate item:", error));
  };


  const handleClose = () => {
    form2.resetFields();
    setDataUpdate({});
    console.log("đóng");
  };
  

  const loadKH = async () => {
    const x = await axios.get(
      `http://localhost:8080/nguoi-dung-voucher/voucher/${id}`
    );
    console.log("id:",id)
    console.log("id khach hang",x.data); 
    setKhachHang(x.data);
  };

  useEffect(() => {
    detailVoucher();
    loadKH();
  }, []);

  const [selectedIDKH, setSelectedIDKH] = useState([]);

  const handleSelectedIDKH = (selectedRowKeys) => {
    setSelectedIDKH(selectedRowKeys);
  };
  const handleUpdateVoucher = (value) => {
    axios
      .put(`http://localhost:8080/voucher/update/${id}`, value)
      .then((response) => {
        navigate("/voucher");
        toast("✔️ Cập nhật thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.loadVoucher();
        form2.resetFields();
        handleClose();
      })
      .catch((error) => console.error("Error upfate item:", error));
  };

  ///validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = form2;
    const startDate = getFieldValue("ngayBatDau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return Promise.resolve();
  };
  const [checkNgay, setCheckNgay] = useState(false);
  const validateDateBD = (_, value) => {
    const { getFieldValue } = form2;
    const endDate = getFieldValue("ngayKetThuc");
    if (endDate && value && value.isAfter(endDate)) {
      return Promise.reject("Ngày bắt đầu phải trước ngày kết thúc");
    }

    return Promise.resolve();
  };

  return (
    <div
      className="container-fluid  m-2 p-3 pt-2"
      // style={{
      //   border: "1px solid #ddd", // Border color
      //   boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
      //   borderRadius: "8px",
      // }}
    >
      <div className="row">
        <Divider orientation="center" color="none">
          <h4 className="text-first pt-1 fw-bold">
            <FaTag size={20} />
            Cập nhật phiếu giảm giá
          </h4>
        </Divider>
        <div
          className="bg-light col-md-4"
          orientation="center"
          style={{
            border: "1px solid #ddd",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: 10,
            height: 600,
          }}
        >
          <h4 className="text-center">Thông tin phiếu giảm giá</h4>
          {/* form add voucher */}
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
            onFinish={handleUpdateVoucher}
            form={form2}
          >
            <div className="col-md-4">
              <Form.Item
                label="Mã phiếu giảm giá"
                style={{ paddingLeft: 0, width: 550 }}
                name="ma"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống mã!",
                  },
                ]}
              >
                <Input
                  placeholder="Mã giảm giá"
                  className="border-warning"
                  style={{ marginLeft: 20, width: 220 }}
                />
              </Form.Item>
              <Form.Item
                label="Tên phiếu giảm giá"
                name="ten"
                style={{ paddingLeft: 0, width: 550 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống tên!",
                  },
                ]}
              >
                <Input
                  placeholder="Tên phiếu giảm giá"
                  className="border-warning"
                  style={{ marginLeft: 20, width: 220 }}
                />
              </Form.Item>
              <Form.Item
                label="Loại voucher"
                name="loaiVoucher"
                style={{ borderColor: "yellow", marginLeft: 0, width: 550 }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại voucher!",
                  },
                ]}
              >
                <Select
                  defaultValue={"Tiền mặt"}
                  style={{ borderColor: "yellow", marginLeft: 20, width: 220 }}
                  onChange={handleChange}
                >
                  <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                  <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Số lượng"
                name="soLuong"
                style={{ marginLeft: 0, width: 550 }}
              >
                <InputNumber
                  className="border-warning"
                  style={{ marginLeft: 20, width: 220 }}
                  defaultValue={"1"}
                  min={1}
                />
              </Form.Item>

              <Form.Item
                label="Mức độ"
                style={{ marginLeft: 0, width: 550 }}
                name="mucDo"
              >
                {selectedValue === "Tiền mặt" ? (
                  <InputNumber
                    className="border-warning"
                    defaultValue={0}
                    formatter={(value) =>
                      `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                    style={{ marginLeft: 20, width: 220 }}
                  />
                ) : (
                  <InputNumber
                    className="border-warning"
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    style={{ marginLeft: 20, width: 220 }}
                  />
                )}
              </Form.Item>
              <Form.Item
                label="Giảm tối đa"
                name="giamToiDa"
                style={{ marginLeft: 0, width: 550 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá trị giảm tối đa!",
                  },
                ]}
              >
                <InputNumber
                  className="border-warning"
                  defaultValue={0}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                  style={{ marginLeft: 20, width: 220 }}
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Điều kiện"
                name="dieuKien"
                style={{ marginLeft: 0, width: 550 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập điều kiện giảm!",
                  },
                ]}
              >
                <InputNumber
                  className="border-warning"
                  defaultValue={0}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                  style={{ marginLeft: 20, width: 220 }}
                />
              </Form.Item>
              <Form.Item
                label="Ngày bắt đầu"
                name="ngayBatDau"
                style={{ marginLeft: 0, width: 550 }}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày bắt đầu!",
                  },
                  { validator: validateDateBD },
                ]}
              >
                <DatePicker
                  showTime
                  style={{ marginLeft: 20, width: 220 }}
                  className="border-warning"
                  placeholder="Ngày bắt đầu"
                />
              </Form.Item>
              <Form.Item
                label="Ngày kết thúc"
                style={{ marginLeft: 0, width: 550 }}
                name="ngayKetThuc"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày kết thúc!",
                  },
                  { validator: validateDateKT },
                ]}
              >
                <DatePicker
                  showTime
                  style={{ marginLeft: 20, width: 220 }}
                  className="border-warning"
                  placeholder="Ngày kết thúc"
                />
              </Form.Item>
            </div>
            {/* <div className="col-md-4"></div>
<div className="col-md-1"></div> */}
            <div className="text-end">
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn cập nhật không?",
                      onOk: () => {
                        form2.submit();
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
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div
          className="bg-light col"
          style={{
            border: "1px solid #ddd",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 15,
          }}
        >
          <p className="fw-bold" style={{ marginTop: 10 }}>
            Khách hàng
          </p>
          <TableKhachHang onSelectedKH={handleSelectedIDKH} suaKH={khachHang} />
        </div>
      </div>
      {/* <ToastContainer
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
      <ToastContainer /> */}
    </div>
  );
};
export default ModelUpdateVoucher;