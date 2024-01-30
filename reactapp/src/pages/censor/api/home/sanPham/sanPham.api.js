  import { requestAdmin } from "../../request";

  export class SanPhamClientAPI {
    static getCTSP = (idctsp) => {
      return requestAdmin({
        method: "GET",
        url: `client/sanpham/detailCTSP/${idctsp}`,
      });
    };
  }