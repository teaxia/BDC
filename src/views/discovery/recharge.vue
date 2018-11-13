<template>
	<div class="recharge" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.recharge.title')"></x-header>
        <flexbox class="pb select">
            <flexbox-item>
                <div @click="active('1')" class="menu"><span :class="{'active':type==1}">{{$t('discovery.recharge.type.phone')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('2')" class="menu"><span :class="{'active':type==2}">{{$t('discovery.recharge.type.gprs')}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div @click="active('3')" class="menu"><span :class="{'active':type==3}">{{$t('discovery.recharge.type.oilcard')}}</span></div>
            </flexbox-item>
        </flexbox>
        <div class="mr30" v-if="type==1||type==2">
            <group>
                <x-input class="tel" :title="$t('input.mobile')" mask="999 9999 9999" :max="13" v-model="mobile" :placeholder="$t('input.tips.mobile')" keyboard="number" is-type="china-mobile"></x-input>
            </group>
        </div>
        <div class="main-container">
            <div v-if="type==1" class="secrechar">
                <div v-for="(v,index) in phonecharges" @click="act(index,v.money)" :class="{'sel_div':true,'current':current==index}">
                    <div>{{v.money}}CNY</div>
                    <div>{{$t('discovery.recharge.price')}}：{{v.money/bdc}} BDC</div>
                    <i v-if="current==index" class="iconfont icon-xuanze"></i>
                </div>
            </div>
            <div v-if="type==2" class="secrechar">
                <div v-for="(v,index) in gprs" @click="act(index,v.money)" :class="{'sel_div':true,'current':current==index}">
                    <div>{{v.value}}</div>
                    <div>{{$t('discovery.recharge.price')}}：{{v.money/bdc}} BDC</div>
                    <i v-if="current==index" class="iconfont icon-xuanze"></i>
                </div>
            </div>
            <div v-if="type==3">
                <div class="mr30">
                    <group>
                        <x-input class="tel" :title="$t('input.coname')" v-model="coname" :placeholder="$t('input.tips.coname')"></x-input>
                    </group>
                    <group>
                        <x-input class="tel" :title="$t('input.mobile')" mask="999 9999 9999" :max="13" v-model="mobile" :placeholder="$t('input.tips.mobile')" keyboard="number"></x-input>
                    </group>
                    <group>
                        <x-input class="tel" :title="$t('input.oilcard')" v-model="oilcard" :placeholder="$t('input.tips.oilcard')" keyboard="number"></x-input>
                    </group>
                    <group>
                        <x-input class="tel" :title="$t('input.recharge')" v-model="num" :placeholder="$t('input.tips.recharge')" keyboard="number"></x-input>
                    </group>
                    <group>
                        <x-input class="tel" :title="$t('input.bdc')" readonly v-model="bdcmoney"></x-input>
                    </group>
                </div>
            </div>
            <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('discovery.cash.buy')}}</button>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'recharge',
		data() {
			return {
                type        :   '1',
                current     :   '0',
                class       :   '话费充值',
                bdc         :   '',
                RMB         :   '',
                Remakes     :   '',
                oilcard     :   '',
                coname      :   '',
                bdcmoney    :   '',
                mobile      :   '',
                num         :   '',
                isok        :   false,
                phonecharges:[
                    {
                        money   :   '50'
                    },
                    {
                        money   :   '100'
                    },
                    {
                        money   :   '200'
                    },
                    {
                        money   :   '300'
                    },
                    {
                        money   :   '500'
                    },
                    {
                        money   :   '1000'
                    },
                ],
                gprs        :[
                    {
                        value   :   '100M',
                        money   :   '10'
                    },
                    {
                        value   :   '200M',
                        money   :   '15'
                    },
                    {
                        value   :   '300M',
                        money   :   '20'
                    },
                    {
                        value   :   '500M',
                        money   :   '30'
                    },
                    {
                        value   :   '1G',
                        money   :   '50'
                    },
                    {
                        value   :   '2G',
                        money   :   '80'
                    }
                ]   
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
                this.current = 0;
                if(type==1){
                    this.RMB     = this.phonecharges[0].money/this.bdc;
                }else if(type==2){
                    this.RMB     = this.gprs[0].money/this.bdc;
                }
            },
            act(index,money){
                this.current = index;
                this.RMB     = money/this.bdc;
                this.Remakes = (this.type==2)?this.gprs[index].value:'';
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
            // 获取详情
            // 获取价格 GetCurrencyPrice
            this.$server.post(
			'GetCurrencyPrice',
			{
                guid 	:  this.$storage.get('guid'),
                Count   :  0
			},
			).then(data => {
				if(data){
                    this.bdc =  data[0].Money;
                    this.RMB     = this.phonecharges[0].money/this.bdc;
				}
            })
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/recharge";
</style>