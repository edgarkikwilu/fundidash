<template>
    <b-container style="font-family:voda-rg !important;">
        <b-row v-if="isActive">
            <b-col cols="12" offset="0">
                <b-card class="mt-5 remove-box-shadow">
                    <b-row>
                        <b-col cols="3" offset-md="1" class="toggleable" @click="toggle('company')" :class="{active:isActive}">
                            <span>COMPANY INFORMATION</span>
                        </b-col>
                        <b-col cols="3" class="toggleable" @click="toggle('contact')" :class="{active:!isActive}">
                            <span>CONTACT INFORMATION</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col cols="9" offset-md="1">
                            <b-input v-model="form.nida" class="input-border" placeholder="NIDA ID Nunmber"></b-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="2" offset-md="1" class="mt-3">
                            <b-form-select v-model="form.gender" class="input-border">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Please select gender --</b-form-select-option>
                                </template>
                                <b-form-select-option value="male">Male</b-form-select-option>
                                <b-form-select-option value="female">Female</b-form-select-option>
                                <b-form-select-option value="unknown">Rather not say</b-form-select-option>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3" offset-md="1" class="mt-3">
                            <b-input v-model="form.fname" class="input-border" placeholder="Firstname"></b-input>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.lname" class="input-border" placeholder="Lastname"></b-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3" offset-md="1" class="mt-3">
                            <b-form-select class="input-border" v-model="form.service_id" @input="updateSubserviceList" :options="services">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Please select category --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-form-select class="input-border" multiple v-model="selected_subservices" placeholder="Subcategory" :options="subservices">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Please select subcategory --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.cost" placeholder="Initial Costing" class="input-border"></b-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col cols="3" offset-md="7">
                            <b-button variant="danger" class="button" @click="next">Save and Go Next</b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-if="!isActive">
            <b-col cols="12" offset="0">
                <b-card class="mt-5 remove-box-shadow">
                    <b-row>
                        <b-col cols="3" offset-md="1" class="toggleable" @click="toggle('company')" :class="{active:isActive}">
                            <span>COMPANY INFORMATION</span>
                        </b-col>
                        <b-col cols="3" class="toggleable" @click="toggle('contact')" :class="{active:!isActive}">
                            <span>CONTACT INFORMATION</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col cols="3" offset-md="1">
                            <b-form-select class="input-border" v-model="form.region" :options="regions">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Please select region --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3">
                            <b-input v-model="form.address" class="input-border" placeholder="Address"></b-input>
                        </b-col>
                        <b-col cols="3" class="phone-field">
                            <span id="code">+255</span>
                            <b-input v-model="form.phone" class="input-border phone-input" placeholder="Contact Number"></b-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3" offset-md="1" class="mt-3">
                            <b-input v-model="form.email" class="input-border" placeholder="Email Address*"></b-input>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.website" class="input-border" placeholder="Website"></b-input>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.head" class="input-border" placeholder="Name of head*"></b-input>
                        </b-col>
                    </b-row>
                    <b-row class="mt-5">
                        <b-col cols="4" offset-md="1">
                            <b-button variant="light" :disabled="isloading" @click="prev" class="button-prev">Previous</b-button>
                        </b-col>
                        <b-col cols="6">
                            <b-spinner v-if="isloading" variant="danger" class="mt-3" small></b-spinner>
                            <b-button @click="submit" v-if="!isloading" class="button ml-5">Update</b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name:"create-fundi",
    data:function(){
        return {
            isloading:false,
            isActive:true,
            service:'',
            service_id:0,
            subservice:'',
            selected_subservices: [],
            services:[],
            subservices:[],
            form:{nida:'',gender:'',fname:'',lname:'',service:'',subservice:'',service_id:0,costing:0,region:'',address:'',phone:'',email:'',website:'',head:''},
            regions:[{value:"Dar es salaam",text:'Dar es salaam'},{value: "Arusha",text:'Arusha'},{value:"Mwanza",text:'Mwanza'},{value:"Morogoro",text:'Morogoro'},{value:"Morogoro",text:'Dodoma'}]
        }
    },
    mounted(){
        this.form = this.fundi.params.fundi
        console.log(this.form)
        this.init()
    },
    props:['fundi'],
    watch:{
        service:function(){
            this.form.category = this.category
            this.loadSubcategories()
        }
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
            this.axios.get('services/all',header).then(
                response=>{
                    this.isloading = false
                    if (response.data['status_code']==200){
                        var services = response.data['data']
                        for (var i=0;i<services.length;i++){
                            var service = services[i]
                            var obj = {value:service.id,text:service.name,subservices:service.subcategories}
                            this.services.push(obj)
                        }
                        this.updateSubserviceList()
                    }else if(response.data['status_code']==402){
                        alert("Email already taken")
                    }
                }
            ).catch(error=>{
                this.isloading = false
                console.log(error)
                var code = error.response.status

                if (code == 401){
                    alert('Please login first, you are not authenticated')
                }else if(code == 500){
                    alert('Server error, please try again later')
                }else{
                    alert('Unkown error has occured')
                }
            })
        },
        toggle(tab){
            console.log(tab)
            if(tab == "company")this.isActive=true
            if(tab == "contact")this.isActive=false
            // this.isActive = !this.isActive
        }  ,
        next(){
            this.isActive = false
        },
        prev(){
            this.isActive = true
        },
        loadSubcategories(){
            var headers = {
                headers:{
                    'Accept':'application/json',
                    'Authorization':'Bearer '
                }
            }
            this.axios.get('/subcategories/'+this.category,headers).then(
                response=>{
                    console.log(response)
                    this.subcategory = []
                }
            ).catch(error=>{
                console.log(error)
            })
        },
        submit(){
            var header = {
                headers:{
                    'Authorization':'Bearer '+localStorage.access_token,
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
            if (this.selected_subservices.length==0){
                alert("please select subservices first")
                console.log(this.form)
            }else{
                this.isloading = true
                var subs = this.selected_subservices
                this.form.subservice = subs.join(",")
                this.axios.post('/fundi/update',this.form,header).then(
                    response=>{
                        this.isloading = false
                        console.log(response)
                        this.$router.push({name:'fundis'})
                    }
                ).catch(error=>{
                    this.isloading = false
                    console.log(error)
                })
            }
        },
        updateSubserviceList(){
            var service = null
            for (var i=0;i<this.services.length;i++){
                var cat = this.services[i]
                // var selected = this.form.service
                if(cat.value==this.form.service_id){
                    service = cat
                }
            }
            this.subservices = []
            console.log("update service list method")
            console.log(service)
            console.log("__________________________")
            for (var j=0;j<service.subservices.length;j++){
                var sub = service.subservices[j]
                var obj = {value:sub.id,text:sub.title}
                console.log(obj)
                this.subservices.push(obj)
            }
        }
    }
}
</script>

