import { Button, Modal, Table, Tag, Radio } from "antd";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const ModalVoucher = (props) => {
  const { openModalVoucher, setOpenModalVoucher } = props;
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");


  const handleClose = () => {
    setOpenModalVoucher(false);
  };
   const handleCloseModalDiaChi = () => {
     setOpenModalVoucher(false);
   };
  return (
    <Modal
      title="Voucher"
      centered
      open={openModalVoucher}
      onOk={handleClose}
      onCancel={handleClose}
      width={600}
    >
      <Table
        pagination={{
          position: [top, bottom],
        }}
        // columns={columns}
        // dataSource={dataSource}
      />
    </Modal>
  );
};
export default ModalVoucher;
