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
                    <i class="iconfont icon-feiji"></i>{{$t('mine.extension.invitecode')}}<br/>
                    {{InviteCode}}
                </div>
                <div class="ercode">
                    <qriously class="ercode" :value="InviteCode" :size="138"/>
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