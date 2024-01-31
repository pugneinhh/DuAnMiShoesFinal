import { requestAdmin } from "../request";

export class PromotionAPI {

  static getAll = () => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khuyen-mai/hien-thi`,
     
    });
  };

  static create = (data) => {
    return requestAdmin({
      method: "POST",
      url: "/admin/khuyen-mai/add",
      data: data,
    });
  };

  static update = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/update/${id}`,
      data: data,
    });
  };

  static detail = (id) => {
    return requestAdmin({
      method: "GET",
      url: `/admin/khuyen-mai/detail/${id}`,
    });
  };

  static updateAutoClose = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai/${id}`,
      data: data,
    });
  };

  static updateAutoStart = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai1/${id}`,
      data: data,
    });
  };

  static updateClosePromotion = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai2/${id}`,
      data: data,
    });
  };

  static updateOpenPromotion = (id, data) => {
    return requestAdmin({
      method: "PUT",
      url: `/admin/khuyen-mai/updateTrangThai3/${id}`,
      data: data,
    });
  };

  static search = (data) => {
    return requestAdmin({
      method: "POST",
      url: `/admin/khuyen-mai/search-khuyen-mai`,
      data: data,
    });
  };

  static updateProductByPromotion = (id,data) => {
    return requestAdmin({
        method: "PUT",
        url : `/admin/ctsp/updateKM/${id}`,
        data : data,
    });
  };

  static showProductByPromotion = (id) => {
    return requestAdmin({
        method: "GET",
        url : `/admin/ctsp/showKM/${id}`,
        
    });
  };

  static deletePromotion = (id,data) => {
    return requestAdmin({
      method:"PUT",
      url: `/admin/ctsp/deleteKM/${id}`,
      data : data,
    });
  }

  static showSPByProduct = (id) =>{
    return requestAdmin({
        method :"GET",
        url:`/admin/san-pham/showSP/${id}`,
    });
  };

  static loadCTSPBySP = (id) =>{
    return requestAdmin({
        method :"GET",
        url:`/admin/ctsp/showCTSP/${id}`
    });
  };
 

  static loadSP = () => {
    return requestAdmin({
        method :"GET",
        url:`/admin/san-pham`,
    });
  };
}
