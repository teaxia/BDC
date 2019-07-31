<template>
	<div class="report" v-cloak>
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
        <flexbox class="type mr20">
            <flexbox-item>
                <button :class="{'btn btn-block btn-ground':true,'btn-white':type!=0}" @click="change(0)">个人</button>
            </flexbox-item>
            <flexbox-item>
                <button :class="{'btn btn-block btn-ground':true,'btn-white':type!=1}" @click="change(1)">团队</button>
            </flexbox-item>
            <!-- <RadioGroup v-model="type">
                <Radio label="cn"><span @click="change(0)" class="label-info">个人</span></Radio>
                <Radio label="cw"><span @click="change(1)" class="label-info">团队</span></Radio>
            </RadioGroup> -->
        </flexbox>
		<div class="mr20">
			<div class="report-list mr20" v-for="(v,index) in reportList" :key="index">
                <div class="report-title">
                    <h2>{{v.Date}}</h2>
                </div>
				<div class="report-content">
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.BuyNum')}}</div>
                        <div class="report-view-c">{{v.BuyNum}}</div>
                    </div>
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.SellNumCN')}}</div>
                        <div class="report-view-c cn">{{v.SellNumCN}}</div>
                    </div>
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.SystemJia')}}</div>
                        <div class="report-view-c">{{v.SystemJia}}</div>
                    </div>
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.Profit')}}</div>
                        <div class="report-view-c">{{v.ProfitNum}}</div>
                    </div>
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.SellNumCW')}}</div>
                        <div class="report-view-c cw">{{v.SellNumCW}}</div>
                    </div>
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.SystemJian')}}</div>
                        <div class="report-view-c">{{v.SystemJian}}</div>
                    </div>
                    <div class="report-view">
                        <div class="report-view-t">{{$t('OTC.report.BBDHNum')}}</div>
                        <div class="report-view-c">{{v.BBDHNum}}</div>
                    </div>
                </div>
			</div>
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
                type        :   0,     // 0个人 1团队
                reportList  :   [],
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
            GetOTCBSTable(){
				// 当前订单、历史订单
				this.$server.post(
                'GetOTCBSTable',{
                    guid 	    :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,                     	// 开始时间
                    dtEnd    	:   this.enddate,             		  	// 结束时间
					type		:	this.type
                }).then(data => {
                    if(data){
                        this.reportList     =   data
                    }
                }) 
            },
            change(type){
                // 个人团队切换
                this.type   =   type
            },
			Query(){
                // 查询
				this.GetOTCBSTable()
			},
		},
		mounted() {
			this.getDateToday()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otcreport";
</style>