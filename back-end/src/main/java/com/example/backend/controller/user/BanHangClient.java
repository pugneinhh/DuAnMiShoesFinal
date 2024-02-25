package com.example.backend.controller.user;

import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.entity.CongThuc;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.CongThucRepository;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.service.*;
import com.example.backend.vnp_1.Config;
import com.example.backend.vnp_1.PayService;
import com.example.backend.vnp_1.PaymentResDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang-client")
@RequiredArgsConstructor
public class BanHangClient {
    @Autowired
    BanHangService banHangService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    CongThucRepository congThucRepository;
    @Autowired
    VoucherService voucherService;
    @Autowired
    PayService payService;
    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    NguoiDungService nguoiDungService;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    ThanhToanService thanhToanService;
    @Autowired
    HoaDonRepository hoaDonRepository;

    @PostMapping("/add-hoa-don")
    public ResponseEntity<?> addHD(@RequestBody HoaDonRequest hoaDonRequest){

        CongThuc ct=congThucRepository.getCongThucByTrangThai(0);
        // hoaDonRequest.setMa("HDTQ"+ RandomStringUtils.randomNumeric(6));
        hoaDonRequest.setLoaiHoaDon(0);
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        hoaDonRequest.setTrangThai(0);
        //  hoaDonRequest.setGiaTriDiem(Integer.valueOf(hoaDonRequest.getThanhTien().intValue()/ct.getTiSo().intValue()));
        banHangService.addHoaDon(hoaDonRequest);
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(hoaDonRequest.getId());

        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setId(hoaDonRequest.getId());
        lichSuHoaDon.setHoaDon(hoaDon);
//        lichSuHoaDon.setNguoiTao(hoaDonRequest.getNguoiDung());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(lichSuHoaDonService.save(lichSuHoaDon));
    }
    @PostMapping("/addHDCT")
    public ResponseEntity<?> addHDCT(@RequestBody HoaDonChiTietRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setTrangThai(0);
        return ResponseEntity.ok(hoaDonChiTietService.addHDCTClient(request));
    }
    @PutMapping("/them-voucher/{idHD}/{idVoucher}")
    public ResponseEntity<?> updateVoucherToHD(@PathVariable("idHD") String idHD, @PathVariable("idVoucher") String idVoucher) {
        return ResponseEntity.ok(hoaDonServicee.addVoucherToHD(idHD,idVoucher));
    }
    @PutMapping("/thanh-toan-hoa-don/{idHD}")
    public ResponseEntity<?> thanhToanHoaDon (@PathVariable("idHD") String idHD) {
        HoaDon hoaDon=hoaDonServicee.findHoaDonbyID(idHD);
        System.out.println("hóa đơn"+hoaDon.toString());
        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setHoaDon(hoaDon);
//        lichSuHoaDon.setNguoiTao(hoaDon.getNguoiDung().getTen());
        lichSuHoaDon.setTrangThai(4);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        return ResponseEntity.ok(  hoaDonServicee.thanhToanHoaDon(idHD));
    }
    @PostMapping("/thanh-toan-tien-mat")
    public ResponseEntity<?> thanhToan(@RequestBody ThanhToanRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(0);
        request.setTrangThai(0);
        HoaDon hd=hoaDonServicee.findHoaDonbyID(request.getHoaDon());
        System.out.println("hóa đơn tm"+hd);
        hd.setTrangThai(0);
        hd.setNgayMua(LocalDateTime.now());
        hoaDonRepository.save(hd);
        return ResponseEntity.ok(thanhToanService.thanhToan(request));
    }
    @PostMapping("/thanh-toan-chuyen-khoan")
    public ResponseEntity<?> thanhToanCK(@RequestBody ThanhToanRequest request){
        request.setNgayTao(LocalDateTime.now());
        request.setPhuongThuc(1);
        request.setTrangThai(0);
        HoaDon hd=hoaDonServicee.findHoaDonbyID(request.getHoaDon());
        hd.setTrangThai(0);
        hd.setNgayMua(LocalDateTime.now());
        hoaDonRepository.save(hd);
        LichSuHoaDon lichSuHoaDon= new LichSuHoaDon();
        lichSuHoaDon.setHoaDon(HoaDon.builder().id(request.getHoaDon()).build());
//        lichSuHoaDon.setNguoiTao(hoaDon.getNguoiDung().getTen());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        return ResponseEntity.ok(thanhToanService.thanhToan(request));
    }
    @GetMapping("/chuyen-khoan/{hoaDon}/{money}")
    public ResponseEntity<?> createPayment(@PathVariable("hoaDon") String hoaDon
            ,@PathVariable("money")String money) throws UnsupportedEncodingException {
        System.out.println("Hóa đơn vnpay"+hoaDon);
        System.out.println("Số tiền"+money);
        // Update hóa đơn => Đã thanh toán và set ngày mua (chưa được chính xác , trong trường hợp mua bằng tiền mặt và chuyển khoản)
        //    HoaDon hoaDonCT=hoaDonRepository.findById(hoaDon).get();
//        hoaDonCT.setTrangThai(4);
//        hoaDonCT.setNgayMua(LocalDateTime.now());
//        hoaDonRepository.save(hoaDonCT);

        // Tạo QR Code với số tiền thanh toán
        int amount = Integer.parseInt(money) * 100;
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_TmnCode = Config.vnp_TmnCode;
        Map<String, String> vnp_Params = new HashMap<>(); // Thông tin về QR Code
        vnp_Params.put("vnp_Version", Config.vnp_Version); // Phiên bản
        vnp_Params.put("vnp_Command", Config.vnp_Command); // Dòng lệnh
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode); // Mã TMN
        vnp_Params.put("vnp_Amount", String.valueOf(amount)); //
        vnp_Params.put("vnp_CurrCode", "VND"); //Đơn vị tiền tệ
        vnp_Params.put("vnp_BankCode", "NCB"); // Tên ngân hàng
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef); //
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" +hoaDon  +" - "+ vnp_TxnRef); // Thông tin yêu cầu
        vnp_Params.put("vnp_ReturnUrl", "http://localhost:3000"); // Địa chỉ được trả về
        vnp_Params.put("vnp_IpAddr", Config.vnp_IpAddr); // Địa chỉ IP
        vnp_Params.put("vnp_OrderType", Config.orderType); // kiểu yêu cầu
        vnp_Params.put("vnp_Locale", Config.vnp_Locale); // vị trí

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate); // ngày tạo

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data - Tạo dữ liệu băm
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query - Tạo truy vấn
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString(); // đường dẫn truy vấn dưới dạng string
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString()); // băm SHA512
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash; // đường dẫn truy vấn được băm dưới dạng SHA512
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl; // Đường dẫn cuối , được tạo nên từ địa chỉ mặc định của VNPay và đường dẫn từ câu truy vấn được băm SHA512
        // Khởi tạo đối tượng PaymentResDTO
        PaymentResDTO paymentResDTO = new PaymentResDTO();
        paymentResDTO.setStatus("0k");
        paymentResDTO.setMessage("success");
        paymentResDTO.setURL(paymentUrl);

        // Khởi tạo đối tượng ThanhToanRequest ()
//        ThanhToanRequest request=new ThanhToanRequest();
//        request.setHoaDon(hoaDon);
//        request.setChuyenKhoan(BigDecimal.valueOf(amount));
//        request.setPhuongThuc(1);
//        request.setNgayTao(LocalDateTime.now());
//        request.setPhuongThucVnp(vnp_TxnRef);
//        thanhToanService.thanhToan(request);

        //Trả về một url
        HttpHeaders headers = new HttpHeaders();
        System.out.println("Mã TMN"+vnp_TmnCode);
        headers.add("Location", "/home");
        // System.out.println("REturrn"+ ResponseEntity.status(HttpStatus.OK).body(paymentResDTO));
        return ResponseEntity.status(HttpStatus.OK).body(paymentResDTO);
    }
}