<style lang="scss">
    .remove-box-shadow{
        box-shadow: none !important;
    }
    .input-border{
        font-style: normal !important;
        font-weight: normal !important;
        font-size: 10px !important;
        line-height: 16px !important;
        color: #9EA0A5 !important;
        box-shadow: none !important;
    }
    .input-border:hover,.phone-field:hover{
        border-color: #B7BE46 !important;
    }
    .input-border:focus,.phone-field:focus{
        border-color: #B7BE46 !important;
    }
    .toggleable:hover{
        cursor: pointer;
    }
    .toggleable{
        background-color: #f5f5f5;
        padding: 20px;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
    }
    .active{
        background-color: #9EA0A5;
        color: #fff;
        font-style: normal;
        font-weight: bold;
        font-size: 10px;
    }
    .button{
        box-shadow: none !important;
        width: 211px !important;
        font-style: normal !important;
        font-weight: bold !important;
        font-size: 10px !important;
        line-height: 16px !important;
        /* identical to box height, or 160% */
        text-align: center !important;
        color: #FFFFFF !important;
        background-color: #DE0B15 !important;
    }
    .button-prev{
        width: 211px !important;
        box-shadow: none !important;
        background-color: white !important;
        font-family: Vodafone Rg !important;
        font-style: normal !important;
        font-weight: bold !important;
        font-size: 10px !important;
        line-height: 16px !important;
        /* identical to box height, or 160% */
        text-align: center !important;
        color: #9EA0A5 !important;
    }
    .phone-field{
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        border: 1px solid #b9bbbe;
        border-radius: 4px;
        #code{
            font-size: 10px !important;
            padding-top: 5px;
            color: #9EA0A5 !important;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
        }
        .phone-input{
            border:none !important;
            border-left: 1px solid gray !important;
            border-radius: 0px !important;
            margin:0px 13px !important;
            height: 15px !important;
            margin-top: 5px !important;
        }   
    }
</style>