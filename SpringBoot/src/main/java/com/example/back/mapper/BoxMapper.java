package com.example.back.mapper;

import com.example.back.entity.Box;
import org.apache.ibatis.annotations.Select;

import java.util.LinkedList;

public interface BoxMapper {
    @Select("select * from box where cupboard_ID=#{id}")
    public int getSum(String id);


    @Select("select * from box ")
    public LinkedList<Box> getBox();

}
