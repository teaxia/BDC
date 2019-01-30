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
					<flexbox-item :span="2">
						<div class="mine-grid-content">
							<div class="nickname">{{nickname}}</div>
							<div class="userid">{{realname}}</div>
						</div>
					</flexbox-item>
					<flexbox-item :span="7">
						<div class="mine-grid-content">
							<div class="earnings earning">{{$t('mine.menus.withdrawal')}}：{{MyEarnings}}（CNY）</div>
							<div class="withdrawal earning">
								<router-link to="/discovery/withdrawal">
									<button class="btn btn-xs btn-round">{{$t('mine.menus.cash')}}</button>
								</router-link>
							</div>
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
					<cell is-link link="/wallet/notice?index=3&type=1" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-xiaoxi1"></i>
							<span>{{$t('global.message')}}</span>
						</span>
						<div slot="default" v-if="messageNum>0" class="message">{{messageNum}}</div>
					</cell>
					<cell is-link link="/mine/setting" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-shezhi"></i>
							<span>{{$t('mine.menus.setting')}}</span>
						</span>
					</cell>
					<cell class="cell-hei">
					{{$t('global.ver')}}：{{version}}
					</cell>
				</group>
			</v-grid>
			<button @click="logout()" class="btn btn-block btn-round mr30"><i class="iconfont icon-send"></i>{{$t('user.logout')}}</button>
		</div>
        <v-footer :isIndex="$route.meta.isIndex"></v-footer>
    </div>
</template>

<script>
import { islogin } from '../../common/mixins/islogin';
import { GetAccount } from '../../common/mixins/getaccount';

export default {
	mixins:[islogin,GetAccount],
	data() {
		return {
			nickname	:	'',
			avatar		:	'',
			realname    :   '',
			golink		:	'',
			isreal		:	'',
			version 	:	'2.5.20',				
			messageNum	:	''
		}
		// 版本更新说明 
		// @版本号 @更新人 @更新时间 @更新内容
		// @更新功能说明
		// @2.3.19 茶树虾	2019-01-18	更新官网；更新游戏平台图标；更新层级结构；
		// @2.4.19 茶树虾	2019-01-24	注册页增加自定义账号；合并注册页面为一步注册；矿区增加直接邀请码注册并且区分矿区以及上下级；
		// @2.5.20 茶树虾	2019-01-30	矿区界面修改；矿区增加“我的业绩”、“我的收益”、“我的直推”按钮；去除LV1 LV2矿区总人数显示；修复L2层级V2矿区邀请码没有成语言包的BUG；修复锁仓情况语言包BUG
	},
	methods: {
		// 退出
		logout(){
			this.$storage.logout();
			this.$router.push({
				path:"/user/login",
			});
		},
		go(){
			// 调用第三方浏览器打开网页
			if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
				//苹果设备 
				api.openApp({
					iosUrl: 'http://www.belden-bdc.com/', //打开微信的，其中weixin为微信的URL Scheme
				});
			}else{
				//安卓设备
				api.openApp({
					uri: 'http://www.belden-bdc.com/'
				});
			}
		},
		GetLetterMessageCount(){
			// 获取消息中心数量
			this.$server.post(
			'GetLetterMessageCount',
			{
				guid    : this.$storage.get('guid'),
				Count   : 0
			}).then(data => {
				if(data){
					this.messageNum = data.Result;
				}else{
					this.GetLetterMessageCount()	
				}
			})
		}
	},
	mounted() {
		// 判断是否有登录，如果没有登录则跳转至登录界面
		this.islogin();
		// 更新个人中心资料
		this.GetAccount();
		// 消息行数
		this.GetLetterMessageCount()
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