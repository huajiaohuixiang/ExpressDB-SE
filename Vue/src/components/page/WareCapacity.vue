<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 仓库容量查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            
            <el-tag  
            size="medium"
            effect="plain"
            v-for="(item,index) in warelist"
            v-bind:todo="item"
            v-bind:key="index"
            >
            仓库{{item.warehouseName}}   剩余容量：{{item.left_capacity}}
            </el-tag>
            
        </div>
       


        <div class="container">
            <div class="handle-box">
                
                 <el-tag
                
                 size="medium"
                type="info">
                请选择仓库
               </el-tag>
                <el-select v-model="query.address" placeholder="仓库选择" class="handle-select mr10" @change="getDataBySelect($event)">
                    <el-option 
                    key="所有"
                    label="所有"
                    value="所有"
                    >

                    </el-option>
                    <el-option
                        v-for="item in warelist"
                        v-bind:todo="item"
                        v-bind:key="item.warehouseName"
                        :label="item.warehouseName"
                        :value="item.warehouseName"
                    >
                    </el-option>
                   
                </el-select>
                <el-input v-model="query.name" placeholder="包裹编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <!--     :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)" -->
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
                <el-table-column prop="warehouseId" label="仓库编号"  align="center"></el-table-column>
                <el-table-column prop="packageId" label="包裹编号"  align="center"></el-table-column>
                <el-table-column prop="senderName" label="发件人" width='70px' align="center"></el-table-column>
                <el-table-column prop="senderPhone" label="发件人手机"  align="center"> </el-table-column>
               
                <el-table-column prop="receiverName" label="收件人" width='70px' align="center">
                 
                    <!-- <template slot-scope="scope">{{scope.row.toname}}</template> -->
                </el-table-column>
                 <el-table-column prop="receiverPhone" label="收件人手机" align="center" ></el-table-column> 
               
                <el-table-column prop="in_time" label="入库时间"  align="center">
                    <!-- <template slot-scope="scope">
                        {{scope.row.company}}
                    </template> -->
                </el-table-column>
                

                           <!-- "query.pagesize" -->
               
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="this.query.pageIndex"
                    :page-size="this.query.pageSize"
                    :total="this.packagenum"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
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
            //w上半部的仓库信息
            warelist:[],
            wareData:[],
            pageTotal:0,
            sumData:[],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            packagenum:0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {

            console.log("getData");
            let that =this;
            this.$axios.get('http://huajiao.site:8084/getWareInfo')
                .then(function(response) {
                    console.log(response.data);             
                    that.warelist=response.data;
                    console.log("a");                   
                })
                .catch(function(error) {
                    console.log("b");                
                })
            this.$axios.get("http://huajiao.site:8084/getmetedata")
                .then(function(response){
                    
                    that.packagenum=response.data;
                    
                    that.pageTotal=Math.ceil(that.packagenum/that.query.pageSize) ;
                    console.log(that.pageTotal)
                })

            this.$axios.get("http://huajiao.site:8084/getWareDetails?pageindex="+"1"+"&pagesize="+this.query.pageSize)
            // 'http://huajiao.site:8084/getWareDetails'
                .then(function(response) {
                    console.log(response.data);
                    that.tableData=response.data;
                    console.log("a"); 
                   // that.pageTotal=parseInt((response.data.length));                    
                    that.sumData=that.tableData;
                })
                .catch(function(error) {
                    console.log("b");                
                })
        },
        // 触发搜索按钮
        handleSearch() {
            let that =this;
            this.$axios.get('http://huajiao.site:8084/worker/getWarePackageById?id='+this.query.name)
                .then(function(response) {                  
                    console.log(response.data);                     
                    that.tableData=[];                                                
                    that.tableData.push(response.data)                  
                    that.packagenum=1
                          
                })
                .catch(function(error) {
                    console.log("b");                  
                })

        },
        getDataBySelect(){
            console.log("还活着");
            if(this.query.address=='所有'){
                this.tableData=this.sumData;
                this.$set(this.query, 'pageIndex', 1)
            }else{
                let tempData=this.sumData;
                console.log(tempData);
                let result=[];           
                tempData.forEach(element => {
                    let name='';
                    this.warelist.forEach(item=>{
                        if(item.warehouseId==element.warehouseId){
                            name=item.warehouseName;
                        }
                    })

                    if(name==this.query.address){ result.push(element);}  
                });
                this.tableData=result;
            }
            this.pageTotal=this.tableData.length
            console.log("没了")
        },


        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
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
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },




        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            console.log(val)
            let that=this
            this.$axios.get("http://huajiao.site:8084/getWareDetails?pageindex="+val+"&pagesize="+this.query.pageSize)
            .then(function(response) {
                    console.log(response.data);
                    that.tableData=response.data;
                    })

            this.$set(this.query, 'pageIndex', val);
             //this.getData();
        },
      
      
       
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
