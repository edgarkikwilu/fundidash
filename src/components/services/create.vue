<template>
    <b-container style="font-family:voda-rg !important;">
        <b-card style="box-shadow:none !important; margin-top:100px" class="card-container">
            <b-row>
            <b-col cols="6" class="d-flex flex-column flex-nowrap clearfix">
                <div class="title text-gray float-left">ADD SERVICE BASIC DETAILS</div>
                <div class="input">
                    <b-form-input class="input-control cat-name-input" v-model="catname" placeholder="Service name"></b-form-input>
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
                
                <div class="new-subservice mt-2" @click="addNewSubCategory">+add new subcategory</div>

            </b-col>
        </b-row>
        <b-row class="clearfix mt-5 ">
            <b-col cols="6">
                <div class="d-flex flex-row flex-nowrap">
                    <div class="category-name subcat-name">{{catname}}</div>
                    <div class="cat-img ml-4">
                        <div v-if="imageData.length > 0">
                            <img class="preview" :src="imageData">
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col cols=6>
                <ol class="added-subcat-list">
                    <li v-for="(subcat, index) in subcategories" :key="subcat.subcategory">
                        <div class="row added-subcat" style="text-align:left;">
                            <div class="col-md-6 subcat-name">{{subcat.subcategory}}</div>
                            <div class="subcat-img col-md-3 ml-4">
                                <img :src="subcat.subcatimage" class="subimage" alt="">
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
                <b-button @click="submit" variant="danger" style="width:211px;height:35px;font-style: normal;font-weight: bold;line-height: 16px;font-size:10px;">Submit</b-button>
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
            catname:"",
            imageData: "", // we will store base64 format of image in this strin
            subcatimagedata:"",
            catimage:undefined,
            subcatimage:undefined,
            subcategory:'',
            url:"https://picsum.photos/30/30",
            subcategories:[
                // {subcategory:"Mobile Repair",subcatimage:'https://picsum.photos/30/30'},
                // {subcategory:"Mobile Software Support",subcatimage:'https://picsum.photos/30/30'},
                // {subcategory:"Mobile Network Installing",subcatimage:'https://picsum.photos/30/30'}
            ],
        }
    },
    watch:{
        
    },
    methods:{
        remove(index){
            console.log(index)
            this.subcategories.splice(index,1)
        },
        onSelectCatImage(){
            // this.catimage = URL.createObjectURL(this.$refs["catimage-ref"]);
            console.log(this.catimage)
        },
        addNewSubCategory(){
            var obj = {
                subcategory:this.subcategory,
                subcatimage:this.subcatimage
            }
            this.subcategories.push(obj);
        },
        submit(){
            var header = {
                headers:{
                    'Authorization':'Bearer ' + localStorage.access_token,
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            }
            var body = {
                title:this.catname,
                image:this.catimage,
                subcategories:this.subcategories
            }
            this.axios.post("services/create",body,header)
            .then(
                response=>{
                    console.log(response)
                this.$router.push({name:'services'})
                }
            ).catch(error=>{
                console.log(error)
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
                    this.catimage = e.target.result
                    
                }
                // Start the reader job - read file as a data url (base64 format)
                this.imageData = reader.readAsDataURL(input.files[0]);
                // console.log(this.catimage)
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
                    this.subcatimage = e.target.result
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