<template>
	<div class="extension padding-footer" v-cloak>
        <x-header :left-options="{backText:$t('global.back')}" :title="$t('mine.extension.tg')"></x-header>
        <div class="main-container">
            <div class="w-cont">
                <div class="center-avatar">
                    <img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
                    <i v-else class="avatar iconfont icon-touxiang"></i>
                </div>
                <div class="invitecode">
                    <p><i class="iconfont icon-feiji"></i>{{$t('mine.extension.invitecode')}}</p>
                    <p>{{InviteCode}}</p>
                </div>
                <div class="ercode">
                    <qriously class="ercode" :value="`http://belden-bdc.net/register/index.html?InviteCode=`+InviteCode" :size="138"/>
                </div>
                <div class="InviteCode">
                    <span v-text="`http://belden-bdc.net/register/index.html?InviteCode=`+InviteCode"></span>
                    <button type="button" class="btn btn-xs btn-round" v-clipboard:copy="`http://belden-bdc.net/register/index.html?InviteCode=`+InviteCode" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('wallet.receive.copy')}}</button>
                </div>
            </div>
		</div>
		<v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                avatar      :   '',
                InviteCode  :   '',
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
            },
		},
		mounted() {
		    this.avatar     = this.$storage.get('HeadImg');
		    this.InviteCode = this.$storage.get('InviteCode'); 
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/extension";
</style>