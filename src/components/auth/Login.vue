<template>
    <div>
        <b-navbar toggleable="md" type="light" style="box-shadow:none !important; height:126px !important;background-color:#DE0B15 !important;">
            <b-navbar-brand>
                <img src="../../assets/logo.png" class="logo" alt="">
            </b-navbar-brand>
        </b-navbar>
        <b-row>
            <b-col cols="6" offset-md="3" class="nav">
                <b-card class="card" style="width:1200px">
                    <b-row>
                        <b-col cols="8" offset-md="2">
                            <div class="salutation">Hello  Friend!</div>
                        </b-col>
                        <b-col cols="8" offset-md="2">
                            <div class="prompt">Please login to the dashboard to continue</div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="8" offset-md="2">
                            <div style="display:flex;flex-direction:row;" class="input-container" :class="{inputContainerErrorf:!status}">
                                <div class="icon-container">
                                    <img src="../../assets/user.png" class="icon" style="margin-top:0px" alt="">
                                </div>
                                <b-input placeholder="Username/Email" class="input" :class="{error:!state}" :state="status" v-model="form.email"></b-input>
                            </div>
                        </b-col>
                        <b-col cols="8" offset-md="2">
                            <div style="display:flex;flex-direction:row;" class="input-container" :class="{inputContainerErrorv:!status}">
                                <div class="icon-container">
                                    <img src="../../assets/password.png" class="icon" style="margin-top:0px" alt="">
                                </div>
                                <b-input placeholder="Password" class="input" :class="{error:!state}" :state="status" v-model="form.password"></b-input>
                            </div>
                        </b-col>
                        <b-col cols="5" offset-md="1" class="mt-4 pl-5">
                            <b-spinner v-if="isLoading" variant="danger" label="signing you in"></b-spinner>
                            <b-button @click="login" variant="danger" class="btnLogin" v-if="!isLoading">Login</b-button>
                        </b-col>
                        <b-col cols="5" offset-md="0" class="mt-4 ">
                            <a href="" @click="resetPassword" class="forgot-password">Forgot Password?</a>
                        </b-col>
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
            isLoading:false,
            form:{email:'',password:''}
        }
    },
    methods:{
        login(){
            this.isLoading = true
            var headers = {
                headers:{
                    'Content-Type':'application/json ',
                    'Accept':'application/json',
                    'X-Requested-With':'XMLHttpRequest'
                }
            }
            this.axios.post("admin/auth/login",this.form,headers).then(
                response=>{
                    this.isLoading = false
                    console.log(response.data)
                    console.log(response.data['Message'])
                    console.log(response.data['status_code'])

                    if(response.data['status_code']==401){
                        this.status = false
                    }   

                    // localStorage.isAuth = true
                    // this.$router.push({path:'/'}).catch(error=>console.info(error))
                }
            ).catch(
                error=>{
                    this.isLoading = false
                    this.status = false
                    console.log(error)
                    // localStorage.isAuth = true
                    // this.$router.push({path:'/'}).catch(error=>console.info(error))
                }
            )
        },
        resetPassword(){
            this.$router.push({name:'resetpassword'})
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
    }
    .prompt{
        font-weight: bold;
    }

    .input{
        height: 40px !important;
        border: none !important;
        box-shadow: none !important;
    }
    .error{

    }
    .input-container{
        .icon-container{
            margin-top: 40px;
            border-top: 1px solid #9EA0A5 !important;
            border-left: 1px solid #9EA0A5 !important;
            border-top-left-radius: 4px !important;
            border-bottom: 1px solid #9EA0A5 !important;
            border-bottom-left-radius: 4px !important;
            .icon{
                height:33px !important;
                width:20px !important;
                padding-top: 8px;
            }
        }
        .input{
            border-radius: 0px !important;
            border-top: 1px solid #9EA0A5 !important;
            border-right: 1px solid #9EA0A5 !important;
            border-top-right-radius: 4px !important;
            border-bottom: 1px solid #9EA0A5 !important;
            border-bottom-right-radius: 4px !important;
            box-shadow: none !important;

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
        width: 200px !important;
        font-weight: bold;
    }
</style>