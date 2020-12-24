<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 寄件订单管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select  v-model="query.address" placeholder="状态" class="handle-select mr10" @change="getDataBySelect($event)">
                    <el-option key="全部" label="全部" value="全部"></el-option>
                    <el-option key="未接单" label="未接单" value="未接单"></el-option>
                    <el-option key="已接单" label="已接单" value="已接单"></el-option>
                    <el-option key="已分配" label="已分配" value="已分配"></el-option>
                     <el-option key="已完成" label="已完成" value="已完成"></el-option>
                  <el-option key="已取消" label="已取消" value="已取消"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="订单编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-check" @click="AcceptAllSelection">接单</el-button> 
                <el-button type="primary" icon="el-icon-bicycle" @click="AllotAllSelection">分配</el-button>
     <el-button type="primary" icon="el-icon-check" @click="myOrder">查看我的订单</el-button> 
            </div>
            <el-table
                :data="tableData"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="orderId" label="订单编号" width="100" align="center"></el-table-column>
                <el-table-column prop="senderName" label="发件人" width="80" align="center"></el-table-column>
                <el-table-column prop="sendPhone" label="发件人手机" width="120" align="center"> </el-table-column>
                <el-table-column prop="receiverName" label="收件人" width="80" align="center">
                 
                    <!-- <template slot-scope="scope">{{scope.row.toname}}</template> -->
                </el-table-column>
                 <el-table-column prop="receiverPhone" label="收件人手机" width="100" align="center"></el-table-column> 
                <el-table-column prop="receiverAddress" label="收件地址"  align="center">
                    <!-- <template slot-scope="scope">
                        {{scope.row.address}}
                    </template> -->
                </el-table-column>
                <el-table-column prop="company" label="快递公司"  width="100" align="center">
                    <template slot-scope="scope">
                        {{scope.row.company}}
                    </template>
                </el-table-column>
                <el-table-column prop="employeeId" label="分配的员工" width='100px'  align="center">
                    
                </el-table-column>
                <el-table-column prop="status" label="状态" width='70px' align="center"  >
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.status==='已完成'?'success':(scope.row.status==='已分配'?'warning':(scope.row.status=='已接单'?'':(scope.row.status==='未接单'?'danger':(scope.row.status==='已取消'?'info':''))))"   
                          
                        >{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>

                    
                <el-table-column label="          操作          " align="center" >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-s-promotion"
                            class="jiedan"
                            @click="handleAccept(scope.$index, scope.row)"
                        >接单</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-bicycle"
                            class="yellow"
                            @click="handleAllot(scope.$index, scope.row)"
                        >分配人员</el-button>
                         <el-button
                            type="text"
                            icon="el-icon-check"
                            class="green"
                            @click="handleOK(scope.$index, scope.row)"
                        >完成</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pagesize"
                    :total="ordernum"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="订单编号">
                    <el-input v-model="form.orderId"></el-input>
                </el-form-item>
                <el-form-item label="发件人">
                    <el-input v-model="form.senderName"></el-input>
                </el-form-item>
                <el-form-item label="发件人手机号">
                    <el-input v-model="form.sendPhone"></el-input>
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input v-model="form.receiverName"></el-input>
                </el-form-item>
                <el-form-item label="收件人手机号">
                    <el-input v-model="form.receiverPhone"></el-input>
                </el-form-item>
                <el-form-item label="收件地址">
                    <el-input v-model="form.receiverAddress"></el-input>
                </el-form-item>
                
                <el-form-item label="快递公司">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="分配的员工"  >
                    <el-input v-model="form.employeeId" ></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.status"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>


         <el-dialog title="分配员工" :visible.sync="allocVisible" width="50%">
            <el-table :data="emData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="EMPLOYEE_ID" label="员工ID" width="100" align="center"></el-table-column>
                <el-table-column prop="NAME" label="姓名" align="center" width="120"></el-table-column>
    
                <el-table-column prop="CELL_PHONE" label="联系电话" align="center" width="175"></el-table-column>

                <el-table-column prop="STATUS" label="状态" align="center" width="110">
                 
                </el-table-column>

                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                       
                        <el-button type="text" icon="el-icon-edit" @click="handleAllocc(scope.$index, scope.row)">分配</el-button>
                        
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allocVisible = false">完成</el-button>
   
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            sumData:[],
            tableData: [],
            ordernum:0,
            emData:[],
            status1:'已接单',
            multipleSelection: [],
            delList: [],
            emmData:[],
               position:localStorage.getItem("_position"),
            myId:localStorage.getItem("_id"),
            editVisible: false,
            allocVisible:false,
            pageTotal: 0,
            allotion:{},
            form: {},
            idx: -1,
            id: -1
            // sumData:[],
            // tableData: [],
            // ordernum:0,

            // multipleSelection: [],
            // delList: [],
            // editVisible: false,
            // allocVisible:false,
            // pageTotal: 0,
            // allotion:{},
            // form: {},
            // idx: -1,
            // id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {       
        getData() {
            console.log("getData");
            let that =this;
            this.$axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method:"get",
                url:'https://www.csystd.cn:9999/worker/getOrderNum',
                 params:{
                    token:localStorage.getItem('token')
                }
            }).then(function(response){
                console.log(response)
                    console.log(response.data)
                    that.packagenum=response.data

                }) 
            // this.$axios.get('https://www.csystd.cn:9999/worker/getOrderNum')
            //     .then(function(response) {
            //         console.log(response.data);
            //         that.ordernum=response.data;
            //     })


            this.$axios.get('https://www.csystd.cn:9999/worker/getOrder?pageindex=1&pagesize='+that.query.pageSize,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response) {
                    console.log(response.data);
                    that.tableData=response.data;
                //    that.pageTotal=parseInt((response.data.length));
                   // that.sumData=that.tableData;
                   that.tableData.forEach(element => {
                       if(element.status==null){
                           console.log(1)
                           var that2=that;
                            that.$axios.get('https://www.csystd.cn:9999/worker/updateStatus?id='+element.orderId+'&status='+'未接单',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                                .then(function(response){
                                    if(response.data==1){
                                        that2.$message.success('初始化成功');
                                        element.status="未接单";
                                    }else{

                                    }
                                })
                       }
                   });
                })
                .catch(function(error) {
                    console.log("b");                
                })

            
        },
             myOrder(){
            let that=this;
            if (this.position!='快递员'){
                   this.$message.warning('只有快递员才可以查看自己的订单！');}
                
            else{
                 that.$axios.post('https://www.csystd.cn:9999/worker/getMyOrder?employee_id='+that.myId,{},{
                     params:{
                    token:localStorage.getItem('token')
                }
                 }).then(function(response){
              console.log(response);
              that.tableData=response.data;
          })
            }
        },
        getDataByOrderID(){
            let that =this;
            this.$axios.get('https://www.csystd.cn:9999/worker/getOrderById?id='+this.query.name,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response) {                  
                    console.log(response.data);                     
                    var ssss=[]                   
                    ssss.push(response.data)                                                  
                    that.tableData=ssss                  
                    that.ordernum=1
                          
                })
                .catch(function(error) {
                    console.log("b");                  
                })

        },
        handleSearch() {
            console.log("1")
            //添加get 搜索操作
            this.$set(this.query, 'pageIndex', 1);
            this.getDataByOrderID();
            console.log("sss")
        },
        getDataBySelect(){
            console.log("还活着");
            if(this.query.address=="全部"){
                this.getData();
            }else{
                var that=this
                this.$axios.get('https://www.csystd.cn:9999/worker/getSomeNum?status='+that.query.address,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response) {
                    that.ordernum=response.data
                    
                })
                this.$axios.get('https://www.csystd.cn:9999/worker/getSomeOrder?status='+that.query.address+'&pageindex='+1+'&pagesize='+that.query.pageSize,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response) {
                    that.tableData=response.data

                })
                // let tempData=this.sumData;
                // console.log(tempData);
                // let result=[];           
                // tempData.forEach(element => {
                //     if(element.status==this.query.address){ result.push(element);}  
                // });
                // this.tableData=result;
            }
            // this.pageTotal=this.tableData.length
            console.log("没了")
        },
        handleAccept(index, row){
            //还需添加函数
           
            var accept=this.tableData.slice(index,index+1);
            console.log(accept);
            accept=accept[0]
            if(accept.status!='未接单'){
                this.$message.warning('只有未接单的订单才能接单');
            }else{
                 var that=this;
            this.$axios.get('https://www.csystd.cn:9999/worker/updateStatus?id='+accept.orderId+'&status='+'已接单'+'&phone='+accept.sendPhone,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response){
                    if(response.data==1){
                        that.$message.success('接受订单成功');
                        accept.status="已接单";
                    }else{

                    }
                })
            console.log(accept.orderId)
            }
           
            
            
        },
        handleOK(index, row){
            //还需添加函数
           
            var finsh=this.tableData.slice(index,index+1);
            console.log(finsh);
            finsh=finsh[0]
            if(finsh.status!='已分配'){
                this.$message.warning('只有已分配的订单才能完成');
            }else{
                 var that=this;
            this.$axios.get('https://www.csystd.cn:9999/worker/updateOK?id='+finsh.orderId+'&status='+'已完成'+'&phone='+finsh.sendPhone+'&employeeID='+finsh.employeeId,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response){
                    if(response.data==1){
                        that.$message.success('该订单已完成');
                        finsh.status="已完成";
                    }else{
                    }
                })
            console.log(finsh.orderId)
            }
        },
       

        handleAllot(index, row){
            let allot=this.tableData.slice(index,index+1);
            allot=allot[0]
            if(allot.status!='已接单'){
                this.$message.warning('只有已接单的订单才能分配');
            }else{
            var that=this; 
            this.allotion=allot;
            that.allocVisible=true;
              that.$axios.get('https://www.csystd.cn:9999/worker/getCourier',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
).then(function(response){
              console.log(response);
              that.emData=response.data;
          })
          
           
            }
            
                   
        },
        handleAllocc(index, row){
          console.log(row);
          let that=this;
           this.$axios.get('https://www.csystd.cn:9999/worker/updateOrderEmployee?id='+this.allotion.orderId+'&phone='+this.allotion.sendPhone+'&employeeId='+row.EMPLOYEE_ID,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response){
                    if(response.data==1){
                       that.$message.success('分配人员成功');
                       that.allotion.status='已分配';
                       that.allotion.employeeId=row.EMPLOYEE_ID;
//                         that.$axios.post('https://www.csystd.cn:9999/worker/dispatcherEmployee?employee_id='+row.EMPLOYEE_ID,{
               
//                 params:{
//                     token:localStorage.getItem('token')
//                 }
//             }
// ).then(function (response) {
//                 console.log(response);
              
//             });
                       
                    }else{

                    }
                    })        
        
        },


        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    
                    let del=this.tableData.splice(index,index+1);
                    console.log(del)
                    del=del[0]
                    var that=this;
                    this.$axios.delete('https://www.csystd.cn:9999/worker/deleteOrder?id='+del.orderId,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                        .then(function(response){
                            if(response.data==1){
                                that.$message.success('删除成功');
                                that.getData();
                            }else{

                            }
                        })  
                })
                .catch(() => {});
           
        },
        

        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);

            this.$confirm('确定要删除已选订单吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    for (let i = 0; i < length; i++) {
                    
                        let del=this.multipleSelection[i]
                        console.log(del)
                        //del=del[0]
                        var that=this;
                        this.$axios.delete('https://www.csystd.cn:9999/worker/deleteOrder?id='+del.orderId,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                            .then(function(response){
                                if(response.data==1){
                                    that.$message.success('删除'+del.orderId+'成功');
                                    that.getData();
                                }else{

                                }
                            })  
                            console.log(this.multipleSelection[i]);
                    }
                    this.multipleSelection = [];
                })
                .catch(() => {});

            
           // this.$message.error(`删除了${str}`);
            
        },


        AcceptAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                let accept=this.multipleSelection[i]
                console.log(this.multipleSelection[i]);
                if(accept.status!='未接单'){
                    this.$message.warning('只有未接单的订单才能接单');
                }
                else{
                    var that=this;
                    this.$axios.get('https://www.csystd.cn:9999/worker/updateStatus?id='+accept.orderId+'&status='+'已接单',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                        .then(function(response){
                            if(response.data==1){
                                that.$message.success('接受订单'+accept.orderId+'成功');
                                accept.status="已接单";
                            }else{

                            }
                        })
                    console.log(accept.orderId)
                    
                    // str += this.multipleSelection[i].name + ' ';
                    
                }
              //  this.$message.error(`接单了${str}`);
               
            }
             this.multipleSelection = [];
        },
        AllotAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            
            for (let i = 0; i < length; i++) {
                let allot=this.multipleSelection[i];

                if(allot.status!='已接单'){
                    this.$message.warning('只有已接单的订单才能分配');
                }else{
                var that=this;
                this.$axios.get('https://www.csystd.cn:9999/worker/updateOrderEmployee?id='+allot.orderId+'&employeeId='+'000001',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                    .then(function(response){
                        if(response.data==1){
                        that.$message.success('分配人员成功');
                        allot.status="已分配"
                        allot.employeeId='000001'
                        }else{

                        }
                    })         
                }

               // str += this.multipleSelection[i].name + ' ';
                console.log(this.multipleSelection[i]);
            }
          //  this.$message.error(`接单了${str}`);
            this.multipleSelection = [];
        },





        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            let order=this.form
          
            var that=this;
            this.$axios.post('https://www.csystd.cn:9999/worker/updateOrder',order,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response){
                    if(response.data==1){
                        that.$message.success(`修改第 ${that.idx + 1} 行成功`);
                        that.$set(that.tableData, that.idx, this.form);
                    }else{

                    }
                })
            


            

            
        },


        // 分页导航
        handlePageChange(val) {
            // 获取第i页的信息


            this.$set(this.query, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.jiedan {
    color: #ec4569;
}
.yellow {
    color: #e69c2e;
}
.green{
    color:#168307;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
