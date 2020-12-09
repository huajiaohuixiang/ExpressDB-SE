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
            v-for="item in cuplist"
            v-bind:todo="item"
            v-bind:key="item.cupboardId"
            >
            快递柜{{item.cupboardName}}   剩余容量：{{item.left_capacity}}
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
                   
                    <el-option
                    v-for="item in cuplist"
                   v-bind:todo="item"
                    v-bind:key="item.cupboardName"
                    :label="item.cupboardName"
                    :value="item.cupboardName"
                    >

                    </el-option>
                    
                    
                    
                </el-select>
                <el-input v-model="query.name" placeholder="包裹编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            

            <div calss="container">
                 <div>
                <el-tag
                
                >左边</el-tag>
                 <el-tag
                
                >右边</el-tag>
                </div>
                 <div
                v-for="(row,index) in boxarray"        
                v-bind:key="index"
            >
                <el-tag
                >
                    第{{9-index}}行
                </el-tag>
               <el-tag
                size="medium"
               v-for="col in row"
               v-bind:todo="col"
                    v-bind:key="col.boxId"
                    :type="col.state"
               >
                    {{'空闲'}}
               </el-tag>
          
            </div>
            </div>
        </div>

<!--  <div
                v-for="(row,index) in boxarray"        
                v-bind:key="index"
            >
                <el-tag
                >
                    第{{9-index}}行
                </el-tag>
               <el-tag
                size="medium"
               v-for="col in row"
               v-bind:todo="col"
                    v-bind:key="col.boxId"
                    :type="col.state"
               >
                    {{'空闲'}}
               </el-tag>
          
            </div> -->



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
           
           
            cuplist:[],
            list:[],
            boxlist:[],
            boxarray:[],

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
    
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {

            console.log("getData");
            let that =this;
            this.$axios.get('http://localhost:8081/getCupInfo')
                .then(function(response) {
                    console.log(response.data);                
                    that.cuplist=response.data;
                    console.log("a");                   
                })
                .catch(function(error) {
                    console.log("b");                
                })
            this.$axios.get('http://localhost:8081/getCupDetails')
                .then(function(response) {
                    console.log(response.data);
                    that.boxlist=response.data;
                    that.boxlist.forEach(item=>{
                        if(item.cupboardId=='000001'){
                            that.list.push(item)
                        }
                    })
                  
                  //  that.tableData=response.data;
                   that.list.sort(that.sortId)
                     console.log(that.list)
                    console.log("a"); 
                    that.pageTotal=parseInt((response.data.length));                    
                    that.sumData=that.tableData;
                })
                .catch(function(error) {
                    console.log("b");                
                })
        },
       
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        getDataBySelect(){
            console.log("还活着");
            
            let templist=this.boxlist;
            console.log(templist);
            let result=[];           
            templist.forEach(element => {
                let name='';
                this.cuplist.forEach(item=>{
                    if(item.cupboardId==element.cupboardId){
                        name=item.cupboardName;
                    }
                })

                if(name==this.query.address){ result.push(element);}  
            });
            this.list=result;
            this.list.sort(this.sortId)

            for(let x=0;x<this.boxarray.length;x++){
 this.boxarray.pop()
            }

           
            for (let i=0;i<10;i++){
                let temp=[];
                for(let j=0;j<20;j++){
                    temp.push(this.list[i*20+j])
                }
                temp.sort(this.sortinseId)
                this.boxarray.push(temp);
            }
            console.log(this.boxarray)


            this.pageTotal=this.tableData.length
            console.log("没了")
        },



        sortId(a, b) {
               // return a.distance - b.distance;//由低到高
                return b.boxId - a.boxId;//由高到低
        },

           sortinseId(a, b) {
               // return a.distance - b.distance;//由低到高
                return a.boxId - b.boxId;//由高到低
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
            this.$set(this.query, 'pageIndex', val);
             //this.getData();
        },
      
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
