<template>
	<div class="orderList margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back'),preventGoBack:true}" @on-click-back="Goback()" :title="$t('discovery.OTC.orderlist.title')">
			<div slot="right">
                <router-link to="/discovery/OTC/complaiontList">
                    <span class="right">{{$t('discovery.OTC.complaiont.title')}}</span>
                </router-link>
            </div>
		</x-header>
		<Affix :offset-top="50">
			<tab class="tab">
				<tab-item class="tab-item" :selected="orderType==0" @on-item-click="onItemClick">{{$t('discovery.OTC.orderlist.orderType0')}}</tab-item>
				<tab-item class="tab-item" :selected="orderType==1" @on-item-click="onItemClick">{{$t('discovery.OTC.orderlist.orderType1')}}</tab-item>
				<tab-item class="tab-item" :selected="orderType==2" @on-item-click="onItemClick">{{$t('discovery.OTC.orderlist.orderType2')}}</tab-item>
				<tab-item class="tab-item" :selected="orderType==3" @on-item-click="onItemClick">{{$t('discovery.OTC.orderlist.orderType3')}}</tab-item>
				<tab-item class="tab-item" :selected="orderType==4" @on-item-click="onItemClick">{{$t('discovery.OTC.orderlist.orderType4')}}</tab-item>
			</tab>
		</Affix>
		<div class="search" v-if="orderType>1">
			<search v-model="search" ref="search" @on-blur="Query()" @on-submit="Query()" :placeholder="$t('discovery.OTC.orderlist.SorderId')" position="absolute" :auto-fixed='false'>
			</search>
		</div>
		<div class="pb20">
			<v-touch :swipe-options="{direction: 'horizontal'}" v-on:swipeleft="onSwipeRight" v-on:swiperight="onSwipeLeft">
			<flexbox class="time" v-if="orderType>1">
				<flexbox-item>
					<DatePicker @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
				</flexbox-item>
				<flexbox-item>
					<DatePicker @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
				</flexbox-item>
			</flexbox>
			
			<div class="goods-list" v-if="orderType==0">
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
                                        {{$t('discovery.OTC.orderlist.price')}}：{{$numberComma(v.price)}}CNY
                                    </div>
                                    <div class="otc-price">
                                        <div>{{$t('discovery.OTC.orderlist.total')}}：{{$numberComma(v.currenyNum)}}（{{v.currenyName}}）</div>
                                        <div>{{$t('discovery.OTC.orderlist.sellnum')}}：{{$numberComma(v.sellNum)}} （{{v.currenyName}}）</div>
                                    </div>
                                </div>
                                <div class="otc-grid-pay">
                                    <div class="otc-grid-paylist">
                                        <div v-if="v.Status==-1" class="tag tag-error">
                                            {{$t('discovery.OTC.type.type01')}}
                                        </div>
                                        <div v-if="v.Status==0" class="tag tag-success">
                                            {{$t('discovery.OTC.type.type0')}}
                                        </div>
                                        <div v-if="v.Status==2" class="tag tag-wran">
                                            {{$t('discovery.OTC.type.type2')}}
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
				<!-- 售币订单 -->
			</div>

			<div class="goods-list" v-if="orderType==1">
				<div class="otc-item" @click="editDemand(v.Id)" v-for="(v,index) in MyBuyOrder" v-if="v.Id" :key="index">
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
                                        {{$t('discovery.OTC.orderlist.oprice')}}：{{$numberComma(v.price)}}CNY
                                    </div>
                                    <div class="otc-price">
                                        <div>{{$t('discovery.OTC.orderlist.neednum')}}：{{$numberComma(v.currenyNum)}}（{{v.currenyName}}）</div>
                                        <!-- <div>已售数量：{{$numberComma(v.sellNum)}} （{{v.currenyName}}）</div> -->
                                    </div>
                                </div>
                                <div class="otc-grid-pay">
                                    <div class="otc-grid-paylist">
                                        <div v-if="v.Status==-1" class="tag tag-error">
                                            {{$t('discovery.OTC.type.type01')}}
                                        </div>
                                        <div v-if="v.Status==0" class="tag tag-success">
                                            {{$t('discovery.OTC.type.type0')}}
                                        </div>
                                        <div v-if="v.Status==2" class="tag tag-wran">
                                            {{$t('discovery.OTC.type.type2')}}
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
				<!-- 求购订单 -->
			</div>

			<div class="list" v-if="orderType==2">
				<!-- 已购订单 -->
				<div class="order-list-content" v-for="(v,index) in BuyOrder" v-if="v.Id" :key="index" @click="myOrder(v.Id,v.status)">
					<flexbox>
						<flexbox-item :span="4">{{$t('discovery.OTC.orderlist.orderId')}}：{{v.Id}}</flexbox-item>
						<flexbox-item :span="2"><span v-if="v.GoodsType==0" class="tag tag-wran">{{$t('discovery.OTC.type.GoodsType0')}}</span><span v-if="v.GoodsType==1" class="tag tag-primary">{{$t('discovery.OTC.type.GoodsType1')}}</span></flexbox-item>
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
							<div>
								<span class="price">{{$t('discovery.OTC.orderlist.oprice')}}：{{v.price}}（CNY）</span>
								<span class="buynum">{{$t('discovery.OTC.orderlist.num')}}：{{v.BuyNum}}（{{v.currenyName}}）</span>
							</div>
							<div>
								<span class="total">{{$t('discovery.OTC.orderlist.totalprice')}}：{{v.TotalPay}}（CNY）</span>
							</div>
						</flexbox-item>
						<flexbox-item span='58' class="order-list-type">
							<span class="order-list-type-waitpay" v-if="v.status==2">{{$t('discovery.OTC.status.status2')}}</span>
							<span class="order-list-type-wait" v-if="v.status==3">{{$t('discovery.OTC.status.status3')}}</span>
							<!-- <span class="order-list-type-get" v-if="v.status==4">已发币</span> -->
							<span class="order-list-type-success" v-if="v.status==5">{{$t('discovery.OTC.status.status5')}}</span>
							<span class="order-list-type-close" v-if="v.status==6||v.status==7">{{$t('discovery.OTC.status.status6')}}</span>
							<span class="order-list-type-success" v-if="v.status==8">{{$t('discovery.OTC.status.status7')}}</span>
						</flexbox-item>
					</flexbox>
				</div>
			</div>

			<div class="list" v-if="orderType==3">
				<!-- 已售订单 -->
				<div class="order-list-content" v-for="(v,index) in SellOrder" v-if="v.Id" :key="index" @click="myOrder(v.Id)">
					<flexbox>
						<flexbox-item :span="4">{{$t('discovery.OTC.orderlist.orderId')}}：{{v.Id}}</flexbox-item>
						<flexbox-item :span="2"><span v-if="v.GoodsType==0" class="tag tag-wran">{{$t('discovery.OTC.type.GoodsType0')}}</span><span v-if="v.GoodsType==1" class="tag tag-primary">{{$t('discovery.OTC.type.GoodsType1')}}</span></flexbox-item>
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
							<div>
								<span class="price">{{$t('discovery.OTC.orderlist.oprice')}}：{{v.price}}（CNY）</span>
								<span class="buynum">{{$t('discovery.OTC.orderlist.num')}}：{{v.BuyNum}}（{{v.currenyName}}）</span>
							</div>
							<div>
								<span class="total">{{$t('discovery.OTC.orderlist.totalprice')}}：{{v.TotalPay}}（CNY）</span>
							</div>
						</flexbox-item>
						<flexbox-item span='58' class="order-list-type">
							<span class="order-list-type-waitpay" v-if="v.status==2">{{$t('discovery.OTC.status.status2')}}</span>
							<span class="order-list-type-wait" v-if="v.status==3">{{$t('discovery.OTC.status.status3')}}</span>
							<!-- <span class="order-list-type-get" v-if="v.status==4">已发币</span> -->
							<span class="order-list-type-success" v-if="v.status==5">{{$t('discovery.OTC.status.status5')}}</span>
							<span class="order-list-type-close" v-if="v.status==6||v.status==7">{{$t('discovery.OTC.status.status6')}}</span>
							<span class="order-list-type-success" v-if="v.status==8">{{$t('discovery.OTC.status.status7')}}</span>
						</flexbox-item>
					</flexbox>
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
				MyBuyOrder	:	[],					// 求购列表
			}
		},
		watch:{
			orderType(){
				switch(this.orderType){
					case 0:			// 售币
						this.GetMySellOrder()
					break;			
					case 1:			// 求购
						this.GetMyDemand()
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
                'OTC_GetSellGoodsList',{
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
			myOrder(id,status){
				if(status==2){
					this.$router.push({
						path:"/discovery/OTC/order",
						query:{
							id		:	id,
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
                'OTC_MyOrder_Buy',{
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
                'OTC_MyOrder_Sell',{
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
			GetMyDemand(){
				// 获取求购发布列表
				this.$server.post(
                'OTC_GetMyBuyGoods',{
                    guid 	    :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
						this.MyBuyOrder	=	data
                    }
                }) 
			},
			GetMySellOrder(){
				// 售币订单
				this.$server.post(
                'OTC_GetMySellGoods',{
                    guid 	    :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
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
			editDemand(id){
				// 编辑
				this.$router.push({
					path:"/discovery/OTC/editDemand",
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
						this.GetMyDemand()
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
			},
			Goback(){
				this.$router.push({
					path:"/discovery/OTC/",
				});
			},
		},
		mounted() {
			this.getDateToday()
			this.orderType = (this.$route.query.type)?this.$route.query.type:0;
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otclist";
</style>