<template>
	<div class="otcbuy margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.buy.goods.bybuy')"></x-header>
        <div class="pd50"  v-if="datalist">
            <div class="information">
                <div class="left">
                    <h1>{{$t('discovery.OTC.buy.goods.sellBuy')}}{{datalist.currenyName}}</h1>
                    <div class="price">
                        <div>{{$t('discovery.OTC.buy.price')}}：{{$numberComma(datalist.price)}} CNY</div>
                        <div>{{$t('discovery.OTC.buy.num')}}：{{$numberComma(datalist.currenyNum)}} （{{datalist.currenyName}}）</div>
                        <div>{{$t('OTC.buy.limit')}}：{{$numberComma(datalist.canBuy)}}</div>
                    </div>
                    <div v-if="Poundage>0">
                        <div class="tax">
                            {{$t('discovery.OTC.sell.tax')}}：{{Poundage}}% 
                        </div>
                        <div class="tax">
                            {{$t('discovery.OTC.sell.deduction')}} ：{{$numberComma(amount)}}BDC
                        </div>
                        <div class="tax">
                            {{$t('discovery.OTC.sell.total')}} ：{{$numberComma((datalist.price*datalist.currenyNum).toFixed(2))}}CNY
                        </div>
                    </div>
                    <div class="payment">
                        <i v-if="alipayPaymeny" @click="sbankd(1)" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':alipay}"></i>
                        <i v-if="cardPaymeny" @click="sbankd(2)" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':cardpay}"></i>
                        <i v-if="wechartPaymeny" @click="sbankd(0)" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':wechart}"></i>
                    </div>
                </div>
                <div class="right">
                    <div class="mr">
                        <svg class="sicon" aria-hidden="true">
                            <use :xlink:href="`#icon-`+datalist.currenyName"></use>
                        </svg>
                    </div>
                    <div class="tradeinfo">
                        {{datalist.tradeInfo}}
                    </div>
                </div>
            </div>
            <div class="mr50 gobuy">
                <group>
                    <x-input class="test" type="text" :title="$t('OTC.buy.num')" :show-clear="false" v-model="buyNum">
                        <div slot="right" style="font-size:0.35rem;">{{datalist.currenyName}}</div>
                    </x-input>
                </group>
                <group>
                    <x-textarea class="textarea" v-model="remark" :max="200" :show-counter="true" :placeholder="$t('discovery.OTC.buy.remark')"></x-textarea>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{$t('discovery.OTC.buy.goods.Isell')}}</button>
            <center>
                <i-circle :percent="percent" class="close">
                    <div style="font-size:24px">{{ T }}s</div>
                    <div>{{$t('discovery.OTC.buy.close')}}</div>
                </i-circle>
            </center>
        </div>
        <div>
            <vpopup :leftText="$t('discovery.OTC.sell.close')" :titleText="$t('discovery.OTC.sell.payment')" :rightText="$t('global.ok')" @onLeftText="cancelPupop(PayType)" @onRightText="okPupop(PayType)" v-model="showPupop">
                <div slot="list">
                    <div v-if="PayType==0" class="selectbox">
                        <!-- 微信二维码-昵称-时间 -->
                        <RadioGroup v-model="wechartId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='微信'" class="radio-lable">
                                <div class="cell" @click="pierce('wechart',v.Id)">
                                    <div>{{v.thirdNickName}}</div>
                                    <div>{{v.CreateTime}}</div>
                                </div>
                            </Radio>
                            <div v-if="!PayNum" class="bind">
                                <router-link to="/mine/wechart">
                                    {{$t('discovery.OTC.sell.bindwechart')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                    <div v-if="PayType==1" class="selectbox">
                        <!-- 支付宝-昵称-时间 -->
                        <RadioGroup v-model="alipayId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='支付宝'" class="radio-lable">
                                <div class="cell" @click="pierce('alipay',v.Id)">
                                    <div>{{v.thirdAccountName}}</div>
                                    <div>{{v.thirdNickName}}</div>
                                </div>
                            </Radio>
                            <div v-if="!PayNum" class="bind">
                                <router-link to="/mine/alipay">
                                    {{$t('discovery.OTC.sell.bindalipay')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                    <div v-if="PayType==2" class="selectbox">
                        <!-- 银联 -->
                        <RadioGroup v-model="bankId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in cardinfo" v-if="v.bankName" :key="index" class="radio-lable">
                                <div class="cell" @click="pierce('cardpay',v.Id)">
                                    <div class="text">{{v.bankName}}</div>
                                    <div class="text">{{v.cardNo}}</div>
                                </div>
                            </Radio>
                            <div v-if="!cardinfo" class="bind">
                                <router-link to="/mine/mycard">
                                    {{$t('discovery.OTC.sell.bindcard')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </vpopup>
        </div>
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
import { GetAccount } from '../../common/mixins/getaccount'         // 获取认证信息
import { BindPayment } from '../../common/mixins/BindPayment'       // 获取绑定银行卡信息
export default {
    name: 'OTCbuy',
    mixins:[GetAccount,BindPayment],
	data() {
		return {
            datalist                :   [],                     // 所有数据
            show                    :   false,            	    // 跳转至强制认证界面
            id                      :   '',                     // 获取订单ID
            percent                 :   0,                      // 百分比   
            clock                   :   '',                     // 倒计时
            T                       :   60,                     // 秒
            type                    :   '',                     // 1是通过CNY计算BDC 2是通过BDC计算CNY
            remark                  :   '',                     // 备注留言
            cardPaymeny             :   false,
            alipayPaymeny           :   false,
            wechartPaymeny          :   false,
            Poundage                :   '',                       // 手续费
            Key                     :   '',
            amount                  :   0,                       // 实际到账
            num                     :   '',                      // 售卖数量
            editCount               :   '',                      // 编辑次数
            buyNum                  :   '',
		}
	},
	methods: {
        OTCLookBuyGoods(){
            // 请求数据
            this.$server.post(
            'OTC_LookBuyGoods',{
                guid 	    :   this.$storage.get('guid'),
                Id          :   this.id
            }).then(data => {
                if(data){
                    this.$nextTick(()=>{
                        this.datalist          =   data
                        this.num               =   data.currenyNum
                        this.buyNum            =   data.currenyNum
                        this.wechartPaymeny    =   (data.payInfo.indexOf('微')>=0)?true:false;
                        this.alipayPaymeny     =   (data.payInfo.indexOf('支')>=0)?true:false;
                        this.cardPaymeny       =   (data.payInfo.indexOf('银')>=0)?true:false; 
                        this.editCount         =   data.editCount
                    })
                }
            })
        },
        mathPercent(){
            let i = 1
            let Tmp = this.T
            this.clock = window.setInterval(() => {
                this.T--;
                i++;
                if (this.T<=0) {
                    this.$router.push({
                        path:"/OTC/OTCSellBuy",
                    });
                    window.clearInterval(this.clock)
                }
                this.percent =  i/Tmp*100
            },1000)
        },
        doSubmit(){
            if(this.CNum==''||this.CNum<this.datalist.minBuy){
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.input.minNum')+this.datalist.minBuy+this.datalist.currenyName,
                    type: 'warn'
                })
                return;
            }
            if(parseFloat(this.buyNum)>parseFloat(this.num)){
                this.$vux.toast.show({
                    text: '出售数量不能大于数量',
                    type: 'warn'
                })
                return;
            }
            if(this.buyNum==''){
                this.$vux.toast.show({
                    text: $t('OTC.buy.tips.sellnum'),
                    type: 'warn'
                })
                return;
            }
            this.$server.post( 
            'OTC_GoodsSell_TJ',{
                guid 	    :   this.$storage.get('guid'),
                Id          :   this.id,
                Remark      :   this.remark,
                zfbInfoId   :   (this.alipayId)?this.alipayId:0,
                wxInfoId    :   (this.wechartId)?this.wechartId:0,
                cardInfoId  :   (this.bankId)?this.bankId:0,
                key         :   this.Key,
                editCount   :   this.editCount,
                buyNum      :   this.buyNum

            }).then(data => {
                if(data){
                    this.$router.push({
                        path:"/OTC/MyOrderNow",
                    });
                }
            })
        },
        goauth(){
            this.$router.push({
                path:"/mine/myhome",
            });
        },
        GetPoundage(){
            this.$server.post(
            'OTC_GetPoundage_OTC',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.Poundage   =   (data.Poundage*100).toFixed(2)
                    this.Key        =   data.key
                    let i           =   this.$math.add(1,data.Poundage).toFixed(2)
                    this.amount     =   (this.num*i).toFixed(8)
                }
            })
        }
    },
    watch:{
        num(){
            // 计算手续费
            let i    =   this.$math.add(1,(this.Poundage/100).toFixed(2))
            this.amount     =   (this.num*i).toFixed(2)
        }    
    },
	mounted() {
        // 更新个人中心资料
        this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }
        // 请求数据
        this.id     =   this.$route.query.id
        this.OTCLookBuyGoods()
        this.mathPercent()
        this.GetPoundage()
    },
	beforeDestroy(){
        // 清除计时器
        window.clearInterval(this.clock);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otcbuy";
</style>