<template>
	<div class="btob padding-footer margin-header" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('discovery.btob.title')"></x-header>
        <div class="main-container">
            <div class="title">
                {{$t('discovery.btob.changtype')}}：
                <Select v-model="act" class="select">
                    <Option v-for="(item,index) in blist" :value="index" :key="index">{{ item.Name }}</Option>
                </Select>
            </div>
            <div class="mr50">
                <v-grid>
                    <div class="pd-lb20">
                        <flexbox class="vux-1px-b pb">
                            <flexbox-item :span="4">
                                <svg class="sicon" aria-hidden="true">
                                    <use :xlink:href="`#icon-`+actBB"></use>
                                </svg>
                                <span class="bdc">{{actBB}}</span>
                            </flexbox-item>
                            <flexbox-item class="bdc">
                                {{$t('discovery.btob.proportion')}}：1:{{$numberComma(proportion)}}
                            </flexbox-item>
                        </flexbox>
                        <flexbox class="mr20 pb">
                            <flexbox-item :span="6">
                                <input type="text" v-model="num" :placeholder="$t('discovery.btob.num')"/>
                            </flexbox-item>
                            <flexbox-item>
                                <div class="price">{{$numberComma(price)}}(BDC)</div>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </v-grid>
            </div>
            <div class="mr20">
                <flexbox class="vux-1px-b pb">
                    <flexbox-item :span="2">
                        {{$t('discovery.btob.address')}}:
                    </flexbox-item>
                    <flexbox-item :span="8">
                        <div class="text">{{this.address}}</div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="copy" @click="CopyClip(address)">{{$t('wallet.receive.copy')}}</div>
                    </flexbox-item>
                </flexbox>
            </div>
            <button @click="submit()" class="btn btn-block btn-round mr40">{{$t('discovery.btob.submit')}}</button>
            <div class="get-last-dt" v-if="GetDTList.OutCurrency">
                <div class="title">{{$t('discovery.btob.history')}}</div>
                <flexbox class="div">
                    <flexbox-item class="div-left">
                        {{$numberComma(GetDTList.OutCurrency)}}
                    </flexbox-item>
                    <flexbox-item class="div-right">
                        {{GetDTList.CreateTime}}
                    </flexbox-item>
                </flexbox>
                <flexbox class="div">
                    <flexbox-item class="div-left">
                        {{$numberComma(GetDTList.BDCNum)}}
                    </flexbox-item>
                    <flexbox-item class="div-right">
                        {{GetDTList.Status}}
                    </flexbox-item>
                </flexbox>
                <flexbox class="div">
                    <flexbox-item class="div-left">
                        {{GetDTList.Address}}
                    </flexbox-item>
                </flexbox>
            </div>
            <div class="select_day">
                <button :class="{'btn':true,'btn-xs':true,'btn-error':Query=='周'}" @click="sQuery('week')">{{$t('discovery.btob.week')}}</button>
                <button :class="{'btn':true,'btn-xs':true,'btn-error':Query=='月'}" @click="sQuery('month')">{{$t('discovery.btob.month')}}</button>
                <button :class="{'btn':true,'btn-xs':true,'btn-error':Query=='季'}" @click="sQuery('season')">{{$t('discovery.btob.season')}}</button>
                <button :class="{'btn':true,'btn-xs':true,'btn-error':Query=='年'}" @click="sQuery('year')">{{$t('discovery.btob.year')}}</button>
            </div>
            <div id="main" :style="{width:'100%',height:'5.7rem',margin:'0 auto'}"></div>
        </div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
    var echarts = require('echarts')
    // 引入K线图
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
	import { clipBoard } from '../../common/mixins/clipBoard'
	export default {
		mixins:[clipBoard],
        name:'btob',
		data() {
			return {
                act         :   0,
                blist       :   [],
                actBB       :   'BTC',
                num         :   '',
                address     :   '',
                proportion  :   '',
                price       :   '',
                // isok        :   false,
                currency    :   [],
                bbName      :   '',
                key         :   '',
                myChart     :   '',             // 图表实例
                Query       :   '周',           // 查询条件
                Kdata       :   [],             // K线数据
                TimeDay     :   [],             // y轴卓坐标
                LeftMargin  :   55,             // 左侧间距大小
                LastBot     :   '周',             // 上一次点击的按钮
                GetDTList   :  [],
			}
        },
        watch:{
            act(){
                this.num        =   ''
                this.price      =   ''
                let i           =   this.act
                this.address    =   this.blist[i].RechargeAddress
                this.proportion =   this.blist[i].Proportion
                this.actBB      =   this.blist[i].Name
                this.GetCurrenyPrice()
            },
            num(){
                let i           =   this.act
                this.num = (this.num<0)?0:this.num;
                this.price = (this.num*this.blist[i].Proportion).toFixed(8);
            },
        },
		methods: {
            submit(){
                // 获取详情
                // if(this.isok){
                //     return
                // }
                if(this.num==''){
                    this.$vux.toast.show({
                        text: this.$t('discovery.btob.null'),
                        type: 'warn'
                    })
                    return
                }
                this.$server.post(
                'AddRechargeByBB',
                {
                    guid 	        :   this.$storage.get('guid'),
                    // @使用key代替
                    // CurrencyNum     :   this.price,                          // 价格
                    key             :   this.key,
                    OutCurrencyNum  :   this.num,
                    CurrencyName    :   this.blist[this.act].Name,
                    RechargeAddress :   this.address
                }).then(data => {
                    if(data){
                        this.GetLastDT()
                        this.$vux.toast.show({
                            text: this.$t('global.wait'), 
                            type: 'success'
                        })
                        this.num = ''
                        // this.isok = false;
                    }
                })
            },
            GetList(){
                this.$server.post(
                'GetBBInfoNew',
                {
                    guid 	        :   this.$storage.get('guid'),
                }).then(data => {
                    if(data){
                        this.blist      = data.list;
                        this.address    = data.list[0].RechargeAddress;            // 兑换地址
                        this.proportion = data.list[0].Proportion;                 // 兑换比例
                        this.key        = data.key
                        this.bTb(this.bbName)
                        
                    }
                })
            },
            bTb(name){
                // 默认币种兑换
                // 获取该币种的索引
                let item = this.blist.findIndex(item=>{
                    return item.Name == name
                })
                // 判断该币种是否存在，-1表示不存在
                if(item>-1){
                    // 币种索引正常
                    // 把索引传值给act选择索引
                    this.act = item
                    // 把币种名称传值给选择币种
                    this.actBB = name
                }else{
                    // 没有该币种，默认BTC
                    this.act = 0
                    this.actBB = 'BTC'
                }
                
            },
            echarts(){
                // 初始化图标
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                var _this = this
                myChart.setOption({
                    // 背景渐变色
                    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                        offset: 0,
                        color: '#3a3949'
                    }, {
                        offset: 1,
                        color: '#a2a2a7'
                    }]),
                    title: {
                        // text: '币种近期走势图',
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: _this.TimeDay,
                        axisLabel: {  
                            interval:0,  
                            rotate:35,
                            textStyle: {
                                color: '#fff',
                                fontSize : 8
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(255,255,255,.2)',
                                width:'0.1'//坐标线的宽度
                            },
                            
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['white'],
                                width: 0.5,
                                type: 'solid',
                                opacity :0.2,
                            }
                        }
                    },
                    yAxis: {
                        type    : 'value',
                        scale   : true,
                        name    : 'USD',
                        axisLabel: {  
                            textStyle: {
                                color: '#fff',
                                fontSize : 8
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'dotted',
                                color: 'rgba(255,255,255,.8)',
                                width:'1'//坐标线的宽度
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['white'],
                                width: 0.5,
                                type: 'solid',
                                opacity :0.2,
                            }
                        }
                    },
                    series: [{
                        name:   '',
                        data:    _this.Kdata,
                        type:   'line',
                        smooth: true,
                        color:  '#7a9bbc',
                    }],
                    grid: {
                        left: _this.LeftMargin
                    },
                })
            },
            GetCurrenyPrice(val){
                // 获取K线数据 
                this.$server.post(
                'GetCurrenyPrice_K',
                {
                    guid 	        :   this.$storage.get('guid'),
                    currenyName     :   this.actBB,
                    query           :   this.Query
                }).then(data => {
                    if(data){
                        this.Kdata      =   data.listPrice.reverse()
                        this.TimeDay    =   data.listDt.reverse()
                        if(this.Kdata.length!=this.TimeDay.length){
                            this.Query = this.LastBot
                            this.$vux.toast.show({
                                text: this.$t('discovery.btob.dataNull'),
                                type: 'warn'
                            })
                            return;
                        }
                        //  如果有数据，更新上一次点击的按钮数据
                        this.LastClick = val
                        this.echarts()
                    }
                })
            },
            // 数据筛选
            sQuery(val){
                switch (val){
                    case    'week':
                        this.Query  =   '周'
                    break;
                    case    'month':
                        this.Query  =   '月'
                    break;
                    case    'season':
                        this.Query  =   '季'
                    break;
                    case    'year':
                        this.Query  =   '年'
                    break;
                }
                // 重新加载数据
                this.GetCurrenyPrice(val)
            },
            GetLastDT(){
                // 查询最后兑提记录
                this.$server.post(
                'GetLastDT',
                {
                    guid 	:   this.$storage.get('guid'),
                    type    :   'D'   
                }).then(data => {
                    if(data.Result!='null'){
                        this.GetDTList = data
                    }
                })
            },
		},
		mounted() {
            // 获取详情
            this.GetList()
            this.bbName = (this.$route.query.bbname)?this.$route.query.bbname:'BTC'
            this.GetCurrenyPrice()
            this.GetLastDT()
        },
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/btob";
</style>