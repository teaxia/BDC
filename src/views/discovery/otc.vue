<template>
	<div class="otc padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}">
            <div slot="right">
                <span class="right">记录</span>
            </div>
            <div slot="default" class="title">
                <div @click="change()" :class="{'select-title':true,'act-bd':active}">
                    <span :class="{'select-act':active}">购买</span>
                </div>
                <div @click="change()" :class="{'select-title':true,'act-bd':!active}">
                    <span :class="{'select-act':!active}">出售</span>
                </div> 
            </div>
        </x-header>
        <div>
            <!-- 选择币种 -->
            <flexbox class="pb select">
                <flexbox-item v-for="(v,index) in otclist" :key="index">
                    <div @click="select(v,index)" :class="[(vindex==index)?'menu':'']"><span>{{v}}</span></div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="main-container">
            <div class="otc-item" @click="bTob()">
                <v-grid class="otc-grid">
                    <div class="otc-grid-title">
                        <div class="grid-avatar">这</div>
                        <div class="grid-username">这是一个头像很长的用户</div>
                    </div>
                    <div class="otc-grid-main">
                        <div class="v-flex">
                            <div class="otc-grid-price">
                                <div class="price">
                                    6.87CNY
                                </div>
                                <div class="otc-price">
                                    <div>限额：500.00-21,862.00000000 CNY</div>
                                    <div>数量：3182.254651 HUSD</div>
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
            }
		},
		mounted() {
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