<template>
	<div class="orderList" v-cloak>
		<div class="pb20">
			<div class="goods-list">
				<div class="otc-item" @click="edit(v.Id,v.GoodsType)" v-for="(v,index) in MyGoods" v-if="v.Id" :key="index">
                    <v-grid class="otc-grid">
                        <div class="otc-grid-title">
							<div class="grid-info">发布ID：{{v.Id}}</div>
							<div class="grid-info">{{v.CreateTime}}</div>
							<div class="otc-grid-right">
								<span :class="{'sv':true,'c-primary':v.sv=='场内','c-all':v.sv=='全部'}">{{v.sv}}</span>
								<i class="iconfont icon-arrow-right"></i>
							</div>
                        </div>
                        <div class="otc-grid-main">
                            <div class="v-flex">
								<div class="otc-grid-curreny">
									<svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(v.currenyName)>=0">
										<use :xlink:href="`#icon-`+v.currenyName"></use>
									</svg>
									<Avatar size="small" v-else style="background:#f56a00;">
										<span class="line-height">{{v.currenyName}}</span>
									</Avatar>
									<div class="grid-username">{{v.currenyName}}</div>
									<div v-if="v.GoodsType==0" class="font font-wran">
										{{$t('discovery.OTC.orderlist.orderType0')}}
									</div>
									<div v-if="v.GoodsType==1" class="font font-success">
										{{$t('discovery.OTC.orderlist.orderType1')}}
									</div>
								</div>
                                <div class="otc-grid-price">
                                    <div class="price">
										<div class="total">
                                        	{{$t('discovery.OTC.orderlist.price')}}
										</div>
										<div class="price-info">
											¥{{$numberComma(v.price)}}
										</div>
                                    </div>
                                    <div class="otc-price">
                                        <div>{{$t('discovery.OTC.orderlist.total')}}：{{$numberComma(v.currenyNum)}}（{{v.currenyName}}）</div>
                                        <div>{{$t('discovery.OTC.orderlist.sellnum')}}：{{$numberComma(v.sellNum)}} （{{v.currenyName}}）</div>
                                    </div>
                                </div>
                                <div class="otc-grid-pay">
                                    <div class="otc-grid-paylist">
										<div v-if="v.Status==-1" class="font font-error">
											{{$t('discovery.OTC.type.type01')}}
										</div>
										<div v-if="v.Status==0" class="font font-success">
											{{$t('discovery.OTC.type.type0')}}
										</div>
										<div v-if="v.Status==2" class="font font-wran">
											{{$t('discovery.OTC.type.type2')}}
										</div>
										<div v-if="v.Status==-2" class="font font-gray">
											{{$t('discovery.OTC.type.type_2')}}
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-grid>
                </div>
				<!-- 我的发布 -->
			</div>
		</div>
    </div>
</template>

<script>
	export default {
		name:'OTCList',
		data() {
			return {
				MyGoods		:	[],					// 当前订单
			}
		},
		watch:{
		},
		methods: {
			GetMyGoods(){
				// 我的发布
				this.$server.post(
                'OTC_GetMyGoods',{
                    guid 	    :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
						this.MyGoods = data
                    }
                }) 
			},
			
			edit(id,type){
				if(type==0){
					// 编辑售币订单
					this.$router.push({
						path:"/OTC/edit",
						query:{
							id	:	id,
						}
					});
				}else{
					this.$router.push({
					path:"/OTC/editDemand",
						query:{
							id	:	id,
						}
					});
				}
				
			},
			editDemand(id){
				// 编辑
				this.$router.push({
					path:"/OTC/editDemand",
					query:{
						id	:	id,
					}
				});
			},
		},
		mounted() {
			this.GetMyGoods()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otclist";
</style>