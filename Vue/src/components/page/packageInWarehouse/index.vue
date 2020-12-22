<template>
  <div class="pay-container">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 20, offset: 2 }"
        :lg="{ span: 14, offset: 5 }"
        :xl="{ span: 12, offset: 6 }"
      >
        <el-steps :space="200" :active="active" align-center class="steps">
          <el-step title="填写基本信息"></el-step>
          <el-step title="填写寄件人信息"></el-step>
          <el-step title="填写收件人信息"></el-step>          
          <el-step title="完成"></el-step>
        </el-steps>
        <step1 v-if="active === 1" @change-step="handleSetStep"></step1>
        <step2
          v-if="active === 2"
          :info-data="form"
          @change-step="handleSetStep"
        ></step2>
        <step3
          v-if="active === 3"
          :info-data="form"
          @change-step="handleSetStep"
           @submit="submitInWare"
        ></step3>
        <step4
         v-if="active === 4"
          :info-data="form"
          @change-step="handleSetStep"
          @submit="submitInWare">
        </step4>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Step1 from './components/Step1'
  import Step2 from './components/Step2'
  import Step3 from './components/Step3'
 import Step4 from './components/Step4'
  export default {
    name: 'package',
    components: { Step1, Step2, Step3,Step4 },
    data() {
      return {
        active: 1,
        form: {},
        submitform:{},
        // form2:{},
        // form3:{},
        // form4:{}
      }
    },
    methods: {
        submitInWare(form){
          console.log('index')
          if (form) this.form = Object.assign(this.form, form)
          console.log(this.form)
          let submitform=this.form;
          submitform.senderAddress=this.form.senderProvince+this.form.senderCity+this.form.senderArea+this.form.senderDetail
          submitform.receiverAddress=this.form.receiverProvince+this.form.receiverCity+this.form.receiverArea+this.form.receiverDetail
          let that=this;
          submitform.weight=submitform.weight*1
          
          console.log(submitform)
          this.$axios.post('https://www.csystd.cn:9999/worker/package/packInWare',this.form)
            .then(function(response) {
              console.log(response.data)
              console.log(response)
              if(response.data==""){
                console.log("shibai")
                that.$message.error('入库失败！')
              }else{
                that.form.in_time=response.data;
                that.$message.success('入库成功！')
                that.handleSetStep(4,that.form)
              }
              
            })
            .catch(function(error) {
                console.log("b");                
            })
      },

      handleSetStep(active, form) {
        
        this.active = active
        if (form) this.form = Object.assign(this.form, form)
      },

      
      // handle1(index,active, form) {
      //   this.active = active
      //   if (form) this.form = Object.assign(this.form, form)
      //   switch (index){
      //     case 1:
      //       this.form1=Object.assign(this.form1, form)
      //       case 2:
      //   }
      // }
    },
  }
</script>
<style lang="scss" scoped>
  .pay-container {
    .steps {
      justify-content: center;
      margin-bottom: 20px;
    }
  }
</style>
