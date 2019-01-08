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
        
        <div class="main-container">
            <div v-if="type==1||type==2">
                <group>
                    <x-input class="tel" :title="$t('input.mobile')" mask="999 9999 9999" :max="13" v-model="mobile" :placeholder="$t('input.tips.mobile')" keyboard="number" is-type="china-mobile"></x-input>
                </group>
                <group>
                    <x-input class="tel" :title="$t('user.securitypsw')" v-model="MoneyPwd" :placeholder="$t('wallet.tips.inputcode')" keyboard="number" type="password"></x-input>
                </group>
            </div>
            <div v-if="type==1" class="secrechar">
                <div v-for="(v,index) in phonecharges" @click="act(index,v.money,v.status,HFOff)" :key="index" :class="{'sel_div':true,'current':current==index,'isoff':v.off}">
                    <div>{{v.money}}CNY</div>
                    <div>
                        <div>
                            <span>{{$t('discovery.recharge.price')}}：</span>
                            <span>{{((v.money/bdc)*HFOff).toFixed(8)}}<br/>BDC</span> 
                            <!-- <span :class="v.off?'del':''">{{(v.money/bdc)*HFOff}}BDC</span>  -->
                        </div>
                        <!-- <div v-if="HFOff" class="off">
                            {{$t('discovery.recharge.discount')}}：
                            <span v-if="HFOff">{{(v.money/bdc)*HFOff}}BDC</span>
                        </div>  -->
                    </div>
                    <i v-if="current==index" class="iconfont icon-xuanze"></i>
                </div>
            </div>
            <div v-if="type==2" class="secrechar">
                <div v-for="(v,index) in gprs" @click="act(index,v.money,true,LLOff)" :key="index" :class="{'sel_div':true,'current':current==index,'isoff':v.off}">
                    <div>{{v.value}}</div>
                    <div>
                        <div>
                            <span>{{$t('discovery.recharge.price')}}：</span>
                            <!-- <span :class="v.off?'del':''">{{v.money/bdc}}BDC</span> -->
                            <span>{{((v.money/bdc)*LLOff).toFixed(8)}}<br/>BDC</span> 
                        </div>
                        <!-- <div v-if="v.off" class="off">
                            {{$t('discovery.recharge.discount')}}：
                            <span v-if="v.off">{{(v.money/bdc)*v.off}}BDC</span>
                        </div>  -->
                    </div>
                    <i v-if="current==index" class="iconfont icon-xuanze"></i>
                </div>
            </div>
            <div v-if="type==3">
                <div>
                    <div class="">
                        <div class="vux-x-input weui-cell tel">
                            <div class="weui-cell__hd">
                                <label for="vux-x-input-m2pna" class="weui-label" style="width: 4.5em;">{{$t('input.coname')}}</label> 
                            </div>
                            <div class="wd100">
                                <!-- <Select v-model="coname" filterable>
                                    <Option v-for="item in company" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                </Select> -->
                                <!-- 切换为自定义下拉输入控件 -->
                                <vselect v-model='coname' ref="sect" :Arr="company" :placeholder="$t('input.coname')"></vselect>
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
                
                <div class="secrechar">
                    <div v-for="(v,index) in oil" @click="act(index,v.money,v.status,YKOff)" :key="index" :class="{'sel_div':true,'current':current==index,'isoff':v.off}">
                        <div>{{v.money}}CNY</div>
                        <div>{{$t('discovery.recharge.price')}}：{{((v.money/bdc)*YKOff).toFixed(8)}} <br/>BDC</div>
                        <i v-if="current==index" class="iconfont icon-xuanze"></i>
                    </div>
                </div>
                
                <!-- <group>
                    <x-input class="tel" :title="$t('input.bdc')+':'" readonly v-model="bdcmoney"></x-input>
                </group> -->
                
            </div>
            <!-- <div class="off" v-if="type==1||type==2">{{$t('global.off')}}50%</div> -->
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
                <!-- <div :class="{'del':offprice}">{{$t('discovery.recharge.price')}}:{{this.RMB}}（BDC）</div> -->
                <div v-if="type==1">{{$t('discovery.recharge.price')}}:{{(this.RMB*this.HFOff).toFixed(8)}}（BDC）</div>
                <div v-if="type==2">{{$t('discovery.recharge.price')}}:{{(this.RMB*this.LLOff).toFixed(8)}}（BDC）</div>
                <!-- <div v-if="offprice" class="off">{{$t('discovery.recharge.discount')}}:{{this.offprice}}（BDC）</div> -->
                <div>{{$t('discovery.recharge.title')}}:{{this.Remakes}}</div>
            </div>
            <div v-else>
                <!-- 油卡充值 -->
                <div><span>{{$t('discovery.recharge.type.oilcards')}}</span></div>
                <div>{{$t('input.coname')}}:{{this.coname}}</div>
                <div>{{$t('input.mobile')}}:{{this.mobile}}</div>
                <div>{{$t('input.tips.oilcard')}}:{{this.oilcard}}</div>
                <div>{{$t('discovery.recharge.money')}}:{{this.num}}</div>
                <div>{{$t('discovery.recharge.price')}}:{{(this.RMB*this.YKOff).toFixed(8)}}（BDC）</div>
            </div>
        </Modal>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
        <Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="goauth()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
    </div>
