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
                            <b-input v-model="form.nida" maxLength="16" type="number" class="input-border" placeholder="NIDA ID Number"></b-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="2" offset-md="1" class="mt-3">
                            <b-form-select v-model="form.gender" class="input-border">
                                <option value="" disabled>-- Please select gender --</option>
<!--                                <b-form-select-option value="null" disabled>&#45;&#45; Please select gender &#45;&#45;</b-form-select-option>-->
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
                            <b-form-select class="input-border" v-model="category">
                                <option value="" disabled>-- Please select category --</option>
                                <b-form-select-option v-for="category in categories" :value="category.value" :key="category.value">{{category.text}}</b-form-select-option>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-form-select class="input-border" multiple v-model="selected_subcategories" placeholder="Subcategory" :options="subcategories">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Please select subcategory --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.cost" type="number" placeholder="Initial Costing" class="input-border"></b-input>
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
                            <b-form-select class="input-border" v-model="form.region">
                                <option value="" disabled>-- Please select region --</option>
                                <b-form-select-option v-for="region in regions" :value="region.value" :key="region.value">{{region.text}}</b-form-select-option>
                            </b-form-select>
                        </b-col>
                        <b-col cols="3">
                            <b-input v-model="form.address" @click="showMap" class="input-border" placeholder="Address"></b-input>
                        </b-col>
                        <b-col cols="3" class="phone-field">
                            <span id="code">+255</span>
                            <b-input type="number" v-model="form.phone" class="input-border phone-input" placeholder="Contact Number"></b-input>
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
                            <b-button @click="submit" v-if="!isloading" class="button ml-5">Submit</b-button>
                        </b-col>
                    </b-row>
                    <div v-if="getLocationClicked">
                        <google-map v-on:updateAddress="updateAddress($event)" style="height: 200px;width: 100%"/>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import GoogleMap from "../GoogleMap";
export default {
    name:"create-fundi",
    data:function(){
        return {
            isloading:false,
            isActive:true,
            getLocationClicked:false,
            lat:'',
            lng:'',
            address:'',
            category:'',
            subcategory:'',
            selected_subcategories:[],
            categories:[],
            subcategories:[],
            form:{nida:'',gender:'',fname:'',lname:'',category:'',subcategory:'',costing:0,region:'',address:'',lat:'',lng:'',phone:'',email:'',website:'',head:''},
            regions:[{value:"Dar es salaam",text:'Dar es salaam'},{value: "Arusha",text:'Arusha'},{value:"Mwanza",text:'Mwanza'},{value:"Morogoro",text:'Morogoro'},{value:"Morogoro",text:'Dodoma'}]
        }
    },
    components:{
        GoogleMap
    },
    mounted(){
        this.loadCategories()
    },
    watch:{
        category:function(){
               this.form.category = this.category
                // this.loadSubcategories()
                for(let i = 0; i < this.categories.length; i++) {
                    var element = this.categories[i];
                    if(element.value == this.category){
                        this.subcategories = element.subcategories
                    }
                }
        }
    },
    methods:{
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
        showMap(){
            this.getLocationClicked = true
        },
        loadCategories(){
            var headers = {
                headers:{
                    'Accept':'application/json',
                    'Authorization':'Bearer '+localStorage.access_token,
                    'Content-Type':'application/json'
                }
            }
            this.axios.get('services/onlyCat',headers).then(
                response=>{
                    for(var i=0;i<response.data.length;i++){
                        var service = response.data[i]
                        var subcategories_ = []
                        for(var j=0;j<service.subcategories.length;j++){
                            var sub = service.subcategories[j]
                            // console.log(sub)
                            var obj_ = {
                                value:sub.id,
                                text:sub.title,
                            }
                            // console.log(obj_)
                            subcategories_.push(obj_)
                        }   
                        var obj = {
                            value: service.id,
                            text: service.name,
                            subcategories:subcategories_
                        }
                        this.categories.push(obj)
                        console.log(service)
                    }
                }
            ).catch(error=>{
                console.log(error)
            })
        },
        loadSubcategories(){
            for (let i = 0; i < this.categories; i++) {
                const element = this.categories[i];
                if(element.id == this.category){
                    this.subcategories = element.subcategories
                }
            }
            // var headers = {
            //     headers:{
            //         'Accept':'application/json',
            //         'Authorization':'Bearer '+localStorage.access_token,
            //         'Content-Type':'application/json'
            //     }
            // }
            // this.axios.get('/subcategories/'+this.category,headers).then(
            //     response=>{
            //         console.log(response)
            //         this.subcategory = []
            //     }
            // ).catch(error=>{
            //     console.log(error)
            // })
        },
        submit(){
            this.isloading = true
            var header = {
                headers:{
                    'Authorization':'Bearer '+localStorage.access_token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }
            var subs = this.selected_subcategories.join(",")
            this.form.subcategory = subs
            this.axios.post('/fundi/create',this.form,header).then(
                response=>{
                    this.isloading = false
                    console.log(response)
                    this.$router.push({name:'fundis'})
                }
            ).catch(error=>{
                this.isloading = false
                console.log(error)
            })
        },
        updateAddress(address){
            console.log(address.lat)
            this.form.lat = address.lat
            this.form.lng = address.lng
            this.form.address = address.address
            this.getLocationClicked = false
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
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>