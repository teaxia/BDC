<template>
	<div class="otc margin-header" v-cloak>
        <x-header :left-options="{backText:this.$t('global.back'),preventGoBack:true}" @on-click-back="Goback()">
            <div slot="right">
                <router-link to="/discovery/OTC/list">
                    <div class="btn btn-auto btn-success right">{{$t('discovery.OTC.index.record')}}</div>
                </router-link>
                <router-link to="/discovery/OTC/OTCRank">
                    <span class="btn btn-auto btn-error right">{{$t('discovery.OTC.ranking')}}</span>
                </router-link>
            </div>
            <div slot="default" class="title">
                <div @click="change()" :class="{'select-title':true,'act-bd':active}">
                    <span :class="{'select-act':active}">{{$t('discovery.OTC.index.buy')}}</span>
                </div>
                <div @click="change()" :class="{'select-title':true,'act-bd':!active}">
                    <span :class="{'select-act':!active}">{{$t('discovery.OTC.index.bybuy')}}</span>
                </div> 
            </div>
        </x-header>
        <div>
            <!-- 筛选 -->
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
        </div>
        <div class="main-container">
            <my-scroll :page="page" :on-refresh="onRefresh" :on-pull="onPull">
                <div slot="scrollList" class="otc-item" @click="buy(v.Id)" v-for="(v,index) in dataList" :key="index">
                    <v-grid class="otc-grid">
                        <div class="otc-grid-title">
                            <Avatar size="small"  style="background:#f56a00">
                                {{$strcut(v.nickName,1)}}
                            </Avatar>
                            <div class="grid-username">{{v.nickName}}</div>
                            <div class="grid-info">{{v.tradeInfo}}</div>
                        </div>
                        <div class="otc-grid-main">
                            <div class="v-flex">
                                <div class="otc-grid-price">
                                    <div class="price">
                                        {{$t('discovery.OTC.sell.price')}}{{$numberComma(v.price)}}CNY
                                    </div>
                                    <div class="otc-price">
                                        <div v-if="active">{{$t('discovery.OTC.index.min')}}：{{$numberComma(v.minBuy)}}（{{v.currenyName}}）</div>
                                        <div :class="{'buyorder':!active}">{{$t('discovery.OTC.index.num')}}：{{$numberComma(v.currenyNum)}} （{{v.currenyName}}）</div>
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
                                    </div>
                                    <div class="otc-grid-right">
                                        <i class="iconfont icon-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-grid>
                </div>
            </my-scroll>
        </div>
        <!-- <div class="sell">
            <router-link to="/discovery/OTC/sell" v-if="active">
                <svg class="icon-sell" aria-hidden="true">
                    <use xlink:href="#icon-paimailiang"></use>
                </svg>
                <span>
                    {{$t('discovery.OTC.index.bybuy')}}
                </span>
            </router-link>
            <router-link to="/discovery/OTC/demand" v-if="!active">
                <svg class="icon-sell" aria-hidden="true">
                    <use xlink:href="#icon-paimailiang"></use>
                </svg>
                <span>
                    {{$t('discovery.OTC.index.buy')}}
                </span>
            </router-link>
        </div> -->
        <div>
            <vpopup :leftText="$t('global.cancel')" :titleText="$t('discovery.OTC.index.curreny')" :rightText="$t('global.ok')" @onLeftText="cancelPupop()" @onRightText="okPupop()" v-model="showPupop">
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
        </div>
        <!-- 实名认证 -->
		<Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="ok()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
        <!-- <v-footer :isIndex="$route.meta.isIndex"></v-footer> -->
    </div>
</template>

<script>
	export default {
        name:'otc',
		data() {
			return {
                active      :   true,                               //头部切换索引
                realname    :   '',                   
                show		:	false,      		                // 跳转至强制认证界面
                vindex      :   '',                                 // 菜单索引
                showPupop   :   false,                              // popup是否显示
                scurrency   :   'BDC',                              // 当前选择的币种
                deepcurrency:   '',                                 // 用于存储监听前的币种数据对象
                currency    :   ['BDC'],
                dataList    :   [],
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
			}
        },
        watch:{
            scurrency(){
                //  单币种不需要
                //  this.showPupop = false
                //  console.log(this.scurrency);
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
            }
        },
		methods: {
			change(){
                // 购买出售切换
                this.active = !this.active;
                let Refresh = true
                if(this.active){
                    // 购买
                    this.OTCGetSellList(Refresh)
                }else{
                    // 求购
                    this.GetBuyGoodsList(Refresh)
                }
            },
            select(v,vindex){
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
                    this.$router.push({
                        path:"/discovery/OTC/buy",
                        query:{
                            id  :  Id
                        }
                    });
                }else{
                    this.$router.push({
                        path:"/discovery/OTC/buyOrder",
                        query:{
                            id  :  Id
                        }
                    });
                }
            },
            cancelPupop(){
                // 取消选择
                this.showPupop = false
                this.scurrency = this.deepcurrency
            },
            okPupop(){
                // 确定选择
                this.showPupop = false
            },
            selectCurrency(){
                // 币种选择
                this.deepcurrency = this.scurrency
                this.showPupop = true
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
            Goback(){
                this.$router.push({
                    path:"/discovery/index",
                });
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
            // 初始化数据
            this.OTCGetSellList()
            //this.currency = this.$currency
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otc";
</style>