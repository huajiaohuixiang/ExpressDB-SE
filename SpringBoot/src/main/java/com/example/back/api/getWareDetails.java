package com.example.back.api;


import com.example.back.entity.PackInWare;
import com.example.back.entity.Package;
import com.example.back.entity.Waredetails;
import com.example.back.mapper.WareDetailsMapper;
import com.example.back.mapper.packageMapper;
import com.example.back.pojo.returnWarePack;
import net.bytebuddy.asm.Advice;
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
    @Autowired
    packageMapper packagemapper;

    @GetMapping("/getWareDetails")
    public LinkedList<returnWarePack> getWareDetals(){

        LinkedList<PackInWare> packwithtime=wareDetailsMapper.getDetailsWithTime();



        LinkedList<returnWarePack> result=new LinkedList<>();

        for (PackInWare item:packwithtime
             ) {
            System.out.println(item.getPackageId());
            returnWarePack temp=new returnWarePack();
            Package packinfo=packagemapper.getpack(item.getPackageId());
            temp.setPackageId(item.getPackageId());
            temp.setWarehouseId(item.getWarehouseId());
            temp.setIn_time(item.getInDate());
            temp.setSenderName(packinfo.getSenderName());
            temp.setSenderPhone(packinfo.getSenderPhone());
            temp.setReceiverName(packinfo.getReceiverName());
            temp.setReceiverPhone(packinfo.getReceiverPhone());
            result.add(temp);
        }
    return result;
    }


}
