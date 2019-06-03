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
                        <div class="font"><i class="iconfont icon-jinlingyingcaiwangtubiao81"></i></div>
                        <div>{{$t('discovery.withdrawal.myEarnings')}}</div>
                        <div class="myearnings">{{$numberComma(myEarnings)}}</div>
                    </div>
                </flexbox-item>
            </flexbox>
            <div class="mr20 line-b">
                <group>
                    <x-input class="test" :title="$t('discovery.extract.address')" :show-clear='false' :placeholder="$t('discovery.extract.addresstip')" v-model="addrs">
                        <button slot="right" @click="getCli()" class="btn btn-xs btn-round">{{$t('global.paste')}}</button>
                    </x-input>
                </group>
                <!-- <group>
                    <x-input :type="showtype?'text':'password'" class="test" :title="$t('wallet.tips.safetycode')" v-model="moneyPwd" :placeholder="$t('wallet.tips.inputcode')">
                         <i slot="right" @click="changType()" :class="['iconfont',showtype?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group> -->
                <div class="line-b sbank">
                    <div class="title-psw wd">
                        {{$t('discovery.OTC.sell.security')}}
                    </div>
                    <div class="psw">
                        <div @click="ShowPSW()">
                            <span>{{$t('global.clickinput')}}{{$t('discovery.OTC.sell.security')}}</span>
                        </div>
                    </div>
                </div>
                <group>
                    <x-input type="text" class="test" :title="$t('discovery.withdrawal.money')" v-model="money" :placeholder="$t('discovery.withdrawal.tips.input')"></x-input>
                </group>
                <dir>
                    <!-- <div class="tips"><span class="space">{{$t('discovery.withdrawal.tips.min')}}：</span>200</div> -->
                    <div class="tips"><span class="space">{{$t('discovery.extract.tax')}}：</span>5</div>
                    <div class="tips"><span class="space">{{$t('discovery.withdrawal.tips.reduce')}}：</span>{{$numberComma(amount)}}</div>
                </dir>
                <!-- <div class="line-b sbank">
                    <div class="bank wd">
                        {{$t('discovery.withdrawal.bank')}}
                    </div>
                    <Select v-model="cardNo"> 
                        <Option v-for="(item,index) in cardList" :value="index" :key="index">{{ item.cardNo }}{{item.bankName}}</Option>
                    </Select>
                </div> -->
                <button class="btn btn-block btn-round" @click="confirm()">{{$t('discovery.withdrawal.confirm')}}</button>
            </div>
            <flexbox class="mr20 sreach">
                <flexbox-item>
                    <DatePicker @on-change="startTime" type="date" v-model="startDate" format="yyyy/MM/dd" placement="bottom-start" :placeholder="$t('discovery.bill.begin')"></DatePicker>
                </flexbox-item>
                <flexbox-item>
                    <DatePicker @on-change="endtime" type="date"  v-model="endDate" format="yyyy/MM/dd" placement="bottom-end" :placeholder="$t('discovery.bill.end')"></DatePicker>
                </flexbox-item>
            </flexbox>
            <div class="mr20">
                <div class="query">
                    <div class="select" :class="type==1?'act':''" @click="select(1)">{{$t('discovery.withdrawal.querywtih')}}</div>
                    <div class="select" :class="type==0?'act':''" @click="select(0)">{{$t('discovery.withdrawal.queryProfit')}}</div>
                </div>
                <div class="mr20">
                    <div v-if="type==0">{{$t('discovery.withdrawal.datewith')}}：{{$numberComma(totalIn)}}</div>
                    <div v-if="type==1">{{$t('discovery.withdrawal.dateProfit')}}：{{$numberComma(totalOut)}}</div>
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
        <!-- 绑定银行卡 -->
		<!-- <Modal v-model="bindcard" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.bindbank')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="ok()">{{$t('discovery.withdrawal.tips.bind')}}</button>
			</div>
		</Modal> -->
        <!-- 输入安全密码 -->
		<Modal v-model="showPSwed" :mask-closable="false">
			<div slot="header">
                {{$t('wallet.tips.inputcode')}}
            </div>
			<div class="modal-body security">
                <group>
                    <x-input class="test" :type="showtype?'text':'password'" :title="$t('discovery.OTC.sell.security')" v-model="moneyPwd" :placeholder="$t('global.input')+$t('discovery.OTC.sell.security')">
                        <i slot="right" @click="changType()" :class="['iconfont',showtype?'icon-17yanjing':'icon-Close']"></i>
                    </x-input>
                </group>
            </div>
		</Modal>
        <!-- 二次确认框 -->
		<Modal v-model="show" @on-ok="submit" :closable="false" :ok-text="$t('global.ok')" :cancel-text="$t('global.cancel')" @on-cancel="cancel">
			<div slot="header"></div>
			<div class="modal-body">
                <div>{{$t('discovery.withdrawal.tips.thisTime')}}：{{money}}</div>
                <div>{{$t('discovery.extract.address')}}：{{addrs}}</div>
                <div>{{$t('discovery.withdrawal.tips.reduce')}}：{{amount}}</div>
            </div>
		</Modal>
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
                //cardList    :   [],                 // 银行卡
                dataList    :   [],                 // 列表数据
                //cardNo      :   0,                 // 卡号
                end         :   '',
                startDate   :   '',
                endDate     :   '',
                myEarnings  :   '',                 // 收益余额
                myEarningsByWeek    :   '',         // 本周收益
                myEarningsByMonth   :   '',         // 本月收益
                myEarningsByHistory :   '',         // 总计收益
                totalOut            :   '',         // 查询时间段提现总计
                totalIn             :   '',         // 查询时间段收益总计
                listIn              :   '',         // 获取的收益数据
                listOut             :   '',         // 获取的提现数据
                // bindcard            :   false,         // 是否跳转到绑定银行卡
                show        :   false,
                // cardNoshow  :   '',                 // 显示的卡号
                // bankName    :   '',                 // 显示的银行
                moneyPwd    :   '',                 // 安全密码
                showtype    :   false,		// 切换密码状态
                addrs       :  '',              // 提币地址
                amount      :   0,             // 扣除余额
                showPSwed   :   false,          // 安全码弹出层
                typeed      :   false,          // 安全码眼睛开关
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
            },
            cardNo(){
                this.cardNoshow = this.cardList[this.cardNo].cardNo         // 卡号
                this.bankName = this.cardList[this.cardNo].bankName         // 银行名称
            },
            money(){
                if(this.money>5){
                    this.amount = (this.$math.subtract(this.money,5)).toFixed(8)
                }else{
                    this.amount = 0
                }
            },
            
        },
		methods: {
            startTime(e){
                // 如果结束时间大于选择时间，则结束时间与选择时间一致
                let str = e.replace(/\//g,"");
                let end = this.end.replace(/\//g,"");
                if(str>end){
                    this.start        =  this.end;
                    this.startDate     =  this.end;
                }else{
                    this.start        =  e;
                    this.startDate     =  e;
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
                    this.startDate     =  e;
                }
                this.end = e;
                this.endDate = e;
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
                        // 判断是否绑定银行卡
                        // if(data.cardList.length>0){
                        //     this.cardNoshow = data.cardList[0].cardNo         // 卡号
                        //     this.bankName = data.cardList[0].bankName         // 银行名称
                        // }else{
                        //     this.bindcard = true
                        // }
                        // this.cardList   =   data.cardList           // 银行卡数据
                        this.myEarnings             =   data. myEarnings        // 
                        this.myEarningsByHistory    =   data. myEarningsByHistory      // 历史总收益
                        this.myEarningsByMonth      =   data. myEarningsByMonth        // 月收益
                        this.myEarningsByWeek       =   data. myEarningsByWeek         // 周收益
                    }else{
                        this.GetInfoMyEarnings()
                    }
                })
            },
            confirm(){
                // 去除空格
                this.addrs   =   this.addrs.replace(/\s+/g,"");
                // 效验操作
                if(!pattern["Pattern.Positive.Integer.Two.Point"].test(this.money)){
                    this.$vux.toast.show({
                        text: this.$t('discovery.withdrawal.tips.money'),
                        type: 'warn'
                    })
                    return
                }
                // 提币地址非空验证
                if(this.addrs==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.withdrawal.tips.address'),       // 投票地址不能为空
                        type: 'warn'
                    })
                    return
                }
                // 判断安全码
                if(this.moneyPwd==''){
                    this.$vux.toast.show({
                        text: this.$t('wallet.tips.inputcode'),
                        type: 'warn'
                    })
                    return
                }
                // 判断最低提币是否小于200
                // if(this.money<200){
                //     this.$vux.toast.show({
                //         text: '提币额不能小于200',
                //         type: 'warn'
                //     })
                //     return
                // }
                if(this.money==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.withdrawal.tips.money'),
                        type: 'warn'
                    })
                    return
                }
                // 判断提现额是否大于收益余额
                if(this.money>this.myEarnings){
                    this.$vux.toast.show({
                        text: this.$t('discovery.withdrawal.tips.wawal'),
                        type: 'warn'
                    })
                    return
                }
                this.show = true
            },
            submit(){
                // 提现操作
                this.$server.post(
                'Withdraw_MyEarnings',
                {
                    guid        :   this.$storage.get('guid'),
                    //Id        :   this.cardList[this.cardNo].Id,
                    money       :   this.money,
                    moneyPwd    :   this.moneyPwd,
                    RechargeCode:   this.addrs
                }).then(data => {
                    if(data){
                        this.$vux.toast.show({
							text: this.$t('global.wait'),
							type: 'success'
                        })
                        // 清空输入数据
                        this.money = ''
                        this.GetInfoMyEarnings()
                        this.MyEarningsList()
                    }
                })
            },
            MyEarningsList(){
                // 查询收益账目信息
                this.$server.post(
                'GetInfo_MyEarningsList',
                {
                    guid        :   this.$storage.get('guid'),
                    dtStart     :   this.startDate,
                    dtEnd       :   this.endDate
                }).then(data => {
                    if(data){
                        this.listOut  = data.listOut
                        this.listIn   = data.listIn
                        this.totalOut = data.totalOut
                        this.totalIn  = data.totalIn
                        // 根据当前选择查询类型赋值
                        if(this.type==1){
                            // 提现
                            this.dataList = data.listOut
                        }
                        if(this.type==0){
                            // 收益
                            this.dataList = data.listIn
                        }
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
                this.start = (year+'/'+month+'/'+day);
                this.end = (year+'/'+month+'/'+day);
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
            ShowPSW(){
				// 安全码弹出层
				this.showPSwed = true
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
            this.GetInfoMyEarnings()
            this.getToday()
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/withdrawal";
</style>