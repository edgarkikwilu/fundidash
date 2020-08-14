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
                                <b-input placeholder="Password" type="password" class="input" :class="{error:!state}" :state="status" v-model="form.password"></b-input>
                            </div>
                        </b-col>
                        <b-col cols="5" offset-md="1" class="mt-4" style="margin-left:90px !important">
                            <b-spinner v-if="isLoading" variant="danger" label="signing you in"></b-spinner>
                            <b-button @click="login" variant="danger" class="btnLogin" v-if="!isLoading">Login</b-button>
                        </b-col>
                        <b-col cols="4" offset-md="0" class="mt-4 " style="padding-top:5px !important; font-family:voda-rg !important;">
                            <a href="" @click="resetPassword" class="forgot-password">Forgot Password?</a>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'Login',
    computed:mapState(['isAuth','access_token']),
    data:function(){
        return {
            isAuth:true,
            access_token:'',
            username:'',
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
            this.axios.post("auth/login",this.form,headers).then(
                response=>{
                    this.isLoading = false
                    console.log(response.data)
                    console.log(response.data['Message'])
                    console.log(response.data['status_code'])
                    console.log(this.isAuth)

                    if(response.data['status_code']==200){
                        this.status = true
                        localStorage.isAuth = 'true'
                        console.log(response.data['access_token'])
                        localStorage.access_token = response.data['access_token']
                        localStorage.username = response.data['username']
                        // reponse.data['acces_token']
                        // this.$store.commit('change',true)
                        console.log('here after commit to true')
                        this.$router.push({path:'/'}).catch(error=>console.info(error))
                    }else if(response.data['status_code']==401){
                        this.status = false
                        localStorage.isAuth = 'false'
                        // this.$store.commit('change',false)
                        console.log('here after commit to false')
                    } else{
                        this.status = false
                    }

                    // localStorage.isAuth = true
                }
            ).catch(
                error=>{
                    this.isLoading = false
                    this.status = false
                    console.log(error.response.status)
                    if(error.response.status == 422){
                        console.log("invalid data passed")
                    }else if(error.response.status == 500){
                        console.log("internal server error")
                    }
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
        font-family: "voda-rg";
    }
    .prompt{
        // font-weight: bold;
        font-family: "voda-bold" !important;
    }

    .input{
        height: 40px !important;
        border: none !important;
        box-shadow: none important;
        font-family: "voda-rg" !important;
    }
    .error{
            border-top: 1px solid #E9131D !important;
            border-right: 1px solid #E9131D !important;
            border-top-right-radius: 4px !important;
            border-bottom: 1px solid #E9131D !important;
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
         font-family:'voda-bold' !important;
    }
</style>