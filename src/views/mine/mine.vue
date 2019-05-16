<template>
	<div class="mine padding-footer">
		<div class="mine-top">
			<v-grid class="mine-top-menu">
				<flexbox>
					<flexbox-item :span="3">
						<div class="dis-grid-img">
							<i class="avatar iconfont icon-touxiang"></i>
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
							<!-- <div class="earnings earning">{{$t('mine.menus.withdrawal')}}：{{$numberComma(MyEarnings)}}（BDC）</div> -->
							<div class="withdrawal earning">
								<router-link to="/discovery/withdrawal">
									<button class="btn btn-xs btn-round">{{$t('mine.menus.withdrawal')}}</button>
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
			realname    :   '',
			golink		:	'',
			version 	:	'3.0.00',				
			messageNum	:	'',
			ParentName	:	'',
			kfurl		:	'',
		}
		// 版本更新说明 
		// @版本号 @更新人 @更新时间 @更新内容
		// @3.0.00 茶树虾	2019-05-16	版本号固定为3.0
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
		this.isreal	  	= (this.$storage.get('RealName'))?false:true;
		this.realname 	= (this.$storage.get('RealName'))?this.$storage.get('RealName'):this.$t('global.Uncertified');
		this.ParentName	= this.$storage.get('ParentName');
	}
}

</script>

<style scoped lang="scss">
@import "../../scss/views/mine/mine";
</style>