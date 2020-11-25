package com.example.back.api;


import com.example.back.entity.TestEntity;
import com.example.back.mapper.testmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testapi {
    @Autowired
    testmapper testmapper;


    @GetMapping("/getTest/{id}")
    public TestEntity getTest(@PathVariable("id") Integer id){
        return testmapper.getTsetById(id);
    }

    @GetMapping("/insertTest")
    public TestEntity InsertTest(TestEntity testEntity){
        testmapper.insert(testEntity);
        return testEntity;
    }

}
