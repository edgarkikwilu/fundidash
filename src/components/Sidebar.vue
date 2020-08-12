<template>
    <div>
        <div class="logo-container">
            <img src="../assets/logo.png" class="logo" alt="">
        </div>
        <div class="separator"></div>
        <b-list-group-item class="d-flex align-items-center user">
            <b-avatar class="mr-3"></b-avatar>
            <div class="identifier-column">
                <span class="mr-auto name">Edgar Kikwilu</span>
                <span class="role">Super Admin</span>
            </div>
            <b-icon icon="caret-down-fill" variant="success" class="ml-2 caret-down"></b-icon>
        </b-list-group-item>
        <b-list-group class="transparent">
            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('dashboard')">
                <b-icon icon="pie-chart"></b-icon>
                Overview
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center">
                <b-icon icon="person"></b-icon>
                Users
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('services')">
                <b-icon icon="brightness-high"></b-icon>
                Services
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('fundis')">
                <b-icon icon="people"></b-icon>
                Fundi
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center" @click="navigate('companies')">
                <b-icon icon="person-check"></b-icon>
                Company
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center">
                <b-icon icon="wallet"></b-icon>
                Costing
            </b-list-group-item>

            <b-list-group-item class="transparent nav-text ml-3 d-flex justify-content-between align-items-center">
                <b-icon icon="bar-chart"></b-icon>
                Reports
            </b-list-group-item>
        </b-list-group>
    </div>
</template>
<script>
export default {
    name:'sidebar',
    data:function(){
        return {

        }
    },
    methods:{
        navigate(page){
            this.$router.push({name:page})
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
        background-color: red !important;
        cursor: pointer;
    }
    .identifier-column{
        display: block;
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