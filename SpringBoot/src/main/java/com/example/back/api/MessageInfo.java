package com.example.back.api;


import com.example.back.entity.Message;
import com.example.back.mapper.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

@RestController
@CrossOrigin
public class MessageInfo {
    @Autowired
    MessageMapper messageMapper;

    @GetMapping("/getMessage")
    public LinkedList<Message> getMessage(){

        return messageMapper.getMessage();
    }

    @PostMapping("/addMessage")
    public String addMessage(@RequestBody Message message){
        messageMapper.addMessage(message.getMessageId(),message.getSendDate(),message.getUserId(),message.getContent(),message.getMessageType(),message.getStatus());
        return "success";
    }

    @GetMapping("/searchMessage")
    public LinkedList<Message> searchMessage(@RequestParam("user_id") String user_id,@RequestParam("message_type") String type){

        return messageMapper.searchMessage(user_id,type);
    }

    @PostMapping("/deleteMessage")
    public String deleteMessage(@RequestParam("message_id") String message_id){
      messageMapper.deleteMessage(message_id);
        return "success";
    }
  @GetMapping("/lastMessage")
  public Object lastMessage(){
        return messageMapper.lastMessage();
  }
    @PostMapping("/resendMessage")
    public String resendMessage(@RequestBody Message message){
        messageMapper.addMessage(message.getMessageId(),message.getSendDate(),message.getUserId(),message.getContent(),message.getMessageType(),"已发送");
        return "重新发送消息成功";
    }
    @PostMapping("/updateMessage")
    public  String updateMessage(@RequestBody Message message){
        messageMapper.updateMessage(message.getMessageId(),message.getStatus());
        return "更新成功";
    }
    @PostMapping("/getNum")
    public Map<String,Object> getNum(){
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("user_total",messageMapper.getUsersNum());
        map.put("message_total",messageMapper.getMessageNum());
        map.put("package_total",messageMapper.getPackageNum());
        return  map;
    }
}