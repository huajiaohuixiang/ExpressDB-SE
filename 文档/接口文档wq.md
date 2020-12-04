1. 包裹入库

   先在包裹表中插入一个包裹，

   然后再在入库表中插入一条入库记录

   最后向仓库明细表中插入该包裹

   方式:POST

   请求参数：

   | 类型   | 属性            | 说明           |
   | :----- | --------------- | -------------- |
   | String | package_ID      | 包裹编号       |
   | String | warehouse_ID    | 仓库ID         |
   | String | employee_ID     | 员工编号       |
   | String | EX_Company      | 快递公司       |
   | String | Sender_name     | 寄件人姓名     |
   | String | Sender_phone    | 寄件人手机     |
   | String | Sender_province | 寄件人省       |
   | String | Sender_city     | 寄件人市       |
   | String | Sender_region   | 寄件人区县     |
   | String | Sender_detail   | 寄件人详细地址 |
   | Date   | Sender_time     | 寄件时间       |
   | String | Rec_name        | 收件人姓名     |
   | String | Rec_phone       | 收件人电话     |
   | String | Rec_province    | 收件人省       |
   | String | Rec_city        | 收件人市       |
   | String | Rec_region      | 收件人区县     |
   | String | Rec_detail      | 收件人详细地址 |
   | String | Content         | 包裹内容       |
   | String | Weight          | 包裹重量       |

   返回参数：（不要直接返回String,封装到对象里面）

   | 类型 | 属性 | 说明     |
   | ---- | ---- | -------- |
   | Date | time | 入库时间 |

   

2. 查询包裹

   方式:GET

   请求参数：

   | 类型   | 属性       | 说明     |
   | ------ | ---------- | -------- |
   | String | package_ID | 包裹编号 |

   返回参数：

   | 类型   | 属性           | 说明                                             |
   | :----- | -------------- | ------------------------------------------------ |
   | String | Company        | 快递公司                                         |
   | String | Sender_name    | 寄件人姓名                                       |
   | String | Sender_phone   | 寄件人手机                                       |
   | String | Sender_address | 寄件人地址(把省市区县消息地址搞在一起返回)       |
   | String | Rec_name       | 收件人姓名                                       |
   | String | Rec_phone      | 收件人电话                                       |
   | String | State          | 包裹状态（已入库，已入柜，已签收）需要查询其他表 |
   | String | package_ID     | 包裹编号                                         |

3. 查询所有包裹

   方式:GET

   请求参数：无

   返回参数：一个链表

   | 类型   | 属性           | 说明                                             |
   | :----- | -------------- | ------------------------------------------------ |
   | String | Company        | 快递公司                                         |
   | String | Sender_name    | 寄件人姓名                                       |
   | String | Sender_phone   | 寄件人手机                                       |
   | String | Sender_address | 寄件人地址(把省市区县消息地址搞在一起返回)       |
   | String | Rec_name       | 收件人姓名                                       |
   | String | Rec_phone      | 收件人电话                                       |
   | String | State          | 包裹状态（已入库，已入柜，已签收）需要查询其他表 |
   | String | package_ID     | 包裹编号                                         |

4. 删除包裹

   方式:POST

   请求参数：

   | 类型   | 属性       | 说明     |
   | ------ | ---------- | -------- |
   | String | package_ID | 包裹编号 |

   返回参数：（不要直接返回String,封装到对象里面）

   | 类型   | 属性  | 说明                              |
   | ------ | ----- | --------------------------------- |
   | String | state | 返回是否删除成功（success，fail） |

5. 修改包裹

   方式:POST

   请求参数：

   | 类型   | 属性           | 说明                                             |
   | :----- | -------------- | ------------------------------------------------ |
   | String | Company        | 快递公司                                         |
   | String | Sender_name    | 寄件人姓名                                       |
   | String | Sender_phone   | 寄件人手机                                       |
   | String | Sender_address | 寄件人地址(把省市区县消息地址搞在一起返回)       |
   | String | Rec_name       | 收件人姓名                                       |
   | String | Rec_phone      | 收件人电话                                       |
   | String | State          | 包裹状态（已入库，已入柜，已签收）需要查询其他表 |
   | String | package_ID     | 包裹编号                                         |

   返回参数：（不要直接返回String,封装到对象里面）

   | 类型   | 属性  | 说明                              |
   | ------ | ----- | --------------------------------- |
   | String | state | 返回是否删除成功（success，fail） |

   

6. 发送取件消息

   方式：POST

   请求参数：  （向用户取件消息表发送消息）

   | 类型   | 属性       | 说明     |
   | ------ | ---------- | -------- |
   | String | user_ID    | 用户ID   |
   | String | package_ID | 包裹编号 |
   |        |            |          |

   返回参数：（不要直接返回String,封装到对象里面）

   | 类型   | 属性  | 说明                              |
   | ------ | ----- | --------------------------------- |
   | String | state | 返回是否发送成功（success，fail） |

   ​	

7. 包裹出库入柜

   传值仓库ID 快递箱ID 员工ID ，

   

   1.从仓库明细表中删除该包裹信息

   2向用户取件消息表插入 （mesageID，data，userID，content）content为包裹信息以及通知来取件；

   3.然后向包裹出库入柜表插入。

   方式:

   POST

   请求参数：

   | 类型   | 属性         | 说明       |
   | ------ | ------------ | ---------- |
   | String | package_ID   | 包裹编号   |
   | String | warehouse_ID | 仓库ID     |
   | String | box_ID       | 快递箱编号 |
   | String | user_ID      | 用户ID     |
   | String | employee_ID  | 员工编号   |

   返回参数：（不要直接返回String,封装到对象里面）

   | 类型   | 属性  | 说明                          |
   | ------ | ----- | -----------------------------|
   | String | state | 返回是否成功（success，fail） |

