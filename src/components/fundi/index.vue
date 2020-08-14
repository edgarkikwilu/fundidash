<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="mt-5" style="float:left;text-align:left;"><strong>BENET , SEE  WHAT HAPPENED TO SERVICES</strong></b-col>
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
                                            <div>
                                                <!-- <b-icon @click="menu(fundi)" icon="three-dots-vertical" class="three-dots"></b-icon> -->
                                                 <b-icon @click="onEdit(fundi)" icon="pencil" class="ml-4 mr-4 cursor-style"></b-icon>
                                                 <b-icon v-if="fundi.status===1" @click="deactivate(fundi)" icon="power" class="icon online">Deactivate</b-icon>
                                                <b-icon v-if="fundi.status===0" @click="deactivate(fundi,index)" icon="power" class="icon offline">Activate</b-icon>
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
            fundis:[
                // {id:1,img:'report.png',name:'Electronics Repair',fundiid:'1232455',category:"Electronic",noofsubcategories:32,subcategories:[{name:'sub one',image:'image one'}]},
                // {id:1,img:'report.png',name:'House Cleaning',fundiid:'1249955',category:"PLumbing",noofsubcategories:7,subcategories:[{name:'sub two',image:'image two'}]},
                // {id:1,img:'report.png',name:'Home Internet',fundiid:'232408',category:"Electronic",noofsubcategories:4,subcategories:[{name:'sub three',image:'image three'}]},
                // {id:1,img:'report.png',name:'Car Repair',fundiid:'328773',category:"Plumbing",noofsubcategories:12,subcategories:[{name:'sub four',image:'image four'}]}
            ]
        }
    },
    mounted(){
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
                console.log(response.data)
                if(response.data['status_code']==200){
                    this.active_fundis = response.data['active_fundis']
                    this.active_fundis_week = response.data['active_fundis_week']
                    // {id:1,img:'report.png',name:'Electronics Repair',fundiid:'1232455',
                    // category:"Electronic",noofsubcategories:32,subcategories:[{name:'sub one',image:'image one'}]},
                    console.log(response.data['fundis'])
                    this.fundis = []
                    for(var i=0; i<response.data['fundis'].length;i++){
                        var fundi = response.data['fundis'][i]
                        console.log("noofsubcategories: "+fundi.subservices.length)
                        var obj = {
                            id:fundi.basic.id,
                            img:fundi.basic.id,
                            name:fundi.basic.name,
                            fundiid:fundi.basic.fundi_id,
                            category:fundi.services.title,
                            status:fundi.basic.status,
                            noofsubcategories:fundi.subservices.length
                        }
                        console.log(obj)
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
                    if(actual.status==1){actual.status = 0}
                    else{actual.status = 1}
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
        width: auto !important;
        box-shadow: none !important;
        border-color: #B7BE46 !important;
        background-color: white !important;
        font-family: Vodafone Rg !important;
        font-style: normal !important;
        font-weight: bold !important;
        font-size: 10px !important;
        line-height: 16px !important;
        /* identical to box height, or 160% */
        text-align: center !important;
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
</style>