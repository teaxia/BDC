<template>
	<div class="walletmain send padding-footer" v-cloak>
        <x-header title="发送"></x-header>
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
                realname    :   ''
			}
		},
		methods: {
			
		},
		mounted() {
            this.nickname = this.$storage.get('NickName');
            this.avatar   = this.$storage.get('HeadImg');
            this.realname = (this.$storage.get('Realname'))?this.$storage.get('Realname'):this.$t('global.Uncertified');
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
</style>