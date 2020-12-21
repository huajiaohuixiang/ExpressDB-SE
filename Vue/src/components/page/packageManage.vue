<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 包裹管理
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
                <el-select v-model="query.address" placeholder="请选择状态" class="handle-select mr10"  @change="getDataBySelect($event)">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="已入库" value="已入库"></el-option>
                    <el-option key="3" label="已入柜" value="已入柜"></el-option>
                    <el-option key="4" label="已签收" value="已签收"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="包裹编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="packageID" label="包裹编号" width="100" align="center"></el-table-column>
                <el-table-column prop="senderName" label="发件人" width="80" align="center"></el-table-column>
                <el-table-column prop="senderPhone" label="发件人手机" width="120" align="center"> </el-table-column>
                <el-table-column prop="senderAddress" label="发件人地址"  align="center">
                    
                </el-table-column>
                <el-table-column prop="receiverName" label="收件人" width="80" align="center">
                 
                    <!-- <template slot-scope="scope">{{scope.row.toname}}</template> -->
                </el-table-column>
                <el-table-column prop="receiverPhone" label="收件人手机" width="100"></el-table-column> 
               
                <el-table-column prop="company" label="快递公司"  width="100" align="center">
                   
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="80" >
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.state==='已入库'?'info':(scope.row.state==='已入柜'?'warning':(scope.row.state=='已签收'?'success':''))"                           
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
 
                           
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
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
                    :page-size="query.pageSize"
                    :total="packagenum"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="订单编号">
                    <el-input v-model="form.package_id"></el-input>
                </el-form-item>
                <el-form-item label="发件人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="发件人手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input v-model="form.receivename"></el-input>
                </el-form-item>
                <el-form-item label="收件人手机号">
                    <el-input v-model="form.receivephone"></el-input>
                </el-form-item>
                <el-form-item label="收件地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="快递公司">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.state"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
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
                pageSize: 1
            },
            tableData: [],
            sumData:[],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
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
            var that=this;
            this.$axios.get('https://www.csystd.cn:9999/worker/package/countPackage')
                .then(function(response){
                    console.log(response.data)
                    that.packagenum=response.data

                }) 
            this.$axios.get('https://www.csystd.cn:9999/worker/package/allQuery/'+this.query.pageSize+'/1')
                .then(function(response){
                    console.log("start")
                    that.tableData=response.data.records
                    
                    console.log(response.data)
                })   
            // fetchData(this.query).then(res => {
            //     console.log(res);
            //     this.tableData = res.list;
            //     this.pageTotal = res.pageTotal ;    //|| 50
            //     this.sumData=this.tableData;
            // });
        },
       
        // 触发搜索按钮
        handleSearch() {
            let that=this;
             this.$axios.get('https://www.csystd.cn:9999/worker/package/singleQuery/'+this.query.name)
                .then(function(response){
                    that.tableData=[];
                    that.tableData.push(response.data);
                    that.packagenum=1
                    console.log(response)
                    console.log(response.data)
                })   
            
            this.$set(this.query, 'pageIndex', 1);
            //this.getData();
        },


        //筛选
        getDataBySelect(){
            console.log("还活着");
            if(this.query.address=="全部"){
                this.tableData=this.sumData;
                this.$set(this.query, 'pageIndex', 1)
            }else{
                let tempData=this.sumData;
                console.log(tempData);
                let result=[];           
                tempData.forEach(element => {
                    if(element.state==this.query.address){ result.push(element);}  
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


        // 编辑操作
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

            var that=this;
            // this.$axios.get('https://www.csystd.cn:9999/worker/package/countPackage')
            //     .then(function(response){
            //         console.log(response.data)
            //         that.packagenum=response.data

            //     })
            this.$axios.get('https://www.csystd.cn:9999/worker/package/allQuery/'+that.query.pageSize+'/'+val)
                .then(function(response){
                    console.log(val)
                    that.tableData=response.data.records
                    console.log(that.tableData)
                    
                })   .catch(function(error) {
                    console.log("b");                
                })
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
