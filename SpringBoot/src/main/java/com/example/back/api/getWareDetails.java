package com.example.back.api;


import com.example.back.entity.Waredetails;
import com.example.back.mapper.WareDetailsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

@RestController
@CrossOrigin
public class getWareDetails {
    @Autowired
    WareDetailsMapper wareDetailsMapper;


    @GetMapping("/getWareDetails")
    public LinkedList<Waredetails> getWareDetals(){
        return wareDetailsMapper.getDetails();
    }


}
