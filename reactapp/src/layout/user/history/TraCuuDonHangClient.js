import LogoGHN from "../../../assets/images/logoDiShip.jpg";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
} from "antd";
export default function TraCuuDonHangClient() {
  return (
    <>
      <div className="row d-flex justify-content-center">
        <Form layout="vertical" style={{paddingLeft:400}}>
          
            <Row>
              <Col span={7} style={{ marginRight: "20px" }}>
                <Form.Item
                  name="ten"
                  label="Mã hóa đơn"
                  tooltip="Vui lòng nhập mã hóa đơn"
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
              </Col>
              <Col span={7}>
                <Form.Item
                  name="sdt"
                  label="Số điện thoại"
                  tooltip="Vui lòng nhập sdt"
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
              </Col>

              <Col className="d-flex align-items-center ms-2 mt-2">
                <Button
                  style={{
                    // width: "110px",
                    // height: "40px",
                    // margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  // htmlType="reset"
                >
                  Hoàn tất
                </Button>
              </Col>
            </Row>
        
        </Form>
      </div>
      <div className="text-center">
        <img src={LogoGHN} style={{ width: 900, height: 400 }}></img>
      </div>
    </>
  );
}
