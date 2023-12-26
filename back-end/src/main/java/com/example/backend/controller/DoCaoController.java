package com.example.backend.controller;


import com.example.backend.entity.DeGiay;
import com.example.backend.service.DeGiayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/do-cao")
@RequiredArgsConstructor
public class DoCaoController {
    @Autowired
    private DeGiayService deGiayService;

    @GetMapping
    public ResponseEntity<?> getALLDC() {
        return new ResponseEntity<>(deGiayService.getALLDC(), HttpStatus.FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody DeGiay dc) {
        int dcThem = deGiayService.getALL().size();
        dc.setMa("DC" + "-" + (dcThem + 1));
        return ResponseEntity.ok(deGiayService.addDC(dc));
    }
}
