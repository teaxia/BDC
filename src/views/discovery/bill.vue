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
            <div class="datatime">
                <select>
                    <option v-for="v in year" :value="v">{{v}}</option>
                </select>
                <span>年</span>
                <select>
                    <option v-for="v in month" :value="v">{{v}}</option>
                </select>
                <span>月</span>
                <select>
                    <option v-for="v in day" :value="v">{{v}}</option>
                </select>
                <span>日</span>
            </div>
        </div>
        <div class="main-container">
            <div class="secrechar">
                
            </div>
            
            
            <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('discovery.cash.buy')}}</button>
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
                current     :   '0',
                year        :   [],
                month       :   [1,2,3,4,5,6,7,8,9,10,11,12],
                day         :   [],
                isok        :   false,
			}
        },
        watch:{
            num(){
                this.bdcmoney = this.num/this.bdc
            }
        },
		methods: {
            active(type){
                this.type  = type;
            },
            act(index,money){
                this.current = index;
            },
            submit(){
                // 获取详情
                if(this.isok){
                    return;
                }
                this.mobile = this.mobile.replace(/\s+/g,"")
                if(this.mobile==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.recharge.error.mobile'),
                        type: 'warn'
                    })
                    return;
                }else{
                    this.isok = false;
                }
                switch(this.type){
                    case '1':
                        this.class = '话费充值';
                    break;
                    case '2':
                        this.class = '流量充值';
                    break;
                    case '3':
                        this.class      = '油卡充值';
                        this.RMB        = this.num/this.bdc;
                        this.Remakes    = '公司 :'+this.coname+' 油卡号 :'+this.oilcard;
                        if(this.num<'1'){
                            this.$vux.toast.show({
                                text: this.$t('discovery.recharge.error.num'),
                                type: 'warn'
                            })
                            return ;
                        }
                        if(this.coname==''||this.mobile==''||this.oilcard==''){
                            this.$vux.toast.show({
                                text: this.$t('discovery.recharge.error.full'),
                                type: 'warn'
                            })
                            return ;
                        }
                    break;
                }
                this.isok = true;
                
                // 应用类型

                this.$server.post(
                'PayOther',
                {
                    guid 	        :   this.$storage.get('guid'),
                    OtherType       :   this.class,                           // 应用类型：1话费充值，2流量充值，3油卡充值
                    RMB             :   this.RMB,                             // RMB价格
                    PhoneNo         :   this.mobile,                          // 手机号                      
                    Remakes         :   this.Remakes,                         // 充值备注
                },
                ).then(data => {
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    this.isok = false;
                })
            }
		},
		mounted() {
            // 初始化年
            let time = new Date();
            let year = time.getFullYear();
            this.year.push(year);
            for(let i =1;i<=5;i++){
                this.year.push(year-i);
            }
            // 初始化日
            for(let i =1;i<=31;i++){
                this.day.push(i);
            }
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/bill";
</style>