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
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button> -->
                <el-tag
                 size="medium"
                type="info">
                
                请选择快递柜
               </el-tag>
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
               
            </div>
            
            
            <div calss="container">
                 <div>
                     <el-row>
                         <el-col :span="1">
                            <el-tag type="error">左 边</el-tag>
                         </el-col>

                         <el-col :span="1"
                            v-for="(item,index) in [...Array(20)]"
                            v-bind:key="index"
                         >
                            <el-tag type="info">
                                第{{index+1}}列
                                </el-tag>
                         </el-col>
                        <el-col :span="1">
                            <el-tag type="error">右边</el-tag>
                        </el-col>

                     </el-row>
                    
                    
                    
                </div>
                
                
                <div
                    v-for="(row,index) in boxarray"        
                    v-bind:key="index"
                >
            
                     <el-row>
                         <el-col :span="1">
                             <el-tag
                                type="info"
                                >
                                第{{10-index}}行
                                </el-tag> 
                         </el-col>
                        
                       <el-col :span="1"
                            v-for="col in row"
                            v-bind:todo="col"
                            v-bind:key="col.boxId"                                            
                       >                          
                            <el-tag
                                size="medium"
                               :type="col.state"
                               @click="showInfo"
                                >
                                {{test(col.state)}}
                            </el-tag>
                        </el-col>
                    <el-col :span="1">
                             <el-tag
                                type="info"
                                >
                                第{{10-index}}行
                                </el-tag> 
                         </el-col>
                    </el-row>
                    
                    
                    
          
            </div>
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
                address: 'A',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
           
           
            cuplist:[],
            list:[],
            boxlist:[],
            boxarray:[],
            a:{
                "success":'空闲',
                "warning":'占用',
               
            },
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
            console.log(this.test("success"));
            console.log("getData");
            let that =this;
            this.$axios.get('https://www.csystd.cn:9999/worker/getCupInfo',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                .then(function(response) {
                    console.log(response.data);                
                    that.cuplist=response.data;
                    console.log("a");                   
                })
                .catch(function(error) {
                    console.log("b");                
                })
            this.$axios.get('https://www.csystd.cn:9999/worker/getCupDetails',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                .then(function(response) {
                    console.log(response.data);
                    that.boxlist=response.data;
                    that.boxlist.forEach(item=>{
                        if(item.cupboardId=='000001'){
                            that.list.push(item)
                        }
                    })
                     that.list.sort(that.sortId)
           
                    
       
                    for (let i=0;i<10;i++){
                        let temp=[];
                        for(let j=0;j<20;j++){
                            temp.push(that.list[i*20+j])
                        }
                        temp.sort(that.sortinseId)
                        that.boxarray.push(temp);
                    }
                    console.log(that.boxarray)
                  
                  //  that.tableData=response.data;
                  
                   
                     console.log(that.list)
                    console.log("a"); 

                    // that.pageTotal=parseInt((response.data.length));                    
                    // that.sumData=that.tableData;
                })
                .catch(function(error) {
                    console.log("b");                
                })
        },

        showInfo(){
            this.$message.success("ss")
        },
        test(temp){
            if(temp=="success"){
                return "空闲"
            }else{
                return "占用"
            }
            
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


            this.boxarray=[];
//             for(let x=0;x<this.boxarray.length;x++){
//  this.boxarray.pop()
//             }

           
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
.el-row {
    margin-bottom: 5px;
    
}
.el-col {
    border-radius: 4px;
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
