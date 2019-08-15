<template>
	<div class="statistics" v-cloak>
        <flexbox class="time">
            <flexbox-item>
                <DatePicker class="center" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
            </flexbox-item>
            <flexbox-item>
                <DatePicker class="center" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
            </flexbox-item>
            <flexbox-item :span="3">
                <button @click="Query()" class="btn btn-xs btn-block btn-round time-pd">查询</button>
            </flexbox-item>
        </flexbox>
		<div class="content mr20">
            <flexbox class="table" v-if="dataList.length>0">
                <flexbox-item :gutter="1" class="table-th">
                    账户
                </flexbox-item>
                <flexbox-item :span="3" :gutter="1" class="table-th">
                    <b>总成交数量</b>
                </flexbox-item> 
                <flexbox-item :gutter="1" class="table-th">
                    支付宝
                </flexbox-item>
                <flexbox-item :gutter="1" class="table-th">
                    微信
                </flexbox-item>
            </flexbox>
            <flexbox :class="{'table':true,'tb-bg':index%2==0}" v-for="(v,index) in dataList" :key="index">
                <flexbox-item :gutter="1" :class="{'table-td':index!=Dindex-1,'table-last':index==Dindex-1}">
                    {{v.accName}}
                </flexbox-item>
                <flexbox-item :span="3" :gutter="1" :class="{'table-td':index!=Dindex-1,'table-last':index==Dindex-1}">
                    <b>{{v.Total}}</b>
                </flexbox-item>
                <flexbox-item :gutter="1" :class="{'table-td':index!=Dindex-1,'table-last':index==Dindex-1}">
                    {{v.zfbNum}}
                </flexbox-item>
                <flexbox-item :gutter="1" :class="{'table-td':index!=Dindex-1,'table-last':index==Dindex-1}">
                    {{v.wxNum}}
                </flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
	export default {
		name:'report',
		data() {
			return {
                stardate    :   '',
                enddate     :   '',
                Dindex      :   '',         // 数据的最大索引
                dataList    :   [],
			}
		},
		watch:{
			
		},
		methods: {
			getDateToday(){
				// 获取今天日期
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				this.stardate   =   (year+'/'+month+'/'+day)
                this.enddate    =   (year+'/'+month+'/'+day)
            },
            GetOTCZTCal(){
				// 当前订单、历史订单
				this.$server.post(
                'GetOTCZTCal',{
                    guid 	    :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,                     	// 开始时间
                    dtEnd    	:   this.enddate,             		  	// 结束时间
                }).then(data => {
                    if(data){
                        this.Dindex       =     data.length
                        this.dataList     =     data
                    }
                }) 
            },
			Query(){
                // 查询
				this.GetOTCZTCal()
			},
		},
		mounted() {
			this.getDateToday()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/statistics";
</style>