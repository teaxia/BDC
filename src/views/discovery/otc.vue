<template>
	<div class="otc padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}">
            <div slot="right">
                记录
            </div>
            <div slot="default">
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':active}">{{$t("application.title.buy")}}</span>
                </div>
                <div @click="change()" :class="{'select-title':true}">
                    <span :class="{'select-act':!active}">{{$t("application.title.shop")}}</span>
                </div> 
            </div>
        </x-header>
        <div class="main-container">
            
        </div>
        <!-- 实名认证 -->
		<Modal v-model="show" :closable="false" :mask-closable="false">
			<div slot="header"></div>
			<div class="modal-body">{{$t('global.authentication')}}</div>
			<div slot="footer">
				<button class="btn btn-block btn-round" @click="ok()">{{$t('wallet.send.auth')}}</button>
			</div>
		</Modal>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
        name:'otc',
		data() {
			return {
                active      :    true,                             //头部切换索引
                realname    :    '',               
                show		:	false,				                // 跳转至强制认证界面
			}
        },
        watch:{

        },
		methods: {
			change(){
                this.active = !this.active;
            },
            
		},
		mounted() {
            // 验证是否通过实名制认证
            this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
			if(this.realname==this.$t('global.Uncertified')){
				this.show = true;
			}
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/discovery/otc";
</style>