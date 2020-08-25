<template>
    <div class="container-projects" style="font-family:voda-rg !important;">
        <div class="top">
            <div class="info pt-3">
                <div class="name">{{theUser.name}}</div>
                <div class="location pt-2">{{theUser.location.title}}</div>
            </div>
            <div class="profile">
                <img src="../../assets/user_icon.png" class="profile_image" alt="">
            </div>
        </div>
        <div class="projects">
            <strong>Recent Projects</strong>
            <b-row class="mt-4">
                <b-col cols="4" v-for="project in projects" :key="project" class="mt-2">
                    <b-card class="card">
                        <b-row>
<!--                            <b-col cols="6">-->
<!--                                <img src="../../assets/computer-repair.png" class="project-image">-->
<!--                            </b-col>-->
                            <b-col cols="12" class="pl-4">
                                <div class="d-flex flex-column">
                                    <div class="title">{{project.title}}</div>
                                    <div class="fundi-name">{{project.name}}</div>
                                    <hr class="mt-3">
                                    <div class="title mt-5">Description</div>
                                    <div class="description">
                                        {{project.description}}
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="6">
                                <img src="../../assets/clock.png" alt="">
                                <span class="date">{{project.requested}}</span>
                            </b-col>
                            <b-col cols="6" class="pl-4">
                                <span class="price" v-if="project.status == 0">Pending</span>
                                <span class="price" v-if="project.status == 1">Scheduled</span>
                                <span class="price" v-if="project.status == 2">OnGoing</span>
                                <span class="price" v-if="project.status == 3">Tsh {{project.price}}</span>
                                <span class="price" v-if="project.status == 4">Cancelled</span>
                                <span class="price" v-if="project.status == 5">Cancelled by user</span>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name:'projects',
    props:['user'],
    data:function(){
        return {
            projects:[1,2,3,4,5],
            theUser:undefined
        }
    },
    mounted() {
        this.theUser = this.user.params.user
        this.init()
    },
    methods:{
        init(){
            var header = {
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.access_token
                }
            }
            this.axios.get("users/projects/"+this.theUser.id,header).then(
                response=>{
                    console.log(response)
                    if(response.data['status_code']==200){
                        this.projects = response.data['requests']
                        console.log(this.projectOptions)

                    }else{
                        console.log("something went wrong")
                    }
                }).catch(error=>{
                console.log(error)
                console.log(error.response.status)
            })
        }
    }
}
</script>

<style lang="scss">
    .top{
        background-color: #ffffff;
        height: 150px;
        .info{
            position: absolute;
            left: 30%;
            top: 80px;
            
            .name{
                font-size: 40px;
                font-weight: bold;
                color: #9EA0A5;
                letter-spacing: 1.2px;
                text-align: start;
            }
            .location{
                font-size: 12px;
                color: #9EA0A5;
                text-align: start;
            }
        }
        .profile{
            position: absolute;
            top: 120px;
            left: 100px;
            width: 162px !important;
            height: 162px !important;
            border: 1px solid #EBEBEB;
            border-radius: 50%;
            background-color: #EBEBEB;
            .profile_image{
                padding-top: 20px;
                height:150px !important;
                width:130px !important;
            }
        }
    }
    .projects{
        text-align: start;
        padding-top: 130px;
        padding-left: 50px;
        .card{
            border-radius: 4px !important;
            box-shadow: none !important;
        }
        .project-image{
            width:153px !important;
            height:153px !important;
            border-radius: 10px !important;
        }
        .title{
            font-weight: bold !important;
            font-size: 14px !important;
            color: #222B45 !important;
        }
        .fundi-name{
            color: #ACB1C0 !important;
            font-size: 11px !important;
            margin-top: 20px !important;
        }
        .description{
            color: #7F7F7F !important;
            font-size: 11px !important;
        }
        .date{
            color: #ACB1C0;
            font-size: 9px !important;
            margin-left: 8px !important;
        }
        .price{
            color: #B7BE46 !important;
            font-size: 15px !important;
            font-weight: bold !important;
        }
    }
    
</style>