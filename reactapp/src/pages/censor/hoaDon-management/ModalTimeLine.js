import { Modal, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { HoaDonAPI } from '../api/hoaDon/hoaDon.api';
const ModalTimeLine = (props) => {
    const { openModalTimeLine, setOpenModalTimeLine, idHD } = props;
    console.log("333",idHD)
    const handleClose = () => {
        setOpenModalTimeLine(false);

    };
    const [HDTimeLine, setHDTimeLine] = useState([])
    useEffect(() => {
          if (idHD != null && idHD != undefined) {
             loadTimeLineHoaDon();
        }
       
    }, [idHD]);
 const dataSource = HDTimeLine.map((item, index) => ({
        id:index++,
        trangThai: item.trangThai,
        ngayTao: item.ngayTao,
        nguoiTao: item.nguoiTao,
        motaHoatDong: item.motaHoatDong,
        soDienThoai: item.soDienThoai,
    }));
    const loadTimeLineHoaDon =  () => {
        HoaDonAPI.getAllLichSuHoaDon(idHD)
          .then((res) => {
              setHDTimeLine(res.data);
            console.log("22", res.data);
          })
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (id, record, index) => { ++index; return index },
            showSortTooltip: false,

        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (trangThai) => (
                <>
                    {
                        (trangThai == 0) ?
                            (
                                <Tag color="purple">
                                    Chờ xác nhận
                                </Tag>
                            ) :
                            (trangThai == 1) ?
                                (
                                    <Tag color="red">
                                        Xác nhận
                                    </Tag>
                                ) :
                                (trangThai == 2) ?
                                    (
                                        <Tag color="blue">
                                            Chờ vận chuyển
                                        </Tag>
                                    ) :
                                    (trangThai == 3) ?
                                        (
                                            <Tag color="cyan">
                                                Đang Vận chuyển
                                            </Tag>
                                        ) :
                                        (trangThai == 4) ?
                                            (
                                                <Tag color="orange">
                                                    Đã Thanh toán
                                                </Tag>
                                            ) :
                                            (
                                                <Tag color="green">
                                                    Thành công
                                                </Tag>
                                            )
                    }

                </>),
        },
        {
            title: 'Ngày',
            dataIndex: 'ngayTao',
            center: "true",
            render: (ngayTao) => (
                <>{moment(ngayTao).format("hh:mm:ss DD/MM/YYYY")}</>
            ),
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'nguoiTao',
            center: "true",
        },
        {
            title: 'Ghi chú',
            dataIndex: 'motaHoatDong',
            center: "true",
        },

    ];

    return (
        <Modal
            title="TimeLine"
            centered
            open={openModalTimeLine}
            onOk={handleClose}
            onCancel={handleClose}   
            width={800}
        >
            <Table dataSource={dataSource} columns={columns} style={{ marginTop: '25px' }} />
        
        </Modal>

    )
}
export default ModalTimeLine;