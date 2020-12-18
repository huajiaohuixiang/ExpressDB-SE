package com.example.back.mapper;


import com.example.back.entity.Package;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface packageMapper {

    @Select("Select * from package where package_id=#{id}")
    public Package getpack(String id);

}
