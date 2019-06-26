<template>
	<div class="order margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.order.title')"></x-header>
		<div class="pd50">
			<div class="order-id">
				<h1>{{$t('discovery.OTC.order.orderId')}}：#{{OrderId}}</h1>
			</div>
			<div class="order-info order-line">
				<h3 v-if="cType=='buy'">{{nickName}}{{$t('discovery.OTC.order.tome')}}{{$numberComma(num)}} BDC</h3>
				<h3 v-if="cType=='null'||cType=='sell'">{{$t('discovery.OTC.order.your')}}{{nickName}}{{$t('discovery.OTC.order.buy')}}{{$numberComma(num)}} BDC</h3>
			</div>
			<div class="order-pay order-line mr20">
				<div class="order-pay-price">
					{{$t('discovery.OTC.order.price')}}：<span>{{$numberComma(price)}}</span>
				</div>
				<div class="order-pay-total">
					{{$t('discovery.OTC.order.total')}}：<span>{{$numberComma(TotalPay)}}CNY</span>
				</div>
			</div>
			<div class="order-tips mr20 order-line">
				待支付，请于【{{m}}分{{s}}秒】内向{{nickName}}支付{{$numberComma(TotalPay)}} CNY ，请付款备注：{{RemarkCode}}，付款成功后请到订单页面点击完成支付（非常重要！）
			</div>
			<div class="order-payment mr10">
				<div class="order-payment-info">
					{{$t('discovery.OTC.order.payment')}}：
				</div>
				<div class="order-payment-list">
					<i @click="pay('alipay')" class="iconfont icon-zhifubao alipay" v-if="alipay.length>1"></i>
					<i @click="pay('cardpay')" class="iconfont icon-yinhangqia cardpay" v-if="card.length>1"></i>
					<i @click="pay('wechart')" class="iconfont icon-weixinzhifu wechart" v-if="wechart.length>1"></i>
				</div>
			</div>
			<div class="order-btn">
				<button class="btn btn-round btn-min btn-cancel" @click="ConfirmCancelOrder()">{{$t('discovery.OTC.order.cancel')}}</button>
				<button class="btn btn-round btn-min" @click="orderconfirm()">{{$t('discovery.OTC.order.paymentok')}}</button>
			</div>
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
								{{$t('discovery.OTC.order.name')}}：{{alipay[1]}}
							</div>
							<button class="btn btn-round btn-min" @click="save(alipay[4])">{{$t('discovery.OTC.order.saveErcode')}}</button>
							<button class="btn btn-round btn-min mr20" :disabled='type=="zfb"' @click="thispay('zfb')"><span v-if="type=='zfb'">{{$t('discovery.OTC.order.thisPay')}}</span><span v-else>{{$t('discovery.OTC.order.selectpay')}}</span></button>
						</div>
						<div v-if="PayType==2" class="ercode">
							<img class="pay-img" :src="wechart[4]">
							<div>
								{{$t('discovery.OTC.order.nickname')}}：{{wechart[3]}}
							</div>
							<button class="btn btn-round btn-min" @click="save(wechart[4])">{{$t('discovery.OTC.order.saveErcode')}}</button>
							<button class="btn btn-round btn-min mr20" :disabled='type=="wx"' @click="thispay('wx')"><span v-if="type=='wx'">{{$t('discovery.OTC.order.thisPay')}}</span><span v-else>{{$t('discovery.OTC.order.selectpay')}}</span></button>
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
									<div class="btn btn-xs" @click="CopyClip(card[2])">{{$t('discovery.OTC.order.copyCard')}}</div>
								</div>
							</div>
							<div class="font copy">
								<div class="font-title">{{$t('discovery.OTC.order.name')}}：</div>
								<div>{{card[1]}}</div>
								<div class="font-btn">
									<div class="btn btn-xs" @click="CopyClip(card[1])" v-clipboard:copy="card[1]">{{$t('discovery.OTC.order.copyName')}}</div>
								</div>
							</div>
							<button class="btn btn-round btn-min mr20" :disabled='type=="card"' @click="thispay('card')"><span v-if="type=='card'">{{$t('discovery.OTC.order.thisPay')}}</span><span v-else>{{$t('discovery.OTC.order.selectpay')}}</span></button>
						</div>
					</div>
                </div>
            </vfpopup>
		</div>
		<Modal v-model="Confirm" @on-ok="paymentok" :closable="false" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
			<div slot="header"></div>
			<div class="modal-body">
                <div>
					请确认已通过【<span v-if="type=='wx'">微信</span><span v-if="type=='zfb'">支付宝</span><span v-if="type=='card'">银行卡</span>】方式完成支付
				</div>
            </div>
		</Modal>
		<Modal v-model="ConfirmCancel" @on-ok="CancelOrder()" :closable="false" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
			<div class="modal-body">
                <div>
					{{$t('discovery.OTC.order.ConfirmCancel')}}
				</div>
            </div>
		</Modal>
    </div>
