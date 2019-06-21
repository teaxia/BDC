<template>
	<div class="mycard margin-header" v-cloak>
		<x-header :left-options="{backText:$t('global.back'),preventGoBack:true}" @on-click-back="Goback()" :title="$t('discovery.OTC.edit.title')"></x-header>
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
                    <Select disabled v-model="currency">
                        <Option v-for="(v,index) in BDClist" :value="index" :key="v.Key">{{ v.Key }}</Option>
                    </Select>
                </div>
                <group>
                    <x-input class="test" type="number" disabled :title="$t('discovery.OTC.sell.num')" required :placeholder="$t('discovery.OTC.sell.input.num')" v-model="num">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" :title="$t('discovery.OTC.edit.numed')" disabled v-model="sellNum">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" :title="$t('discovery.OTC.sell.price')" required :placeholder="$t('discovery.OTC.sell.input.price')" v-model="price">
                    </x-input>
                </group>
                <group>
                    <x-input class="test" type="number" :title="$t('discovery.OTC.sell.minNum')" required :placeholder="$t('discovery.OTC.sell.input.minNum')" v-model="minNum">
                    </x-input>
                </group>
                <group v-if="!islock">
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
                <div class="order-payment-list">
					<i @click="pay('alipay')" class="iconfont icon-zhifubao alipay" v-if="alipay.length>1"></i>
					<i @click="pay('cardpay')" class="iconfont icon-yinhangqia cardpay" v-if="card.length>1"></i>
					<i @click="pay('wechart')" class="iconfont icon-weixinzhifu wechart" v-if="wechart.length>1"></i>
				</div>
                <div class="tips">
                    <div v-if="islock&&!Block">{{$t('discovery.OTC.edit.islock')}}{{m}}:{{s}}</div>
                    <div v-if="Block">{{$t('discovery.OTC.edit.sellout')}}</div>
                    <div v-else>{{$t('discovery.OTC.edit.downdel')}}</div>
                </div>
            </div>
            <button @click="doSubmit()" v-if="!Block" :disabled='islock'  class="btn btn-block btn-default btn-round">{{$t('discovery.OTC.edit.edit')}}</button>
            <button @click="confirm()" v-if="!Block" :disabled='islock'  class="btn btn-block btn-error btn-round mr20">{{$t('discovery.OTC.edit.del')}}</button>
        </div>
        <div class="popup">
			<vfpopup :leftText="$t('global.cancel')" :titleText="$t('discovery.OTC.index.curreny')" :rightText="$t('global.ok')" @onLeftText="cancelPupop()" @onRightText="okPupop()" v-model="showFPupop">
                <div slot="list">
                    <div class="pay-info">
						<div v-if="PayType==0" class="ercode">
							<img class="pay-img" :src="alipay[4]">
							<div>
								{{$t('discovery.OTC.order.alipay')}}：{{alipay[2]}}
							</div>
							<div>
								{{$t('discovery.OTC.order.name')}}：{{alipay[3]}}
							</div>
							<button class="btn btn-round btn-min" @click="save(alipay[2])">{{$t('discovery.OTC.order.saveErcode')}}</button>
						</div>
						<div v-if="PayType==2" class="ercode">
							<img class="pay-img" :src="wechart[4]">
							<div>
								{{$t('discovery.OTC.order.nickname')}}：{{wechart[3]}}
							</div>
							<button class="btn btn-round btn-min" @click="save(wechart[4])">{{$t('discovery.OTC.order.saveErcode')}}</button>
						</div>
						<div v-if="PayType==1" class="card padding-bottom">
							<!-- 银行卡 -->
							<div class="font">
								<div class="font-title">{{$t('discovery.OTC.order.bank')}}：</div>{{card[3]}}
							</div>
							<div class="font copy">
								<div class="font-title">{{$t('discovery.OTC.order.cardNumber')}}：</div>
								<div>{{card[2]}}</div>
								<div class="font-btn">
									<button class="btn btn-xs" @click="CopyClip(card[2])">{{$t('discovery.OTC.order.copyCard')}}</button>
								</div>
							</div>
							<div class="font copy">
								<div class="font-title">{{$t('discovery.OTC.order.name')}}：</div>
								<div>{{card[1]}}</div>
								<div class="font-btn">
									<button class="btn btn-xs" @click="CopyClip(card[1])">{{$t('discovery.OTC.order.copyName')}}</button>
								</div>
							</div>
						</div>
					</div>
                </div>
            </vfpopup>
		</div>
        <Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="goauth()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
        <Modal v-model="delshow" :closable="false" :mask-closable="false" @on-ok="delSellOrder()">
			<div slot="header">{{$t('discovery.OTC.edit.ok')}}</div>
			<div class="modal-body">{{$t('discovery.OTC.edit.delconfirm')}}</div>
		</Modal>
    </div>
</template>

