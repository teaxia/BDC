<template>
	<div class="otc" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}">
            <div slot="right">
                <span class="right">记录</span>
            </div>
            <div slot="default" class="title">
                <div @click="change()" :class="{'select-title':true,'act-bd':active}">
                    <span :class="{'select-act':active}">购买</span>
                </div>
                <div @click="change()" :class="{'select-title':true,'act-bd':!active}">
                    <span :class="{'select-act':!active}">求购</span>
                </div> 
            </div>
        </x-header>
        <div>
            <!-- 选择币种 -->
            <flexbox class="pb select">
                <flexbox-item>
                    <div @click="selectCurrency()">币种</div>
                </flexbox-item>
                <flexbox-item>
                    <div>
                        时间
                        <i class="iconfont icon-sanjiao_xia"></i>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div>
                        价格
                        <i class="iconfont icon-sanjiao_xia"></i>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="main-container">
            <my-scroll :page="page" :on-refresh="onRefresh" :on-pull="onPull">
                <div slot="scrollList" class="otc-item" @click="buy()" v-for="(v,index) in dataList" :key="index">
                    <v-grid class="otc-grid">
                        <div class="otc-grid-title">
                            <Avatar size="small"  style="background:#f56a00">
                                {{$strcut(v.name,1)}}
                            </Avatar>
                            <div class="grid-username">{{v.name}}</div>
                        </div>
                        <div class="otc-grid-main">
                            <div class="v-flex">
                                <div class="otc-grid-price">
                                    <div class="price">
                                        {{v.price}}CNY
                                    </div>
                                    <div class="otc-price">
                                        <div>限额：{{v.count}} CNY</div>
                                        <div>数量：{{v.amount}} HUSD</div>
                                    </div>
                                </div>
                                <div class="otc-grid-pay">
                                    <div class="otc-grid-paylist">
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-zhifubao"></use>
                                        </svg>
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-yinhangqia"></use>
                                        </svg>
                                        <svg class="icon" aria-hidden="true">
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
        <div class="sell">
            <router-link to="/discovery/OTC/sell">
                <svg class="icon-sell" aria-hidden="true">
                    <use xlink:href="#icon-paimailiang"></use>
                </svg>
                <span>
                    发布
                </span>
            </router-link>
        </div>
        <div>
            <vpopup leftText="取消" titleText="选择币种" rightText="确定" @onLeftText="cancelPupop()" @onRightText="okPupop()" v-model="showPupop">
                <div slot="list">
                    <group gutter="0">
                        <radio :options="currency" v-model="scurrency">
                            <template slot="each-item" slot-scope="props">
                                <svg class="sicon" aria-hidden="true" v-if="$currency.indexOf(currency[props.index])>0">
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
                page:{
                    counter:1,  
                    pageStart:1,  
                    pageEnd:1,  
                    total:10
                },
                showPupop   :   false,                              // popup是否显示
                scurrency   :   'ALL',                              // 当前选择的币种
                deepcurrency:   '',                                 // 用于存储监听前的币种数据对象
                currency    :   ['ALL','BDC','BTC','ETH','DASH','USDT','XRP','BCH','EOS','GGBC'],
                dataList    :   [
                    {
                        name    :   '1是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '2是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   'Admin',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00',
                        amount  :   '3182.5254454545'
                    }
                ],
                page:{
                    counter:1,              // 分页条数  
                    pageStart:1,            // 开始页面
                    pageEnd:1,              // 结束页面
                    total:13                // 总共条数
                }
                
			}
        },
        watch:{
            scurrency(){
                //this.showPupop = false
                console.log(this.scurrency);
            }
        },
		methods: {
			change(){
                // 购买出售切换
                this.active = !this.active;
            },
            select(v,vindex){
                // 币种选择
                this.vindex = vindex
            },
            onRefresh(mun){ //刷新回调
                setTimeout(()=>{
                    this.$root.$emit('setState',3)
                },500)
            },
            onPull(mun){ //加载回调
                if(this.page.counter<=this.page.total){
                    setTimeout(()=>{
                        this.page.counter++
                        this.$root.$emit('setState',5)
                        // let data = [{
                        //                 name    :   '2',
                        //                 price   :   '6.87',
                        //                 count   :   '500.00-21,862.00000000',
                        //                 amount  :   '3182.5254454545'
                        //             },
                        //             {
                        //                 name    :   '3',
                        //                 price   :   '6.87',
                        //                 count   :   '500.00-21,862.00000000',
                        //                 amount  :   '3182.5254454545'
                        //             },
                        //             {
                        //                 name    :   '4',
                        //                 price   :   '6.87',
                        //                 count   :   '500.00-21,862.00000000',
                        //                 amount  :   '3182.5254454545'
                        //             }]
                        // this.dataList.push(data)
                        
                    },500)
                }else{
                    this.$root.$emit('setState',7)
                }
            },
            buy(){
                this.$router.push({
                    path:"/discovery/OTC/buy",
                });
                //console.log('买卖')
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
            //this.currency = this.$currency
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otc";
</style>