package com.example.back.mapper;


import com.example.back.entity.Administrator;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.LinkedList;


@Mapper
public interface AdministratorMapper {
    @Select("select * from Administrator order by cast(EMPLOYEE_ID as int)")
    public LinkedList<Administrator> getAdministrator();

    @Insert("insert into  Administrator values(#{name},#{password},#{e_id})" )
    public  void addAdministrator(String name,String password,String e_id);

    @Select("select * from Administrator where admin_name=#{name}")
    public Administrator findByName(String name);

    @Select("select * from Employee where employee_id=#{e_id}")
    public Administrator findByEmId(String e_id);
    @Select("select * from Administrator where admin_name=#{name} and password=#{password} ")
    public Administrator login(String name,String password);

}

