<template>
  <div>
    <div class="pay-top-content">
      <!-- <vab-icon class="pay-success" :icon="['fas', 'check-circle']"></vab-icon> -->
      <p>包裹入库成功</p>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="pay-bottom"
    >
      <el-form-item label="包裹ID：">
        {{ infoData.package_ID }}
      </el-form-item>
      <el-form-item label="寄件人：">
        {{ infoData.sendname }}
      </el-form-item>
      <el-form-item label="收件人：">
        {{ infoData.receivename }}
      </el-form-item>
      <el-form-item label="仓库编号：">
        {{ infoData.warehouse_ID }}
      </el-form-item>
      <el-form-item label="入库时间：">
        {{ infoData.in_time }}
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button type="primary" @click="handlePrev">继续入库</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Step4',
    props: {
      infoData: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
   
    data() {
      return {
        form: {
          
        },
        rules: {
         
        },
        in_time:'',
        loading: false,
      }
    },
    methods: {
    
      handlePrev() {
        this.$emit('change-step', 1)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .pay-top-content {
    text-align: center;

    .pay-success {
      display: block;
      margin: 20px auto 5px auto;
      font-size: 40px;
     // color: $base-color-green;
    }
  }

  .pay-bottom {
    padding: 20px;
    margin-top: 20px;
    background: #f5f7f8;
  //  border: 1px dashed $base-color-gray;
  }

  .pay-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
