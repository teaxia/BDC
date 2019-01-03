<template>
	<div class="withdrawal padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.withdrawal.title')"></x-header>
        <div class="main-container">
            <flexbox class="line-b earning">
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-benyueshouyi"></i></div>
                        <div>{{$t('discovery.withdrawal.week')}}</div>
                        <div class="myearnings">{{myEarningsByWeek}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-month"></i></div>
                        <div>{{$t('discovery.withdrawal.month')}}</div>
                        <div class="myearnings">{{myEarningsByMonth}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-zongji"></i></div>
                        <div>{{$t('discovery.withdrawal.total')}}</div>
                        <div class="myearnings">{{myEarningsByHistory}}</div>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="center">
                        <div class="font"><i class="iconfont icon-jinlingyingcaiwangtubiao81"></i></div>
                        <div>{{$t('discovery.withdrawal.myEarnings')}}</div>
                        <div class="myearnings">{{myEarnings}}</div>
                    </div>
                </flexbox-item>
            </flexbox>
            <div class="mr20 line-b">
                <group>
                    <x-input type="number" class="test" :title="$t('discovery.withdrawal.money')" v-model="money" :placeholder="$t('discovery.withdrawal.tips.input')"></x-input>
                </group>
                <div class="line-b sbank">
                    <div class="bank wd">
                        {{$t('discovery.withdrawal.bank')}}
                    </div>
                    <Select v-model="cardNo"> 
                        <Option v-for="(item,index) in cardList" :value="item.Id" :key="index">{{ item.cardNo }}{{item.bankName}}</Option>
                    </Select>
                </div>
                <button class="btn btn-block btn-round" @click="submit()">{{$t('discovery.withdrawal.submit')}}</button>
            </div>
            <flexbox class="mr20 sreach">
                <flexbox-item>
                    <DatePicker @on-change="startime" type="date" v-model="stardate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                </flexbox-item>
                <flexbox-item>
                    <DatePicker @on-change="endtime" type="date"  v-model="enddate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
                </flexbox-item>
            </flexbox>
            <div class="mr20">
                <div class="query">
                    <div class="select" :class="type==1?'act':''" @click="select(1)">{{$t('discovery.withdrawal.querywtih')}}</div>
                    <div class="select" :class="type==0?'act':''" @click="select(0)">{{$t('discovery.withdrawal.queryProfit')}}</div>
                </div>
                <div class="mr20">
                    <div v-if="type==0">{{$t('discovery.withdrawal.datewith')}}：{{totalIn}}</div>
                    <div v-if="type==1">{{$t('discovery.withdrawal.dateProfit')}}：{{totalOut}}</div>
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
                                <td :class="v.remarks?'':'line-b height'">{{v.moneyBefore}}</td>
                                <td :class="v.remarks?'':'line-b height'"><span :class="type==0?'red':'green'">{{v.money}}</span></td>
                                <td :class="v.remarks?'':'line-b height'">{{v.moneyAfter}}</td>
                                <td :class="v.remarks?'':'line-b height'">{{v.createTime}}</td>
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
                type        :   0,                  // 0为收益查询 1为提现查询
                money       :   '',
                start       :   '',
                cardList    :   [],                 // 银行卡
                dataList    :   [],                 // 列表数据
                cardNo      :   '',                 // 卡号
                end         :   '',
                stardate    :   '',
                enddate     :   '',
                myEarnings  :   '',                 // 收益余额
                myEarningsByWeek    :   '',         // 本周收益
                myEarningsByMonth   :   '',         // 本月收益
                myEarningsByHistory :   '',         // 总计收益
                totalOut            :   '',         // 查询时间段提现总计
                totalIn             :   '',         // 查询时间段收益总计
                listIn              :   '',         // 获取的收益数据
                listOut             :   '',         // 获取的提现数据
                isok        :   false,
			}
        },
        watch:{
            type(){
                // 账本数据切换
                // 0为收益数据 1为提现数据
                if(this.type==0){
                    // 收益
                    this.dataList = this.listIn
                }
                if(this.type==1){
                    // 提现
                    this.dataList = this.listOut
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
                this.MyEarningsList()
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
                this.MyEarningsList()
            },
            GetInfoMyEarnings(){
                this.$server.post(
                'GetInfo_MyEarnings',
                {
                    guid     :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.cardList   =   data.cardList           // 银行卡数据
                        this.cardNo     =   data.cardList[0].Id     // 默认银行卡
                        this.myEarnings =   data. myEarnings        // 
                        this.myEarningsByHistory    =   data. myEarningsByHistory       // 历史总收益 
                        this.myEarningsByMonth      =   data. myEarningsByMonth        // 月收益
                        this.myEarningsByWeek       =   data. myEarningsByWeek        // 周收益
                    }else{
                        this.GetInfoMyEarnings()
                    }
                })
            },
            submit(){
                // 效验操作
                if(!pattern["Pattern.Positive.Integer.Two.Point"].test(this.money)){
                    this.$vux.toast.show({
                        text: this.$t('discovery.withdrawal.tips.money'),
                        type: 'warn'
                    })
                    return
                }
                // 提现操作
                if(this.isok){
                    return
                }
                this.isok = true
                this.$server.post(
                'Withdraw_MyEarnings',
                {
                    guid     :   this.$storage.get('guid'),
                    Id       :   this.cardNo,
                    money    :   this.money
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
							text: this.$t('global.success'),
							type: 'success'
                        })
                        // 清空输入数据
                        this.money = ''
                        this.isok  = false
                        this.GetInfoMyEarnings()
                    }
                })
            },
            MyEarningsList(){
                // 查询收益账目信息
                this.$server.post(
                'GetInfo_MyEarningsList',
                {
                    guid        :   this.$storage.get('guid'),
                    dtStart     :   this.stardate,
                    dtEnd       :   this.enddate
                }).then(data => {
                    if(data){
                        this.listOut  = data.listOut
                        this.listIn   = data.listIn
                        this.dataList = data.listOut
                        this.totalOut = data.totalOut
                        this.totalIn  = data.totalIn
                    }
                })
            },
            getToday(){
                // 获取今天日期
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                this.stardate = (year+'/'+month+'/'+day);
                this.enddate = (year+'/'+month+'/'+day);
                this.start = (year+'/'+month+'/'+day);
                this.end = (year+'/'+month+'/'+day);
                this.MyEarningsList()
            },
            select(type){
                // 切换类型
                this.type = type
            }
            
		},
		mounted() {
            // 初始化数据
            this.type = 1;
            this.GetInfoMyEarnings()
            this.getToday()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/withdrawal";
</style>