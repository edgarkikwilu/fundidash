<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="mt-5" style="float:left;text-align:left;text-transform: uppercase;"><strong>{{username}} , SEE  WHAT HAPPENED TO SERVICES</strong></b-col>
            <b-col cols="12">
                <div class="d-flex flex-row flex-nowrap breadcrumb_style">
                    <span>Dashboard</span>
                    <span class="ml-2">></span>
                    <span class="ml-2">Users</span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <b-card style="width:213px;" class="top-cards-first mt-5 remove-box-shadow">
                    <b-media no-body>
                        <b-media-aside>
                            <span style="border-radius:50%;background-color:#F3F3F3;height:46px;width:46px;">
                                <img src="../../assets/fundis.png" style="width:28px;height:28px;margin-top:7px;">
                            </span>
                        </b-media-aside>
                        <b-media-body style="margin-left:-30px">
                            <p class="metric_value ml-5" style="float:left;">{{totalusers}}</p>
                            <p class="metric_label ml-5" style="float:left;">Fundifasta Users</p>
                        </b-media-body>
                    </b-media>
                    <b-card-footer class="transparent footer" style="border:none; margin-bottom:0px;padding-bottom:0px;">
                        <div class="d-flex flex-row flex-nowrap" style="margin-left:-25px;">
                            <b-icon icon="caret-up-fill" class="caret px-2"></b-icon>
                            <span class="active_number px-2">{{active}}</span>
                            <span class="active_text px-2">Active this week</span>
                        </div>
                    </b-card-footer>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" offset-md="0" class="mt-5">
                <b-card class="remove-box-shadow">
                    <table class="table table-borderless table-inverse table-responsive" style="width: 100%">
                        <thead class="thead-inverse border-bottom" style="width: 100%;">
                            <tr class="mb-3" style="width: 100%;">
                                <th>Profile</th>
                                <th>Username</th>
                                <th>Location</th>
                                <th>Projects</th>
                                <th></th>
                                <th>
                                    <select name="sort" id="" class="form-control filter" style="font-size:10px;">
                                        <option value="">service ID</option>
                                        <option value="">number of fundis</option>
                                        <option value="">number of categories</option>
                                    </select>
                                </th>
                            </tr>
                            </thead>
                            <tbody style="width: 100%;">
                                <tr class="border-bottom" v-for="user in users" :key="user.id" style="width: 100vw;">
                                    <td>
                                        <img src="../../assets/user_icon.png" style="width:28px;height:28px;margin-top:0px;">
                                    </td>
                                    <td>{{user.name}}</td>
                                    <td v-if="user.location!=null">{{user.location.title}}</td>
                                    <td v-if="user.location==null">NA</td>
                                    <td>{{user.total_completed_requests}} Projects Done</td>
                                    <td>
                                        <b-link class="view_projects" @click="viewProjects(user)">View Projects</b-link>
                                    </td>
                                    <td>
                                        <div class="flex-row flex-nowrap">
                                            <div>
<!--                                                <b-icon icon="three-dots-vertical" id="popover-target-1"></b-icon>-->
<!--                                                <b-icon @click="onEdit(user)" v-b-popover.hover.top="'Edit user'" icon="pencil" class="ml-3 cursor-style"></b-icon>-->

<!--                                                <b-popover target="popover-target-1" triggers="hover" placement="top">-->
<!--                                                    <template v-slot:title>Popover Title</template>-->
<!--                                                    I am popover <b>component</b> content!-->
<!--                                                </b-popover>-->
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                    </table>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name:'users',
    data:function(){
        return {
            totalusers:0,
            active:0,
            username:'',
            users:[
                // {id:1,profile:'report.png',location:'Kimara mwisho, Ubungo',name:'Edgar Emil Kikwilu',projectsDone:123,projects:[{id:1,name:'project xyz',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',price:20000,when:'12 Aug 2020',image:'image one'}]}
            ]
        }
    },
    mounted(){
        this.username = localStorage.username
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
        this.axios.get("users/all",header).then(
            response=>{
                console.log(response)
                if(response.data['status_code']==200){
                    this.totalusers = response.data['totalusers']
                    this.active = response.data['active']
                    var stats = response.data['stats']
                    this.active = stats.active
                    this.totalusers = stats.Total
                    this.users = response.data['users']
                }else{
                    console.log("something went wrong")
                }
            }).catch(error=>{
                console.log(error)
                console.log(error.response.status)
            })
        },
        navigate(page){
            this.$router.push({name:page})
        },
        onEdit(service){
            console.log(service)
            // this.$router.push({name:"edit_service"})
        },
        viewProjects(user){
            console.log(user)
            this.$router.push({name:"projects",params:{user:user}})
        }
    }
}
</script>

<style lang="scss">
    .breadcrumb_style{
        color: #535353;
    }
    .filter{
        height: 36px;
        padding-top: 80px;
    }
    .btn_new{
        height: 36px;
        padding-top: 4px !important;
        margin-top: 20px !important;
    }
    .border-bottom{
        border-bottom:1px solid #ECECEC;
    }
    .remove-box-shadow{
        box-shadow:none !important;
    }
    .cursor-style{
        cursor: pointer;
    }
    .cursor-style:hover{
        cursor: pointer;
        color: #B7BE46;
    }
    .view_projects{
        color: #B7BE46 !important;
    }
</style>