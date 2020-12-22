<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 入库出库
                </el-breadcrumb-item>
                <el-breadcrumb-item>包裹出库入柜</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="150px">
                   
                    <el-form-item label="仓库号：">
                       
                        <el-select v-model="form.warehouseID" placeholder="请选择仓库" class="handle-select mr10">
                            <!-- 1 -->
                            <el-option
                                v-for="item in warelist"
                                v-bind:todo="item"
                                v-bind:key="item.warehouseName"
                                :label="item.warehouseName"
                                :value="item.warehouseId"
                            >
                            </el-option>
                            
                        </el-select>
                    </el-form-item>
                     <el-form-item label="包裹编号：">
                        <el-input v-model="form.packageID"></el-input>
                    </el-form-item>
                    <el-form-item label="快递柜号：">
                         <el-select v-model="form.cupboardID" placeholder="请选择快递柜" class="handle-select mr10" >
                              <!-- 2 -->
                               <el-option
                                v-for="item in this.cuplist"
                                v-bind:todo="item"
                                v-bind:key="item.cupboardName"
                                :label="item.cupboardName"
                                :value="item.cupboardId"
                                ></el-option>
                            <!-- <el-option key="1" label="快递柜1" value="1"></el-option>
                            <el-option key="2" label="快递柜2" value="2"></el-option>
                            <el-option key="3" label="快递柜3" value="3"></el-option>
                            <el-option key="4" label="快递柜4" value="4"></el-option> -->
                        </el-select>
                    </el-form-item>
                     <el-form-item label="员工编号">
                        <el-input v-model="form.employeeID"></el-input>
                    </el-form-item>
                    <label for="a"><br></label>
                    <el-form-item label="快递箱具体位置">
                    </el-form-item>
                    <el-form-item label="行数:">
                        <el-input v-model="form.x"></el-input>
                    </el-form-item>
                    <el-form-item label="列数:">
                        <el-input v-model="form.y"></el-input>
                    </el-form-item>
                   
                    <label for="a"><br></label>
                    <el-form-item label="是否发送取件通知：">
                        <el-switch v-model="form.flag"></el-switch>
                    </el-form-item>
                  
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">快递入柜</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
           
            form: {
                packageID: '',
                warehouseID: '',
                cupboardID:'',
                
                y:'',
                x:'',
                employeeID:'',            
                flag: true,                         
            },
            warelist:[],
                cuplist:[],
        };
    },
    created() {
        
        this.getData();
    },
    methods: {
        onSubmit() {
            let that =this;
            if(this.form.flag=='true'){
                this.form.flag=1;
            }else{
                this.form.flag=0;
            }
            this.$axios.post('https://www.csystd.cn:9999/worker/package/packInBox',this.form)  
            .then(function(response) {                  
                    console.log(response.data);     
                    let temp_flag=response.data;            
                    if(temp_flag.result=='success'){
                        this.$message.success('提交成功！');
                    }else{
                        this.$message.success('提交失败！');
                    }                                                  
                })
                .catch(function(error) {
                    console.log("b");                  
                })         
        },
        getData(){
            let that=this;
            this.$axios.get('http://huajiao.site:8084/getCupInfo')
            .then(function(response) {
                console.log(response.data);                
                that.cuplist=response.data;
                console.log("a");                   
            })
            .catch(function(error) {
                console.log("b");                
            })
            this.$axios.get('http://huajiao.site:8084/getWareInfo')
                .then(function(response) {
                    console.log(response.data);
                    that.warelist=response.data;
                    console.log("a");      
                })
                .catch(function(error) {
                    console.log("b");                
                })
        }
    }
};
</script>