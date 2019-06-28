<template>
	<div class="OTCSellBuy" v-cloak>
        <div>
            <!-- 筛选 -->
            <flexbox>
                <flexbox-item>
                    <Dropdown trigger="click" @on-click="change" class="OTCSellBuy-drop">
                        <div class="btn btn-min-x btn-round">
                            {{thisAct}}
                            <i class="iconfont icon-sanjiao_xia"></i>
                        </div>
                        <DropdownMenu slot="list">
                            <DropdownItem :name="'buy'">{{$t('discovery.OTC.index.buy')}}</DropdownItem>
                            <DropdownItem :name="'bybuy'">{{$t('discovery.OTC.index.bybuy')}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </flexbox-item>
                <flexbox-item>
                    <flexbox class="pb select">
                        <flexbox-item>
                            <div @click="selectCurrency()">{{$t('discovery.OTC.index.curreny')}}</div>
                        </flexbox-item>
                        <flexbox-item>
                            <div @click="changeTime()">
                                {{$t('discovery.OTC.index.time')}}
                                <i :class="{'iconfont':true,'icon-sanjiao_xia':true,'icon-flip':Tup}"></i>
                            </div>
                        </flexbox-item>
                        <flexbox-item>
                            <div @click="changePrice()">
                                {{$t('discovery.OTC.index.price')}}
                                <i :class="{'iconfont':true,'icon-sanjiao_xia':true,'icon-flip':Pup}"></i>
                            </div>
                        </flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="main-container">
            <my-scroll :page="page" :on-refresh="onRefresh" :on-pull="onPull">
                <div slot="scrollList" class="otc-item" v-for="(v,index) in dataList" :key="index">
                    <v-grid class="otc-grid">
                        <div class="otc-grid-title">
                            <div class="otc-grid-bld">
                                <div :class="{'otc-grid-avatar':true,'sell':active}">
                                    {{$strcut(v.nickName,1)}}
                                </div>
                                <div>
                                    <div class="grid-username">{{v.nickName}}</div>
                                    <div class="grid-info">{{v.tradeInfo}}</div>
                                </div>
                            </div>
                            <div class="otc-grid-pay">
                                <div class="otc-grid-paylist">
                                    <svg class="icon" aria-hidden="true" v-if="v.payInfo.indexOf('支')>=0">
                                        <use xlink:href="#icon-zhifubao"></use>
                                    </svg>
                                    <svg class="icon" aria-hidden="true" v-if="v.payInfo.indexOf('银')>=0">
                                        <use xlink:href="#icon-yinhangqia"></use>
                                    </svg>
                                    <svg class="icon" aria-hidden="true" v-if="v.payInfo.indexOf('微')>=0">
                                        <use xlink:href="#icon-weixinzhifu"></use>
                                    </svg>
                                    <i class="iconfont icon-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                        <div class="otc-grid-main">
                            <div class="v-flex">
                                <div class="otc-grid-price">
                                    <div class="price">
                                        <div>{{$t('discovery.OTC.sell.price')}}</div>
                                        <div class="price-info">￥{{$numberComma(v.price)}}</div>
                                    </div>
                                    <div class="otc-price">
                                        <div>{{$t('discovery.OTC.index.min')}}：{{$numberComma(v.canBuy)}}</div>
                                        <div :class="{'buyorder':!active}">{{$t('discovery.OTC.index.num')}}：{{$numberComma(v.currenyNum)}} （{{v.currenyName}}）</div>
                                        <div class="otc-badge">
                                            <span v-if="active" class="tag tag-success" @click="buy(v.Id)">购买</span>
                                            <span v-if="!active" class="tag tag-wran" @click="buy(v.Id)">出售</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-grid>
                </div>
            </my-scroll>
        </div>
        <div>
            <!-- 币种开始 -->
            <vpopup :leftText="$t('global.cancel')" :titleText="$t('discovery.OTC.index.curreny')" :rightText="$t('global.ok')" @onLeftText="cancelPupops()" @onRightText="okPupops()" v-model="showPupops">
                <div slot="list">
                    <group gutter="0">
                        <radio :options="currency" v-model="scurrency">
                            <template slot="each-item" slot-scope="props">
                                <svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(currency[props.index])>=0">
                                    <use :xlink:href="`#icon-`+currency[props.index]"></use>
                                </svg>
                                <Avatar v-else style="background:#f56a00;margin-left:0.1rem;">
                                    {{currency[props.index]}}
                                </Avatar>
                                <span class="font">
                                    {{currency[props.index]}}
                                </span>
                            </template>
                        </radio>
                    </group>
                </div>
            </vpopup>
            <!-- 币种结束 -->
            <!-- 我要买\卖开始 -->
            <vpopup :tshow="false" v-model="sellbuy"> 
                <div slot="list" class="pop">
                    <div class="pop-title">
                        <div class="pop-title-left">
                            <div class="pop-title-h2">
                                <span v-if="active">购买</span><span v-if="!active">出售</span>{{orderInfo.currenyName}}
                            </div>
                            <div class="pop-title-price">
                                单价<span>￥{{orderInfo.price}}</span>
                            </div>
                            <div class="pop-title-payment" v-if="active"><!-- 我要买支持的支付方式 -->
                                <i :class="{'iconfont':true,'icon-zhifubao':true,'alipay':true}" v-if="alipays"></i>
                                <i :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':true}" v-if="cards"></i>
                                <i :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':true}" v-if="wecharts"></i>
                            </div>
                            <div class="pop-title-payment" v-if="!active"><!-- 我要卖支持的支付方式 -->
                                <i v-if="alipayPaymeny" @click="sbankd(1)" :class="{'iconfont':true,'icon-zhifubao':true,'alipay':alipay}"></i>
                                <i v-if="cardPaymeny" @click="sbankd(2)" :class="{'iconfont':true,'icon-yinhangqia':true,'cardpay':cardpay}"></i>
                                <i v-if="wechartPaymeny" @click="sbankd(0)" :class="{'iconfont':true,'icon-weixinzhifu':true,'wechart':wechart}"></i>
                            </div>
                        </div>
                        <div class="pop-title-right">
                            <div class="mr">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#icon-`+orderInfo.currenyName"></use>
                                </svg>
                            </div>
                            <div class="tradeinfo">
                                {{orderInfo.tradeInfo}}
                            </div>
                        </div>
                    </div>
                    <div class="pop-content">
                        <div class="pop-content-div">
                            <div @click="changeBuyType(true)" :class="{'pop-content-nav':true,'active':buyType}">
                                <span v-if="active">按价格购买</span>
                                <span v-if="!active">按价格出售</span>
                            </div>
                            <div @click="changeBuyType(false)" :class="{'pop-content-nav':true,'active':!buyType}">
                                <span v-if="active">按数量购买</span>
                                <span v-if="!active">按数量出售</span>
                            </div>
                        </div>
                        <div class="pop-content-div">
                            <group class="pop-content-bd">
                                <x-input class="pop-content-input" :show-clear="false" type="text" v-model="CNum" :placeholder="placeholder">
                                    <div slot="right-full-height" class="right-btn">
                                        <span class="unit" v-if="buyType">CNY</span>
                                        <span class="unit" v-if="!buyType">{{orderInfo.currenyName}}</span>
                                        <span class="cut">|</span>
                                        <span @click="full()" class="full" v-if="active">{{$t('discovery.OTC.buy.full')}}</span>
                                        <span @click="full()" class="full" v-if="!active">全部出售</span>
                                    </div>
                                </x-input>
                            </group>
                        </div>
                        <div class="pop-content-div">
                            限额：{{orderInfo.canBuy}}
                        </div>
                        <div class="pop-content-div text-right">
                            交易数量：{{(CNum/orderInfo.price).toFixed(8)}}（{{orderInfo.currenyName}}）
                        </div>
                        <div class="pop-content-div" v-if="Poundage>0">
                            <div class="tax">
                                {{$t('discovery.OTC.sell.tax')}}：{{Poundage}}% 
                            </div>
                        </div>
                        <div class="pop-content-div text-right"  v-if="Poundage>0">
                            <div class="tax">
                                {{$t('discovery.OTC.sell.deduction')}} ：{{$numberComma(amount)}}BDC
                            </div>
                        </div>
                        <div class="pop-content-div">
                            <span class="text-fl">交易总额</span>
                            <span class="text-fr" v-if="buyType">
                                <template v-if="CNum==''">
                                    ￥0.00
                                </template>
                                <template v-if="CNum">
                                    ￥{{(CNum*1).toFixed(2)}}
                                </template>
                            </span>
                            <span class="text-fr" v-if="!buyType">
                                ￥{{(CNum*orderInfo.price).toFixed(2)}}
                            </span>
                        </div>
                        <div class="pop-content-btn">
                            <div class="pop-content-btn-space">
                                <button class="btn btn-block btn-cancel" @click="cacnelorder()">{{ T }}s{{$t('discovery.OTC.buy.close')}}</button>
                            </div>
                            <div class="pop-content-btn-space">
                                <button class="btn btn-block" @click="doSubmit(orderInfo.Id)">{{ $t("global.submit") }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </vpopup>
            <!-- 我要买\卖结束 -->
            <!-- 银行卡弹出层 -->
            <vpopup :leftText="$t('discovery.OTC.sell.close')" :titleText="$t('discovery.OTC.sell.payment')" :rightText="$t('global.ok')" @onLeftText="cancelPupop(PayType)" @onRightText="okPupop(PayType)" v-model="showPupop">
                <div slot="list">
                    <div v-if="PayType==0" class="selectbox">
                        <!-- 微信二维码-昵称-时间 -->
                        <RadioGroup v-model="wechartId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='微信'" class="radio-lable">
                                <div class="cell" @click="pierce('wechart',v.Id)">
                                    <div>{{v.thirdNickName}}</div>
                                    <div>{{v.CreateTime}}</div>
                                </div>
                            </Radio>
                            <div v-if="!PayNum" class="bind">
                                <router-link to="/mine/wechart">
                                    {{$t('discovery.OTC.sell.bindwechart')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                    <div v-if="PayType==1" class="selectbox">
                        <!-- 支付宝-昵称-时间 -->
                        <RadioGroup v-model="alipayId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in bankinfo" :key="index" v-if="v.thirdName=='支付宝'" class="radio-lable">
                                <div class="cell" @click="pierce('alipay',v.Id)">
                                    <div>{{v.thirdAccountName}}</div>
                                    <div>{{v.thirdNickName}}</div>
                                </div>
                            </Radio>
                            <div v-if="!PayNum" class="bind">
                                <router-link to="/mine/alipay">
                                    {{$t('discovery.OTC.sell.bindalipay')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                    <div v-if="PayType==2" class="selectbox">
                        <!-- 银联 -->
                        <RadioGroup v-model="bankId" vertical class="radio">
                            <Radio :label="v.Id" v-for="(v,index) in cardinfo" v-if="v.bankName" :key="index" class="radio-lable">
                                <div class="cell" @click="pierce('cardpay',v.Id)">
                                    <div class="text">{{v.bankName}}</div>
                                    <div class="text">{{v.cardNo}}</div>
                                </div>
                            </Radio>
                            <div v-if="!cardinfo" class="bind">
                                <router-link to="/mine/mycard">
                                    {{$t('discovery.OTC.sell.bindcard')}}
                                </router-link>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </vpopup>
            <!-- 银行卡弹出层结束 -->
        </div>
        <!-- 实名认证 -->
		<Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="ok()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
    </div>
</template>

<script>
    import { BindPayment } from '../../common/mixins/BindPayment'       // 获取绑定银行卡信息
	export default {
        name:'OTCSellBuy',
        mixins:[BindPayment],
		data() {
			return {
                active      :   true,                               // 我要买，我要卖切换
                thisAct     :   this.$t('discovery.OTC.index.buy'),
                realname    :   '',                   
                show		:	false,      		                // 跳转至强制认证界面
                vindex      :   '',                                 // 菜单索引
                showPupop   :   false,                              // 银行卡绑定选择层
                showPupops  :   false,                              // 币种选择层
                scurrency   :   'BDC',                              // 当前选择的币种
                deepcurrency:   '',                                 // 用于存储监听前的币种数据对象
                currency    :   ['BDC'],
                dataList    :   [],
                sellbuy     :   false,                              // 我要买，我要卖弹出层
                page:{
                    counter     :   1,              // 当前页数索引
                    pageStart   :   1,              // 
                    pageEnd     :   1,              // 
                    total       :   1,              // 总共要刷新多少次，需要计算（每页条数/总条数）
                    pageSize    :   6,              // 每页条数
                },
                query           :   2,          // 排序条件-1时间降序，1时间升序，-2单价降序，2单价升序。默认传2
                Tup             :   false,      // 时间降序
                Pup             :   false,      // 价格降序
                // 购买，出售
                buyType         :   true,                   // true按价 false按数量
                orderInfo       :   [],                     // 所有数据
                buyNum          :   '',                     // 购买数量CNY
                CNum            :   '',                     // 自定义购买数量
                alipays          :   false,                   
                wecharts         :   false,
                cards            :   false,
                cardPaymeny     :   false,
                alipayPaymeny   :   false,
                wechartPaymeny  :   false,
                editCount       :   '',                     // 编辑次数
                maxnum          :   '',                     // 最大数量
                minnum          :   '',                     // 最小数量
                clock           :   '',                     // 倒计时
                T               :   60,                     // 秒
                placeholder     :   '请输入欲购买法币总额',   // 描述
                showFPupop      :   false,                  // 银行卡弹出层
                Poundage        :   '',                     // 手续费
                Key             :   '',
                amount          :   0,                      // 实际到账
			}
        },
        watch:{
            sellbuy(){
                //  清空币种数量
                this.CNum = ''
            },
            query(){
                let Refresh = true
                switch(this.query){
                    case -1:    // 时间降序
                        this.Tup    =   false
                        this.Pup    =   false
                        if(this.active){
                            // 购买
                            this.OTCGetSellList(Refresh)
                        }else{
                            // 求购
                            this.GetBuyGoodsList(Refresh)
                        }
                    break;
                    case 1:    // 时间升序
                        this.Tup    =   true
                        this.Pup    =   false
                        if(this.active){
                            // 购买
                            this.OTCGetSellList(Refresh)
                        }else{
                            // 求购
                            this.GetBuyGoodsList(Refresh)
                        }
                    break;
                    case -2:    // 价格降序
                        this.Tup    =   false
                        this.Pup    =   true
                        if(this.active){
                            // 购买
                            this.OTCGetSellList(Refresh)
                        }else{
                            // 求购
                            this.GetBuyGoodsList(Refresh)
                        }
                    break;
                    case 2:    // 价格升序
                        this.Tup    =   false
                        this.Pup    =   false
                        if(this.active){
                            // 购买
                            this.OTCGetSellList(Refresh)
                        }else{
                            // 求购
                            this.GetBuyGoodsList(Refresh)
                        }
                    break;
                }
            },
            CNum(){
                // 计算手续费
                if(!this.active){
                    let i           =   this.$math.add(1,(this.Poundage/100).toFixed(2))
                    this.amount     =   (this.CNum*i).toFixed(2)
                }
            } 
        },
		methods: {
			change(name){
                // 购买出售切换
                this.active  =  (name=='buy')?true:false
                this.thisAct =  (this.active)?this.$t('discovery.OTC.index.buy'):this.$t('discovery.OTC.index.bybuy')
                let Refresh = true
                if(this.active){
                    // 购买
                    this.placeholder    =   '请输入欲购买法币总额'
                    this.OTCGetSellList(Refresh)
                }else{
                    // 求购
                    this.placeholder    =   '请输入欲出售法币总额'
                    this.GetBuyGoodsList(Refresh)
                }
            },
            selects(v,vindex){
                // 币种选择
                this.vindex = vindex
            },
            onRefresh(){ //刷新回调
                let Refresh = true
                if(this.active){
                    // 购买
                    this.OTCGetSellList(Refresh)
                }else{
                    // 求购
                    this.GetBuyGoodsList(Refresh)
                }
                setTimeout(()=>{
                    this.$root.$emit('setState',3)
                },500)
            },
            onPull(){ //加载回调
                if(this.page.counter<=this.page.total){
                    setTimeout(()=>{
                        this.page.counter++
                        let Refresh = false
                        if(this.active){
                            // 购买
                            this.OTCGetSellList(Refresh)
                        }else{
                            // 求购
                            this.GetBuyGoodsList(Refresh)
                        }
                        this.$root.$emit('setState',5)
                    },500)
                }else{
                    this.$root.$emit('setState',7)
                }
            },
            buy(Id){
                if(this.active){
                    // 我要买
                    this.$server.post(
                    'OTC_LookSellGoods',{
                        guid 	    :   this.$storage.get('guid'),
                        Id          :   Id
                    }).then(data => {
                        if(data){
                            this.$nextTick(()=>{
                                this.orderInfo  =   data
                                this.wecharts    =   (data.payInfo.indexOf('微')>=0)?true:false;
                                this.alipays     =   (data.payInfo.indexOf('支')>=0)?true:false;
                                this.cards       =   (data.payInfo.indexOf('银')>=0)?true:false;
                                this.minnum     =   data.minBuy
                                this.maxnum     =   data.currenyNum
                                this.editCount  =   data.editCount
                                this.sellbuy    =   true
                                this.T          =   60
                                this.mathPercent()
                            })
                        }
                    })
                }else{
                    // 我要卖
                    this.$server.post(
                    'OTC_LookBuyGoods',{
                        guid 	    :   this.$storage.get('guid'),
                        Id          :   Id
                    }).then(data => {
                        if(data){
                            this.$nextTick(()=>{
                                this.orderInfo  =   data
                                this.wechartPaymeny    =   (data.payInfo.indexOf('微')>=0)?true:false;
                                this.alipayPaymeny     =   (data.payInfo.indexOf('支')>=0)?true:false;
                                this.cardPaymeny       =   (data.payInfo.indexOf('银')>=0)?true:false;
                                this.minnum     =   data.minBuy
                                this.maxnum     =   data.currenyNum
                                this.editCount  =   data.editCount
                                this.sellbuy    =   true
                                this.T          =   60
                                this.mathPercent()
                                this.GetPoundage()
                            })
                        }
                    })
                    
                }
            },
            cancelPupops(){
                // 取消选择
                this.showPupops = false
                this.scurrency = this.deepcurrency
            },
            okPupops(){
                // 确定选择
                this.showPupops = false
            },
            selectCurrency(){
                // 币种选择
                this.deepcurrency = this.scurrency
                this.showPupops = true
            },
            OTCGetSellList(Refresh=false){
                // Refresh判断是否为下拉刷新
                if(Refresh){
                    this.page.counter = 1
                }
                this.$server.post(
                'OTC_GetSellGoodsList',{
                    guid 	    :   this.$storage.get('guid'),
                    query       :   this.query,                     // (排序：-1时间降序，1时间升序，-2单价降序，2单价升序。默认传2)
                    pageSize    :   this.page.pageSize,             // (每页行数)
                    pageIndex   :   this.page.counter,              // 当前页数，第一页传1
                }).then(data => {
                    if(data){
                        if(Refresh){
                            this.dataList  = data.list
                        }else{
                            this.dataList.push(...data.list)
                        }
                        this.page.total     =   Math.ceil(data.TotalCount/data.PageSize)    // 计算需要刷新多少次，小数点向上取证
                    }
                })    
            },
            GetBuyGoodsList(Refresh=false){
                // Refresh判断是否为下拉刷新
                if(Refresh){
                    this.page.counter = 1
                }
                this.$server.post(
                'OTC_GetBuyGoodsList',{
                    guid 	    :   this.$storage.get('guid'),
                    query       :   this.query,                     // (排序：-1时间降序，1时间升序，-2单价降序，2单价升序。默认传2)
                    pageSize    :   this.page.pageSize,             // (每页行数)
                    pageIndex   :   this.page.counter,              // 当前页数，第一页传1
                }).then(data => {
                    if(data){
                        if(Refresh){
                            this.dataList  = data.list
                        }else{
                            this.dataList.push(...data.list)
                        }
                        this.page.total     =   Math.ceil(data.TotalCount/data.PageSize)    // 计算需要刷新多少次，小数点向上取证
                    }
                })    
            },
            goauth () {
                this.$router.push({
                    path:"/mine/myhome",
                });
            },
            changeTime(){
                // 时间筛选
                (this.Tup)?this.query=-1:this.query=1;
            },
            changePrice(){
                // 价格筛选
                (this.Pup)?this.query=2:this.query=-2;
            },
            // 购买出售
            changeBuyType(type){
                // true 按价格 false 按数量
                // 切换按数量购买还是CNY
                this.buyType = type
                if(this.active){
                    // 我要买 出售
                    if(type){
                        this.placeholder    =   '请输入欲购买法币总额'
                    }else{
                        this.placeholder    =   '请输入欲购买数量'
                    }
                }else{
                    // 我要卖 求购
                    if(type){
                        this.placeholder    =   '请输入欲出售法币总额'
                    }else{
                        this.placeholder    =   '请输入欲出售数量'
                    }
                }
            },
            doSubmit(Id){
                if(this.active){
                    // 我要买
                    if(this.CNum==''){
                        this.$vux.toast.show({
                            text: '购买数量不能为空',
                            type: 'warn'
                        })
                        return;
                    }
                    let num = (this.buyType)?(this.CNum/this.orderInfo.price).toFixed(8):this.CNum
                    this.$server.post(
                    'OTC_GoodsBuy_TJ',{
                        guid 	    :   this.$storage.get('guid'),
                        SellGoodsId :   Id,
                        buyNum		:	num,
                        Remark      :   '',
                        editCount   :   this.editCount
                    }).then(data => {
                        if(data){
                            this.$router.push({
                                path:"/OTC/order",
                                query:{
                                    id      :   data.orderId,
                                }
                            });
                        }
                    })
                }else{
                    // 我要卖
                    if(this.CNum==''){
                        this.$vux.toast.show({
                            text: '出售数量不能为空',
                            type: 'warn'
                        })
                        return;
                    }
                    let num = (this.buyType)?(this.CNum/this.orderInfo.price).toFixed(8):this.CNum
                    this.$server.post( 
                    'OTC_GoodsSell_TJ',{
                        guid 	    :   this.$storage.get('guid'),
                        Id          :   Id,
                        Remark      :   '',
                        zfbInfoId   :   (this.alipayId)?this.alipayId:0,
                        wxInfoId    :   (this.wechartId)?this.wechartId:0,
                        cardInfoId  :   (this.bankId)?this.bankId:0,
                        key         :   this.Key,
                        editCount   :   this.editCount,
                        buyNum      :   num

                    }).then(data => {
                        if(data){
                            this.$router.push({
                                path:"/OTC/MyOrderNow",
                            });
                        }
                    })
                }
            },
            full(){
                // 全部购买
                if(this.buyType){
                    // CNY
                    this.CNum = (this.orderInfo.currenyNum*this.orderInfo.price).toFixed(2)
                }else{
                    // BDC
                    this.CNum = this.orderInfo.currenyNum
                }
            },
            mathPercent(){
                // 倒计时
                this.clock = window.setInterval(() => {
                    this.T--;
                    if (this.T<=0) {
                        window.clearInterval(this.clock)
                        this.sellbuy = false
                    }
                },1000)
            },
            cacnelorder(){
                // 取消订单
                window.clearInterval(this.clock)
                this.sellbuy = false
            },
            GetPoundage(){
                // 获取卖币手续费
                this.$server.post(
                'OTC_GetPoundage_OTC',
                {
                    guid : this.$storage.get('guid')
                }).then(data => {
                    if(data){
                        this.Poundage   =   (data.Poundage*100).toFixed(2)
                        this.Key        =   data.key
                        let i           =   this.$math.add(1,data.Poundage).toFixed(2)
                        this.amount     =   (this.buyNum*i).toFixed(8)
                    }
                })
            }
		},
		mounted() {
            // 初始化样式
            // document.body.style.overflow='hidden'
            // 验证是否通过实名制认证
            this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
			if(this.realname==this.$t('global.Uncertified')){
				this.show = false;
            }
            // 判断返回跳转
            // 初始化数据
            if(this.$route.query.active=='true'){
                this.change('buy')
            }else if(this.$route.query.active=='false'){
                this.change('bybuy')
            }else{
                this.change('buy')
            }
        },
        beforeDestroy(){
			// 清除计时器
			window.clearInterval(this.clock);
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/otc/otc";
</style>