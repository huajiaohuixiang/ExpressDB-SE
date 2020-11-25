package com.example.back.mapper;

import com.example.back.entity.DepartmentEntity;
import org.apache.ibatis.annotations.Select;

//@Mapper
public interface DepartmentMapper {

    @Select("select * from department where department_ID=#{ID}")
    public DepartmentEntity getDeptByID(String ID);



}
