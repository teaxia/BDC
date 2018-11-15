<template>
	<div class="mine padding-footer">
		<div class="mine-top">
			<v-grid class="mine-top-menu">
				<flexbox>
					<flexbox-item :span="3">
						<div class="dis-grid-img" @click="onTourl('/mine/center')">
							<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
							<i v-else class="avatar iconfont icon-touxiang"></i>
						</div>
					</flexbox-item>
					<flexbox-item :span="8">
						<div class="mine-grid-content" @click="onTourl('/mine/center')">
							<div class="nickname">{{nickname}}</div>
							<div class="userid">{{realname}}</div>
						</div>
					</flexbox-item>
					<flexbox-item>
						<div class="mine-grid-content" @click="onTourl('/mine/center')">
							<i class="iconfont icon-arrow-right"></i>
						</div>
					</flexbox-item>
				</flexbox>
			</v-grid>
		</div>
		<div class="main-container">
			<v-grid class="mr100">
				<group>
					<cell link="/mine/extension" is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-search"></i>
							<span>{{$t('mine.menus.spread')}}</span>
						</span>
					</cell>
					<cell is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-guanwang"></i>
							<span>{{$t('mine.menus.website')}}</span>
						</span>
					</cell>
					<cell link="/mine/area" is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-tianjiakuangquchengyuan"></i>
							<span>{{$t('mine.menus.members')}}</span>
						</span>
					</cell>
				</group>
			</v-grid>
			<v-grid class="mr40">
				<group>
					<cell is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-changjianwenti"></i>
							<span>{{$t('mine.menus.question')}}</span>
						</span>
					</cell>
					<cell is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-yijianfankui"></i>
							<span>{{$t('mine.menus.feedback')}}</span>
						</span>
					</cell>
					<cell is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-shimingrenzheng"></i>
							<span>{{$t('mine.menus.realname')}}</span>
						</span>
					</cell>
					<cell is-link class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-shezhi"></i>
							<span>{{$t('mine.menus.setting')}}</span>
						</span>
					</cell>
				</group>
			</v-grid>
			<button @click="logout()" class="btn btn-block btn-round mr30"><i class="iconfont icon-send"></i>{{$t('user.logout')}}</button>
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
		// 个人中心设置
		onTourl(url){
			this.$router.push({
				path:url,
			});
		},
		// 退出
		logout(){
			this.$storage.logout();
			this.$router.push({
				path:"/user/login",
			});
		}
	},
	mounted() {
		this.nickname = this.$storage.get('NickName');
		this.avatar   = this.$storage.get('HeadImg');
		this.realname = (this.$storage.get('Realname'))?this.$storage.get('Realname'):this.$t('global.Uncertified');
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/mine";
</style>