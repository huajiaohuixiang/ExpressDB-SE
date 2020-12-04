<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label-width="0">
        <el-alert show-icon>请务必仔细填写并核对</el-alert>
      </el-form-item>
      <el-form-item label="姓名" prop="sendname">
        <el-input v-model="form.sendname"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="sendphone">
        <el-input v-model="form.sendphone"></el-input>
      </el-form-item>
      <el-form-item label="所在省" prop="sendprovince">
        <el-input v-model="form.sendprovince"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="sendcity">
        <el-input v-model="form.sendcity"></el-input>
      </el-form-item>
      <el-form-item label="所在区" prop="sendarea">
        <el-input v-model="form.sendarea"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="senddetail">
        <el-input v-model="form.senddetail"></el-input>
      </el-form-item>
      <el-form-item label="寄件时间" prop="sender_time">
        <el-input v-model="form.sender_time"></el-input>
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button type="primary" @click="handleSubmit">下一步</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Step2',
    data() {
      return {
        form: {
          sendname: 'wq',
          sendphone: '19946251111',
          sendprovince: '山东省',
          sendcity: '泰安市',
          sendarea:'宁阳县',
          senddetail:'伏山镇',
          sender_time:'',
        },
        rules: {
          sendname: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          sendphone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            // { type: 'email', message: '账户名应为邮箱格式', trigger: 'blur' },
          ],
          sendprovince: [
            { required: true, message: '请输入省份', trigger: 'blur' },
          ],
          sendcity: [
            { required: true, message: '请输入城市', trigger: 'blur' },
            // { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' },
          ],
          sendarea:[
            {required:true,message:'请输入区县',trigger:'blur'},
          ],
           senddetail:[
            {required:true,message:'请输入详细地址',trigger:'blur'},
          ]
        },
        
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('change-step', 3, this.form)
          }
        })
      },
      handlePrev() {
        this.$emit('change-step', 1,this.form)
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