8. 查询订单

   方式:GET

   请求参数：order_ID

   | 类型   | 属性     | 说明                                         |
   | ------ | -------- | --------------------------------------------|
   | String | order_ID | 订单编号  |

   返回参数：

   | 类型   | 属性           | 说明                                                     |
   | :----- | -------------- | -------------------------------------------------------- |
   | String | order_ID       | 订单编号                                                 |
   | String | Company        | 快递公司                                                 |
   | String | Sender_name    | 寄件人姓名                                               |
   | String | Sender_phone   | 寄件人手机                                               |
   | String | Rec_name       | 收件人姓名                                               |
   | String | Rec_phone      | 收件人电话                                               |
   | String | Sender_address | 收件人地址(把省市区县消息地址搞在一起返回)               |
   | String | State          | 快递状态（已接单，未接单，已入库，已出库）需要查询其他表 |
   |        |                |                                                          |

   

   

9. 查询所有订单

   方式:GET

   请求参数：无

   返回参数：一个链表

   | 类型   | 属性           | 说明                                                     |
   | :----- | -------------- | -------------------------------------------------------- |
   | String | order_ID       | 订单编号                                                 |
   | String | Company        | 快递公司                                                 |
   | String | Sender_name    | 寄件人姓名                                               |
   | String | Sender_phone   | 寄件人手机                                               |
   | String | Rec_name       | 收件人姓名                                               |
   | String | Rec_phone      | 收件人电话                                               |
   | String | Sender_address | 收件人地址(把省市区县消息地址搞在一起返回)               |
   | String | State          | 快递状态（已接单，未接单，已入库，已出库）需要查询其他表 |
   |        |                |                                                          |

   

10. 修改订单


   方式:POST

   请求参数：

| 类型   | 属性           | 说明                                                     |
| :----- | -------------- | -------------------------------------------------------- |
| String | order_ID       | 快递编号                                                 |
| String | Company        | 快递公司                                                 |
| String | Sender_name    | 寄件人姓名                                               |
| String | Sender_phone   | 寄件人手机                                               |
| String | Rec_name       | 收件人姓名                                               |
| String | Rec_phone      | 收件人电话                                               |
| String | Sender_address | 收件人地址(把省市区县消息地址搞在一起返回)               |
| String | State          | 快递状态（已接单，未接单，已入库，已出库）需要查询其他表 |
|        |                |                                                          |

   返回参数：不要直接返回String

| 类型   | 属性  | 说明                          |
| ------ | ----- | ----------------------------- |
| String | state | 返回是否成功（success，fail） |

12. 删除订单

    方式:POST

    请求参数：

    | 类型   | 属性     | 说明     |
    | ------ | -------- | -------- |
    | String | order_ID | 订单编号 |

    返回参数：不要直接返回String

    | 类型   | 属性  | 说明                          |
    | ------ | ----- | ----------------------------- |
    | String | state | 返回是否成功（success，fail） |

    

13. 查询仓库信息

    方式:GET

    请求参数：

    | 类型   | 属性         | 说明                             |
    | ------ | ------------ | -------------------------------- |
    | String | warehouse_ID | 仓库ID/如果为all返回所有仓库信息 |

    返回参数：

    | 类型   | 属性           | 说明     |
    | ------ | -------------- | -------- |
    | String | warehouse_ID   | 仓库ID   |
    | Int    | capacity       | 容量     |
    | String | warehouse_name | 仓库名字 |
    | Int    | left_capacity  | 剩余容量 |

14. 查询仓库中的包裹信息

    方式:GET

    请求参数：

    | 类型   | 属性         | 说明   |
    | ------ | ------------ | ------ |
    | String | warehouse_ID | 仓库ID |

    返回参数：一个链表

    | 类型   | 属性       | 说明       |
    | ------ | ---------- | ---------- |
    | String | package_ID | 包裹编号   |
    | String | Date       | 入库时间   |
    | String | Rec_name   | 收件人名字 |
    | String | Rec_phone  | 收件人电话 |

14. 查询某快递柜所有快递箱信息

    方式:GET

    请求参数：

    | 类型   | 属性        | 说明     |
    | ------ | ----------- | -------- |
    | String | cupboard_ID | 快递柜ID |

    返回参数：

    | 类型   | 属性       | 说明                                                         |
    | ------ | ---------- | ------------------------------------------------------------ |
    | String | box_ID     | 快递箱编号                                                   |
    | String | type       | 入库时间                                                     |
    | Int    | col        | 收件人名字                                                   |
    | Int    | row        | 收件人电话                                                   |
    | String | state      | 快递箱状态                                                   |
    | String | package_ID | 包裹id （包裹id为空则状态为空闲；包裹id存在则状态为正在使用） |

16.查询快递柜

​		方式:GET

​	    请求参数：无

​		返回参数：

| 类型   | 属性          | 说明         |
| ------ | ------------- | ------------ |
| String | cupboard_ID   | 快递柜编号   |
| Int    | left_capacity | 剩余空闲数量 |
|        |               |              |

​	

