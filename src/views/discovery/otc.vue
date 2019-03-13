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
            <!-- <flexbox class="pb select">
                <flexbox-item v-for="(v,index) in otclist" :key="index">
                    <div @click="select(v,index)" :class="[(vindex==index)?'menu':'']"><span>{{v}}</span></div>
                </flexbox-item>
            </flexbox> -->
        </div>
        <div class="main-container">
            <my-scroll :page="page" :on-refresh="onRefresh" :on-pull="onPull">
                <div slot="scrollList" class="otc-item" @click="buy()" v-for="(v,index) in dataList" :key="index">
                    <v-grid class="otc-grid">
                        <div class="otc-grid-title">
                            <div class="grid-avatar">这</div>
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
            <svg class="icon-sell" aria-hidden="true">
                <use xlink:href="#icon-paimailiang"></use>
            </svg>
            <span>
                发布
            </span>
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
                otclist     :   ['BDC','BTC','ETH','DASH','USDT','XRP','BCH','EOS'],
                vindex      :   '',                                 // 菜单索引
                page:{
                    counter:1,  
                    pageStart:1,  
                    pageEnd:1,  
                    total:10
                },
                dataList    :   [
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
                        amount  :   '3182.5254454545'
                    },
                    {
                        name    :   '这是一个头像很长很长的用户',
                        price   :   '6.87',
                        count   :   '500.00-21,862.00000000',
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
                console.log('买卖')
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
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otc";
</style>