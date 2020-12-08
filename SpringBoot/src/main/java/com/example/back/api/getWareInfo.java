package com.example.back.api;

import com.example.back.entity.Warehouse;
import com.example.back.mapper.WareDetailsMapper;
import com.example.back.mapper.WarehouseMapper;
import com.example.back.pojo.returnWareInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;


@RestController
@CrossOrigin
public class getWareInfo {

    @Autowired
    WarehouseMapper warehouseMapper;

    @Autowired
    WareDetailsMapper wareDetailsMapper;

    @GetMapping("/getWareInfo")
    public LinkedList<returnWareInfo> getWareInfo(){
        LinkedList<Warehouse>  temp=warehouseMapper.getWareInfo();
        LinkedList<returnWareInfo> returnWareInfos=new LinkedList<returnWareInfo>();
        returnWareInfo s;
        for (Warehouse item:temp
             ) {
            s=new returnWareInfo();
            s.setCapacity(item.getCapacity());
            s.setWarehouseId(item.getWarehouseId());
            s.setWarehouseName(item.getWarehouseName());
            s.setLeft_capacity(Integer.valueOf(item.getCapacity())-wareDetailsMapper.getSum(item.getWarehouseId()));
            returnWareInfos.add(s);
        }

        return returnWareInfos;
    }
}
