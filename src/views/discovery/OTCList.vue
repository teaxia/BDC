<template>
	<div class="orderList margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" title="订单记录"></x-header>
		<Affix :offset-top="50">
			<tab class="tab">
				<tab-item class="tab-item" :selected="orderType==0" @on-item-click="onItemClick">售币</tab-item>
				<tab-item class="tab-item" :selected="orderType==1" @on-item-click="onItemClick">求购</tab-item>
				<tab-item class="tab-item" :selected="orderType==2" @on-item-click="onItemClick">已购</tab-item>
				<tab-item class="tab-item" :selected="orderType==3" @on-item-click="onItemClick">已售</tab-item>
			</tab>
		</Affix>
		<div class="search" v-if="orderType>1">
			<search v-model="search" ref="search" @on-blur="Query()" @on-submit="Query()" placeholder="订单号搜索" position="absolute" :auto-fixed='false'>
			</search>
		</div>
		<div class="pb20">
			<v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
			<flexbox class="time" v-if="orderType>1">
				<flexbox-item>
					<DatePicker @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
				</flexbox-item>
				<flexbox-item>
					<DatePicker @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
				</flexbox-item>
			</flexbox>
			<div class="goods-list" v-if="orderType==0||orderType==1">
				<div class="otc-item" @click="edit(v.Id)" v-for="(v,index) in MySellOrder" v-if="v.Id" :key="index">
                    <v-grid class="otc-grid">
                        <div class="otc-grid-title">
							<svg class="smallicon" aria-hidden="true" v-if="$currency.indexOf(v.currenyName)>=0">
								<use :xlink:href="`#icon-`+v.currenyName"></use>
							</svg>
							<Avatar size="small" v-else style="background:#f56a00;">
								<span class="line-height">{{v.currenyName}}</span>
							</Avatar>
                            <div class="grid-username">{{v.currenyName}}</div>
                            <div class="grid-info">{{v.CreateTime}}</div>
                        </div>
                        <div class="otc-grid-main">
                            <div class="v-flex">
                                <div class="otc-grid-price">
                                    <div class="price">
                                        {{$numberComma(v.price)}}CNY
                                    </div>
                                    <div class="otc-price">
                                        <div>出售数量：{{$numberComma(v.currenyNum)}}（{{v.currenyName}}）</div>
                                        <div>已售数量：{{$numberComma(v.sellNum)}} （{{v.currenyName}}）</div>
                                    </div>
                                </div>
                                <div class="otc-grid-pay">
                                    <div class="otc-grid-paylist">
                                        <div v-if="v.Status==-1" class="tag tag-error">
                                            下架
                                        </div>
                                        <div v-if="v.Status==0" class="tag tag-success">
                                            上架
                                        </div>
                                        <div v-if="v.Status==2" class="tag tag-wran">
                                            锁定
                                        </div>
                                    </div>
                                    <div class="otc-grid-right">
                                        <i class="iconfont icon-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-grid>
                </div>
				<div v-else class="nodata">
					没有数据
				</div>
			</div>


			<div class="list" v-if="orderType==2">
				<!-- 已购订单 -->
				<div class="order-list-content" v-for="(v,index) in BuyOrder" v-if="v.Id" :key="index" @click="myOrder(v.Id,v.status,v.SellOrderId)">
					<flexbox>
						<flexbox-item>订单号：{{v.Id}}</flexbox-item>
						<flexbox-item class="right">{{v.CreateTime}}</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item span='38'>
							<svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(v.currenyName)>=0">
								<use :xlink:href="`#icon-`+v.currenyName"></use>
							</svg>
							<Avatar v-else class="sicon avatar" style="background:#f56a00;">
								<span class="line-height">{{v.currenyName}}</span>
							</Avatar>
						</flexbox-item>
						<flexbox-item class="order-list-info">
							<div>数量：{{v.BuyNum}}（{{v.currenyName}}）</div>
							<div>单价：{{v.price}} 总价：{{v.TotalPay}}（CNY）</div>
						</flexbox-item>
						<flexbox-item span='58' class="order-list-type">
							<span class="order-list-type-waitpay" v-if="v.status==2">待支付</span>
							<span class="order-list-type-wait" v-if="v.status==3">待发币</span>
							<!-- <span class="order-list-type-get" v-if="v.status==4">已发币</span> -->
							<span class="order-list-type-success" v-if="v.status==5">交易完成</span>
							<span class="order-list-type-close" v-if="v.status==6||v.status==7">取消订单</span>
						</flexbox-item>
					</flexbox>
				</div>
				<div v-else class="nodata">
					没有数据
				</div>
			</div>

			<div class="list" v-if="orderType==3">
				<!-- 已售订单 -->
				<div class="order-list-content" v-for="(v,index) in SellOrder" v-if="v.Id" :key="index" @click="myOrder(v.Id)">
					<flexbox>
						<flexbox-item>订单号：{{v.Id}}</flexbox-item>
						<flexbox-item class="right">{{v.CreateTime}}</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item span='38'>
							<svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(v.currenyName)>=0">
								<use :xlink:href="`#icon-`+v.currenyName"></use>
							</svg>
							<Avatar v-else class="sicon avatar" style="background:#f56a00;">
								<span class="line-height">{{v.currenyName}}</span>
							</Avatar>
						</flexbox-item>
						<flexbox-item class="order-list-info">
							<div>数量：{{v.BuyNum}}（{{v.currenyName}}）</div>
							<div>单价：{{v.price}} 总价：{{v.TotalPay}}（CNY）</div>
						</flexbox-item>
						<flexbox-item span='58' class="order-list-type">
							<span class="order-list-type-waitpay" v-if="v.status==2">待支付</span>
							<span class="order-list-type-wait" v-if="v.status==3">待收款</span>
							<!-- <span class="order-list-type-get" v-if="v.status==4">已发币</span> -->
							<span class="order-list-type-success" v-if="v.status==5">交易完成</span>
							<span class="order-list-type-close" v-if="v.status==6||v.status==7">取消订单</span>
						</flexbox-item>
					</flexbox>
				</div>
				<div v-else class="nodata">
					没有数据
				</div>
			</div>
			</v-touch>
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
				orderType	:	'',					// 订单类型
				dataList	:	[],					// 商品类型的数据
				BuyOrder	:	[],					// 已购
				SellOrder	:	[],					// 已售
				MySellOrder	:	[],					// 售币列表
			}
		},
		watch:{
			orderType(){
				switch(this.orderType){
					case 0:			// 售币
						this.GetMySellOrder()
					break;			
					case 1:			// 求购
						// this.OTCGetSellList()
					break;
					case 2:			// 已购			
						this.getMyBuyOrder()
					break;
					case 3:			// 已售
						this.MyOrderSelled()
					break;
				}
			}
		},
		methods: {
			startime(e){
                // 如果结束时间大于选择时间，则结束时间与选择时间一致
                let str = e.replace(/\//g,"");
                let end = this.end.replace(/\//g,"");
                if(str>end){
                    this.start        =  this.end;
                    this.stardate     =  this.end;
                }else{
                    this.start        =  e;
                    this.stardate     =  e;
                }
                // 限制某一项日期为空的话，不操作
                if(this.start==''||this.end==''){
                    return;
				}
				this.sQuery(this.orderType)
            },
            endtime(e){
                // 如果结束时间大于选择时间，则结束时间与选择时间一致
                let end = e.replace(/\//g,"");
                let str = this.start.replace(/\//g,"");
                if(str>end){
                    this.start        =  e;
                    this.stardate     =  e;
                }
                this.end = e;
                this.enddate = e;
                // 限制某一项日期为空的话，不操作
                if(this.start==''||this.end==''){
                    return;
				}
				this.sQuery(this.orderType)
			},
			getDateToday(){
				// 获取今天日期
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let Yestsweek = new Date(date.getTime() - 144*60*60*1000);
				let Yestmonth = Yestsweek.getMonth() + 1
				let Yestday = Yestsweek.getDate()
				this.stardate = (year+'/'+Yestmonth+'/'+Yestday)
				this.enddate = (year+'/'+month+'/'+day)
				this.start = (year+'/'+Yestmonth+'/'+Yestday)
				this.end = (year+'/'+month+'/'+day)
			},
			Query(){
				this.sQuery(this.orderType)
			},
			onItemClick (index) {
				// 索引0：售币 1：求购 2：已购 3：已售
				this.orderType = index
			},
			OTCGetSellList(){
                this.$server.post(
                'OTC_GetSellList',{
                    guid 	    :   this.$storage.get('guid'),
                    query       :   -2,                     // (排序：-1时间降序，1时间升序，-2单价降序，2单价升序。默认传2)
                    pageSize    :   6,             			// (每页行数)
                    pageIndex   :   1,              		// 当前页数，第一页传1
                }).then(data => {
                    if(data){
						this.dataList  = data.list
                    }
                })    
			},
			myOrder(id,status,sellOrder){
				if(status==2){
					this.$router.push({
						path:"/discovery/OTC/order",
						query:{
							id		:	sellOrder,
						}
					});
				}else{
					this.$router.push({
						path:"/discovery/OTC/myOrder",
						query:{
							id	:	id,
							status	:	this.orderType
						}
					});
				}
			},
			getMyBuyOrder(){
				// 已购订单
				this.$server.post(
                'OTC_MyOrder_Buyed',{
                    guid 	    :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,                     	// 开始时间
                    dtEnd    	:   this.enddate,             		  	// 结束时间
                    orderId     :   this.search,            	  		// 订单号
                }).then(data => {
                    if(data){
						this.BuyOrder	=	data
                    }
                }) 
			},
			MyOrderSelled(){
				// 已售订单
				this.$server.post(
                'OTC_MyOrder_Selled',{
                    guid 	    :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,                     	// 开始时间
                    dtEnd    	:   this.enddate,             		  	// 结束时间
                    orderId     :   this.search,            	  		// 订单号
                }).then(data => {
                    if(data){
						this.SellOrder	=	data
                    }
                }) 
			},
			GetMySellOrder(){
				// 售币订单
				this.$server.post(
                'OTC_GetMySellOrder',{
                    guid 	    :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
						console.log(data)
						this.MySellOrder = data
                    }
                }) 
			},
			edit(id){
				// 编辑在售订单
				this.$router.push({
					path:"/discovery/OTC/edit",
					query:{
						id	:	id,
					}
				});
			},
			sQuery(type){
				// 执行查询按钮 传类型
				switch(type){
					case 0:			// 售币
						this.GetMySellOrder()
					break;			
					case 1:			// 求购
						// this.OTCGetSellList()
					break;
					case 2:			// 已购			
						this.getMyBuyOrder()
					break;
					case 3:			// 已售
						this.MyOrderSelled()
					break;
				}
			},
			onSwipeLeft(){
				// 手势滑动 向左边滑动
				if(this.orderType!=0){
					this.orderType--
				}
			},
			onSwipeRight(){
				// 手势滑动	向右边滑动
				if(this.orderType!=3){
					this.orderType++
				}
			}
		},
		mounted() {
			this.getDateToday()
			this.orderType = 0
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otclist";
</style>