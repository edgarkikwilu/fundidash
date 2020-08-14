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
                            <b-input v-model="form.name" class="input-border" placeholder="Company Name"></b-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3" offset-md="1" class="mt-3">
                            <b-input v-model="form.tinno" class="input-border" placeholder="Tin No"></b-input>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.registrationno" class="input-border" placeholder="Registration No"></b-input>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.businessno" class="input-border" placeholder="Business No"></b-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3" offset-md="1" class="mt-3">
                            <b-form-select class="input-border" v-model="form.category" :options="categories"></b-form-select>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-form-select class="input-border" v-model="form.subcategory" :options="subcategories"></b-form-select>
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
                            <b-form-select class="input-border" v-model="form.region" :options="regions"></b-form-select>
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
                            <b-input v-model="form.email" class="input-border" placeholder="Email Address"></b-input>
                        </b-col>
                        <b-col cols="3" class="mt-3">
                            <b-input v-model="form.website" class="input-border" placeholder="Website"></b-input>
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
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name:"create-company",
    data:function(){
        return {
            isloading:false,
            isActive:true,
            object:undefined,
            categories:[{value:null,text:'select category'},{value:'1',text:'Electronics'},{value:'2',text:'Plumbing'},{value:'3',text:'Wood work'},{value:'4',text:'Furniture'}],
            subcategories:[{value:null,text:'select sub category'},{value:'1',text:'Electronics'},{value:'2',text:'Plumbing'},{value:'3',text:'Wood work'},{value:'4',text:'Furniture'}],
            form:{id:1,name:'',tinno:'',location:'',registrationno:'',businessno:'',category:'',subcategory:'',region:'',address:'',phone:'',email:'',website:''},
            regions:[{value:1,text:'Dar es salaam'},{value:1,text:'Arusha'},{value:1,text:'Mwanza'},{value:1,text:'Morogoro'},{value:1,text:'Dodoma'}]
        }
    },
    mounted(){
        console.log(this.company.params.company.location)
        this.object = this.company.params.company.location
        this.form.name = this.company.params.company.name
        this.form = this.company.params.company
        // this.company = company
    },
    props:['company'],
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
        submit(){
            this.isloading = true
            var header = {
                headers:{
                    'Authorization':'',
                    'Accept':'application/json'
                }
            }
            this.axios.post('/company/save',this.form,header).then(
                response=>{
                    this.isloading = false
                    console.log(response)
                    this.$router.push({name:'companies'})
                }
            ).catch(error=>{
                this.isloading = false
                console.log(error)
            })
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