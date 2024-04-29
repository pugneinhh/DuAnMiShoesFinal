import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Card, Col, Divider, Empty, Row } from "antd";
import { FaPhone } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineBars } from "react-icons/ai";
import { MdOutlineRule, MdPunchClock } from "react-icons/md";
import { Link } from "react-router-dom";
export const NoiQuyTraHang = ({ children }) => {
  return (
    <>
      <Breadcrumb style={{ marginBottom: 10 }}>
        <Breadcrumb.Item>
          <Link to="/home" className="no-underline">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/chinh-sach" className="no-underline"><b>Chính sách</b></Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="mt-4">
          <img src="https://don16obqbay2c.cloudfront.net/wp-content/uploads/How-to-Write-a-Return-Policy-1654859386.png"
            width={1270} height={430}></img>
        </div>
        <div className="row mb-5">
          <Divider orientation="center" color="#d0aa73">
            <h4 className="text-first pt-1 fw-bold">
              {" "}
              <GiReturnArrow size={35} />  Chính Sách Trả Hàng
            </h4>
          </Divider>
          <Row gutter={16}>
            <Col span={8} style={{ textAlign: "justify" }}>
              <Card
                style={{ height: 450 }}
                headStyle={{ backgroundColor: "#E8CEA4" }}
                title={<><div style={{ textAlign: "center", fontSize: 20 }}> <AiOutlineBars size={25} /> Những trường hợp được đổi trả</div></>}
                bordered={true} className="shadow bg-tertiary">
                <h6>
                  •	Hàng bị lỗi kỹ thuật và lỗi do nhà sản xuất.<br /><br />
                  •	Hàng bị lỗi do quá trình vận chuyển cho khách của MiShoes.<br /><br />
                  •	Hàng giao không đúng mẫu mã, loại, kích thước mà khách đã đặt.<br /><br />
                  •	Hàng bị giao thiếu cho khách.<br /><br />
                  •	Người mua đã thanh toán nhưng không nhận được hàng.<br /><br />

                </h6>
              </Card>
            </Col>
            <Col span={8} style={{ textAlign: "justify" }}>
              <Card
                headStyle={{ backgroundColor: "#E8CEA4" }}
                style={{ height: 450 }}
                title={<><div style={{ textAlign: "center", fontSize: 20 }}> <MdOutlineRule size={25} /> Điều kiện và quy định trả hàng</div></>}
                bordered={true} className="shadow bg-tertiary">
                <h6>
                  •	Sản phẩm thực hiện đổi trả phải được Quý khách đặt mua online hoặc mua trực tiếp tại cửa hàng.<br /><br />
                  •	Nhân viên chỉ hỗ trợ khi khách hàng còn giữ hóa đơn mua hàng tại hệ thống cửa hàng hoặc phiếu giao hàng khi mua hàng online.<br /><br />
                  •	Mỗi đơn hàng chỉ được hỗ trợ trả hàng 1 lần duy nhất.<br /><br />
                  •	Còn đầy đủ bao bì, vỏ hộp, không bị trầy xước, móp méo, hỏng hóc bên ngoài, đổ vỡ.<br /><br />
                  •	Không bị dơ bẩn, trầy xước, hư hỏng, có mùi lạ hoặc có dấu hiệu đã qua giặt tẩy hoặc qua sử dụng.
                </h6>
              </Card>
            </Col>
            <Col span={8} style={{ textAlign: "justify" }}>
              <Card
                headStyle={{ backgroundColor: "#E8CEA4" }}
                style={{ height: 450 }}
                title={<><div style={{ textAlign: "center", fontSize: 20 }}> <MdPunchClock size={25} /> Thời gian trả hàng</div></>}
                bordered={true} className="shadow bg-tertiary">
                <h6>
                  •	Thời gian áp dụng trả hàng khi mua hàng tại cửa hàng là 7 ngày.<br /><br />
                  •	Thời gian áp dụng trả hàng khi mua hàng online là 7 ngày kể từ ngày nhận hàng.<br /><br />
                </h6>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
