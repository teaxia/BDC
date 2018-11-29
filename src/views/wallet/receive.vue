<template>
	<div class="walletmain receive padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('wallet.receive.title')"></x-header>
        <div class="walletmain-top">
			<v-grid class="walletmain-top-menu">
				<flexbox>
					<flexbox-item :span="12">
						<div class="midel" @click="onTourl('/mine/center')">
							<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
							<i v-else class="avatar iconfont icon-touxiang"></i>
							<div class="nickname">{{nickname}}</div>
							<div class="userid">{{realname}}</div>
						</div>
					</flexbox-item>
				</flexbox>
				<qriously class="ercode" :value="code" :size="138"/>
				<div class="center">
					<span>{{code}}</span>
				</div>
				<div class="center mr20">
    				<div class="copy" v-clipboard:copy="code" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="iconfont icon-fuzhi"></i>&nbsp;{{$t('wallet.receive.copy')}}</div>
				</div>
			</v-grid>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				nickname	:	'',
                avatar		:	'',
				realname    :   '',
				code		:	'',					// 转换地址
			}
		},
		methods: {
			onCopy: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.success'),
					type: 'success'
				})
			},
			onError: function (e) {
				this.$vux.toast.show({
					text: this.$t('wallet.receive.tips.error'),
					type: 'warn'
				})
			}
		},
		mounted() {
			this.nickname = this.$storage.get('NickName');
			this.avatar   = this.$storage.get('HeadImg');
			this.code   = this.$storage.get('RechargeCode');
            this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
@import "../../scss/views/wallet/receive";
</style>