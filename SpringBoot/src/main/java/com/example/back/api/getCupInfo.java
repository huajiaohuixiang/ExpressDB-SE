package com.example.back.api;

import com.example.back.entity.Cupboard;
import com.example.back.mapper.BoxMapper;
import com.example.back.mapper.CupboardMapper;
import com.example.back.pojo.returnCupInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

@RestController
@CrossOrigin
public class getCupInfo {
    @Autowired
    CupboardMapper cupboardMapper;

    @Autowired
    BoxMapper boxMapper;

    @GetMapping("/getCupInfo")
    public LinkedList<returnCupInfo> getCupInfo(){
        LinkedList<Cupboard> temp=cupboardMapper.getCupBoard();
        LinkedList<returnCupInfo> result=new LinkedList<>();
        returnCupInfo s;
        for (Cupboard item :temp
             ) {
            s=new returnCupInfo();
            s.setCapacity(item.getCapacity());
            s.setCupboardId(item.getCupboardId());
            s.setCupboardName(item.getCupboardName());
            s.setLeft_capacity(boxMapper.getSum(item.getCupboardId()));
            result.add(s);

        }
    return result;
    }


}
