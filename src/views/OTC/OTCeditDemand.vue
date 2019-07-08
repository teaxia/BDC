<template>
	<div class="OTCSell margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.edit.title')"></x-header>
        <div class="pd50">
            <div class="currency">
                <div class="currency-icon">
                    <svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(cName)>=0">
                        <use :xlink:href="`#icon-`+cName"></use>
                    </svg>
                    <Avatar v-else class="sicon avatar" style="background:#f56a00;">
                        <span class="line-height">{{cName}}</span>
                    </Avatar>
                    <div class="currency-font">
                        {{cName}}
                    </div>
                </div>
                <div class="font">
                    <span class="blue"><b>发布ID：{{id}}</b></span>
                </div>
                <!-- <div class="price">
                    {{$t('discovery.OTC.sell.reference')}}：{{ConsultPirce}}
                </div> -->
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
                    <x-input class="test" type="number" :title="$t('discovery.OTC.demand.num')" :placeholder="$t('discovery.OTC.demand.num')" v-model="num">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" :show-clear="false" :title="$t('discovery.OTC.demand.price')" :placeholder="$t('discovery.OTC.demand.price')" v-model="price">
                        <div slot="right" style="font-size:0.35rem;">CNY</div>
                    </x-input>
                </group>
                <group v-if="showStatus">
                    <div class="weui-cells vux-no-group-title">
                        <div class="vux-x-input weui-cell test">
                            <div class="weui-cell__hd">
                                <label for="vux-x-input-48lhl" class="weui-label" style="width: 4em;">{{$t('discovery.OTC.sell.sale')}}</label>
                            </div>
                            <div class="weui-cell__bd weui-cell__primary">
                                <i-switch size="large" v-model="isSellOn" @on-change="change">
                                    <span slot="open">{{$t('discovery.OTC.sell.up')}}</span>
                                    <span slot="close">{{$t('discovery.OTC.sell.down')}}</span>
                                </i-switch>
                            </div>
                        </div>
                    </div>
                </group>
                <div class="tips">
                    <div v-if="islock&&!Block&&!Ocancel">{{$t('discovery.OTC.edit.islock')}}{{m}}:{{s}}</div>
                    <div v-if="Block||Ocancel">{{$t('discovery.OTC.edit.sellout')}}</div>
                    <div v-if="showStatus">{{$t('discovery.OTC.edit.downdel')}}</div>
                </div>
            </div>
            <div class="select-pay">
                <i @click="sbankd(1)" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':alipay}"></i>
                <i @click="sbankd(2)" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':cardpay}"></i>
                <i @click="sbankd(0)" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':wechart}"></i>
            </div>
            <button v-if="!Block" @click="doSubmit()" :disabled='islock' class="btn btn-block btn-default btn-round">{{$t('discovery.OTC.edit.edit')}}</button>
            <button v-if="!Block" @click="confirm()" :disabled='islock'  class="btn btn-block btn-error btn-round mr20">{{$t('discovery.OTC.edit.del')}}</button>
        </div>
        <Modal v-model="delshow" :closable="false" :mask-closable="false" @on-ok="DelBuyGoods()">
			<div slot="header">{{$t('discovery.OTC.edit.ok')}}</div>
			<div class="modal-body">{{$t('discovery.OTC.edit.delconfirm')}}</div>
		</Modal>
    </div>
</template>

