<template>
    <b-container class="font-voda">
        <b-row>
            <b-col cols="12" class="mt-5" style="float:left;text-align:left;text-transform: uppercase;"><strong>{{username}} , SEE  WHAT HAPPENED TO SERVICES</strong></b-col>
            <b-col cols="12">
                <div class="d-flex flex-row flex-nowrap breadcrumb_style">
                    <span>Dashboard</span>
                    <span class="ml-2">></span>
                    <span class="ml-2">Fundi</span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <b-card style="width:213px;" class="top-cards-first mt-5 remove-box-shadow">
                    <b-media no-body>
                        <b-media-aside>
                            <span style="border-radius:50%;background-color:#F3F3F3;height:46px;width:46px;">
                                <img src="../../assets/users.png" style="width:28px;height:28px;margin-top:7px;">
                            </span>
                        </b-media-aside>
                        <b-media-body style="margin-left:-30px">
                            <p class="metric_value ml-5" style="float:left;">{{active_fundis}}</p>
                            <p class="metric_label ml-5" style="float:left;">Active Fundi</p>
                        </b-media-body>
                    </b-media>
                    <b-card-footer class="transparent footer" style="border:none; margin-bottom:0px;padding-bottom:0px;">
                        <div class="d-flex flex-row flex-nowrap" style="margin-left:-25px;">
                            <b-icon icon="caret-up-fill" class="caret px-2"></b-icon>
                            <span class="active_number px-2">{{active_fundis_week}}</span>
                            <span class="active_text px-2">Active this week</span>
                        </div>
                    </b-card-footer>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" class="mt-5">
                <b-card class="remove-box-shadow">
                    <table class="table table-borderless table-inverse table-responsive" style="width:100vw !important;">
                        <thead class="thead-inverse border-bottom">
                            <tr class="mb-3">
                                <th>
                                    <b-form-checkbox></b-form-checkbox>
                                </th>
                                <th style="text-align:left !important;">Fundi</th>
                                <th style="text-align:left !important;">Fundi ID</th>
                                <th style="text-align:left !important;">Category</th>
                                <th style="text-align:left !important;">Sub category</th>
                                <th>
                                    <select name="sort" id="" class="form-control filter" style="font-size:10px;">
                                        <option value="">Newest</option>
                                        <option value="">number of fundis</option>
                                        <option value="">number of categories</option>
                                    </select>
                                </th>
                                <th>
                                    <button type="button" class="btn btn-danger btn_new" @click="navigate('fundiCreate')" style="font-size:10px; height:30px;">+ NEW FUNDI</button>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr class="border-bottom" v-for="(fundi,index) in fundis" :key="fundi.id">
                                    <td>
                                        <b-form-checkbox></b-form-checkbox>
                                    </td>
                                    <td style="text-align:left !important;">{{fundi.name}}</td>
                                    <td style="text-align:left !important;">{{fundi.fundiid}}</td>
                                    <td style="text-align:left !important;">{{fundi.category}}</td>
                                    <td style="text-align:left !important;">{{fundi.noofsubcategories}}</td>
                                    <td style="text-align:left !important;"></td>
                                    <td style="text-align:left !important;"></td>
                                    <td style="text-align:left !important;">
                                        <div class="flex-row flex-nowrap">
                                            <div class="d-flex flex-row flex-nowrap">
                                                <!-- <b-icon @click="menu(fundi)" icon="three-dots-vertical" class="three-dots"></b-icon> -->
                                                 <b-icon @click="onEdit(fundi)" icon="pencil" class="ml-4 mr-4 cursor-style"></b-icon>
                                                 <div v-if="fundi.status!==3" @click="deactivate(fundi)" icon="power" class="cursor-style power online">Deactivate</div>
                                                <div v-if="fundi.status===3" @click="deactivate(fundi,index)" icon="power" class="cursor-style power offline">Activate</div>
                                                <!-- <div class="context-menu">
                                                    <ul>
                                                        <li>
                                                            Edit <b-icon @click="onEdit(fundi)" icon="pencil" class="ml-3 cursor-style"></b-icon>
                                                        </li>
                                                        <li>
                                                            <div class="d-flex flex-row flex-nowrap" v-if="fundi.status===1">
                                                                Deactivate <b-icon @click="deactivate(fundi)" icon="power" class="icon online"></b-icon>
                                                            </div>
                                                            <div class="d-flex flex-row flex-nowrap" v-if="fundi.status===0">
                                                                Activate<b-icon @click="deactivate(fundi,index)" icon="power" class="icon offline"></b-icon>
                                                            </div>

                                                        </li>
                                                    </ul>
                                                </div> -->
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
    name:'fundis',
    data:function(){
        return {
            active_fundis:0,
            active_fundis_week:0,
            isOnline:false,
            username:'',
            fundis:[]
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
        this.axios.get("fundi/all",header).then(
            response=>{
                // console.log(response.data)
                if(response.data['status_code']==200){
                    this.active_fundis = response.data['active_fundis']
                    this.active_fundis_week = response.data['active_fundis_week']
                    // {id:1,img:'report.png',name:'Electron8ics Repair',fundiid:'1232455',
                    // category:"Electronic",noofsubcategories:32,subcategories:[{name:'sub one',image:'image one'}]},
                    // console.log(response.data['fundis'])
                    this.fundis = []
                    for(var i=0; i<response.data['fundis'].length;i++){
                        var fundi = response.data['fundis'][i]

                        var obj = {
                            id:fundi.basic.id,
                            img:fundi.basic.id,
                            name:fundi.basic.name,
                            fundiid:fundi.basic.fundi_id,
                            category:fundi.services.title,
                            status:fundi.basic.status,
                            service_id:fundi.basic.service_id,
                            nida:fundi.basic.nida,
                            fname:fundi.basic.fname,
                            lname:fundi.basic.lname,
                            email:fundi.basic.email,
                            gender:fundi.basic.gender,
                            cost:fundi.basic.initialCost,
                            region:fundi.basic.region,
                            address:fundi.basic.address,
                            phone:fundi.basic.phone,
                            website:fundi.basic.website,
                            head:fundi.basic.head,
                            noofsubcategories:fundi.subservices.length
                        }
                        // console.log(obj)
                        this.fundis.push(obj)
                    }
                }
            }
        ).catch(error=>{
            console.log(error)
        })
    },
    methods:{
        navigate(page){
            this.$router.push({name:page})
        },
        onEdit(fundi){
            console.log(fundi)
            this.$router.push({name:"fundiEdit",params:{fundi:fundi}})
        },
        menu(fundi){
            console.log(fundi)
        },
        deactivate(fundi,index){
            this.isOnline = true
            console.log(fundi)
            var actual = fundi
            var i = index
            var header = {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':'Bearer '+localStorage.access_token
            }
        }
        this.axios.get("fundi/deactivate/"+fundi.id,header).then(
            response=>{
                console.log(response.data)
                if(response.data['status_code']==200){
                    
                    console.log(i)
                    console.log(actual)
                    if(actual.status==3){actual.status = 1}
                    else{actual.status = 3}
                    console.log('test')

                }
            }
        ).catch(error=>{
            console.log(error)
        })
        }
    }
}
</script>

