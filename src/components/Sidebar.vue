<template>
    <div>
        <div class="logo-container">
            <img src="../assets/logo.png" class="logo" alt="">
        </div>
        <div class="separator"></div>
        <b-list-group-item class="d-flex align-items-center user">
            <b-avatar class="mr-3"></b-avatar>
            <div class="identifier-column">
                <span class="mr-auto name">{{username}}</span>
                <span class="role">Super Admin</span>
            </div>
            <b-icon icon="caret-down-fill" variant="success" class="ml-2 caret-down"></b-icon>
        </b-list-group-item>
        <b-list-group class="transparent">
            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('dashboard')">
                <b-icon icon="pie-chart"></b-icon>
                <div class="text-left-style">Overview</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('users')">
                <b-icon icon="person"></b-icon>
                <div class="text-left-style">Users</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('services')">
                <b-icon icon="brightness-high"></b-icon>
                <div class="text-left-style">Services</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('fundis')">
                <b-icon icon="people"></b-icon>
                <div class="text-left-style">Fundi</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('companies')">
                <b-icon icon="person-check"></b-icon>
                <div class="text-left-style">Company</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center">
                <b-icon icon="wallet"></b-icon>
                <div class="text-left-style">Costing</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center">
                <b-icon icon="bar-chart"></b-icon>
                <div class="text-left-style">Reporting</div>
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="logout">
                <b-icon icon="bar-chart"></b-icon>
                <div class="text-left-style">Logout</div>
            </b-list-group-item>
        </b-list-group>

        <b-modal hide-header-close="true" hide-footer="true" style="width:200px !important" hide-header="true" id="error-modal" title="something went wrong">
            <div class="d-flex flex-column align-items-center">
                <div><strong>Could not log you out!</strong></div>
                <div><b-button variant="danger" size="sm" @click="hideLogoutErrorModal">Okay</b-button></div>
            </div>
        </b-modal>
    </div>
</template>
<script>
export default {
    name:'sidebar',
    data:function(){
        return {
            username:''
        }
    },
    mounted(){
        this.username = localStorage.username
    },
    methods:{
        navigate(page){
            this.$router.push({name:page})
        },
        logout(){
            var header = {
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.access_token
                }
            }
            this.axios.get('auth/logout',header).then(
                response=>{
                    console.log(response)
                    localStorage.isAuth = false
                    localStorage.access_token = undefined
                    this.$router.push({name:'login'})
                }
            ).catch(error=>{
                console.log(error)
                this.$bvModal.show('error-modal')
            })
        },
        hideLogoutErrorModal(){
            this.$bvModal.hide('error-modal')
        }
    }
}
</script>

<style lang="scss">
    .logo{
        color: white;
        height: auto !important;
        width: 124px !important;
        padding: 30px 0px;
    }
    .separator{
        border: 1px red solid;
    }
    .text-left-style{
        position: absolute !important;
        left: 30% !important;
    }
    .user{
        background-color: transparent !important;
        // .caret-down{
        //     background-color: #B7BE46;
        // }
    }
    .transparent{
        background-color: transparent !important;
    }
    .nav-text{
        color: white;
    }
    .nav-text:hover{
        background-color: #B7BE46 !important;
        cursor: pointer;
    }
    .identifier-column{
        display: block;
        text-align: start !important;
        text-transform: capitalize;
        .name{
            color: white;
            font-weight: bold;
            display: block;
            font-size: 12px;
        }
        .role{
            color: white;
            display: block;
            font-size: 10px;
            align-self: flex-start;
        }
    }
</style>