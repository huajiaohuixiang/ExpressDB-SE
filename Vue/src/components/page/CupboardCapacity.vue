<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 快递柜容量查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="container">
           
            <el-tag  
            size="medium"
            effect="plain"
            v-for="i in cuplist"
            v-bind:todo="i"
            v-bind:key="i"
            >
            快递柜{{i}}   剩余容量：1000
            </el-tag>
            
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="快递柜选择" class="handle-select mr10" @change="getDataBySelect($event)">
                    <el-option key="0" label="全部" value="0"></el-option>
                    <el-option key="1" label="快递柜1" value="1"></el-option>
                    <el-option key="2" label="快递柜2" value="2"></el-option>
                     <el-option key="3" label="快递柜3" value="3"></el-option>
                  <el-option key="4" label="快递柜4" value="4"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="包裹编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            

            <div calss="container"
                v-for="i in list"
                v-bind:todo="i"
                v-bind:key="i"
            >
                <el-tag  
                    size="medium"
                    
                              
                    v-for="item in boxlist[i]"
                    v-bind:todo="item"
                    v-bind:key="item"
                    :type="item"
                >
                x={{i}}  y=0  {{item}} 
                </el-tag>
            </div>
            
        </div>





    </div>
</template>

<script>
export default {
 name: 'CupBoard',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            cuplist:[1,2,3,4],
            list:[1,0],
            boxlist:[["success","warning","success1","success2","success3"],["success4","success5","success6","success7","success8"]],
            cupboardData:[],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    getDataBySelect(){
        console.log("还活着");
        // if(this.query.address=="全部"){
        //     this.tableData=this.sumData;
        //     this.$set(this.query, 'pageIndex', 1)
        // }else{
        //     let tempData=this.sumData;
        //     console.log(tempData);
        //     let result=[];           
        //     tempData.forEach(element => {
        //         if(element.state==this.query.address){ result.push(element);}  
        //     });
        //     this.tableData=result;
        // }
        // this.pageTotal=this.tableData.length
        console.log("没了")
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
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
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }

}
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
