package com.example.back.mapper;

import com.example.back.entity.Warehouse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.LinkedList;

@Mapper
public interface WarehouseMapper {
    @Select("select * from warehouse")
    public LinkedList<Warehouse> getWareInfo();

}
