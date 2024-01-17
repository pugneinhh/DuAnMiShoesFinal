import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Slider,
  Switch,
  Table,
  Space,
  Tag,
  Badge
} from "antd";
import axios from "axios";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { InfoCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { Image } from "cloudinary-react";
import { AddProduct, GetProduct, UpdateApartProduct } from "./reducer/Product.reducer";
import { AddInvoice } from "./reducer/DetailInvoice.reducer";

const ModalSanPham = (props) => {
  const { openSanPham, setOpenSanPham } = props;
 // const idHD = props.idHD;
  const activeKey = props.activeKey;
  const ctsp = useSelector(GetProduct);
  console.log("CTSP",ctsp)
  console.log(activeKey);
  const handleClose = () => {
    setOpenSanPham(false);
    console.log("đóng");
  };
  const { Option } = Select;

  //Form
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //Load kich thước
  const [kt, setKT] = useState([]);
  useEffect(() => {
    loadKT();
  }, []);
  const loadKT = async () => {
    const result = await axios.get("http://localhost:8080/kich-thuoc", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setKT(result.data);
    }
  };
  //Load Màu Sắc
  const [ms, setMS] = useState([]);
  useEffect(() => {
    loadMS();
  }, []);
  const loadMS = async () => {
    const result = await axios.get("http://localhost:8080/mau-sac", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setMS(result.data);
    }
  };
  //Load Chất Liệu
  const [cl, setCL] = useState([]);
  useEffect(() => {
    loadCL();
  }, []);
  const loadCL = async () => {
    const result = await axios.get("http://localhost:8080/chat-lieu", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setCL(result.data);
    }
  };
  //Load Độ Cao
  const [dc, setDC] = useState([]);
  useEffect(() => {
    loadDC();
  }, []);
  const loadDC = async () => {
    const result = await axios.get("http://localhost:8080/de-giay", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setDC(result.data);
    }
  };
  //Load Danh Mục
  const [dm, setDM] = useState([]);
  useEffect(() => {
    loadDM();
  }, []);
  const loadDM = async () => {
    const result = await axios.get("http://localhost:8080/danh-muc", {
      validateStatus: () => {
        return true;
      },
    });
    setDM(result.data);
  };
  //Load Chất Liệu
  const [h, setH] = useState([]);
  useEffect(() => {
    loadH();
  }, []);
  const loadH = async () => {
    const result = await axios.get("http://localhost:8080/hang", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status === 302) {
      setH(result.data);
    }
  };
  //Table
  const [cTSP, setCTSPs] = useState([]);

  useEffect(() => {
    loadCTSP();
  }, []);

  const loadCTSP = async () => {
    const result = await axios.get("http://localhost:8080/ban-hang/getALLCTSP");
    result.data.map((i)=> dispatch(AddProduct({id:i.idCTSP,soLuong:i.soLuong,linkAnh:i.linkAnh,tenSP:i.tenSP,tenKT:i.tenKT,tenMS:i.tenMS,maMS:i.maMS,loaiKM:i.loaiKM,giaTriKhuyenMai: parseInt(i.giaKhuyenMai, 10),giaBan:i.giaBan,tenKM:i.tenKM})))
    console.log(result.data);
    setCTSPs(result.data);
  };
  const dispatch = useDispatch()

  const handleClickAddProduct = (record) => {
    console.log("id",record.giaSauGiam);
    dispatch(AddInvoice({chiTietSanPham:record.id,tenSP:record.tenSP,maMS:record.maMS,linkAnh : record.linkAnh,tenKT:record.tenKT,giaBan: record.giaBan,hoaDon:activeKey,tenMS:record.tenMS,giaGiam:record.giaGiam,giaSauGiam:record.giaSauGiam,nguoiTao:record.nguoiTao,giaBan:record.giaBan,tenKM:record.tenKM,loaiKM:record.loaiKM,giaTriKhuyenMai:record.giaTriKhuyenMai}));

    dispatch(UpdateApartProduct({id:record.id,soLuong:1})); 
    setOpenSanPham(false);
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
      title: "Hình ảnh",
      dataIndex: "linkAnh",
      key: "link",
      center: "true",
      render: (link,record) => {
        return (
          <>
          {
          (!record.tenKM) ?
          (
            <Image
              cloudName="dtetgawxc"
              publicId={link}
              width="100" 
              borderRadius="10"
              crop="scale"
              href={link}
            /> ) : (
              <Badge.Ribbon text= {record.loaiKM === "Tiền mặt" ? ("-"+`${Intl.NumberFormat("en-US").format(record.giaTriKhuyenMai)} VNĐ`) : ("-"+record.giaTriKhuyenMai+"%")} color="red" size="small">
            <Image
              cloudName="dtetgawxc"
              publicId={link}
              width="100"
              borderRadius="10"
              crop="scale"
              href={link}
            /> 
              </Badge.Ribbon>
            )
            }
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
      dataIndex: "giaSauGiam",
      width: 150,
      render: (text, record) => {
        return (
          <>
          {
          (!record.tenKM) ?
          (
           <span>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</span>
          ) : 
          (
            <span style={{color:"red"}}><del style={{color:"black"}}>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</del>
            <br></br>{`${Intl.NumberFormat("en-US").format(record.giaBan - record.giaGiam)} VNĐ`}</span>
          )
    }
    </>
        )
  },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Kích thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu sắc",
      dataIndex: "maMS",
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                backgroundColor: `${record.maMS}`,
                borderRadius: 30,
                width: 25,
                height: 25,
              }}
            ></div>
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="red">Còn bán</Tag>
          ) : (
            <Tag color="green">Còn bán</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      //dataIndex: "idCTSP",
      render: (record) => (
        <Space size="middle">
          <button className="btn btn-danger" onClick={() => handleClickAddProduct(record)
            }>
            Chọn
          </button>
        </Space>
      ),
    },
  ];
  return (
    <Modal
      title="Sản phẩm"
      centered
      open={openSanPham}
      onCancel={handleClose}
      footer={
        <button className="btn btn-primary" onClick={handleClose}>
          Hủy
        </button>
      }
      width={1100}
      height={600}
    >
      <div className="container-fluid" style={{ borderRadius: 20 }}>
        <div className="container-fluid">
          <Divider orientation="center" color="#d0aa73">
            <h4 className="text-first pt-1 fw-bold">
              {" "}
              <InfoCircleFilled size={35} /> Quản lý chi tiết sản phẩm
            </h4>
          </Divider>
          <div
            className=" bg-light m-2 p-3 pt-2"
            style={{
              border: "1px solid #ddd", // Border color
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
              borderRadius: "8px",
            }}
          >
            <h5>
              <FilterFilled size={30} /> Bộ lọc
            </h5>
            <hr />
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
            >
              {/* Form tìm kiếm */}
              {/* Các Thuộc Tính Dòng 1 */}
              <div className="row mt-3">
                {/* Tên & Mã */}
                <div className="col-3">
                  <Form.Item label="Tên & Mã" name="tenCT">
                    <Input className="border" />
                  </Form.Item>
                </div>
                {/* Kích Thước */}
                <div className="col-3">
                  <Form.Item label="Kích Thước" name="idKT">
                    <Select placeholder="Chọn một giá trị">
                      {kt.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Màu Sắc */}
                <div className="col-3">
                  <Form.Item label="Màu Sắc" name="idMS">
                    <Select placeholder="Chọn một giá trị">
                      {ms.map((item) => (
                        <Option key={item.id} value={item.id}>
                          <div
                            style={{
                              backgroundColor: `${item.ma}`,
                              borderRadius: 6,
                              width: 170,
                              height: 25,
                            }}
                          ></div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Chất Liệu */}
                <div className="col-3">
                  <Form.Item label="Chất Liệu" name="idCL">
                    <Select placeholder="Chọn một giá trị">
                      {cl.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              {/* Các Thuộc Tính Dòng 2 */}
              <div className="row">
                {/* Độ Cao */}
                <div className="col-md-3">
                  <Form.Item label="Độ Cao" name="idDC">
                    <Select placeholder="Chọn một giá trị">
                      {dc.map((item) => (
                        <Option key={item.ma} value={item.ma}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Danh Mục */}
                <div className="col-md-3">
                  <Form.Item label="Danh Mục" name="idDM">
                    <Select placeholder="Chọn một giá trị">
                      {dm.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Hãng */}
                <div className="col-md-3">
                  <Form.Item label="Hãng" name="idH">
                    <Select defaultValue={null}>
                      <Select.Option value={null}>Tất cả</Select.Option>
                      {h.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.ten}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Trạng Thái */}
                <div className="col-md-3">
                  <Form.Item label="Số Lượng" name="trangThaiCT">
                    <Select defaultValue={null}>
                      <Select.Option value={null}>Tất cả</Select.Option>
                      <Select.Option value="1">Còn Bán</Select.Option>
                      <Select.Option value="0">Dừng Bán</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              {/* Các Thuộc Tính Dòng 3 */}
              <div className="row">
                <div className="col-md-6">
                  <Form.Item label="Số lượng" name="soLuongCT">
                    <Slider style={{ width: "400px" }} min={1} />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item label="Giá bán" name="giaBanCT">
                    <Slider style={{ width: "400px" }} min={1} />
                  </Form.Item>
                </div>
              </div>

              <div className="container-fluid">
                <Form.Item className="text-center">
                  <Button type="primary" htmlType="reset">
                    Làm mới
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div
            className=" bg-light m-2 p-3 pt-2"
            style={{
              border: "1px solid #ddd", // Border color
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
              borderRadius: "8px",
            }}
          >
            <h5>
              <BookFilled size={30} /> Danh sách chi tiết sản phẩm
            </h5>
            <hr />
            <div className="container-fluid mt-4">
              <div>
                <Table
                  className="text-center"
                  dataSource={ctsp}
                  columns={columns}
                  pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    position: ["bottomCenter"],
                    defaultCurrent: 1,
                    total: ctsp.length,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalSanPham;
