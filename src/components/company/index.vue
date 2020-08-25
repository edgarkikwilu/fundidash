<template>
    <b-container style="font-family:voda-rg !important;">
        <b-row>
            <b-col cols="12" class="mt-5" style="float:left;text-align:left;text-transform: uppercase;"><strong>{{username}} , SEE  WHAT HAPPENED TO SERVICES</strong></b-col>
            <b-col cols="12">
                <div class="d-flex flex-row flex-nowrap breadcrumb_style">
                    <span>Dashboard</span>
                    <span class="ml-2">></span>
                    <span class="ml-2">Companies</span>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <b-card style="width:213px;" class="top-cards-first mt-5 remove-box-shadow">
                    <b-media no-body>
                        <b-media-aside>
                            <span style="border-radius:50%;background-color:#B7BE46;height:46px;width:46px;">
                                <img src="../../assets/users.png" style="width:28px;height:28px;margin-top:7px;">
                            </span>
                        </b-media-aside>
                        <b-media-body style="margin-left:-30px">
                            <p class="metric_value ml-5" style="float:left;">{{total}}</p>
                            <p class="metric_label ml-5" style="float:left;">Number of companies</p>
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
                                <th  style="text-align: left;" class="th">Company Name</th>
                                <th  style="text-align: left;" class="th">Company Location</th>
                                <th  style="text-align: left;" class="th">Service Category</th>
                                <th  style="text-align: left;" class="th">Service Sub-Categories</th>
                                <th>
                                    <!-- <select name="sort" id="" class="form-control filter" style="font-size:10px;">
                                        <option value="">service ID</option>
                                        <option value="">number of fundis</option>
                                        <option value="">number of categories</option>
                                    </select> -->
                                </th>
                                <th>
                                    <button type="button" class="btn btn-danger btn_new" @click="navigate('create_company')" style="font-size:10px; height:30px;">+ NEW COMPANY</button>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr class="border-bottom" v-for="company in companies" :key="company.id">
                                    <td>
                                        <img src="../../assets/fundis.png" style="width:28px;height:28px;margin-top:0px;">
                                    </td>
                                    <td style="text-align: left;">{{company.name}}</td>
                                    <td style="text-align: left;">{{company.location}}</td>
                                    <td style="text-align: left;">{{company.service_category}}</td>
                                    <td style="text-align: left;">{{company.subs}}</td>
                                    <td style="text-align: left;"></td>
                                    <td style="text-align: left;"></td>
                                    <td style="text-align: left;">
                                        <div class="flex-row flex-nowrap">
                                            <div>
                                                <b-icon icon="three-dots-vertical"></b-icon>
                                                <b-icon @click="onEdit(company)" icon="pencil" class="cursor-style ml-3"></b-icon>
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
    name:'companies',
    data:function(){
        return {
            username:'',
            companies:[],
            total:0,
            active:0
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
                    'Authorization':'Bearer '+localStorage.access_token,
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
            this.axios.get("company/all",header).then(
                response=>{
                    if(response.data['status_code']==200){
                        var companies = response.data['companies']
                        // console.log(companies)
                        this.total = response.data['count']
                        this.active = 0

                        for (var i=0;i<companies.length;i++){
                            var company = companies[i]

                            var obj = {id:company.id,img:'report.png',name:company.name,selected_id:company.service_id,subs:company.subservices.join(","),selected_subservices:company.selected_subservices,location:company.address,service_category:company.service
                                ,subcategories:company.subservices,tinno:company.tinNumber,registrationno:company.registrationNumber,businessno:company.businessNumber,region:company.region
                                ,address:company.address,phone:company.contactNumber,email:company.email,website:company.website}
                            console.log("---------------------")
                            console.log(obj.subs)
                            console.log("---------------------")
                            this.companies.push(obj)
                        }
                    }
                    // console.log(response)
                }
            ).catch(error=>{
                console.log(error)
            })
        },
        navigate(page){
            this.$router.push({name:page})
        },
        onEdit(company){
            console.log(company)
            this.$router.push({name:"edit_company",params:{company:company}})
        }
    }
}
</script>

<style lang="scss">
    .th{
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height, or 143% */
        letter-spacing: -0.05px;
        color: #3A3B3F;
    }
    .breadcrumb_style{
        color: #535353;
    }
    .cursor-style{
        cursor: pointer;
    }
    .cursor-style:hover{
        cursor: pointer;
        color: #B7BE46;
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
</style>