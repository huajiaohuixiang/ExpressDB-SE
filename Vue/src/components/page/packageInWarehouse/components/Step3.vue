<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label-width="0">
        <el-alert show-icon>请务必仔细填写并核对</el-alert>
      </el-form-item>
      <el-form-item label="姓名" prop="receivrName">
        <el-input v-model="form.receiverName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="receiverPhone">
        <el-input v-model="form.receiverPhone"></el-input>
      </el-form-item>
      <el-form-item label="所在省" prop="receiverProvince">
        <el-input v-model="form.receiverProvince"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="receiverCity">
        <el-input v-model="form.receiverCity"></el-input>
      </el-form-item>
      <el-form-item label="所在区" prop="receiverArea">
        <el-input v-model="form.receiverArea"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="receiverDetail">
        <el-input v-model="form.receiverDetail"></el-input>
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button type="primary"  @click="handleSubmit">
        提交
      </el-button>
      <el-button @click="handlePrev">上一步</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Step3',
    // props: {
    //   // infoData: {
    //   //   type: Object,
    //   //   default: () => {
    //   //     return {}
    //   //   },
    //   // },
    // },
    data() {
      return {
        form: {
          receiverName: 'wq',
          receiverPhone: '19946251111',
          receiverProvince: '山东省',
          receiverCity: '泰安市',
          receiverArea:'宁阳县',
          receiverDetail:'伏山镇',
          in_time:'',
        },
        
        rules: {
          receivename: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          receivephone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            // { type: 'email', message: '账户名应为邮箱格式', trigger: 'blur' },
          ],
          receiveprovince: [
            { required: true, message: '请输入省份', trigger: 'blur' },
          ],
          receivecity: [
            { required: true, message: '请输入城市', trigger: 'blur' },
            // { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' },
          ],
          receivearea:[
            {required:true,message:'请输入区县',trigger:'blur'},
          ],
           receivedetail:[
            {required:true,message:'请输入详细地址',trigger:'blur'},
          ]
         },
        loading: false,
      }
    },
    methods: {
      handleSubmit() {
        //这里就是把返回结果赋值给in_time
        //let that =this;
       
        console.log("start")
        //this.$emit('submitInWare', 4,this.form)
        

        this.$refs.form.validate((valid) => {
  
            if (valid) {
              this.loading = true
              console.log("1")
              this.$emit('submit',this.form)
              //this.$emit('change-step', 4,this.form)
            } else {
              this.loading = false
            }
          })
        
      },






      handlePrev() {
        this.$emit('change-step', 2)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .pay-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
