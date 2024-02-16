  import { requestAdmin } from "../../request";

  export class SanPhamClientAPI {
    static getCTSP = (idctsp) => {
      return requestAdmin({
        method: "GET",
        url: `client/sanpham/detailCTSP/${idctsp}`,
      });
    };

    static getListMauSacBySP = (idctsp) => {
      return requestAdmin({
        method: "GET",
        url: `/client/sanpham/mau-sac-sp/${idctsp}`,
      });
    };
    static getListSizeBySP = (idctsp) => {
      return requestAdmin({
        method: "GET",
        url: `/client/sanpham/kich-thuoc-sp/${idctsp}`,
      });
    };
    static changeListSizeBySPandMS = (idctsp,idmausac) => {
      return requestAdmin({
        method: "GET",
        url: `/client/sanpham/kich-thuoc-sp/${idctsp}/${idmausac}`,
      });
    };
    static getCTSPChange = (idsp, idmausac, idsize) => {
      return requestAdmin({
        method: "GET",
        url: `client/sanpham/detailCTSPChiTiet/${idsp}/${idmausac}/${idsize}`,
      });
    };
  }