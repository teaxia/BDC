<template>
	<div class="bill padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.bill.title')"></x-header>
        <flexbox class="pb select">
            <flexbox-item>
                <div @click="active('1')" class="menu"><span :class="{'active':type==1}">{{$t('discovery.bill.type1')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('2')" class="menu"><span :class="{'active':type==2}">{{$t('discovery.bill.type2')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('3')" class="menu"><span :class="{'active':type==3}">{{$t('discovery.bill.type3')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('4')" class="menu"><span :class="{'active':type==4}">{{$t('discovery.bill.type4')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('5')" class="menu"><span :class="{'active':type==5}">{{$t('discovery.bill.type5')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('6')" class="menu"><span :class="{'active':type==6}">{{$t('discovery.bill.type6')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('7')" class="menu"><span :class="{'active':type==7}">{{$t('discovery.bill.type7')}}</span></div>
            </flexbox-item>
        </flexbox>
        <div class="mr30">
            <flexbox class="pb time">
                <flexbox-item>
                    <DatePicker @on-change="startime" type="date" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                </flexbox-item>
                <flexbox-item>
                    <DatePicker @on-change="endtime" type="date" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="main-container">
            <flexbox class="pb vux-1px-b relist" v-for="(v,index) in dataList" :key="index">
                <flexbox-item class="text-left">
                    <template v-if="type<=4">
                        <div>{{v.BusinessType}}</div>
                        <div>BDC:{{v.MoneyAfter}}</div>
                        <div>{{v.Remakes}}</div>
                    </template>
                    <template v-if="type==5||type==6">
                        <div>{{v.CurrencyNum}}</div>
                        <div>{{v.Status}}</div>
                    </template>
                    <template v-if="type==7">
                        <div>{{v.Area}}</div>
                        <div>{{$t('discovery.bill.people')}}：{{v.MemberCount}}</div>
                    </template>
                </flexbox-item>
                <flexbox-item class="text-right">
                    <template v-if="type<=4">
                        <div>{{v.Money}}</div>
                        <div>{{v.CreateTime}}</div>
                    </template>
                    <template v-if="type==5||type==6">
                        <div>{{v.CreateTime}}</div>
                    </template>
                    <template v-if="type==7">
                        <div>{{$t('discovery.bill.money')}}：{{v.TotalCurrency }}</div>
                    </template>
                </flexbox-item>
            </flexbox>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'bill',
		data() {
			return {
                type        :   '1',
                class       :   '0',
                start       :   '',
                dataList    :   [],
                end         :   '',
                isok        :   false,
			}
        },
        watch:{
            type(){
                switch(this.type){
                    case '1':
                        this.class = "支出"
                        this.query();
                    break;
                    case '2':
                        this.class = "收入"
                        this.query();
                    break;
                    case '3':
                        this.class = "POS"
                        this.query();
                    break;
                    case '4':
                        this.class = "其他"
                        this.query();
                    break;
                    case '5':
                        // 提币
                        this.class = "W"
                        this.getrw();
                    break;
                    case '6':
                        // 充值
                        this.class = "R"
                        this.getrw();
                    break;
                    case '7':
                        // 充值
                        this.class = ""
                        this.getyj();
                    break;
                }
            }
        
        },
		methods: {
            active(type){
                this.type  = type;
            },
            startime(e){
                this.start = e;
                if(this.type<=4){
                    this.query();
                }else if(this.type=='5'||this.type=='6'){
                    this.getrw();
                }else{
                    this.getyj();
                }
            },
            endtime(e){
                this.end = e;
                if(this.type<=4){
                    this.query();
                }else if(this.type=='5'||this.type=='6'){
                    this.getrw();
                }else{
                    this.getyj();
                }
            },
            query(){
                this.$server.post(
                'GetAccountBusiness',
                {
                    guid     :   this.$storage.get('guid'),
                    Type     :   this.class,
                    dtStart  :   this.start,
                    dtEnd    :   this.end,
                },
                ).then(data => {
                    if(!data.Result){
                        this.dataList = data;
                    }else{
                        this.dataList = []
                    }
                })
            },
            getrw(){
                this.$server.post(
                'GetR_W_Info',
                {
                    guid     :   this.$storage.get('guid'),
                    Type     :   this.class,
                    dtStart  :   this.start,
                    dtEnd    :   this.end,
                },
                ).then(data => {
                    if(!data.Result){
                        this.dataList = data;
                    }else{
                        this.dataList = []
                    }
                })
            },
            getyj(){
                this.$server.post(
                'GetAccountBusiness_YJ',
                {
                    guid     :   this.$storage.get('guid'),
                    dtStart  :   this.start,
                    dtEnd    :   this.end,
                },
                ).then(data => {
                    if(!data.Result){
                        this.dataList = data;
                    }else{
                        this.dataList = []
                    }
                })
            }
		},
		mounted() {
            // 初始化数据
            this.class="支出";
            this.type = 1;
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/bill";
</style>