<template>
	<div class="myOrder margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back'),preventGoBack:true}" @on-click-back="Goback()" :title="$t('discovery.OTC.myorder.title')"></x-header>
        <div class="pd50">
			<div class="order-id">
				<h1>{{$t('discovery.OTC.order.orderId')}}：#{{data.Id}}</h1>
			</div>
			<div class="order-info order-line">
				<h3 v-if="orderType==2&&data.GoodsType==0">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.buy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 v-if="orderType==2&&data.GoodsType==1">{{data.NickName}}{{$t('discovery.OTC.order.tome')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 v-if="orderType==3&&data.GoodsType==0">{{data.NickName}}{{$t('discovery.OTC.order.tomebuy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 v-if="orderType==3&&data.GoodsType==1">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.sell')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<span v-if="data.GoodsType==0" class="tag tag-wran">{{$t('discovery.OTC.orderlist.orderType0')}}</span><span v-if="data.GoodsType==1" class="tag tag-primary">{{$t('discovery.OTC.orderlist.orderType1')}}</span>
			</div>
			<div class="order-pay order-line mr20">
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
				</div>
			</div>
			<div class="order-tips mr20 order-line">
				<div class="order-timeline">
					<div v-if="data.CreateTime!=null">
						<div>{{$t('discovery.OTC.myorder.ctime')}}</div>
						<div>{{data.CreateTime}}</div>
					</div>
					<div v-if="data.PayTime!=null">
						<div>{{$t('discovery.OTC.myorder.ptime')}}</div>
						<div>{{data.PayTime}}</div>
					</div>
					<div v-if="data.DoneTime!=null">
						<div>{{$t('discovery.OTC.myorder.dtime')}}</div>
						<div>{{data.DoneTime}}</div>
					</div>
					<div v-if="data.CancelTime!=null">
						<div>{{$t('discovery.OTC.myorder.cantime')}}</div>
						<div>{{data.CancelTime}}</div>
					</div>
				</div>
			</div>
			<div class="order-payment mr20 order-line" v-if="payInfo.length>1">
				<div v-if="payInfo[1]=='支付宝'||payInfo[1]=='微信'">{{$t('discovery.OTC.myorder.payment')}}：{{payInfo[1]}}</div>
				<div v-if="payInfo[1]=='支付宝'">{{$t('discovery.OTC.myorder.access')}}：{{payInfo[2]}}</div>
				<div v-if="payInfo[1]=='微信'||payInfo[1]=='支付宝'">{{$t('discovery.OTC.myorder.nickname')}}：{{payInfo[3]}}</div>

				<div v-if="payInfo[1]!='支付宝'&&payInfo[1]!='微信'">{{$t('discovery.OTC.myorder.name')}}：{{payInfo[1]}}</div>
				<div v-if="payInfo[1]!='支付宝'&&payInfo[1]!='微信'">{{$t('discovery.OTC.myorder.bank')}}：{{payInfo[3]}}</div>
				<div v-if="payInfo[1]!='支付宝'&&payInfo[1]!='微信'">{{$t('discovery.OTC.myorder.cardid')}}：{{payInfo[2]}}</div>
			</div>
			<div class="order-remark mr20 order-line">
				{{$t('discovery.OTC.myorder.remark')}}：{{data.Remark}}
			</div>
			<div v-if="data.Status==3&&this.orderType==3">
				<!-- <group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('wallet.tips.safetycode')" required :placeholder="$t('wallet.tips.inputcode')" v-model="passwprd">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group> -->
				<div class="line-b sbank">
                    <div class="title-psw wd">
                        {{$t('discovery.OTC.sell.security')}}
                    </div>
                    <div class="psw">
                        <div @click="ShowPSW()">
                            <span>{{$t('global.clickinput')}}{{$t('discovery.OTC.sell.security')}}</span>
                        </div>
                    </div>
                </div>
			</div>
			<div class="order-payment mr10">
				<button class="btn btn-block btn-round" disabled v-if="data.Status==3&&this.orderType==2&&this.minutes<29">{{$t('discovery.OTC.complaiont.minutes')}}</button>
				<button class="btn btn-block btn-round" @click="ToComplaint()" v-if="data.Status==3&&this.orderType==2&&this.minutes>=30">{{$t('discovery.OTC.complaiont.title')}}</button>
				<button class="btn btn-block btn-round" v-if="data.Status==3&&this.orderType==3" @click="confirm()">{{$t('discovery.OTC.myorder.confirm')}}</button>
				<button v-if="data.Status==7||data.Status==6" class="btn btn-block btn-round btn-disabled" disabled>{{$t('discovery.OTC.myorder.cancalorder')}}</button>
				<button v-if="data.Status==5" class="btn btn-block btn-success btn-round btn-disabled" disabled>{{$t('discovery.OTC.myorder.doneorder')}}</button>
			</div>
		</div>
		<Modal v-model="showPSwed" :mask-closable="false">
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
import { fail } from 'assert';
    
	export default {
        name:'myOrder',
		data() {
			return {	
				id      	:   '',                  // 订单ID
				orderType	:	'',				     // 订单类型  2是已购 3是已售
				data		:	[],
				passwprd	:	'',					 // 安全密码
				type	    :   false,				// 切换密码状态
				show		:	false,				// 二次确认状态
				payInfo		:	[],					// 支付方式
				minutes		:	'',					// 支付时间是否大于30分钟可以申述
				showPSwed	:	false,
				typeed		:	false,
			}
		}, 
		watch:{
			
		},
		methods: {
			ToComplaint(){
				this.$router.push({
					path:"/discovery/OTC/complaiont",
					query:{
						id	:	this.id
					}
				});
			},
			GetOrderById(){
				// 订单详情
				let isSeller = (this.orderType==2)?false:true;
				this.$server.post(
				'OTC_GetMyOrderById',{
					guid 	    :   this.$storage.get('guid'),
					orderId 	:   this.id,
					isSeller  	:   isSeller,
				}).then(data => {
					if(data){
						this.payInfo 	=   (data.PayType)?data.PayType.split("|"):'';
						this.data = data
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
				this.show = true
			},
			cancel () {
                this.show = false
            },
			Goback(){
				let type
				if(this.orderType==2){
					// 已购
					type  = 2
				}else if(this.orderType==3){
					// 已售
					type  = 3
				}
				this.$router.push({
					path:"/discovery/OTC/list",
					query:{
						type	:	type,
					}
				});
			},
			timeFn(d1) {
				var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
				// 计算获取的时间是否与现在的时间相差30分钟
				var dateEnd = new Date();//获取当前时间
				var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
				this.minutes =  Math.floor((dateDiff / 60000));
			},
			ShowPSW(){
				// 安全码弹出层
				this.showPSwed = true
			},
			changType(){
				// 安全码切换
				this.typeed = !this.typeed
			}
		},
		
		mounted() {
			this.id     	=   this.$route.query.id
			this.orderType	=	this.$route.query.status
            this.GetOrderById();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/myOrder";
</style>