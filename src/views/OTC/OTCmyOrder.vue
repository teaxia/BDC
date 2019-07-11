<template>
	<div class="myOrder margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.OTC.myorder.title')"></x-header>
        <div class="pd0">
			<div class="order-id bgpd">
				<h1>{{$t('discovery.OTC.order.orderId')}}：#{{data.Id}}</h1>
				<span v-if="cType=='buy'" class="tag tag-wran">{{$t('discovery.OTC.type.buy')}}</span>
				<span v-if="cType=='sell'" class="tag tag-primary">{{$t('discovery.OTC.type.sell')}}</span>
			</div>
			<div class="order-info order-line">
				<h3 class="order-tips" v-if="data.GoodsType==0&&cType=='sell'">{{data.NickName}}{{$t('discovery.OTC.order.tomebuy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="data.GoodsType==1&&cType=='sell'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.sell')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<!-- <h3 class="order-tips" v-if="data.GoodsType==0&&cType=='sell'">{{data.NickName}}{{$t('discovery.OTC.order.tomebuy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="data.GoodsType==1&&cType=='sell'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.sell')}}{{data.BuyNum}}({{data.CurrenyName}})</h3> -->

				<h3 class="order-tips" v-if="data.GoodsType==0&&cType=='buy'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.buy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="data.GoodsType==1&&cType=='buy'">{{data.NickName}}{{$t('discovery.OTC.order.tome')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<!-- <h3 class="order-tips" v-if="data.GoodsType==0&&cType=='buy'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.buy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="data.GoodsType==1&&cType=='buy'">{{data.NickName}}{{$t('discovery.OTC.order.tome')}}{{data.BuyNum}}({{data.CurrenyName}})</h3> -->
			</div>
			<div class="order-pay order-line mr20 bgpd">
				<div class="order-information">
					<div class="order-pay-price font-primary">
						{{$t('OTC.order.GoodsId')}}：<span>{{data.GoodsId}}</span>
					</div>
					<div class="order-pay-total">
						{{$t('discovery.OTC.order.price')}}：<span>{{data.Price}}CNY</span>
					</div>
					<div class="order-pay-total">
						{{$t('discovery.OTC.order.total')}}：<span>{{data.TotalPay}}CNY</span>
					</div>
					<div class="order-pay-total">
						{{$t('discovery.OTC.index.num')}}：<span>{{data.BuyNum}}({{data.CurrenyName}})</span>
					</div>
				</div>
				<div class="order-svg">
					<svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(data.CurrenyName)>=0">
						<use :xlink:href="`#icon-`+data.CurrenyName"></use>
					</svg>
					<Avatar v-else class="sicon avatar" style="background:#f56a00;">
						<span class="line-height">{{data.CurrenyName}}</span>
					</Avatar>
					<div class="sicon-currency">{{data.CurrenyName}}</div>
				</div>
			</div>
			<div class="order-tips mr20 order-line bgpd">
				<div :class="{'order-timeline':true,'gray':data.Status==7||data.Status==6,'green':data.Status==5}">
					<div v-if="data.CreateTime!=null" class="order-timeline-tag">
						<div class="order-timeline-tag-title">{{$t('discovery.OTC.myorder.ctime')}}：</div>
						<div class="order-timeline-tag-info">{{data.CreateTime}}</div>
					</div>
					<div v-if="data.PayTime!=null" class="order-timeline-tag">
						<div class="order-timeline-tag-title">{{$t('discovery.OTC.myorder.ptime')}}：</div>
						<div class="order-timeline-tag-info">{{data.PayTime}}</div>
					</div>
					<div v-if="data.DoneTime!=null" class="order-timeline-tag">
						<div class="order-timeline-tag-title">{{$t('discovery.OTC.myorder.dtime')}}：</div>
						<div class="order-timeline-tag-info">{{data.DoneTime}}</div>
					</div>
					<div v-if="data.CancelTime!=null" class="order-timeline-tag">
						<div class="order-timeline-tag-title">{{$t('discovery.OTC.myorder.cantime')}}：</div>
						<div class="order-timeline-tag-info">{{data.CancelTime}}</div>
					</div>
				</div>
			</div>
			<div class="order-payment mr20 order-line bgpd" v-if="payInfo.length>1">
				<div class="order-payment-info" v-if="payInfo[1]=='支付宝'||payInfo[1]=='微信'">{{$t('discovery.OTC.myorder.payment')}}：{{payInfo[1]}}</div>
				<div class="order-payment-info" v-if="payInfo[1]=='支付宝'">{{$t('discovery.OTC.myorder.access')}}：{{payInfo[2]}}</div>
				<div class="order-payment-info" v-if="payInfo[1]=='微信'||payInfo[1]=='支付宝'">{{$t('discovery.OTC.myorder.nickname')}}：{{payInfo[3]}}</div>

				<div class="order-payment-info" v-if="payInfo[1]!='支付宝'&&payInfo[1]!='微信'">{{$t('discovery.OTC.myorder.name')}}：{{payInfo[1]}}</div>
				<div class="order-payment-info" v-if="payInfo[1]!='支付宝'&&payInfo[1]!='微信'">{{$t('discovery.OTC.myorder.bank')}}：{{payInfo[3]}}</div>
				<div class="order-payment-info" v-if="payInfo[1]!='支付宝'&&payInfo[1]!='微信'">{{$t('discovery.OTC.myorder.cardid')}}：{{payInfo[2]}}</div>
			</div>
			<div class="order-remark mr20 order-line bgpd">
				{{$t('OTC.order.tel')}}：{{data.PhoneNo}}
			</div>
			<div class="order-remark mr20 order-line bgpd">
				{{$t('discovery.OTC.myorder.remark')}}：{{data.Remark}}
			</div>
			<div class="order-done mr10">
				<!-- {{$t('discovery.OTC.complaiont.minutes')}} -->
				<div v-if="showF" class="tips">未收到转账请勿放币，{{lm}}分{{ls}}秒后订单自动取消</div>
				<button class="btn btn-block btn-round-mx mr20" disabled v-if="data.Status==3&&!isSS">请于支付{{m}}分{{s}}秒后再提交申诉</button>
				<button class="btn btn-block btn-round-mx mr20" @click="ToComplaint()" v-if="data.Status==3&&isSS">{{$t('discovery.OTC.complaiont.title')}}</button>
				<button class="btn btn-block btn-round-mx mr20" v-if="data.Status==3&&cType=='sell'" @click="ShowPSW()">{{$t('discovery.OTC.myorder.confirm')}}</button>
				<button v-if="data.Status==7||data.Status==6" class="btn btn-block btn-round-mx btn-disabled mr20" disabled>{{$t('discovery.OTC.myorder.cancalorder')}}</button>
				<button v-if="data.Status==5" class="btn btn-block btn-success btn-round-mx btn-disabled mr20" disabled>{{$t('discovery.OTC.myorder.doneorder')}}</button>
				<!-- showF -->
				<div class="order-done-tips" v-if="data.Status==2&&!isSS&&this.cType=='sell'">等待买家付款，剩余{{m}}分{{s}}秒超时自动取消</div>
				<button v-if="showF&&!isFb" class="btn btn-block btn-round-mx mr20" disabled>{{m}}分{{s}}秒后可强制发币</button>
				<button v-if="showF&&isFb" class="btn btn-block btn-round-mx mr20" @click="directOk()">已收到款，直接发币</button>
			</div>
			<!-- <div class="tips" v-if="data.Status==3&&this.orderType==2&&this.minutes<30">
				{{$t('discovery.OTC.myorder.wait')}}{{m}}{{$t('discovery.OTC.myorder.minute')}}{{s}}{{$t('discovery.OTC.myorder.second')}}
			</div> -->
			<center v-if="data.Status==3&&!isSS">
				<i-circle :percent="percent" class="close" v-if="data.Status==3&&!isSS">
					<div style="font-size:24px">{{m}}m{{s}}s</div>
				</i-circle>
			</center>
		</div>

		<Modal v-model="direct" :mask-closable="false" @on-ok="directFB()">
			<div slot="header">
                请勿在没有收到款之前发币给买家
            </div>
			<div class="modal-body">
                <group>
                    <!-- <x-input class="test" :type="typeed?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="passwprd" :placeholder="$t('global.input')+$t('discovery.OTC.sell.security')">
                        <i slot="right" @click="changType()" :class="['iconfont',typeed?'icon-17yanjing':'icon-Close']"></i>
                    </x-input> -->
					<x-input class="test" type="text" title="到账时间" placeholder="请输入到账时间" v-model="DzTime">
                    </x-input>
					<x-input class="test" type="text" title="备注"  v-model="remark">
                    </x-input>
                </group>
				<div class="sbank">
                    <div class="title-psw wd">
                        转账方式
                    </div>
                    <div class="psw">
                        <RadioGroup v-model="mode">
                            <Radio label="wx" class="label-info">微信</Radio>
                            <Radio label="zfb" class="label-info">支付宝</Radio>
                        </RadioGroup>
                    </div>
                </div>
            </div>
		</Modal>

		<Modal v-model="showPSwed" :mask-closable="false" @on-ok="confirm">
			<div slot="header">
                {{$t('wallet.tips.inputcode')}}
            </div>
			<div class="modal-body security">
                <group>
                    <x-input class="test" :type="typeed?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="passwprd" :placeholder="$t('global.input')+$t('discovery.OTC.sell.security')">
                        <i slot="right" @click="changType()" :class="['iconfont',typeed?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
            </div>
		</Modal>

		<Modal v-model="show" @on-ok="OrderAndPay" :closable="false" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
			<div slot="header"></div>
			<div class="modal-body">
                <div>{{$t('discovery.OTC.myorder.tips')}}</div>
            </div>
		</Modal>
    </div>
</template>

<script>    
import { dateFormat } from 'vux'
	export default {
		filters: {
			dateFormat
		},
        name:'myOrder',
		data() {
			return {	
				id      	:   '',                 // 订单ID
				data		:	[],
				passwprd	:	'',					// 安全密码
				type	    :   false,				// 切换密码状态
				show		:	false,				// 二次确认状态
				payInfo		:	[],					// 支付方式
				minutes		:	'',					// 支付时间是否大于30分钟可以申述
				showPSwed	:	false,
				typeed		:	false,
				m			:	'',
				s			:	'',
				clock		:	'',
				percent		:	0,				     // 倒计时百分比
				percentclock:	'',					 // 倒计时的实例
				cType		:	'',					 // 买房、卖方
				direct		:	false,				 // 直接发币的弹窗
				remark		:	'',					 // 备注
				DzTime		:	'',					 // 到账时间
				mode		:	'',					 // 转账方式
				modeOk		:	false,				 // 这个用来判断是否是直接付款，如果是的话，不弹出二次确认框，并且提交到直接付款的接口
				showF		:	'',					 // 是否显示直接发币，同时也兼顾发币倒计时
				lm			:	0,					 // 超时取消订单倒计时分
				ls			:	0,					 // 超时取消订单倒计时秒
				isFb		:	false,				 // 是否可发币
				cancelclock	:	'',				     // 取消订单倒计时实例
				isSS		:	false,				 // 是否可申诉
			}
		}, 
		watch:{
			
		},
		methods: {
			ToComplaint(){
				this.$router.push({
					path:"/OTC/complaiont",
					query:{
						id	:	this.id
					}
				});
			},
			GetOrderById(){
				// 订单详情
				this.$server.post(
				'OTC_GetMyOrderById',{
					guid 	    :   this.$storage.get('guid'),
					orderId 	:   this.id,
					// isSeller  	:   isSeller,
				}).then(data => {
					if(data){
						this.payInfo 	=   (data.PayType)?data.PayType.split("|"):'';
						this.data 		= 	data
						this.showF		=	data.showF
						console.log(data)
						// 直接发币状态显示倒计时
						if(this.showF){
							this.m	=	data.djs_m
							this.s	=	data.djs_s
							this.lm =   data.Lockdjs_m
							this.ls =   data.Lockdjs_s
							this.getCountDwn()
							// this.timeFn(data.CreateTime)
							//
						}
						// 待发币状态申诉
						if(data.PayTime){
							// this.timeFn(data.PayTime)
							// this.getCountDwn()
							this.m = data.djs_m
							this.s = data.djs_s
							this.mathPercent()
							this.getCountDwn()
						}
						// 购币等待卖家付款
						if(data.Status==2&&this.cType=='sell'){
							this.m = data.Lockdjs_m
							this.s = data.Lockdjs_s
							this.getCountDwn()
						}
					}
				})
			},
			OrderAndPay(){
				// 确认对方付款
				if(this.passwprd==''){
					this.$vux.toast.show({
						text: this.$t('wallet.tips.inputcode'),
						type: 'warn'
					})
					return;
				}
				this.$server.post(
				'OTC_Order_Send',{
					guid 	    	:   this.$storage.get('guid'),
					orderId			:   this.id,
					moneyPwd  		:   this.passwprd,
				}).then(data => {
					if(data){
						this.GetOrderById()
					}
				})
			},
			changType(){
				this.type = !this.type
			},
			confirm(){
				// 二次确认
				// 判断是否直接发币，如果是则不显示二次确认
				if(this.modeOk){
					this.$server.post(
					'OTC_CanForceDone',{
						guid 	    	:   this.$storage.get('guid'),
						orderId			:   this.id,
						payType			:	this.mode,
						payTime			:	this.DzTime,
						Remarks			:	this.remark,
						moneyPwd  		:   this.passwprd,
					}).then(data => {
						if(data){
							this.GetOrderById()
						}
					})
				}else{
					this.show = true
				}
			},
			cancel () {
                this.show = false
            },
			ShowPSW(){
				// 安全码弹出层
				this.showPSwed = true
			},
			changType(){
				// 安全码切换
				this.typeed = !this.typeed
			},
			getCountDwn(){
				if(this.showF){
					// 直接发币
					this.clock = setInterval(() =>{
						if( this.m == 0 && this.s == 0 ){
							// 倒计时结束
							this.isFb  =  true;
							window.clearInterval(this.clock);
						}else if( this.m >= 0 ){
							if( this.s > 0 ){
								this.s--;
							}else if( this.s <= 0 ){
								this.m--;
								this.s = 59;
							}
						}
					},1000);
					// 取消订单倒计时
					this.cancelclock = setInterval(() =>{
						if( this.lm == 0 && this.ls == 0 ){
							// 倒计时结束
							
							window.clearInterval(this.cancelclock);
							this.GetOrderById()
						}else if( this.lm >= 0 ){
							if( this.ls > 0 ){
								this.ls--;
							}else if( this.ls <= 0 ){
								this.lm--;
								this.ls = 59;
							}
						}
					},1000);
				}else{
					// 非直接发币  申诉
					// 锁单倒计时
					this.clock = setInterval(() =>{
						if( this.m == 0 && this.s == 0 ){
							// 倒计时结束
							this.isSS	=	true
							window.clearInterval(this.clock);
							if(this.data.Status==2&&this.cType=='sell'){
								this.$router.push({
									path:"/OTC/MyOrderNow",
								});
							}
						}else if( this.m >= 0 ){
							if( this.s > 0 ){
								this.s--;
							}else if( this.s <= 0 ){
								this.m--;
								this.s = 59;
							}
						}
					},1000);
				}
			},
			mathPercent(){
				let i = 1
				let Tmp = this.$math.add(this.m*60,this.s)		// 秒
				this.clock = window.setInterval(() => {
					this.T--;
					i++;
					if (this.T<=0) {
						window.clearInterval(this.clock)
					}
					this.percent =  i/Tmp*100
				},1000)
				
			},
			directOk(){
				// 确认发币按钮
				this.direct = true
			},
			directFB(){
				if(this.mode==''){
					this.$vux.toast.show({
						text: '请选择转账方式',
						type: 'warn'
					})
					return;
				}
				// 直接发币
				this.showPSwed = true
				this.modeOk	   = true
			}
		},
		mounted() {
			this.id     	=   this.$route.query.id
			this.cType		=   (this.$route.query.type)?this.$route.query.type:'null';
			this.DzTime 	=	dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
            this.GetOrderById();
		},
		beforeDestroy(){
			// 清除计时器
			window.clearInterval(this.clock);
			window.clearInterval(this.percentclock);
			window.clearInterval(this.cancelclock);
			this.clock = null;
			this.percentclock = null;
			this.cancelclock	=	null;
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/myOrder";
</style>