</template>

<script>
    import { GetAccount } from '../../common/mixins/getaccount'; 
    import pattern from '../../common/utils/pattern'
	export default {
        name:'recharge',
        mixins:[GetAccount],
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
                offprice    :   '',                 // 确定时用到的折扣
                show        :	false,				// 跳转至强制认证界面
                realname    :   '',
                HFOff       :   '',                 // 话费折扣
                LLOff       :   '',                 // 流量折扣
                YKOff       :   '',                 // 油卡折扣
                // company     :   [
                //     {
                //         name    :   this.$t('discovery.recharge.petrochina'),
                //         status  :   true
                //     },
                //     {
                //         name    :   this.$t('discovery.recharge.sinopec'),
                //         status  :   true
                //     },
                // ],
                company     :   [this.$t('discovery.recharge.petrochina'),this.$t('discovery.recharge.sinopec')],
                // off折扣规则 如果该值不为false，则直接*价格
                phonecharges:[
                    {
                        money   :   '50',
                        status  :   true,
                        off     :   0.5,            
                    },
                    {
                        money   :   '100',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        money   :   '200',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        money   :   '300',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        money   :   '500',
                        status  :   false,
                        off     :   0.5,
                    },
                    {
                        money   :   '1000',
                        status  :   false,
                        off     :   0.5,
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
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        value   :   '200M',
                        money   :   '15',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        value   :   '300M',
                        money   :   '20',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        value   :   '500M',
                        money   :   '30',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        value   :   '1G',
                        money   :   '50',
                        status  :   true,
                        off     :   0.5,
                    },
                    {
                        value   :   '2G',
                        money   :   '80',
                        status  :   true,
                        off     :   0.5,
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
            // 充值类型切换
            active(type){
                this.type  = type;
                this.current = 0;
                if(type==1){
                    this.RMB     = this.phonecharges[0].money/this.bdc;
                    this.Remakes = this.phonecharges[0].money+'CNY|'+this.phonecharges[0].money;
                }else if(type==2){
                    this.RMB     = this.gprs[0].money/this.bdc;
                    this.Remakes = this.gprs[0].value+'|'+this.gprs[0].money;
                }else if(type==3){
                    this.RMB     = this.oil[0].money/this.bdc;
                    this.num     = this.oil[0].money
                }
            },
            // 充值金额选择
            act(index,money,status=true,off=false){
                if(status){
                    this.current = index;
                    this.RMB     = money/this.bdc;
                    // 如果有折，则显示折扣金额
                    if(off){
                        this.offprice   =  (money/this.bdc)*off
                    }
                    if(this.type==1){
                        this.Remakes = this.phonecharges[index].money+'CNY|'+this.phonecharges[index].money
                    }else if(this.type==2){
                        this.Remakes = this.gprs[index].value+'|'+this.gprs[index].money
                    }else if(this.type==3){
                        this.num  = this.oil[index].money
                    }
                }
                
            },
            subconfirm(){
                if(!pattern["Pattern.Cellphone"].test(this.mobile)){
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
                        this.coname = this.$refs.sect.value
                        this.class      = '油卡充值'
                        this.Remakes    = '公司 :'+this.$refs.sect.value+' 油卡号 :'+this.oilcard+' |'+this.num
                        if(this.$refs.sect.value==''||this.mobile==''||this.oilcard==''){
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
                        this.mobile = ''
                        this.MoneyPwd = ''
                    }
                })
            },
            ok () {
                this.submit();
            },
            cancel () {
                this.modal = false;
            },
            goauth () { 
                this.$router.push({
                    path:"/mine/myhome",
                });
            },
            GetRechargeOff(){
                // 获取价格折扣，有可能比原来的高
                this.$server.post(
                'GetRechargeOff',
                {
                    guid 	:  this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.HFOff = data.HF
                        this.LLOff = data.LL
                        this.YKOff = data.YK
                    }
                })
            }
		},
		mounted() {
            // 更新个人中心资料
            this.GetAccount();
            this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
			if(this.realname==this.$t('global.Uncertified')){
				this.show = true;
			}
            // 获取详情
            // 获取价格 GetCurrencyPrice
            this.$server.post(
			'GetCurrencyPrice',
			{
                guid 	:  this.$storage.get('guid'),
                Count   :  0
			}).then(data => {
				if(data){
                    this.bdc     =  data[0].Money;
                    this.RMB     =  this.phonecharges[0].money/this.bdc;
                    this.Remakes =  this.phonecharges[0].money+"CNY|"+this.phonecharges[0].money
                    this.offprice   =  (this.phonecharges[0].money/this.bdc)*0.5
				}
            })
            // 获取折扣信息
            this.GetRechargeOff()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/recharge";
</style>