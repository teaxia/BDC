<template>
	<div class="orderList" v-cloak>
		<div class="pb20">
			<div class="list">
				<!-- 当前订单 -->
				<div class="order-list-content" v-for="(v,index) in CorderList" v-if="v.Id" :key="index" @click="Toview(v.Id)">
					<flexbox>
						<flexbox-item :span="4">{{$t('discovery.OTC.orderlist.orderId')}}：{{v.OrderId}}</flexbox-item>
						<flexbox-item class="right">
							{{v.CreateTime}}
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item span='60'>
							<svg class="sicon mr-cent" aria-hidden="true" v-if="$currency.indexOf(v.CurrenyName)>=0">
								<use :xlink:href="`#icon-`+v.CurrenyName"></use>
							</svg>
							<Avatar v-else class="sicon avatar" style="background:#f56a00;">
								<span class="line-height">{{v.CurrenyName}}</span>
							</Avatar>
							<div class="grid-username">{{v.CurrenyName}}</div>
							<div class="grid-username">
								<span v-if="v.cType=='buy'" class="font font-wran">{{$t('discovery.OTC.type.buy')}}</span>
								<span v-if="v.cType=='sell'" class="font font-primary">{{$t('discovery.OTC.type.sell')}}</span>
							</div>
						</flexbox-item>
						<flexbox-item class="order-list-info">
							<div class="total">
								{{$t('discovery.OTC.orderlist.totalprice')}}
							</div>
							<div class="price-info">
								<span class="price-info">￥{{v.TotalPay}}</span>
								<span v-if="v.AuditStatus==3" class="total-status tag tag-error">
									{{$t('discovery.OTC.complaiont.status3')}}
								</span>
								<span v-if="v.AuditStatus==1||v.AuditStatus==2" class="total-status tag tag-success">
									{{$t('discovery.OTC.complaiont.status1')}}
								</span>
								<span v-if="v.AuditStatus==0" class="total-status tag tag-wran">
									{{$t('discovery.OTC.complaiont.status0')}}
								</span>
							</div>
							<div>
								<span class="price">{{$t('discovery.OTC.orderlist.oprice')}}：￥{{v.Price}}</span>
							</div>
							<div class="status">
								<span class="buynum">{{$t('discovery.OTC.orderlist.num')}}：{{v.BuyNum}}（{{v.CurrenyName}}）</span>
								<span :class="{'font':true,'order-list-type-waitpay':v.sType=='申诉','order-list-type-wait':v.sType=='被申诉'}">{{v.sType}}</span>
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
	export default {
		name:'OTCList',
		data() {
			return {
				start		:	'',
				end			:	'',
				stardate    :   '',
				enddate     :   '',
				search		:	'',					// 搜索订单号
				CorderList	:	[],					// 申诉订单
				type		:	'ss',			    // 当前订单"dq"，历史订单"ls"，申诉订单"ss"
			}
		},
		watch:{
			
		},
		methods: {
			Toview(id){
				// 申诉订单跳转
				this.$router.push({
					path:"/OTC/Complaiont/view",
					query:{
						id		:	id,
					}
				});
				
			},
			GetCorderList(){
				// 申诉订单
				this.$server.post(
                'OTC_GetComplainList',{
                    guid 	    :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
						this.CorderList	=	data
                    }
                }) 
			},
			
		},
		mounted() {
			this.GetCorderList()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otclist";
</style>