import { Avatar, Badge, Button, Space, Tabs, Tag } from "antd";
import { BsShop } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import { Link ,useNavigate} from "react-router-dom";
import  "./history.css";
const HistoryClient = (props) => {
  const nav = useNavigate();
    // item tab
    const onChange = (key) => {};
   const items = [
     {
       key: "1",

       label: "Tất cả",
       children: (
         <>
           <div className="container">
             <div className="mb-5">
               <Space className="float-end" size={[0, 8]} wrap>
                 <Tag color="#108ee9">
                   <span className="fs-5">Chờ vận chuyển</span>
                 </Tag>
               </Space>
               <br></br>
               <div
                 className="row mt-3 "
                 style={{ borderTop: "1px solid #000" }}
               >
                 <div className="col-md-2 mt-3 ps-4">
                   <img
                     style={{ width: 130, height: 140 }}
                     src={
                       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708359981/oezx0k4votuisyxy0pob.jpg"
                     }
                     alt="Product"
                   ></img>
                 </div>
                 <div className="col-md-6 ms-5 mt-3">
                   <h5>Giày thể thao Nike </h5>
                   <h6 className="text-danger">
                     <del>2.500.000 VND</del>
                   </h6>
                   <h6 className="text-danger">2.500.000 VND</h6>
                   <h6>40-[Black]</h6>
                   <h6>x1</h6>
                 </div>
                 <div className="col-md-3  mt-5">
                   <h6 className="text-danger">2.500.000 VND</h6>
                 </div>
               </div>
               <div
                 className="row mt-3 "
                 style={{ borderTop: "1px solid #000" }}
               >
                 <div className="col-md-2 mt-3 ps-4">
                   <img
                     style={{ width: 130, height: 140 }}
                     src={
                       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708333190/nqbrgsgvr76i4uscx9sf.png"
                     }
                     alt="Product"
                   ></img>
                 </div>
                 <div className="col-md-6 ms-5 mt-3">
                   <h5>Giày thể thao Nike </h5>
                   <h6 className="text-danger">
                     <del>2.500.000 VND</del>
                   </h6>
                   <h6 className="text-danger">2.500.000 VND</h6>
                   <h6>40-[Black]</h6>
                   <h6>x1</h6>
                 </div>
                 <div className="col-md-3  mt-5">
                   <h6 className="text-danger">2.500.000 VND</h6>
                 </div>
               </div>

               {/* thành tiền */}
               <div
                 className=" mt-4 d-flex justify-content-end"
                 style={{ borderTop: "1px solid #000" }}
               >
                 <h5 className="mt-4">Thành tiền :</h5>
                 <h5 className="mt-4 ms-3 text-danger">5.000.000 VND</h5>
               </div>
               {/* nút thanh toán */}
               <div className=" mt-4 d-flex justify-content-end">
                 <Button
                   style={{
                     backgroundColor: "orangered",
                     color: "white",
                     width: 150,
                     height: 40,
                   }}
                 >
                   Hủy đơn
                 </Button>
                 <Button
                   style={{
                     backgroundColor: "white",
                     width: 150,
                     height: 40,
                     marginLeft: 20,
                   }}
                   onClick={() => {
                    nav(`/chi-tiet-don-hang`);
                  }}
                 >
                   Xem đơn hàng
                 </Button>
               </div>
             </div>

             <div>
               <Space className="float-end" size={[0, 8]} wrap>
                 <Tag color="#108ee9">
                   <span className="fs-5">Chờ vận chuyển</span>
                 </Tag>
               </Space>
               <br></br>
               <div
                 className="row mt-3 "
                 style={{ borderTop: "1px solid #000" }}
               >
                 <div className="col-md-2 mt-3 ps-4">
                   <img
                     style={{ width: 130, height: 140 }}
                     src={
                       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708359981/oezx0k4votuisyxy0pob.jpg"
                     }
                     alt="Product"
                   ></img>
                 </div>
                 <div className="col-md-6 ms-5 mt-3">
                   <h5>Giày thể thao Nike </h5>
                   <h6 className="text-danger">
                     <del>2.500.000 VND</del>
                   </h6>
                   <h6 className="text-danger">2.500.000 VND</h6>
                   <h6>40-[Black]</h6>
                   <h6>x1</h6>
                 </div>
                 <div className="col-md-3  mt-5">
                   <h6 className="text-danger">2.500.000 VND</h6>
                 </div>
               </div>
               <div
                 className="row mt-3 "
                 style={{ borderTop: "1px solid #000" }}
               >
                 <div className="col-md-2 mt-3 ps-4">
                   <img
                     style={{ width: 130, height: 140 }}
                     src={
                       "https://res.cloudinary.com/dm0w2qws8/image/upload/v1708333190/nqbrgsgvr76i4uscx9sf.png"
                     }
                     alt="Product"
                   ></img>
                 </div>
                 <div className="col-md-6 ms-5 mt-3">
                   <h5>Giày thể thao Nike </h5>
                   <h6 className="text-danger">
                     <del>2.500.000 VND</del>
                   </h6>
                   <h6 className="text-danger">2.500.000 VND</h6>
                   <h6>40-[Black]</h6>
                   <h6>x1</h6>
                 </div>
                 <div className="col-md-3  mt-5">
                   <h6 className="text-danger">2.500.000 VND</h6>
                 </div>
               </div>

               {/* thành tiền */}
               <div
                 className=" mt-4 d-flex justify-content-end"
                 style={{ borderTop: "1px solid #000" }}
               >
                 <h5 className="mt-4">Thành tiền :</h5>
                 <h5 className="mt-4 ms-3 text-danger">5.000.000 VND</h5>
               </div>
               {/* nút thanh toán */}
               <div className=" mt-4 d-flex justify-content-end">
                 <Button
                   style={{
                     backgroundColor: "orangered",
                     color: "white",
                     width: 150,
                     height: 40,
                   }}
                 >
                   Hủy đơn
                 </Button>
                 <Button
                   style={{
                     backgroundColor: "white",
                     width: 150,
                     height: 40,
                     marginLeft: 20,
                   }}
                 >
                   Hủy đơn
                 </Button>
               </div>
             </div>
           </div>
         </>
       ),
     },
     {
       key: "2",
       label: (
         <Badge count={0} offset={[8, 1]}>
           Chờ xác nhận
         </Badge>
       ),
       children: <></>,
     },
     {
       key: "3",
       label: (
         <Badge count={0} offset={[8, 1]}>
           Chờ vận chuyển
         </Badge>
       ),
       children: <></>,
     },
     {
       key: "4",
       label: (
         <Badge count={0} offset={[8, 1]}>
           Vận chuyển
         </Badge>
       ),
       children: <></>,
     },
     {
       key: "5",
       label: "Hoàn thành",
       children: <></>,
     },
     {
       key: "6",
       label: (
         <Badge count={0} offset={[8, 1]}>
           Hủy
         </Badge>
       ),
       children: <></>,
     },
   ];
  return (
    <>
      <div className="container ">
        <div
          className="row pt-3 "
          style={{ backgroundColor: "#F3F2F2" }}
        >
          <div className="col-md-2">
            <div className="row">
              <div className="col-md-2">
                <Avatar
                  style={{ width: 50, height: 50 }}
                  shape="circle"
                  className="align-content-start"
                  // size="large"
                  src="data:image/jpeg;base64,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"
                />
              </div>
              <div className="col-md-10 " style={{ paddingLeft: 40 }}>
                <div className="fw-bold">
                  <h6>
                    <b>Tùng Dương</b>
                  </h6>
                </div>
                <div className="ms-1">
                  <TfiPencil size={15} />
                  <span className="ms-2">Sửa hồ sơ</span>
                </div>
              </div>
            </div>

            <hr></hr>

            <div>
              <FaUser className="ms-2" size={20} style={{ color: "red" }} />
              <span className="ms-3 ">
                <b>Tài khoản của tôi</b>
              </span>
            </div>
            <div className="mt-3 ">
              <BsShop className="ms-2" size={20} style={{ color: "red" }} />
              <span className="ms-4 ">
                <b>Đơn mua</b>
              </span>
            </div>
          </div>

          {/* Tab */}
          <div className="col-md-9 ms-5" style={{ backgroundColor: "white" }}>
            <Tabs defaultActiveKey="1"  className="mb-3" items={items} onChange={onChange} />
          </div>
        </div>
      </div>
    </>
  );
};
export default HistoryClient;
