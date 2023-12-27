import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Modal,
  Divider,
} from "antd";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaTag } from "react-icons/fa";


import TableKhachHang from "./tableKhachHang";
const AddVoucher = () => {
  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [form] = Form.useForm();
  const handleSubmit = (value) => {
    // Swal.fire({
    //   title: "Thông báo",
    //   text: "Bạn muốn thêm voucher!",
    //   icon: "infor",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Có",
    //   cancelButtonText: "Hủy",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    // promotionService
    //   .changeStatusPromotion(row.promotionID)
    //   .then((res) => {
    //
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log(value);
    axios
      .post("http://localhost:8080/voucher/add", value)
      .then((response) => {
        // Update the list of items
        console.log(response.data);
        toast("✔️ Thêm thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

const AddVoucher=()=>{
    const [selectedValue, setSelectedValue] = useState('Tiền mặt');
    const handleChange = (value) => {
        console.log(`Selected value: ${value}`);
        setSelectedValue(value);
      };
      const [componentSize, setComponentSize] = useState('default');
      const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
      };
  
    
      const [form] = Form.useForm();
      const handleSubmit = (value) => {
        // Swal.fire({
        //   title: "Thông báo",
        //   text: "Bạn muốn thêm voucher!",
        //   icon: "infor",
        //   showCancelButton: true,
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   confirmButtonText: "Có",
        //   cancelButtonText: "Hủy",
        // }).then((result) => {
        //   if (result.isConfirmed) {
            // promotionService
            //   .changeStatusPromotion(row.promotionID)
            //   .then((res) => {
            //     
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
            console.log(value);
            axios.post('http://localhost:8080/voucher/add',value)
        .then(response => {
            // Update the list of items
                  console.log(response.data);
                  toast('✔️ Thêm thành công!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                  
                  form.resetFields();
            
        })
        .catch(error => console.error('Error adding item:', error));
        
      }
       ///validate ngày 
    const validateDateKT = (_, value) => {
        const { getFieldValue } = form;
        const startDate = getFieldValue('ngayBatDau');
        if (startDate && value &&value.isBefore(startDate)) {
          return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
        }
        return Promise.resolve();
      };
      const [checkNgay,setCheckNgay]=useState(false);
  
      const validateDateBD = (_, value) => {
        const newDate = new Date();
        // if(startDate && value && value.isAfter(moment)){
        //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
        // }
        const { getFieldValue } = form;
        const endDate = getFieldValue('ngayKetThuc');
        if(endDate && value && value.isAfter(endDate)){
          return Promise.reject('Ngày bắt đầu phải trước ngày kết thúc');
        }
        if ( value && value<newDate) {
          return Promise.reject('Ngày bắt phải sau ngày hiện tại');
        }
        return Promise.resolve();
      };
      //hiển thị số lượng
      const [gioiHan,setGioiHan]=useState(false);
      const handleChangeSwitch=(value)=>{
        setGioiHan(value);
      };

    return(
      <div className='container'>
        <div className='container-fluid bg-light m-2 p-3 pt-2' style={{border: '1px solid #ddd', // Border color
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
        borderRadius: '8px'}}>
        <h4 className='text-center'>Thêm phiếu giảm giá</h4>
        {/* form add voucher */}
        <Form className="row col-md-12 mt-3"

labelCol={{
span: 10,
}}
wrapperCol={{
span: 20,
}}
layout="horizontal"
initialValues={{
size: componentSize,
}}
onValuesChange={onFormLayoutChange}
size={componentSize}
style={{
maxWidth: 1000,
}}
onFinish={handleSubmit}
form={form}

>
<div className="col-md-4">
<Form.Item label="Mã phiếu giảm giá" name='ma' hasFeedback rules={[
{
required: true,
message: 'Vui lòng không để trống mã!',
},
]}   >
<Input  placeholder='Mã giảm giá' className='border-warning'/>
</Form.Item>
<Form.Item label="Tên phiếu giảm giá" name='ten' hasFeedback rules={[
{
required: true,
message: 'Vui lòng không để trống tên!',
},
]}   >
<Input  placeholder='Tên phiếu giảm giá' className='border-warning'/>
</Form.Item>
<Form.Item label="Loại voucher" name='loaiVoucher' style={{borderColor:'yellow'}} rules={[
{
required: true,
message: 'Vui lòng chọn loại voucher!',
},
]} >
<Select defaultValue={'Tiền mặt'} style={{borderColor:'yellow'}} onChange={handleChange}>
 <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
 <Select.Option value="Phần trăm">Phần trăm</Select.Option>
</Select>
</Form.Item>



</div>

<div className='col-md-4'>

<Form.Item label="Số lượng" name='soLuong'>
<InputNumber  className='border-warning' defaultValue={'1'} min={1}/>
</Form.Item>
<Form.Item label="Mức độ" name='mucDo'>
 {selectedValue==='Tiền mặt'?
<InputNumber className='border-warning'
defaultValue={0}
formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
parser={(value) => value.replace(/\VND\s?|(,*)/g, '')}
style={{width:'100%'}}


        form.resetFields();
      })
      .catch((error) => console.error("Error adding item:", error));
  };
  ///validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = form;
    const startDate = getFieldValue("ngayBatDau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return Promise.resolve();
  };
  const [checkNgay, setCheckNgay] = useState(false);

  const validateDateBD = (_, value) => {
    const newDate = new Date();
    // if(startDate && value && value.isAfter(moment)){
    //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
    // }
    const { getFieldValue } = form;
    const endDate = getFieldValue("ngayKetThuc");
    if (endDate && value && value.isAfter(endDate)) {
      return Promise.reject("Ngày bắt đầu phải trước ngày kết thúc");
    }
    if (value && value < newDate) {
      return Promise.reject("Ngày bắt phải sau ngày hiện tại");
    }
    return Promise.resolve();
  };
  //hiển thị số lượng
  const [gioiHan, setGioiHan] = useState(false);
  const handleChangeSwitch = (value) => {
    setGioiHan(value);
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
        <Divider orientation="left" color="none">
          <h4 className="text-first pt-1 fw-bold">
            <FaTag size={20} /> 
            Thêm phiếu giảm giá
          </h4>
        </Divider>
        <div
          className="bg-light col-md-4"
          style={{border: "1px solid #ddd", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginBottom: 10, height: 600 }}
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
            onFinish={handleSubmit}
            form={form}
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
                label="Hình thức"
                name="phuongThuc"
                style={{ borderColor: "yellow", marginLeft: 0, width: 550 }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức!",
                  },
                ]}
              >
                <Select
                  defaultValue={"Hình thức"}
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
                label="Giới hạn"
                name="loaiVoucher"
                valuePropName="checked"
                style={{ marginLeft: 0, width: 550 }}
              >
                <Switch
                  onChange={handleChangeSwitch}
                  style={{ marginLeft: 20, width: 50 }}
                />
              </Form.Item>
              {gioiHan == true ? (
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
              ) : (
                <></>
              )}
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
                      content: "Bạn có chắc chắn muốn thêm không?",
                      onOk: () => {
                        form.submit();
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
                  Thêm
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div
          className="bg-light col"
          style={{border: "1px solid #ddd", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px", marginBottom: 10, marginLeft: 20 , marginRight : 15}}
        >
          <p className="fw-bold" style={{ marginTop: 10 }}>
            Khách hàng
          </p>
          <TableKhachHang />
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
export default AddVoucher;
