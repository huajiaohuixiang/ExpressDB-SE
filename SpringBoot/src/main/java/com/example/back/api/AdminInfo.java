package com.example.back.api;

import com.example.back.entity.Administrator;
import com.example.back.mapper.AdministratorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;

@RestController
@CrossOrigin
public class AdminInfo {
    @Autowired
    AdministratorMapper administratorMapper;

    @GetMapping("/getAdmin")
    public LinkedList<Administrator> getAdministrator(){

        return administratorMapper.getAdministrator();
    }
    @PostMapping("/registry")
   public HashMap<String,Object> addAdministrator(@RequestBody Administrator administrator){
        HashMap<String,Object> map=new HashMap<String,Object>();
        if (administratorMapper.findByEmId(administrator.getEmployeeId())==null){
            map.put("code",400);
            map.put("message","注册失败 员工工号不存在！");
            return map;
        }
        if (administratorMapper.findByName(administrator.getAdminName())!= null ){
            map.put("code",400);
            map.put("message","注册失败 用户名已存在！");
            return map;
        }

        administratorMapper.addAdministrator(administrator.getAdminName(),administrator.getPassword(),administrator.getEmployeeId());
        map.put("code",200);
        map.put("administrator",administrator.getAdminName());
        return  map;
    }

    @PostMapping("/login")
    public HashMap<String,Object> login(@RequestParam("admin_name") String name,@RequestParam("password") String password){
        HashMap<String,Object> map=new HashMap<String,Object>();
        if (administratorMapper.login(name, password)==null){
            map.put("code",400);
            map.put("message","登陆失败！");
            return map;
        } else {
            map.put("code",200);
            map.put("message","登陆成功！");
            return  map;
        }
    }
}
