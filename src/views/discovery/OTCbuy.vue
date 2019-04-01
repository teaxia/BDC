<template>
	<div class="otcbuy" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" title="购买BDC"></x-header>
        <div class="pd50"  v-if="datalist">
            <div class="information">
                <div class="left">
                    <h1>购买{{datalist.currenyName}}</h1>
                    <div class="price">
                        <div>单价：{{datalist.price}} CNY</div>
                        <div>数量：{{datalist.currenyNum}} （{{datalist.currenyName}}）</div>
                    </div>
                    <div class="payment">
                        <i :class="{'iconfont':true,'icon-zhifubao':true,'alipay':true}" v-if="alipay"></i>
                        <i :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':true}" v-if="card"></i>
                        <i :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':true}" v-if="wechart"></i>
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
                    <x-input class="test" :show-clear="false" type="text" @on-focus="setCNum" v-model="buyNum" :placeholder="'最低购买'+(datalist.minBuy*datalist.price).toFixed(2)">
                        <div slot="right-full-height" class="right-btn"><span class="unit">CNY</span><span class="cut">|</span><span class="full" @click="fullBuy()">全部购买</span></div>
                    </x-input>
                </group>
                <group>
                    <x-input class="test" :show-clear="false" @on-focus="setBuyNum" type="text" v-model="CNum">
                        <div slot="right-full-height">{{datalist.currenyName}}</div>
                    </x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
            <div class="close">
                <i-circle :percent="percent">
                    <div style="font-size:24px">{{ T }}s</div>
                    <div>后关闭订单</div>
                </i-circle>
            </div>
            
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
import { GetAccount } from '../../common/mixins/getaccount'
import { setInterval } from 'timers';
export default {
    name: 'OTCbuy',
    mixins:[GetAccount],
	data() {
		return {
            datalist                :   [],                     // 所有数据
            buyNum                  :   '',                     // 购买数量CNY
            CNum                    :   '',                     // 自定义购买数量
            show                    :   false,            	    // 跳转至强制认证界面
            id                      :   '',                     // 获取订单ID
            alipay                  :   false,                   
            wechart                 :   false,
            card                    :   false,
            percent                 :   0,                      // 百分比   
            clock                   :   '',                     // 倒计时
            T                       :   60,                     // 秒
            type                    :   '',                     // 1是通过CNY计算BDC 2是通过BDC计算CNY
		}
	},
	methods: {
        OTCLookSellOrder(){
            // 请求数据
            this.$server.post(
            'OTC_LookSellOrder',{
                guid 	    :   this.$storage.get('guid'),
                Id          :   this.id
            }).then(data => {
                if(data){
                    console.log(data)
                    this.$nextTick(()=>{
                        this.datalist   =   data
                        this.wechart    =   (data.payInfo.indexOf('微')>=0)?true:false;
                        this.alipay     =   (data.payInfo.indexOf('支')>=0)?true:false;
                        this.card       =   (data.payInfo.indexOf('银')>=0)?true:false;
                        this.CNum        =   data.minBuy
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
                    window.clearInterval(this.clock)
                }
                this.percent =  i/Tmp*100
            },1000)
        },
        fullBuy(){
            // 全部购买
            this.type = 1
            this.buyNum = (this.datalist.currenyNum*this.datalist.price).toFixed(2)
        },
        setCNum(){
            // 通过CNY计算BDC
            this.type = 1
        },
        setBuyNum(){
            // 通过BDC计算CNY
            this.type = 2
        }
    },
    watch:{
        buyNum(){
            // 通过CNY计算BDC
            if(this.type==1){
                if(this.buyNum!=''){
                    // 判断输入值是否大于最大限额
                   (this.buyNum>=this.datalist.currenyNum*this.datalist.price)?this.buyNum = (this.datalist.currenyNum*this.datalist.price).toFixed(2):this.CNum = (this.buyNum/this.datalist.price).toFixed(8);
                }else{
                    this.CNum = ''
                }
            }
        },
        CNum(){
            // 通过BDC计算CNY
            if(this.type==2){
                if(this.CNum!=''){
                    // 判断输入值是否大于最大限额
                    (this.CNum>=this.datalist.currenyNum)?this.CNum = this.datalist.currenyNum:this.buyNum = (this.CNum*this.datalist.price).toFixed(2);
                }else{
                    this.buyNum = ''
                }
            }
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
        this.OTCLookSellOrder()
        this.mathPercent()
    },
	beforeDestroy(){
        // 清除计时器
        window.clearInterval(this.clock);
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otcbuy";
</style>