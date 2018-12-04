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
            <group>
                <x-input class="tel" :title="$t('user.securitypsw')" v-model="MoneyPwd" :placeholder="$t('wallet.tips.inputcode')" keyboard="number" type="password"></x-input>
            </group>
        </div>
        <div class="main-container">
            <div v-if="type==1" class="secrechar">
                <div v-for="(v,index) in phonecharges" @click="act(index,v.money,v.status)" :key="index" :class="{'sel_div':true,'current':current==index}">
                    <div>{{v.money}}CNY</div>
                    <div>{{$t('discovery.recharge.price')}}：{{v.money/bdc}} BDC</div>
                    <i v-if="current==index" class="iconfont icon-xuanze"></i>
                </div>
            </div>
            <div v-if="type==2" class="secrechar">
                <div v-for="(v,index) in gprs" @click="act(index,v.money)" :key="index" :class="{'sel_div':true,'current':current==index}">
                    <div>{{v.value}}</div>
                    <div>{{$t('discovery.recharge.price')}}：{{v.money/bdc}} BDC</div>
                    <i v-if="current==index" class="iconfont icon-xuanze"></i>
                </div>
            </div>
            <div v-if="type==3">
                <div class="mr30">
                    <div>
                        <div class="">
                            <div class="vux-x-input weui-cell tel">
                                <div class="weui-cell__hd">
                                    <label for="vux-x-input-m2pna" class="weui-label" style="width: 4.5em;">{{$t('input.coname')}}</label> 
                                </div>
                                <div class="wd100">
                                    <Select v-model="coname" filterable>
                                        <Option v-for="item in company" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <group>
                        <x-input class="tel" :title="$t('input.mobile')+':'" mask="999 9999 9999" :max="13" v-model="mobile" :placeholder="$t('input.tips.mobile')" keyboard="number"></x-input>
                    </group>
                    <group>
                        <x-input class="tel" :title="$t('input.oilcard')+':'" v-model="oilcard" :placeholder="$t('input.tips.oilcard')" keyboard="number"></x-input>
                    </group>
                    <group>
                        <x-input class="tel" :title="$t('user.securitypsw')+':'" v-model="MoneyPwd" :placeholder="$t('wallet.tips.inputcode')" keyboard="number" type="password"></x-input>
                    </group>
                    <!-- <group>
                        <x-input class="tel" :title="$t('input.recharge')+':'" v-model="num" :placeholder="$t('input.tips.recharge')" keyboard="number"></x-input>
                    </group> -->
                    <div>
                        <div class="secrechar">
                            <div v-for="(v,index) in oil" @click="act(index,v.money,v.status)" :key="index" :class="{'sel_div':true,'current':current==index}">
                                <div>{{v.money}}CNY</div>
                                <div>{{$t('discovery.recharge.price')}}：{{v.money/bdc}} BDC</div>
                                <i v-if="current==index" class="iconfont icon-xuanze"></i>
                            </div>
                        </div>
                    </div>
                    <!-- <group>
                        <x-input class="tel" :title="$t('input.bdc')+':'" readonly v-model="bdcmoney"></x-input>
                    </group> -->
                </div>
            </div>
            <button @click="subconfirm()" class="btn btn-block btn-round mr40">{{$t('discovery.cash.buy')}}</button>
            <!-- <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('discovery.cash.buy')}}</button>  -->
        </div>
        <Modal v-model="modal" @on-ok="ok" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
            <div v-if="type<=2">
                <!-- 电话卡，流量充值 -->
                <div>
                    <span v-if="type==1">{{$t('discovery.recharge.group')}}：{{$t('discovery.recharge.type.phone')}}</span>
                    <span v-if="type==2">{{$t('discovery.recharge.group')}}：{{$t('discovery.recharge.type.gprs')}}</span>
                </div>
                <div>{{$t('input.mobile')}}:{{this.mobile}}</div>
                <div>{{$t('discovery.recharge.price')}}:{{this.RMB}}（BDC）</div>
                <div>{{$t('discovery.recharge.title')}}:{{this.Remakes}}</div>
            </div>
            <div v-else>
                <!-- 油卡充值 -->
                <div><span>{{$t('discovery.recharge.type.oilcards')}}</span></div>
                <div>{{$t('input.coname')}}:{{this.coname}}</div>
                <div>{{$t('input.mobile')}}:{{this.mobile}}</div>
                <div>{{$t('input.tips.oilcard')}}:{{this.oilcard}}</div>
                <div>{{$t('discovery.recharge.money')}}:{{this.num}}</div>
                <div>{{$t('discovery.recharge.price')}}:{{this.RMB}}（BDC）</div>
            </div>
        </Modal>
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
                info        :   '',
                isok        :   false,
                modal       :   false,
                confirminfo :   '',
                MoneyPwd    :   '',                 // 安全码
                company     :   [
                    {
                        name    :   '中国石油',
                        status  :   true
                    },
                    {
                        name    :   '中国石化',
                        status  :   true
                    },
                ],
                phonecharges:[
                    {
                        money   :   '50',
                        status  :   true
                    },
                    {
                        money   :   '100',
                        status  :   true
                    },
                    {
                        money   :   '200',
                        status  :   true
                    },
                    {
                        money   :   '300',
                        status  :   true
                    },
                    {
                        money   :   '500',
                        status  :   false
                    },
                    {
                        money   :   '1000',
                        status  :   false
                    },
                ],
                oil:[
                    {
                        money   :   '100',
                        status  :   true
                    },
                    {
                        money   :   '200',
                        status  :   true
                    },
                    {
                        money   :   '500',
                        status  :   true
                    },
                    {
                        money   :   '1000',
                        status  :   true
                    },
                ],
                gprs        :[
                    {
                        value   :   '100M',
                        money   :   '10',
                        status  :   true
                    },
                    {
                        value   :   '200M',
                        money   :   '15',
                        status  :   true
                    },
                    {
                        value   :   '300M',
                        money   :   '20',
                        status  :   true
                    },
                    {
                        value   :   '500M',
                        money   :   '30',
                        status  :   true
                    },
                    {
                        value   :   '1G',
                        money   :   '50',
                        status  :   true
                    },
                    {
                        value   :   '2G',
                        money   :   '80',
                        status  :   true
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
                    this.Remakes = this.phonecharges[0].money+'CNY';
                }else if(type==2){
                    this.RMB     = this.gprs[0].money/this.bdc;
                    this.Remakes = this.gprs[0].value;
                }else if(type==3){
                    this.RMB     = this.oil[0].money/this.bdc;
                    this.num     = this.oil[0].money+'CNY'
                }
            },
            act(index,money,status=true){
                if(status){
                    this.current = index;
                    this.RMB     = money/this.bdc;
                    if(this.type==1){
                        this.Remakes = this.phonecharges[index].money+'CNY'
                    }else if(this.type==2){
                        this.Remakes = this.gprs[index].value
                    }else if(this.type==3){
                        this.num  = this.oil[index].money+'CNY'
                    }
                }
                
            },
            subconfirm(){
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
                        // this.RMB        = this.num/this.bdc;
                        this.Remakes    = '公司 :'+this.coname+' 油卡号 :'+this.oilcard;
                        // if(this.num<'1'){
                        //     this.$vux.toast.show({
                        //         text: this.$t('discovery.recharge.error.num'),
                        //         type: 'warn'
                        //     })
                        //     return ;
                        // }
                        if(this.coname==''||this.mobile==''||this.oilcard==''){
                            this.$vux.toast.show({
                                text: this.$t('discovery.recharge.error.full'),
                                type: 'warn'
                            })
                            return ;
                        }
                    break;
                }
                this.modal = true;
            },
            confirm(){
                this.mobile = this.mobile.replace(/\s+/g,"")
                if(this.mobile==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.recharge.error.mobile'),
                        type: 'warn'
                    })
                    return;
                }
            },
            submit(){
                // 获取详情
                if(this.isok){
                    return;
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
                    MoneyPwd        :   this.MoneyPwd,                        // 安全码
                }).then(data => { 
                    if(data){
                        this.$vux.toast.show({
                            text: this.$t('global.wait'),
                            type: 'success'
                        })
                        this.isok = false;
                    }
                })
            },
            ok () {
                this.submit();
            },
            cancel () {
                this.modal = false;
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
                    this.bdc     =  data[0].Money;
                    this.RMB     =  this.phonecharges[0].money/this.bdc;
                    this.Remakes =  this.phonecharges[0].money+"CNY"
				}
            })
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/recharge";
</style>