<script>
import pattern from '../../common/utils/pattern'
export default {
    name: 'otcsell',
	data() {
		return {
            num         :  '',                        // 发布数量
            currency    :  0,                         // 选择的币种
            alipay      :  false,                     // 支付宝
            cardpay     :  false,                     // 银行卡
            wechart     :  false,                     // 微信支付
            price       :  '',                        // 单价
            ConsultPirce:   '',
            BDClist     :    [],                      // 币种以及参考价
            cName       :  '',                        // 币种名称
            isSellOn    :   true,                     // 是否立即上架
            id          :   '',                       // 订单ID
            islock      :   false,                    // 订单锁定
            Block       :   false,                    // 订单售罄状态
            Ocancel     :   false,                    // 订单撤销状态
            m           :   '',
            s           :   '',
            clock       :   '',                       // 锁定
            delshow     :   false,                    // 是否确认删除
            Status      :   '',                       // 状态 -1 下架、0上架、-2售罄、2锁定、-3撤销
            showStatus  :   false,                    // -1 下架、0上架 true||-2售罄、2锁定、-3撤销 false
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
            if(!pattern["Pattern.Positive.Integer.Two.Point"].test(this.price)){
                // 判断小数
                this.$vux.toast.show({
                    text: '单价'+this.$t('discovery.OTC.sell.input.num2'),
                    type: 'warn'
                })
                return;
            }
            if(!this.alipay&&!this.cardpay&&!this.wechart){
                // 判断是否有支付方式
                this.$vux.toast.show({
                    text:  this.$t('discovery.OTC.sell.tips.payment'),
                    type: 'warn'
                })
                return;
            }
            this.$server.post(
            'OTC_EditBuyGoods',{
                guid 	    :   this.$storage.get('guid'),
                goodsId     :   this.id,
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
                        text        :   (_this.alipay)?_this.$t('discovery.OTC.tips.salipay'):_this.$t('discovery.OTC.tips.oalipay'),
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                case 0:
                    this.wechart = !this.wechart
                    this.$vux.toast.show({
                        text        :   (_this.wechart)?_this.$t('discovery.OTC.tips.swechart'):_this.$t('discovery.OTC.tips.owechart'),
                        position    :   'default',
                        type        :   'text'
                    })
                break;
                case 2:
                    this.cardpay = !this.cardpay    
                    this.$vux.toast.show({
                        text        :   (_this.cardpay)?_this.$t('discovery.OTC.tips.scard'):_this.$t('discovery.OTC.tips.ocard'),
                        position    :   'default',
                        type        :   'text'
                    })
                break;
            }
        },
        GetMyBuyOrderById(){
            // 获取求购发布详细
            this.$server.post(
            'OTC_GetMyBuyGoodsById',
            {
                guid        :   this.$storage.get('guid'),
                goodsId  :   this.id
            }).then(data => {
                if(data){
                    this.cName  =   data.currenyName
                    this.price  =   data.price
                    this.num    =   data.currenyNum
                    this.m      =   data.djs_m
                    this.s      =   data.djs_s
                    this.alipay =   data.supportZFB
                    this.cardpay=   data.supportCard
                    this.wechart  =   data.supportWX
                    this.Status     =   data.Status
                    if(data.Status==-1){
                        // 下架
                        this.showStatus =   true
                        this.isSellOn   =   false
                    }else if(data.Status==0){
                        // 上架
                        this.showStatus =   true
                        this.isSellOn   =   true
                    }else if(data.Status==-2){
                        // 售罄
                        this.showStatus =   false
                        this.islock    =   true
                        this.Block     =   true
                    }else if(data.Status==2){
                        // 锁定 才有倒计时
                        this.showStatus =   false
                        this.islock    =   true
                        this.getCountDwn()
                    }else if(data.Status==-3){
                        // 撤销
                        this.showStatus =   false
                        this.Ocancel   =   true
                        this.Block     =   true
                    }
                }
            })
        },
        getCountDwn(){
            // 锁单倒计时
            this.clock = setInterval(() =>{
                if( this.m == 0 && this.s == 0 ){
                    // 倒计时结束
                    // this.isSellOn = !this.isSellOn
                    // this.islock = !this.islock
                    // window.clearInterval(this.clock);
                    // this.GetMySellOrderById();
                    this.$router.push({
                        path:"/OTC/MyGoods",
                    });
                }else if( this.m >= 0 ){
                    if( this.s > 0 ){
                        this.s--;
                    }else if( this.s == 0 ){
                        this.m--;
                        this.s = 59;
                    }
                }
            },1000);
        },
        DelBuyGoods(){
            // 删除求购信息
            this.$server.post(
            'OTC_DelBuyGoods',
            {
                guid            :   this.$storage.get('guid'),
                goodsId         :   this.id,
                isTurnOn        :   this.isSellOn
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    this.$router.push({
                        path:"/OTC/MyOrderNow",
                    });
                }else{
                    this.GetMyBuyOrderById()
                }
            })
        },
        change(){
            // 一键上下架开关
            this.$server.post(
            'EditStatusOnOff',{
                guid 	    :   this.$storage.get('guid'),
                isSellOn    :   this.isSellOn,
                goodsId     :   this.id
            }).then(data => {
                if(data){
                    // 上架成功提示
                    this.$vux.toast.show({
                        text: (this.isSellOn)?this.$t('discovery.OTC.order.up')+this.$t('global.success'):this.$t('discovery.OTC.order.down')+this.$t('global.success'),
                        type: 'success'
                    })
                    
                }else{
                    this.isSellOn   =   !this.isSellOn
                }
            })
        },
        confirm(){
            // 是否确认删除
            this.delshow = true
        }
    },
    watch:{
        currency(){
            this.ConsultPirce =     this.BDClist[this.currency].Value
            this.cName        =     this.BDClist[this.currency].Key
        }
    },
	mounted() {
        this.id = this.$route.query.id
        if(this.id==''){
            this.$router.push({
                path:"/OTC/MyGoods",
            });
        }
        this.GetMyBuyOrderById()
        // 默认币种参考价
        this.OTCGetCurrenyPrice()
    },
    beforeDestroy(){
        // 清除计时器
        window.clearInterval(this.clock);
    }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otcsell";
</style>