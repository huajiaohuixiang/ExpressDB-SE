<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label-width="0">
        <el-alert show-icon>请务必仔细填写并核对</el-alert>
      </el-form-item>
      <el-form-item label="姓名" prop="senderName">
        <el-input v-model="form.senderName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="senderPhone">
        <el-input v-model="form.senderPhone"></el-input>
      </el-form-item>
      <el-form-item label="所在省" prop="senderProvince">
        <el-input v-model="form.senderProvince"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="senderCity">
        <el-input v-model="form.senderCity"></el-input>
      </el-form-item>
      <el-form-item label="所在区" prop="senderArea">
        <el-input v-model="form.senderArea"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="senderDetail">
        <el-input v-model="form.senderDetail"></el-input>
      </el-form-item>
      <el-form-item label="寄件时间" prop="sendDate">
        <el-input v-model="form.sendDate"></el-input>
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
          senderName: 'wq',
          senderPhone: '19946251111',
          senderProvince: '山东省',
          senderCity: '泰安市',
          senderArea:'宁阳县',
          senderDetail:'伏山镇',
          sendDate:'2020-09-09',
        },
        rules: {
          senderName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          senderPhone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            // { type: 'email', message: '账户名应为邮箱格式', trigger: 'blur' },
          ],
          senderProvince: [
            { required: true, message: '请输入省份', trigger: 'blur' },
          ],
          senderCity: [
            { required: true, message: '请输入城市', trigger: 'blur' },
            // { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' },
          ],
          senderArea:[
            {required:true,message:'请输入区县',trigger:'blur'},
          ],
           senderDetail:[
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
