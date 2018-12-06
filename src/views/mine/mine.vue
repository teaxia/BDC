<template>
	<div class="mine padding-footer">
		<div class="mine-top">
			<v-grid class="mine-top-menu">
				<flexbox>
					<flexbox-item :span="3">
						<div class="dis-grid-img">
							<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
							<i v-else class="avatar iconfont icon-touxiang"></i>
						</div>
					</flexbox-item>
					<flexbox-item :span="8">
						<div class="mine-grid-content">
							<div class="nickname">{{nickname}}</div>
							<div class="userid">{{realname}}</div>
						</div>
					</flexbox-item>
					<!-- <flexbox-item>
						<div class="mine-grid-content">
							<i class="iconfont icon-arrow-right"></i>
						</div>
					</flexbox-item> -->
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
					<div @click="go()" class="line-b">
						<cell is-link  class="cell-hei">
							<span slot="title">
								<i class="iconfont icon-guanwang"></i>
								<span>{{$t('mine.menus.website')}}</span>
							</span>
						</cell>
					</div>
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
					<cell is-link link="/mine/question" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-changjianwenti"></i>
							<span>{{$t('mine.menus.question')}}</span>
						</span>
					</cell>
					<cell is-link link="/mine/feedback" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-yijianfankui"></i>
							<span>{{$t('mine.menus.feedback')}}</span>
						</span>
					</cell>
					<cell is-link link="/mine/auth" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-shimingrenzheng"></i>
							<span>{{$t('mine.menus.realname')}}</span>
						</span>
						<div slot="default" v-if="isreal" class="authrel">{{realname}}</div>
					</cell>
					<cell is-link link="/mine/setting" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-shezhi"></i>
							<span>{{$t('mine.menus.setting')}}</span>
						</span>
					</cell>
				</group>
			</v-grid>
			<button @click="logout()" class="btn btn-block btn-round mr30"><i class="iconfont icon-send"></i>{{$t('user.logout')}}</button>
		</div>
		<div class="fram" v-if="show">
			<iframe src="http://www.belden-bdc.net/" :width="w" :height="h" :scrolling="this.isscro" frameborder="0"></iframe>
			<button @click="close()" class="btn btn-close btn-round">{{$t('global.close')}}</button>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
import { islogin } from '../../common/mixins/islogin';
export default {
	mixins:[islogin],
	data() {
		return {
			nickname	:	'',
			avatar		:	'',
			realname    :   '',
			golink		:	'',
			isreal		:	'',
			show		:	false,
			w			:	'',
			h			:	''
		}
	},
	methods: {
		// 个人中心设置
		GetAccount(){
			this.$server.post(
			'GetAccountById',
			{
				guid : this.$storage.get('guid')
			},
			).then(data => {
				if(data){
					this.$storage.set('NickName',data.NickName);                        // 昵称
					this.$storage.set('Name',data.Name);                                // 用户名
					(data.RealName)?this.$storage.set('RealName',data.RealName):this.$storage.set('RealName','');
					this.$storage.set('HeadImg',data.HeadImg);                          // 昵称
					this.$storage.set('RechargeCode',data.RechargeCode);                // 充值地址
					this.$storage.set('Mobile',data.PhoneNo);                           // 手机号
					this.$storage.set('Sex',data.Sex);                                  // 性别
					this.$storage.set('ParentName',data.ParentName);                    // 推荐人
					this.$storage.set('InviteCode',data.InviteCode);                    // 邀请码
				}
			})
        },
		// 退出
		logout(){
			this.$storage.logout();
			this.$router.push({
				path:"/user/login",
			});
		},
		go(){
			this.show = true;
			// this.$router.push({
			// 	name:"iframe",
			// 	params:{
			// 		url:'http://www.belden-bdc.net/',
			// 	}
			// });
		},
		close(){
			this.show = false;
		}
	},
	mounted() {
		// 判断是否有登录，如果没有登录则跳转至登录界面
		this.islogin();
		// 更新个人中心资料
		this.GetAccount();
		// 解决宽度兼容问题
		if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  //判断是苹果设备还是其他设备 
			this.isscro = 'no';
			this.h = '100%';
		}else{
			//安卓设备允许滚动
			this.isscro = 'yes';
			this.h = window.screen.height
		}
		this.w = window.screen.width
		this.nickname = this.$storage.get('NickName');
		this.avatar   = this.$storage.get('HeadImg');
		this.isreal	  = (this.$storage.get('RealName'))?false:true;
		this.realname = (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/mine";
</style>