</template>

<script>
	import { clipBoard } from '../../common/mixins/clipBoard'
	export default {
		mixins:[clipBoard],
        name:'order',
		data() {
			return {	
				m			:	'',		// 分
				s			:	'',		// 秒
				clock		:	'',		// 倒计时对象
				showFPupop	:	false,
				PayType		:	'',	    // 0支付宝，1银行卡，2微信
				buyNum		:	'',		// 购买数量
				id			:	'',		// id
				OrderId		:	'',		// 订单号
				price		:	'',		// 单价
				TotalPay	:	'',		// 总价
				num         :	'',		// 购买数量
				nickName	:	'',		// 卖家昵称
				RemarkCode	:	'',		// 付款参考号
				alipay		:	[],		// 支付宝
				card 		:	[],		// 银行卡
				wechart		:	[],		// 微信
				type		:	'',		// 支付方式
				Confirm		:	false,
				ConfirmCancel:	false,	// 确认取消弹框
				cType		:	'',		// 类型
			}
        },
		methods: {
			getCountDwn(){
				// 付款倒计时
				this.clock = setInterval(() =>{
					if( this.m == 0 && this.s == 0 ){
						// 倒计时结束
						window.clearInterval(this.clock);
						this.CancelOrder();
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
			cancel(){
				this.Confirm = false
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
			BuyOrderAndPay(){
				// 请求数据
				this.$server.post(
				'OTC_GoodsBuy_CK',{
					guid 	    :   this.$storage.get('guid'),
					orderId     :   this.id,
				}).then(data => {
					this.m 			=	data.djs_m
					this.s			=	data.djs_s
					this.OrderId	=   data.orderId
					this.price		=	data.price
					this.TotalPay	=	data.TotalPay
					this.num		=	data.buyNum
					this.nickName	=	data.nickName
					this.RemarkCode	=	data.RemarkCode
					this.alipay 	=   (data.zfb)?data.zfb.split("|"):'';
					this.wechart 	=   (data.wx)?data.wx.split("|"):'';
					this.card 		=   (data.card)?data.card.split("|"):'';
					if(data.isLocking){
						this.getCountDwn()
					}
				})
			},
			ConfirmCancelOrder(){
				// 取消订单确认
				this.ConfirmCancel = true
			},
			CancelOrder(){
				// 取消订单
				this.$server.post(
				'OTC_Order_Cancel',{
					guid 	    		:   this.$storage.get('guid'),
					OrderId			    :   this.OrderId,
				}).then(data => {
					if(data){
						this.$vux.toast.show({
							text: this.$t('discovery.OTC.order.cancelS'),
							type: 'success'
						})
						this.GOTC()
					}
				})
			},
			orderconfirm(){
				if(this.type==''){
					this.$vux.toast.show({
						text: this.$t('discovery.OTC.order.LookPay'),
						type: 'warn'
					})
					return;
				}
				this.Confirm = true

			},
			paymentok(){
				// 付款成功
				this.$server.post(
				'OTC_Order_PayDone',{
					guid 	    		:   this.$storage.get('guid'),
					OrderId			    :   this.OrderId,
					payType				:	this.type	//(支付方式：传值card,zfb,wx)
				}).then(data => {
					if(data){
						this.$vux.toast.show({
							text: this.$t('global.wait'),
							type: 'success'
						})
						this.$router.push({
							path:"/OTC/MyOrderNow",
						});
					}
				})
			},
			GOTC(){
				this.$router.push({
					path:"/OTC/OTCSellBuy",
				});
			},
			thispay(type){
				this.type = type
			}
		},
		mounted() {
			// 获取购买数量以及ID
			this.id     	=   (this.$route.query.id)?this.$route.query.id:''
			this.cType		=   (this.$route.query.type)?this.$route.query.type:'null';
			if(this.id==''){
				this.GOTC()
			}
			this.BuyOrderAndPay()
			
		},
		beforeDestroy(){
			// 清除计时器
			window.clearInterval(this.clock);
		}
	}

</script>

<style scoped lang="scss"> 
@import "../../scss/views/otc/order";
</style>