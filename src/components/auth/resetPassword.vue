<template>
    <div>
        <b-navbar toggleable="md" type="light" style="box-shadow:none !important; height:126px !important;background-color:#DE0B15 !important;">
            <b-navbar-brand>
                <img src="../../assets/logo.png" class="logo" alt="">
            </b-navbar-brand>
        </b-navbar>
        <b-row>
            <b-col cols="6" offset-md="3" class="nav">
                <b-card class="card">
                    <b-row>
                        <b-col cols="8" offset-md="2">
                            <div class="prompt">Enter your email to reset password</div>
                        </b-col>
                        <b-col cols="8" offset-md="2">
                            <div class="salutation">Enter the email address associated with your account and we’ll send you a link to reset your password.</div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="8" offset-md="2">
                            <div style="display:flex;flex-direction:row;" class="input-container" :class="{inputContainerErrorf:!status}">
                                <div class="icon-container">
                                    <img src="../../assets/user.png" class="icon" style="margin-top:0px" alt="">
                                </div>
                                <b-input placeholder="Enter email" class="input" :state="status" v-model="email"></b-input>
                            </div>
                        </b-col>
                        <b-col cols="8" offset-md="1" class="mt-4 ">
                            <b-button @click="login" variant="danger" class="btnLogin">Reset Password</b-button>
                        </b-col>
                        <!-- <b-col cols="5" offset-md="0" class="mt-4 ">
                            <a href="" class="forgot-password">Login</a>
                        </b-col> -->
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name:'Login',
    data:function(){
        return {
            isAuth:true,
            status:null,
            form:{email:''}
        }
    },
    methods:{
        login(){
            var headers = {
                headers:{
                    'Authorization':'Bearer ',
                    'Accept':'application/json'
                }
            }
            this.axios.post("/register",this.form,headers).then(
                response=>{
                    console.log(response)
                    this.isAuth = true
                    localStorage.isAuth = true
                    // this.$router.push({path:'/'}).catch(error=>console.info(error))  
                    window.location.href = "/"
                }
            ).catch(
                error=>{
                    this.status = false
                    console.log(error)
                    localStorage.isAuth = true
                    // this.$router.push({path:'/index'}).catch(error=>console.info(error))  
                    window.location.href = "/"
                }
            )
        }
    },
    mounted(){
        if (this.isAuth) {
            // this.$router.push({name:'home'})
        }
    }
}
</script>
<style lang="scss">
    .nav{
        margin-top: 100px;
        .card{
            box-shadow: none !important;
        }
    }
    .salutation,.prompt{
        text-align: start !important;
        color: #979797;
        font-size: 11px;
    }
    .prompt{
        font-weight: bold;
    }

    .input{
        height: 40px !important;
        border: none !important;
        box-shadow: none important;
    }
    .input-container{
        .icon-container{
            margin-top: 40px;
            border-top: 1px solid #B7BE46 !important;
            border-left: 1px solid #B7BE46 !important;
            border-top-left-radius: 4px !important;
            border-bottom: 1px solid #B7BE46 !important;
            border-bottom-left-radius: 4px !important;
            .icon{
                height:33px !important;
                width:30px !important;
                padding-top: 8px;
                padding-left: 5px;
            }
        }
        .input{
            border-radius: 0px !important;
            border-top: 1px solid #B7BE46 !important;
            border-right: 1px solid #B7BE46 !important;
            border-top-right-radius: 4px !important;
            border-bottom: 1px solid #B7BE46 !important;
            border-bottom-right-radius: 4px !important;
            box-shadow: none !important;
            font-size: 11px !important;

            // font-family: Regular;
            font-size: 16px;
            text-align: Left;
            vertical-align: Top;
            letter-spacing: 0.5px
        }
    }
    .inputContainerError{
        border-top: 1px solid #DE0B15 !important;
        border-left: 1px solid #DE0B15 !important;
        border-bottom: 1px solid #DE0B15 !important;
    }
    .forgot-password{
        color: #979797 !important;
    }
    .forgot-password:hover{
        color: #838080 !important;
    }
    .btnLogin{
        // width: 200px !important;
        font-weight: bold;
        font-size: 11px !important;
    }
</style>