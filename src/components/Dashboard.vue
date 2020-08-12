<template>
    <b-container>
        <b-row>
            <b-col cols="2" class="mt-5">
                <b-card style="width:213px;box-shadow:none !important;" class="top-cards-first">
                    <b-media no-body>
                        <b-media-aside>
                            <span style="border-radius:50%;background-color:#F3F3F3;height:46px;width:46px;">
                                <img src="../assets/users.png" style="width:28px;height:28px;margin-top:7px;">
                            </span>
                        </b-media-aside>
                        <b-media-body style="margin-left:-45px">
                            <p class="metric_value">19,300</p>
                            <p class="metric_label">Service Providers</p>
                        </b-media-body>
                    </b-media>
                    <b-card-footer class="transparent footer" style="border:none; margin-bottom:0px;padding-bottom:0px;">
                        <div class="d-flex flex-row flex-nowrap" style="margin-left:-25px;">
                            <b-icon icon="caret-up-fill" class="caret px-2"></b-icon>
                            <span class="active_number px-2">533</span>
                            <span class="active_text px-2">All Services</span>
                        </div>
                    </b-card-footer>
                </b-card>
            </b-col>
            <b-col cols="2" class="mt-5">
                <b-card style="width:213px;box-shadow:none !important;" class="top-cards">
                    <b-media no-body>
                        <b-media-aside>
                            <span style="border-radius:50%;background-color:#F3F3F3;height:46px;width:46px;">
                                <img src="../assets/fundis.png" style="width:28px;height:28px;margin-top:7px;">
                            </span>
                        </b-media-aside>
                        <b-media-body  style="margin-left:-45px">
                            <p class="metric_value">19,300</p>
                            <p class="metric_label">Completed Requests</p>
                        </b-media-body>
                    </b-media>
                    <b-card-footer class="transparent footer" style="border:none; margin-bottom:0px;padding-bottom:0px;">
                        <div class="d-flex flex-row flex-nowrap" style="margin-left:-25px;">
                            <b-icon icon="caret-up-fill" class="caret px-2"></b-icon>
                            <span class="active_number px-2">533</span>
                            <span class="active_text px-2">Active this week</span>
                        </div>
                    </b-card-footer>
                </b-card>
            </b-col>
            <b-col cols="3" class="mt-5">
                <b-card style="width:213px;box-shadow:none !important;" class="top-cards-3">
                    <b-media no-body>
                        <b-media-aside>
                            <span style="border-radius:50%;background-color:#F3F3F3;height:46px;width:46px;">
                                <img src="../assets/report.png" style="width:28px;height:28px;margin-top:7px;">
                            </span>
                        </b-media-aside>
                        <b-media-body  style="margin-left:-45px">
                            <p class="metric_value">19,300</p>
                            <p class="metric_label">Active Fundis</p>
                        </b-media-body>
                    </b-media>
                    <b-card-footer class="transparent footer" style="border:none; margin-bottom:0px;padding-bottom:0px;">
                        <div class="d-flex flex-row flex-nowrap" style="margin-left:-25px;">
                            <b-icon icon="caret-up-fill" class="caret px-2"></b-icon>
                            <span class="active_number px-2">533</span>
                            <span class="active_text px-2">Active this week</span>
                        </div>
                    </b-card-footer>
                </b-card>
            </b-col>
            <b-col cols="4" class="mt-5">
                <b-card class="profit_card" style="box-shadow:none !important;">
                    <p class="title">FUNDI FASTA PROFIT</p>
                    <p class="profit mt-4">Tshs 23,000,000</p>
                    <b-card-footer class="transparent footer" style="border:none; margin-bottom:0px;padding-bottom:0px;">
                        <div class="d-flex flex-row flex-nowrap" style="margin-left:-25px;">
                            <b-icon icon="caret-up-fill" class="caret px-2"></b-icon>
                            <span class="perce_profit px-2">16%</span>
                            <span class="perce_profit_text px-2">Since last month</span>
                            <b-icon icon="download" class="caret pr-2 px-2"></b-icon>
                            <!-- <span class="perce_profit px-2">16%</span> -->
                            <span class="perce_profit_text px-2 pl-1">Download Financial Report</span>
                        </div>
                    </b-card-footer>
                </b-card>
            </b-col>
        </b-row>
        <b-card class="mt-5" style="box-shadow:none !important;">
            <b-row>
                <b-col cols="8">
                    <div class="row">
                        <div class="col-md-6 text-left ">
                            <div class="title" style="color:#252733;font-weight:bold;font-size:19px;">Todays Request</div>
                            <div style="font-size:12px;color:#9FA2B4;" class="mt-4">as of 25 May 2020, 09:41 PM</div>
                        </div>
                        <div class="col-md-6 d-flex flex-row" style="position:absolute;right:-131px;">
                            <div class="title d-flex flex-row flex-nowrap">
                                <div style="width:16px;height:2px;background-color:#EB5757;margin-top:9px"></div>
                                <span style="color:#9FA2B4;font-size:12px;">Today</span>
                            </div>
                            <div class="title d-flex flex-row flex-nowrap" style="margin-left:70px">
                                <div style="width:16px;height:2px;background-color:#DFE0EB;margin-top:9px"></div>
                                <span style="color:#9FA2B4;font-size:12px;">Yesterday</span>
                            </div>
                        </div>
                    </div>
                    <line-chart :data="data" :legend="true" :library="{plotOptions: { pie: { dataLabels: { enabled: false }}}}"
                    :messages="{empty:'No data'}" :download="true"></line-chart>
                </b-col>
                <b-col cols="4">
                    <div class="data-container d-flex flex-column mt-5">
                        <div class="data">
                            <p class="label">Accepted</p>
                            <p class="value">449</p>
                        </div>
                        <div class="data">
                            <p class="label">Rejected</p>
                            <p class="value">429</p>
                        </div>
                        <div class="data">
                            <p class="label">Total Requests</p>
                            <p class="value">1m</p>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </b-container>
