<template>
	<div class="bill" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="账本"></x-header>
        <flexbox class="pb select">
            <flexbox-item>
                <div @click="active('1')" class="menu"><span :class="{'active':type==1}">支出</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('2')" class="menu"><span :class="{'active':type==2}">收入</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('3')" class="menu"><span :class="{'active':type==3}">POS</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('4')" class="menu"><span :class="{'active':type==4}">消费</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('5')" class="menu"><span :class="{'active':type==5}">提币</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('6')" class="menu"><span :class="{'active':type==6}">充值</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('7')" class="menu"><span :class="{'active':type==7}">业绩</span></div>
            </flexbox-item>
        </flexbox>
        <div class="mr30">
            <flexbox class="pb time">
                <flexbox-item>
                    <DatePicker @on-change="startime" type="date" format="yyyy/MM/dd" placement="bottom-start" placeholder="开始时间"></DatePicker>
                </flexbox-item>
                <flexbox-item>
                    <DatePicker @on-change="endtime" type="date" format="yyyy/MM/dd" placement="bottom-end" placeholder="结束时间"></DatePicker>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="main-container">
            <div class="secrechar">
                
            </div>
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
                    console.log(data);        
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
                    console.log(data);        
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
                    console.log(data);        
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