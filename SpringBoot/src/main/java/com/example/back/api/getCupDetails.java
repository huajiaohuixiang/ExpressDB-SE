package com.example.back.api;

import com.example.back.entity.Box;
import com.example.back.mapper.BoxMapper;
import com.example.back.mapper.CupboardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

@RestController
@CrossOrigin
public class getCupDetails {
    @Autowired
    BoxMapper boxMapper;

    @GetMapping("/getCupDetails")
    public LinkedList<Box> getCupDetails(){
        return boxMapper.getBox();
    }

}