</template>

<script>

export default {
    name:'dashboard',
    
    data:function(){
        return {
            today:{'0': 2, '1': 5, '2': 2, '3': 10, '4': 9, '5': 15, '6': 10, '7': 11, '8': 15, '9': 5, '10': 7, '11': 6, '12': 13},
            yesterday:{'0': 4, '1': 7, '2': 1, '3': 17, '4': 19, '5': 10, '6': 9, '7': 13, '8': 11, '9': 9, '10': 6, '11': 6, '12': 12},
            data:""
        }
    },
    watch:{

    },
    mounted(){
        this.data =this.today
    }
}
</script>

<style lang="scss">
    .metric_value{
        margin: 0px;
        padding: 0px;
        font-size: 24px;
    }
    .metric_label{
        margin: 0px;
        padding: 0px;
        font-size: 10px;
        color: #90A0B7;
    }
    .top-cards{
        margin-left: 40px;
    }
    .top-cards-3{
        margin-left: 80px;
    }
    .profit_card{
        margin-left: 30px;
        width: 350px;
        height: 121px;
        background-color: #DE0B15 !important;
        text-align: start;
        p{
            margin: 0px;
            padding: 0px;
            color: white;
        }
        .title{
            font-weight: lighter;
        }
        .profit{
            font-weight: bold;
        }
        .perce_profit{
            font-size: 10px;
            color: #B7BE46;
        }
        .perce_profit_text{
            font-size: 10px;
            color: #fff;
        }
    }
    .footer{
        .caret{
            width: 10x;
            height: 10px;
            // padding-top: 0px;
            color: #B7BE46;
        }
        .active_number{
            font-size: 11px;
            color: #B7BE46;
        }
        .active_text{
            font-size: 11px;
            color: #66788A;
        }
    }
    .data-container{
        // border: 1px solid gray;
        .data{
            border-bottom: 1px solid gray;
            // border: left;: 1px solid gray;
            .label{
                color: #9FA2B4;
                font-size: 16px;
            }
            .value{
                color: #252733;
                font-size: 24px;
            }
        }
    }
</style>