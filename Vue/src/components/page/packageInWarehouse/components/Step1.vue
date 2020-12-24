<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label-width="0">
        <el-alert show-icon>请务必仔细填写并核对</el-alert>
      </el-form-item>
      <el-form-item label="包裹编号" prop="packageID">
        <el-input v-model="form.packageID"></el-input>
      </el-form-item>
      <el-form-item label="包裹内容" prop="packageContent">
        <el-input v-model="form.packageContent"></el-input>
      </el-form-item>
      <el-form-item label="包裹重量" prop="weight">
        <el-input v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="快递公司" prop="company">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <!-- 3 -->
      <el-form-item label="仓库编号" prop="warehouseID">
         <el-select v-model="form.warehouseID" placeholder="仓库选择" class="handle-select mr10">
                    <el-option
                        v-for="item in warelist"
                        v-bind:todo="item"
                        v-bind:key="item.warehouseId"
                        :label="item.warehouseId"
                        :value="item.warehouseId"
                    >
                    </el-option>
         </el-select>
        <!-- <el-input v-model="form.warehouse_ID"></el-input> -->
      </el-form-item>
      <el-form-item label="员工ID" prop="employeeID">
        <el-input v-model="form.employeeID"></el-input>
      </el-form-item>
      <!-- <el-form-item label="转账金额" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item> -->
    </el-form>
    <div class="pay-button-group">
     
      <el-button type="primary" @click="handleNext">下一步</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Step1',
    data() {
      return {
        form: {
          packageID: '9880828645542',
          packageContent: '雨伞',
          weight: 0.45,
          company:'京东快递',
          warehouseID:'000001',
          employeeID:'000001',
          // price: '100',
        },
        warelist:[],
        rules: {
          package_ID: [
            { required:true, message: '请输入包裹编号', trigger: 'blur' },
          ],
          package_Content: [
            { required: false, message: '请输入包裹内容', trigger: 'blur' },
            // { type: 'email', message: '账户名应为邮箱格式', trigger: 'blur' },
          ],
          package_weight: [
            { required: false, message: '请输入包裹重量', trigger: 'blur' },
          ],
          // price: [
          //   { required: true, message: '请输入转账金额', trigger: 'blur' },
          //   { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' },
          // ],
        },
      }
    },
    created(){
      this.getData();
    },
    methods: {
      getData(){
          console.log("getData");
            let that =this;
            this.$axios.get('https://www.csystd.cn:9999/worker/getWareInfo',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }
)
                .then(function(response) {
                  console.log(response.data);
                   
                   
                  that.warelist=response.data;
                  console.log("a"); 
                   
                })
                .catch(function(error) {
                    console.log("b");                
                })
      },
      handleNext() {
        this.$refs.form.validate((valid) => {
          
          if (valid) {
           this.$emit('change-step', 2, this.form)
            
          }
         
        })
      },
    },
  }
  // this.$refs.form.validate((valid) => {
        //   if (valid) {
        //     this.$emit('change-step', 3, this.form)
        //   }
        // })
</script>
<style lang="scss" scoped>
  .pay-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
