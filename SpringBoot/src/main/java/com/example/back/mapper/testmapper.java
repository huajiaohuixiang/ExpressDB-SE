package com.example.back.mapper;

import com.example.back.entity.TestEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

//@Mapper
public interface testmapper {
    @Select("select * from test where id=#{id}")
    public TestEntity getTsetById(Integer id);

    @Options(useGeneratedKeys = true,keyProperty = "id")
    @Insert("insert into test(name) values(#{name})")
    public void insert(TestEntity testEntity);


}
