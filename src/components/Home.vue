<template>
    <div id="main-container">
        <b-row style="width:100%;">
            <!--  :style="{ backgroundImage: `url(${backgroundUrl})` }" -->
            <b-col cols="2" style="margin:0px;padding:0px;height:100vh; position:fixed;top:0px;background-color:#DE0B15 !important" class="bg-no-repeat bg-cover">
                <sidebar></sidebar>
            </b-col>
            <b-col cols="10" style="margin:0px;padding:0px;margin-left:220px;box-shadow:none !important;">
                <b-navbar toggleable="lg" sticky class="navbar-style">
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                    <b-collapse id="nav-collapse">
                        <b-navbar-nav>
                            <b-nav-item>Notification</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item>
                            <b-icon icon="bell"></b-icon>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-navbar>
                <router-view></router-view>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import backgroundUrl from '../assets/sidebar-bg.png'
import Sidebar from './Sidebar'
export default {
    name:'home',
    data:function(){
        return {
            backgroundUrl
        }
    },
    components:{
        Sidebar
    }
}
</script>
<style lang="scss">
    .navbar-style{
        box-shadow:none !important;
        background-color:#fff !important;
        margin-bottom: 3px !important;
    }
    .main-container{
        width: 100vw;
        overflow-x: hidden !important;
    }
    .logo{
        color: white;
        font-size: 24px;
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