<style lang="scss">
    .font-voda{
        font-family: voda-rg !important;
    }
    .breadcrumb_style{
        color: #535353;
    }
    .filter{
        height: 36px;
        padding-top: 80px;
        text-transform: capitalize;
    }
    .btn_new{
        height: 36px;
        // padding-top: 4px !important;
        // margin-top: 20px !important;
        position: absolute;
        top: 18px;
    }
    .btn_deactivate{
          width: auto !important;
        box-shadow: none !important;
        // border-color: red !important;
        background-color: white !important;
        font-family: Vodafone Rg !important;
        font-style: normal !important;
        font-weight: bold !important;
        font-size: 10px !important;
        line-height: 16px !important;
        /* identical to box height, or 160% */
        text-align: center !important;
        color: red !important;
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
    .online{
        color: #B7BE46 !important;
    }
    .offline{
        color: red !important;
    }
    .icon{
        height:20px;
        width: 20px;
        margin-top: 3px;
        margin-left: 4px;
    }
    .icon:hover{
        cursor: pointer;
    }
    .three-dots:hover{
        cursor: pointer !important;
        .context-menu{
            display: block !important;
            // ul{
            //     list-style-type: none;
            //     position: absolute;
            //     background-color: #dad4d4 !important;
            //     padding:10px;
            //     width: 120px;
            // }
        }
    }
    .context-menu{
        display: none;
        ul{
            list-style-type: none;
            position: absolute;
            background-color: #dad4d4 !important;
            padding:10px;
            width: 120px;
        }
    }
    .power{
        font-family: voda-bold !important;
        width: auto !important;
        box-shadow: none !important;
        // border-color: #B7BE46 !important;
        // background-color: white !important;
        font-family: Vodafone Rg !important;
        font-style: normal !important;
        font-weight: bold !important;
        font-size: 12px !important;
        line-height: 16px !important;
        /* identical to box height, or 160% */
        text-align: center !important;
        // color: #B7BE46 !important;
    }
</style>