<script>
import { GetAccount } from '../../common/mixins/getaccount'
import pattern from '../../common/utils/pattern'
import { clipBoard } from '../../common/mixins/clipBoard'
export default {
    name: 'otcsell',
    mixins:[GetAccount,clipBoard],
	data() {
		return {
            num         :  '',                        // 发布数量
            currency    :  0,                         // 选择的币种
            show        :	 false,         		  // 跳转至强制认证界面
            price       :  '',                        // 单价
            ConsultPirce:   '',
            BDClist     :    [],                      // 币种以及参考价
            cName       :  '',                        // 币种名称
            isSellOn    :   true,                     // 是否立即上架
            PayNum      :   '',                       // 有多少绑定数据
            minNum      :   '',                       // 最低限额
            sellNum     :   '',                       // 已售数量
            SellOrderId :   '',                       // 订单ID
            islock      :   false,                    // 订单锁定
            Block       :   false,                    // 订单为售罄状态
            m           :   '',
            s           :   '',
            clock       :   '',                       // 锁定
            alipay		:	[],		                  // 支付宝
            card 		:	[],		                  // 银行卡
            wechart		:	[],		                  // 微信
            showFPupop	:	false,
            PayType		:	'',	                      // 0支付宝，1银行卡，2微信
            delshow     :   false,                    // 是否确认删除
		}
    },
	methods: {
        GetMySellOrderById(){
            // 获取自售发布详细
            this.$server.post(
            'OTC_GetMySellGoodsById',{
               guid 	    :   this.$storage.get('guid'),
               goodsId      :   this.SellOrderId
            }).then(data => {
                if(data){
                    this.cName  =   data.currenyName
                    this.num    =   data.currenyNum
                    this.price  =   data.price
                    this.minNum =   data.minBuy
                    this.m      =   data.djs_m
                    this.s      =   data.djs_s
                    this.alipay 	= (data.zfb)?data.zfb.split("|"):'';
                    this.wechart 	= (data.wx)?data.wx.split("|"):'';
                    this.card 		= (data.card)?data.card.split("|"):'';
                    this.sellNum    = data.sellNum
                    if(data.Status==-1){
                        this.isSellOn   =   false
                    }else if(data.Status==0){
                        this.isSellOn   =   true
                    }else if(data.Status==-2){
                        this.islock    =   true
                        this.Block     =   true
                    }else{
                        this.islock    =   true
                        this.getCountDwn()
                    }
                    
                }
            })
        },
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
            if(this.price==''){
                // 判断单价
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.price'),
                    type: 'warn'
                })
                return;
            }
            if(this.minNum==''){
                // 判断最低限额
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.minNum'),
                    type: 'warn'
                })
                return;
            }
            
            if(this.password==''){
                // 判断单价
                this.$vux.toast.show({
                    text: this.$t('discovery.OTC.sell.tips.security'),
                    type: 'warn'
                })
                return;
            }
            // 提交发布信息
            this.$server.post(
            'OTC_EditSellGoods',{
                guid 	    :   this.$storage.get('guid'),
                price       :   this.price,
                minBuy      :   this.minNum,
                isSellOn    :   this.isSellOn,
                goodsId     :   this.SellOrderId
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
        getCountDwn(){
            // 付款倒计时
            this.clock = setInterval(() =>{
                if( this.m == 0 && this.s == 0 ){
                    // 倒计时结束
                    this.GetMySellOrderById();
                    this.isSellOn = !this.isSellOn
                    this.islock = !this.islock
                    window.clearInterval(this.clock);
                    
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
                }
            })
        },
        delSellOrder(){
            // 删除订单
            this.$server.post(
            'OTC_DelSellGoods',
            {
                guid            :   this.$storage.get('guid'),
                goodsId         :   this.SellOrderId,
                isTurnOn        :   this.isSellOn
            }).then(data => {
                if(data){
                    this.$vux.toast.show({
                        text: this.$t('global.success'),
                        type: 'success'
                    })
                    this.$router.push({
                        path:"/OTC/list",
                        query:{
                            type	:	0,
                        }
                    });
                }else{
                    this.GetMySellOrderById()
                }
            })
        },
        pay(val){
            switch(val){
                case 'alipay':
                    this.showFPupop = true
                    this.PayType	=	0
                break;
                case 'cardpay':
                    this.showFPupop = true
                    this.PayType	=	1
                break;
                case 'wechart':
                    this.showFPupop = true
                    this.PayType	=	2
                break;
            }
        },
        cancelFPupop(){
            // 取消选择
            this.showFPupop = false
        },
        save(imgUrl){
            // 保存二维码到相册
            let _this = this
            api.saveMediaToAlbum({
                path: imgUrl
            }, function(ret, err) {
                if (ret && ret.status) {
                    _this.$vux.toast.show({
                        text: _this.$t('discovery.OTC.order.picSaveS'),
                        type: 'success'
                    })
                } else {
                    _this.$vux.toast.show({
                        text: _this.$t('discovery.OTC.order.picSaveE'),
                        type: 'wran'
                    })
                }
            });
        },
        Goback(){
            this.$router.push({
                path:"/OTC/list",
                query:{
                    type	:	0,
                }
            });
        },
        change(){
            // 一键上下架开关
            this.$server.post(
            'EditStatusOnOff',{
                guid 	    :   this.$storage.get('guid'),
                isSellOn    :   this.isSellOn,
                goodsId     :   this.SellOrderId
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
	mounted() {
        // 获取售币详细信息
        this.SellOrderId = this.$route.query.id
        this.GetMySellOrderById()
        // 更新个人中心资料
        this.GetAccount();
        this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
        if(this.realname==this.$t('global.Uncertified')){
            this.show = true;
        }

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