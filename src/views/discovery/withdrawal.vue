<template>
	<div class="withdrawal padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.withdrawal.title')"></x-header>
        <div class="main-container">
            <flexbox class="line-b earning">
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-benyueshouyi"></i></div>
                        <div>{{$t('discovery.withdrawal.week')}}</div>
                        <div class="myearnings">{{$numberComma(myEarningsByWeek)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-month"></i></div>
                        <div>{{$t('discovery.withdrawal.month')}}</div>
                        <div class="myearnings">{{$numberComma(myEarningsByMonth)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-zongji"></i></div>
                        <div>{{$t('discovery.withdrawal.total')}}</div>
                        <div class="myearnings">{{$numberComma(myEarningsByHistory)}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <!-- <div class="font"><i class="iconfont icon-jinlingyingcaiwangtubiao81"></i></div> -->
                        <div><button class="btn btn-xs btn-round" @click="MyEarningsList()">{{$t('discovery.withdrawal.query')}}</button></div>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox class="mr20 sreach">
                <flexbox-item>
                    <DatePicker type="date" v-model="startDate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                </flexbox-item>
                <flexbox-item>
                    <DatePicker type="date"  v-model="endDate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
                </flexbox-item>
            </flexbox>
            <div class="mr20">
                <div class="query">
                    <div class="select" :class="type==0?'act':''" @click="select(0)">{{$t('discovery.withdrawal.commission')}}</div>
                    <div class="select" :class="type==1?'act':''" @click="select(1)">{{$t('discovery.withdrawal.remuneration')}}</div>
                </div>
                <div class="mr20">
                    <div v-if="type==0">{{$t('discovery.withdrawal.datewith')}}：{{$numberComma(totalFY)}}</div>
                    <div v-if="type==1">{{$t('discovery.withdrawal.dateProfit')}}：{{$numberComma(totalFS)}}</div>
                </div>
                <table class="table mr20" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>{{$t('discovery.withdrawal.moneyBefore')}}</th>
                            <th>{{$t('discovery.withdrawal.moneychange')}}</th>
                            <th>{{$t('discovery.withdrawal.moneyAfter')}}</th>
                            <th>{{$t('discovery.withdrawal.createTime')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="v in dataList">
                            <tr>
                                <td :class="v.remarks?'':'line-b height'">{{$numberComma(v.moneyBefore)}}</td>
                                <td :class="v.remarks?'':'line-b height'">
                                    <span :class="type==0?'red':'green'">
                                        <span v-if="type==0">+{{$numberComma(v.money)}}</span>
                                        <span v-if="type==1&&v.moneyAfter<=v.moneyBefore">-{{$numberComma(v.money)}}</span>
                                    </span>
                                    <span class="red" v-if="type==1&&v.moneyAfter>v.moneyBefore">+{{$numberComma(v.money)}}</span>
                                </td>
                                <td :class="v.remarks?'':'line-b height'">{{$numberComma(v.moneyAfter)}}</td>
                                <td :class="v.remarks?'':'line-b height'">{{$numberComma(v.createTime)}}</td>
                            </tr>
                            <tr>
                               <td colspan="4" class="line-b"><span v-if="v.remarks">{{$t('discovery.withdrawal.remarks')}}：{{v.remarks}}</span></td> 
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
    import pattern from '../../common/utils/pattern'
	export default {
        name:'withdrawal',
		data() {
			return {
                type        :   0,                  // 0为返佣查询 1为反水查询
                dataList    :   [],                 // 列表数据
                startDate   :   '',
                endDate     :   '',
                myEarningsByWeek    :   '',         // 本周收益
                myEarningsByMonth   :   '',         // 本月收益
                myEarningsByHistory :   '',         // 总计收益
                totalFY             :   '',         // 查询时间段返佣总计
                totalFS             :   '',         // 查询时间段反水总计
                listFY              :   '',         // 获取的返佣数据
                listFS              :   '',         // 获取的反水数据
			}
        },
        watch:{
            type(){
                // 账本数据切换
                // 0为反佣数据 1为反水数据
                if(this.type==0){
                    // 返佣
                    this.dataList = this.listFY
                }
                if(this.type==1){
                    // 反水
                    this.dataList = this.listFS
                }
            },
        },
		methods: {
            
            MyEarningsList(){
                // 查询收益账目信息
                this.$server.post(
                'GetMyBackMoney',
                {
                    guid        :   this.$storage.get('guid'),
                    dtStart     :   this.startDate,
                    dtEnd       :   this.endDate
                }).then(data => {
                    if(data){
                        this.myEarningsByWeek       =   data.myEarningsByWeek
                        this.myEarningsByMonth      =   data.myEarningsByMonth
                        this.myEarningsByHistory    =   data.myEarningsByHistory
                        this.totalFY                =   data.totalFY
                        this.totalFS                =   data.totalFS
                        this.listFY                 =   data.listFY
                        this.listFS                 =   data.listFS
                        this.dataList               =   (this.type==0)?data.listFY:data.listFS;
                    }
                })
            },
            getToday(){
                // 获取今天日期
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                this.startDate = (year+'/'+month+'/'+day);
                this.endDate = (year+'/'+month+'/'+day);
                // this.start = (year+'/'+month+'/'+day);
                // this.end = (year+'/'+month+'/'+day);
                this.MyEarningsList()
            },
            select(type){
                // 切换类型
                this.type = type
            },
            ok(){
                // 跳转到绑卡页面
                this.$router.push({
					path:"/mine/mycard",
				});
            },
            cancel () {
                this.modal = false;
            },
            changType(){
                // 切换密码状态
                this.showtype = !this.showtype
            },
            getCli(){
                // 粘贴
                var clipBoard = api.require('clipBoard');
                var that = this
                clipBoard.get(function(ret, err) {
                    if (ret) {
                        let addresss = ret
                        that.addrs = addresss.value
                    }
                });
            }
		},
		mounted() {
            // 初始化数据
            this.type = 1;
            // this.GetInfoMyEarnings()
            this.getToday()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/withdrawal";
</style>