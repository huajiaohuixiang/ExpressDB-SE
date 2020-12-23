package com.example.back.api;

import com.example.back.entity.Employee;
import com.example.back.mapper.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.Map;

@RestController
@CrossOrigin
public class EmployeeInfo {
    @Autowired
    EmployeeMapper employeeMapper;

    @GetMapping("/getEmployee")
    public LinkedList<Employee> getEmployee(){

        return employeeMapper.getEmployee();
    }
    @PostMapping("/updateEmployee")
    public String updateEmployee(@RequestBody Employee employee){
        employeeMapper.updateEmployee(employee.getEmployeeId(),employee.getSex(),employee.getName(),employee.getAddress(),employee.getCellPhone(),employee.getDepartmentId(),employee.getPosition(),employee.getStatus());
     return "success";
    }

    @PostMapping("/addEmployee")
    public String addEmployee(@RequestBody Employee employee){
        employeeMapper.addEmployee(employee.getEmployeeId(),employee.getSex(),employee.getName(),employee.getAddress(),employee.getCellPhone(),employee.getDepartmentId(),employee.getPosition(),employee.getStatus());
        return "success";
    }


    @PostMapping("/dispatcherEmployee")
    public String dispatcherEmployee(@RequestParam("employee_id") String employee_id){
        employeeMapper.dispatcherEmployee(employee_id,"已接单");
        return "success";
    }

    @PostMapping("/deleteEmployee")
    public String deleteEmployee(@RequestParam("employee_id") String employee_id){
        employeeMapper.deleteEmployee(employee_id);
        return "success";
    }

    @GetMapping("/getCourier")
    public LinkedList<Map<String,Object>> getCourier(){

//        LinkedList<Employee> em=employeeMapper.getCourier("快递员");

        return employeeMapper.getCourier("快递员");

    }

    @GetMapping("/searchEmployee")
    public  LinkedList<Employee>  searchEmployee(@RequestParam("employee_id") String employee_id){
        return employeeMapper.searchEmployee(employee_id);
    }

}
