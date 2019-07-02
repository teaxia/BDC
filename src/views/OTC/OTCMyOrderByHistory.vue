<template>
	<div class="orderList" v-cloak>
		<div class="search">
			<search v-model="search" ref="search" @on-blur="Query()" @on-submit="Query()" :placeholder="$t('discovery.OTC.orderlist.SorderId')" position="absolute" :auto-fixed='false'>
			</search>
		</div>
        <flexbox class="time">
            <flexbox-item>
                <DatePicker class="center" @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
            </flexbox-item>
            <flexbox-item>
                <DatePicker class="center" @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
            </flexbox-item>
        </flexbox>
		<div class="pb20">
			<div class="list">
				<!-- 当前订单 -->
				<div class="order-list-content" v-for="(v,index) in MyOrder" v-if="v.Id" :key="index" @click="myOrder(v.Id,v.status,v.cType)">
					<flexbox>
						<flexbox-item :span="4">{{$t('discovery.OTC.orderlist.orderId')}}：{{v.Id}}</flexbox-item>
						<flexbox-item class="right">
							{{v.CreateTime}}
						</flexbox-item>
					</flexbox>
					<flexbox>
						<flexbox-item span='60'>
							<svg class="sicon mr-cent" aria-hidden="true" v-if="$currency.indexOf(v.currenyName)>=0">
								<use :xlink:href="`#icon-`+v.currenyName"></use>
							</svg>
							<Avatar v-else class="sicon avatar" style="background:#f56a00;">
								<span class="line-height">{{v.currenyName}}</span>
							</Avatar>
							<div class="grid-username">{{v.currenyName}}</div>
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
								￥{{v.TotalPay}}
							</div>
							<div>
								<span class="price">{{$t('discovery.OTC.orderlist.oprice')}}：￥{{v.price}}</span>
							</div>
							<div class="status">
								<span class="buynum">{{$t('discovery.OTC.orderlist.num')}}：{{v.BuyNum}}（{{v.currenyName}}）</span>
								<span class="font order-list-type-waitpay" v-if="v.status==2">{{$t('discovery.OTC.status.status2')}}</span>
								<span class="font order-list-type-wait" v-if="v.status==3">{{$t('discovery.OTC.status.status3')}}</span>
								<span class="font order-list-type-success" v-if="v.status==5">{{$t('discovery.OTC.status.status5')}}</span>
								<span class="font order-list-type-close" v-if="v.status==6||v.status==7">{{$t('discovery.OTC.status.status6')}}</span>
								<span class="font order-list-type-success" v-if="v.status==8">{{$t('discovery.OTC.status.status7')}}</span>
								<span class="font order-list-type-close" v-if="v.status==9">{{$t('discovery.OTC.status.status8')}}</span>
							</div>
						</flexbox-item>
					</flexbox>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { types } from 'util';
	export default {
		name:'OTCList',
		data() {
			return {
				start		:	'',
				end			:	'',
				stardate    :   '',
				enddate     :   '',
				search		:	'',					// 搜索订单号
				MyOrder		:	[],					// 当前订单、历史订单
				type		:	'ls',					// 当前订单"dq"，历史订单"ls"，申诉订单"ss"
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
				this.MyOrderByType()
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
				this.MyOrderByType()
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
				this.MyOrderByType()
			},
			myOrder(id,status,type){
				// 订单页跳转
				if(status==2){
					// 待支付状态
					this.$router.push({
						path:"/OTC/order",
						query:{
							id		:	id,
						}
					});
				}else{
					// 其他状态
					// status传参 2是已购 3是已售
					// "buy"对应“已购”列表,"sell"对应”已售”
					let status = (type=='buy')?2:3;
					// console.log(type)
					this.$router.push({
						path:"/OTC/myOrder",
						query:{
							id		:	id,
							status	:	status,
							type	:	type
						}
					});
				}
			},
			MyOrderByType(){
				// 当前订单、历史订单
				this.$server.post(
                'OTC_MyOrderByType',{
                    guid 	    :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,                     	// 开始时间
                    dtEnd    	:   this.enddate,             		  	// 结束时间
					orderId     :   this.search,            	  		// 订单号
					type		:	this.type
                }).then(data => {
                    if(data){
						this.MyOrder	=	data
                    }
                }) 
			},
			
			edit(id){
				// 编辑在售订单
				this.$router.push({
					path:"/OTC/edit",
					query:{
						id	:	id,
					}
				});
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
			sQuery(type){
				// 执行查询按钮 传类型
				this.MyOrderByType()
			},
		},
		mounted() {
			this.getDateToday()
			this.MyOrderByType()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otclist";
</style>