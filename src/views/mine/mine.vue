<template>
	<div class="mine padding-footer">
		<div class="mine-top">
			<v-grid class="mine-top-menu">
				<flexbox>
					<flexbox-item :span="3">
						<div class="dis-grid-img">
							<img v-if="avatar&&avatar!='null'" class="avatar" :src="avatar" />
							<i v-else class="avatar iconfont icon-touxiang"></i>
							<div class="nickname">{{nickname}}</div>
						</div>
					</flexbox-item>
					<flexbox-item :span="3">
						<div class="mine-grid-content">
							<div class="userid">{{realname}}</div>
							<div class="ParentName">{{$t('mine.extension.parentname')}}：{{ParentName}}</div>
						</div>
					</flexbox-item>
					<flexbox-item :span="6">
						<div class="mine-grid-content">
							<div class="earnings earning">{{$t('mine.menus.withdrawal')}}：{{$numberComma(MyEarnings)}}（USDT）</div>
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
					<div @click="go('http://www.belden-bdc.com/')" class="line-b">
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
					<div @click="GetKFUrl()" class="line-b">
						<cell is-link class="cell-hei">
							<span slot="title">
								<i class="iconfont icon-kefu"></i>
								<span>{{$t('mine.menus.server')}}</span>
							</span>
							<div slot="default" v-if="messageNum>0" class="message">{{messageNum}}</div>
						</cell>
					</div>
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
					<cell is-link link="/wallet/notice?index=3&type=1" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-xiaoxi1"></i>
							<span>{{$t('global.message')}}</span>
						</span>
						<div slot="default" v-if="messageNum>0" class="message">{{messageNum}}</div>
					</cell>
					<cell is-link link="/mine/security" class="cell-hei">
						<span slot="title">
							<i class="iconfont icon-artboard19copy"></i>
							<span>{{$t('mine.menus.security')}}</span>
						</span>
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
			// version 	:	'2.9.39',					// 记得把OTC关掉
			version 	:	'测试版本：2.9.43',					// 测试版本号
			messageNum	:	'',
			ParentName	:	'',
			kfurl		:	'',
		}
		// 版本更新说明 
		// @版本号 @更新人 @更新时间 @更新内容
		// @2.3.19 茶树虾	2019-01-18	更新官网；更新游戏平台图标；更新层级结构；
		// @2.4.19 茶树虾	2019-01-24	注册页增加自定义账号；合并注册页面为一步注册；矿区增加直接邀请码注册并且区分矿区以及上下级；
		// @2.5.20 茶树虾	2019-01-30	矿区界面修改；矿区增加“我的业绩”、“我的收益”、“我的直推”按钮；去除LV1 LV2矿区总人数显示；修复L2层级V2矿区邀请码没有成语言包的BUG；修复锁仓情况语言包BUG
		// @2.5.21 茶树虾	2019-01-31	升级iview到3.2.2
		// @2.6.21 茶树虾	2019-02-19  修改矿区界面；矿区增加查看链接（有保存图片以及新增的矿区节点）；注册页面新增矿区节点；
		// @2.6.22 茶树虾	2019-02-22  修改矿区节点界面；
		// @2.6.23 茶树虾	2019-02-27  提币界面增加通证资产；收益提现界面修改持币+-显示状态；应用功能调整，新增体育赛事；我的收益改为USDT结算；取消自助购买；资产转换取消通证转固定；提币改为USDT结算
		// @2.6.24 茶树虾	2019-02-28  我的收益提增加提示：提现最低额度200，每笔收取5USDT
		// @2.6.25 茶树虾	2019-03-05	点击首页我的钱包跳转至应用界面；提币界面增加最低提现额度提示；
		// @2.6.26 茶树虾	2019-03-05	修复版本号；
		// @2.6.27 茶树虾	2019-03-05	修改提示信息；
		// @2.6.28 茶树虾	2019-03-11	切换分支信息至OTC分支，并且同步至github
		// @2.7.28 茶树虾	2019-03-14	修改登录页样式；增加启动广告页；
		// @2.7.29 茶树虾	2019-03-15	修复充值页面安全密码只能输入数字的BUG；
		// @2.7.29 茶树虾	2019-03-15	关闭启动页面LOGO；
		// @2.7.30 茶树虾	2019-03-18	取消提币数量限制；
		// @2.8.31 茶树虾	2019-03-18	修改错误的语言包（CTC-OTC）；增加修改手机号绑定；
		// @2.8.32 茶树虾	2019-03-19	修改错误的语言包；
		// @2.9.32 茶树虾	2019-03-27	增加了echarts组件用于显示曲线图 增加了GIF图片
		// @2.9.33 茶树虾	2019-04-16	增加在线客服；“应用”界面优化
		// @2.9.34 茶树虾	2019-04-18	提币跟兑换界面增加最新交提记录
		// @2.9.35 茶树虾	2019-04-28	修复修改手机号无法发送短信的BUG；把修改密码，实名认证，绑定银行卡支付宝微信，修改手机号移动到安全中心
		// @2.9.36 茶树虾	2019-05-05	修复IOS无法复制的BUG,修改未进行实名认证的安全提示
		// @2.9.37 茶树虾	2019-05-09	更新客服中心为接口获取方式
		// @2.9.39 茶树虾	2019-05-10	更新客服接口获取方式 取消游戏应用，移动OTC至导航
	},
	methods: {
		// 退出
		logout(){
			this.$storage.logout();
			this.$router.push({
				path:"/user/login",
			});
		},
		go(url){
			// 调用第三方浏览器打开网页
			if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){  
				//苹果设备 
				api.openApp({
					iosUrl: url, //打开微信的，其中weixin为微信的URL Scheme
				});
			}else{
				//安卓设备
				api.openApp({
					uri: url,
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
		},
		GetKFUrl(){
			// 获取客服链接
			this.$server.post(
			'GetKFUrl',
			{
				guid    : this.$storage.get('guid'),
			}).then(data => {
				if(data){
					this.kfurl = data.Result.substring(0, data.Result.length - 1);
					this.kfurl = this.kfurl.substring(1, this.kfurl.length - 1);
					this.$router.push({
						path:"/iframe",
						query:{
							url:this.kfurl
						}
					});
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
		this.nickname 	= this.$storage.get('NickName');
		this.avatar   	= this.$storage.get('HeadImg');
		this.isreal	  	= (this.$storage.get('RealName'))?false:true;
		this.realname 	= (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
		this.ParentName	= this.$storage.get('ParentName');
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/mine";
</style>