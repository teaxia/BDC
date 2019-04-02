<template>
	<div class="order margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="支付订单"></x-header>
		<div class="pd50">
			<div class="order-id">
				<h1>订单号：#123456789</h1>
			</div>
			<div class="order-info order-line">
				<h3>您向XXXX购买0.01234567 BDC</h3>
			</div>
			<div class="order-pay order-line mr20">
				<div class="order-pay-price">
					单价：<span>4 CNY/BDC</span>
				</div>
				<div class="order-pay-total">
					总价：<span>1000CNY</span>
				</div>
			</div>
			<div class="order-tips mr20 order-line">
				待支付，请于{{m}}分{{s}}秒内向XXX支付1000 CNY ，付款参考号：696342，付款成功后请到订单页面点击完成支付（非常重要！）
			</div>
			<div class="order-payment mr10">
				<div class="order-payment-info">
					点击查看卖方收款方式：
				</div>
				<div class="order-payment-list">
					<i @click="pay('alipay')" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':true}"></i>
					<i @click="pay('cardpay')" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':true}"></i>
					<i @click="pay('wechart')" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':true}"></i>
				</div>
			</div>
			<div class="order-btn">
				<button class="btn btn-round btn-min btn-cancel" @click="cancelFPupop">取消订单</button>
				<button class="btn btn-round btn-min">完成支付</button>
			</div>
		</div>
		<div class="popup">
			<vfpopup :leftText="$t('global.cancel')" :titleText="$t('discovery.OTC.index.curreny')" :rightText="$t('global.ok')" @onLeftText="cancelPupop()" @onRightText="okPupop()" v-model="showFPupop">
                <div slot="list">
                    <div class="pay-info">
						<div v-if="PayType==0||PayType==2" class="ercode">
							<img class="pay-img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3059434706,756007675&fm=26&gp=0.jpg">
							<div>
								卖家昵称：XXX
							</div>
							<button class="btn btn-round btn-min" @click="save()">存储二维码</button>
						</div>
						<div v-if="PayType==1" class="card padding-bottom">
							<!-- 银行卡 -->
							<div class="font">
								<div class="font-title">开户银行：</div>广大银行
							</div>
							<div class="font copy">
								<div class="font-title">银行卡号：</div>
								<div>6222022402003101718</div>
								<div class="font-btn">
									<button class="btn btn-xs" v-clipboard:copy="'6222022402003101718'" v-clipboard:success="onCopy" v-clipboard:error="onError">复制卡号</button>
								</div>
							</div>
							<div class="font copy">
								<div class="font-title">姓名：</div>
								<div>牛大壮</div>
								<div class="font-btn">
									<button class="btn btn-xs" v-clipboard:copy="'牛大壮'" v-clipboard:success="onCopy" v-clipboard:error="onError">复制姓名</button>
								</div>
							</div>
						</div>
					</div>
                </div>
            </vfpopup>
		</div>
    </div>
</template>

<script>
	export default {
        name:'order',
		data() {
			return {	
				m			:	9,		// 分
				s			:	59,		// 秒
				clock		:	'',		// 倒计时对象
				showFPupop	:	false,
				PayType		:	'',	    // 0支付宝，1银行卡，2微信
			}
        },
		methods: {
			// $numberComma()
			getCountDwn(){
				// 付款倒计时
				this.clock = setInterval(() =>{
					if( this.m == 0 && this.s == 0 ){
						console.log("倒计时结束");
						window.clearInterval(this.clock)
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
			onCopy: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.success'),
					type: 'success'
				})
			},
			onError: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.error'),
					type: 'warn'
				})
			},
			save(){
				// 保存二维码到相册
				api.saveMediaToAlbum({
					path: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3059434706,756007675&fm=26&gp=0.jpg'
				}, function(ret, err) {
					if (ret && ret.status) {
						this.$vux.toast.show({
							text: '图片保存成功！',
							type: 'success'
						})
					} else {
						this.$vux.toast.show({
							text: '图片保存失败，请检查APP权限',
							type: 'wran'
						})
					}
				});
				
			},
		},
		mounted() {
            // 订单号：#123456789
			// 您向XXXX购买0.01234567 BDC
			// 单价：45028 CNY/BTC
			// 总价：1000CNY
			// 卖家付款方式：支付宝/微信/银行卡
			// 待支付，请于10分钟内向XXX支付1000 CNY ，付款参考号：696342
			this.getCountDwn()
		},
		beforeDestroy(){
			// 清除计时器
			window.clearInterval(this.clock);
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/order";
</style>