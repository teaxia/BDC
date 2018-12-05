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
                    <DatePicker @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                </flexbox-item>
                <flexbox-item>
                    <DatePicker @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
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
                        <div v-if="type==4">&nbsp;</div>
                        <div>{{v.Money}}</div>
                        <div>{{v.CreateTime}}</div>
                    </template>
                    <template v-if="type==5||type==6">
                        <div>&nbsp;</div>
                        <div>{{v.CreateTime}}</div>
                    </template>
                    <template v-if="type==7">
                        <div>&nbsp;</div>
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
                stardate    :   '',
                enddate     :   '',
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
                // 如果结束时间大于选择时间，则结束时间与选择时间一致
                let str = e.replace(/\//g,"");
                let end = this.end.replace(/\//g,"");
                if(str>end){
                    this.start        =  this.end;
                    this.stardate     =  this.end;
                }else{
                    this.start        =  e;
                    this.stardate     =  e;
                }
                // 限制某一项日期为空的话，不操作
                if(this.start==''||this.end==''){
                    return;
                }
                if(this.type<=4){
                    this.query();
                }else if(this.type=='5'||this.type=='6'){
                    this.getrw();
                }else{
                    this.getyj();
                }
            },
            endtime(e){
                // 如果结束时间大于选择时间，则结束时间与选择时间一致
                let end = e.replace(/\//g,"");
                let str = this.start.replace(/\//g,"");
                if(str>end){
                    this.start        =  e;
                    this.stardate     =  e;
                }
                this.end = e;
                this.enddate = e;
                // 限制某一项日期为空的话，不操作
                if(this.start==''||this.end==''){
                    return;
                }
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
            // 获取今天日期
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            this.stardate = (year+'/'+month+'/'+day);
            this.enddate = (year+'/'+month+'/'+day);
            this.start = (year+'/'+month+'/'+day);
            this.end = (year+'/'+month+'/'+day);
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/bill";
</style>