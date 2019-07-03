<template>
	<div class="orderList profit" v-cloak>
		<div class="search">
			<search v-model="search" ref="search" @on-blur="Query()" @on-submit="Query()" :placeholder="$t('discovery.OTC.orderlist.SorderId')" position="absolute" :auto-fixed='false'>
			</search>
		</div>
		<div class="pb0">
			<flexbox class="time">
				<flexbox-item>
					<DatePicker class="center" @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
				</flexbox-item>
				<flexbox-item>
					<DatePicker class="center" @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
				</flexbox-item>
			</flexbox>
			<!-- 收益明细 -->
			<div class="total-profit">
				OTC{{$t('discovery.OTC.orderlist.Profit')}}：{{TotalProfit}}（BDC）
			</div>
			<div class="list pb20">
				<!-- 收益明细列比奥 -->
				<div class="order-list-content Profit-list" v-for="(v,index) in ProfitList" v-if="v.OrderId" :key="index"  @click="myOrder(v.OrderId)">
					<flexbox>
						<flexbox-item :span="4">{{$t('discovery.OTC.orderlist.orderId')}}：{{v.OrderId}}</flexbox-item>
						<flexbox-item class="right">
							{{v.CreateTime}}
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item class="order-list-info">
							<div class="total">
								<span class="price">OTC{{$t('discovery.OTC.orderlist.orderType4')}}：<span class="price-important">{{v.Profit}}（BDC）</span></span>
							</div>
							<div class="price-info">
								<span class="buynum">{{$t('discovery.OTC.orderlist.num')}}：<span class="price-important">{{v.BuyNum}}（BDC）</span></span>
							</div>
							<div class="status">
								<span v-if="v.GoodsType==0" class="font font-wran">{{$t('discovery.OTC.type.GoodsType0')}}</span>
								<span v-if="v.GoodsType==1" class="font font-primary">{{$t('discovery.OTC.type.GoodsType1')}}</span>
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
				ProfitList	:	[],					// 收益明细
				TotalProfit	:	'',					// 总收益
			}
		},
		watch:{
			
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
				this.Myprofit()
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
				this.Myprofit()
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
				this.Myprofit()
			},
			
			myOrder(id,status){
				if(status==2){
					this.$router.push({
						path:"/OTC/order",
						query:{
							id		:	id,
						}
					});
				}else{
					this.$router.push({
						path:"/OTC/myOrder",
						query:{
							id	:	id,
							status	:	this.orderType
						}
					});
				}
			},
			
			Myprofit(){
				// 收益明细
				this.$server.post(
                'GetPoundageProfitList',{
                    guid 	    :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,                     	// 开始时间
                    dtEnd    	:   this.enddate,             		  	// 结束时间
                    orderId     :   this.search,            	  		// 订单号
                }).then(data => {
                    if(data){
						
						this.TotalProfit	=	data.TotalProfit		// 总收益
						this.ProfitList		=	data.list				// 收益明细
                    }
                }) 
			},
		},
		mounted() {
			this.getDateToday()
			this.Myprofit();
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otclist";
.profit{
	.list{
		background:#fff;
	}
	.Profit-list{
		box-shadow: 0px 0px 7px 0px
		rgba(47, 58, 82, 0.2);
		.price,.buynum{
			color:#333333 !important;
		}
	}
}

</style>