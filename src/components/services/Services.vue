<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="mt-5" style="float:left;text-align:left;text-transform: uppercase;"><strong>{{username}} , SEE  WHAT HAPPENED TO SERVICES</strong></b-col>

            <b-col cols="12">
                <div class="d-flex flex-row flex-nowrap breadcrumb_style">
                    <span>Dashboard</span>
                    <span class="ml-2">></span>
                    <span class="ml-2">Services</span>
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
                            <p class="metric_value ml-5" style="float:left;">{{totalservices}}</p>
                            <p class="metric_label ml-5" style="float:left;">Service Categories</p>
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
            <b-col cols="12" class="mt-5">
                <b-card class="remove-box-shadow">
                    <table class="table table-borderless table-inverse table-responsive">
                        <thead class="thead-inverse border-bottom">
                            <tr class="mb-3">
                                <th></th>
                                <th>Service</th>
                                <th>ServiceID</th>
                                <th>Number of fundis</th>
                                <th>Number of sub categories</th>
                                <th>
                                    <select name="sort" id="" class="form-control filter" style="font-size:10px;">
                                        <option value="">service ID</option>
                                        <option value="">number of fundis</option>
                                        <option value="">number of categories</option>
                                    </select>
                                </th>
                                <th>
                                    <button type="button" class="btn btn-danger btn_new" @click="navigate('create_service')" style="font-size:10px; height:30px;">New SERVICE</button>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr class="border-bottom" v-for="service in services" :key="service.id">
                                    <td>
                                        <img src="../../assets/report.png" style="width:28px;height:28px;margin-top:0px;">
                                    </td>
                                    <td>{{service.name}}</td>
                                    <td>{{service.serviceid}}</td>
                                    <td>{{service.nooffundis}}</td>
                                    <td>{{service.noofsubcategories}}</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div class="flex-row flex-nowrap">
                                            <div>
                                                <b-icon icon="three-dots-vertical"></b-icon>
                                                <b-icon @click="onEdit(service)" icon="pencil" class="ml-3 cursor-style"></b-icon>
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
    name:'services',
    data:function(){
        return {
            totalservices:0,
            active:0,
            services:[],
            username:''
        }
    },
    mounted(){
        this.username = localStorage.username
        var header = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.access_token
            }
        }
        this.axios.get("services/all",header).then(
            response=>{
                // console.log(response)
                if(response.data['status_code']==200){
                    this.totalservices = response.data['totalservices']
                    this.active = response.data['active']
                    // this.services = response.data['data']

                    for(var i=0;i<response.data['data'].length;i++){
                        var service = response.data['data'][i]
                        var subcategories_ = []
                        for(var j=0;j<service.subcategories.length;j++){
                            var sub = service.subcategories[j]
                            // console.log(sub)
                            var obj_ = {
                                id:sub.id,
                                name:sub.title,
                                img:sub.image_url
                            }
                            // console.log(obj_)
                            subcategories_.push(obj_)
                        }   
                        var obj = {
                            id: service.id,
                            img: service.img,
                            name: service.name,
                            serviceid: service.serviceid,
                            nooffundis: service.nooffundis,
                            noofsubcategories: service.noofsubcategories,
                            subcategories:subcategories_
                        }
                        this.services.push(obj)
                        console.log(service)
                    }
                }else{
                    console.log("something went wrong")
                }
            }
        ).catch(error=>{
            console.log(error)
            console.log(error.response.status)
        })
    },
    methods:{
        navigate(page){
            this.$router.push({name:page})
        },
        onEdit(service){
            console.log(service)
            this.$router.push({name:"edit_service",params:{service:service}})
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
</style>