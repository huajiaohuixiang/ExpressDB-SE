<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="registry" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                     type="password"
                        placeholder="密码"
                        v-model="param.password"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                  <el-form-item prop="confirmpw">
                    <el-input
                     type="password"
                        placeholder="确认密码"
                        v-model="param.confirmpw"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                  <el-form-item prop="employeeid">
                    <el-input
                        placeholder="员工工号"
                        v-model="param.employee_id"
                    >
                        <el-button slot="prepend" icon="el-icon-s-management"></el-button>
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <el-link class="login-tips" @click="gotoLogin()"> 已有帐号？现在去登陆 </el-link>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.param.confirmpw !== '') {
            this.$refs.param.validateField('confirmpw');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.param.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            param: {
                username: '',
                password: '',
                confirmpw: '',
                employee_id:''
            },
            form:{
                adminName:'',
                password:'',
                employeeId:''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }],
                confirmpw:[{ validator: validatePass2, trigger: 'blur' }],
                employee_id:[{ required: true, message: '请输入工号', trigger: 'blur'}],
            },
        };
    },
  
    methods: {
        submitForm() {
         

            let that =this;
            console.log(that.param);
            this.form.adminName=this.param.username;
            this.form.password=this.param.password;
            this.form.employeeId=this.param.employee_id;
            console.log(that.form);
           // this.$router.push('/dashboard');
             this.$axios.post('http://localhost:8084/worker/registry',that.form)
                .then(function(response) {
                  //  console.log(that.param);
                    console.log(response);   
                    if (response.data.code=='200') {
                       that.$router.replace({path: '/login'});
                       that.$message.success('注册成功！跳转至登陆页面');
                    } else {
                        that.$message.success('注册失败，请重新注册！');
                    }
                   
                   
                })
                .catch(function(error) {
                    console.log("b");                
                })
        },
        gotoLogin(){
            this.$router.replace({path:'/login'});
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg4.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>