package com.example.backend.controller;

import com.example.backend.dto.request.KhachHangRequest;
import com.example.backend.service.KhachHangService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/khach-hang")
//@RequiredArgsConstructor
public class KhachHangController {

    @Autowired
    KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return  ResponseEntity.ok(khachHangService.getAll());
    }

    @PostMapping()
    public ResponseEntity<?> add(@RequestParam("request") String request,
                                 @RequestParam(value = "file") MultipartFile file){

        Gson gson = new Gson();
        KhachHangRequest khachHangRequest=gson.fromJson(request, KhachHangRequest.class);

        return  ResponseEntity.ok(khachHangService.add(khachHangRequest,file));
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestParam("request") String request,
                                 @RequestParam(value = "file") MultipartFile file) {

        Gson gson = new Gson();
        KhachHangRequest khachHangRequest = gson.fromJson(request, KhachHangRequest.class);

        return ResponseEntity.ok(khachHangService.update(khachHangRequest, file));

    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id){
        return ResponseEntity.ok(khachHangService.getByID(id));

    }
    @PostMapping("/update")
    public ResponseEntity<?> updateStatus(@RequestParam("id") String id,
                                       @RequestParam("status") String status) {
        Gson gson = new Gson();
        String idUser = gson.fromJson(id, String.class);
        String statusGson = gson.fromJson(status, String.class);
        return ResponseEntity.ok(khachHangService.updateStatus(idUser,statusGson));
    }
}
