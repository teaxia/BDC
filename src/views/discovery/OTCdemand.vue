<template>
	<div class="mycard margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" title="求购"></x-header>
        <div class="pd50">
            <div class="currency">
                <svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(cName)>=0">
                    <use :xlink:href="`#icon-`+cName"></use>
                </svg>
                <Avatar v-else class="sicon avatar" style="background:#f56a00;">
                    <span class="line-height">{{cName}}</span>
                </Avatar>
                <div class="font">
                    {{cName}}
                </div>
                <div class="price">
                    {{$t('discovery.OTC.sell.reference')}}：{{ConsultPirce}}
                </div>
            </div>
            <div class="enterfrom">
                <div class="line-b sbank">
                    <div class="title wd">
                        {{$t('discovery.OTC.sell.selectCurreny')}}
                    </div>
                    <Select v-model="currency">
                        <Option v-for="(v,index) in BDClist" :value="index" :key="v.Key">{{ v.Key }}</Option>
                    </Select>
                </div>
                <group>
                    <x-input class="test" type="number" title="货币数量" required placeholder="求购数量" v-model="num">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" :title="$t('discovery.OTC.sell.price')" required placeholder="求购单价" v-model="price">
                    </x-input>
                </group>
                <group>
                    <div class="weui-cells vux-no-group-title">
                        <div class="vux-x-input weui-cell test">
                            <div class="weui-cell__hd">
                                <label for="vux-x-input-48lhl" class="weui-label" style="width: 4em;">{{$t('discovery.OTC.sell.sale')}}</label>
                            </div>
                            <div class="weui-cell__bd weui-cell__primary">
                                <i-switch size="large" v-model="isSellOn">
                                    <span slot="open">{{$t('discovery.OTC.sell.up')}}</span>
                                    <span slot="close">{{$t('discovery.OTC.sell.down')}}</span>
                                </i-switch>
                            </div>
                        </div>
                    </div>
                </group>
            </div>
            <div class="select-pay">
                <i @click="sbankd(1)" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':alipay}"></i>
                <i @click="sbankd(2)" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':cardpay}"></i>
                <i @click="sbankd(0)" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':wechart}"></i>
            </div>
            <button @click="doSubmit()" class="btn btn-block btn-default btn-round">{{ $t("global.submit") }}</button>
        </div>
    </div>
</template>

<script>
import { GetAccount } from '../../common/mixins/getaccount'
import pattern from '../../common/utils/pattern'
export default {
    name: 'otcsell',
    mixins:[GetAccount],
	data() {
		return {
            num         :  '',                        // 发布数量
            password    :  '',                        // 安全码
            currency    :  0,                         // 选择的币种
            show        :  false,         		      // 跳转至强制认证界面
            alipay      :  false,                     // 支付宝
            cardpay     :  false,                     // 银行卡
            wechart     :  false,                     // 微信支付
            price       :  '',                        // 单价
            ConsultPirce:   '',
            BDClist     :    [],                      // 币种以及参考价
            cName       :  '',                        // 币种名称
            isSellOn    :   true,                     // 是否立即上架
		}
	},
	methods: {
		doSubmit(){
            // 判断不为空
            if(this.num==''||!pattern["Pattern.RealNo"].test(this.num)){
                // 判断数量
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.num'),
                    type: 'warn'
                })
                return;
            }
            if(this.cName==''){
                // 判断选择币种
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.cName'),
                    type: 'warn'
                })
                return;
            }
            if(this.price==''){
                // 判断单价
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.price'),
                    type: 'warn'
                })
                return;
            }
            if(!this.alipay&&!this.cardpay&&!this.wechart){
                // 判断是否有支付方式
                this.$vux.toast.show({
                    text: '必须选择一种付款方式',
                    type: 'warn'
                })
                return;
            }
            this.$server.post(
            'OTC_BuyGoods',{
                guid 	    :   this.$storage.get('guid'),
                currenyName :   this.cName,
                currenyNum  :   this.num,
                price       :   this.price,
                isSellOn    :   this.isSellOn,
                supportZFB  :   this.alipay,
                supportWX   :   this.wechart,
                supportCard :   this.cardpay
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    // 清空数据
                    this.num = ''
                }
            })
            
        },
        cancel () {
            this.modal = false;
        },
        goauth () {
            this.$router.push({
                path:"/mine/myhome",
            });
        },
        OTCGetCurrenyPrice(){
            // 获取可交易货币名称及参考价格
            this.$server.post(
            'OTC_GetCurrenyPrice',
            {
                guid : this.$storage.get('guid')
            }).then(data => {
                if(data){
                    this.BDClist  = data
                    this.cName    = data[0].Key
                    this.ConsultPirce   =   data[0].Value
                    this.price          =   this.ConsultPirce
                }
            })
        },
        sbankd(type){
            let _this = this
            switch (type) {
                case 1:
                    this.alipay = !this.alipay
                    this.$vux.toast.show({
                        text        :   (_this.alipay)?'支持支付宝付款':'关闭支付宝付款支持',
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                case 0:
                    this.wechart = !this.wechart
                    this.$vux.toast.show({
                        text        :   (_this.wechart)?'支持微信付款':'关闭微信付款支持',
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                case 2:
                    this.cardpay = !this.cardpay    
                    this.$vux.toast.show({
                        text        :   (_this.cardpay)?'支持银行卡付款支持':'关闭银行卡付款支持',
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                
            }
        },
    },
    watch:{
        currency(){
            this.ConsultPirce =     this.BDClist[this.currency].Value
            this.cName        =     this.BDClist[this.currency].Key
        }
    },
	mounted() {
        // 更新个人中心资料
        this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }
        // 默认币种参考价
        this.OTCGetCurrenyPrice()
    }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otcsell";
</style>