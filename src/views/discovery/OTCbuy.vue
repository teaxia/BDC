<template>
	<div class="otcbuy" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" title="购买BDC"></x-header>
        <div class="pd50">
            <div class="information">
                <div class="left">
                    <h1>购买BDC</h1>
                    <div class="price">
                        <div>{{max}} CNY</div>
                        <div>最低限额：{{min}} CNY</div>
                    </div>
                    <div class="payment">
                        <i @click="select('alipay')" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':true}"></i>
                        <i @click="select('cardpay')" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':true}"></i>
                        <i @click="select('wechart')" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':true}"></i>
                    </div>
                </div>
                <div class="right">
                    <svg class="sicon" aria-hidden="true">
                        <use :xlink:href="`#icon-BDC`"></use>
                    </svg>
                </div>
            </div>
            <div class="mr50 gobuy">
                <group>
                    <x-input class="test" :show-clear="false" type="text" v-model="buyNum" :placeholder="'最低购买'+max">
                        <div slot="right-full-height" class=""><span>CNY|</span><span>全部购买</span></div>
                    </x-input>
                </group>
                <group>
                    <x-input class="test" :show-clear="false" type="text" v-model="CNum" :placeholder="minprice">
                        <div slot="right-full-height">BDC</div>
                    </x-input>
                </group>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round mr50">{{ $t("global.submit") }}</button>
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
export default {
    name: 'OTCbuy',
    mixins:[GetAccount],
	data() {
		return {
            max                     :   100,                    // 所有币要卖的价格CNY
            min                     :   50,                     // 最低购买数量CNY
            price                   :   '',                     // 一个币的单价（计算出来的）   
            BDCNum                  :   5,                      // 售卖的币种数量
            buyNum                  :   '',                     // 购买数量CNY
            CNum                    :   '',                     // 自定义购买数量
            minprice                :   '',                     // 最低购买的币种数量
            show                    :   false,            	    // 跳转至强制认证界面
		}
	},
	methods: {
        priceMath(){
            // 计算一个币种的单价
            // max(CNY)/BDCNum
            this.price = (this.max/this.BDCNum).toFixed(2)
            this.mathMinPrice()
            console.log(this.price)
        },
		mathMinPrice(){
            // 计算最低购买数量
            // min(CNY)/price(单价)
            this.minprice = (this.min/this.price).toFixed(2)
            console.log(this.minprice)
        }
    },
    watch:{
        buyNum(){
            // 输入CNY转换成币数量
            // 币数量 = CNY/CNY单价
            if(this.buyNum!=''){
                this.CNum = (this.buyNum/this.price).toFixed(8)
            }else{
                this.CNum = ''
            }
            if(this.buyNum>this.max){
                this.buyNum = this.max
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
        // 货币计算
        this.priceMath()
    }
}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otcbuy";
</style>