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
				<h3 class="order-tips" v-if="this.orderType==2&&data.GoodsType==0&&cType=='sell'">{{data.NickName}}{{$t('discovery.OTC.order.tomebuy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="this.orderType==2&&data.GoodsType==1&&cType=='sell'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.sell')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="this.orderType==2&&data.GoodsType==0&&cType=='buy'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.buy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="this.orderType==2&&data.GoodsType==1&&cType=='buy'">{{data.NickName}}{{$t('discovery.OTC.order.tome')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="this.orderType==3&&data.GoodsType==0&&cType=='sell'">{{data.NickName}}{{$t('discovery.OTC.order.tomebuy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 class="order-tips" v-if="this.orderType==3&&data.GoodsType==1&&cType=='sell'">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.sell')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
			</div>
			<div class="order-pay order-line mr20 bgpd">
				<div class="order-information">
					<div class="order-pay-price">
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
				<button class="btn btn-block btn-round-mx mr20" disabled v-if="data.Status==3&&this.orderType==2&&this.minutes<29||this.orderType==3&&data.Status==3&&this.minutes<29">{{$t('discovery.OTC.complaiont.minutes')}}</button>
				<button class="btn btn-block btn-round-mx mr20" @click="ToComplaint()" v-if="data.Status==3&&this.orderType==2&&this.minutes>=30||this.orderType==3&&data.Status==3&&this.minutes>=30">{{$t('discovery.OTC.complaiont.title')}}</button>
				<button class="btn btn-block btn-round-mx mr20" v-if="data.Status==3&&this.orderType==3" @click="ShowPSW()">{{$t('discovery.OTC.myorder.confirm')}}</button>
				<button v-if="data.Status==7||data.Status==6" class="btn btn-block btn-round-mx btn-disabled mr20" disabled>{{$t('discovery.OTC.myorder.cancalorder')}}</button>
				<button v-if="data.Status==5" class="btn btn-block btn-success btn-round-mx btn-disabled mr20" disabled>{{$t('discovery.OTC.myorder.doneorder')}}</button>
				<!-- showF -->
				<button v-if="showF&&this.minutes<3" class="btn btn-block btn-round-mx mr20" disabled>{{m}}分{{s}}秒后可强制发币</button>
				<button v-if="showF&&this.minutes>3" class="btn btn-block btn-round-mx mr20" @click="directOk()">已收到款，直接发币</button>
			</div>
			<!-- <div class="tips" v-if="data.Status==3&&this.orderType==2&&this.minutes<30">
				{{$t('discovery.OTC.myorder.wait')}}{{m}}{{$t('discovery.OTC.myorder.minute')}}{{s}}{{$t('discovery.OTC.myorder.second')}}
			</div> -->
			<center v-if="data.Status==3&&this.orderType==2&&this.minutes<30||this.orderType==3&&data.Status==3&&this.minutes<30">
				<i-circle :percent="percent" class="close" v-if="data.Status==3&&this.orderType==2&&this.minutes<30||this.orderType==3&&data.Status==3&&this.minutes<30">
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
				orderType	:	'',				    // 订单类型  2是已购 3是已售
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
				// let isSeller = (this.orderType==2)?false:true;
				this.$server.post(
				'OTC_GetMyOrderById',{
					guid 	    :   this.$storage.get('guid'),
					orderId 	:   this.id,
					// isSeller  	:   isSeller,
				}).then(data => {
					if(data){
						this.payInfo 	=   (data.PayType)?data.PayType.split("|"):'';
						this.data 		= 	data
						this.showF		=	 data.showF
						// 直接发币状态显示倒计时
						if(this.showF){
							this.timeFn(data.CreateTime)
						}
						// 待发币状态申诉是以支付时间计算
						if(data.PayTime){
							this.timeFn(data.PayTime)
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
					// console.log(this.DzTime+this.remark+this.mode)
				}else{
					this.show = true
				}
			},
			cancel () {
                this.show = false
            },
			timeFn(d1) {
				if(!this.showF){
					// 判断是否需要进行倒计时操作
					if(this.data.Status!=3&&this.orderType!=2||this.orderType!=3&&this.data.Status!=3){
						return
					}
				}
				var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
				// 计算获取的时间是否与现在的时间相差30分钟
				var dateEnd  =  new Date();//获取当前时间
				var dateDiff =  dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
				// console.log('毫秒'+dateDiff)
				this.minutes =  Math.floor((dateDiff / 60000)); 
				this.s	     =  60-(60-dateBegin.getSeconds())-(dateEnd.getSeconds())    //60秒减去（60秒减去发布时间减去当前时间秒数）= 当前剩余秒
				if(this.showF){
					// 直接发币
					// 开始倒计时
					if(this.s <0){
						this.s = 60+this.s
					}
					if(this.minutes<=0){
						this.m		 =   2;
					}else{
						this.m		 =	 3-this.minutes
					}
					
				}else{
					// 非直接发币
					// 开始倒计时
					if(this.s <0){
						this.s = 60+this.s
					
					}
					if(30-this.minutes>=30){
						this.m		 =   29;
					}else{
						this.m		 =	 30-this.minutes
					}
				}
				
				// 开始转圈
				this.mathPercent()
				// 倒计时开始
				if(this.m==1){
					this.m		 =	 0
				}
				if(this.m>=0){
					this.$nextTick(()=>{
						this.getCountDwn()
					});
				}
				
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
							this.minutes  =  31;
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
				}else{
					// 非直接发币
					// 锁单倒计时
					this.clock = setInterval(() =>{
						if( this.m == 0 && this.s == 0 ){
							// 倒计时结束
							this.minutes  =  31;
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
				}
			},
			mathPercent(){
				// 计算百分比
				// 计算已经过去的时间百分比
				let m			//  计算剩余时间分钟
				let sm			//  已经过去的秒
				// 判断是否直接发币
				if(this.showF){
					
					// // 直接发币
					// let s = this.$math.add(this.m*60,this.s)
					// // 180秒是3分钟
					// this.percentclock = window.setInterval(() => {
					// 	s++;
					// 	if (s>=180||s<0) {
					// 		window.clearInterval(this.percentclock)
					// 	}
					// 	this.percent =  Math.round(s/180*100)
					// 	// alert('计算出来的百分比'+this.percent)    // 31
					// 	// console.log(this.percent)
					// },1000)
				}else{
					// 其他发币
					// let Tmp
					if(this.minutes>=30){
						// 如果时间正好30分钟，这里要减去已经过去的秒数
						m    = 29
						sm   = this.$math.add(this.s,60)
						// Tmp  =  this.$math.subtract(m*60,sm)
						// console.log('减法秒'+Tmp);
					}else{
						m    =  30-this.minutes
						sm   =  this.s
						// Tmp  =  this.$math.add(m*60,sm)
						// console.log('加法秒'+Tmp);
					}
					// 如果时间为负数，则不执行下面的倒计时操作
					if(m<0){
						return
					}
					// 通过剩余时间计算出剩余秒数
					let Tmp  =  this.$math.add(m*60,sm)
					// 判断读秒是否大于1800
					if(Tmp>1800){
						Tmp = 1800+(1800-Tmp)
					}
					let s    =  1800-Tmp
					if(s<0){
						s    =  1800-(1800-s)
					}
					
					// 1800秒是半小时
					this.percentclock = window.setInterval(() => {
						s++;
						if (s>=1800||s<0) {
							window.clearInterval(this.percentclock)
						}
						this.percent =  Math.round(s/1800*100)
					},1000)
				}
				
			},
			directOk(){
				// 确认发币按钮
				this.direct = true
			},
			directFB(){
				// 直接发币
				this.showPSwed = true
				this.modeOk	   = true
			}
		},
		mounted() {
			this.id     	=   this.$route.query.id
			this.orderType	=	this.$route.query.status
			this.cType		=   (this.$route.query.type)?this.$route.query.type:'null';
			this.DzTime 	=	dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
            this.GetOrderById();
		},
		beforeDestroy(){
			// 清除计时器
			window.clearInterval(this.clock);
			window.clearInterval(this.percentclock);
			this.clock = null;
			this.percentclock = null;
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/myOrder";
</style>