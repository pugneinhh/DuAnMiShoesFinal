package com.example.backend.dto.request;

import com.example.backend.entity.NguoiDung;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoiMatKhauRequest {
    private String matKhauCu;
    private String matKhau;



    public NguoiDung map(NguoiDung nguoiDung) {
        nguoiDung.setMatKhau(this.matKhau);
        return nguoiDung;
    }
}
