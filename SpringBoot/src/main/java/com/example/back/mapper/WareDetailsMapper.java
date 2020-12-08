package com.example.back.mapper;

import com.example.back.entity.Waredetails;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.LinkedList;

@Mapper
public interface WareDetailsMapper {

    @Select("select count(*) from waredetails where warehouse_id=#{id}")
    public int getSum(String id);

    @Select("select * from waredetails")
    public LinkedList<Waredetails> getDetails();
}
