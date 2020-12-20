package com.example.back.api;


import com.example.back.entity.ExOrder;
import com.example.back.mapper.orderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.naming.InsufficientResourcesException;
import java.util.LinkedList;

@RestController
@CrossOrigin
public class getOrderInfo {

    @Autowired
    orderMapper ordermapper;

    @GetMapping("/worker/getOrderById")
    public ExOrder getOrder(@RequestParam("id")String id){
        return  ordermapper.getOrderById(id);
    }

    @GetMapping("/worker/getOrderNum")
    public Integer getNum(){
        return ordermapper.getOrderNum();
    }

    @GetMapping("/worker/getOrder")
    public LinkedList<ExOrder> getAllOrder(@RequestParam("pageindex")int pageindex, @RequestParam("pagesize") int pagesize){
        System.out.println(pageindex);
        System.out.println(pagesize);
        return  ordermapper.getOrder(pageindex,pagesize);
    }

    @GetMapping("/worker/getSomeNum")
    public Integer getSomeNum(@RequestParam("status") String status){
        return ordermapper.getSomeNum(status);
    }

    @GetMapping("/worker/getSomeOrder")
    public LinkedList<ExOrder> getSomeOrder(@RequestParam("status") String status,@RequestParam("pageindex")int pageindex, @RequestParam("pagesize") int pagesize){
        System.out.println(status);
        System.out.println(pageindex);
        System.out.println(pagesize);
        return  ordermapper.getSomeOrder(status,pageindex,pagesize);
    }
    @PostMapping("/worker/updateOrder")
    public Integer UpdateOrder(@RequestBody ExOrder order){
        System.out.println(order);
        System.out.println(order.getCompany());
        System.out.println(order.getOrderId());
        System.out.println(order.getSenderName());
        System.out.println(order.getReceiverAddress()  );
        System.out.println();
        return ordermapper.UpdateOrder1(order.getOrderId(),order.getSenderName(),order.getSendPhone(),order.getReceiverName(),order.getReceiverPhone(),order.getReceiverAddress(),order.getCompany(),order.getEmployeeId(),order.getStatus());
        //return ordermapper.UpdateOrder(order);
    }

    @DeleteMapping("/worker/deleteOrder")
    public Integer delOrder(@RequestParam("id")String id){
        return ordermapper.delOrder(id);

    }
    @GetMapping("/worker/updateStatus")
    public Integer updateOrderStatus(@RequestParam("id")String id,@RequestParam("status")String status){
        System.out.println(id);
        System.out.println(status);
        return ordermapper.UpdateOrderState(id,status);

    }
    @GetMapping("/worker/updateOrderEmployee")
    public Integer updateOrderEmployee(@RequestParam("id")String id,@RequestParam("employeeId")String employeeId){
        System.out.println(id);
        System.out.println(employeeId);
        ordermapper.UpdateOrderState(id,"已分配");
        return ordermapper.UpdateOrderEmployee(id,employeeId);

    }
}
