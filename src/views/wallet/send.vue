<template>
	<div class="walletmain send padding-footer" v-cloak>
        <x-header title="发送"></x-header>
        <div class="walletmain-top">
			<h1>我的</h1>
			<v-grid class="walletmain-top-menu">
				<flexbox>
					<flexbox-item :span="3">
						<div class="dis-grid-img" @click="onTourl('/mine/center')">
							<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
							<i v-else class="avatar iconfont icon-touxiang"></i>
						</div>
					</flexbox-item>
					<flexbox-item :span="8">
						<div class="walletmain-grid-content" @click="onTourl('/mine/center')">
							<div class="nickname">{{nickname}}</div>
							<div class="userid">{{realname}}</div>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="walletmain-grid-content" @click="onTourl('/mine/center')">
							<i class="iconfont icon-arrow-right"></i>
						</div>
					</flexbox-item>
				</flexbox>
			</v-grid>
		</div>
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
            this.realname = this.$storage.get('Realname');
		}
	}

</script>

<style scoped lang="scss">
@import "../../scss/views/wallet/main";
</style>