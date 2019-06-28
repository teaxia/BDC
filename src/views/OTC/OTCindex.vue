<template>
	<div class="otc">
		<div class="otc-title">
			<h1>OTC</h1>
			<router-link to="/OTC/OTCRank">
				<div class="otc-title-rank">
					<i class="iconfont icon-paixingbang"></i>{{$t('discovery.OTC.ranking')}}
				</div>
			</router-link>
		</div>
		<div class="otc-brand">
			<tab class="tab" :custom-bar-width="'1.56rem'" :default-color="'#fff'" :line-width="3">
				<tab-item :selected="$route.meta.bindex==index" class="tab-item" @on-item-click="goTOW(v.url,v.type)" v-if="v.status" v-for="(v,index) in brand" :key="index">{{v.name}}</tab-item>
			</tab>
		</div>
		<transition name="fade" mode="out-in">
        	<router-view></router-view>
		</transition>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		name:'OTCindex',
		data() {
			return {
				brand	:	[
					{
						name	:	'交易市场',
						url		:	'/OTC/OTCSellBuy',
						status	:	true
					},
					{
						name	:	'商家发布',
						url		:	'/OTC/sell',
						status	:	true
					},
					{
						name	:	'我的发布',
						url		:	'/OTC/MyGoods',
						status	:	true
					},
					{
						name	:	'当前订单',
						url		:	'/OTC/MyOrderNow',
						status	:	true
					},
					{
						name	:	'历史订单',
						url		:	'/OTC/MyOrderHistory', 
						status	:	true
					},
					{
						name	:	'申述订单',
						url		:	'/OTC/complaiontList',
						status	:	true
					},
					{
						name	:	'收益',
						url		:	'/OTC/Profit',
						status	:	true
					}
				],
				type	:	'',					// 接收订单列表的传参，用来显示下标
				OTCrouter	:	'',				// 商家发布，我的发布权限控制
			}
		},
		methods: {
			goTOW(url){
				// url为非订单列表页面跳转
				this.$router.push({
					path:url,
				});
			}
		},
		mounted() {
			this.OTCrouter = this.$storage.get('OTCrouter');
			console.log(this.OTCrouter)
			if(this.OTCrouter=='false'){
				this.brand[1].status = false
				this.brand[2].status = false
			}
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otcpublick";
</style>