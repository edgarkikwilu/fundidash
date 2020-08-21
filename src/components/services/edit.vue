<template>
    <b-container>
        <b-card style="box-shadow:none !important; margin-top:100px" class="card-container">
            <b-row>
            <b-col cols="6" class="d-flex flex-column flex-nowrap clearfix">
                <div class="title text-gray float-left">EDIT SERVICE BASIC DETAILS</div>
                <div class="input">
                    <b-form-input class="input-control cat-name-input" v-model="form.name" placeholder="Service name"></b-form-input>
                </div>
                <b-form-file ref="catimage-ref"  @change="previewImage" accept=".jpeg, .png" :state="Boolean(catimage)" placeholder="Choose service icon or drop it here..." 
                    drop-placeholder="Drop service icon here..." class="mt-3 text-gray file-upload-control"></b-form-file>
            </b-col>
            <b-col cols="6" class="d-flex flex-column flex-nowrap">
                <div class="title text-gray">SERVICE SUBCATEGORY</div>
                <div class="input">
                    <b-form-input class="input-control" v-model="subcategory" placeholder="Subcategory name"></b-form-input>
                </div>
                <b-form-file @change="previewSubCatImage" accept=".jpeg, .png" :state="Boolean(subcatimage)" placeholder="Choose subcategory icon or drop it here..." 
                    drop-placeholder="Drop subcategory icon here..." class="mt-3 text-gray file-upload-control"></b-form-file>
                
                <div class="new-subservice" @click="addNewSubCategory">+add new subcategory</div>

            </b-col>
        </b-row>
        <b-row class="clearfix mt-4">
            <b-col cols="6">
                <div class="row" style="text-align:left;">
                    <div class="col-md-5 ml-2 category-name subcat-name">{{form.name}}</div>
                    <div class="cat-img col-md-2">
                        <!-- <div v-if="form.img > 0"> -->
                            <img class="preview" :src="form.img">
                        <!-- </div> -->
                    </div>
                </div>
            </b-col>
            <b-col cols=6>
                <ol class="added-subcat-list">
                    <li v-for="(subcat, index) in form.subcategories" :key="subcat.subcategory">
                        <div class="row added-subcat" style="text-align:left;">
                            <div class="col-md-6 subcat-name">{{subcat.name}}</div>
                            <div class="subcat-img col-md-3 ml-4">
                                <img :src="subcat.img" class="subimage" alt="">
                            </div>
                            <div class="ml-4 col-md-1 delete-icon">
                                <b-icon variant="danger" @click="remove(index)" icon="trash-fill" font-scale="1.5"></b-icon>
                            </div>
                        </div>
                        <hr>
                    </li>
                </ol>
            </b-col>
            <b-col cols="3" offset-md="9" class="mt-5">
                <b-button @click="submit" variant="danger" style="width:211px;height:35px;font-style: normal;font-weight: bold;line-height: 16px;font-size:10px;">Update</b-button>
            </b-col>
        </b-row>
        </b-card>
    </b-container>
</template>

<script>
export default {
    name:'create-service',
    data:function(){
        return {
            form:{},
            catname:"",
            catimageUpdated:false,
            imageData: "na",
            subcatimagedata:"",
            catimage:undefined,
            subcatimage:undefined,
            subcategory:'',
            url:"https://picsum.photos/30/30",
            subcategories:[],
        }
    },
    props:['service'],
    mounted(){
        this.form = this.service.params.service
        console.log(this.form)
        console.log(this.form.img)
    },
    methods:{
        remove(index){
             var headers = {
                headers:{
                    'Authorization':'Bearer '+localStorage.access_token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }

            this.axios.get("services/subcategory/remove/"+this.form.subcategories[index].id,headers)
            .then(
                response=>{
                    console.log(response)
                    this.form.subcategories.splice(index,1)
                }
            ).catch(error=>{
                console.log(error)
                alert("error deleting subcategory")
            })
        },
        onSelectCatImage(){
            this.catimage = URL.createObjectURL(this.$refs["catimage-ref"]);
            console.log(this.catimage)
        },
        addNewSubCategory(){
            var obj = {
                name:this.subcategory,
                img:this.subcatimagedata
            }
            this.form.subcategories.push(obj);
        },
        submit(){
            var headers = {
                headers:{
                    'Authorization':'Bearer '+localStorage.access_token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }
            var body = {
                id:this.form.id,
                title:this.form.name,
                image:this.form.img,
                newImage:this.imageData,
                subcategories:this.form.subcategories
            }
            console.log(body)
            this.axios.post("services/update",body,headers)
            .then(
                response=>{
                    console.log(response)
                    if(response.data['status_code']==200){
                        this.$router.push("/services")
                    }else{
                        alert(response.data['message'])
                    }
                }
            ).catch(error=>{
                console.log(error)
                alert("Something went wrong. Please try again")
            })
        },
         previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                this.catimage = reader.readAsDataURL(input.files[0]);
            }
        },
        previewSubCatImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.subcatimagedata = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                this.subcatimagedata = reader.readAsDataURL(input.files[0]);
            }
        }
    }
}
</script>

<style lang="scss">
    .text-gray{
        color: #9EA0A5;
    }
    .color-green{
        color: #B7BE46;;
    }
    .card-container{
        height: auto;
    }
    .title{
        // margin-top: 40px;
        position: absolute;  
        float: left !important;
        font-weight: bold;
    }
    .cat-name-input:hover{
        border-color: greenyellow !important;
    }
    .input{
        height: 36px;
        margin-top: 40px;
        .input-control:hover{
            border-color: #B7BE46 !important;
        }
        .input-control:focus{
            border-color: #B7BE46 !important;
            box-shadow: none !important;
        }
        .input-control{
            font-size: 10px;
            background: #FFFFFF;
            border: 1px solid #DFE0EB;
            box-sizing: border-box;
            border-radius: 8px;
            color: #7a7b7c;
        }
    }
    .catimage{
        width: 20px;
        height: 20px;
    }
    .delete-icon{
        height: 30px;
        width: 30px;
    }
    .file-upload-control{
         font-size:11px; 
        //  border-style: dotted;  
        //  border-color: #9EA0A5;
    }
    .new-subservice{
        position: absolute;
        top: 125px;
        font-size: 11px;
        color: #B7BE46;
        font-weight: bold;
    }
    .new-subservice:hover{
        cursor: pointer;
    }
    .added-subcat-list{
        font-size: 11px;
    }
    .subcat-img{
        text-align: start;
    }
    .added-subcat{
        font-size: 10px;
        float: none;
        .subimage{
            height:20px;
            width:20px;
        }
    }
    .category-name {
        font-size: 11px;
    }
    .preview{
        height: 30px;
        widows: 30px;
    }
</style>