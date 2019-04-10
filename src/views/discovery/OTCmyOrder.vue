<template>
	<div class="myOrder margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back'),preventGoBack:true}" @on-click-back="Goback()" title="订单详情"></x-header>
        <div class="pd50">
			<div class="order-id">
				<h1>{{$t('discovery.OTC.order.orderId')}}：#{{data.Id}}</h1>
			</div>
			<div class="order-info order-line">
				<h3 v-if="orderType==2">{{$t('discovery.OTC.order.your')}}{{data.NickName}}{{$t('discovery.OTC.order.buy')}}{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<h3 v-if="orderType==3">{{data.NickName}}向您购买了{{data.BuyNum}}({{data.CurrenyName}})</h3>
				<span v-if="data.GoodsType==0" class="tag tag-wran">售币</span><span v-if="data.GoodsType==1" class="tag tag-primary">求购</span>
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
						<div>订单创建时间</div>
						<div>{{data.CreateTime}}</div>
					</div>
					<div v-if="data.PayTime!=null">
						<div>订单付款时间</div>
						<div>{{data.PayTime}}</div>
					</div>
					<div v-if="data.DoneTime!=null">
						<div>订单完成时间</div>
						<div>{{data.DoneTime}}</div>
					</div>
					<div v-if="data.CancelTime!=null">
						<div>订单取消时间</div>
						<div>{{data.CancelTime}}</div>
					</div>
				</div>
			</div>
			<div class="order-remark mr20 order-line">
				留言：{{data.Remark}}
			</div>
			<div v-if="data.Status==3&&this.orderType==3">
				<group>
                    <x-input class="test" :type="type?'text':'password'" :title="$t('wallet.tips.safetycode')" required :placeholder="$t('wallet.tips.inputcode')" v-model="passwprd">
                        <i slot="right" @click="changType()" :class="['iconfont',type?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
			</div>
			<div class="order-payment mr10">
				<button class="btn btn-block btn-round" @click="ToComplaint()" v-if="data.Status==3&&this.orderType==2">申诉</button>
				<button class="btn btn-block btn-round" v-if="data.Status==3&&this.orderType==3" @click="confirm()">确认收款</button>
				<button v-if="data.Status==7||data.Status==6" class="btn btn-block btn-round btn-disabled" disabled>交易已取消</button>
				<button v-if="data.Status==5" class="btn btn-block btn-success btn-round btn-disabled" disabled>交易已完成</button>
			</div>
		</div>
		<Modal v-model="show" @on-ok="OrderAndPay" :closable="false" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
			<div slot="header"></div>
			<div class="modal-body">
                <div>"确认后系统将自动发币至买家账户，是否确认？</div>
            </div>
		</Modal>
    </div>
</template>

<script>
    
	export default {
        name:'myOrder',
		data() {
			return {	
				id      	:   '',                  // 订单ID
				orderType	:	'',				     // 订单类型  2是已购 3是已售
				data		:	[],
				passwprd	:	'',					 // 安全密码
				type	    : false,				// 切换密码状态
				show		:	false,				// 二次确认状态
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
						this.data = data
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