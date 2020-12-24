<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="admin_name">
                    <el-input v-model="param.admin_name" placeholder="admin_name">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <el-link class="login-tips" @click="gotoRegistry()"> 还没有账号？现在去注册 </el-link>
            </el-form>
        </div>
    </div>
</template>


<script>
export default {
    data: function() {
        return {
            param: {
                admin_name: 'admin',
                password: '123456',
            },
            token:'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleHByZXNzIiwidXNlcklEIjoiMTc1MjU1NDMyMjIiLCJuYW1lIjoidG9tIiwic2V4IjoibSIsInJvbGUiOiJ3b3JrZXIiLCJpYXQiOjE2MDg2NDY2NDUsImV4cCI6MTYwODkwNTg0NX0.jQqDJ1rHO_xIazueFuWDN1nyLLy8aSPPBtdRoVskrT8'
            ,
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            let that =this;
            console.log(that.param);
           
             this.$axios.post('https://www.csystd.cn:9999/worker/login?admin_name='+this.param.admin_name+'&password='+this.param.password,{})
                .then(function(response) {
                    //console.log(that.param);
                    console.log(response.data);   
                    console.log('aa')
                        localStorage.setItem("ms_username",that.param.admin_name);
                        localStorage.setItem('token',response.data.Token)
                          localStorage.setItem("_position",response.data.position);
                        localStorage.setItem("_id",response.data.employee_id);
                        console.log('aa')
                       that.$router.replace({path: '/dashboard'});
                        that.$message.success("登陆成功");
                   this.$axios.defaults.headers.common["token"] = response.data
                   
                   
                })
                .catch(function(error) {
                    console.log("b");                
                })

            // let that =this;
            // console.log(that.param);
           
            //  this.$axios.post('http://localhost:8084/worker/login?admin_name='+that.param.username+'&password='+that.param.password)
            //     .then(function(response) {
            //         console.log(that.param);
            //         console.log(response.data);   
            //         if (response.data.code=='200') {
            //             localStorage.setItem("ms_username",that.param.username);
            //            that.$router.replace({path: '/dashboard'});
            //             that.$message.success("登陆成功");
            //         } else {
            //             that.$message.success("登陆失败，请重新输入密码");
            //         }
                   
                   
            //     })
            //     .catch(function(error) {
            //         console.log("b");                
            //     })
        },
        gotoRegistry(){
            this.$router.replace({path:'/registry'});
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